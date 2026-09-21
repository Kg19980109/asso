import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { getLeadById, updateLead, VALID_STATUSES, LeadStatus } from "@/lib/leads";

export async function GET(
  req: NextRequest,
  segmentData: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Operator credentials required." },
      { status: 401 }
    );
  }

  try {
    const { id } = await segmentData.params;
    const lead = await getLeadById(id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch lead." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  segmentData: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Operator credentials required." },
      { status: 401 }
    );
  }

  try {
    const { id } = await segmentData.params;

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Update body cannot be empty." },
        { status: 400 }
      );
    }

    // Validation
    if (body.status !== undefined && !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (body.nextFollowUpAt !== undefined && body.nextFollowUpAt !== null) {
      const parsedDate = new Date(body.nextFollowUpAt);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { success: false, error: "Invalid follow-up date format." },
          { status: 400 }
        );
      }
    }

    const updated = await updateLead(id, {
      status: body.status as LeadStatus | undefined,
      nextFollowUpAt: body.nextFollowUpAt,
      assignedTo: body.assignedTo,
      newNote: body.newNote,
      contactAction: body.contactAction,
      contactNote: body.contactNote,
      operatorName: body.operatorName,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, lead: updated, message: "Lead updated successfully." },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to update lead." },
      { status: 500 }
    );
  }
}
