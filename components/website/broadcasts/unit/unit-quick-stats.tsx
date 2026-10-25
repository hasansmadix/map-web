import type { BroadcastUnitContent } from '@/content/broadcast-units/schema'

interface UnitFact {
  label: string
  value: string
}

function factsFor(unit: BroadcastUnitContent): UnitFact[] {
  const specs = unit.specs
  const facts: UnitFact[] = []

  if (specs.format) facts.push({ label: 'Format', value: specs.format })
  if (specs.cameraChains) facts.push({ label: 'Cameras', value: String(specs.cameraChains) })
  if (specs.visionMixer) facts.push({ label: 'Vision', value: specs.visionMixer })
  else if (specs.visionMixers?.length) facts.push({ label: 'Vision', value: specs.visionMixers[0] })
  if ('areaSqm' in specs && specs.areaSqm) facts.push({ label: 'Area', value: `${specs.areaSqm} m²` })
  if (specs.routing && facts.length < 4) facts.push({ label: 'Routing', value: specs.routing })

  return facts.slice(0, 4)
}

export function UnitQuickStats({ unit }: { unit: BroadcastUnitContent }) {
  const facts = factsFor(unit)
  if (facts.length === 0) return null

  return (
    <ul className="mt-12 grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
      {facts.map((fact, index) => (
        <li key={fact.label} className={index > 0 ? 'border-white/10 py-5 sm:border-s sm:ps-6' : 'py-5'}>
          <p className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">{fact.label}</p>
          <p className="mt-2 text-sm font-light text-white">{fact.value}</p>
        </li>
      ))}
    </ul>
  )
}
