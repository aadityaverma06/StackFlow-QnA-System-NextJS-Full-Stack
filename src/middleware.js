import { NextResponse } from "next/server";
import getOrCreateDB from "./models/server/dbConnect.js";
import getOrCreateStorage from "./models/server/storageConnect.js";
export async function middleware(request) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  return NextResponse.next();
}

export const config = {};
