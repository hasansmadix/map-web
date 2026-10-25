'use client';

import { INTENT_TYPE_LABEL, intentPath } from '@/components/dashboard/intents/intent-labels';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IIntentBase, IntentType } from '@/types/intents/intent.type';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

export function useIntentColumns(opts: {
  onEdit: (intent: IIntentBase) => void;
  onDelete: (intent: IIntentBase) => void;
}): ColumnDef<IIntentBase>[] {
  const { onEdit, onDelete } = opts;

  return [
    {
      id: 'page',
      header: 'Page',
      accessorKey: 'slug',
      enableSorting: true,
      cell: ({ row }) => {
        const intent = row.original;
        return (
          <div className="min-w-0">
            <div className="max-w-md truncate font-medium">{intent.h1 || intent.slug}</div>
            <div className="text-muted-foreground max-w-md truncate font-mono text-xs">{intentPath(intent.type, intent.slug)}</div>
          </div>
        );
      },
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      enableSorting: true,
      cell: ({ row }) => (
        <Badge variant="outline">{INTENT_TYPE_LABEL[row.original.type as IntentType] || row.original.type}</Badge>
      ),
    },
    {
      id: 'linkLabel',
      header: 'Link',
      accessorKey: 'linkLabel',
      enableSorting: false,
      cell: ({ row }) => <span className="text-sm">{row.original.linkLabel || '—'}</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const intent = row.original;
        return (
          <div onClick={event => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(intent)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(intent)} className="text-destructive">
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
