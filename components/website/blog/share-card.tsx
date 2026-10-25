'use client';

import { useState } from 'react';

interface ShareCardProps {
  articleName: string;
  articleSlug: string;
}

export function ShareCard({ articleName }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = articleName;

    if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        '_blank',
      );
      return;
    }

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      return;
    }

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    }
  };

  return (
    <div className="border-border mt-8 border-t pt-6">
      <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">Share</p>
      <ul className="mt-4 flex flex-col items-start gap-2">
        {SHARE_LINKS.map(link => (
          <li key={link.platform}>
            <button
              type="button"
              onClick={() => handleShare(link.platform)}
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              {link.platform === 'copy' && copied ? 'Copied' : link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SHARE_LINKS: { platform: 'linkedin' | 'twitter' | 'facebook' | 'copy'; label: string }[] = [
  { platform: 'linkedin', label: 'LinkedIn' },
  { platform: 'twitter', label: 'X' },
  { platform: 'facebook', label: 'Facebook' },
  { platform: 'copy', label: 'Copy link' },
];
