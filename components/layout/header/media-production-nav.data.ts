export interface MediaProductionNavItem {
  label: string;
  href: string;
  description?: string;
}

export const mediaProductionNavItems: MediaProductionNavItem[] = [
  {
    label: 'Overview',
    href: '/production',
    description: 'Finished programmes. Broadcasting runs the technical operation.',
  },
  {
    label: 'Commercial',
    href: '/production/commercial-video-production',
    description: 'Commercials, digital spots, and branded films.',
  },
  {
    label: 'Corporate',
    href: '/production/corporate-video-production',
    description: 'Company films, profiles, and internal communications.',
  },
  {
    label: 'Event coverage',
    href: '/production/event-video-production',
    description: 'The film after the event, not the live switch.',
  },
  {
    label: 'Live production',
    href: '/production/live-event-production',
    description: 'MAP owns the live programme. Operations sit in Broadcasting.',
  },
  {
    label: 'Studio',
    href: '/production/studio-video-production',
    description: 'Controlled studio and green-screen sessions.',
  },
];
