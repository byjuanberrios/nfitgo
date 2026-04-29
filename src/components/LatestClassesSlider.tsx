"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/shared/Button";
import ClassCard from "@/components/shared/ClassCard";
import { Star } from "lucide-react";
import type { ClassItem } from "@/types";

type Props = { classes: ClassItem[] };

const LatestClassesSlider = ({ classes }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(classes.length);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateDotCount = () => {
      const slideWidth = container.scrollWidth / classes.length;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const reachable = Math.round(maxScrollLeft / slideWidth) + 1;
      setTotalDots(Math.min(reachable, classes.length));
    };

    updateDotCount();
    const ro = new ResizeObserver(updateDotCount);
    ro.observe(container);
    return () => ro.disconnect();
  }, [classes.length]);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.scrollWidth / classes.length;
    container.scrollTo({ left: slideWidth * index, behavior: "smooth" });
  };

  return (
    <section className="py-10 lg:py-14">
      <header className="flex items-center justify-between px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] mb-7 lg:mb-8">
        <div className="flex items-center gap-2">
          <Star className="text-brand-secondary size-4 lg:size-5" />
          <h3 className="font-semibold text-lg lg:text-xl">Últimas clases</h3>
        </div>
        <Button link="/explore" text="Todas las clases" />
      </header>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={() => {
            const container = scrollRef.current;
            if (!container) return;
            const slideWidth = container.scrollWidth / classes.length;
            const index = Math.round(container.scrollLeft / slideWidth);
            setCurrentIndex(index);
          }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        >
          {classes.map((cls, index) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              href={`/clase/${cls.id}`}
              className={`shrink-0 w-60 lg:w-68 snap-center ${
                index === 0
                  ? "ml-4 md:ml-10 lg:ml-12 xl:ml-22 2xl:ml-[12vw]"
                  : ""
              } ${
                index === classes.length - 1
                  ? "mr-4 md:mr-10 lg:mr-12 xl:mr-22 2xl:mr-[12vw]"
                  : ""
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2 pt-4 justify-start px-5 md:px-11 lg:px-13 xl:px-23 2xl:px-[12.1vw]">
          {Array.from({ length: totalDots }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "w-6 bg-brand-primary"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestClassesSlider;
