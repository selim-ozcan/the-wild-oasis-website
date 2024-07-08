import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { getMe } from "@/app/_lib/apiAuth";
import { cookies } from "next/headers";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const cookie = cookies().get("Authentication");
  const user = await getMe(cookie);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm user={user} />
    </div>
  );
}
