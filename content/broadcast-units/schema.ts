import { z } from 'zod'

export const equipmentGroupOrder = [
  'VISION_MIXING',
  'CAMERAS',
  'LENSES',
  'CAMERA_SUPPORT',
  'ROUTING',
  'PLAYOUT_GRAPHICS',
  'RECORDING_REPLAY',
  'MONITORING',
  'AUDIO',
  'INTERCOM',
  'RF_WIRELESS',
  'SYNC_TIMING',
  'POWER',
  'CABLING',
  'NETWORKING',
  'VIDEO_PRODUCTION',
  'STUDIO_TOOLS',
] as const

const itemGroupSchema = z.enum(equipmentGroupOrder)

const lineItemSchema = z.object({
  group: itemGroupSchema,
  title: z.string().trim().min(1),
  qty: z.number().optional(),
  notes: z.string().optional(),
  order: z.number(),
})

const gallerySchema = z.object({
  src: z.string().trim().min(1),
  alt: z.string().trim().min(1),
  order: z.number(),
})

const sharedSpecsSchema = z.object({
  format: z.string().optional(),
  cameraChains: z.number().optional(),
  cameraSystem: z.string().optional(),
  visionMixer: z.string().optional(),
  visionMixers: z.array(z.string()).optional(),
  routing: z.string().optional(),
  audioMixer: z.string().optional(),
  intercom: z.array(z.string()).optional(),
  power: z.string().optional(),
  powerBackup: z.string().optional(),
  mobility: z.string().optional(),
  deployment: z.string().optional(),
  useCases: z.array(z.string()).optional(),
  vehicleLength: z.string().optional(),
  expanding: z.string().optional(),
  uplink: z.string().optional(),
})

const identitySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  published: z.boolean(),
  order: z.number(),
  meta: z.object({
    title: z.string().trim().min(1).max(70),
    description: z.string().trim().min(1).max(160),
  }),
  items: z.array(lineItemSchema),
  gallery: z.array(gallerySchema),
})

export const broadcastUnitSchema = z.discriminatedUnion('kind', [
  identitySchema.extend({
    kind: z.literal('obvan'),
    specs: sharedSpecsSchema,
  }),
  identitySchema.extend({
    kind: z.literal('flight-case'),
    specs: sharedSpecsSchema,
  }),
  identitySchema.extend({
    kind: z.literal('studio'),
    specs: sharedSpecsSchema.extend({
      areaSqm: z.number(),
      features: z.array(z.string()).min(1),
      broadcastReady: z.boolean().optional(),
      wirelessAudio: z.string().optional(),
    }),
  }),
])

export type BroadcastUnitContent = z.infer<typeof broadcastUnitSchema>
export type BroadcastUnitInput = z.input<typeof broadcastUnitSchema>
export type BroadcastUnitKind = BroadcastUnitContent['kind']
export type BroadcastUnitSpecs = BroadcastUnitContent['specs']

export const reservedUnitSlugs = ['ob-van-preview', 'studio-preview'] as const

export const fleetByKind = {
  obvan: {
    href: '/broadcasting/ob-vans',
    label: 'OB vans',
    singular: 'OB van',
    titleSuffix: 'OB Van',
  },
  'flight-case': {
    href: '/broadcasting/flypacks',
    label: 'Flypacks',
    singular: 'Flypack',
    titleSuffix: 'Flypack',
  },
  studio: {
    href: '/broadcasting/studios',
    label: 'Studios',
    singular: 'Studio',
    titleSuffix: 'Broadcast Studio',
  },
} as const

export function unitPath(unit: Pick<BroadcastUnitContent, 'kind' | 'slug'>) {
  return `${fleetByKind[unit.kind].href}/${unit.slug}`
}
