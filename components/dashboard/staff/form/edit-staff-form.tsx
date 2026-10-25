'use client';

import ApiError from '@/components/shared/api-error';
import FormSkeleton from '@/components/shared/skeletons/form-skeleton';
import { useStaffById } from '@/hooks/api/staff/useStaffById';
import { StaffEditor } from './staff-editor';

export function EditStaffForm({ staffId }: { staffId: string }) {
  const { data: staff, isLoading, error, refetch } = useStaffById(Number(staffId));

  if (isLoading) return <FormSkeleton />;
  if (!staff) return <ApiError errorMessage={error?.message || 'This person could not be loaded'} refetchFunction={refetch} />;

  return <StaffEditor staff={staff} />;
}
