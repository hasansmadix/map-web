import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { articlesService } from '@/services/articles.service';

import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta';
import { capitalizeEachWord } from '@/utils/format';
import { formatDate } from '@/lib/utils';
import type { Article } from '@/types/articles.types';
import { BlogArticleCard } from '@/components/website/blog/blog-article-card';
import { ShareCard } from '@/components/website/blog/share-card';
import SafeHtmlContent from '@/components/shared/safe-html-content';
import { singleArticleSchema } from '@/utils/seo/schema/articles/single-article-schema';
import { PageHero } from '@/components/website/common/page-hero';
import { CTASection } from '@/components/website/common/cta-section';
import { displayTitleClassName, textLinkOnDarkClassName } from '@/components/website/common/marketing-styles';
import { cn } from '@/lib/utils';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function plainText(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function stripLeadingHeading(content: string, title: string) {
  const match = content.match(/^\s*<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return content;
  const heading = plainText(match[1]);
  if (heading.toLowerCase() !== title.trim().toLowerCase()) return content;
  return content.slice(match[0].length).trim();
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  let article: Article | null = null;

  try {
    article = await articlesService.getBySlug(slug);

    const keywords = [
      article.name,
      ...(article?.tags || []),
      ...(article?.topics || []),
      article.author?.name,
      'blog',
      'article',
      'news',
    ].filter(Boolean) as string[];

    const metadata = createEnhancedMetadata({
      title: { absolute: article.name },
      description:
        article.excerpt || article.meta?.description || `${article.name} - Read our latest article`,
      type: 'article',
      keywords,
      pathname: `/blog/${article.slug}`,
      image: article.image || undefined,
      authors: article.author ? [{ name: article.author.name }] : undefined,
      mainOverrides: {
        category: 'Blog',
      },
      openGraphOverrides: {
        publishedTime: article.createdAt,
        modifiedTime: article.updatedAt,
        tags: keywords,
      },
    });

    return metadata;
  } catch {
    return {
      title: 'Article Not Found',
      description: 'Article not found',
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  let article: Article | null = null;

  try {
    article = await articlesService.getBySlug(slug);
  } catch {
    article = null;
  }

  if (!article) notFound();

  const readingTime = calculateReadingTime(article.content || '');
  const jsonLd = await singleArticleSchema(article);
  const topic = article.topics?.[0];
  const eyebrow = article.isFeatured ? 'Featured' : topic ? capitalizeEachWord(topic) : 'Blog';
  const lead = plainText(article.excerpt || '') || 'A note from MAP Media Art Production.';
  const cover = article.image;
  const coverIsRemote = !!cover && (cover.includes('supabase.co') || cover.includes('unsplash.com') || cover.startsWith('http'));

  return (
    <div className="bg-background min-h-screen">
      <script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow={eyebrow}
        title={article.name}
        description={lead}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: article.name },
        ]}
        buttons={[]}
      />

      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            {cover ? (
              <figure className="bg-muted relative mb-10 aspect-[16/9] max-w-3xl">
                <Image
                  src={cover}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-cover"
                  unoptimized={coverIsRemote}
                />
              </figure>
            ) : null}
            <p className="text-muted-foreground mb-10 max-w-3xl text-[11px] font-medium tracking-[0.16em] uppercase">
              <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
              {readingTime > 0 ? ` · ${readingTime} min read` : ''}
              {article.author?.name ? ` · ${article.author.name}` : ''}
            </p>
            <SafeHtmlContent
              content={stripLeadingHeading(article.content || '', article.name)}
              className={articleProseClassName}
            />

            {article.tags?.length > 0 ? (
              <div className="border-border mt-12 border-t pt-8">
                <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">Tags</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <li key={tag} className="border-border border px-3 py-1.5 text-sm font-light">
                      {capitalizeEachWord(tag)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="bg-foreground p-6 text-white md:p-8">
                <p className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">Proposal</p>
                <p className={cn(displayTitleClassName, 'mt-3 text-2xl text-white')}>Plan a production</p>
                <p className="mt-3 text-sm leading-relaxed font-light text-white/70">
                  Share the date, the format, and where the programme needs to play. MAP will reply with a crew and a written proposal.
                </p>
                <Link href="/contact" className={cn(textLinkOnDarkClassName, 'mt-6')}>
                  Contact
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="border-border border p-6 md:p-8">
                <dl className="space-y-6">
                  {article.author ? (
                    <div>
                      <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">Author</dt>
                      <dd className="mt-3 flex items-center gap-3">
                        {article.author.image ? (
                          <Image
                            src={article.author.image}
                            alt=""
                            width={40}
                            height={40}
                            className="size-10 object-cover"
                            unoptimized={
                              article.author.image.includes('supabase.co') || article.author.image.includes('unsplash.com')
                            }
                          />
                        ) : null}
                        <span className="text-sm font-medium">{article.author.name}</span>
                      </dd>
                      {article.author.bio ? (
                        <dd className="text-muted-foreground mt-3 text-sm font-light">{article.author.bio}</dd>
                      ) : null}
                    </div>
                  ) : null}

                  <div>
                    <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">Published</dt>
                    <dd className="mt-2 text-sm font-medium">{formatDate(article.createdAt)}</dd>
                  </div>

                  {readingTime > 0 ? (
                    <div>
                      <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">
                        Reading time
                      </dt>
                      <dd className="mt-2 text-sm font-medium">{readingTime} min</dd>
                    </div>
                  ) : null}

                  {article.topics?.length > 0 ? (
                    <div>
                      <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">Topics</dt>
                      <dd className="mt-3 flex flex-wrap gap-2">
                        {article.topics.map(item => (
                          <span key={item} className="border-border border px-3 py-1.5 text-xs font-light">
                            {capitalizeEachWord(item)}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <ShareCard articleName={article.name} articleSlug={article.slug} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {article.relatedArticles && article.relatedArticles.length > 0 ? (
        <section className="border-border bg-muted border-t py-16 md:py-24">
          <div className="container">
            <h2 className={cn(displayTitleClassName, 'mb-10 text-3xl md:text-4xl')}>Further reading</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {article.relatedArticles.map(relatedArticle => (
                <BlogArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        title="Request a proposal"
        description="Share the date, the format, and where the programme needs to play. MAP will reply with a crew and a written proposal."
        buttons={[{ text: 'Contact', href: '/contact' }]}
      />
    </div>
  );
}

const articleProseClassName = [
  'max-w-3xl',
  'prose-headings:font-medium prose-headings:tracking-tight',
  'prose-h2:mt-14 prose-h2:text-2xl md:prose-h2:text-3xl',
  'prose-h3:mt-10 prose-h3:text-xl',
  'prose-p:font-light md:prose-p:text-lg md:prose-p:leading-8',
  'prose-li:font-light',
  'prose-strong:font-medium',
  'prose-blockquote:border-primary prose-blockquote:font-light prose-blockquote:not-italic',
  'prose-img:rounded-none',
].join(' ');
