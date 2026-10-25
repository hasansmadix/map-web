'use client';

import { FormAside, FormSaveCard } from '@/components/dashboard/form-aside';
import { AnalyticsSection } from '@/components/dashboard/settings/form/partial/analytics-section';
import { BasicInformationSection } from '@/components/dashboard/settings/form/partial/basic-information-section';
import { ContactInformationSection } from '@/components/dashboard/settings/form/partial/contact-information-section';
import { CustomScriptsSection } from '@/components/dashboard/settings/form/partial/custom-scripts-section';
import { MetaInformationSection } from '@/components/dashboard/settings/form/partial/meta-information-section';
import { SiteImagesSection } from '@/components/dashboard/settings/form/partial/site-images-section';
import { SocialLinksSection } from '@/components/dashboard/settings/form/partial/social-links-section';
import ApiError from '@/components/shared/api-error';
import FormSkeleton from '@/components/shared/skeletons/form-skeleton';
import { Form } from '@/components/ui/form';
import { useSettings } from '@/hooks/api/settings/useSettings';
import { cn } from '@/lib/utils';
import type { Settings } from '@/types/settings.types';
import { getChangedValues } from '@/utils/format';
import { updateSettingsSchema, type TUpdateSettingsForm } from '@/validations/settings/update-settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Code, ImageIcon, Phone, Search, Share2, Type, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { type Resolver, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

const SECTIONS = [
  {
    group: 'Website',
    items: [
      { id: 'site', label: 'Site', description: 'The name and the line under it.', icon: Type },
      { id: 'brand', label: 'Brand', description: 'Logo, dark logo, and favicon.', icon: ImageIcon },
      { id: 'search', label: 'Search', description: 'The title and description a search result shows.', icon: Search },
    ],
  },
  {
    group: 'Reach',
    items: [
      { id: 'contact', label: 'Contact', description: 'Email, phone, address, and hours.', icon: Phone },
      { id: 'social', label: 'Social', description: 'Profiles linked from the site.', icon: Share2 },
    ],
  },
  {
    group: 'Integrations',
    items: [
      { id: 'tracking', label: 'Tracking', description: 'Analytics and scripts added to the site.', icon: Code },
    ],
  },
] as const;

type SectionId = (typeof SECTIONS)[number]['items'][number]['id'];

const SECTION_META = Object.fromEntries(SECTIONS.flatMap(group => group.items.map(item => [item.id, item]))) as Record<
  SectionId,
  { id: SectionId; label: string; description: string; icon: LucideIcon }
>;

function sectionStatus(settings: Settings): Record<SectionId, string> {
  const images = [settings.siteLogo, settings.siteDarkLogo, settings.siteFavicon].filter(Boolean).length;
  const scripts = [
    ...(settings.analytics?.customScripts || []),
    ...(settings.customScripts?.header || []),
    ...(settings.customScripts?.footer || []),
  ].filter(Boolean).length;
  const trackers = [settings.analytics?.googleAnalytics, settings.analytics?.facebookPixel].filter(Boolean).length + scripts;

  return {
    site: settings.siteName ? 'Named' : 'Open',
    brand: `${images}/3`,
    search: settings.meta?.title ? 'Set' : 'Open',
    contact: settings.contact?.email ? 'Set' : 'Open',
    social: String(settings.social?.length || 0),
    tracking: trackers ? String(trackers) : 'Open',
  };
}

function toSlice(settings: Settings, section: SectionId): TUpdateSettingsForm {
  if (section === 'site') {
    return {
      siteName: settings.siteName || '',
      siteDescription: settings.siteDescription || '',
      defaultLanguage: settings.defaultLanguage || 'en',
    };
  }
  if (section === 'brand') {
    return {
      siteLogo: settings.siteLogo || '',
      siteDarkLogo: settings.siteDarkLogo || '',
      siteFavicon: settings.siteFavicon || '',
    };
  }
  if (section === 'search') {
    return {
      meta: {
        title: settings.meta?.title || '',
        description: settings.meta?.description || '',
        keywords: settings.meta?.keywords || [],
      },
    };
  }
  if (section === 'contact') {
    return {
      contact: {
        email: settings.contact?.email || '',
        phone: settings.contact?.phone || '',
        address: settings.contact?.address || '',
        workingHours: settings.contact?.workingHours || '',
      },
    };
  }
  if (section === 'social') return { social: settings.social || [] };
  return {
    analytics: {
      googleAnalytics: settings.analytics?.googleAnalytics || '',
      facebookPixel: settings.analytics?.facebookPixel || '',
      customScripts: settings.analytics?.customScripts || [],
    },
    customScripts: {
      header: settings.customScripts?.header || [],
      footer: settings.customScripts?.footer || [],
    },
  };
}

export default function SettingsEditor() {
  const { data: settings, isLoading, error, refetch } = useSettings();
  const [section, setSection] = useState<SectionId>('site');
  const dirty = useRef(false);

  const openSection = (next: SectionId) => {
    if (next === section) return;
    if (dirty.current && !window.confirm('Save or discard this section before opening another one.')) return;
    dirty.current = false;
    setSection(next);
  };

  if (isLoading) return <FormSkeleton />;
  if (!settings) return <ApiError errorMessage={error || 'Settings could not be loaded'} refetchFunction={refetch} />;

  const meta = SECTION_META[section];
  const status = sectionStatus(settings);

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
      <nav aria-label="Settings" className="lg:sticky lg:top-[calc(var(--app-header-height)+1.5rem)] lg:self-start">
        <div className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:block lg:space-y-6 lg:overflow-visible lg:p-0">
          {SECTIONS.map(group => (
            <div key={group.group} className="flex shrink-0 gap-1 lg:block lg:space-y-1">
              <p className="text-muted-foreground hidden px-3 pb-1 text-[11px] font-medium tracking-[0.16em] uppercase lg:block">
                {group.group}
              </p>
              {group.items.map(item => {
                const selected = item.id === section;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={selected ? 'page' : undefined}
                    onClick={() => openSection(item.id)}
                    className={cn(
                      'flex h-10 w-full shrink-0 cursor-pointer items-center gap-3 border-b-2 px-3 text-start text-sm whitespace-nowrap transition-colors outline-none lg:border-s-2 lg:border-b-0',
                      selected
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent',
                    )}
                  >
                    <Icon className={cn('size-4 shrink-0', selected && 'text-primary')} strokeWidth={1.5} />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <span className="text-muted-foreground hidden text-[11px] font-light tabular-nums lg:inline">
                      {status[item.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      <div className="min-w-0 space-y-6">
        <header className="space-y-1">
          <h2 className="text-2xl font-light tracking-tight">{meta.label}</h2>
          <p className="text-muted-foreground text-sm font-light">{meta.description}</p>
        </header>
        <SliceForm
          key={`${section}-${settings.updatedAt}`}
          settings={settings}
          defaults={toSlice(settings, section)}
          onDirty={isDirty => {
            dirty.current = isDirty;
          }}
        >
          {section === 'site' ? <BasicInformationSection /> : null}
          {section === 'brand' ? <SiteImagesSection /> : null}
          {section === 'search' ? <MetaInformationSection /> : null}
          {section === 'contact' ? <ContactInformationSection /> : null}
          {section === 'social' ? <SocialLinksSection /> : null}
          {section === 'tracking' ? (
            <div className="space-y-8">
              <AnalyticsSection />
              <CustomScriptsSection />
            </div>
          ) : null}
        </SliceForm>
      </div>
    </div>
  );
}

function SliceForm({
  settings,
  defaults,
  onDirty,
  children,
}: {
  settings: Settings;
  defaults: TUpdateSettingsForm;
  onDirty: (isDirty: boolean) => void;
  children: ReactNode;
}) {
  const { updateSettings, isUpdating, updateError } = useSettings();
  const form = useForm<TUpdateSettingsForm>({
    resolver: zodResolver(updateSettingsSchema()) as Resolver<TUpdateSettingsForm>,
    defaultValues: defaults,
  });

  useEffect(() => {
    onDirty(form.formState.isDirty);
  }, [form.formState.isDirty, onDirty]);

  const onSubmit = async (data: TUpdateSettingsForm) => {
    const changed = getChangedValues(form.formState.defaultValues as TUpdateSettingsForm, data);
    if (!Object.keys(changed).length) {
      toast.error('No changes to save');
      return;
    }
    try {
      await updateSettings(changed);
      toast.success('Settings saved');
      form.reset(form.getValues());
    } catch (error) {
      toast.error((error as Error)?.message || updateError || 'Could not save settings');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start"
      >
        <div className="border-border bg-card min-w-0 border px-5 py-6 sm:px-6">{children}</div>
        <FormAside>
          <Identity settings={settings} />
          <FormSaveCard
            isEdit
            isDirty={form.formState.isDirty}
            isSaving={isUpdating}
            onCancel={() => form.reset(defaults)}
            onDiscard={() => form.reset(defaults)}
          />
        </FormAside>
      </form>
    </Form>
  );
}

function Identity({ settings }: { settings: Settings }) {
  const watchedName = useWatch<TUpdateSettingsForm>({ name: 'siteName' });
  const watchedDescription = useWatch<TUpdateSettingsForm>({ name: 'siteDescription' });
  const watchedLogo = useWatch<TUpdateSettingsForm>({ name: 'siteLogo' });
  const name = typeof watchedName === 'string' ? watchedName : settings.siteName;
  const description = typeof watchedDescription === 'string' ? watchedDescription : settings.siteDescription;
  const logo = typeof watchedLogo === 'string' ? watchedLogo : settings.siteLogo;

  return (
    <section className="border-border bg-card border">
      <div className="bg-muted/40 relative aspect-[16/10] border-b">
        {logo ? (
          <Image
            src={logo}
            alt=""
            fill
            sizes="20rem"
            className="object-contain p-8"
            unoptimized={logo.includes('supabase.co') || logo.startsWith('http')}
          />
        ) : (
          <div className="text-primary flex h-full items-center justify-center text-3xl font-medium tracking-tight">MAP</div>
        )}
      </div>
      <div className="space-y-2 p-5">
        <p className="text-primary text-[11px] font-medium tracking-[0.16em] uppercase">Site</p>
        <p className="text-xl leading-tight font-medium tracking-tight">{name || 'MAP'}</p>
        <p className="text-muted-foreground line-clamp-3 text-sm font-light">{description || 'Site description'}</p>
      </div>
    </section>
  );
}
