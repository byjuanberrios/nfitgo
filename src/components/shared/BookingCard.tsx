import Tag from "@/components/shared/Tag";
import { Clock, ClockFading, MapPin } from "lucide-react";
import { BookingCardProps } from "@/types";
import { formatDate } from "@/lib/dateUtils";

const BookingCard = ({
  booking,
  showTags = false,
  isPast = false,
  className = "",
}: BookingCardProps) => {
  const { cls, bookedDate, time } = booking;
  const { day, month } = formatDate(`${bookedDate}T12:00:00Z`);

  return (
    <div
      className={`overflow-hidden rounded-xl bg-surface-dark border-[0.5px] border-gray-muted/40 ${className}`}
    >
      <div
        className={`w-full aspect-video ${isPast ? "grayscale" : ""}`}
        style={{
          backgroundImage: `url(${cls.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="grid gap-3 px-4.5 py-4 lg:px-5 lg:py-4.5">
        <header className="flex items-center gap-2.5">
          {/* <div className="shrink-0 bg-brand-tertiary text-black font-semibold grid place-items-center rounded-lg w-11 h-11.5 pt-2"> */}
          <div
            className={`shrink-0 ${isPast ? "grayscale" : ""} bg-brand-tertiary text-black font-semibold grid place-items-center rounded-lg w-11 h-11.5 pt-2`}
          >
            <span className="text-xl leading-0">{day}</span>
            <span className="text-[10px] lg:text-xs leading-0 -mt-1">
              {month}
            </span>
          </div>
          <div className="grid min-w-0">
            <span className="font-semibold text-base lg:text-[17px] leading-tight truncate">
              {cls.name}
            </span>
            <span className="text-xs lg:text-sm text-gray-muted truncate">
              {cls.sportCenter.name}
            </span>
          </div>
        </header>

        {showTags && cls.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {cls.tags.map((tag, idx) => (
              <Tag key={idx} tag={tag} />
            ))}
          </div>
        )}

        <div className="grid gap-1.5 lg:gap-1">
          <div className="flex items-center text-xs lg:text-sm gap-2">
            <Clock
              className={`text-brand-secondary size-4 shrink-0 ${isPast ? "grayscale" : ""}`}
            />
            <span>{time} hrs</span>
          </div>
          <div className="flex items-center text-xs lg:text-sm gap-2">
            <ClockFading
              className={`text-brand-secondary size-4 shrink-0 ${isPast ? "grayscale" : ""}`}
            />
            <span>{cls.duration} min</span>
          </div>
          <div className="flex items-center text-xs lg:text-sm gap-2">
            <MapPin
              className={`text-brand-secondary size-4 shrink-0 ${isPast ? "grayscale" : ""}`}
            />
            <span>{cls.sportCenter.commune}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
