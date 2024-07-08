"use server";

import { cookies } from "next/headers";
import {
  deleteBooking as deleteBookingApi,
  updateBooking as updateBookingApi,
  createBooking as createBookingApi,
} from "./apiBookings";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getMe } from "./apiAuth";
import { getGuest } from "./apiGuests";

export async function createBooking(bookingData, formData) {
  const cookie = cookies().get("Authentication");

  const user = await getMe(cookie);
  const guest = await getGuest(cookie, user.email);

  const newBooking = {};

  newBooking.numGuests = +formData.get("numGuests");
  newBooking.observations = formData.get("observations").slice(0, 1000);
  newBooking.guestId = guest.id;
  newBooking.cabinId = bookingData.cabinId;
  newBooking.startDate = bookingData.startDate;
  newBooking.endDate = bookingData.endDate;
  newBooking.numNights = bookingData.numNights;
  newBooking.totalPrice = bookingData.cabinPrice * +formData.get("numGuests");
  newBooking.extrasPrice = 0;
  newBooking.hasBreakfast = false;
  newBooking.status = "unconfirmed";

  await createBookingApi(cookie, newBooking);

  revalidatePath("/account/reservations", "layout");
  revalidatePath("/cabins", "layout");
  redirect("/thank-you");
}

export async function updateBooking(formData) {
  const cookie = cookies().get("Authentication");

  const updatedBooking = {};

  updatedBooking.numGuests = +formData.get("numGuests");
  updatedBooking.observations = formData.get("observations").slice(0, 1000);

  const bookingId = formData.get("bookingId");

  await updateBookingApi(cookie, bookingId, updatedBooking);

  revalidatePath("/account/reservations", "layout");
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
  const cookie = cookies().get("Authentication");
  await deleteBookingApi(cookie, bookingId);
  revalidatePath("/account/reservations");
}
