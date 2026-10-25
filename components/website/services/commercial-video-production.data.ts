import type { ServiceLineContent } from '@/components/website/services/service-line-page'

export const serviceContent: ServiceLineContent = {
  navLabel: 'Commercial',
  eyebrow: 'Commercial',
  title: 'Commercial production',
  lead: 'Commercial production for agencies and brand owners. The shoot is planned around the media schedule, and every length and ratio is delivered from the same production.',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Production', href: '/production' },
    { label: 'Commercial' },
  ],
  primary: { text: 'Request a proposal', href: '/contact?subject=commercial-video' },
  secondary: { text: 'Production', href: '/production' },
  facts: [
    { value: 'Broadcast', label: 'Television, cinema, and large screens' },
    { value: 'Every ratio', label: 'Master, cutdown, and social' },
    { value: 'The Gulf', label: 'UAE, Saudi Arabia, Oman, Qatar' },
  ],
  sections: [
    {
      id: 'broadcast',
      nav: 'Broadcast',
      title: 'Broadcast spots',
      description:
        'Television and cinema commercials finished for a large screen and a published media schedule. The lengths are agreed before the shoot.',
      scope: [
        'Fifteen, thirty, and sixty second masters',
        'Cinema and large-screen finishes',
        'Supers, legal lines, and end frames',
        'Delivery timed to the media plan',
      ],
    },
    {
      id: 'digital',
      nav: 'Digital',
      title: 'Digital advertising',
      description:
        'Short and native films for paid and owned channels. Framing and coverage are set for the placements the plan names.',
      scope: [
        'YouTube, Meta, LinkedIn, and programmatic',
        'Native lengths for each placement',
        'End cards, captions, and supers',
        'A version set from the same footage',
      ],
    },
    {
      id: 'branded',
      nav: 'Branded',
      title: 'Branded films',
      description:
        'Short documentaries and editorial films that carry a brand. The piece is written as a film an audience chooses to watch.',
      scope: [
        'Brand documentaries and short films',
        'Interview-led and editorial stories',
        'Series built for owned channels',
        'A campaign set cut from one shoot',
      ],
    },
    {
      id: 'launch',
      nav: 'Launch',
      title: 'Launch films',
      description:
        'Reveals and announcement films for a product, a place, or a campaign. The production day is built around the moment the film has to carry.',
      scope: [
        'Product, place, and campaign reveals',
        'Talent and ambassador days',
        'Announcement films for the launch',
        'A master and the cuts the launch needs',
      ],
    },
    {
      id: 'versions',
      nav: 'Versions',
      title: 'Platform versions',
      description:
        'Ratios, lengths, and captions for each channel, prepared with the master. The versions are on the shot list before the day.',
      scope: [
        'Vertical, square, and landscape',
        'Lengths each platform publishes',
        'Captions, supers, and end cards',
        'One delivery set from the production',
      ],
    },
  ],
  standards: {
    eyebrow: 'Engagement',
    title: 'What a commercial proposal names',
    lead: 'The fee follows the crew, the days, and the versions. The proposal states each of them before a date is held.',
    items: [
      'A named director, camera, sound, and lighting crew',
      'A shot plan built around the versions required',
      'Locations, talent, and permits arranged with the production',
      'Edit, grade, graphics, and sound completed in-house',
      'Master, cutdowns, and platform ratios delivered together',
      'A schedule with the shoot day and the delivery date',
    ],
  },
  practice: {
    eyebrow: 'The standard',
    title: 'How the production is run',
    lead: 'Agencies retain strategy and the client relationship. MAP takes the production through to delivery.',
    items: [
      {
        title: 'A picture for a large screen',
        description: '4K capture, controlled lighting, and a grade finished for broadcast and cinema.',
      },
      {
        title: 'A director working from the brief',
        description: 'The film follows the boards. Coverage is planned for every version the media plan requires.',
      },
      {
        title: 'A Gulf production',
        description: 'Locations, talent, and tone prepared for the UAE and the wider Gulf.',
      },
      {
        title: 'Every version in one delivery',
        description: 'The master, the cutdowns, and the social ratios leave together.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'How a commercial proceeds',
    lead: 'The sequence is confirmed in the proposal before the crew is booked.',
    steps: [
      { step: '01', title: 'Brief', description: 'Boards, a script, or a paragraph. Audience, lengths, and the media date.' },
      { step: '02', title: 'Prepare', description: 'Crew, locations, talent, and a shot plan for every version.' },
      { step: '03', title: 'Shoot', description: 'The production day, staffed as the proposal describes.' },
      { step: '04', title: 'Deliver', description: 'Edit, grade, and the full version set.' },
    ],
  },
  faq: [
    {
      q: 'How long does a commercial take?',
      a: 'A single spot is often two to three weeks. A campaign with several films takes longer. The proposal names the shoot day and the delivery date before the crew is booked.',
    },
    {
      q: 'Does MAP finish the film as well as shoot it?',
      a: 'Yes. The engagement covers the shoot, the edit, the grade, graphics, and sound. The same organisation delivers the master.',
    },
    {
      q: 'Can one shoot cover television and social?',
      a: 'Yes. Framing and coverage are set for the versions required, and each ratio is delivered from that production. The version list is agreed before the day.',
    },
    {
      q: 'Do you work with agencies?',
      a: 'Most commercial work arrives through an agency. The agency retains strategy and the client relationship. MAP runs the production.',
    },
  ],
  related: [
    { text: 'Production', href: '/production' },
    { text: 'Corporate', href: '/production/corporate-video-production' },
    { text: 'Studio', href: '/production/studio-video-production' },
    { text: 'Broadcasting', href: '/broadcasting' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the boards, a script, or a short brief. MAP will reply with a crew, a schedule, and a written proposal.',
    button: 'Request a proposal',
    href: '/contact?subject=commercial-video',
  },
}
