import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Explorar clases", href: "/explore" },
  { label: "Inscribe tu centro", href: "/onboarding" },
];

const authLinks = [
  { label: "Ingresa", href: "/login" },
  { label: "Regístrate", href: "/registro" },
];

const Footer = () => {
  return (
    <footer className="bg-surface-dark">
      <div className="px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] py-12 lg:py-16 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4.5 lg:gap-6">
            <Image
              src="/logo.svg"
              alt="NFIT"
              width={36}
              height={20}
              className="w-22 lg:w-28"
            />
            <p className="font-extrabold text-base lg:text-lg uppercase leading-tight tracking-tight text-white max-w-[22ch]">
              Entrena donde quieras,
              <br />
              cuando quieras.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16 lg:gap-24">
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs lg:text-sm text-white/80 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              {authLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs lg:text-sm text-white/80 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-dark-muted/40 pt-6">
          <p className="text-xs lg:text-sm text-white/30">
            ©2026. NFITGO. NFIT, todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-white/60 hover:text-white transition-colors fill-brand-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-white/60 hover:text-white transition-colors stroke-brand-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
