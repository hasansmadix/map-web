'use client';

import { useState, useMemo } from 'react';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/shared/table/data-table';

import { useEquipmentCategoryMutations } from '@/hooks/api/equipments/equipment-categories/mutations';
import { useEquipmentCategoriesController } from '@/hooks/api/equipments/equipment-categories/use-equipment-categories-controller';
import { useEquipmentCategoryColumns } from '@/components/dashboard/equipments/equipment-categories/columns';
import { TableHeader, type FilterInfo } from '@/components/shared/table/table-header';

import type { IEquipmentCategory } from '@/types/equipments/equipment-category.type';
import dynamic from 'next/dynamic';
import DialogSkeleton from '@/components/shared/skeletons/dialog-skeleton';
import { SelectFilter } from '@/components/shared/selects/select-filter';
import { EquipmentType } from '@/types/equipments/equipment.enum';

const AddEquipmentCategoryDynamic = dynamic(
  () => import('@/components/dashboard/equipments/equipment-categories/form/add-equipment-category-form'),
  {
    ssr: false,
    loading: () => <DialogSkeleton />,
  },
);

const EditEquipmentCategoryDynamic = dynamic(
  () => import('@/components/dashboard/equipments/equipment-categories/form/edit-equipment-category-form'),
  {
    ssr: false,
    loading: () => <DialogSkeleton />,
  },
);

const ConfirmationDialogDynamic = dynamic(
  () => import('@/components/shared/confirmation-dialog').then(mod => mod.ConfirmationDialog),
  {
    ssr: false,
    loading: () => <DialogSkeleton />,
  },
);

type DialogType = 'add' | 'edit' | 'delete' | null;

function EquipmentCategoriesTable() {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedCategory, setSelectedCategory] = useState<IEquipmentCategory | null>(null);

  const {
    items: categories,
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
  } = useEquipmentCategoriesController();

  const isActiveFilter = urlState.isActive ?? undefined;
  const typeFilter = urlState.type ?? undefined;

  const { del: deleteCategory } = useEquipmentCategoryMutations();

  const handleEdit = (category: IEquipmentCategory) => {
    setSelectedCategory(category);
    setActiveDialog('edit');
  };

  const handleDelete = (category: IEquipmentCategory) => {
    setSelectedCategory(category);
    setActiveDialog('delete');
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      await deleteCategory.mutateAsync(selectedCategory.id);

      toast.success('Category deleted');

      setSelectedCategory(null);
      setActiveDialog(null);
    } catch (error) {
      const errMsg = (error as Error).message || 'Could not delete the category';

      toast.error(errMsg);
      console.error('Error deleting equipment category:', error);
    }
  };

  const columns = useEquipmentCategoryColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const handleAddCategory = () => {
    setActiveDialog('add');
  };

  // Prepare filter information for the header
  const filterInfo: FilterInfo[] = useMemo(() => {
    const filters: FilterInfo[] = [];

    if (isActiveFilter !== undefined) {
      filters.push({
        key: 'isActive',
        label: 'Status',
        value: isActiveFilter ? 'Active' : 'Inactive',
      });
    }

    if (typeFilter) {
      const typeLabel = typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1);
      filters.push({
        key: 'type',
        label: 'Type',
        value: typeLabel,
      });
    }

    return filters;
  }, [isActiveFilter, typeFilter]);

  const equipmentTypeOptions = Object.values(EquipmentType).map(type => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));

  return (
    <>
        {/* ========================== Page Header ========================== */}
        <TableHeader
          title="Categories"
          total={total}
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isPending}
          searchTerm={searchTerm}
          onClearSearch={() => setSearch('')}
          filters={filterInfo}
          onClearAllFilters={clearAll}
          onAdd={handleAddCategory}
          addButtonText="Add category"
          entityName="category"
          entityNamePlural="categories"
        />

        {/* ========================== Table ========================== */}
          <DataTable
            tableId="equipment-categories-table"
            columns={columns}
            data={categories}
            isLoading={isPending}
            error={error}
            refetch={refetch}
            emptyMessage="No categories match this list."
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
              searchPlaceholder: 'Search categories',
              noData: 'No categories yet',
            }}
            onRowClick={handleEdit}
            toolbarRight={
              <div className="flex flex-wrap items-center gap-2">
                <SelectFilter
                  value={typeFilter || 'all'}
                  onValueChange={val => setFilter('type', val === 'all' ? undefined : (val as EquipmentType))}
                  options={equipmentTypeOptions}
                  allOptionLabel="All Types"
                  className="w-32"
                />

                <SelectFilter
                  value={isActiveFilter === undefined ? 'all' : isActiveFilter ? 'true' : 'false'}
                  onValueChange={val =>
                    setFilter('isActive', val === 'all' ? undefined : val === 'true' ? true : false)
                  }
                  options={[
                    { value: 'true', label: 'Active' },
                    { value: 'false', label: 'Inactive' },
                  ]}
                  allOptionLabel="All Status"
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

      {/* ========================== Add Modal ========================== */}
      {activeDialog === 'add' && (
        <AddEquipmentCategoryDynamic isOpen={activeDialog === 'add'} onClose={() => setActiveDialog(null)} />
      )}

      {/* ========================== Edit Modal ========================== */}
      {activeDialog === 'edit' && (
        <EditEquipmentCategoryDynamic
          isOpen={activeDialog === 'edit'}
          onClose={() => setActiveDialog(null)}
          category={selectedCategory as IEquipmentCategory}
        />
      )}

      {/* ========================== Delete Modal ========================== */}
      {activeDialog === 'delete' && (
        <ConfirmationDialogDynamic
          open={activeDialog === 'delete'}
          onOpenChange={open => !open && setActiveDialog(null)}
          onConfirm={handleDeleteCategory}
          title="Delete category"
          description={`Delete ${selectedCategory?.name || 'this category'}? Items that use it will need another group.`}
          loadingText="Deleting..."
          isLoading={deleteCategory.isPending}
          variant="destructive"
        />
      )}
    </>
  );
}

export default EquipmentCategoriesTable;
