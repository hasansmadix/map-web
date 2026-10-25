'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { fieldControlClassName, fieldLabelClassName } from '@/components/shared/input/field-styles';

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  className,
  autoFocus = false,
  disabled = false,
}: TextInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={fieldLabelClassName}>{label}</FormLabel>
          <FormControl>
            <Input
              className={cn(fieldControlClassName, className)}
              placeholder={placeholder}
              type={type}
              autoComplete={autoComplete}
              disabled={disabled}
              {...field}
              value={field.value ?? ''}
              autoFocus={autoFocus}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
