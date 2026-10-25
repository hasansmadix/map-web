import { cn } from '@/lib/utils'

export const fieldControlClassName = cn(
  'h-11 min-h-11 w-full rounded-none border border-input bg-transparent px-3 text-sm font-light shadow-none',
  'transition-colors outline-none',
  'placeholder:text-muted-foreground',
  'focus-visible:border-primary',
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
)

export const fieldControlTriggerClassName = cn(
  fieldControlClassName,
  'inline-flex items-center justify-between gap-2 whitespace-nowrap font-light shadow-none',
  'bg-transparent hover:bg-muted/40',
  'data-[placeholder]:text-muted-foreground',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
)

export const fieldControlCompactClassName = cn(fieldControlTriggerClassName, 'h-10 min-h-10')

export const fieldLabelClassName = 'text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase'
