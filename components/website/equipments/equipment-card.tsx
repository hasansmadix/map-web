import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { capitalizeEachWord } from '@/utils/format';
import type { IEquipment } from '@/types/equipments/equipment.type';

interface EquipmentCardProps {
  equipment: IEquipment;
  priority?: boolean;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&auto=format&fit=crop';

export function EquipmentCard({ equipment, priority = false }: EquipmentCardProps) {
  const href = `/equipments/${equipment.slug}`;
  const coverImage = equipment.coverPath || FALLBACK_IMAGE;
  const eyebrow = [equipment.brand?.name, equipment.category?.name].filter(Boolean).join(' · ');

  const isUnoptimized =
    coverImage.includes('unsplash.com') || coverImage.includes('supabase.co') || coverImage.startsWith('http');

  return (
    <article className="group border-border bg-card hover:bg-muted flex h-full flex-col border transition-colors">
      <Link href={href} className="flex h-full flex-col">
        <div className="bg-muted relative aspect-[16/10] overflow-hidden">
          <Image
            src={coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
            priority={priority}
            unoptimized={isUnoptimized}
          />
          {equipment.isFeatured ? (
            <span className="bg-primary text-primary-foreground absolute top-3 left-3 px-2 py-1 text-[10px] font-medium tracking-[0.14em] uppercase">
              Featured
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          {eyebrow ? (
            <p className="text-muted-foreground truncate text-[11px] font-medium tracking-[0.16em] uppercase">{eyebrow}</p>
          ) : null}
          <h2 className="line-clamp-2 text-lg font-medium tracking-tight">{equipment.name}</h2>
          {equipment.summary ? (
            <p className="text-muted-foreground line-clamp-2 text-sm font-light">{equipment.summary}</p>
          ) : null}
          <p className="text-muted-foreground group-hover:text-primary mt-auto flex items-center gap-2 pt-4 text-[11px] font-medium tracking-[0.16em] uppercase">
            {equipment.equipmentType ? capitalizeEachWord(equipment.equipmentType) : 'View'}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </p>
        </div>
      </Link>
    </article>
  );
}
