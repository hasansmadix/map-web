import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const SECTION_CLASS = 'container border-t border-border py-16 md:py-24'

interface PageSectionProps {
  children: ReactNode
  className?: string
}

export function PageSection({ children, className = '' }: PageSectionProps) {
  return <section className={cn(SECTION_CLASS, className)}>{children}</section>
}
