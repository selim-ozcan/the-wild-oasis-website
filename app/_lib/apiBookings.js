import { eachDayOfInterval } from "date-fns";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

export async function getBookedDatesByCabinId(cookie, cabinId) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/bookings/bookedDates/${cabinId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error get booked dates");
  }

  const data = await response.json();

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getBookingsByGuestEmail(cookie, email) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/bookings/ofGuest/${email}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error get bookings by guest email");
  }

  const data = await response.json();

  return data;
}

export async function getBooking(id) {
  const cookie = cookies().get("Authentication");
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/bookings/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error get booking");
  }

  const data = await response.json();

  return data;
}

export async function createBooking(cookie, newBooking) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: JSON.stringify(newBooking),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}

export async function updateBooking(cookie, bookingId, updatedBooking) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: JSON.stringify(updatedBooking),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}

export async function deleteBooking(cookie, id) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/bookings/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}
