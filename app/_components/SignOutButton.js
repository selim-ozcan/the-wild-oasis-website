import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function SignOutButton() {
  async function signOut() {
    "use server";

    cookies().delete("Authentication");

    redirect("/");
  }

  return (
    <form action={signOut}>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
