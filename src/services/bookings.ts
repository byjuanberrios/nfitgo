import { bookings, walletTransactions, walletBalance } from "@/data/bookings";
import type { Booking, BookingStatus, WalletTransaction } from "@/types";

export interface WalletBalance {
  ready: number;
  total: number;
  pending: number;
}

export async function getBookings(status?: BookingStatus): Promise<Booking[]> {
  // TODO: replace with fetch(`/api/bookings${status ? `?status=${status}` : ""}`)
  if (!status) return bookings;
  return bookings.filter((b) => b.status === status);
}

export async function getBookingById(id: number): Promise<Booking | null> {
  // TODO: replace with fetch(`/api/bookings/${id}`)
  return bookings.find((b) => b.id === id) ?? null;
}

export async function getWalletTransactions(): Promise<WalletTransaction[]> {
  // TODO: replace with fetch("/api/wallet/transactions")
  return walletTransactions;
}

export async function getWalletBalance(): Promise<WalletBalance> {
  // TODO: replace with fetch("/api/wallet/balance")
  return walletBalance;
}
