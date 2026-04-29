"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import CategoryButton from "@/components/shared/CategoryButton";
import { getCategories } from "@/services";
import type { CategoryItem, ExploreFiltersProps } from "@/types";

const FilterContent = ({
  selectedCategory,
  onSelectCategory,
  cats,
}: ExploreFiltersProps & { cats: CategoryItem[] }) => (
  <>
    {/* Category grid */}
    <div>
      <div className="grid grid-cols-3 gap-2">
        {cats.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const href = isActive ? "/explore" : `/explore?category=${cat.id}`;

          return (
            <CategoryButton
              key={cat.id}
              category={cat}
              size="sm"
              isActive={isActive}
              onClick={
                onSelectCategory
                  ? () => onSelectCategory(isActive ? null : cat.id)
                  : undefined
              }
              href={!onSelectCategory ? href : undefined}
            />
          );
        })}
      </div>
    </div>

    {/* Date filter */}
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="text-brand-secondary size-4" />
        <h3 className="font-semibold text-sm text-white/60 tracking-tighter">
          Fecha
        </h3>
      </div>
      <div className="relative">
        <select className="w-full appearance-none bg-surface-soft border-[0.5px] border-dark-muted rounded-lg px-3 py-2.5 text-sm text-white/80 cursor-pointer focus:outline-none focus:border-brand-primary/60 transition-colors">
          <option value="today">Para hoy</option>
          <option value="tomorrow">Mañana</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-white/40 pointer-events-none" />
      </div>
    </div>

    {/* Commune filter */}
    <div>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="text-brand-secondary size-4" />
        <h3 className="font-semibold text-sm text-white/60 tracking-tighter">
          Comuna / Zona
        </h3>
      </div>
      <div className="relative">
        <select className="w-full appearance-none bg-surface-soft border-[0.5px] border-dark-muted rounded-lg px-3 py-2.5 text-sm text-white/80 cursor-pointer focus:outline-none focus:border-brand-primary/60 transition-colors">
          <option value="">Todas</option>
          <option value="curico">Curicó</option>
          <option value="molina">Molina</option>
          <option value="talca">Talca</option>
          <option value="vina-del-mar">Viña del Mar</option>
          <option value="santiago">Santiago</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-white/40 pointer-events-none" />
      </div>
    </div>
  </>
);

const ExploreFilters = ({
  selectedCategory,
  onSelectCategory,
}: ExploreFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cats, setCats] = useState<CategoryItem[]>([]);

  useEffect(() => {
    getCategories().then(setCats);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeCount = selectedCategory !== null ? 1 : 0;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col gap-6 lg:gap-8 w-64 xl:w-72 shrink-0 sticky top-28 rounded-xl p-6 border-[0.5px] border-white/20">
        <FilterContent
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          cats={cats}
        />
      </aside>

      {/* Mobile FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-4 z-40 flex items-center gap-2 bg-brand-primary text-black font-semibold text-sm px-4 py-3 rounded-full shadow-lg active:scale-95 transition-transform"
      >
        <SlidersHorizontal className="size-5" />
        {activeCount > 0 && (
          <span className="bg-black/20 rounded-full size-5 flex items-center justify-center text-xs">
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Bottom sheet */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-60 bg-surface-dark rounded-t-2xl border-t border-white/10 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="font-semibold">Filtros</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-6 p-5 overflow-y-auto max-h-[70dvh] pb-10">
          <FilterContent
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            cats={cats}
          />
        </div>
      </div>
    </>
  );
};

export default ExploreFilters;
