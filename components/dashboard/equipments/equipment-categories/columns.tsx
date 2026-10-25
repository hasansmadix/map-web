'use client';

import { equipmentOptionLabel } from '@/components/dashboard/equipments/form/equipment-option-label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IEquipmentCategory } from '@/types/equipments/equipment-category.type';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

export function useEquipmentCategoryColumns(opts: {
  onEdit: (category: IEquipmentCategory) => void;
  onDelete: (category: IEquipmentCategory) => void;
}): ColumnDef<IEquipmentCategory>[] {
  const { onEdit, onDelete } = opts;

  return [
    {
      id: 'name',
      header: 'Category',
      accessorKey: 'name',
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="min-w-0">
            <div className="font-medium">{category.name}</div>
            <div className="text-muted-foreground text-xs">{category.slug}</div>
          </div>
        );
      },
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      enableSorting: true,
      cell: ({ row }) => <Badge variant="outline">{equipmentOptionLabel(row.original.type)}</Badge>,
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      enableSorting: false,
      cell: ({ row }) => (
        <p className="text-muted-foreground max-w-sm truncate text-sm">{row.original.description || '—'}</p>
      ),
    },
    {
      id: 'order',
      header: 'Order',
      accessorKey: 'order',
      enableSorting: true,
      cell: ({ row }) => <span className="text-muted-foreground text-sm tabular-nums">{row.original.order}</span>,
    },
    {
      id: 'isActive',
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const category = row.original;

        return (
          <div onClick={event => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(category)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(category)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
