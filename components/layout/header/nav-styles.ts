import { cn } from '@/lib/utils'
import { navLinkClassName } from '@/components/website/common/marketing-styles'

export function headerNavLinkClass(onDark: boolean, isActive = false) {
  return cn(
    navLinkClassName,
    'rounded-none bg-transparent p-0 hover:bg-transparent! focus:bg-transparent! data-[active=true]:bg-transparent! data-[active=true]:hover:bg-transparent!',
    onDark
      ? 'text-white/80 hover:text-white! focus:text-white! after:bg-white'
      : 'text-foreground hover:text-primary! focus:text-primary!',
    isActive && (onDark ? 'text-white! after:scale-x-100' : 'text-primary! after:scale-x-100'),
  )
}

export function headerNavTriggerClass(onDark: boolean) {
  return cn(
    'h-auto cursor-pointer rounded-none bg-transparent! px-0 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase shadow-none',
    'hover:bg-transparent! focus:bg-transparent! data-[state=open]:bg-transparent! data-[state=open]:hover:bg-transparent! data-[state=open]:focus:bg-transparent!',
    onDark
      ? 'text-white/80 hover:text-white! focus:text-white! data-[state=open]:text-white!'
      : 'text-foreground hover:text-primary! focus:text-primary! data-[state=open]:text-primary!',
  )
}

export function headerMenuPanelClass(onDark: boolean) {
  return cn(
    'w-80 rounded-none! shadow-none!',
    onDark ? 'border-white/10 bg-foreground! text-white!' : 'bg-popover text-popover-foreground',
  )
}

export function headerMenuItemClass(onDark: boolean) {
  return cn(
    'group flex flex-col gap-1 px-3 py-2.5 leading-none no-underline transition-colors outline-none select-none',
    onDark
      ? 'hover:bg-white/10! focus:bg-white/10! hover:text-white! focus:text-white!'
      : 'hover:bg-primary/10! focus:bg-primary/10! hover:text-foreground! focus:text-foreground!',
  )
}

export function headerMenuTitleClass(onDark: boolean) {
  return cn('text-[13px] font-medium tracking-tight', onDark ? 'text-white' : 'text-foreground')
}

export function headerMenuDescriptionClass(onDark: boolean) {
  return cn('line-clamp-2 text-[12px] leading-snug', onDark ? 'text-white/60' : 'text-muted-foreground')
}
