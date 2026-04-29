import { Star } from "lucide-react";
import ClassCard from "@/components/shared/ClassCard";
import ExploreFilters from "@/components/ExploreFilters";
import { getClasses, getCategories } from "@/services";

const PAGE_SIZE = 8;

interface ExplorePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const categoryParam = params?.category;

  const [clsData, cats] = await Promise.all([getClasses(), getCategories()]);

  const selectedCategory = categoryParam ? parseInt(categoryParam, 10) : null;

  const filtered =
    selectedCategory === null
      ? clsData
      : clsData.filter((cls) => {
          const cat = cats.find((c) => c.id === selectedCategory);
          return cat
            ? cls.category.toLowerCase() === cat.name.toLowerCase()
            : true;
        });

  const visible = filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE;

  return (
    <div className="pt-20 lg:pt-24 px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] pb-16">
      <div className="flex gap-6 lg:gap-8 items-start mt-6 lg:mt-8">
        <ExploreFilters selectedCategory={selectedCategory} />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-6 lg:mb-7">
            <Star className="text-brand-secondary size-4 lg:size-5" />
            <h2 className="font-semibold text-lg lg:text-xl">
              Clases para hoy
            </h2>
          </div>

          {/* Class grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-4">
            {visible.map((cls) => (
              <ClassCard key={cls.id} cls={cls} href={`/class/${cls.id}`} />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <a
                href="#"
                className="bg-brand-primary text-black hover:bg-brand-primary/90 py-2.5 px-6 rounded-lg text-sm font-semibold transition-colors cursor-pointer inline-block"
              >
                Cargar más
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
