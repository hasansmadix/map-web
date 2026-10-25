'use client';

import ResponseError from '@/components/shared/response-error';
import { LoadingButton } from '@/components/shared/buttons/loading-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useEquipmentBrandMutations } from '@/hooks/api/equipments/equipment-brands/mutations';
import type { IEquipmentBrand } from '@/types/equipments/equipment-brand.type';
import { getChangedValues } from '@/utils/format';
import {
  updateEquipmentBrandSchema,
  type TUpdateEquipmentBrandForm,
} from '@/validations/equipments/brands/update-equipment-brand.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EquipmentBrandFormFields from './equipment-brand-form-fields';

interface EditEquipmentBrandFormProps {
  isOpen: boolean;
  onClose: () => void;
  brand: IEquipmentBrand;
}

function EditEquipmentBrandForm({ isOpen, onClose, brand }: EditEquipmentBrandFormProps) {
  const { update } = useEquipmentBrandMutations();

  const form = useForm<TUpdateEquipmentBrandForm>({
    resolver: zodResolver(updateEquipmentBrandSchema()),
    defaultValues: {
      name: brand.name,
      slug: brand.slug,
      order: brand.order,
      isActive: brand.isActive,
    },
  });

  const onSubmit = async (data: TUpdateEquipmentBrandForm) => {
    const changedValues = getChangedValues(form.formState.defaultValues as TUpdateEquipmentBrandForm, data);

    if (!Object.keys(changedValues).length) {
      toast.error('No changes to save');
      return;
    }

    try {
      await update.mutateAsync({ id: brand.id, data: changedValues });
      toast.success('Brand saved');
      onClose();
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not save the brand');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-border border-b px-6 py-5">
          <DialogTitle>Edit brand</DialogTitle>
          <DialogDescription>{brand.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 py-5">
            <EquipmentBrandFormFields />
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

export default EditEquipmentBrandForm;
