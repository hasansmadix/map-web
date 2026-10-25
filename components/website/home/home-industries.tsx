import { Building2, Clapperboard, Landmark, Megaphone, Radio, Users } from 'lucide-react'
import { industriesServed } from '@/components/website/home/home-page.data'
import { displayTitleClassName, eyebrowClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

const industryIcons = [Megaphone, Clapperboard, Building2, Landmark, Users, Radio]

export function HomeIndustries() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Industries
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Who the work is for</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base font-light leading-relaxed">
            The same crew and the same kit, appointed by the organisations that commission film and broadcast in the Gulf.
          </p>
        </div>
        <ul className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {industriesServed.map((industry, index) => {
            const Icon = industryIcons[index] ?? Building2
            return (
              <li key={industry} className="flex items-center gap-4 border-b border-border py-6 sm:pe-6">
                <Icon className="text-primary size-6 shrink-0" strokeWidth={1.25} />
                <span className="text-sm font-medium">{industry}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
