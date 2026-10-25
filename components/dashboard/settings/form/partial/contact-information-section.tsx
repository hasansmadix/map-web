'use client';

import { TextInput } from '@/components/shared/input/TextInput';
import { useFormContext } from 'react-hook-form';

export function ContactInformationSection() {
  const { control } = useFormContext();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TextInput control={control} name="contact.email" label="Email" type="email" placeholder="info@maproduction.ae" />
      <TextInput control={control} name="contact.phone" label="Phone" placeholder="+971 54 544 4499" />
      <TextInput control={control} name="contact.address" label="Address" placeholder="B29, Dubai Production City" />
      <TextInput control={control} name="contact.workingHours" label="Hours" placeholder="Monday to Friday, 9:00 to 18:00" />
    </div>
  );
}
