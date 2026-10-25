import type { PageFeatureItem } from '@/components/website/common/page-features-grid';
import { Camera, TvMinimal, Video, Package2, Settings2, RadioTower } from 'lucide-react';

/* ----------------------------------
 * What We Do - Core Business Units
 * ---------------------------------- */
export const coreBusinessUnits: (PageFeatureItem & { href: string })[] = [
  {
    icon: Camera,
    title: 'Equipment Rental',
    description: 'Cameras, lenses, lighting, and audio, prepared for a shoot in Dubai and the UAE.',
    href: '/equipment-rental',
  },
  {
    icon: TvMinimal,
    title: 'Broadcasting Solutions',
    description: 'Outside broadcast, live multi-camera production, and the vans, flypacks, and studio that carry it.',
    href: '/broadcasting',
  },
  {
    icon: Video,
    title: 'Production',
    description: 'Commercials, corporate films, event coverage, live programmes, and studio sessions.',
    href: '/production',
  },
];

/* ----------------------------------
 * Equipment Highlights - Internal Links format
 * ---------------------------------- */
export const equipmentCategoryLinks = [
  { text: 'Camera Rental', href: '/equipment-rental/camera-rental' },
  { text: 'Lens Rental', href: '/equipment-rental/lens-rental' },
  { text: 'Lighting Rental', href: '/equipment-rental/lighting-rental' },
];

export const equipmentBrandLinks = [
  { text: 'ARRI', href: '/equipment-rental/arri' },
  { text: 'Sony', href: '/equipment-rental/sony' },
  { text: 'Canon', href: '/equipment-rental/canon' },
  { text: 'Zeiss', href: '/equipment-rental/zeiss' },
];

/* ----------------------------------
 * Broadcasting Infrastructure (PageFeaturesGrid + links)
 * ---------------------------------- */
export const broadcastingInfrastructure: (PageFeatureItem & { href: string })[] = [
  {
    icon: RadioTower,
    title: 'Outside broadcast',
    description: 'A mobile production for a site that can take a vehicle.',
    href: '/broadcasting/outside-broadcast',
  },
  {
    icon: Settings2,
    title: 'Live production',
    description: 'Switching, graphics, a record, and delivery of the live programme.',
    href: '/broadcasting/live-production',
  },
  {
    icon: Package2,
    title: 'OB vans',
    description: 'The published vehicles and their specifications.',
    href: '/broadcasting/ob-vans',
  },
];

/* ----------------------------------
 * Production Services - Internal Links
 * ---------------------------------- */
export const productionServiceLinks = [
  { text: 'Commercial production', href: '/production/commercial-video-production' },
  { text: 'Corporate film', href: '/production/corporate-video-production' },
  { text: 'Event coverage', href: '/production/event-video-production' },
  { text: 'Live production', href: '/production/live-event-production' },
  { text: 'Studio sessions', href: '/production/studio-video-production' },
];

/* ----------------------------------
 * Industries Served - UseCasesGrid format (string[])
 * ---------------------------------- */
export const industriesServed = [
  'Advertising Agencies',
  'Film Production Companies',
  'Corporate Clients',
  'Government Entities',
  'Event Organizers',
  'Broadcasters',
];

/* ----------------------------------
 * Workflow / Process (deployment-style)
 * ---------------------------------- */
export const workflowSteps = [
  { step: '01', title: 'Planning', description: 'The venue, the programme, and the system are agreed before a date is held.' },
  { step: '02', title: 'Preparation', description: 'Cameras, crew, and the unit are tested and packed.' },
  { step: '03', title: 'Setup', description: 'The system is installed and lined up on site.' },
  { step: '04', title: 'Production', description: 'MAP runs the day, in the studio or on the broadcast.' },
  { step: '05', title: 'Strike', description: 'The set is cleared and the kit returns to Dubai Production City.' },
];
