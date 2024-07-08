import { redirect } from "next/navigation";
import LoginForm from "../_components/LoginForm";
import { getMe } from "../_lib/apiAuth";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  let user;
  const cookie = cookies().get("Authentication");
  if (cookie) user = await getMe(cookie);
  if (user) return redirect("/account");

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <LoginForm />
    </div>
  );
}
