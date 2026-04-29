"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, CircleUser } from "lucide-react";
import { HeaderUser } from "@/types";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Explorar clases", href: "/explore" },
  { label: "Inscribe tu centro", href: "/onboarding" },
];

const authLinks = [
  { label: "Ingresa", href: "/login" },
  { label: "Regístrate", href: "/registro" },
];

type HeaderProps = {
  variant?: "transparent" | "solid";
  user?: HeaderUser;
};

const Header = ({ variant = "transparent", user }: HeaderProps) => {
  const isSolid = variant === "solid";
  const [isOpen, setIsOpen] = useState(false);

  const mobileLinks = user
    ? [
        ...navLinks.slice(1),
        { label: "Mi perfil", href: "/profile/reservas" },
        { label: "Cerrar sesión", href: "/login" },
      ]
    : [...navLinks.slice(1), ...authLinks];

  return (
    <>
      <header
        className={`z-40 px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] w-full transition-colors ${
          isSolid
            ? "fixed bg-surface-dark border-b border-dark-muted/30 py-5 lg:py-6"
            : "absolute py-5 lg:py-6"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-12">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                className="w-26"
                width={115}
                height={36}
              />
            </Link>
            <div className="hidden md:flex gap-8">
              {navLinks.slice(1).map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {user ? (
            <Link
              href="/profile/reservas"
              className="hidden md:flex items-center gap-3 group"
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-white leading-tight">
                  {user.name}
                </p>
                <p className="text-xs text-gray-muted group-hover:text-white/70 transition-colors leading-tight mt-0.5">
                  Ir al perfil
                </p>
              </div>
              {user.avatar ? (
                <Image
                  src="/fake-avatar.png"
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full size-10 object-cover"
                />
              ) : (
                <div className="size-10 rounded-full bg-tag-gray flex items-center justify-center">
                  <CircleUser className="size-5 text-white/60" />
                </div>
              )}
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/login"
                className="text-white/80 hover:text-white transition-colors"
              >
                Ingresa
              </Link>
              <Link
                href="/registro"
                className="bg-brand-primary text-black hover:bg-brand-primary/90 py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
              >
                Regístrate
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-400 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute inset-0 flex flex-col px-6 py-7 transition-transform duration-400 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-16">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="w-22"
              width={115}
              height={36}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {mobileLinks.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: isOpen ? `${80 + i * 55}ms` : "0ms",
                }}
                className={`text-3xl font-semibold py-3 border-b border-white/10 transition-all duration-400 ease-out ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } ${
                  i === mobileLinks.length - 1
                    ? "text-brand-primary border-none mt-6"
                    : "text-white/90 hover:text-white hover:pl-2"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
