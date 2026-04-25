"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import Button from "@/components/shared/Button";
import Tag from "@/components/shared/Tag";
import SliderCategories from "./SliderCategories";
import { classes } from "@/lib/classes";

const FeaturedClassSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isHovered || !isMounted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === classes.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, isMounted]);

  const currentClass = classes[currentIndex];

  if (!isMounted) {
    return (
      <div className="min-h-dvh w-full max-w-full box-border grid content-end items-center relative px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] py-6 md:py-8">
        {/* Overlay */}
        <div className="absolute inset-0 z-20 bg-linear-to-r from-black/90 via-black/50 to-black/0 md:bg-linear-to-tr" />

        {/* Categories */}
        <div className="relative z-40 max-w-full box-border">
          <SliderCategories />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh w-full max-w-full box-border grid content-end items-center relative px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] py-6 md:py-8">
      {/* Slides */}
      {classes.map((cls, index) => (
        <div
          key={cls.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${cls.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-linear-to-r from-black/90 via-black/50 to-black/0 md:bg-linear-to-tr w-full" />

      {/* Class info */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-40 flex flex-col self-end gap-2.5 box-border max-w-full mb-[10vh] md:mb-[15vh]"
      >
        <div className="flex items-center gap-2">
          {currentClass.tags.map((tag, idx) => (
            <Tag key={idx} tag={tag} />
          ))}
        </div>
        <div className="flex flex-col gap-2 mb-1.5">
          <h2 className="font-semibold text-white text-3xl md:text-4xl">
            {currentClass.name}
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-[34ch] md:max-w-[42ch]">
            {currentClass.description}
          </p>
          <div className="flex gap-1.5 text-white/60 text-sm items-center">
            <MapPin size={16} className="text-brand-secondary" />
            <span>
              {currentClass.sportCentar} - {currentClass.commune}
            </span>
          </div>
        </div>
        <div>
          <Button link="/workout" text="Ver clase" />
        </div>
        {/* Pagination */}
        <div className="flex gap-2 pt-5">
          {classes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
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

      {/* Categories */}
      <SliderCategories />
    </div>
  );
};

export default FeaturedClassSlider;
