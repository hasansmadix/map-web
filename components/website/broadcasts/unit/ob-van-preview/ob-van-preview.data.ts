export interface ObVanGearItem {
  title: string
  qty: number
}

export interface ObVanSystem {
  id: string
  label: string
  /** Where the 3D scene should look when this system is selected. */
  zone: 'field' | 'rack' | 'roof' | 'rear'
  items: ObVanGearItem[]
}

export const obVanSystems: ObVanSystem[] = [
  {
    id: 'vision',
    label: 'Vision',
    zone: 'rack',
    items: [
      { title: 'Hanabi HVS-490 Vision Mixer (40 in / 16 out)', qty: 1 },
      { title: 'Router MFR 64x64 with 4 Panels', qty: 1 },
    ],
  },
  {
    id: 'cameras',
    label: 'Cameras',
    zone: 'field',
    items: [
      { title: 'Grass Valley 86N WorldCam 4K SMPTE-Fiber Camera Full Chain (Tripod, Dolly, Viewfinders)', qty: 12 },
      { title: 'Grass Valley Camera Control Unit', qty: 12 },
      { title: 'Grass Valley OCP 400 Remote Control System', qty: 12 },
    ],
  },
  {
    id: 'lenses',
    label: 'Lenses',
    zone: 'field',
    items: [
      { title: 'Fujinon 22x Broadcast Lens with Full Servo Kit', qty: 8 },
      { title: 'Canon HJ11x 4.3 with Servo Kit', qty: 4 },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    zone: 'field',
    items: [{ title: 'Vinten 250 Tripod', qty: 9 }],
  },
  {
    id: 'replay',
    label: 'Replay',
    zone: 'rack',
    items: [
      { title: 'Atomos Ninja Recorder', qty: 3 },
      { title: 'AJA Ki Pro Recorder', qty: 1 },
      { title: 'Blackmagic Recorder 4K', qty: 4 },
      { title: 'Instant Replay for Playback', qty: 1 },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitors',
    zone: 'rack',
    items: [
      { title: 'Tektronix Waveform Monitor', qty: 2 },
      { title: 'TV Logic 17-inch Broadcast Monitor', qty: 7 },
      { title: 'Wholer Quad Monitor', qty: 4 },
      { title: 'Samsung Monitors for Multiview', qty: 8 },
    ],
  },
  {
    id: 'intercom',
    label: 'Intercom',
    zone: 'rack',
    items: [
      { title: 'RTS Adam Talkback System (64 Ports)', qty: 1 },
      { title: 'RTS Panels', qty: 11 },
    ],
  },
  {
    id: 'sync',
    label: 'Sync',
    zone: 'rack',
    items: [{ title: 'Harris 75x Frame Sync', qty: 8 }],
  },
  {
    id: 'audio',
    label: 'Audio',
    zone: 'rack',
    items: [
      { title: 'Aten KVM Controller', qty: 1 },
      { title: 'Midas M32 Audio Mixer (64 Channels)', qty: 1 },
      { title: 'Stage Boxes for Audio Mixer (16 in / 8 out)', qty: 2 },
      { title: 'Genelec Speakers', qty: 5 },
    ],
  },
  {
    id: 'rf',
    label: 'RF',
    zone: 'roof',
    items: [{ title: 'Ericsson RF Receiver', qty: 1 }],
  },
  {
    id: 'power',
    label: 'Power',
    zone: 'rear',
    items: [{ title: 'APC UPS System 40kV', qty: 1 }],
  },
  {
    id: 'cabling',
    label: 'Cabling',
    zone: 'rear',
    items: [{ title: 'Fiber Cables 200m Drums', qty: 20 }],
  },
]

export const obVanSpecs = [
  { label: 'Format', value: 'HD / 4K' },
  { label: 'Routing', value: '64x64' },
  { label: 'Intercom', value: 'RTS Adam' },
  { label: 'Mobility', value: 'Mobile' },
  { label: 'Use cases', value: 'Sports, Live Events, Broadcast Production' },
  { label: 'Audio mixer', value: 'Midas M32' },
  { label: 'Deployment', value: 'OB Van' },
  { label: 'Power backup', value: 'APC UPS 40kV' },
  { label: 'Vision mixer', value: 'Hanabi HVS-490' },
  { label: 'Camera chains', value: '12' },
]

export function systemCount(system: ObVanSystem) {
  if (system.id === 'cameras') return 12
  return system.items.reduce((sum, item) => sum + item.qty, 0)
}
