import { EquipmentType } from '@/types/equipments/equipment.enum';
import type {
  IEquipmentSpecs,
  ICameraSpecs,
  ILensSpecs,
  ILightSpecs,
  IAudioSpecs,
  IAccessorySpecs,
} from '@/types/equipments/equipment.type';
import { capitalizeEachWord } from '@/utils/format';

interface EquipmentSpecsProps {
  specs: IEquipmentSpecs;
  equipmentType: EquipmentType;
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined | null;
}) {
  if (value === undefined || value === null || value === '') return null;

  return (
    <div className="border-border flex items-baseline justify-between gap-6 border-b py-4">
      <dt className="text-muted-foreground shrink-0 text-[11px] font-medium tracking-[0.16em] uppercase">{label}</dt>
      <dd className="text-end text-sm font-light md:text-base">{String(value)}</dd>
    </div>
  );
}

function SpecBadgeRow({
  label,
  values,
}: {
  label: string;
  values: string[] | undefined;
}) {
  if (!values || values.length === 0) return null;

  return (
    <SpecRow label={label} value={values.map(value => capitalizeEachWord(value)).join(', ')} />
  );
}

function CameraSpecs({ specs }: { specs: ICameraSpecs }) {
  const rows = [
    { label: 'Sensor', value: capitalizeEachWord(specs.sensor?.replace(/_/g, ' ')) },
    { label: 'Max Resolution', value: specs.maxResolution },
    { label: 'Max FPS', value: specs.maxFps ? `${specs.maxFps} fps` : undefined },
    { label: 'Weight', value: specs.weightKg ? `${specs.weightKg} kg` : undefined },
    { label: 'Media Format', value: specs.media },
  ].filter(row => row.value);

  return (
    <dl className="border-border border-t">
      {rows.map(row => (
        <SpecRow key={row.label} label={row.label} value={row.value} />
      ))}
      <SpecBadgeRow label="Mounts" values={specs.mounts} />
    </dl>
  );
}

function LensSpecs({ specs }: { specs: ILensSpecs }) {
  const focalLength = specs.focalLengthMm
    ? specs.focalLengthMm.min === specs.focalLengthMm.max
      ? `${specs.focalLengthMm.min}mm`
      : `${specs.focalLengthMm.min}-${specs.focalLengthMm.max}mm`
    : undefined;

  const aperture = specs.aperture ? `T${specs.aperture.minT}-${specs.aperture.maxT}` : undefined;

  const rows = [
    { label: 'Mount', value: specs.mount },
    { label: 'Focal Length', value: focalLength },
    { label: 'Aperture', value: aperture },
    { label: 'Type', value: specs.isZoom ? 'Zoom' : 'Prime' },
    { label: 'Weight', value: specs.weightG ? `${specs.weightG} g` : undefined },
  ].filter(row => row.value);

  return (
    <dl className="border-border border-t">
      {rows.map(row => (
        <SpecRow key={row.label} label={row.label} value={row.value} />
      ))}
    </dl>
  );
}

function LightSpecs({ specs }: { specs: ILightSpecs }) {
  const colorTemp = specs.colorTempK ? `${specs.colorTempK.min}K - ${specs.colorTempK.max}K` : undefined;

  const rows = [
    { label: 'Power', value: specs.powerW ? `${specs.powerW}W` : undefined },
    { label: 'Color Temperature', value: colorTemp },
    { label: 'RGB', value: specs.hasRgb ? 'Yes' : 'No' },
    { label: 'Mount', value: specs.mount ? capitalizeEachWord(specs.mount) : undefined },
  ].filter(row => row.value);

  return (
    <dl className="border-border border-t">
      {rows.map(row => (
        <SpecRow key={row.label} label={row.label} value={row.value} />
      ))}
    </dl>
  );
}

function AudioSpecs({ specs }: { specs: IAudioSpecs }) {
  const rows = [
    { label: 'Category', value: capitalizeEachWord(specs.category) },
    { label: 'Pattern', value: specs.pattern ? capitalizeEachWord(specs.pattern) : undefined },
    { label: 'Channels', value: specs.channels },
    {
      label: 'Phantom Power',
      value: specs.phantomPower !== undefined ? (specs.phantomPower ? 'Yes' : 'No') : undefined,
    },
  ].filter(row => row.value);

  return (
    <dl className="border-border border-t">
      {rows.map(row => (
        <SpecRow key={row.label} label={row.label} value={row.value} />
      ))}
    </dl>
  );
}

function AccessorySpecs({ specs }: { specs: IAccessorySpecs }) {
  if (!specs.notes) return <p className="text-muted-foreground text-sm font-light">No specifications available</p>;

  return (
    <dl className="border-border border-t">
      <SpecRow label="Notes" value={specs.notes} />
    </dl>
  );
}

export function EquipmentSpecs({ specs, equipmentType }: EquipmentSpecsProps) {
  switch (equipmentType) {
    case EquipmentType.CAMERA:
      return <CameraSpecs specs={specs as ICameraSpecs} />;
    case EquipmentType.LENS:
      return <LensSpecs specs={specs as ILensSpecs} />;
    case EquipmentType.LIGHT:
      return <LightSpecs specs={specs as ILightSpecs} />;
    case EquipmentType.AUDIO:
      return <AudioSpecs specs={specs as IAudioSpecs} />;
    case EquipmentType.ACCESSORY:
      return <AccessorySpecs specs={specs as IAccessorySpecs} />;
    default:
      return <p className="text-muted-foreground text-sm">No specifications available</p>;
  }
}
