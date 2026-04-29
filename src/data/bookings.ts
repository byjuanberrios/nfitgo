import { Booking, WalletTransaction } from "@/types";
import { classes } from "./classes";

export const bookings: Booking[] = [
  {
    id: 1,
    cls: classes[0], // CrossFit
    bookedDate: "2026-05-02",
    time: "19:00",
    status: "upcoming",
  },
  {
    id: 2,
    cls: classes[1], // Entrenamiento Funcional
    bookedDate: "2026-05-05",
    time: "18:00",
    status: "upcoming",
  },
  {
    id: 3,
    cls: classes[2], // HYBRID
    bookedDate: "2026-05-07",
    time: "18:00",
    status: "upcoming",
  },
  {
    id: 4,
    cls: classes[0], // CrossFit
    bookedDate: "2026-04-21",
    time: "19:00",
    status: "past",
  },
  {
    id: 5,
    cls: classes[6], // Crosstraining
    bookedDate: "2026-04-23",
    time: "17:30",
    status: "past",
  },
  {
    id: 6,
    cls: classes[2], // HYBRID
    bookedDate: "2026-04-21",
    time: "18:00",
    status: "past",
  },
];

export const walletTransactions: WalletTransaction[] = [
  {
    id: 1,
    className: "HYBRID",
    bookingDate: "20/04/2026",
    amount: 14000,
    returnDate: "30/04/2026",
    status: "pending",
  },
  {
    id: 2,
    className: "Crosstraining",
    bookingDate: "13/03/2026",
    amount: 16000,
    returnDate: "21/03/2026",
    status: "reversed",
  },
  {
    id: 3,
    className: "CrossFit",
    bookingDate: "10/02/2026",
    amount: 12000,
    returnDate: "18/02/2026",
    status: "reversed",
  },
];

export const walletBalance = {
  ready: 26000,
  total: 40000,
  pending: 14000,
};
