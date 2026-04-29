import Link from "next/link";
import Tag from "@/components/shared/Tag";
import { ClockFading, MapPin, Users } from "lucide-react";
import { ClassCardProps } from "@/types";
import { formatDate } from "@/lib/dateUtils";

const ClassCard = ({ cls, className = "", href }: ClassCardProps) => {
  const { day, month } = formatDate(cls.date);

  const cardClassName = `overflow-hidden rounded-xl bg-surface-dark border-[0.5px] border-gray-muted/40 hover:border-brand-primary transition duration-200 ease-in-out cursor-pointer ${className}`;

  const inner = (
    <>
      <div
        className="w-full aspect-video p-3.5 relative flex items-start justify-between"
        style={{
          backgroundImage: `url(${cls.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Tag tag={cls.category} color="brand-primary" />
      </div>

      <div className="grid gap-3.5 px-4.5 py-4.5 lg:px-5 lg:py-5">
        <header className="flex items-center gap-2.5">
          <div className="shrink-0 bg-brand-tertiary text-black font-semibold grid place-items-center rounded-lg w-11 h-11.5 pt-2">
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

        {cls.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {cls.tags.map((tag, idx) => (
              <Tag key={idx} tag={tag} />
            ))}
          </div>
        )}

        <div className="grid gap-1.5 lg:gap-1">
          <div className="flex items-center text-xs lg:text-sm gap-2">
            <ClockFading className="text-brand-secondary size-4 shrink-0" />
            <span>{cls.duration} min</span>
          </div>
          <div className="flex items-center text-xs lg:text-sm gap-2">
            <MapPin className="text-brand-secondary size-4 shrink-0" />
            <span>{cls.sportCenter.commune}</span>
          </div>
          <div className="flex items-center text-xs lg:text-sm gap-2">
            <Users className="text-brand-secondary size-4 shrink-0" />
            <span>{cls.availableSpots} cupos disponibles</span>
          </div>
        </div>

        <p className="font-semibold text-xl lg:text-2xl">
          ${cls.price.toLocaleString("es-CL")}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`block ${cardClassName}`}>
        {inner}
      </Link>
    );
  }

  return <div className={cardClassName}>{inner}</div>;
};

export default ClassCard;
