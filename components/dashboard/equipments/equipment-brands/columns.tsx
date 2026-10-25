'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IEquipmentBrand } from '@/types/equipments/equipment-brand.type';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

function initial(name?: string) {
  return name?.trim().charAt(0).toUpperCase() || '?';
}

export function useEquipmentBrandColumns(opts: {
  onEdit: (brand: IEquipmentBrand) => void;
  onDelete: (brand: IEquipmentBrand) => void;
}): ColumnDef<IEquipmentBrand>[] {
  const { onEdit, onDelete } = opts;

  return [
    {
      id: 'name',
      header: 'Brand',
      accessorKey: 'name',
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const brand = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center text-sm font-medium">
              {initial(brand.name)}
            </div>
            <div className="min-w-0">
              <div className="font-medium">{brand.name}</div>
              <div className="text-muted-foreground text-xs">{brand.slug}</div>
            </div>
          </div>
        );
      },
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
        const brand = row.original;

        return (
          <div onClick={event => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(brand)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(brand)} className="text-destructive">
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
