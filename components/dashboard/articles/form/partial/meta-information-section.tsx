import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/shared/input/TextInput';
import { TextAreaInput } from '@/components/shared/input/TextAreaInput';

import ArrayInput from '@/components/shared/input/ArrayInput';

export function MetaInformationSection() {
  const { control } = useFormContext();

  return (
    <>
      <TextInput control={control} name="meta.title" label="Meta title" placeholder="The search result title" />

      <TextAreaInput
        control={control}
        name="meta.description"
        label="Meta description"
        placeholder="The search result description"
        rows={3}
      />

      <ArrayInput name="meta.keywords" label="Keywords" placeholder="Add a keyword" />
    </>
  );
}
