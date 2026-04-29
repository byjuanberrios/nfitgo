"use client";

import { HeaderWrapperProps } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Header from "@/parts/Header";

export default function HeaderWrapper({ variant = "transparent" }: HeaderWrapperProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return <Header variant={variant} user={user ?? undefined} />;
}
