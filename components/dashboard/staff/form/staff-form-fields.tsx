'use client';

import { MediaSelectInput } from '@/components/shared/input/MediaSelectInput';
import { PasswordInput } from '@/components/shared/input/PasswordInput';
import { SelectInput } from '@/components/shared/input/SelectInput';
import { TextAreaInput } from '@/components/shared/input/TextAreaInput';
import { TextInput } from '@/components/shared/input/TextInput';
import { ROLE_OPTIONS } from '@/types/roles.enum';
import { useFormContext, useWatch } from 'react-hook-form';

const ROLE_LABEL: Record<string, string> = {
  superadmin: 'Super admin',
  admin: 'Admin',
  author: 'Author',
};

function StaffFormFields({
  section = 'all',
  showPassword = false,
}: {
  section?: 'all' | 'account' | 'access' | 'profile';
  showPassword?: boolean;
}) {
  const { control } = useFormContext();
  const role = useWatch({ control, name: 'role' });
  const roles = role === 'superadmin' ? (['superadmin', ...ROLE_OPTIONS] as const) : ROLE_OPTIONS;
  const showAccount = section === 'all' || section === 'account';
  const showAccess = showPassword && (section === 'all' || section === 'access');
  const showProfile = section === 'all' || section === 'profile';

  return (
    <div className="space-y-4">
      {showAccount ? (
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <TextInput control={control} name="name" label="Name" placeholder="Hasan Ali" />
          <TextInput control={control} name="email" label="Email" placeholder="name@maproduction.ae" type="email" />
          <SelectInput
            control={control}
            name="role"
            label="Role"
            placeholder="Select a role"
            options={roles.map(item => ({ value: item, label: ROLE_LABEL[item] || item }))}
          />
        </div>
      ) : null}
      {showAccess ? (
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <PasswordInput control={control} name="password" label="Password" placeholder="At least 8 characters" />
          <PasswordInput
            control={control}
            name="confirmPassword"
            label="Confirm password"
            placeholder="Repeat the password"
          />
        </div>
      ) : null}
      {showProfile ? (
        <>
          <TextAreaInput control={control} name="bio" label="Bio" placeholder="What this person does at MAP" rows={4} />
          <MediaSelectInput control={control} name="image" label="Portrait" typeFilter="image" />
        </>
      ) : null}
    </div>
  );
}

export default StaffFormFields;
export { ROLE_LABEL };
