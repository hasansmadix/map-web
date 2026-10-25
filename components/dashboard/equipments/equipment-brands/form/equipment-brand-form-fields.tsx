'use client';

import ActiveField from '@/components/dashboard/equipments/form/active-field';
import { NumericInput } from '@/components/shared/input/NumericInput';
import { TextInput } from '@/components/shared/input/TextInput';
import { useFormContext } from 'react-hook-form';

function EquipmentBrandFormFields() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        <TextInput control={control} name="name" label="Name" placeholder="ARRI" />
        <TextInput control={control} name="slug" label="Slug" placeholder="arri" />
      </div>
      <NumericInput control={control} name="order" label="Order" placeholder="1" />
      <ActiveField description="Shown when someone filters the hire catalogue by maker." />
    </div>
  );
}

export default EquipmentBrandFormFields;
