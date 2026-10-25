'use client';

import ResponseError from '@/components/shared/response-error';
import { LoadingButton } from '@/components/shared/buttons/loading-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useEquipmentBrandMutations } from '@/hooks/api/equipments/equipment-brands/mutations';
import {
  createEquipmentBrandSchema,
  type TCreateEquipmentBrandForm,
} from '@/validations/equipments/brands/create-equipment-brand.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EquipmentBrandFormFields from './equipment-brand-form-fields';

function AddEquipmentBrand({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { create } = useEquipmentBrandMutations();

  const form = useForm<TCreateEquipmentBrandForm>({
    resolver: zodResolver(createEquipmentBrandSchema()),
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: TCreateEquipmentBrandForm) => {
    try {
      await create.mutateAsync(data);
      toast.success('Brand created');
      form.reset();
      onClose();
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not create the brand');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-border border-b px-6 py-5">
          <DialogTitle>Add brand</DialogTitle>
          <DialogDescription>A maker on the hire list.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6 py-5">
            <EquipmentBrandFormFields />
            <ResponseError error={(create.error as Error) ?? null} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={create.isPending}>
                Cancel
              </Button>
              <LoadingButton isLoading={create.isPending} loadingText="Creating…" defaultText="Create brand" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEquipmentBrand;
