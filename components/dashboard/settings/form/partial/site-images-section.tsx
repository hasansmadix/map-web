'use client';

import { MediaSelectInput } from '@/components/shared/input/MediaSelectInput';
import { useFormContext } from 'react-hook-form';

export function SiteImagesSection() {
  const { control } = useFormContext();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <MediaSelectInput control={control} name="siteLogo" label="Logo" typeFilter="image" />
      <MediaSelectInput control={control} name="siteDarkLogo" label="Dark logo" typeFilter="image" />
      <MediaSelectInput control={control} name="siteFavicon" label="Favicon" typeFilter="image" />
    </div>
  );
}
