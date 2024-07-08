import { cookies } from "next/headers";
import { getGuest, updateGuest as updateGuestApi } from "../_lib/apiGuests";
import SelectCountry from "./SelectCountry";
import { revalidatePath } from "next/cache";
import Button from "./Button";

export default async function UpdateProfileForm({ user, children }) {
  const cookie = cookies().get("Authentication");
  const guest = await getGuest(cookie, user.email);

  async function updateGuest(formData) {
    "use server";

    const updatedGuest = {};
    updatedGuest.nationality = formData.get("nationality").split("%")[0];
    updatedGuest.countryFlag = formData.get("nationality").split("%")[1];
    updatedGuest.nationalId = formData.get("nationalId");

    await updateGuestApi(cookie, guest, updatedGuest);

    revalidatePath("/account/profile");
  }

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          value={user.fullName}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          value={user.email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={guest.countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalId">National ID number</label>
        <input
          name="nationalId"
          defaultValue={guest.nationalId}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button>Update profile</Button>
      </div>
    </form>
  );
}
