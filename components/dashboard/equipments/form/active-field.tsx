'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useFormContext } from 'react-hook-form';

function ActiveField({ description }: { description: string }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="isActive"
      render={({ field }) => (
        <FormItem className="border-border flex items-start justify-between gap-4 border px-4 py-3">
          <div className="min-w-0 space-y-0.5">
            <FormLabel className="text-sm font-normal">Active</FormLabel>
            <FormDescription className="text-xs font-light">{description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default ActiveField;
