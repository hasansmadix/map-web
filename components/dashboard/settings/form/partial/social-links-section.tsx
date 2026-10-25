'use client';

import { useFormContext } from 'react-hook-form';
import { fieldLabelClassName } from '@/components/shared/input/field-styles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export function SocialLinksSection() {
  const { watch, setValue } = useFormContext();
  const social = watch('social') || [];
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '', label: '' });

  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url && newSocialLink.label) {
      setValue('social', [...social, { ...newSocialLink }], { shouldDirty: true });
      setNewSocialLink({ platform: '', url: '', label: '' });
    }
  };

  const removeSocialLink = (index: number) => {
    setValue(
      'social',
      social.filter((_: unknown, i: number) => i !== index),
      { shouldDirty: true },
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.4fr_1fr_auto] md:items-end">
        <div className="space-y-2">
          <p className={fieldLabelClassName}>Platform</p>
          <Input
            value={newSocialLink.platform}
            onChange={e => setNewSocialLink(prev => ({ ...prev, platform: e.target.value }))}
            placeholder="Instagram"
          />
        </div>
        <div className="space-y-2">
          <p className={fieldLabelClassName}>URL</p>
          <Input
            value={newSocialLink.url}
            onChange={e => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://instagram.com/map"
          />
        </div>
        <div className="space-y-2">
          <p className={fieldLabelClassName}>Label</p>
          <Input
            value={newSocialLink.label}
            onChange={e => setNewSocialLink(prev => ({ ...prev, label: e.target.value }))}
            placeholder="Instagram"
          />
        </div>
        <Button type="button" onClick={addSocialLink} variant="outline">
          <Plus className="size-4" />
          Add
        </Button>
      </div>
      {social.length === 0 ? <p className="text-muted-foreground text-sm font-light">No profiles yet.</p> : null}
      <div className="space-y-2">
        {social.map((link: { platform: string; label: string; url: string }, index: number) => (
          <div key={`${link.platform}-${index}`} className="border-border flex items-center justify-between gap-3 border px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">{link.label || link.platform}</p>
              <p className="text-muted-foreground truncate text-xs">{link.url}</p>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => removeSocialLink(index)} aria-label="Remove profile">
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
