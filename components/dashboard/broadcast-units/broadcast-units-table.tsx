'use client';

import { useState, useMemo } from 'react';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/shared/table/data-table';

import { useRouter } from 'next/navigation';
import { useBroadcastUnitMutations } from '@/hooks/api/broadcasts/broadcast-unit-mutations';
import { useBroadcastUnitsController } from '@/hooks/api/broadcasts/useBroadcastUnitsController';

import { useBroadcastUnitColumns } from './columns';
import { TableHeader, type FilterInfo } from '@/components/shared/table/table-header';

import type { BroadcastUnit } from '@/types/broadcasts/broadcasts.types';
import dynamic from 'next/dynamic';
import DialogSkeleton from '../../shared/skeletons/dialog-skeleton';
import { SelectFilter } from '@/components/shared/selects/select-filter';
import { broadcastTypeLabel } from '@/components/dashboard/broadcast-units/unit-labels';
import { BroadcastType } from '@/types/broadcasts/broadcast.enums';

const ConfirmationDialogDynamic = dynamic(
  () => import('@/components/shared/confirmation-dialog').then(mod => mod.ConfirmationDialog),
  {
    ssr: false,
    loading: () => <DialogSkeleton />,
  },
);

export function BroadcastUnitsTable() {
  const router = useRouter();

  const [broadcastUnitToDelete, setBroadcastUnitToDelete] = useState<BroadcastUnit | null>(null);

  const {
    items: broadcastUnitsList,
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
  } = useBroadcastUnitsController();

  const publishedFilter = urlState.isPublished ?? undefined;
  const typeFilter = urlState.type ?? undefined;

  const { del: deleteBroadcastUnit } = useBroadcastUnitMutations();

  const handleDeleteBroadcastUnit = async () => {
    if (!broadcastUnitToDelete) return;

    try {
      await deleteBroadcastUnit.mutateAsync(broadcastUnitToDelete.id);

      toast.success('Unit deleted');

      setBroadcastUnitToDelete(null);
    } catch (error) {
      const errMsg = (error as Error).message || 'Could not delete the unit';

      toast.error(errMsg);
      console.error('Error deleting broadcast unit:', error);
    }
  };

  const columns = useBroadcastUnitColumns({
    onDelete: setBroadcastUnitToDelete,
    onEdit: unit => router.push(`/dashboard/broadcast-units/${unit.id}`),
  });

  const handleAddBroadcastUnit = () => {
    router.push(`/dashboard/broadcast-units/add`);
  };

  // Prepare filter information for the header
  const filterInfo: FilterInfo[] = useMemo(() => {
    const filters: FilterInfo[] = [];

    if (publishedFilter !== undefined) {
      filters.push({
        key: 'isPublished',
        label: 'Status',
        value: publishedFilter ? 'Published' : 'Draft',
      });
    }

    if (typeFilter) {
      filters.push({
        key: 'type',
        label: 'Type',
        value: broadcastTypeLabel(typeFilter),
      });
    }

    return filters;
  }, [publishedFilter, typeFilter]);

  const broadcastTypeOptions = Object.values(BroadcastType).map(type => ({
    value: type,
    label: broadcastTypeLabel(type),
  }));

  return (
    <>
        {/* ========================== Page Header ========================== */}
        <TableHeader
          title="Broadcast units"
          total={total}
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isPending}
          searchTerm={searchTerm}
          onClearSearch={() => setSearch('')}
          filters={filterInfo}
          onClearAllFilters={clearAll}
          onAdd={handleAddBroadcastUnit}
          addButtonText="Add unit"
          entityName="unit"
          entityNamePlural="units"
        />

        {/* ========================== Table ========================== */}
          <DataTable
            tableId="broadcast-units-table"
            columns={columns}
            data={broadcastUnitsList}
            isLoading={isPending}
            error={error}
            refetch={refetch}
            emptyMessage="No units match this list."
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
              searchPlaceholder: 'Search units',
              noData: 'No units yet',
            }}
            onRowClick={unit => router.push(`/dashboard/broadcast-units/${unit.id}`)}
            toolbarRight={
              <div className="flex flex-wrap items-center gap-2">
                <SelectFilter
                  value={publishedFilter === undefined ? 'all' : publishedFilter ? 'true' : 'false'}
                  onValueChange={val =>
                    setFilter('isPublished', val === undefined ? undefined : val === 'true' ? true : false)
                  }
                  options={[
                    { value: 'true', label: 'Published' },
                    { value: 'false', label: 'Draft' },
                  ]}
                  allOptionLabel="All Status"
                  className="w-32"
                />
                <SelectFilter
                  value={typeFilter}
                  onValueChange={val => setFilter('type', val)}
                  options={broadcastTypeOptions}
                  allOptionLabel="All Types"
                  className="w-40"
                />

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1">
                    Clear All
                  </Button>
                )}
              </div>
            }
          />

      {/* ========================== Delete Modal ========================== */}
      {broadcastUnitToDelete && (
        <ConfirmationDialogDynamic
          open={!!broadcastUnitToDelete}
          onOpenChange={open => !open && setBroadcastUnitToDelete(null)}
          onConfirm={handleDeleteBroadcastUnit}
          title="Delete unit"
          description={`Delete ${broadcastUnitToDelete.title || broadcastUnitToDelete.slug}? The public page for this unit will go away.`}
          loadingText="Deleting..."
          isLoading={deleteBroadcastUnit.isPending}
          variant="destructive"
        />
      )}
    </>
  );
}
