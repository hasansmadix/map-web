'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { TextInput } from '@/components/shared/input/TextInput';
import { NumericInput } from '@/components/shared/input/NumericInput';
import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { groupLabel } from '@/components/dashboard/broadcast-units/unit-labels';
import { fieldControlTriggerClassName, fieldLabelClassName } from '@/components/shared/input/field-styles';
import { BroadcastUnitItemGroup } from '@/types/broadcasts/broadcast.enums';

export function ItemsSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const groupOptions = Object.values(BroadcastUnitItemGroup).map(group => ({
    value: group,
    label: groupLabel(group),
  }));

  const addItem = () => {
    append({
      title: '',
      group: undefined,
      qty: undefined,
      notes: undefined,
      order: undefined,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button type="button" onClick={addItem} size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add item
        </Button>
      </div>
      {fields.length === 0 ? (
        <p className="text-muted-foreground text-sm font-light">No kit on this unit yet.</p>
      ) : (
        fields.map((field, index) => (
          <div key={field.id} className="border-border space-y-4 border p-4">
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-medium">Item {index + 1}</h4>
                  <Button type="button" onClick={() => remove(index)} variant="ghost" size="sm">
                    <Trash2 className="text-destructive h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextInput
                      control={control}
                      name={`items.${index}.title`}
                      label="Title"
                      placeholder="Enter item title"
                    />
                    <FormField
                      control={control}
                      name={`items.${index}.group`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={fieldLabelClassName}>Group</FormLabel>
                          <Select
                            onValueChange={val => field.onChange(val === '__none__' ? undefined : val)}
                            value={field.value || '__none__'}
                          >
                            <FormControl>
                              <SelectTrigger className={fieldControlTriggerClassName}>
                                <SelectValue placeholder="Select group (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="__none__">None</SelectItem>
                              {groupOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <NumericInput
                      control={control}
                      name={`items.${index}.qty`}
                      label="Quantity"
                      placeholder="Enter quantity"
                    />
                    <NumericInput
                      control={control}
                      name={`items.${index}.order`}
                      label="Order"
                      placeholder="Enter order"
                    />
                  </div>
                  <TextAreaInput
                    control={control}
                    name={`items.${index}.notes`}
                    label="Notes"
                    placeholder="Enter notes (optional)"
                    className="min-h-[60px]"
                  />
                </div>
          </div>
        ))
      )}
    </div>
  );
}
