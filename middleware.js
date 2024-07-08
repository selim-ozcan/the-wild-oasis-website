import { NextResponse } from "next/server";
import { getMe } from "./app/_lib/apiAuth";

export default async function middleware(request) {
  const cookie = request.cookies.get("Authentication");

  if (!cookie) return NextResponse.redirect(`${request.nextUrl.origin}/login`);

  const user = await getMe(cookie);

  if (!user) return NextResponse.redirect(`${request.nextUrl.origin}/login`);

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/account/:path"],
};
