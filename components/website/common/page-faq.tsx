import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { displayTitleClassName, eyebrowClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

export interface FaqItem {
  q: string
  a: string
}

interface PageFaqProps {
  title?: string
  items: FaqItem[]
}

export function PageFaq({ title = 'Questions, answered', items }: PageFaqProps) {
  return (
    <div>
      <p className={eyebrowClassName}>
        <span className="bg-primary h-px w-8" aria-hidden />
        Questions
      </p>
      <h2 className={cn(displayTitleClassName, 'mb-8 text-3xl md:text-4xl')}>{title}</h2>
      <Accordion type="single" collapsible className="border-border border-t">
        {items.map((faq, index) => (
          <AccordionItem key={faq.q} value={`faq-${index}`} className="border-border">
            <AccordionTrigger className="py-5 text-base font-light tracking-[-0.02em] hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed font-light">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
