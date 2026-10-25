'use client';

import { FormAside, FormSaveCard } from '@/components/dashboard/form-aside';
import { INTENT_TYPE_LABEL, intentPath } from '@/components/dashboard/intents/intent-labels';
import ResponseError from '@/components/shared/response-error';
import { Form } from '@/components/ui/form';
import { useIntentMutations } from '@/hooks/api/intents/mutations';
import type { IIntentBase, IntentType } from '@/types/intents/intent.type';
import { createIntentSchema, type TCreateIntentForm } from '@/validations/intents/create-intent.schema';
import { updateIntentSchema, type TUpdateIntentForm } from '@/validations/intents/update-intent.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type Resolver, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import IntentFormFields from './intent-form-fields';

function toFormValues(intent?: IIntentBase): TCreateIntentForm {
  const filters = intent?.equipmentFilters;
  return {
    slug: intent?.slug ?? '',
    type: intent?.type,
    parentId: intent?.parentId != null ? String(intent.parentId) : '__none__',
    h1: intent?.h1 ?? '',
    metaTitle: intent?.metaTitle ?? '',
    metaDescription: intent?.metaDescription ?? '',
    metaKeywords: intent?.metaKeywords ?? '',
    subHeading: intent?.subHeading ?? '',
    content: intent?.content ?? '',
    linkLabel: intent?.linkLabel ?? '',
    filterCategoryId: filters?.categoryId != null ? String(filters.categoryId) : '__none__',
    filterBrandId: filters?.brandId != null ? String(filters.brandId) : '__none__',
    filterEquipmentType: filters?.equipmentType ?? '__none__',
    filterIsFeatured: filters?.isFeatured ?? false,
    filterCategoryLabel: '',
    filterBrandLabel: '',
  } as TCreateIntentForm;
}

export function IntentEditor({ intent }: { intent?: IIntentBase }) {
  if (intent) return <EditIntentEditor intent={intent} />;
  return <CreateIntentEditor />;
}

function CreateIntentEditor() {
  const router = useRouter();
  const { create } = useIntentMutations();
  const form = useForm<TCreateIntentForm>({
    resolver: zodResolver(createIntentSchema()) as Resolver<TCreateIntentForm>,
    defaultValues: toFormValues(),
  });

  const onSubmit = async (data: TCreateIntentForm) => {
    try {
      const created = await create.mutateAsync(data);
      toast.success('Intent created');
      router.push(created?.id ? `/dashboard/intents/${created.id}` : '/dashboard/intents');
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not create the intent');
    }
  };

  return (
    <IntentEditorFrame
      form={form}
      isEdit={false}
      isSaving={create.isPending}
      error={(create.error as Error) ?? null}
      onSubmit={onSubmit}
      onCancel={() => router.push('/dashboard/intents')}
      onDiscard={() => form.reset(toFormValues())}
    />
  );
}

function EditIntentEditor({ intent }: { intent: IIntentBase }) {
  const router = useRouter();
  const { update } = useIntentMutations();
  const defaults = toFormValues(intent);
  const form = useForm<TUpdateIntentForm>({
    resolver: zodResolver(updateIntentSchema()) as Resolver<TUpdateIntentForm>,
    defaultValues: defaults,
  });

  const onSubmit = async (data: TUpdateIntentForm) => {
    try {
      await update.mutateAsync({ id: intent.id, data });
      toast.success('Intent saved');
      form.reset(form.getValues());
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not save the intent');
    }
  };

  return (
    <IntentEditorFrame
      form={form as unknown as ReturnType<typeof useForm<TCreateIntentForm>>}
      isEdit
      isSaving={update.isPending}
      error={(update.error as Error) ?? null}
      onSubmit={onSubmit as (data: TCreateIntentForm) => Promise<void>}
      onCancel={() => router.push('/dashboard/intents')}
      onDiscard={() => form.reset(defaults)}
      initialParentId={intent.parentId}
      excludeId={intent.id}
    />
  );
}

function IntentEditorFrame({
  form,
  isEdit,
  isSaving,
  error,
  onSubmit,
  onCancel,
  onDiscard,
  initialParentId,
  excludeId,
}: {
  form: ReturnType<typeof useForm<TCreateIntentForm>>;
  isEdit: boolean;
  isSaving: boolean;
  error: Error | null;
  onSubmit: (data: TCreateIntentForm) => Promise<void>;
  onCancel: () => void;
  onDiscard: () => void;
  initialParentId?: number | null;
  excludeId?: number;
}) {
  const slug = useWatch({ control: form.control, name: 'slug' });
  const type = useWatch({ control: form.control, name: 'type' });
  const heading = useWatch({ control: form.control, name: 'h1' });
  const linkLabel = useWatch({ control: form.control, name: 'linkLabel' });
  const typeLabel = type ? INTENT_TYPE_LABEL[type as IntentType] || type : 'Page';

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8"
      >
        <div className="min-w-0 space-y-6">
          <IntentFormFields initialParentId={initialParentId} excludeId={excludeId} />
          <ResponseError error={error} />
        </div>

        <FormAside>
          <section className="border-border bg-card border">
            <div className="space-y-2 p-5">
              <p className="text-primary text-[11px] font-medium tracking-[0.16em] uppercase">{typeLabel}</p>
              <p className="text-xl leading-tight font-medium tracking-tight">{heading || (isEdit ? 'Intent' : 'New page')}</p>
              <p className="text-muted-foreground font-mono text-xs">{intentPath(type, slug)}</p>
              <p className="text-muted-foreground text-sm font-light">{linkLabel || 'Link label'}</p>
            </div>
          </section>
          <FormSaveCard
            isEdit={isEdit}
            isDirty={form.formState.isDirty}
            isSaving={isSaving}
            onCancel={onCancel}
            onDiscard={onDiscard}
            createLabel="Create intent"
          />
        </FormAside>
      </form>
    </Form>
  );
}
