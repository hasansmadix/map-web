'use client';

import { useFormContext } from 'react-hook-form';
import { fieldLabelClassName } from '@/components/shared/input/field-styles';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

export function CustomScriptsSection() {
  const { watch, setValue } = useFormContext();
  const headerScripts = watch('customScripts.header') || [];
  const footerScripts = watch('customScripts.footer') || [];
  const [newHeaderScript, setNewHeaderScript] = useState('');
  const [newFooterScript, setNewFooterScript] = useState('');

  const addHeaderScript = () => {
    if (newHeaderScript.trim()) {
      setValue('customScripts.header', [...headerScripts, newHeaderScript.trim()], { shouldDirty: true });
      setNewHeaderScript('');
    }
  };

  const removeHeaderScript = (index: number) => {
    setValue(
      'customScripts.header',
      headerScripts.filter((_: string, i: number) => i !== index),
      { shouldDirty: true },
    );
  };

  const addFooterScript = () => {
    if (newFooterScript.trim()) {
      setValue('customScripts.footer', [...footerScripts, newFooterScript.trim()], { shouldDirty: true });
      setNewFooterScript('');
    }
  };

  const removeFooterScript = (index: number) => {
    setValue(
      'customScripts.footer',
      footerScripts.filter((_: string, i: number) => i !== index),
      { shouldDirty: true },
    );
  };

  return (
    <div className="space-y-6">
          <div className="space-y-2">
            <p className={fieldLabelClassName}>Header</p>
            <div className="mt-2 flex gap-2">
              <Textarea
                value={newHeaderScript}
                onChange={e => setNewHeaderScript(e.target.value)}
                placeholder="<script>console.log('Header script')</script>"
                rows={2}
                className="flex-1"
              />
              <Button type="button" onClick={addHeaderScript} variant="outline">
                <Check className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {headerScripts.map((script: string, index: number) => (
                <div key={index} className="flex items-center justify-between rounded border p-2">
                  <code className="text-xs">{script}</code>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeHeaderScript(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className={fieldLabelClassName}>Footer</p>
            <div className="mt-2 flex gap-2">
              <Textarea
                value={newFooterScript}
                onChange={e => setNewFooterScript(e.target.value)}
                placeholder="<script>console.log('Footer script')</script>"
                rows={2}
                className="flex-1"
              />
              <Button type="button" onClick={addFooterScript} variant="outline">
                <Check className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {footerScripts.map((script: string, index: number) => (
                <div key={index} className="flex items-center justify-between rounded border p-2">
                  <code className="text-xs">{script}</code>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeFooterScript(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
    </div>
  );
}
