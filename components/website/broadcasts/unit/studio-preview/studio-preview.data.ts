export interface StudioGearItem {
  title: string
  qty: number
}

export type StudioZone = 'stage' | 'grid' | 'gallery' | 'rooms'

export interface StudioSystem {
  id: string
  label: string
  zone: StudioZone
  items: StudioGearItem[]
}

export interface StudioSpace {
  id: string
  label: string
  zone: StudioZone
  note: string
}

export interface StudioInventoryRow {
  maker: string
  item: string
  qty: number
}

export const studioSystems: StudioSystem[] = [
  {
    id: 'vision',
    label: 'Vision',
    zone: 'gallery',
    items: [
      { title: 'FOR-A HVS-492WOU 2ME video switcher', qty: 1 },
      { title: 'FOR-A HVS-490 2ME video switcher', qty: 1 },
      { title: 'FOR-A MFR-64RUW 64×64 router with 4 panels', qty: 1 },
    ],
  },
  {
    id: 'cameras',
    label: 'Cameras',
    zone: 'stage',
    items: [
      { title: 'Grass Valley Focus 70, 1080i', qty: 6 },
      { title: 'Grass Valley Focus triax base, Fischer', qty: 6 },
      { title: 'Grass Valley OCP 400', qty: 6 },
    ],
  },
  {
    id: 'lenses',
    label: 'Lenses',
    zone: 'stage',
    items: [
      { title: 'Fujinon XA17x7.6BRM normal lens, full servo', qty: 5 },
      { title: 'Canon J11ax4 wide-angle lens, full servo', qty: 1 },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    zone: 'stage',
    items: [
      { title: 'Libec tripod', qty: 5 },
      { title: 'Triangle 13 m crane, 4 silver boxes, 1 black box head', qty: 1 },
    ],
  },
  {
    id: 'servers',
    label: 'Servers',
    zone: 'gallery',
    items: [
      { title: 'FOR-A Insight video server', qty: 1 },
      { title: 'PlayBox Title Box CG', qty: 1 },
      { title: 'Nevion Glues', qty: 1 },
    ],
  },
  {
    id: 'record',
    label: 'Record',
    zone: 'gallery',
    items: [
      { title: 'Blackmagic recorder', qty: 1 },
      { title: 'Instant Replay networked digital audio', qty: 1 },
    ],
  },
  {
    id: 'monitors',
    label: 'Monitors',
    zone: 'gallery',
    items: [
      { title: 'Tektronix WVR 7020', qty: 1 },
      { title: 'Sony broadcast monitor', qty: 1 },
      { title: 'Samsung multiviewer', qty: 4 },
    ],
  },
  {
    id: 'intercom',
    label: 'Intercom',
    zone: 'gallery',
    items: [{ title: 'RTS Odin talkback with 4 panels', qty: 1 }],
  },
  {
    id: 'audio',
    label: 'Audio',
    zone: 'gallery',
    items: [
      { title: 'Midas M32 audio mixer with stage box', qty: 1 },
      { title: 'Sennheiser EW 500 G3 neck microphone receiver', qty: 5 },
      { title: 'Sennheiser EW 500 G3 neck microphone transmitter', qty: 5 },
    ],
  },
  {
    id: 'prompt',
    label: 'Prompt',
    zone: 'stage',
    items: [{ title: 'Autoscript', qty: 2 }],
  },
]

export const studioSpaces: StudioSpace[] = [
  { id: 'grid', label: 'Lighting grid', zone: 'grid', note: 'Overhead grid across the full floor, with house and work light for the stage.' },
  { id: 'lighting', label: 'Basic lighting', zone: 'grid', note: 'Working light for rehearsal, set dressing, and the change between programmes.' },
  { id: 'makeup', label: 'Makeup room', zone: 'rooms', note: 'Preparation room off the floor for presenters and guests.' },
  { id: 'changing', label: 'Changing room', zone: 'rooms', note: 'Wardrobe and change, beside the stage.' },
  { id: 'guest', label: 'Guest room', zone: 'rooms', note: 'Holding room for guests before they walk onto the floor.' },
  { id: 'edit', label: 'Edit room', zone: 'rooms', note: 'Review and finish beside the studio, off the live floor.' },
]

export const studioInventory: StudioInventoryRow[] = [
  { maker: 'FOR-A', item: 'HVS-492WOU 2ME video switcher', qty: 1 },
  { maker: 'FOR-A', item: 'HVS-490 2ME video switcher', qty: 1 },
  { maker: 'Grass Valley', item: 'Focus triax base unit, Fischer', qty: 6 },
  { maker: 'Grass Valley', item: 'Focus 70, 1080i', qty: 6 },
  { maker: 'Grass Valley', item: 'OCP 400', qty: 6 },
  { maker: 'FOR-A', item: 'MFR-64RUW 64×64 router with 4 panels', qty: 1 },
  { maker: 'Nevion', item: 'Glues', qty: 1 },
  { maker: 'FOR-A Insight', item: 'Video server', qty: 1 },
  { maker: 'PlayBox', item: 'Title Box CG', qty: 1 },
  { maker: 'Fujinon', item: 'XA17x7.6BRM normal lens, full servo', qty: 5 },
  { maker: 'Canon', item: 'J11ax4 wide-angle lens, full servo', qty: 1 },
  { maker: 'Libec', item: 'Tripod', qty: 5 },
  { maker: 'Triangle', item: '13 m crane, 4 silver boxes, 1 black box head', qty: 1 },
  { maker: 'Blackmagic', item: 'Recorder', qty: 1 },
  { maker: 'Tektronix', item: 'WVR 7020', qty: 1 },
  { maker: 'Sony', item: 'Broadcast monitor', qty: 1 },
  { maker: 'Samsung', item: 'Multiviewer monitors', qty: 4 },
  { maker: 'RTS', item: 'Odin talkback with 4 panels', qty: 1 },
  { maker: 'Midas', item: 'M32 audio mixer with stage box', qty: 1 },
  { maker: 'Sennheiser', item: 'EW 500 G3 neck microphone receiver', qty: 5 },
  { maker: 'Sennheiser', item: 'EW 500 G3 neck microphone transmitter', qty: 5 },
  { maker: 'Instant Replay', item: 'Networked digital audio', qty: 1 },
  { maker: 'Autoscript', item: 'Prompt system', qty: 2 },
]

export const studioSpecs = [
  { label: 'Studio', value: 'Studio 1' },
  { label: 'Floor', value: '600 SQM' },
  { label: 'Format', value: '1080i' },
  { label: 'Camera chains', value: '6' },
  { label: 'Vision', value: 'FOR-A HVS-492WOU and HVS-490' },
  { label: 'Routing', value: '64×64 FOR-A MFR-64RUW' },
  { label: 'Audio', value: 'Midas M32' },
  { label: 'Intercom', value: 'RTS Odin' },
  { label: 'Crane', value: 'Triangle, 13 m' },
  { label: 'Rooms', value: 'Makeup, changing, guest, edit' },
]

export const studioCamera = {
  stage: { position: [28, 20, 32] as const, target: [0, 2, -1] as const },
  grid: { position: [10, 14, 16] as const, target: [0, 7, -2] as const },
  gallery: { position: [-6, 7, 22] as const, target: [-17, 1.8, 0] as const },
  rooms: { position: [24, 9, 18] as const, target: [17, 1.8, 0] as const },
}

export function systemCount(system: StudioSystem) {
  if (system.id === 'cameras') return 6
  return system.items.reduce((sum, item) => sum + item.qty, 0)
}

export function zoneFor(id: string | null): StudioZone {
  if (!id) return 'stage'
  return studioSystems.find(system => system.id === id)?.zone ?? studioSpaces.find(space => space.id === id)?.zone ?? 'stage'
}
