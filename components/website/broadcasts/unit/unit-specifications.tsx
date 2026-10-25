import { bodyCopyClassName, displayTitleClassName, eyebrowClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

interface UnitSpecificationsProps {
  specs: Record<string, unknown>
}

const specLabels: Record<string, string> = {
  areaSqm: 'Area',
  cameraChains: 'Camera chains',
  cameraSystem: 'Camera system',
  visionMixer: 'Vision mixer',
  visionMixers: 'Vision mixers',
  audioMixer: 'Audio mixer',
  powerBackup: 'Power backup',
  broadcastReady: 'Broadcast ready',
  wirelessAudio: 'Wireless audio',
  useCases: 'Use cases',
}

function formatSpecValue(key: string, val: unknown): string {
  if (key === 'areaSqm' && typeof val === 'number') return `${val} m²`
  if (typeof val === 'boolean') return val ? 'Yes' : 'No'
  if (Array.isArray(val)) return val.filter(Boolean).join(', ')
  if (typeof val === 'object' && val !== null) return JSON.stringify(val)
  return String(val)
}

function formatSpecKey(key: string) {
  if (specLabels[key]) return specLabels[key]
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

export function UnitSpecifications({ specs }: UnitSpecificationsProps) {
  const entries = Object.entries(specs).filter(([, value]) => {
    if (value == null || value === '') return false
    if (Array.isArray(value)) return value.length > 0
    return true
  })

  if (entries.length === 0) return null

  return (
    <section>
      <p className={eyebrowClassName}>
        <span className="bg-primary h-px w-8" aria-hidden />
        Technical
      </p>
      <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Specifications</h2>
      <p className={cn(bodyCopyClassName, 'mt-4 max-w-2xl text-base')}>The numbers that decide if this unit fits the show.</p>
      <dl className="border-border mt-12 border-t">
        {entries.map(([key, value]) => (
          <div key={key} className="border-border grid grid-cols-1 gap-2 border-b py-5 sm:grid-cols-12 sm:gap-8">
            <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase sm:col-span-4">
              {formatSpecKey(key)}
            </dt>
            <dd className="text-sm font-light sm:col-span-8">{formatSpecValue(key, value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
