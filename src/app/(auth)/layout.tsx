import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-8 bg-linear-to-b from-surface-soft via-surface-dark to-surface-dark">
      {children}
    </div>
  );
}
