'use client';

import { FormAside, FormSaveCard } from '@/components/dashboard/form-aside';
import { FormSection } from '@/components/dashboard/form-section';
import { MediaSelectInput } from '@/components/shared/input/MediaSelectInput';
import ResponseError from '@/components/shared/response-error';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useArticlesStaff } from '@/hooks/api/articles/useArticles';
import type { Article } from '@/types/articles.types';
import { getChangedValues, sanitizeDto } from '@/utils/format';
import { createArticleSchema, type TCreateArticleForm } from '@/validations/articles/create-article.schema';
import { updateArticleSchema, type TUpdateArticleForm } from '@/validations/articles/update-article.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, ImageIcon, Search, Tags } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Resolver, type UseFormReturn, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { BasicInformationSection } from './partial/basic-information-section';
import { MetaInformationSection } from './partial/meta-information-section';
import { TagsTopicsSection } from './partial/tags-topics-section';

function toFormValues(article?: Article): TCreateArticleForm {
  return {
    slug: article?.slug || '',
    name: article?.name || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    meta: {
      title: article?.meta?.title || '',
      description: article?.meta?.description || '',
      keywords: article?.meta?.keywords || [],
    },
    isPublished: article?.isPublished ?? false,
    isFeatured: article?.isFeatured ?? false,
    tags: article?.tags || [],
    topics: article?.topics || [],
    image: article?.image || '',
  } as TCreateArticleForm;
}

export function ArticleEditor({ article }: { article?: Article }) {
  if (article) return <EditArticleEditor article={article} />;
  return <CreateArticleEditor />;
}

function CreateArticleEditor() {
  const router = useRouter();
  const { createArticle, isCreating, createError } = useArticlesStaff();
  const form = useForm<TCreateArticleForm>({
    resolver: zodResolver(createArticleSchema()) as Resolver<TCreateArticleForm>,
    defaultValues: toFormValues(),
  });

  const onSubmit = async (data: TCreateArticleForm) => {
    try {
      const created = await createArticle(sanitizeDto(data) as TCreateArticleForm);
      toast.success('Article created');
      router.push(created?.id ? `/dashboard/articles/${created.id}` : '/dashboard/articles');
    } catch (error) {
      toast.error((error as Error)?.message || createError || 'Could not create the article');
    }
  };

  return (
    <EditorFrame
      form={form}
      isEdit={false}
      isSaving={isCreating}
      error={createError ? new Error(createError) : null}
      onSubmit={onSubmit}
      onCancel={() => router.push('/dashboard/articles')}
      onDiscard={() => form.reset(toFormValues())}
    />
  );
}

function EditArticleEditor({ article }: { article: Article }) {
  const router = useRouter();
  const { updateArticle, isUpdating, updateError } = useArticlesStaff();
  const defaults = toFormValues(article);
  const form = useForm<TUpdateArticleForm>({
    resolver: zodResolver(updateArticleSchema()) as Resolver<TUpdateArticleForm>,
    defaultValues: defaults,
  });

  const onSubmit = async (data: TUpdateArticleForm) => {
    const changed = getChangedValues(form.formState.defaultValues as TUpdateArticleForm, data);
    if (!Object.keys(changed).length) {
      toast.error('No changes to save');
      return;
    }
    try {
      await updateArticle(article.id, changed);
      toast.success('Article saved');
      form.reset(form.getValues());
    } catch (error) {
      toast.error((error as Error)?.message || updateError || 'Could not save the article');
    }
  };

  return (
    <EditorFrame
      form={form as unknown as UseFormReturn<TCreateArticleForm>}
      isEdit
      isSaving={isUpdating}
      error={updateError ? new Error(updateError) : null}
      onSubmit={onSubmit as (data: TCreateArticleForm) => Promise<void>}
      onCancel={() => router.push('/dashboard/articles')}
      onDiscard={() => form.reset(defaults)}
    />
  );
}

function EditorFrame({
  form,
  isEdit,
  isSaving,
  error,
  onSubmit,
  onCancel,
  onDiscard,
}: {
  form: UseFormReturn<TCreateArticleForm>;
  isEdit: boolean;
  isSaving: boolean;
  error: Error | null;
  onSubmit: (data: TCreateArticleForm) => Promise<void>;
  onCancel: () => void;
  onDiscard: () => void;
}) {
  const name = useWatch({ control: form.control, name: 'name' });
  const slug = useWatch({ control: form.control, name: 'slug' });
  const excerpt = useWatch({ control: form.control, name: 'excerpt' });
  const image = useWatch({ control: form.control, name: 'image' });
  const cover = typeof image === 'string' ? image : '';

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8"
      >
        <div className="min-w-0 space-y-6">
          <FormSection title="Story" description="The title a reader sees, and the line under it." icon={FileText}>
            <BasicInformationSection section="story" />
          </FormSection>
          <FormSection title="Body" description="The article itself." icon={FileText}>
            <BasicInformationSection section="body" />
          </FormSection>
          <FormSection title="Cover" description="The image on the blog list and at the top of the article." icon={ImageIcon}>
            <MediaSelectInput control={form.control} name="image" label="Cover" typeFilter="image" />
          </FormSection>
          <FormSection title="Search" description="The title and description a search result shows." icon={Search}>
            <MetaInformationSection />
          </FormSection>
          <FormSection title="Index" description="How this article is grouped." icon={Tags}>
            <TagsTopicsSection />
          </FormSection>
          <ResponseError error={error} />
        </div>

        <FormAside>
          <section className="border-border bg-card border">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0 space-y-0.5">
                    <FormLabel className="text-sm font-normal">Published</FormLabel>
                    <FormDescription className="text-xs font-light">Visible on the public blog.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="border-border flex items-start justify-between gap-4 border-t px-5 py-4">
                  <div className="min-w-0 space-y-0.5">
                    <FormLabel className="text-sm font-normal">Featured</FormLabel>
                    <FormDescription className="text-xs font-light">Shown as the lead story.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>

          <section className="border-border bg-card border">
            <div className="bg-muted/40 relative aspect-[16/10] border-b">
              {cover ? (
                <Image
                  src={cover}
                  alt=""
                  fill
                  sizes="22rem"
                  className="object-cover"
                  unoptimized={cover.includes('supabase.co') || cover.startsWith('http')}
                />
              ) : (
                <div className="text-muted-foreground/40 flex h-full items-center justify-center">
                  <FileText className="size-10" strokeWidth={1} />
                </div>
              )}
            </div>
            <div className="space-y-2 p-5">
              <p className="text-primary text-[11px] font-medium tracking-[0.16em] uppercase">Article</p>
              <p className="text-xl leading-tight font-medium tracking-tight">{name || (isEdit ? 'Article' : 'New article')}</p>
              <p className="text-muted-foreground font-mono text-xs">{slug?.trim() ? `/blog/${slug.trim()}` : '/blog'}</p>
              <p className="text-muted-foreground line-clamp-3 text-sm font-light">{excerpt || 'Excerpt'}</p>
            </div>
          </section>

          <FormSaveCard
            isEdit={isEdit}
            isDirty={form.formState.isDirty}
            isSaving={isSaving}
            onCancel={onCancel}
            onDiscard={onDiscard}
            createLabel="Create article"
          />
        </FormAside>
      </form>
    </Form>
  );
}
