import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "./Button";

function LoginForm() {
  async function handleSubmit(formData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) return;

    const response = await fetch(`http://localhost:3004/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const cookie = response.headers.get("set-cookie").split("=")[1];
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
          You don&apos;t have an account?{" "}
          <Link
            className="text-accent-600 hover:text-accent-700 hover:underline"
            href={"/signup"}
          >
            Sign up
          </Link>
        </span>
        <Button>Login</Button>
      </div>
    </form>
  );
}

export default LoginForm;
