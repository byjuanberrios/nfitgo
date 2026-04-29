export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-surface-soft"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 65% 55% at -5% -5%, rgba(1, 85, 60, 0.72) 0%, transparent 65%)",
      }}
    >
      {children}
    </div>
  );
}
