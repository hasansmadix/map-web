import { ServiceLinePage } from '@/components/website/services/service-line-page'
import {
  engagementStandards,
  serviceLines,
  serviceSectors,
  servicesCta,
  servicesFacts,
  servicesFaq,
  servicesHero,
  servicesProcess,
  servicesRelated,
} from './services-page.data'

export function ServicesIndex() {
  return (
    <ServiceLinePage
      pathname="/production"
      content={{
        navLabel: 'Service lines',
        eyebrow: servicesHero.eyebrow,
        title: servicesHero.title,
        lead: servicesHero.lead,
        breadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Production' },
        ],
        primary: servicesHero.primary,
        secondary: servicesHero.secondary,
        facts: servicesFacts,
        sections: serviceLines.map(line => ({
          id: line.id,
          nav: line.nav,
          title: line.title,
          description: line.description,
          scope: line.scope,
          href: line.href,
          link: line.link,
        })),
        standards: engagementStandards,
        practice: serviceSectors,
        process: servicesProcess,
        faq: servicesFaq,
        related: servicesRelated,
        cta: servicesCta,
      }}
    />
  )
}
