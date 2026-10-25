import type { ServiceLineContent } from '@/components/website/services/service-line-page'

export const serviceContent: ServiceLineContent = {
  navLabel: 'Live',
  eyebrow: 'Live',
  title: 'Live event production',
  lead: 'MAP takes the brief and is accountable for the live programme: the room, the remote audience, and the recording. How the programme is switched is the broadcasting operation.',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Production', href: '/production' },
    { label: 'Live' },
  ],
  primary: { text: 'Request a proposal', href: '/contact?subject=live-event' },
  secondary: { text: 'Broadcast operation', href: '/broadcasting/live-production' },
  facts: [
    { value: 'Accountable', label: 'One team from brief to programme' },
    { value: 'Two audiences', label: 'The hall and the remote feed' },
    { value: 'The operation', label: 'Specified under Broadcasting' },
  ],
  sections: [
    {
      id: 'conference',
      nav: 'Conference',
      title: 'Conference broadcast',
      description:
        'A switched programme of the stage, with graphics and a feed the hall can rely on. The run of show is the script for the day.',
      scope: [
        'Cameras matched to the stage and the light',
        'A vision mixer and a director on the run of show',
        'Names, agendas, and sponsor graphics',
        'A feed for the screens in the room',
      ],
    },
    {
      id: 'shows',
      nav: 'Shows',
      title: 'Full live events',
      description:
        'Larger programmes: more cameras, a truck or a flypack, and a show that is directed from a control position.',
      scope: [
        'Multi-camera coverage of the stage and the room',
        'An outside-broadcast vehicle or a flypack',
        'Audio, communications, and a backup path',
        'A directed programme for the duration of the show',
      ],
    },
    {
      id: 'hybrid',
      nav: 'Hybrid',
      title: 'Hybrid rooms',
      description:
        'The same programme for the people in the seats and the people on the link. The recording is taken from that programme.',
      scope: [
        'One programme for the hall and the stream',
        'A return feed for remote speakers',
        'A recording of the programme as it went out',
        'Session files for publication after the day',
      ],
    },
    {
      id: 'platforms',
      nav: 'Platforms',
      title: 'Several destinations',
      description:
        'YouTube, LinkedIn, a private stream, or the event application, taken from one show. Restricted audiences stay on the private feed.',
      scope: [
        'Public platforms and a private link',
        'An event application when the brief names one',
        'Encoding specified in the proposal',
        'Separate access for a restricted audience',
      ],
    },
    {
      id: 'operation',
      nav: 'Operation',
      title: 'How it is produced',
      description:
        'The switched programme, the vehicle or the flypack, and the crew are broadcasting operations. This engagement names them. It does not reprint their specifications.',
      scope: [
        'Live and multi-camera production',
        'An outside-broadcast vehicle when the site can take one',
        'A flypack when the room is reached by dock or lift',
        'Engineers and operators on the technical crew page',
      ],
      href: '/broadcasting/live-production',
      link: 'Broadcast operation',
    },
  ],
  standards: {
    eyebrow: 'Engagement',
    title: 'What is in the rig',
    lead: 'A live engagement is infrastructure. These pieces are specified in the proposal.',
    items: [
      'Cameras matched to the stage and the light',
      'A vision mixer and an operator with the run of show',
      'Microphones, a mix, and a backup path',
      'Graphics for names, agendas, and sponsors',
      'Encoding to the platforms named in the brief',
      'A recording of the programme as it went out',
    ],
  },
  practice: {
    eyebrow: 'The standard',
    title: 'Named in the proposal, specified under Broadcasting',
    lead: 'This engagement does not reprint the fleet. It names which published system the venue needs.',
    items: [
      {
        title: 'The system',
        description: 'An OB van or a flypack, chosen on those pages and written into the proposal.',
      },
      {
        title: 'A directed programme',
        description: 'Switching, graphics, and a stream, with a person responsible for each.',
      },
      {
        title: 'More than one destination',
        description: 'Public platforms and a private feed, taken from the same programme.',
      },
      {
        title: 'A region, as well as a city',
        description: 'The same standard in Dubai and in the Gulf cities MAP already works.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'How a live engagement proceeds',
    lead: 'The sequence is confirmed in the proposal before the crew and the rig are booked.',
    steps: [
      { step: '01', title: 'Brief', description: 'Venue, date, and where the programme must be seen.' },
      { step: '02', title: 'Specify', description: 'The system, the cameras, the graphics, and the destinations.' },
      { step: '03', title: 'Direct', description: 'The live programme for the room and the stream.' },
      { step: '04', title: 'Deliver', description: 'The programme as it went out, and the recording.' },
    ],
  },
  faq: [
    {
      q: 'What is a live production?',
      a: 'A directed broadcast of the event as it happens. Cameras are switched, sound is mixed, graphics are added, and the programme is sent to the screens and the stream.',
    },
    {
      q: 'How does a conference show work?',
      a: 'MAP builds the cameras, the mixer, and the stream around the run of show. The programme goes to the platforms named in the brief, and the remote audience sees the same show as the room.',
    },
    {
      q: 'Where is the truck or the flypack specified?',
      a: 'On the broadcasting pages. Outside broadcast and the flypack index describe the systems. This page is the engagement that uses them.',
    },
    {
      q: 'Can the show go to several platforms?',
      a: 'Yes. Public platforms, a private link, and an event application can all take the same programme. Restricted audiences stay on the private feed.',
    },
  ],
  related: [
    { text: 'Broadcast operation', href: '/broadcasting/live-production' },
    { text: 'Outside broadcast', href: '/broadcasting/outside-broadcast' },
    { text: 'Flypacks', href: '/broadcasting/flypacks' },
    { text: 'Technical crew', href: '/broadcasting/technical-crew' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the venue and the date. MAP will reply with the rig, the crew, and a written proposal.',
    button: 'Request a proposal',
    href: '/contact?subject=live-event',
  },
}
