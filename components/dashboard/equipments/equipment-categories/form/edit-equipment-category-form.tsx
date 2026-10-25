'use client';

import ResponseError from '@/components/shared/response-error';
import { LoadingButton } from '@/components/shared/buttons/loading-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useEquipmentCategoryMutations } from '@/hooks/api/equipments/equipment-categories/mutations';
import type { IEquipmentCategory } from '@/types/equipments/equipment-category.type';
import { getChangedValues } from '@/utils/format';
import {
  updateEquipmentCategorySchema,
  type TUpdateEquipmentCategoryForm,
} from '@/validations/equipments/categories/update-equipment-category.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EquipmentCategoryFormFields from './equipment-category-form-fields';

interface EditEquipmentCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  category: IEquipmentCategory;
}

function EditEquipmentCategoryForm({ isOpen, onClose, category }: EditEquipmentCategoryFormProps) {
  const { update } = useEquipmentCategoryMutations();

  const form = useForm<TUpdateEquipmentCategoryForm>({
    resolver: zodResolver(updateEquipmentCategorySchema()),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      description: category.description,
      type: category.type as TUpdateEquipmentCategoryForm['type'],
      order: category.order,
      isActive: category.isActive,
    },
  });

  const onSubmit = async (data: TUpdateEquipmentCategoryForm) => {
    const changedValues = getChangedValues(form.formState.defaultValues as TUpdateEquipmentCategoryForm, data);

    if (!Object.keys(changedValues).length) {
      toast.error('No changes to save');
      return;
    }

    try {
      await update.mutateAsync({ id: category.id, data: changedValues });
      toast.success('Category saved');
      onClose();
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not save the category');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-border border-b px-6 py-5">
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>{category.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 py-5">
            <EquipmentCategoryFormFields />
            <ResponseError error={(update.error as Error) ?? null} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={update.isPending}>
                Cancel
              </Button>
              <LoadingButton
                isLoading={update.isPending}
                loadingText="Saving…"
                defaultText="Save changes"
                disabled={!form.formState.isDirty}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditEquipmentCategoryForm;
