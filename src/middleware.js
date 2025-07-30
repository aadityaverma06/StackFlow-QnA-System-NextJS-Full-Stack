import { NextResponse } from "next/server";
import getOrCreateDB from "./models/server/dbConnect.js";
import getOrCreateStorage from "./models/server/storageConnect.js";
export async function middleware(request) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  // const privateRoutes = ["/askquestion"];
  // const session = JSON.parse(localStorage.getItem("session"));

  // if (privateRoutes.includes(request.nextUrl.pathname) && !session) {
  //   return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  // }
  // if(privateRoutes.includes(request.nextUrl.pathname) && session) {
  //   return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
