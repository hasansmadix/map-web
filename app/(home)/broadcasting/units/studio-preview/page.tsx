import type { Metadata } from 'next'
import { StudioPreview } from '@/components/website/broadcasts/unit/studio-preview/studio-preview'

export const metadata: Metadata = {
  title: { absolute: 'Studio 1 preview | MAP' },
  robots: { index: false, follow: false },
}

export default function StudioPreviewPage() {
  return <StudioPreview />
}
