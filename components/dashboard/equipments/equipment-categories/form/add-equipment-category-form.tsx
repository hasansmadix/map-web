'use client';

import ResponseError from '@/components/shared/response-error';
import { LoadingButton } from '@/components/shared/buttons/loading-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useEquipmentCategoryMutations } from '@/hooks/api/equipments/equipment-categories/mutations';
import {
  createEquipmentCategorySchema,
  type TCreateEquipmentCategoryForm,
} from '@/validations/equipments/categories/create-equipment-category.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EquipmentCategoryFormFields from './equipment-category-form-fields';

function AddEquipmentCategory({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { create } = useEquipmentCategoryMutations();

  const form = useForm<TCreateEquipmentCategoryForm>({
    resolver: zodResolver(createEquipmentCategorySchema()),
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: TCreateEquipmentCategoryForm) => {
    try {
      await create.mutateAsync(data);
      toast.success('Category created');
      form.reset();
      onClose();
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not create the category');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-border border-b px-6 py-5">
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>A group in the hire catalogue, tied to one type of kit.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 py-5">
            <EquipmentCategoryFormFields />
            <ResponseError error={(create.error as Error) ?? null} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={create.isPending}>
                Cancel
              </Button>
              <LoadingButton isLoading={create.isPending} loadingText="Creating…" defaultText="Create category" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEquipmentCategory;
