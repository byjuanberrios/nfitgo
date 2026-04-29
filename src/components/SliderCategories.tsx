"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/services";
import type { CategoryItem } from "@/types";
import CategoryButton from "@/components/shared/CategoryButton";

const SliderCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cats, setCats] = useState<CategoryItem[]>([]);

  useEffect(() => {
    getCategories().then(setCats);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "right" ? 200 : -200,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative z-40 min-w-full box-border">
      <div className="w-full border border-dark-muted/50 bg-[rgba(34,38,46,0.50)] backdrop-blur-[11.9px] overflow-hidden pt-5.5 pb-4.5 rounded-xl">
        <header className="flex items-center px-4 md:px-6 mb-4 justify-between">
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-brand-secondary" />
            <h3 className="font-semibold md:text-lg">Explora por disciplina</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-soft transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-soft transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-1.5 md:gap-2.5 box-border"
        >
          {cats.map((c, i) => (
            <CategoryButton
              key={c.id}
              category={c}
              href={`/explore?category=${c.id}`}
              className={`shrink-0 w-24 md:w-30 ${i === 0 ? "ml-4 md:ml-6" : ""}`}
            />
          ))}
          <Link
            href="/explore"
            className="grid place-items-center gap-2.5 md:gap-3 px-1 py-4 md:py-6 bg-surface-soft shrink-0 w-24 md:w-30 border-[0.5] border-dark-muted hover:border-brand-primary rounded-xl transition ease-in-out duration-300 cursor-pointer mr-4 md:mr-6"
          >
            <span className="font-semibold text-xs md:text-sm">Ver todo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SliderCategories;
