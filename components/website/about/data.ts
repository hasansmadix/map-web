import { Heart, Lightbulb, Shield, Star, Users, Zap, type LucideIcon } from 'lucide-react'

export const aboutStory = {
  eyebrow: 'The organisation',
  title: 'Production facilities and broadcast infrastructure in Dubai',
  paragraphs: [
    'MAP Media Art Production produces film and broadcast programmes for companies, institutions, and live events. The organisation is based at B29, Dubai Production City.',
    'Commercials, corporate films, studio sessions, and outside broadcasts are planned as one engagement. Crew, cameras, and post-production are provided by the same organisation.',
  ],
}

export const aboutFacts = [
  { value: '25+', label: 'Years in production' },
  { value: 'B29', label: 'Dubai Production City' },
  { value: 'The Gulf', label: 'UAE, Saudi Arabia, Oman, Qatar' },
]

export const aboutPurpose = {
  mission: {
    eyebrow: 'Mission',
    title: 'Deliver work to broadcast standard',
    text: 'MAP plans the production, crews it from its own equipment, and delivers a master suitable for broadcast, a board, or an event screen.',
  },
  vision: {
    eyebrow: 'Vision',
    title: 'The production partner for studio and outside broadcast',
    text: 'Organisations across the UAE, Saudi Arabia, Oman, and Qatar appoint MAP when an engagement requires a studio, an outside-broadcast unit, or a full crew.',
  },
}

export interface AboutValue {
  icon: LucideIcon
  title: string
  description: string
}

export const coreValues: AboutValue[] = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'New formats and new kit, used when they make the picture better.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'The same standard on the shoot day and in the delivered master.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'The client is in the plan, from the first call through delivery.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'The quote names the crew, the kit, and the dates.',
  },
  {
    icon: Heart,
    title: 'Client focus',
    description: 'The deliverable is the film the audience will actually watch.',
  },
  {
    icon: Zap,
    title: 'Delivery',
    description: 'The crew stays with the job until the show is down and the files are in.',
  },
]

export const aboutProcess = {
  eyebrow: 'Engagement',
  title: 'From the first briefing to the master',
  lead: 'One team is responsible for the brief, the production, and the delivery.',
  steps: [
    { step: '01', title: 'Brief', description: 'Dates, format, and where the piece needs to play.' },
    { step: '02', title: 'Plan', description: 'A crew, a kit list, and a quote from the studios we run.' },
    { step: '03', title: 'Produce', description: 'Stage, location, or an outside-broadcast truck.' },
    { step: '04', title: 'Deliver', description: 'A master for broadcast, the web, or the event.' },
  ],
}

export const faqItems = [
  {
    q: 'What services does MAP Media Art Production offer?',
    a: 'Video production, live broadcasting, event coverage, studio filming, equipment rental, and social content. Each job is crewed to the brief.',
  },
  {
    q: 'Where is MAP Media Art Production based?',
    a: 'MAP is based at B29, Dubai Production City. Work also runs across the UAE, Saudi Arabia, Oman, and Qatar.',
  },
  {
    q: 'How do I request a quote for my project?',
    a: 'Send the brief through the contact form, by email, or by phone. The quote is based on the format, the dates, and the crew the job needs.',
  },
  {
    q: 'How long does it take to complete a video production project?',
    a: 'A short film can be a few weeks. A larger job, with planning and post, takes longer. The timeline is set in the proposal.',
  },
  {
    q: 'Can MAP produce content for social media platforms?',
    a: 'Yes. Cuts are delivered for Instagram, TikTok, YouTube, Facebook, and LinkedIn, alongside the broadcast master when the job needs both.',
  },
  {
    q: 'Do you provide equipment rental and technical support?',
    a: 'Yes. Cameras, lighting, and broadcast kit can be rented with a technician from the same team.',
  },
  {
    q: 'Can you handle live event broadcasting?',
    a: 'Yes. Live shows run from OB vans and portable broadcast systems, including multi-platform streaming.',
  },
  {
    q: 'What industries do you serve?',
    a: 'Corporate, entertainment, culture, education, retail, and government. The crew and the format change with the brief.',
  },
]

export const aboutInternalLinks = [
  { text: 'Video production', href: '/production' },
  { text: 'Broadcasting', href: '/broadcasting' },
  { text: 'Commercial video', href: '/production/commercial-video-production' },
  { text: 'Corporate video', href: '/production/corporate-video-production' },
  { text: 'Equipment rental', href: '/equipment-rental' },
  { text: 'Contact', href: '/contact' },
]
