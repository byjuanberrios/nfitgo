import {
  bookings,
  walletTransactions,
  walletBalance,
} from "@/data/bookings";
import type { Booking, BookingStatus, WalletTransaction, WalletBalance } from "@/types";

export async function getBookings(status?: BookingStatus): Promise<Booking[]> {
  if (!status) return bookings;
  return bookings.filter((b) => b.status === status);
}

export async function getUpcomingBookings(): Promise<Booking[]> {
  return getBookings("upcoming");
}

export async function getPastBookings(): Promise<Booking[]> {
  return getBookings("past");
}

export async function getBookingById(id: number): Promise<Booking | null> {
  return bookings.find((b) => b.id === id) ?? null;
}

export async function getWalletTransactions(): Promise<WalletTransaction[]> {
  return walletTransactions;
}

export async function getWalletBalance(): Promise<WalletBalance> {
  return walletBalance;
}
