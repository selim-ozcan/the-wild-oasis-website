import { cookies } from "next/headers";
import { getMe } from "../_lib/apiAuth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const cookie = cookies().get("Authentication");
  const user = await getMe(cookie);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {user.fullName}
    </h2>
  );
}
