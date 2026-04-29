"use client";

import { useState } from "react";
import { LayoutGrid, Info } from "lucide-react";
import BookingCard from "@/components/shared/BookingCard";
import { bookings } from "@/lib/bookings";

import { BookingStatus } from "@/types";

export default function ReservasPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");

  const filtered = bookings.filter((b) => b.status === activeTab);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2.5 text-xl font-semibold">
          <LayoutGrid className="text-brand-secondary size-5" />
          <span>Reservas</span>
        </h1>
        <div className="flex items-center bg-surface-dark p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium tracking-tight transition-colors cursor-pointer ${
              activeTab === "upcoming" ? "bg-surface-soft" : "bg-transparent"
            }`}
          >
            Próximas
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium tracking-tight transition-colors cursor-pointer ${
              activeTab === "past" ? "bg-surface-soft" : "bg-transparent"
            }`}
          >
            Anteriores
          </button>
        </div>
      </div>

      {activeTab === "past" && (
        <div className="bg-surface-dark rounded-xl px-5 py-4 flex flex-col gap-1">
          <p className="text-sm font-semibold text-brand-secondary flex items-center gap-2">
            <Info size={15} />
            Ten en cuenta
          </p>
          <p className="text-sm text-white/70">
            Solo se muestran las últimas 15 reservas anteriores si es que
            hubiesen.
          </p>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-white/50 text-sm">
          No tienes reservas en esta sección.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              showTags={activeTab === "upcoming"}
              isPast={activeTab === "past"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
