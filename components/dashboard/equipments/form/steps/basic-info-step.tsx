'use client';

import { useFormContext } from 'react-hook-form';

import { TextInput } from '@/components/shared/input/TextInput';
import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { SelectInput } from '@/components/shared/input/SelectInput';
import { NumericInput } from '@/components/shared/input/NumericInput';
import { CheckboxInput } from '@/components/shared/input/CheckboxInput';

import { EquipmentType } from '@/types/equipments/equipment.enum';
import type { TCreateEquipmentForm } from '@/validations/equipments/create-equipment.schema';
import type { TUpdateEquipmentForm } from '@/validations/equipments/update-equipment.schema';
import { CategorySelector } from '@/components/dashboard/common/selectors/category-selector';

import { BrandSelector } from '@/components/dashboard/common/selectors/brand-selector';

const equipmentTypeOptions = [
  { value: EquipmentType.CAMERA, label: 'Camera' },
  { value: EquipmentType.LENS, label: 'Lens' },
  { value: EquipmentType.LIGHT, label: 'Light' },
  { value: EquipmentType.AUDIO, label: 'Audio' },
  { value: EquipmentType.ACCESSORY, label: 'Accessory' },
];

interface BasicInfoStepProps {
  isEdit?: boolean;
  /** Which fields to render. The editor page splits identity and catalogue. */
  section?: 'all' | 'identity' | 'catalogue';
}

type EquipmentFormBasicInfo = TCreateEquipmentForm | TUpdateEquipmentForm;

function BasicInfoStep({ isEdit = false, section = 'all' }: BasicInfoStepProps) {
  const form = useFormContext<EquipmentFormBasicInfo>();
  const showIdentity = section === 'all' || section === 'identity';
  const showCatalogue = section === 'all' || section === 'catalogue';
  const showPublishing = section === 'all';

  return (
    <div className="space-y-6">
      {showIdentity && !isEdit && (
        <SelectInput
          control={form.control}
          name="equipmentType"
          label="Equipment Type"
          placeholder="Select equipment type"
          options={equipmentTypeOptions}
        />
      )}

      {showIdentity ? (
        <>
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
            <TextInput control={form.control} name="name" label="Name" placeholder="ARRI Alexa 35" />
            <TextInput control={form.control} name="slug" label="Slug" placeholder="arri-alexa-35" />
          </div>
          <TextAreaInput
            control={form.control}
            name="summary"
            label="Summary"
            placeholder="One line a producer can scan"
            rows={3}
          />
          <TextAreaInput
            control={form.control}
            name="description"
            label="Description"
            placeholder="What the item is, and how it is used on a production"
            rows={6}
          />
        </>
      ) : null}

      {showCatalogue ? (
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <CategorySelector
            onValueChange={option => {
              form.setValue('categoryId', Number(option?.value) || 0, { shouldDirty: true, shouldValidate: true });
              form.setValue('categoryLabel', option?.label || '', { shouldDirty: true });
            }}
            value={form.watch('categoryId')}
            valueLabel={form.watch('categoryLabel')}
          />
          {form.formState.errors.categoryId && (
            <p className="text-sm text-red-500">{form.formState.errors.categoryId.message as string}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Brand</label>
          <BrandSelector
            onValueChange={option => {
              form.setValue('brandId', Number(option?.value) || 0, { shouldDirty: true, shouldValidate: true });
              form.setValue('brandLabel', option?.label || '', { shouldDirty: true });
            }}
            value={form.watch('brandId')}
            valueLabel={form.watch('brandLabel')}
          />
          {form.formState.errors.brandId && (
            <p className="text-sm text-red-500">{form.formState.errors.brandId.message as string}</p>
          )}
        </div>
      </div>
      ) : null}

      {showPublishing ? (
      <div className="flex flex-col gap-4 md:col-span-2">
        <CheckboxInput
          control={form.control}
          name="isPublished"
          label="Published"
          description="Make this equipment visible to the public"
        />

        <CheckboxInput
          control={form.control}
          name="isFeatured"
          label="Featured"
          description="Feature this equipment prominently"
        />
      </div>
      ) : null}
    </div>
  );
}

export default BasicInfoStep;
