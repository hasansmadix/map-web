import type { BreadcrumbList, Organization, Service, WebSite } from 'schema-dts'
import seoConfig from '../../meta/seo.config'
import { gccCountries } from '@/content/broadcasting/coverage'
import { generateBreadcrumbSchema, generateOrganizationSchema, generateWebsiteSchema } from '../common/common'

export async function offeringSchema(input: {
  name: string
  description: string
  pathname: string
  breadcrumbs: { name: string; url: string }[]
}): Promise<{
  '@context': 'https://schema.org'
  '@graph': (WebSite | Organization | Service | BreadcrumbList)[]
}> {
  const { siteURL, organizationId } = seoConfig
  const currentURL = `${siteURL}${input.pathname}`
  const organization = await generateOrganizationSchema()
  const website = generateWebsiteSchema()
  const service: Service = {
    '@type': 'Service',
    '@id': `${currentURL}#service`,
    name: input.name,
    description: input.description,
    url: currentURL,
    provider: { '@id': organizationId },
    areaServed: gccCountries.map(name => ({ '@type': 'Country', name })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [website, organization, service, generateBreadcrumbSchema(input.breadcrumbs)],
  }
}
