'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import EquipmentsAutocomplete from '@/components/website/common/equipments-autocomplete';
import { FilterSelect } from '@/components/shared/FilterSelect';
import { EquipmentType } from '@/types/equipments/equipment.enum';
import type { IEquipmentCategory } from '@/types/equipments/equipment-category.type';
import type { IEquipmentBrand } from '@/types/equipments/equipment-brand.type';
import { X } from 'lucide-react';
import { useMemo } from 'react';

interface IntentEquipmentFiltersProps {
  categories: IEquipmentCategory[];
  brands: IEquipmentBrand[];
}

export function IntentEquipmentFilters({ categories, brands }: IntentEquipmentFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get('equipmentType') || 'all';
  const currentCategory = searchParams.get('category') || 'all';
  const currentBrand = searchParams.get('brand') || 'all';
  const currentSearch = searchParams.get('search') || '';

  const typeOptions = useMemo(
    () => [
      { value: 'all', label: 'All Types' },
      ...Object.values(EquipmentType).map(type => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
      })),
    ],
    [],
  );

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: 'All Categories' },
      ...categories.map(c => ({ value: c.slug, label: c.name })),
    ],
    [categories],
  );

  const brandOptions = useMemo(
    () => [
      { value: 'all', label: 'All Brands' },
      ...brands.map(b => ({ value: b.slug, label: b.name })),
    ],
    [brands],
  );

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (currentType && currentType !== 'all') count++;
    if (currentCategory && currentCategory !== 'all') count++;
    if (currentBrand && currentBrand !== 'all') count++;
    if (currentSearch.trim()) count++;
    return count;
  }, [currentType, currentCategory, currentBrand, currentSearch]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'all') params.delete(key);
      else params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
      <EquipmentsAutocomplete
        placeholder="Search the catalogue"
        value={currentSearch}
        onValueChange={value => updateParams({ search: value })}
        className="h-11 w-full rounded-none lg:w-72"
      />
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
        <FilterSelect
          placeholder="Category"
          value={currentCategory}
          onValueChange={value => updateParams({ category: value === 'all' ? '' : value })}
          options={categoryOptions}
          className="h-11 w-full rounded-none"
          aria-label="Category"
        />
        <FilterSelect
          placeholder="Type"
          value={currentType}
          onValueChange={value => updateParams({ equipmentType: value === 'all' ? '' : value })}
          options={typeOptions}
          className="h-11 w-full rounded-none"
          aria-label="Type"
        />
        <FilterSelect
          placeholder="Brand"
          value={currentBrand}
          onValueChange={value => updateParams({ brand: value === 'all' ? '' : value })}
          options={brandOptions}
          className="h-11 w-full rounded-none"
          aria-label="Brand"
        />
      </div>
      {activeFiltersCount > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground h-11 shrink-0 px-3 text-[11px] font-medium tracking-[0.14em] uppercase"
        >
          <X className="size-3.5" />
          Clear
        </Button>
      ) : null}
    </div>
  );
}
