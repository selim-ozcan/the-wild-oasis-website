import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "./Button";

function SignupForm() {
  async function handleSubmit(formData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("fullName");

    if (!email || !password || !fullName) return;

    const response = await fetch(`http://localhost:3004/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    await fetch(`http://localhost:3004/guests`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, fullName }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const loginResponse = await fetch(`http://localhost:3004/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      throw new Error(error.message);
    }
    const cookie = loginResponse.headers.get("set-cookie").split("=")[1];
    cookies().set("Authentication", cookie);

    redirect("/account");
  }

  return (
    <form
      action={handleSubmit}
      className="w-[35%] flex flex-col gap-8 justify-center items-center"
    >
      <input
        className="px-5 py-3 w-full bg-primary-700 rounded-md focus:outline focus:outline-4 focus:outline-primary-400"
        placeholder="Full Name"
        type="text"
        id="fullName"
        name="fullName"
      />

      <input
        className="px-5 py-3 w-full bg-primary-700 rounded-md focus:outline focus:outline-4 focus:outline-primary-400"
        placeholder="Email"
        type="email"
        id="email"
        // This makes this form better for password managers
        autoComplete="email"
        name="email"
      />

      <input
        className="px-5 py-3 w-full bg-primary-700 rounded-md focus:outline focus:outline-4 focus:outline-primary-400"
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        autoComplete="current-password"
      />
      <div className="flex w-full gap-4 items-center justify-end">
        <span className="text-md">
          You already have an account?{" "}
          <Link
            className="text-accent-600 hover:text-accent-700 hover:underline"
            href={"/login"}
          >
            Log in
          </Link>
        </span>
        <Button>Signup</Button>
      </div>
    </form>
  );
}

export default SignupForm;
