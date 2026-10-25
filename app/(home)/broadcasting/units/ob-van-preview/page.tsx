import type { Metadata } from 'next'
import { ObVanPreview } from '@/components/website/broadcasts/unit/ob-van-preview/ob-van-preview'

export const metadata: Metadata = {
  title: { absolute: 'OB Van preview | MAP' },
  robots: { index: false, follow: false },
}

export default function ObVanPreviewPage() {
  return <ObVanPreview />
}
