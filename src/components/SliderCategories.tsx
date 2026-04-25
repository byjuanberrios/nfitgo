import { Star } from "lucide-react";
import { categories } from "@/lib/categories";

const SliderCategories = () => {
  return (
    <div className="border border-dark-muted bg-[rgba(34,38,46,0.50)] backdrop-blur-[11.9px] overflow-hidden max-w-full pt-5 pb-4.5 rounded-xl">
      <header className="flex items-center px-4 mb-4 gap-1.5">
        <Star size={16} className="text-brand-secondary" />
        <h3 className="font-semibold md:text-lg">Explora por disciplina</h3>
      </header>
      <div className="flex flex-nowrap overflow-x-auto gap-1.5 md:gap-2.5">
        {categories.map((c) => (
          <div
            key={c.id}
            className="grid place-items-center gap-2.5 md:gap-3 px-1 py-4 md:py-6 bg-surface-soft shrink-0 w-24 md:w-30 border-[0.5] border-dark-muted hover:border-brand-primary rounded-xl first:ml-4 last:mr-4 transition ease-in-out duration-300 cursor-pointer"
          >
            <c.icon className="w-11 md:w-13 h-11 md:h-13" />
            <span className="font-semibold text-xs md:text-sm">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderCategories;
