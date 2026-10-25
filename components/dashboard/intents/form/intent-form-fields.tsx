'use client';

import { FormSection } from '@/components/dashboard/form-section';
import { INTENT_TYPE_OPTIONS } from '@/components/dashboard/intents/intent-labels';
import { SelectInput } from '@/components/shared/input/SelectInput';
import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { TextInput } from '@/components/shared/input/TextInput';
import { EditorInput } from '@/components/shared/text-editor/EditorInput';
import { fieldControlTriggerClassName, fieldLabelClassName } from '@/components/shared/input/field-styles';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIntentById, useIntentsForSelect } from '@/hooks/api/intents/use-intents';
import { FileText, ListFilter, Search, Type } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import EquipmentFiltersSection from './equipment-filters-section';

function IntentFormFields({
  initialParentId,
  excludeId,
}: {
  initialParentId?: number | null;
  excludeId?: number;
} = {}) {
  const params = useParams();
  const intentId = params?.id as string | undefined;
  const { control } = useFormContext();

  const { intent: currentIntent } = useIntentById(intentId ?? '', !!intentId);
  const parentIdNum = initialParentId ?? currentIntent?.parentId ?? null;
  const resolvedExcludeId = excludeId ?? currentIntent?.id;

  const { intents, isLoading: intentsLoading } = useIntentsForSelect();
  const { intent: parentIntent, isLoading: parentIntentLoading } = useIntentById(parentIdNum ?? 0, !!parentIdNum);

  const fromIntents = intents
    .filter(intent => !resolvedExcludeId || intent.id !== resolvedExcludeId)
    .map(intent => ({ value: String(intent.id), label: `${intent.h1 || intent.slug}` }));

  const hasParentInList = parentIdNum != null && fromIntents.some(option => option.value === String(parentIdNum));
  const parentOptions = [
    { value: '__none__', label: 'None' },
    ...(parentIntent && parentIdNum != null && !hasParentInList
      ? [{ value: String(parentIntent.id), label: parentIntent.h1 || parentIntent.slug }]
      : []),
    ...fromIntents,
  ];

  const hasParentOption = parentIdNum == null || parentOptions.some(option => option.value === String(parentIdNum));
  const parentSelectReady = !parentIdNum || hasParentOption;
  const parentSelectLoading = parentIdNum != null && !parentSelectReady && (intentsLoading || parentIntentLoading);

  return (
    <div className="space-y-6">
      <FormSection title="Page" description="The address, the heading, and where this page sits in the tree." icon={Type}>
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          <TextInput control={control} name="slug" label="Slug" placeholder="cinema-cameras" />
          <SelectInput control={control} name="type" label="Type" placeholder="Select a type" options={INTENT_TYPE_OPTIONS} />
          <FormField
            control={control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={fieldLabelClassName}>Parent</FormLabel>
                {parentSelectLoading ? (
                  <FormControl>
                    <Input disabled value="" placeholder="Loading parent" readOnly />
                  </FormControl>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    value={
                      field.value != null && field.value !== '' && field.value !== '__none__'
                        ? String(field.value)
                        : '__none__'
                    }
                    disabled={intentsLoading}
                  >
                    <FormControl>
                      <SelectTrigger className={fieldControlTriggerClassName}>
                        <SelectValue placeholder={intentsLoading ? 'Loading' : 'No parent'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {parentOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <TextInput control={control} name="linkLabel" label="Link label" placeholder="Cinema cameras" />
          <TextInput control={control} name="h1" label="Heading" placeholder="Cinema cameras for hire" />
        </div>
        <TextInput control={control} name="subHeading" label="Subheading" placeholder="One line under the title" />
      </FormSection>

      <FormSection title="Search" description="The title and description a search result shows." icon={Search}>
        <TextInput control={control} name="metaTitle" label="Meta title" placeholder="Cinema camera hire in Dubai" />
        <TextAreaInput
          control={control}
          name="metaDescription"
          label="Meta description"
          placeholder="What this page is for"
          rows={3}
        />
        <TextInput control={control} name="metaKeywords" label="Keywords" placeholder="cinema camera, hire, dubai" />
      </FormSection>

      <FormSection title="Body" description="The copy under the equipment list." icon={FileText}>
        <EditorInput control={control} name="content" label="Content" placeholder="Write the page" />
      </FormSection>

      <FormSection title="Catalogue" description="Which equipment this page lists. Leave a field empty to skip that filter." icon={ListFilter}>
        <EquipmentFiltersSection />
      </FormSection>
    </div>
  );
}

export default IntentFormFields;
