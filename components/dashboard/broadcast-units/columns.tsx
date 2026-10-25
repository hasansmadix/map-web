'use client';

import { broadcastTypeLabel, broadcastUnitPath } from '@/components/dashboard/broadcast-units/unit-labels';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BroadcastUnit } from '@/types/broadcasts/broadcasts.types';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Radio, Trash2 } from 'lucide-react';

export function useBroadcastUnitColumns(opts: {
  onDelete: (broadcastUnit: BroadcastUnit) => void;
  onEdit: (broadcastUnit: BroadcastUnit) => void;
}): ColumnDef<BroadcastUnit>[] {
  const { onDelete, onEdit } = opts;

  return [
    {
      id: 'title',
      header: 'Unit',
      accessorKey: 'title',
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const unit = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center">
              <Radio className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="max-w-md truncate font-medium">{unit.title || unit.slug}</div>
              <div className="text-muted-foreground max-w-md truncate font-mono text-xs">{broadcastUnitPath(unit.slug)}</div>
            </div>
          </div>
        );
      },
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      enableSorting: true,
      cell: ({ row }) => <Badge variant="outline">{broadcastTypeLabel(row.original.type)}</Badge>,
    },
    {
      id: 'items',
      header: 'Kit',
      enableSorting: false,
      cell: ({ row }) => {
        const count = row.original.items?.length || 0;
        return <span className="text-muted-foreground text-sm tabular-nums">{count}</span>;
      },
    },
    {
      id: 'summary',
      header: 'Summary',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-muted-foreground max-w-xs truncate text-sm">{row.original.summary || '—'}</div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => (
        <Badge variant={row.original.isPublished ? 'default' : 'secondary'}>
          {row.original.isPublished ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const unit = row.original;
        return (
          <div onClick={event => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(unit)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(unit)} className="text-destructive">
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
