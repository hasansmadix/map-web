import type { ServiceLineContent } from '@/components/website/services/service-line-page'

export const serviceContent: ServiceLineContent = {
  navLabel: 'Studio',
  eyebrow: 'Studio',
  title: 'Studio production',
  lead: 'Interviews, product films, and green-screen work. Lighting, sound, and background are set before the session begins. The facility specification is separate from the filming day.',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Production', href: '/production' },
    { label: 'Studio' },
  ],
  primary: { text: 'Request a proposal', href: '/contact?subject=studio-video' },
  secondary: { text: 'Production', href: '/production' },
  facts: [
    { value: 'Before call', label: 'The set is lit on arrival' },
    { value: 'Half day', label: 'Interviews and presenter sessions' },
    { value: 'Full day', label: 'Products, keys, and several looks' },
  ],
  sections: [
    {
      id: 'interviews',
      nav: 'Interviews',
      title: 'Interviews',
      description:
        'Executives, experts, and testimonials, with more than one angle and a clean track. The setup is lit before the guest arrives.',
      scope: [
        'Executive, expert, and testimonial interviews',
        'More than one camera angle',
        'A quiet track and controlled light',
        'Selects ready for the edit',
      ],
    },
    {
      id: 'green-screen',
      nav: 'Green screen',
      title: 'Green screen',
      description:
        'A key that holds, so the background can be a place, a graphic, or a clean field. The screen is lit for the composite.',
      scope: [
        'A screen lit for a clean key',
        'Backgrounds composited after the session',
        'Product and presenter work on green',
        'A finish that matches the intended background',
      ],
    },
    {
      id: 'presenter',
      nav: 'Presenter',
      title: 'To camera',
      description:
        'A presenter, a prompt, and a frame that stays still while the words change. Useful for a script that has to be delivered precisely.',
      scope: [
        'A locked frame and a prompted script',
        'Several reads in one session',
        'Versions for web, internal, and social',
        'A grade after the day',
      ],
    },
    {
      id: 'products',
      nav: 'Products',
      title: 'Products',
      description: 'Tabletop, turntable, and macro, lit for the object. The session is planned around the product, the pack, and the shots the film needs.',
      scope: [
        'Tabletop, turntable, and macro',
        'Pack shots and detail',
        'Controlled light for the object',
        'Stills and motion from the same setup',
      ],
    },
    {
      id: 'virtual',
      nav: 'Virtual',
      title: 'Virtual sets',
      description:
        'Backgrounds and compositing when a location is impractical. The foreground is shot so the composite holds.',
      scope: [
        'Virtual places and graphic backgrounds',
        'Compositing after the session',
        'A foreground lit for the key',
        'A finished picture for web or broadcast',
      ],
    },
  ],
  standards: {
    eyebrow: 'Engagement',
    title: 'What a studio day includes',
    lead: 'The room, the crew, and the finish. The organisation brings the people and the product.',
    items: [
      'A lit set before call time',
      'Cameras, sound, and a small crew',
      'Green screen or a plain background',
      'A teleprompter when the script requires one',
      'Selects and a grade after the day',
      'Keying and compositing when the proposal includes a finish',
    ],
  },
  practice: {
    eyebrow: 'The standard',
    title: 'The room is ready',
    lead: 'Studio time is used for the session. Light, sound, and background are prepared before call.',
    items: [
      {
        title: 'A working facility',
        description: 'Cyclorama, green screen, and lighting that is already in the room.',
      },
      {
        title: 'A picture independent of the weather',
        description: 'The same light at the start of the day and at the end of it.',
      },
      {
        title: 'Camera and lighting for the finish',
        description: 'The session is lit by people who also complete the grade and the key.',
      },
      {
        title: 'Footage that composites',
        description: 'Shot so a key, a grade, or a graphic sits cleanly on the original.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'How a studio day proceeds',
    lead: 'The length of the session is set in the proposal.',
    steps: [
      { step: '01', title: 'Brief', description: 'Who is in the chair, and what the film is for.' },
      { step: '02', title: 'Prepare', description: 'The set, the light, and the background before call.' },
      { step: '03', title: 'Record', description: 'Interviews, products, or a presenter session.' },
      { step: '04', title: 'Deliver', description: 'Selects, a grade, and a keyed finish when the job requires one.' },
    ],
  },
  faq: [
    {
      q: 'What is included in a studio day?',
      a: 'The room, lighting, cameras, sound, and a crew. Green screen or a plain background is part of the setup. Grading and keying are included when the proposal is for a finished film.',
    },
    {
      q: 'Do you have green screen?',
      a: 'Yes. The screen is lit for a clean key, and the background can be composited afterwards. It suits virtual places, product films, and sessions that should show a chosen background.',
    },
    {
      q: 'How long is a session?',
      a: 'Half a day covers most interviews. A full day covers several looks, a product, or a green-screen sequence with coverage. The length is set in the proposal.',
    },
    {
      q: 'Can you shoot products?',
      a: 'Yes. Turntable, macro, and controlled light, with or without a keyed background. The setup suits commerce, launches, and films in which the object is the subject.',
    },
  ],
  related: [
    { text: 'Studio facility', href: '/broadcasting/studios' },
    { text: 'Commercial', href: '/production/commercial-video-production' },
    { text: 'Corporate', href: '/production/corporate-video-production' },
    { text: 'Production', href: '/production' },
    { text: 'Equipment rental', href: '/equipment-rental' },
  ],
  cta: {
    title: 'Request a proposal',
    description: 'Tell us who is in the chair. MAP will reply with the setup, the length of the day, and a written proposal.',
    button: 'Request a proposal',
    href: '/contact?subject=studio-video',
  },
}
