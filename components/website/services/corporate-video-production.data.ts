import type { ServiceLineContent } from '@/components/website/services/service-line-page'

export const serviceContent: ServiceLineContent = {
  navLabel: 'Corporate',
  eyebrow: 'Corporate',
  title: 'Corporate film',
  lead: 'Company profiles, internal communications, and sales films for organisations that need a clear, publishable record of their work.',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Production', href: '/production' },
    { label: 'Corporate' },
  ],
  primary: { text: 'Request a proposal', href: '/contact?subject=corporate-video' },
  secondary: { text: 'Production', href: '/production' },
  facts: [
    { value: 'On site', label: 'Office, plant, or studio' },
    { value: 'One master', label: 'Intranet, web, and presentation' },
    { value: 'Discretion', label: 'NDA and a limited crew' },
  ],
  sections: [
    {
      id: 'profiles',
      nav: 'Profiles',
      title: 'Company profiles',
      description:
        'A clear film of the organisation for clients, partners, and the people it wants to hire. The structure is agreed before the crew arrives.',
      scope: [
        'Institutional and company profiles',
        'Leadership and founder interviews',
        'Sites, operations, and the people who run them',
        'A master for the website and a sales meeting',
      ],
    },
    {
      id: 'internal',
      nav: 'Internal',
      title: 'Internal communications',
      description:
        'Leadership notes, town halls, and training, produced so a working team will watch them. The audience and the deadline are named in the brief.',
      scope: [
        'Leadership messages and town halls',
        'Training and procedure films',
        'Announcements for an internal audience',
        'Cuts for the intranet and a live briefing',
      ],
    },
    {
      id: 'sales',
      nav: 'Sales',
      title: 'Sales and case films',
      description:
        'Demos, proof, and customer stories for a business conversation. The film is written to support a meeting.',
      scope: [
        'Product and service demonstrations',
        'Customer and case stories',
        'Explainers for a B2B audience',
        'Versions for a deck, a site, and a follow-up',
      ],
    },
    {
      id: 'recruitment',
      nav: 'Recruitment',
      title: 'Recruitment films',
      description:
        'The workplace as it operates. Office, people, and the reason a candidate should join, recorded with a small crew.',
      scope: [
        'Workplace and team films',
        'Role and department profiles',
        'Interviews with the people who do the work',
        'Cuts for careers pages and campaigns',
      ],
    },
    {
      id: 'record',
      nav: 'Record',
      title: 'Event films',
      description:
        'A conference or an offsite, cut into a film the organisation can keep using. Coverage follows the run of show.',
      scope: [
        'Conferences, offsites, and ceremonies',
        'Speaker and leadership extracts',
        'A highlight for the organisation',
        'Material the communications team can republish',
      ],
    },
  ],
  standards: {
    eyebrow: 'Engagement',
    title: 'What a corporate proposal names',
    lead: 'Most of these films are made where the organisation already works. The proposal names the crew, the locations, and the versions.',
    items: [
      'A script or a structure before the production day',
      'Crew, cameras, lighting, and sound on location',
      'Interviews recorded for a clean, usable track',
      'A private review link before anything is published',
      'Versions for the intranet, the website, and a presentation',
      'An NDA and a limited crew when the material requires it',
    ],
  },
  practice: {
    eyebrow: 'The standard',
    title: 'A finish suitable for a board',
    lead: 'The film is written for the audience who will use it, and finished to a standard suitable for a board and a public site.',
    items: [
      {
        title: 'Light, sound, and grade',
        description: 'A finish that holds in a boardroom and on a public homepage.',
      },
      {
        title: 'A limited crew',
        description: 'NDAs, a small team, and files that stay inside the engagement.',
      },
      {
        title: 'A date the organisation can plan around',
        description: 'Internal deadlines are written into the proposal, and the schedule is the one MAP keeps.',
      },
      {
        title: 'The formats the channels need',
        description: 'One master, then the cuts for web, internal platforms, and a sales deck.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'How a corporate film proceeds',
    lead: 'The sequence is confirmed in the proposal before the crew is booked.',
    steps: [
      { step: '01', title: 'Brief', description: 'Who must watch it, and the date it has to be published.' },
      { step: '02', title: 'Prepare', description: 'A script or a structure, the locations, and a limited crew.' },
      { step: '03', title: 'Shoot', description: 'Office, site, or studio, lit and recorded as proposed.' },
      { step: '04', title: 'Deliver', description: 'A master and the versions for intranet, web, and presentation.' },
    ],
  },
  faq: [
    {
      q: 'What is included?',
      a: 'The briefing, a script or a structure, the shoot, the edit, and delivery. Crew and equipment are part of the engagement. Sensitive material is produced under an NDA.',
    },
    {
      q: 'How long does a company film take?',
      a: 'A profile is often two to four weeks. A short internal piece can be faster. A set of films takes longer, and the dates are agreed before the crew is booked.',
    },
    {
      q: 'Can you film in our office?',
      a: 'Yes. Most corporate films are shot where the work happens. MAP handles light, sound, and the logistics of working around a live office.',
    },
    {
      q: 'Do you make films for sales teams?',
      a: 'Yes. Demonstrations, case stories, and explainers for people who sell to other businesses. The film is written to support the meeting.',
    },
  ],
  related: [
    { text: 'Production', href: '/production' },
    { text: 'Commercial', href: '/production/commercial-video-production' },
    { text: 'Events', href: '/production/event-video-production' },
    { text: 'Studio', href: '/production/studio-video-production' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Describe the audience and the date. MAP will reply with the film, the crew, and a written proposal.',
    button: 'Request a proposal',
    href: '/contact?subject=corporate-video',
  },
}
