import { displayTitleClassName, eyebrowOnDarkClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

interface WorkflowStep {
  step: string
  title: string
  description: string
}

interface WorkflowSectionProps {
  steps: WorkflowStep[]
}

export function WorkflowSection({ steps }: WorkflowSectionProps) {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-white md:py-32">
      <div className="tech-pattern-dark absolute inset-0 opacity-10" />
      <div className="relative z-10 container">
        <div className="mb-16 max-w-2xl">
          <p className={eyebrowOnDarkClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Process
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>How a production runs</h2>
          <p className="mt-4 max-w-2xl text-base font-light text-white/60">
            The same sequence on a studio day and an outside broadcast, from the first call to the strike.
          </p>
        </div>
        <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {steps.map((step, index) => (
            <li key={step.step} className="relative lg:pe-8">
              <div className="mb-8 flex items-center gap-4">
                <span className="border-primary text-primary flex size-10 shrink-0 items-center justify-center border font-mono text-xs">
                  {step.step}
                </span>
                {index < steps.length - 1 ? <span className="hidden h-px flex-1 bg-white/15 lg:block" aria-hidden /> : null}
              </div>
              <h3 className="mb-3 text-lg font-light">{step.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-white/60">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
