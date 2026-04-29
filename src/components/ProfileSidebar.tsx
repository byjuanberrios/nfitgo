"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Wallet, CircleUser, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const sidebarLinks = [
  { label: "Tus Reservas", href: "/profile/reservas", icon: LayoutGrid },
  { label: "Wallet", href: "/profile/wallet", icon: Wallet },
  { label: "Cuenta", href: "/profile/cuenta", icon: CircleUser },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="w-full md:w-65 shrink-0 bg-surface-dark rounded-xl overflow-hidden">
      <nav className="flex justify-between lg:flex-col p-2.5 lg:p-3.5 gap-1 lg:gap-2">
        {sidebarLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex grow justify-center lg:justify-start lg:text-left mx-auto lg:mx-0 items-center gap-3 px-5 py-4 text-sm font-medium transition-colors rounded-lg ${
                isActive
                  ? "bg-tag-gray text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-brand-secondary" : "text-white/50"}
              />
              <span className="hidden lg:block">{label}</span>
            </Link>
          );
        })}

        <button
          className="flex grow justify-center lg:justify-start lg:text-left mx-auto lg:mx-0 items-center gap-3 px-5 py-4 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut size={18} className="text-white/50" />
          <span className="hidden lg:block">Cerrar sesión</span>
        </button>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
