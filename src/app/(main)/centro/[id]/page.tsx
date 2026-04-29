import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Mail, ExternalLink, Star } from "lucide-react";
import { getSportCenters, getSportCenterById, getClassesBySportCenter } from "@/services";
import Tag from "@/components/shared/Tag";
import ClassCard from "@/components/shared/ClassCard";

export async function generateStaticParams() {
  const sportCenters = await getSportCenters();
  return sportCenters.map((sc) => ({ id: sc.id }));
}

export default async function SportCenterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [sc, scClasses] = await Promise.all([
    getSportCenterById(id),
    getClassesBySportCenter(id),
  ]);
  if (!sc) notFound();

  const socialLinks = [
    { label: "Sitio Web", href: sc.socials?.website },
    { label: "Instagram", href: sc.socials?.instagram },
    { label: "Tik Tok", href: sc.socials?.tiktok },
  ].filter((s) => s.href);

  return (
    <div>
      {/* Hero banner */}
      <div className="mt-18 lg:mt-20 relative w-full h-[38vh] min-h-55 lg:h-[52vh]">
        <Image
          src={sc.bannerImage}
          alt={sc.name}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface-soft via-surface-soft/60 to-surface-soft/10" />
      </div>

      {/* Page content */}
      <div className="relative z-10 -mt-20 lg:-mt-28">
        <div className="px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] pb-16 lg:pb-24 grid gap-10 lg:gap-14">
          {/* Sport center info card */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Left: logo + name + meta */}
            <div className="flex items-start gap-4 lg:gap-5">
              <div className="shrink-0 size-20 lg:size-24 bg-surface-dark rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                <Image
                  src={sc.logo}
                  alt={sc.name}
                  width={96}
                  height={96}
                  className="object-cover object-center size-full"
                />
              </div>
              <div className="grid gap-1.5 pt-1">
                <h1 className="text-2xl lg:text-3xl font-semibold leading-tight">
                  {sc.name}
                </h1>
                <p className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-muted">
                  <MapPin className="size-3.5 shrink-0 text-brand-secondary" />
                  {sc.address}, {sc.commune}, {sc.region}
                </p>
                {sc.email && (
                  <p className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-muted">
                    <Mail className="size-3.5 shrink-0 text-brand-secondary" />
                    {sc.email}
                  </p>
                )}
              </div>
            </div>

            {/* Right: categories + social links */}
            <div className="flex flex-col items-start sm:items-end gap-3 lg:gap-4">
              {sc.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 lg:gap-2 justify-start sm:justify-end">
                  {sc.categories.map((cat) => (
                    <Tag key={cat} tag={cat} color="brand-primary" />
                  ))}
                </div>
              )}
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 lg:gap-2 text-xs text-white/70 hover:text-white border border-dark-muted/60 hover:border-white/30 rounded-full px-3 py-1.5 transition-colors"
                    >
                      <ExternalLink className="size-3 shrink-0" />
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Classes section */}
          {scClasses.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6 lg:mb-7">
                <Star className="text-brand-secondary size-4 lg:size-5" />
                <h2 className="font-semibold text-lg lg:text-xl">
                  Clases disponibles
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-4 pb-2 -mx-4 px-4 md:-mx-10 md:px-10 lg:-mx-12 lg:px-12 xl:-mx-22 xl:px-22 2xl:mx-[-12vw] 2xl:px-[12vw]">
                {scClasses.map((cls) => (
                  <ClassCard key={cls.id} cls={cls} href={`/clase/${cls.id}`} />
                ))}
              </div>
            </section>
          )}

          {scClasses.length === 0 && (
            <section>
              <h2 className="text-xl lg:text-2xl font-bold mb-4 flex items-center gap-2.5">
                <Star className="size-5 text-brand-secondary fill-brand-secondary shrink-0" />
                Clases disponibles
              </h2>
              <p className="text-gray-muted text-sm">
                Este centro aún no tiene clases publicadas.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
