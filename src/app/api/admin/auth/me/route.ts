import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const isAuth = verifyAdminAuth(req);
  return NextResponse.json({ authenticated: isAuth }, { status: isAuth ? 200 : 401 });
}
