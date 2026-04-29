"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login({
        name: email.split("@")[0],
      });
      setIsLoading(false);
      router.push("/profile/reservas");
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="border border-dark-muted/40 rounded-2xl bg-surface-dark/50 backdrop-blur-sm p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8 py-4">
          <Image
            src="/logo.svg"
            alt="NFITGO"
            width={80}
            height={24}
            className="w-28"
          />
        </div>

        {/* Google Button */}
        <button className="cursor-pointer w-full bg-surface-dark border border-dark-muted/40 hover:border-dark-muted/60 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3 mb-6">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm">Ingresar con Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-dark-muted/30" />
          <span className="text-xs text-gray-muted">O con tu email</span>
          <div className="flex-1 h-px bg-dark-muted/30" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs lg:text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-dark border border-dark-muted/30 hover:border-dark-muted/50 focus:border-brand-primary/50 text-white placeholder:text-gray-muted rounded-lg px-4 py-3 transition-colors focus:outline-none"
              placeholder="tu@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs lg:text-sm font-medium text-white mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-dark border border-dark-muted/30 hover:border-dark-muted/50 focus:border-brand-primary/50 text-white placeholder:text-gray-muted rounded-lg px-4 py-3 pr-10 transition-colors focus:outline-none"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-muted hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"} text-sm lg:text-base w-full bg-brand-primary hover:bg-brand-primary/90 disabled:bg-brand-primary/70 text-black font-semibold py-3 px-4 rounded-lg transition-colors mt-1`}
          >
            {isLoading ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-xs lg:text-sm">
          <span className="text-gray-muted">¿No tienes cuenta? </span>
          <Link
            href="/registro"
            className="text-brand-secondary hover:text-brand-secondary/80 font-semibold transition-colors"
          >
            Regístrate
          </Link>
        </div>

        {/* Legal */}
        <div className="text-center text-xs text-gray-muted mt-6 space-y-1">
          <p>
            Al continuar aceptas los{" "}
            <a href="#" className="hover:text-white transition-colors">
              términos de uso
            </a>{" "}
            | Política de privacidad
          </p>
        </div>
      </div>
    </div>
  );
}
