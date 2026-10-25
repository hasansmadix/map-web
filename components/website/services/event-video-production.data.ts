import type { ServiceLineContent } from '@/components/website/services/service-line-page'

export const serviceContent: ServiceLineContent = {
  navLabel: 'Events',
  eyebrow: 'Events',
  title: 'Event coverage',
  lead: 'Conferences, launches, and ceremonies, covered so the organisation retains a complete record after the event. A live switch is a separate engagement.',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Production', href: '/production' },
    { label: 'Events' },
  ],
  primary: { text: 'Request a proposal', href: '/contact?subject=event-video' },
  secondary: { text: 'Production', href: '/production' },
  facts: [
    { value: 'Run of show', label: 'Coverage set before the doors open' },
    { value: 'The record', label: 'Highlight, sessions, and stage' },
    { value: 'The Gulf', label: 'UAE, Saudi Arabia, Oman, Qatar' },
  ],
  sections: [
    {
      id: 'conferences',
      nav: 'Conferences',
      title: 'Conferences',
      description:
        'Main stage, breakouts, and speaker films the organisation can publish after the summit. Coverage follows the published run of show.',
      scope: [
        'Main stage and named breakouts',
        'Speaker and session films',
        'A full recording of the stage',
        'A highlight for the organisation',
      ],
    },
    {
      id: 'launches',
      nav: 'Launches',
      title: 'Launches and galas',
      description:
        'The moment, the room, and a film that still works the week after. Camera positions are set from the programme.',
      scope: [
        'Reveals, speeches, and the room',
        'Arrivals and hosted moments',
        'A highlight cut for the following week',
        'Short clips for the channels named in the brief',
      ],
    },
    {
      id: 'exhibitions',
      nav: 'Exhibitions',
      title: 'Exhibitions',
      description:
        'Stands, demonstrations, and interviews, cut for the team that reports on the show. The floor plan decides the crew.',
      scope: [
        'Stand and demonstration coverage',
        'Interviews with the people on the floor',
        'A report film for the team',
        'Material for later campaigns',
      ],
    },
    {
      id: 'hybrid',
      nav: 'Hybrid',
      title: 'Hybrid rooms',
      description:
        'The in-person day and the audience watching from somewhere else. The recording and the live programme are planned as one engagement.',
      scope: [
        'The room and the remote audience',
        'A recording taken from the same setup',
        'Session films after the day',
        'Live production when the stream is part of the brief',
      ],
    },
    {
      id: 'awards',
      nav: 'Awards',
      title: 'Awards',
      description:
        'Arrivals, the stage, and the speeches, covered against the running order so each name is in the record.',
      scope: [
        'Arrivals and the stage',
        'Speeches and presentations',
        'A highlight of the evening',
        'Extracts the organisation can republish',
      ],
    },
  ],
  standards: {
    eyebrow: 'Engagement',
    title: 'What you leave with',
    lead: 'The brief names what is required on the night and what can follow. The crew is staffed to that list.',
    items: [
      'A highlight film of the day',
      'Speaker or session films',
      'A full recording of the stage',
      'Short clips for the channels named in the brief',
      'Interviews and coverage for later campaigns',
      'Same-day cuts when an editor is on site',
    ],
  },
  practice: {
    eyebrow: 'The standard',
    title: 'Prepared against the run of show',
    lead: 'Camera positions, audio, and crew are set from the run of show before the room opens.',
    items: [
      {
        title: 'More than one camera',
        description: 'Stage, audience, and detail, covered so the film has a structure.',
      },
      {
        title: 'Speed when the date requires it',
        description: 'Same-day highlights when the communications team needs the film that night.',
      },
      {
        title: 'Footage the organisation can reuse',
        description: 'The day becomes testimonials, recaps, and the invitation for the next edition.',
      },
      {
        title: 'Across the Gulf',
        description: 'Dubai, the wider UAE, and the cities MAP already travels to for events.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'How event coverage proceeds',
    lead: 'The sequence is confirmed in the proposal before the crew is booked.',
    steps: [
      { step: '01', title: 'Brief', description: 'Date, venue, and the films required after the day.' },
      { step: '02', title: 'Prepare', description: 'The run of show, camera positions, and the crew.' },
      { step: '03', title: 'Cover', description: 'The stage, the speakers, and the room.' },
      { step: '04', title: 'Deliver', description: 'Highlight, session films, the stage recording, and social cuts.' },
    ],
  },
  faq: [
    {
      q: 'What does event coverage include?',
      a: 'Cameras, sound, and an edit. Typical delivery is a highlight, speaker films, the stage recording, and social clips. Same-day cuts are available when the schedule includes an editor on site.',
    },
    {
      q: 'How do you cover a conference?',
      a: 'MAP reads the run of show, covers the main stage and the sessions named in the brief, and records the room around them. Delivery is the recordings and the films.',
    },
    {
      q: 'Can you work outside Dubai?',
      a: 'Yes. MAP covers events across the UAE and in Saudi Arabia, Oman, and Qatar, including freight and a crew that arrives ready to work.',
    },
    {
      q: 'Can the event also be live?',
      a: 'Yes, as a live event engagement. The switched operation itself is specified under Broadcasting. This page remains the film delivered afterwards.',
    },
  ],
  related: [
    { text: 'Live event engagement', href: '/production/live-event-production' },
    { text: 'Broadcast operation', href: '/broadcasting/live-production' },
    { text: 'Corporate', href: '/production/corporate-video-production' },
    { text: 'Production', href: '/production' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the date, the venue, and what the organisation needs afterwards. MAP will reply with the crew and the films.',
    button: 'Request a proposal',
    href: '/contact?subject=event-video',
  },
}
