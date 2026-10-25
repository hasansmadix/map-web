'use client';

import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface EquipmentGalleryProps {
  images: string[];
  equipmentName: string;
  className?: string;
}

export function EquipmentGallery({ images, equipmentName, className }: EquipmentGalleryProps) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const count = images.length;
  const current = images[index];

  useEffect(() => {
    if (!isOpen || count < 2) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') setIndex(value => (value + 1) % count);
      if (event.key === 'ArrowLeft') setIndex(value => (value - 1 + count) % count);
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, count]);

  if (count === 0 || !current) return null;

  function show(next: number) {
    setIndex((next + count) % count);
  }

  function openAt(imageIndex: number) {
    setIndex(imageIndex);
    setIsOpen(true);
  }

  return (
    <div className={className}>
      <div className={cn('grid gap-3', frameGridClass(count))}>
        {images.map((image, imageIndex) => (
          <button
            key={`${image}-${imageIndex}`}
            type="button"
            onClick={() => openAt(imageIndex)}
            aria-label={`View photo ${imageIndex + 1} of ${count}`}
            className="border-border bg-muted hover:border-foreground/40 relative aspect-square cursor-zoom-in overflow-hidden border transition-colors"
          >
            <Image
              src={image}
              alt={imageIndex === 0 ? equipmentName : ''}
              fill
              sizes="(min-width: 1280px) 24rem, (min-width: 640px) 33vw, 50vw"
              className="object-contain"
              priority={imageIndex === 0}
              unoptimized={isRemote(image)}
            />
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-foreground text-white flex h-[100dvh] max-h-none w-full max-w-none flex-col gap-0 rounded-none border-0 p-4 shadow-none sm:max-w-none sm:p-8 [&_[data-slot=dialog-close]]:text-white">
          <DialogTitle className="sr-only">{equipmentName}</DialogTitle>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <div className="relative aspect-square w-full max-w-[min(80vw,70vh)]">
              <Image
                src={current}
                alt={equipmentName}
                fill
                sizes="80vw"
                className="object-contain"
                unoptimized={isRemote(current)}
              />
            </div>
          </div>
          {count > 1 ? (
            <div className="mx-auto mt-4 flex w-full max-w-3xl items-center gap-3">
              <GalleryStep label="Previous photo" onClick={() => show(index - 1)} onDark>
                <ChevronLeft className="size-4" />
              </GalleryStep>
              <div className="flex flex-1 gap-2 overflow-x-auto">
                {images.map((image, imageIndex) => (
                  <button
                    key={`viewer-${image}-${imageIndex}`}
                    type="button"
                    aria-label={`Photo ${imageIndex + 1} of ${count}`}
                    onClick={() => setIndex(imageIndex)}
                    className={cn(
                      'relative aspect-square w-14 shrink-0 overflow-hidden border',
                      imageIndex === index ? 'border-white' : 'border-white/20',
                    )}
                  >
                    <Image src={image} alt="" fill sizes="56px" className="object-contain" unoptimized={isRemote(image)} />
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-medium tracking-[0.14em] text-white/70">
                {index + 1} / {count}
              </span>
              <GalleryStep label="Next photo" onClick={() => show(index + 1)} onDark>
                <ChevronRight className="size-4" />
              </GalleryStep>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function frameGridClass(count: number) {
  if (count === 1) return 'max-w-xl';
  if (count === 2) return 'grid-cols-2';
  if (count === 4) return 'grid-cols-2';
  return 'grid-cols-2 lg:grid-cols-3';
}

function GalleryStep({
  label,
  onClick,
  onDark = false,
  children,
}: {
  label: string;
  onClick: () => void;
  onDark?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex size-9 items-center justify-center border transition-colors',
        onDark
          ? 'border-white/30 text-white hover:bg-white/10'
          : 'border-border bg-background/90 text-foreground hover:border-foreground',
      )}
    >
      {children}
    </button>
  );
}

function isRemote(src: string) {
  return src.includes('supabase.co') || src.includes('unsplash.com') || src.startsWith('http');
}
