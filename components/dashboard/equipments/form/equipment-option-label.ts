const LABELS: Record<string, string> = {
  camera: 'Camera',
  lens: 'Lens',
  light: 'Light',
  audio: 'Audio',
  accessory: 'Accessory',
  full_frame: 'Full frame',
  super35: 'Super 35',
  aps_c: 'APS-C',
  mft: 'MFT',
  JuniorPin: 'Junior pin',
  BabyPin: 'Baby pin',
  StandMount: 'Stand mount',
  mic: 'Microphone',
  recorder: 'Recorder',
  wireless: 'Wireless',
  mixer: 'Mixer',
  cardioid: 'Cardioid',
  supercardioid: 'Supercardioid',
  omni: 'Omni',
  shotgun: 'Shotgun',
}

export function equipmentOptionLabel(value: string) {
  return LABELS[value] ?? value
}

export function equipmentOptions(values: string[]) {
  return values.map(value => ({ value, label: equipmentOptionLabel(value) }))
}
