'use client';

import ActiveField from '@/components/dashboard/equipments/form/active-field';
import { equipmentOptions } from '@/components/dashboard/equipments/form/equipment-option-label';
import { NumericInput } from '@/components/shared/input/NumericInput';
import { SelectInput } from '@/components/shared/input/SelectInput';
import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { TextInput } from '@/components/shared/input/TextInput';
import { EquipmentType } from '@/types/equipments/equipment.enum';
import { useFormContext } from 'react-hook-form';

const typeOptions = equipmentOptions(Object.values(EquipmentType));

function EquipmentCategoryFormFields() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        <TextInput control={control} name="name" label="Name" placeholder="Cinema cameras" />
        <TextInput control={control} name="slug" label="Slug" placeholder="cinema-cameras" />
        <SelectInput control={control} name="type" label="Type" placeholder="Select a type" options={typeOptions} />
        <NumericInput control={control} name="order" label="Order" placeholder="1" />
      </div>
      <TextAreaInput
        control={control}
        name="description"
        label="Description"
        placeholder="What belongs in this group"
        rows={4}
      />
      <ActiveField description="Shown when someone filters the hire catalogue." />
    </div>
  );
}

export default EquipmentCategoryFormFields;
