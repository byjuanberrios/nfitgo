import * as React from "react";

// ───────────────────────────────────────────────
// Base
// ───────────────────────────────────────────────

export interface IconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

// ───────────────────────────────────────────────
// Domain entities (backend-facing)
// ───────────────────────────────────────────────

export interface SportCenterItem {
  id: string;
  name: string;
  logo: string;
  bannerImage: string;
  address: string;
  commune: string;
  region: string;
  email?: string;
  categories: string[];
  socials?: {
    website?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface CategoryItem {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export interface ClassSchedule {
  id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  spots: number;
}

export interface ClassItem {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  date: string;
  duration: number;
  price: number;
  availableSpots: number;
  sportCenter: {
    name: string;
    image: string;
    address: string;
    commune: string;
    region: string;
    id: string;
  };
  coach?: string;
  schedules?: ClassSchedule[];
  hasDiscount?: boolean;
}

export type BookingStatus = "upcoming" | "past";

export interface Booking {
  id: number;
  cls: ClassItem;
  bookedDate: string; // YYYY-MM-DD
  time: string;       // HH:MM
  status: BookingStatus;
}

export type TransactionStatus = "pending" | "reversed";

export interface WalletTransaction {
  id: number;
  className: string;
  bookingDate: string;
  amount: number;
  returnDate: string;
  status: TransactionStatus;
}

export interface HeaderUser {
  name: string;
  avatar?: string;
}

// ───────────────────────────────────────────────
// Shared component / UI types
// ───────────────────────────────────────────────

export type Billing = "anual" | "mensual";

export interface PlanItem {
  id: string;
  name: string;
  features: string[];
  priceAnual: number;
  priceMensual: number;
}

export interface OnboardingActivity {
  id: string;
  label: string;
  Icon: React.ComponentType<IconProps>;
}

export interface AuthContextType {
  user: HeaderUser | null;
  isLoading: boolean;
  login: (user: HeaderUser) => void;
  logout: () => void;
}

// ───────────────────────────────────────────────
// Component props
// ───────────────────────────────────────────────

export interface ClassCardProps {
  cls: ClassItem;
  className?: string;
  href?: string;
}

export interface BookingCardProps {
  booking: Booking;
  showTags?: boolean;
  isPast?: boolean;
  className?: string;
}

export interface CategoryButtonProps {
  category: CategoryItem;
  isActive?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
  href?: string;
}

export interface ExploreFiltersProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export interface SchedulePickerProps {
  schedules: ClassSchedule[];
  selected?: number;
  onSelect?: (id: number) => void;
}

export interface CheckoutFormProps {
  total: number;
  classId: number;
  scheduleId: number;
}

export interface CheckoutMobileSheetProps {
  total: number;
  classId: number;
  scheduleId: number;
}

export interface HeaderWrapperProps {
  variant?: "transparent" | "solid";
}

export interface OnboardingStepperProps {
  currentStep: number;
}
