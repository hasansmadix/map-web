import { flightcase1 } from './units/flightcase-1'
import { flightcase2 } from './units/flightcase-2'
import { flightcase3 } from './units/flightcase-3'
import { flightcase4 } from './units/flightcase-4'
import { obVan1 } from './units/ob-van-1'
import { studio1 } from './units/studio-1'
import { broadcastUnitSchema, equipmentGroupOrder, reservedUnitSlugs, type BroadcastUnitContent, type BroadcastUnitKind } from './schema'

const parsed = [obVan1, flightcase1, flightcase2, flightcase3, flightcase4, studio1].map(unit => broadcastUnitSchema.parse(unit))

const slugs = parsed.map(unit => unit.slug)
const duplicate = slugs.find((slug, index) => slugs.indexOf(slug) !== index)
if (duplicate) throw new Error(`Duplicate broadcast unit slug: ${duplicate}`)

for (const slug of slugs) {
  if ((reservedUnitSlugs as readonly string[]).includes(slug)) throw new Error(`Reserved broadcast unit slug: ${slug}`)
}

function sortUnits(units: BroadcastUnitContent[]) {
  return [...units].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

export function listUnits(kind?: BroadcastUnitKind) {
  const units = kind ? parsed.filter(unit => unit.kind === kind) : parsed
  return sortUnits(units.filter(unit => unit.published))
}

export function getUnit(slug: string) {
  return parsed.find(unit => unit.slug === slug && unit.published)
}

export function listPublished() {
  return sortUnits(parsed.filter(unit => unit.published))
}

export function groupUnitItems(unit: BroadcastUnitContent) {
  const groups = new Map<string, BroadcastUnitContent['items']>()
  for (const item of [...unit.items].sort((a, b) => a.order - b.order)) {
    const current = groups.get(item.group) ?? []
    current.push(item)
    groups.set(item.group, current)
  }

  return equipmentGroupOrder
    .filter(group => groups.has(group))
    .map(group => ({ group, items: groups.get(group) ?? [] }))
}

export function comparisonFacts(unit: BroadcastUnitContent) {
  const specs = unit.specs
  const vision = specs.visionMixer ?? specs.visionMixers?.[0]
  return [
    { label: 'Format', value: specs.format },
    { label: 'Cameras', value: specs.cameraChains ? String(specs.cameraChains) : undefined },
    { label: 'Vision', value: vision },
    { label: 'Routing', value: specs.routing },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))
}
