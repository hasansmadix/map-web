'use client';

import { FormAside, FormSaveCard } from '@/components/dashboard/form-aside';
import { FormSection } from '@/components/dashboard/form-section';
import { broadcastTypeLabel, broadcastUnitPath } from '@/components/dashboard/broadcast-units/unit-labels';
import { MediaMultiSelectInput } from '@/components/shared/input/MediaMultiSelectInput';
import ResponseError from '@/components/shared/response-error';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useBroadcastUnitMutations } from '@/hooks/api/broadcasts/broadcast-unit-mutations';
import { BroadcastType } from '@/types/broadcasts/broadcast.enums';
import type { BroadcastUnit } from '@/types/broadcasts/broadcasts.types';
import { getChangedValues, sanitizeDto } from '@/utils/format';
import {
  createBroadcastUnitSchema,
  type TCreateBroadcastUnitForm,
} from '@/validations/broadcasts/create-broadcast-unit.schema';
import {
  updateBroadcastUnitSchema,
  type TUpdateBroadcastUnitForm,
} from '@/validations/broadcasts/update-broadcast-unit.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, List, Radio, Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Resolver, type UseFormReturn, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { BasicInformationSection } from './partials/basic-information-section';
import { ItemsSection } from './partials/items-section';
import { SpecsSection } from './partials/specs-section';

function coverFromGallery(gallery: TCreateBroadcastUnitForm['gallery'] | undefined) {
  const first = gallery?.[0];
  if (!first) return '';
  if (typeof first === 'string') return first;
  return first.path || '';
}

function toFormValues(unit?: BroadcastUnit): TCreateBroadcastUnitForm {
  const gallery = Array.isArray(unit?.gallery)
    ? unit.gallery.map((item, index) =>
        typeof item === 'string' ? { path: item, order: index + 1 } : { path: item.path, order: item.order || index + 1 },
      )
    : [];

  return {
    type: (unit?.type as BroadcastType) || BroadcastType.OBVAN,
    slug: unit?.slug || '',
    title: unit?.title || '',
    summary: unit?.summary || '',
    metaTitle: unit?.metaTitle || '',
    metaDescription: unit?.metaDescription || '',
    metaKeywords: unit?.metaKeywords || '',
    gallery,
    specs: unit?.specs,
    isPublished: unit?.isPublished ?? false,
    order: unit?.order,
    items: Array.isArray(unit?.items)
      ? unit.items.map(item => ({
          group: item.group,
          title: item.title,
          qty: item.qty,
          notes: item.notes,
          order: item.order,
        }))
      : [],
  } as TCreateBroadcastUnitForm;
}

export function BroadcastUnitEditor({ unit }: { unit?: BroadcastUnit }) {
  if (unit) return <EditBroadcastUnitEditor unit={unit} />;
  return <CreateBroadcastUnitEditor />;
}

function CreateBroadcastUnitEditor() {
  const router = useRouter();
  const { create } = useBroadcastUnitMutations();
  const form = useForm<TCreateBroadcastUnitForm>({
    resolver: zodResolver(createBroadcastUnitSchema()) as Resolver<TCreateBroadcastUnitForm>,
    defaultValues: toFormValues(),
  });

  const onSubmit = async (data: TCreateBroadcastUnitForm) => {
    try {
      const created = await create.mutateAsync(sanitizeDto(data) as TCreateBroadcastUnitForm);
      toast.success('Unit created');
      router.push(created?.id ? `/dashboard/broadcast-units/${created.id}` : '/dashboard/broadcast-units');
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not create the unit');
    }
  };

  return (
    <EditorFrame
      form={form}
      isEdit={false}
      isSaving={create.isPending}
      error={(create.error as Error) ?? null}
      onSubmit={onSubmit}
      onCancel={() => router.push('/dashboard/broadcast-units')}
      onDiscard={() => form.reset(toFormValues())}
    />
  );
}

function EditBroadcastUnitEditor({ unit }: { unit: BroadcastUnit }) {
  const router = useRouter();
  const { update } = useBroadcastUnitMutations();
  const defaults = toFormValues(unit);
  const form = useForm<TUpdateBroadcastUnitForm>({
    resolver: zodResolver(updateBroadcastUnitSchema()) as Resolver<TUpdateBroadcastUnitForm>,
    defaultValues: defaults,
  });

  const onSubmit = async (data: TUpdateBroadcastUnitForm) => {
    const changed = getChangedValues(form.formState.defaultValues as TUpdateBroadcastUnitForm, data);
    if (!Object.keys(changed).length) {
      toast.error('No changes to save');
      return;
    }
    try {
      await update.mutateAsync({ id: unit.id, data: changed });
      toast.success('Unit saved');
      form.reset(form.getValues());
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not save the unit');
    }
  };

  return (
    <EditorFrame
      form={form as unknown as UseFormReturn<TCreateBroadcastUnitForm>}
      isEdit
      isSaving={update.isPending}
      error={(update.error as Error) ?? null}
      onSubmit={onSubmit as (data: TCreateBroadcastUnitForm) => Promise<void>}
      onCancel={() => router.push('/dashboard/broadcast-units')}
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
  form: UseFormReturn<TCreateBroadcastUnitForm>;
  isEdit: boolean;
  isSaving: boolean;
  error: Error | null;
  onSubmit: (data: TCreateBroadcastUnitForm) => Promise<void>;
  onCancel: () => void;
  onDiscard: () => void;
}) {
  const title = useWatch({ control: form.control, name: 'title' });
  const slug = useWatch({ control: form.control, name: 'slug' });
  const type = useWatch({ control: form.control, name: 'type' });
  const summary = useWatch({ control: form.control, name: 'summary' });
  const gallery = useWatch({ control: form.control, name: 'gallery' });
  const cover = coverFromGallery(gallery);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8"
      >
        <div className="min-w-0 space-y-6">
          <FormSection title="Unit" description="The name on the public page, and where it sits in the list." icon={Radio}>
            <BasicInformationSection section="identity" />
          </FormSection>
          <FormSection title="Search" description="The title and description a search result shows." icon={Search}>
            <BasicInformationSection section="search" />
          </FormSection>
          <FormSection title="Specifications" description="The numbers a producer checks before booking the unit." icon={SlidersHorizontal}>
            <SpecsSection />
          </FormSection>
          <FormSection title="Kit" description="The equipment that travels with this unit." icon={List}>
            <ItemsSection />
          </FormSection>
          <FormSection title="Media" description="Photographs of the van or the flight case." icon={ImageIcon}>
            <MediaMultiSelectInput control={form.control} name="gallery" label="Gallery" typeFilter="image" />
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
                    <FormDescription className="text-xs font-light">Visible on the public broadcasting pages.</FormDescription>
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
                  <Radio className="size-10" strokeWidth={1} />
                </div>
              )}
            </div>
            <div className="space-y-2 p-5">
              <p className="text-primary text-[11px] font-medium tracking-[0.16em] uppercase">{broadcastTypeLabel(type)}</p>
              <p className="text-xl leading-tight font-medium tracking-tight">{title || (isEdit ? 'Unit' : 'New unit')}</p>
              <p className="text-muted-foreground font-mono text-xs">{broadcastUnitPath(slug)}</p>
              <p className="text-muted-foreground line-clamp-3 text-sm font-light">{summary || 'Summary'}</p>
            </div>
          </section>

          <FormSaveCard
            isEdit={isEdit}
            isDirty={form.formState.isDirty}
            isSaving={isSaving}
            onCancel={onCancel}
            onDiscard={onDiscard}
            createLabel="Create unit"
          />
        </FormAside>
      </form>
    </Form>
  );
}
