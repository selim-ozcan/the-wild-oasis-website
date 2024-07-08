import ReservationCard from "@/app/_components/ReservationCard";
import { getMe } from "@/app/_lib/apiAuth";
import { getBookingsByGuestEmail } from "@/app/_lib/apiBookings";
import { cookies } from "next/headers";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const cookie = cookies().get("Authentication");
  const user = await getMe(cookie);
  const bookings = await getBookingsByGuestEmail(cookie, user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
