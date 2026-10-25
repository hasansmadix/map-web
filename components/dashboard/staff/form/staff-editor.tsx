'use client';

import { FormAside, FormSaveCard } from '@/components/dashboard/form-aside';
import { FormSection } from '@/components/dashboard/form-section';
import { Form } from '@/components/ui/form';
import { useStaffMutations } from '@/hooks/api/staff/mutations';
import { Role } from '@/types/roles.enum';
import type { Staff } from '@/types/staff.types';
import { getChangedValues } from '@/utils/format';
import { createStaffSchema, type TCreateStaffForm } from '@/validations/staff/create-staff.schema';
import { editStaffSchema, type TEditStaffForm } from '@/validations/staff/edit-staff.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Resolver, type UseFormReturn, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import StaffFormFields, { ROLE_LABEL } from './staff-form-fields';

function toCreateValues(): TCreateStaffForm {
  return {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: Role.AUTHOR,
    bio: '',
    image: '',
  };
}

function toEditValues(staff: Staff): TEditStaffForm {
  return {
    name: staff.name,
    email: staff.email,
    role: staff.role as TEditStaffForm['role'],
    bio: staff.bio || '',
    image: staff.image || '',
  };
}

export function StaffEditor({ staff }: { staff?: Staff }) {
  if (staff) return <EditStaffEditor staff={staff} />;
  return <CreateStaffEditor />;
}

function CreateStaffEditor() {
  const router = useRouter();
  const { create } = useStaffMutations();
  const form = useForm<TCreateStaffForm>({
    resolver: zodResolver(createStaffSchema()) as Resolver<TCreateStaffForm>,
    defaultValues: toCreateValues(),
  });

  const onSubmit = async (data: TCreateStaffForm) => {
    const { confirmPassword: _confirmPassword, ...rest } = data;
    try {
      const created = await create.mutateAsync(rest as TCreateStaffForm);
      toast.success('Staff member created');
      router.push(created?.id ? `/dashboard/staff/${created.id}` : '/dashboard/staff');
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not create the staff member');
    }
  };

  return (
    <EditorFrame
      form={form}
      isEdit={false}
      showPassword
      isSaving={create.isPending}
      onSubmit={onSubmit}
      onCancel={() => router.push('/dashboard/staff')}
      onDiscard={() => form.reset(toCreateValues())}
    />
  );
}

function EditStaffEditor({ staff }: { staff: Staff }) {
  const router = useRouter();
  const { update } = useStaffMutations();
  const defaults = toEditValues(staff);
  const form = useForm<TEditStaffForm>({
    resolver: zodResolver(editStaffSchema()) as Resolver<TEditStaffForm>,
    defaultValues: defaults,
  });

  const onSubmit = async (data: TEditStaffForm) => {
    const { confirmPassword: _confirmPassword, password: _password, ...rest } = data;
    const changed = getChangedValues(form.formState.defaultValues as TEditStaffForm, rest);
    if (!Object.keys(changed).length) {
      toast.error('No changes to save');
      return;
    }
    try {
      await update.mutateAsync({ id: staff.id, data: changed });
      toast.success('Staff member saved');
      form.reset(form.getValues());
    } catch (error) {
      toast.error((error as Error)?.message || 'Could not save the staff member');
    }
  };

  return (
    <EditorFrame
      form={form as unknown as UseFormReturn<TCreateStaffForm>}
      isEdit
      showPassword={false}
      isSaving={update.isPending}
      onSubmit={onSubmit as (data: TCreateStaffForm) => Promise<void>}
      onCancel={() => router.push('/dashboard/staff')}
      onDiscard={() => form.reset(defaults)}
    />
  );
}

function EditorFrame({
  form,
  isEdit,
  showPassword,
  isSaving,
  onSubmit,
  onCancel,
  onDiscard,
}: {
  form: UseFormReturn<TCreateStaffForm>;
  isEdit: boolean;
  showPassword: boolean;
  isSaving: boolean;
  onSubmit: (data: TCreateStaffForm) => Promise<void>;
  onCancel: () => void;
  onDiscard: () => void;
}) {
  const name = useWatch({ control: form.control, name: 'name' });
  const email = useWatch({ control: form.control, name: 'email' });
  const role = useWatch({ control: form.control, name: 'role' });
  const image = useWatch({ control: form.control, name: 'image' });
  const portrait = typeof image === 'string' ? image : '';
  const initials = (name || 'Staff')
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8"
      >
        <div className="min-w-0 space-y-6">
          <FormSection title="Account" description="How this person signs in, and what they can do." icon={UserRound}>
            <StaffFormFields section="account" />
          </FormSection>
          {showPassword ? (
            <FormSection title="Access" description="The password they use the first time they sign in." icon={KeyRound}>
              <StaffFormFields section="access" showPassword />
            </FormSection>
          ) : null}
          <FormSection title="Profile" description="The portrait and the line that describes them." icon={UserRound}>
            <StaffFormFields section="profile" />
          </FormSection>
        </div>

        <FormAside>
          <section className="border-border bg-card border">
            <div className="bg-muted/40 relative aspect-[16/10] border-b">
              {portrait ? (
                <Image
                  src={portrait}
                  alt=""
                  fill
                  sizes="22rem"
                  className="object-cover"
                  unoptimized={portrait.includes('supabase.co') || portrait.startsWith('http')}
                />
              ) : (
                <div className="text-primary flex h-full items-center justify-center text-3xl font-medium tracking-tight">
                  {initials || 'S'}
                </div>
              )}
            </div>
            <div className="space-y-2 p-5">
              <p className="text-primary text-[11px] font-medium tracking-[0.16em] uppercase">
                {ROLE_LABEL[role] || 'Staff'}
              </p>
              <p className="text-xl leading-tight font-medium tracking-tight">{name || (isEdit ? 'Staff' : 'New staff')}</p>
              <p className="text-muted-foreground truncate text-sm font-light">{email || 'name@maproduction.ae'}</p>
            </div>
          </section>

          <FormSaveCard
            isEdit={isEdit}
            isDirty={form.formState.isDirty}
            isSaving={isSaving}
            onCancel={onCancel}
            onDiscard={onDiscard}
            createLabel="Create staff"
          />
        </FormAside>
      </form>
    </Form>
  );
}
