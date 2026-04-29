"use client";

import { useState } from "react";
import { ClassSchedule } from "@/types";
import { formatScheduleDate } from "@/lib/dateUtils";

type Props = {
  schedules: ClassSchedule[];
  selected?: number;
  onSelect?: (id: number) => void;
};

export default function SchedulePicker({ schedules, selected: controlledSelected, onSelect }: Props) {
  const [internalSelected, setInternalSelected] = useState<number>(schedules[0]?.id ?? -1);

  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;

  const handleSelect = (id: number) => {
    if (!isControlled) setInternalSelected(id);
    onSelect?.(id);
  };

  return (
    <div className="grid gap-2 overflow-y-scroll max-h-64 pb-3 relative scrollbar-hide">
      {schedules.map((s) => {
        const isSelected = s.id === selected;
        return (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-colors bg-surface-soft cursor-pointer ${
              isSelected
                ? "border-brand-primary"
                : "border-gray-500 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">
                  {formatScheduleDate(s.date)}
                </p>
                <p className="font-bold text-base">{s.time} hrs</p>
              </div>
              <span className="text-xs shrink-0">
                {s.spots} {s.spots === 1 ? "cupo restante" : "cupos restantes"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
