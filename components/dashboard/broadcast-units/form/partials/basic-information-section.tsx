'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/shared/input/TextInput';
import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { NumericInput } from '@/components/shared/input/NumericInput';
import { broadcastTypeLabel } from '@/components/dashboard/broadcast-units/unit-labels';
import { BroadcastType } from '@/types/broadcasts/broadcast.enums';
import { SelectInput } from '@/components/shared/input/SelectInput';

const broadcastTypeOptions = Object.values(BroadcastType).map(type => ({
  value: type,
  label: broadcastTypeLabel(type),
}));

export function BasicInformationSection({ section = 'all' }: { section?: 'all' | 'identity' | 'search' }) {
  const { control } = useFormContext();
  const showIdentity = section === 'all' || section === 'identity';
  const showSearch = section === 'all' || section === 'search';

  return (
    <div className="space-y-4">
      {showIdentity ? (
        <>
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            <SelectInput
              control={control}
              name="type"
              label="Type"
              placeholder="Select a type"
              options={broadcastTypeOptions}
            />
            <NumericInput control={control} name="order" label="Order" placeholder="1" />
            <TextInput control={control} name="title" label="Title" placeholder="12-camera OB van" />
            <TextInput control={control} name="slug" label="Slug" placeholder="12-camera-ob-van" />
          </div>
          <TextAreaInput
            control={control}
            name="summary"
            label="Summary"
            placeholder="One line a producer can scan"
            rows={3}
          />
        </>
      ) : null}

      {showSearch ? (
        <>
          <TextInput control={control} name="metaTitle" label="Meta title" placeholder="OB van hire in Dubai" />
          <TextAreaInput
            control={control}
            name="metaDescription"
            label="Meta description"
            placeholder="What this unit is for"
            rows={3}
          />
          <TextInput control={control} name="metaKeywords" label="Keywords" placeholder="ob van, outside broadcast, dubai" />
        </>
      ) : null}
    </div>
  );
}
