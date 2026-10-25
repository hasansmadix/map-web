'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/shared/input/TextInput';

import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { EditorInput } from '@/components/shared/text-editor/EditorInput';

export function BasicInformationSection({ section = 'all' }: { section?: 'all' | 'story' | 'body' }) {
  const { control } = useFormContext();
  const showStory = section === 'all' || section === 'story';
  const showBody = section === 'all' || section === 'body';

  return (
    <div className="space-y-4">
      {showStory ? (
        <>
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            <TextInput control={control} name="name" label="Title" placeholder="Notes from the studio" />
            <TextInput control={control} name="slug" label="Slug" placeholder="notes-from-the-studio" />
          </div>
          <TextAreaInput
            control={control}
            name="excerpt"
            label="Excerpt"
            placeholder="The line under the title"
            rows={3}
          />
        </>
      ) : null}
      {showBody ? (
        <EditorInput control={control} name="content" label="Content" placeholder="Write the article" language="en" />
      ) : null}
    </div>
  );
}
