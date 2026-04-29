"use client";

import { useAuth } from "@/context/AuthContext";
import Header from "@/parts/Header";

type HeaderWrapperProps = {
  variant?: "transparent" | "solid";
};

export default function HeaderWrapper({ variant = "transparent" }: HeaderWrapperProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return <Header variant={variant} user={user ?? undefined} />;
}
