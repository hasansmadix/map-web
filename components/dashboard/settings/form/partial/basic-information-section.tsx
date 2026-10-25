'use client';

import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { TextInput } from '@/components/shared/input/TextInput';
import { useFormContext } from 'react-hook-form';

export function BasicInformationSection() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <TextInput control={control} name="siteName" label="Site name" placeholder="MAP Media Art Production" />
      <TextAreaInput
        control={control}
        name="siteDescription"
        label="Description"
        placeholder="The line that describes MAP"
        rows={3}
      />
      <TextInput control={control} name="defaultLanguage" label="Language" placeholder="en" />
    </div>
  );
}
