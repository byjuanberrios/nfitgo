import { getBookings } from "@/services";
import ReservasClient from "./ReservasClient";

export default async function ReservasPage() {
  const bookings = await getBookings();
  return <ReservasClient bookings={bookings} />;
}
