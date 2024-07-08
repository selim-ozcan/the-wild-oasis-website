import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings } from "@/app/_lib/apiSettings";
import { getBookedDatesByCabinId } from "@/app/_lib/apiBookings";
import { getMe } from "../_lib/apiAuth";
import LoginMessage from "./LoginMessage";
import { cookies } from "next/headers";

export default async function Reservation({ cabin }) {
  const cookie = cookies().get("Authentication");
  const user = await getMe(cookie);
  const [settings, bookedDates] = await Promise.all([
    getSettings(cookie),
    getBookedDatesByCabinId(cookie, cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {user ? <ReservationForm cabin={cabin} user={user} /> : <LoginMessage />}
    </div>
  );
}
