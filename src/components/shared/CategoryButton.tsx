import { CategoryItem } from "@/types";
import Link from "next/link";

interface CategoryButtonProps {
  category: CategoryItem;
  isActive?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
  href?: string;
}

const CategoryButton = ({
  category,
  isActive = false,
  onClick,
  size = "md",
  className = "",
  href,
}: CategoryButtonProps) => {
  const sm = size === "sm";

  const baseClasses = `grid place-items-center rounded-xl border-[0.5px] transition ease-in-out duration-200 cursor-pointer
    ${sm ? "gap-1.5 py-3 px-1" : "gap-2.5 md:gap-3 px-1 py-4 md:py-6"}
    ${
      isActive
        ? "border-brand-primary bg-brand-primary/10"
        : "border-dark-muted bg-surface-soft hover:border-brand-primary/60"
    }
    ${className}`;

  const content = (
    <>
      <category.icon className={sm ? "w-8 h-8" : "w-10 h-10 md:w-12 md:h-12"} />
      <span
        className={`font-semibold text-center leading-tight ${
          sm ? "text-[10px]" : "text-xs md:text-sm"
        }`}
      >
        {category.name}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};

export default CategoryButton;
