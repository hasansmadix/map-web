'use client';

import { useState, useMemo } from 'react';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/shared/table/data-table';

import { useRouter } from 'next/navigation';
import { useStaffMutations } from '@/hooks/api/staff/mutations';
import { useStaffMe } from '@/hooks/api/staff/useStaffMe';
import { useStaffController } from '@/hooks/api/staff/useStaffController';
import { ROLE_LABEL } from '@/components/dashboard/staff/form/staff-form-fields';
import { useStaffColumns } from './columns';
import { TableHeader, type FilterInfo } from '@/components/shared/table/table-header';

import { Role, type Staff } from '@/types/staff.types';
import dynamic from 'next/dynamic';
import DialogSkeleton from '@/components/shared/skeletons/dialog-skeleton';
import { SelectFilter } from '@/components/shared/selects/select-filter';

const ConfirmationDialogDynamic = dynamic(
  () => import('@/components/shared/confirmation-dialog').then(mod => mod.ConfirmationDialog),
  {
    ssr: false,
    loading: () => <DialogSkeleton />,
  },
);

function StaffTable() {
  const router = useRouter();
  const { isCurrentUser, isAuthor, isAdmin } = useStaffMe();
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);

  const {
    items: staff,
    total,
    totalPages,
    error,
    isPending,
    refetch,

    currentPage,
    pageSize,
    searchTerm,
    urlState,
    hasActiveFilters,

    setSearch,
    setPage,
    setPageSize,
    setFilter,
    clearAll,
  } = useStaffController();

  const roleFilter = urlState.role ?? undefined;

  const { del: deleteStaff } = useStaffMutations();

  const handleEdit = (person: Staff) => {
    router.push(`/dashboard/staff/${person.id}`);
  };

  const handleDelete = (person: Staff) => {
    setStaffToDelete(person);
  };

  const handleDeleteStaff = async () => {
    if (!staffToDelete) return;

    try {
      await deleteStaff.mutateAsync(staffToDelete.id);
      toast.success('Staff deleted successfully');
      setStaffToDelete(null);
    } catch (error) {
      const errMsg = (error as Error).message || 'Failed to delete staff';
      toast.error(errMsg);
    }
  };

  const columns = useStaffColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const handleAddStaff = () => {
    router.push('/dashboard/staff/add');
  };

  // Prepare filter information for the header
  const filterInfo: FilterInfo[] = useMemo(() => {
    const filters: FilterInfo[] = [];

    if (roleFilter) {
      const roleLabel = ROLE_LABEL[roleFilter] || roleFilter;
      filters.push({
        key: 'role',
        label: 'Role',
        value: roleLabel,
      });
    }

    return filters;
  }, [roleFilter]);

  return (
    <>
        {/* ========================== Page Header ========================== */}
        <TableHeader
          title="Staff"
          total={total}
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isPending}
          searchTerm={searchTerm}
          onClearSearch={() => setSearch('')}
          filters={filterInfo}
          onClearAllFilters={clearAll}
          onAdd={handleAddStaff}
          addButtonText="Add staff"
          entityName={'Staff'}
          entityNamePlural={'Staff'}
        />

        {/* ========================== Table ========================== */}
          <DataTable
            tableId="staff-table"
            columns={columns}
            data={staff}
            isLoading={isPending}
            error={error}
            refetch={refetch}
            emptyMessage="No staff yet"
            onRowClick={person => {
              const isCurrent = isCurrentUser(person.id);
              const isViewingNonAuthor = person.role !== Role.AUTHOR;
              if (isCurrent || isAuthor || (isAdmin && isViewingNonAuthor)) return;
              handleEdit(person);
            }}
            pageIndex={currentPage}
            pageSize={pageSize}
            totalRows={total}
            totalPages={totalPages}
            canNextPage={currentPage < totalPages}
            canPrevPage={currentPage > 1}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            enableClientSorting={true}
            enableGlobalFilter={true}
            onGlobalFilterChange={setSearch}
            initialGlobalFilter={searchTerm}
            manualFiltering={true}
            messages={{
              searchPlaceholder: 'Search staff',
              noData: 'No staff yet',
            }}
            toolbarRight={
              <div className="flex flex-wrap items-center gap-2">
                <SelectFilter
                  value={roleFilter || 'all'}
                  onValueChange={val => setFilter('role', val === undefined ? undefined : (val as Role))}
                  options={[
                    { value: 'superadmin', label: 'Super admin' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'author', label: 'Author' },
                  ]}
                  allOptionLabel="All roles"
                  className="w-32"
                />

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1">
                    Clear All
                  </Button>
                )}
              </div>
            }
          />

      {staffToDelete && (
        <ConfirmationDialogDynamic
          open={!!staffToDelete}
          onOpenChange={open => !open && setStaffToDelete(null)}
          onConfirm={handleDeleteStaff}
          title={`Delete ${staffToDelete.name || 'this person'}`}
          description={`This removes ${staffToDelete.name || 'this person'} from the dashboard.`}
          loadingText="Deleting..."
          isLoading={deleteStaff.isPending}
          variant="destructive"
        />
      )}
    </>
  );
}

export default StaffTable;
