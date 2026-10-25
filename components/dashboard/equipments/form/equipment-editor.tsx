'use client'

import { FormAside, FormAsideCard, FormSaveCard } from '@/components/dashboard/form-aside'
import { FormSection } from '@/components/dashboard/form-section'
import ResponseError from '@/components/shared/response-error'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { useEquipmentMutations } from '@/hooks/api/equipments/mutations'
import { EquipmentType } from '@/types/equipments/equipment.enum'
import type { IEquipment } from '@/types/equipments/equipment.type'
import { getChangedValues, sanitizeDto } from '@/utils/format'
import { createEquipmentSchema, type TCreateEquipmentForm } from '@/validations/equipments/create-equipment.schema'
import { updateEquipmentSchema, type TUpdateEquipmentForm } from '@/validations/equipments/update-equipment.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, ImageIcon, Layers, List, Package } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type Resolver, type UseFormReturn, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import BasicInfoStep from './steps/basic-info-step'
import MediaStep from './steps/media-step'
import SpecificationsStep from './steps/specifications-step'

const TYPE_LABEL: Record<string, string> = {
  [EquipmentType.CAMERA]: 'Camera',
  [EquipmentType.LENS]: 'Lens',
  [EquipmentType.LIGHT]: 'Light',
  [EquipmentType.AUDIO]: 'Audio',
  [EquipmentType.ACCESSORY]: 'Accessory',
}

function emptySpecs(type: EquipmentType) {
  switch (type) {
    case EquipmentType.CAMERA:
      return { type, mounts: [] }
    case EquipmentType.LENS:
      return { type, focalLengthMm: { min: 0, max: 0 }, isZoom: false }
    case EquipmentType.LIGHT:
      return { type, powerW: 0, hasRgb: false }
    case EquipmentType.AUDIO:
      return { type }
    case EquipmentType.ACCESSORY:
      return { type, notes: '' }
  }
}

function toUpdateValues(equipment: IEquipment): TUpdateEquipmentForm {
  return {
    slug: equipment.slug || '',
    name: equipment.name || '',
    summary: equipment.summary || '',
    description: equipment.description || '',
    categoryId: equipment.category.id,
    categoryLabel: equipment.category.name,
    brandId: equipment.brand.id,
    brandLabel: equipment.brand.name,
    isPublished: equipment.isPublished ?? false,
    isFeatured: equipment.isFeatured ?? false,
    coverPath: equipment.coverPath || '',
    gallery: equipment.gallery || [],
    specs: equipment.specs as TUpdateEquipmentForm['specs'],
    status: equipment.status || undefined,
  }
}

export function EquipmentEditor({ equipment }: { equipment?: IEquipment }) {
  if (equipment) return <EditEquipmentEditor equipment={equipment} />
  return <CreateEquipmentEditor />
}

function CreateEquipmentEditor() {
  const router = useRouter()
  const { create } = useEquipmentMutations()
  const form = useForm<TCreateEquipmentForm>({
    resolver: zodResolver(createEquipmentSchema()) as Resolver<TCreateEquipmentForm>,
    defaultValues: {
      equipmentType: EquipmentType.CAMERA,
      isPublished: false,
      isFeatured: false,
      gallery: [],
      specs: emptySpecs(EquipmentType.CAMERA) as TCreateEquipmentForm['specs'],
    },
  })
  const equipmentType = useWatch({ control: form.control, name: 'equipmentType' })
  const watched = useWatch({ control: form.control })

  useEffect(() => {
    const current = form.getValues('specs')
    if (current?.type === equipmentType) return
    form.setValue('specs', emptySpecs(equipmentType) as TCreateEquipmentForm['specs'])
  }, [equipmentType, form])

  const onSubmit = async (data: TCreateEquipmentForm) => {
    const { categoryLabel, brandLabel, ...rest } = data
    try {
      const created = await create.mutateAsync(sanitizeDto(rest) as TCreateEquipmentForm)
      toast.success('Equipment created')
      router.push(created?.id ? `/dashboard/equipments/${created.id}?view=1` : '/dashboard/equipments')
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not create the equipment')
    }
  }

  return (
    <EditorFrame
      form={form}
      isEdit={false}
      isSaving={create.isPending}
      error={create.error as Error}
      typeLabel={TYPE_LABEL[equipmentType] || 'Equipment'}
      name={watched.name}
      brandLabel={watched.brandLabel}
      categoryLabel={watched.categoryLabel}
      cover={watched.coverPath}
      onSubmit={onSubmit}
      onCancel={() => router.push('/dashboard/equipments')}
      onDiscard={() => form.reset()}
    />
  )
}

function EditEquipmentEditor({ equipment }: { equipment: IEquipment }) {
  const router = useRouter()
  const { update } = useEquipmentMutations()
  const form = useForm<TUpdateEquipmentForm>({
    resolver: zodResolver(updateEquipmentSchema()) as Resolver<TUpdateEquipmentForm>,
    defaultValues: toUpdateValues(equipment),
  })
  const watched = useWatch({ control: form.control })

  const onSubmit = async (data: TUpdateEquipmentForm) => {
    const changed = getChangedValues(form.formState.defaultValues as TUpdateEquipmentForm, data) as Partial<TUpdateEquipmentForm>
    if (!Object.keys(changed).length) {
      toast.error('No changes to save')
      return
    }
    try {
      await update.mutateAsync({ id: equipment.id, data: changed })
      toast.success('Equipment saved')
      router.push(`/dashboard/equipments/${equipment.id}?view=1`)
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not save the equipment')
    }
  }

  return (
    <EditorFrame
      form={form}
      isEdit
      isSaving={update.isPending}
      error={update.error as Error}
      typeLabel={TYPE_LABEL[equipment.equipmentType] || 'Equipment'}
      name={watched.name}
      brandLabel={watched.brandLabel}
      categoryLabel={watched.categoryLabel}
      cover={watched.coverPath}
      onSubmit={onSubmit}
      onCancel={() => router.push(`/dashboard/equipments/${equipment.id}?view=1`)}
      onDiscard={() => form.reset(toUpdateValues(equipment))}
    />
  )
}

function EditorFrame<T extends TCreateEquipmentForm | TUpdateEquipmentForm>({
  form,
  isEdit,
  isSaving,
  error,
  typeLabel,
  name,
  brandLabel,
  categoryLabel,
  cover,
  onSubmit,
  onCancel,
  onDiscard,
}: {
  form: UseFormReturn<T>
  isEdit: boolean
  isSaving: boolean
  error?: Error | null
  typeLabel: string
  name?: string
  brandLabel?: string
  categoryLabel?: string
  cover?: string
  onSubmit: (data: T) => Promise<void>
  onCancel: () => void
  onDiscard: () => void
}) {
  const catalogue = [brandLabel, categoryLabel].filter(Boolean).join(' · ')

  return (
    <Form {...(form as unknown as UseFormReturn<TCreateEquipmentForm>)}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8"
      >
        <div className="min-w-0 space-y-6">
          <FormSection title="Identity" description="The name a producer searches for, and the copy on the public page." icon={Camera}>
            <BasicInfoStep isEdit={isEdit} section="identity" />
          </FormSection>
          <FormSection title="Catalogue" description="Where this item sits in the hire list." icon={Layers}>
            <BasicInfoStep isEdit={isEdit} section="catalogue" />
          </FormSection>
          <FormSection title="Specifications" description="The numbers that change with the type of kit." icon={List}>
            <SpecificationsStep />
          </FormSection>
          <FormSection title="Media" description="A cover for the list, and a gallery for the record." icon={ImageIcon}>
            <MediaStep />
          </FormSection>
          <ResponseError error={error ?? null} />
        </div>

        <FormAside>
          <FormAsideCard title="Listing">
            <FormField
              control={form.control as unknown as UseFormReturn<TCreateEquipmentForm>['control']}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0 space-y-0.5">
                    <FormLabel className="text-sm font-normal">Published</FormLabel>
                    <FormDescription className="text-xs font-light">Visible on the public hire list.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as UseFormReturn<TCreateEquipmentForm>['control']}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="border-border flex items-start justify-between gap-4 border-t px-5 py-4">
                  <div className="min-w-0 space-y-0.5">
                    <FormLabel className="text-sm font-normal">Featured</FormLabel>
                    <FormDescription className="text-xs font-light">Shown ahead of the rest of the catalogue.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormAsideCard>

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
                  <Package className="size-10" strokeWidth={1} />
                </div>
              )}
            </div>
            <div className="space-y-2 p-5">
              <p className="text-primary text-[11px] font-medium tracking-[0.16em] uppercase">{typeLabel}</p>
              <p className="text-xl leading-tight font-medium tracking-tight">{name || (isEdit ? 'Equipment' : 'New equipment')}</p>
              <p className="text-muted-foreground text-sm font-light">{catalogue || 'Brand and category'}</p>
            </div>
          </section>

          <FormSaveCard isEdit={isEdit} isDirty={form.formState.isDirty} isSaving={isSaving} onCancel={onCancel} onDiscard={onDiscard} />
        </FormAside>
      </form>
    </Form>
  )
}
