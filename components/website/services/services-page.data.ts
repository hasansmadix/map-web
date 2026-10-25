import type { FaqItem } from '@/components/website/common/page-faq'

export const servicesHero = {
  eyebrow: 'Production',
  title: 'Production services',
  lead: 'Production delivers the programme: a film, a session, or a live engagement MAP is accountable for. Broadcasting operates the systems and the technical crew.',
  primary: { text: 'Request a proposal', href: '/contact?subject=rfq' },
  secondary: { text: 'Contact', href: '/contact' },
}

export const servicesFacts = [
  { value: '25+', label: 'Years in production' },
  { value: 'B29', label: 'Dubai Production City' },
  { value: 'The Gulf', label: 'UAE, Saudi Arabia, Oman, Qatar' },
]

export const serviceLines: ServiceLine[] = [
  {
    id: 'commercial',
    nav: 'Commercial',
    title: 'Commercial production',
    description:
      'Television spots, digital advertising, and branded films for agencies and brand owners. The shoot is planned against the media schedule, and every length and ratio is delivered from the same production.',
    href: '/production/commercial-video-production',
    link: 'Commercial production',
    scope: [
      'Broadcast and television spots',
      'Digital advertising for paid and owned channels',
      'Branded films and short documentaries',
      'Launch and announcement films',
      'Cutdowns, ratios, and captions for each platform',
    ],
  },
  {
    id: 'corporate',
    nav: 'Corporate',
    title: 'Corporate film',
    description:
      'Company profiles, leadership communications, and sales films for organisations that publish to a board, a workforce, or a client. The film is written for that audience and finished for public use.',
    href: '/production/corporate-video-production',
    link: 'Corporate film',
    scope: [
      'Company and institutional profiles',
      'Leadership and internal communications',
      'Sales, case, and product films',
      'Recruitment films',
      'Versions for intranet, web, and presentation',
    ],
  },
  {
    id: 'events',
    nav: 'Events',
    title: 'Event coverage',
    description:
      'Conferences, launches, exhibitions, and ceremonies, covered so the organisation retains a structured record after the event. Stage, speakers, and the room are planned from the run of show.',
    href: '/production/event-video-production',
    link: 'Event coverage',
    scope: [
      'Conference and summit coverage',
      'Launches, galas, and ceremonies',
      'Exhibitions and trade shows',
      'Awards programmes',
      'Highlight films, session films, and social cuts',
    ],
  },
  {
    id: 'live',
    nav: 'Live',
    title: 'Live production',
    description:
      'MAP owns the live programme for the room and the remote audience. The technical operation, the vehicles, and the crew are specified under Broadcasting.',
    href: '/production/live-event-production',
    link: 'Live production',
    scope: [
      'One team accountable from the brief to the programme',
      'The room and the remote audience on the same show',
      'Graphics, names, and sponsor treatments',
      'A recording of the programme as it went out',
      'The system chosen with the broadcasting operation',
    ],
  },
  {
    id: 'studio',
    nav: 'Studio',
    title: 'Studio production',
    description:
      'Interviews, presenter sessions, product films, and green-screen work in a controlled room. Light, sound, and background are set before the session begins.',
    href: '/production/studio-video-production',
    link: 'Studio production',
    scope: [
      'Executive and expert interviews',
      'Presenter and teleprompter sessions',
      'Product and tabletop filming',
      'Green screen and virtual backgrounds',
      'Selects, grade, and keyed finishes',
    ],
  },
]

export const engagementStandards = {
  eyebrow: 'Engagement',
  title: 'What every proposal names',
  lead: 'The fee follows the crew, the days, and the finish. The proposal states each of them before a date is held.',
  items: [
    'A named director, camera, sound, and lighting crew',
    'Cameras, lighting, and audio from the MAP fleet',
    'Edit, grade, graphics, and sound completed in-house',
    'A schedule with the production day and the delivery date',
    'Masters, and the versions each channel requires',
    'Logistics for the UAE, Saudi Arabia, Oman, and Qatar',
  ],
}

export const serviceSectors = {
  eyebrow: 'Sectors',
  title: 'Organisations that appoint MAP',
  lead: 'The production standard is consistent. Crew, format, and schedule are set by the brief.',
  items: [
    {
      title: 'Government and public institutions',
      description: 'Public films, official announcements, and institutional events.',
    },
    {
      title: 'Corporate and financial',
      description: 'Profiles, communications, and films used in a client or board setting.',
    },
    {
      title: 'Agencies and brand owners',
      description: 'Campaign production, with strategy and the client relationship retained by the agency.',
    },
    {
      title: 'Conferences and live events',
      description: 'Coverage and broadcast for rooms that publish a run of show.',
    },
    {
      title: 'Healthcare and education',
      description: 'Training, medical, and institutional films, produced with a limited crew.',
    },
    {
      title: 'Real estate and hospitality',
      description: 'Properties, venues, and the organisations that operate them.',
    },
    {
      title: 'Broadcasters',
      description: 'Crews, units, and pictures prepared for a live or recorded feed.',
    },
  ],
}

export const servicesProcess = {
  eyebrow: 'Process',
  title: 'How an engagement proceeds',
  lead: 'The sequence is confirmed in the proposal before production begins.',
  steps: [
    { step: '01', title: 'Brief', description: 'Audience, use, and the date the master is required.' },
    { step: '02', title: 'Proposal', description: 'Crew, equipment, schedule, and fee, set out in writing.' },
    { step: '03', title: 'Production', description: 'The shoot or the live day, staffed as the proposal describes.' },
    { step: '04', title: 'Delivery', description: 'Edit, grade, and the versions each channel requires.' },
  ],
}

export const servicesFaq: FaqItem[] = [
  {
    q: 'What does a production cost?',
    a: 'The fee follows crew, days, locations, and the finishing the programme requires. After a short brief, MAP issues a proposal with the fee and the scope it covers.',
  },
  {
    q: 'How long does a project take?',
    a: 'A straightforward film is often one to two weeks from brief to delivery. A commercial or a multi-day shoot takes longer. The proposal names the production day and the delivery date before the crew is booked.',
  },
  {
    q: 'Who supplies the crew and the equipment?',
    a: 'MAP does. Director, camera, sound, lighting, and the equipment are part of the engagement. Post-production is completed by the same organisation.',
  },
  {
    q: 'Can you produce outside Dubai?',
    a: 'Yes. MAP works across the UAE and regularly in Saudi Arabia, Oman, and Qatar. Permits, freight, and local coordination are included in the plan.',
  },
  {
    q: 'What is delivered?',
    a: 'A master in the resolution the engagement requires, plus the cuts, ratios, and captions each platform asks for. Broadcast, web, and social can come from the same production.',
  },
]

export const servicesRelated = [
  { text: 'Broadcasting', href: '/broadcasting' },
  { text: 'Equipment rental', href: '/equipment-rental' },
  { text: 'About MAP', href: '/about' },
  { text: 'Contact', href: '/contact' },
]

export const servicesCta = {
  title: 'Request a proposal',
  description: 'Share the objective, the audience, and the required date. MAP will reply with a crew, a schedule, and a written proposal.',
  button: 'Request a proposal',
  href: '/contact?subject=rfq',
}

interface ServiceLine {
  id: string
  nav: string
  title: string
  description: string
  href: string
  link: string
  scope: string[]
}
