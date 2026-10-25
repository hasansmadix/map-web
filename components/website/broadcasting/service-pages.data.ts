import type { BroadcastServiceContent } from '@/components/website/broadcasting/broadcast-service-page'

const home = { label: 'Home', href: '/' }
const broadcasting = { label: 'Broadcasting', href: '/broadcasting' }

export const outsideBroadcastService: BroadcastServiceContent = {
  eyebrow: 'Outside broadcast',
  title: 'Outside broadcast production',
  lead: 'MAP takes a mobile production facility to a site that can receive a vehicle, and runs the programme from it. The engagement covers the survey, the build, the show, and the strike.',
  breadcrumbs: [home, broadcasting, { label: 'Outside broadcast' }],
  primary: { text: 'Request a proposal', href: '/contact?subject=outside-broadcast' },
  sibling: { text: 'OB vans', href: '/broadcasting/ob-vans' },
  audience: {
    title: 'Producers who need the facility and the show',
    body: 'This page is for ceremonies, concerts, public events, and any programme that needs a control room parked at the site. A buyer who already knows which vehicle they want should open the OB van specification. A sports organiser should start with sports broadcasting.',
  },
  scope: {
    title: 'What the engagement includes',
    lead: 'The vehicle is one part of the engagement. MAP is accountable for the production on the day.',
    items: [
      'A site survey of access, power, and the cable path',
      'Cameras, vision, audio, and communications scaled to the programme',
      'A crew that arrives with the vehicle',
      'A record of the programme as it went out',
      'A path onward for the destinations named in the brief',
    ],
  },
  process: {
    eyebrow: 'The day',
    title: 'How an outside broadcast runs',
    lead: 'The system is specified before the vehicle leaves. The day covers installation, the programme, and the strike.',
    steps: [
      { step: '01', title: 'Survey', description: 'Power, access, cable paths, and where the audience is watching.' },
      { step: '02', title: 'Build', description: 'Cameras, vision, sound, and the onward path, tested before the doors open.' },
      { step: '03', title: 'Show', description: 'A crew on the mixer, the cameras, and the audio for the length of the programme.' },
      { step: '04', title: 'Strike', description: 'The recording is kept. The vehicle leaves on the agreed plan.' },
    ],
  },
  systems: {
    title: 'The vehicle is specified separately',
    lead: 'Equipment lists live on the unit page. This engagement uses that fleet, and a flypack when the site cannot take a truck.',
    links: [
      { text: 'OB vans', href: '/broadcasting/ob-vans', description: 'Published vehicles and their specifications.' },
      { text: 'Flypacks', href: '/broadcasting/flypacks', description: 'When access is by dock or lift.' },
      { text: 'Transmission', href: '/broadcasting/transmission', description: 'The path from the venue to the destination.' },
      { text: 'Technical crew', href: '/broadcasting/technical-crew', description: 'Engineers and operators on the engagement.' },
    ],
  },
  applications: {
    title: 'Programmes that use an outside broadcast',
    items: [
      { title: 'Concerts and entertainment', description: 'A stage, a crowd, and a control room that is not inside the hall.', href: '/broadcasting/live-production', link: 'Live production' },
      { title: 'Government and institutional events', description: 'Ceremonies and official programmes that need the same operation at a larger site.', href: '/broadcasting/live-production', link: 'Live production' },
      { title: 'Sport', description: 'When the programme is a match or a tournament, the sports page owns that workflow.', href: '/broadcasting/sports-broadcasting', link: 'Sports broadcasting' },
    ],
  },
  faq: [
    { q: 'What does the venue need to provide?', a: 'A place to park near the programme, power that can feed a truck, and a cable path the audience can pass safely. When a site cannot offer that, MAP specifies a flypack.' },
    { q: 'How early should it be booked?', a: 'Two to four weeks for a straightforward event. Large sport or government programmes often need longer, because access and power take time to confirm.' },
    { q: 'Is the crew included?', a: 'Yes. A vision operator, camera operators, an audio engineer, and a technical lead travel with the vehicle. The crew grows with the camera count. Crew can also be hired on its own.' },
  ],
  related: [
    { text: 'Live production', href: '/broadcasting/live-production' },
    { text: 'Sports broadcasting', href: '/broadcasting/sports-broadcasting' },
    { text: 'Live event engagement', href: '/production/live-event-production' },
    { text: 'All broadcasting', href: '/broadcasting' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the venue, the date, and the shape of the programme. MAP will confirm whether an outside broadcast is the engagement.',
    button: 'Request a proposal',
    href: '/contact?subject=outside-broadcast',
  },
}

export const liveProductionService: BroadcastServiceContent = {
  eyebrow: 'Live production',
  title: 'Live and multi-camera production',
  lead: 'The operation behind a switched programme: cameras, vision mixing, audio, graphics, a record, and delivery to the destinations in the brief. The system may be a truck, a flypack, or the studio.',
  breadcrumbs: [home, broadcasting, { label: 'Live production' }],
  primary: { text: 'Request a proposal', href: '/contact?subject=live-production' },
  sibling: { text: 'Live event engagement', href: '/production/live-event-production' },
  audience: {
    title: 'Technical producers and directors',
    body: 'This page describes how the programme is made. A client who wants MAP to own the event, from the brief to the audience, should use the live event engagement. The two pages are the operation and the accountability. They are not two copies of the same offer.',
  },
  scope: {
    title: 'What the operation covers',
    lead: 'The hardware changes with the room. The craft does not.',
    items: [
      'Cameras matched to the stage, the field, or the studio',
      'Vision mixing and a multiview',
      'Graphics for names, scores, agendas, or sponsors',
      'Audio with a return path to the control position',
      'A recording of the programme as it went out',
      'Feeds for the room and for the destinations named in the brief',
    ],
  },
  process: {
    eyebrow: 'Workflow',
    title: 'How a live programme is built',
    lead: 'The sequence is the same whether the mixer sits in a vehicle, in flight cases, or in the studio gallery.',
    steps: [
      { step: '01', title: 'Specify', description: 'Camera count, graphics, destinations, and which system the venue can take.' },
      { step: '02', title: 'Build', description: 'The control position, the cameras, and the paths, tested before the programme.' },
      { step: '03', title: 'Direct', description: 'Switching, sound, and graphics for the length of the show.' },
      { step: '04', title: 'Deliver', description: 'The live outputs, and the recording taken from that programme.' },
    ],
  },
  systems: {
    title: 'Choose the system on its own page',
    lead: 'This page does not repeat equipment lists. The fleet pages do.',
    links: [
      { text: 'OB vans', href: '/broadcasting/ob-vans', description: 'A vehicle for sites that can park one.' },
      { text: 'Flypacks', href: '/broadcasting/flypacks', description: 'Flight-case systems for rooms reached by dock or lift.' },
      { text: 'Studios', href: '/broadcasting/studios', description: 'A fixed control room and floor in Dubai.' },
      { text: 'Technical crew', href: '/broadcasting/technical-crew', description: 'The people on the mixer, the cameras, and replay.' },
    ],
  },
  applications: {
    title: 'Where this operation is used',
    items: [
      { title: 'Conferences and exhibitions', description: 'A stage, a panel, and a remote audience on the same programme.', href: '/production/live-event-production', link: 'Live event engagement' },
      { title: 'Concerts', description: 'When the site can take a vehicle, the outside-broadcast engagement houses this operation.', href: '/broadcasting/outside-broadcast', link: 'Outside broadcast' },
      { title: 'Television', description: 'Studio programmes use the facility page for the room and this page for the switching.', href: '/broadcasting/studios', link: 'Studios' },
    ],
  },
  faq: [
    { q: 'How is this different from an outside broadcast?', a: 'An outside broadcast is one way to house the operation, in a vehicle. Live production also runs on a flypack or in the studio. A ballroom conference is live production and is often not an OB van.' },
    { q: 'Do you stream and record?', a: 'Yes. The programme is switched live and recorded as it went out. Destinations are the ones named in the brief, including screens in the room.' },
    { q: 'Who is accountable to the client?', a: 'When MAP is hired to own the event, that engagement is live event production. This page is the technical operation underneath it.' },
  ],
  related: [
    { text: 'Outside broadcast', href: '/broadcasting/outside-broadcast' },
    { text: 'Sports broadcasting', href: '/broadcasting/sports-broadcasting' },
    { text: 'Transmission', href: '/broadcasting/transmission' },
    { text: 'Event films', href: '/production/event-video-production' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the venue, the date, and where the programme must be seen. MAP will name the system and the crew.',
    button: 'Request a proposal',
    href: '/contact?subject=live-production',
  },
}

export const sportsBroadcastingService: BroadcastServiceContent = {
  eyebrow: 'Sports',
  title: 'Sports broadcasting',
  lead: 'Live coverage of matches, sessions, and tournaments. The workflow follows a competition clock: multi-camera coverage, replay, and a programme that can run for the length of the day.',
  breadcrumbs: [home, broadcasting, { label: 'Sports broadcasting' }],
  primary: { text: 'Request a proposal', href: '/contact?subject=sports-broadcasting' },
  sibling: { text: 'OB vans', href: '/broadcasting/ob-vans' },
  audience: {
    title: 'Organisers and host-broadcast producers',
    body: 'This page is for a sports programme. It is not a list of leagues or a claim of host-broadcast status. The outside-broadcast page explains the mobile facility. This page explains the sports workflow, then points at the systems that can carry it.',
  },
  scope: {
    title: 'What a sports production specifies',
    lead: 'The camera plan follows the sport. The control position follows the venue.',
    items: [
      'Coverage of the field of play and the official positions the brief names',
      'Replay for review and for the programme',
      'Graphics for scores, names, and time, when the brief includes them',
      'A crew scaled to the camera count and the session length',
      'A record of the programme as it went out',
    ],
  },
  process: {
    eyebrow: 'The competition',
    title: 'How a sports day is run',
    lead: 'Access, power, and the session schedule are confirmed before the unit is committed.',
    steps: [
      { step: '01', title: 'Read the venue', description: 'Where a vehicle can park, or whether the control position has to be a flypack.' },
      { step: '02', title: 'Set the cameras', description: 'A plan for the field, the officials, and the replays the sport needs.' },
      { step: '03', title: 'Run the session', description: 'Switching and replay against the competition clock.' },
      { step: '04', title: 'Hand over', description: 'The programme record, and the feeds named in the brief.' },
    ],
  },
  systems: {
    title: 'Systems that already list sport',
    lead: 'The published OB van lists sports among its use cases and carries replay. A venue that cannot take the vehicle uses a flypack.',
    links: [
      { text: 'OB VAN 1', href: '/broadcasting/ob-vans/ob-van-1', description: '12 camera chains, replay, and a full vision position.' },
      { text: 'All OB vans', href: '/broadcasting/ob-vans', description: 'The vehicle index.' },
      { text: 'Flypacks', href: '/broadcasting/flypacks', description: 'Portable systems when the venue is indoors.' },
      { text: 'Technical crew', href: '/broadcasting/technical-crew', description: 'Replay operators, cameras, and vision.' },
    ],
  },
  faq: [
    { q: 'Do you name tournaments on this page?', a: 'No. MAP will discuss a specific competition in the proposal. This page does not claim a rights holder, a league, or a host-broadcast mandate.' },
    { q: 'Truck or flypack for sport?', a: 'A vehicle when the site can park one and the camera count needs it. A flypack when the venue is a hall. The sports workflow is the same. The housing changes.' },
    { q: 'Is replay included?', a: 'Replay is part of the sports specification and is on the published OB van. The exact replay setup is named in the proposal.' },
  ],
  related: [
    { text: 'Outside broadcast', href: '/broadcasting/outside-broadcast' },
    { text: 'Live production', href: '/broadcasting/live-production' },
    { text: 'Transmission', href: '/broadcasting/transmission' },
    { text: 'All broadcasting', href: '/broadcasting' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the sport, the venue, and the dates. MAP will reply with the system, the crew, and the replay requirement.',
    button: 'Request a proposal',
    href: '/contact?subject=sports-broadcasting',
  },
}

export const transmissionService: BroadcastServiceContent = {
  eyebrow: 'Transmission',
  title: 'Broadcast transmission and contribution',
  lead: 'Getting the signal from the venue to the destination. Contribution and distribution can be scoped on their own, or with MAP also producing the pictures.',
  breadcrumbs: [home, broadcasting, { label: 'Transmission' }],
  primary: { text: 'Request a proposal', href: '/contact?subject=transmission' },
  sibling: { text: 'Live production', href: '/broadcasting/live-production' },
  audience: {
    title: 'Productions that already have pictures, or need the path as well',
    body: 'A broadcaster or a production manager uses this page when the question is the path, not the camera plot. Live production makes the programme. Transmission moves it. A show can need both.',
  },
  scope: {
    title: 'What is specified',
    lead: 'The path is chosen for the venue and the destination. It is written into the proposal. This page does not claim a particular network.',
    items: [
      'A primary path from the venue to the named destination',
      'A backup when the brief requires the programme to hold',
      'Coordination with the production, whether that production is MAP’s or the client’s',
      'A test before the programme, on the path that will be used',
    ],
  },
  process: {
    eyebrow: 'The path',
    title: 'How contribution is planned',
    lead: 'MAP confirms the path after the venue and the destination are known. The technology is part of that confirmation, not a catalogue on this page.',
    steps: [
      { step: '01', title: 'Name the ends', description: 'Where the signal starts, and every destination that must receive it.' },
      { step: '02', title: 'Specify the path', description: 'The route that fits the venue, including a backup when the brief requires one.' },
      { step: '03', title: 'Test', description: 'The path is proved before the programme, with the production that will use it.' },
      { step: '04', title: 'Hold', description: 'The path stays up for the duration agreed in the proposal.' },
    ],
  },
  systems: {
    title: 'Often paired with a production',
    lead: 'Transmission does not replace the fleet. It sits beside it when the programme has to leave the venue.',
    links: [
      { text: 'Live production', href: '/broadcasting/live-production', description: 'The switched programme the path carries.' },
      { text: 'Outside broadcast', href: '/broadcasting/outside-broadcast', description: 'When the control room is a vehicle at the site.' },
      { text: 'OB vans', href: '/broadcasting/ob-vans', description: 'The published vehicle, if the site can take one.' },
    ],
  },
  faq: [
    { q: 'Which technologies do you operate?', a: 'The path is specified per engagement. This page does not list satellite, fibre, IP, or cellular as a standing fleet. MAP will name the method in the proposal once the venue and the destination are known.' },
    { q: 'Can transmission be hired without the production?', a: 'Yes. A visiting production can ask MAP for the path alone. Crew for that path is scoped with it.' },
    { q: 'Does the OB van include an uplink?', a: 'The published vehicle specification does not list an uplink. Do not read a receiver line on the equipment list as a satellite service. Ask in the proposal.' },
  ],
  related: [
    { text: 'Live production', href: '/broadcasting/live-production' },
    { text: 'Sports broadcasting', href: '/broadcasting/sports-broadcasting' },
    { text: 'Technical crew', href: '/broadcasting/technical-crew' },
    { text: 'All broadcasting', href: '/broadcasting' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the venue and the destinations. MAP will reply with the path it can offer for that engagement.',
    button: 'Request a proposal',
    href: '/contact?subject=transmission',
  },
}

export const technicalCrewService: BroadcastServiceContent = {
  eyebrow: 'Crew',
  title: 'Broadcast engineering and technical crew',
  lead: 'Broadcast engineers, camera operators, vision operators, replay operators, and the technical leads who run a live programme. Crew travels with a MAP unit, and can be engaged for a production MAP does not fully produce.',
  breadcrumbs: [home, broadcasting, { label: 'Technical crew' }],
  primary: { text: 'Request a proposal', href: '/contact?subject=technical-crew' },
  sibling: { text: 'Outside broadcast', href: '/broadcasting/outside-broadcast' },
  audience: {
    title: 'Visiting productions and producers who need people',
    body: 'An international partner with a format, or a producer who has the show and needs a local technical crew, starts here. Hiring the whole outside broadcast is a different page. This page is the people.',
  },
  scope: {
    title: 'Roles MAP supplies',
    lead: 'The roster is scaled to the camera count and the system. MAP does not publish a headcount.',
    items: [
      'Broadcast engineers and systems support',
      'Camera operators',
      'Vision engineers and vision operators',
      'Replay operators',
      'Audio and communications as the programme requires',
      'A technical lead responsible for the crew on the day',
    ],
  },
  process: {
    eyebrow: 'The call',
    title: 'How a crew is specified',
    lead: 'The proposal names the roles. It does not imply a crew resident in every country MAP works.',
    steps: [
      { step: '01', title: 'Read the format', description: 'Camera count, the system, and whether MAP is also supplying the unit.' },
      { step: '02', title: 'Name the roles', description: 'Who is on cameras, vision, replay, audio, and engineering.' },
      { step: '03', title: 'Join the build', description: 'The crew is on site for the build, not only for the show.' },
      { step: '04', title: 'Strike', description: 'The same crew stays through the strike unless the proposal says otherwise.' },
    ],
  },
  systems: {
    title: 'Crew with a system, or crew alone',
    lead: 'A MAP unit arrives with the people who run it. A visiting production can hire the roles without hiring the truck.',
    links: [
      { text: 'OB vans', href: '/broadcasting/ob-vans', description: 'Vehicles that travel with a crew.' },
      { text: 'Flypacks', href: '/broadcasting/flypacks', description: 'Portable systems and the operators who build them.' },
      { text: 'Live production', href: '/broadcasting/live-production', description: 'The operation those roles sit inside.' },
      { text: 'Live event engagement', href: '/production/live-event-production', description: 'When the client wants MAP to own the programme.' },
    ],
  },
  faq: [
    { q: 'Is crew included with a unit?', a: 'Yes. The outside-broadcast and flypack engagements include the people who run the system. This page is for hiring those roles when that is the whole request.' },
    { q: 'Do you station crews in every GCC country?', a: 'No. MAP is based in Dubai and sends crew on the engagement. This page does not claim a resident team outside Dubai.' },
    { q: 'Can you match a visiting director’s crew call?', a: 'The proposal lists the roles MAP will fill. Roles the visiting production brings stay with them.' },
  ],
  related: [
    { text: 'Outside broadcast', href: '/broadcasting/outside-broadcast' },
    { text: 'Live production', href: '/broadcasting/live-production' },
    { text: 'Sports broadcasting', href: '/broadcasting/sports-broadcasting' },
    { text: 'Production', href: '/production' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Send the dates, the city, and the roles you need. MAP will reply with the crew it can put on that call.',
    button: 'Request a proposal',
    href: '/contact?subject=technical-crew',
  },
}
