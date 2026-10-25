'use client';

import { equipmentOptionLabel } from '@/components/dashboard/equipments/form/equipment-option-label';
import type { IEquipment } from '@/types/equipments/equipment.type';
import { EquipmentType } from '@/types/equipments/equipment.enum';

interface EquipmentSpecsProps {
  specs: IEquipment['specs'];
}

function EquipmentSpecs({ specs }: EquipmentSpecsProps) {
  return (
    <section className="border-border bg-card border">
      <h2 className="border-border text-muted-foreground border-b px-5 py-3.5 text-[11px] font-medium tracking-[0.16em] uppercase">
        Specifications
      </h2>
      <div className="px-5 py-5">
        <EquipmentSpecsDisplay specs={specs} />
      </div>
    </section>
  );
}

function EquipmentSpecsDisplay({ specs }: { specs: IEquipment['specs'] }) {
  if (specs.type === EquipmentType.CAMERA) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SpecItem label="Sensor" value={equipmentOptionLabel(specs.sensor)} />
        {specs.maxResolution && <SpecItem label="Max Resolution" value={specs.maxResolution} />}
        {specs.maxFps && <SpecItem label="Max FPS" value={`${specs.maxFps}`} />}
        {specs.mounts && specs.mounts.length > 0 && (
          <SpecItem label="Mounts" value={specs.mounts.join(', ')} />
        )}
        {specs.weightKg && <SpecItem label="Weight" value={`${specs.weightKg} kg`} />}
        {specs.media && <SpecItem label="Media Format" value={specs.media} />}
      </div>
    );
  }

  if (specs.type === EquipmentType.LENS) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SpecItem label="Mount" value={specs.mount} />
        <SpecItem
          label="Focal Length"
          value={`${specs.focalLengthMm.min}mm - ${specs.focalLengthMm.max}mm`}
        />
        {specs.aperture && (
          <SpecItem label="Aperture" value={`T${specs.aperture.minT} - T${specs.aperture.maxT}`} />
        )}
        <SpecItem label="Type" value={specs.isZoom ? 'Zoom' : 'Prime'} />
        {specs.weightG && <SpecItem label="Weight" value={`${specs.weightG}g`} />}
      </div>
    );
  }

  if (specs.type === EquipmentType.LIGHT) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SpecItem label="Power" value={`${specs.powerW}W`} />
        {specs.colorTempK && (
          <SpecItem label="Color Temperature" value={`${specs.colorTempK.min}K - ${specs.colorTempK.max}K`} />
        )}
        <SpecItem label="RGB" value={specs.hasRgb ? 'Yes' : 'No'} />
        {specs.mount && <SpecItem label="Mount" value={equipmentOptionLabel(specs.mount)} />}
      </div>
    );
  }

  if (specs.type === EquipmentType.AUDIO) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SpecItem label="Category" value={equipmentOptionLabel(specs.category)} />
        {specs.pattern && <SpecItem label="Pattern" value={equipmentOptionLabel(specs.pattern)} />}
        {specs.channels && <SpecItem label="Channels" value={`${specs.channels}`} />}
        {specs.phantomPower !== undefined && (
          <SpecItem label="Phantom Power" value={specs.phantomPower ? 'Yes' : 'No'} />
        )}
      </div>
    );
  }

  if (specs.type === EquipmentType.ACCESSORY) {
    return (
      <div className="space-y-2">
        {specs.notes && (
          <div>
            <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">Notes</p>
            <p className="mt-1 text-sm">{specs.notes}</p>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export default EquipmentSpecs;
