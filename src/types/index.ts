import * as React from "react";

export interface IconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export type SportCenterItem = {
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
};

export type CategoryItem = {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<IconProps>;
};

export type ClassSchedule = {
  id: number;
  date: string;
  time: string;
  spots: number;
};

export type ClassItem = {
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
};

export type Booking = {
  id: number;
  cls: ClassItem;
  bookedDate: string; // YYYY-MM-DD
  time: string;       // HH:MM
  status: "upcoming" | "past";
};

export type WalletTransaction = {
  id: number;
  className: string;
  bookingDate: string;
  amount: number;
  returnDate: string;
  status: "pending" | "reversed";
};

export type HeaderUser = {
  name: string;
  avatar?: string;
};
