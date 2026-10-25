'use client'

import { useLayoutEffect, useState } from 'react'

export type PageSlotName = 'actions' | 'count'

export function PageSlotTarget({ name, className }: { name: PageSlotName; className?: string }) {
  return <span data-page-slot={name} className={className} />
}

export function usePageSlot(name: PageSlotName): Element | null | undefined {
  const [target, setTarget] = useState<Element | null | undefined>(undefined)

  useLayoutEffect(() => {
    setTarget(document.querySelector(`[data-page-slot="${name}"]`))
  }, [name])

  return target
}
