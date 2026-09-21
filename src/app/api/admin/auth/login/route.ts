import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminSecret,
  SESSION_COOKIE_NAME,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { password } = body || {};
    const adminSecret = getAdminSecret();

    if (!password || typeof password !== "string" || password !== adminSecret) {
      return NextResponse.json(
        { success: false, error: "Invalid operator credentials." },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const response = NextResponse.json(
      { success: true, message: "Authenticated successfully." },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
