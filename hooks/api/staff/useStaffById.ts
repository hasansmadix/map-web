'use client';

import { useQuery } from '@tanstack/react-query';
import { staffQueryKeys } from '@/hooks/api/keys';
import { staffService } from '@/services/staff.service';
import type { Staff } from '@/types/staff.types';

export function useStaffById(id: number, enabled = true) {
  const { data, isLoading, isError, error, refetch } = useQuery<Staff>({
    queryKey: staffQueryKeys.detail(id),
    queryFn: () => staffService.getById(id),
    enabled: enabled && Number.isFinite(id) && id > 0,
  });

  return {
    data,
    isLoading,
    isError,
    error: (error as Error | undefined) ?? null,
    refetch,
  };
}
