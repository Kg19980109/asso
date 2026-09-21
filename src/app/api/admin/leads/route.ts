import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { getFilteredLeads, LeadFilterParams } from "@/lib/leads";

export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Operator credentials required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);

    const filterParams: LeadFilterParams = {
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") || undefined,
      city: searchParams.get("city") || undefined,
      walkins: searchParams.get("walkins") || undefined,
      outlets: searchParams.get("outlets") || undefined,
      followUpFilter: (searchParams.get("followUpFilter") as any) || undefined,
      sort: (searchParams.get("sort") as any) || "newest",
    };

    const result = await getFilteredLeads(filterParams);

    return NextResponse.json(
      {
        success: true,
        leads: result.leads,
        metrics: result.metrics,
        cities: result.cities,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error retrieving admin leads:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve leads." },
      { status: 500 }
    );
  }
}
