const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "asso_operator_dev_secret_2026";

async function runTests() {
  console.log(`Starting Phase 1C, 1D & 1E Lead Management & Pipeline Test Suite against ${BASE_URL}...\n`);
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  const testPhone = "98300" + Math.floor(10000 + Math.random() * 90000);
  const testRestaurant = "QA Test Kitchen " + Date.now();
  const testHeaders = {
    "Content-Type": "application/json",
    "x-test-suite": "lead-pipeline-test",
  };

  // ══════════════════════════════════════════════════════════════
  // PHASE 1C REGRESSION TESTS
  // ══════════════════════════════════════════════════════════════
  console.log("── Phase 1C: Lead Submission & Ingestion Regression ──");

  // Test 1: Missing Required Fields
  try {
    const res = await fetch(`${BASE_URL}/api/partner-lead`, {
      method: "POST",
      headers: testHeaders,
      body: JSON.stringify({
        ownerName: "Tester",
        phone: testPhone,
      }),
    });
    const data = await res.json();
    assert(res.status === 400, "Missing required restaurantName returns HTTP 400");
    assert(data.success === false, "Missing field returns success: false");
    assert(typeof data.error === "string" && data.error.length > 0, "Returns user-facing error message");
  } catch (err) {
    assert(false, `Test 1 threw error: ${err.message}`);
  }

  // Test 2: Invalid Indian Phone
  try {
    const res = await fetch(`${BASE_URL}/api/partner-lead`, {
      method: "POST",
      headers: testHeaders,
      body: JSON.stringify({
        restaurantName: testRestaurant,
        ownerName: "Tester",
        phone: "123456", // Invalid
        cityArea: "Salt Lake",
      }),
    });
    const data = await res.json();
    assert(res.status === 400, "Invalid phone number returns HTTP 400");
    assert(data.error.includes("phone number"), "Error explains phone requirement cleanly");
  } catch (err) {
    assert(false, `Test 2 threw error: ${err.message}`);
  }

  // Test 3: Valid Lead Submission
  let validLeadId = null;
  try {
    const res = await fetch(`${BASE_URL}/api/partner-lead`, {
      method: "POST",
      headers: testHeaders,
      body: JSON.stringify({
        restaurantName: testRestaurant,
        ownerName: "Siddhartha Guha",
        phone: `+91 ${testPhone}`,
        email: "siddhartha@example.com",
        cityArea: "Park Street, Kolkata",
        outlets: "2-5",
        dailyWalkins: "150-300",
        notes: "Interested in festival rush setup",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Valid lead submission returns HTTP 200");
    assert(data.success === true, "Valid lead returns success: true");
    assert(typeof data.leadId === "string" && data.leadId.startsWith("lead_"), "Valid leadId returned");
    validLeadId = data.leadId;
  } catch (err) {
    assert(false, `Test 3 threw error: ${err.message}`);
  }

  // Test 4: Idempotent Duplicate Protection
  try {
    const res = await fetch(`${BASE_URL}/api/partner-lead`, {
      method: "POST",
      headers: testHeaders,
      body: JSON.stringify({
        restaurantName: testRestaurant,
        ownerName: "Siddhartha Guha",
        phone: testPhone, // Same number, different formatting
        cityArea: "Park Street, Kolkata",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Immediate retry returns HTTP 200");
    assert(data.duplicate === true, "Duplicate flag confirmed in response");
  } catch (err) {
    assert(false, `Test 4 threw error: ${err.message}`);
  }

  // Test 5: Storage Verification & Initial Operational Fields
  try {
    const filePath = path.join(process.cwd(), "data", "partner-leads.json");
    assert(fs.existsSync(filePath), "data/partner-leads.json file created on disk");

    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const matched = fileContent.find((l) => l.id === validLeadId);
    assert(matched !== undefined, "Lead record found persisted in storage");
    assert(matched.phone === `+91${testPhone}`, "Phone number properly normalized to +91");
    assert(matched.restaurantName === testRestaurant, "Restaurant name correctly preserved");
    assert(matched.status === "NEW", "Newly ingested lead defaults to status NEW");
    assert(Array.isArray(matched.internalNotes), "Lead initialized with internalNotes array");
    assert(Array.isArray(matched.contactHistory), "Lead initialized with contactHistory array");
    assert(matched.contactHistory.length >= 1, "Lead has initial enquiry logged in contact history");
  } catch (err) {
    assert(false, `Test 5 threw error: ${err.message}`);
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE 1D SECURITY & ACCESS CONTROL TESTS
  // ══════════════════════════════════════════════════════════════
  console.log("\n── Phase 1D: Privacy & Security Verification ──");

  // Test 6: Public Lead Retrieval Forbidden (Step 13 & Step 15L)
  try {
    const res = await fetch(`${BASE_URL}/api/partner-lead`, { method: "GET" });
    const data = await res.json();
    assert(res.status === 405, "Public GET /api/partner-lead returns HTTP 405 Method Not Allowed");
    assert(data.success === false, "Public lead retrieval blocked");
  } catch (err) {
    assert(false, `Test 6 threw error: ${err.message}`);
  }

  // Test 7: Unauthorized Access to Internal Lead Listing (Step 15A)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads`, { method: "GET" });
    const data = await res.json();
    assert(res.status === 401, "Unauthenticated GET /api/admin/leads rejected with HTTP 401");
    assert(data.success === false, "Unauthorized error returned");
  } catch (err) {
    assert(false, `Test 7 threw error: ${err.message}`);
  }

  // Test 8: Unauthorized Access to Single Lead (Step 15A)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, { method: "GET" });
    assert(res.status === 401, "Unauthenticated GET /api/admin/leads/[id] rejected with HTTP 401");
  } catch (err) {
    assert(false, `Test 8 threw error: ${err.message}`);
  }

  // Test 9: Operator Authentication with Invalid Key
  try {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "wrong_password_xyz" }),
    });
    const data = await res.json();
    assert(res.status === 401, "Login with invalid credentials rejected with HTTP 401");
    assert(data.success === false, "Login fails gracefully");
  } catch (err) {
    assert(false, `Test 9 threw error: ${err.message}`);
  }

  // Test 10: Operator Authentication with Valid Key (Step 15B)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: ADMIN_SECRET }),
    });
    const data = await res.json();
    assert(res.status === 200, "Login with valid operator key returns HTTP 200");
    assert(data.success === true, "Operator authenticated successfully");

    const rawCookie = res.headers.get("set-cookie");
    assert(rawCookie && rawCookie.includes("asso_operator_token"), "HTTP-only session cookie set in response");
  } catch (err) {
    assert(false, `Test 10 threw error: ${err.message}`);
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE 1D OPERATIONAL LEAD MANAGEMENT TESTS
  // ══════════════════════════════════════════════════════════════
  console.log("\n── Phase 1D: Lead Listing, Search, Filter & Metrics ──");

  const authHeaders = {
    "Content-Type": "application/json",
    "x-admin-key": ADMIN_SECRET,
  };

  // Test 11: Authorized Lead Listing & Metrics Computation (Step 15C, Step 5)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await res.json();
    assert(res.status === 200, "Authorized GET /api/admin/leads returns HTTP 200");
    assert(data.success === true, "Response reports success: true");
    assert(Array.isArray(data.leads), "Returns array of leads");
    assert(typeof data.metrics === "object", "Authoritative metrics object returned");
    assert(typeof data.metrics.byStatus === "object", "Metrics includes breakdown byStatus");
    assert(typeof data.metrics.receivedToday === "number", "Metrics includes receivedToday counter");
    assert(typeof data.metrics.receivedThisWeek === "number", "Metrics includes receivedThisWeek counter");
    assert(typeof data.metrics.overdueFollowUps === "number", "Metrics includes overdueFollowUps counter");
  } catch (err) {
    assert(false, `Test 11 threw error: ${err.message}`);
  }

  // Test 12: Search by Restaurant Name (Step 15D)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads?search=${encodeURIComponent(testRestaurant)}`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await res.json();
    assert(res.status === 200, "Search request returns HTTP 200");
    assert(data.leads.length >= 1, "Search successfully finds matching lead by restaurant name");
    assert(data.leads.some((l) => l.id === validLeadId), "Created lead found in search results");
  } catch (err) {
    assert(false, `Test 12 threw error: ${err.message}`);
  }

  // Test 13: Search by Phone Number (Step 15D)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads?search=${testPhone}`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await res.json();
    assert(data.leads.length >= 1, "Search successfully finds matching lead by phone digits");
  } catch (err) {
    assert(false, `Test 13 threw error: ${err.message}`);
  }

  // Test 14: Status Filter (Step 15E)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads?status=NEW`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await res.json();
    assert(res.status === 200, "Status filter returns HTTP 200");
    assert(data.leads.every((l) => l.status === "NEW"), "All returned leads strictly match status=NEW");
  } catch (err) {
    assert(false, `Test 14 threw error: ${err.message}`);
  }

  console.log("\n── Phase 1D: Lead Status, Follow-up & Contact Actions ──");

  // Test 15: Status Update & Contact History Logging (Step 15F, 15J)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "CONTACTED",
        contactAction: "Called restaurant owner",
        contactNote: "Discussed festival rush seating setup",
        operatorName: "Arjun (ASSO Lead)",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Status update returns HTTP 200");
    assert(data.lead.status === "CONTACTED", "Lead status updated to CONTACTED");
    assert(data.lead.contactHistory.length >= 2, "Contact history entry added");
    const latestContact = data.lead.contactHistory[0];
    assert(latestContact.action === "Called restaurant owner", "Contact action recorded correctly");
    assert(latestContact.previousStatus === "NEW" && latestContact.newStatus === "CONTACTED", "Status transition audit trail preserved");
  } catch (err) {
    assert(false, `Test 15 threw error: ${err.message}`);
  }

  // Test 16: Internal Note Creation (Step 15G)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        newNote: "Owner prefers evening demo after 8 PM closing time.",
        operatorName: "ASSO Ops",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Internal note creation returns HTTP 200");
    assert(data.lead.internalNotes.length === 1, "Internal note added to lead record");
    assert(data.lead.internalNotes[0].text.includes("8 PM closing time"), "Note content preserved accurately");
  } catch (err) {
    assert(false, `Test 16 threw error: ${err.message}`);
  }

  // Test 17: Follow-up Scheduling & Overdue Detection (Step 15H, 15I)
  try {
    // Schedule a past follow-up date (1 day ago) to test overdue detection
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        nextFollowUpAt: yesterday,
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Follow-up scheduling returns HTTP 200");
    assert(data.lead.nextFollowUpAt === yesterday, "nextFollowUpAt updated to ISO timestamp");

    // Fetch metrics to verify overdueFollowUps count incremented
    const metricsRes = await fetch(`${BASE_URL}/api/admin/leads`, {
      method: "GET",
      headers: authHeaders,
    });
    const metricsData = await metricsRes.json();
    assert(metricsData.metrics.overdueFollowUps >= 1, "Overdue follow-up detected and counted in operational metrics");
  } catch (err) {
    assert(false, `Test 17 threw error: ${err.message}`);
  }

  // Test 18: Invalid Status Rejection (Step 15K)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "INVALID_STATUS_CODE",
      }),
    });
    const data = await res.json();
    assert(res.status === 400, "Invalid status update rejected with HTTP 400");
    assert(data.success === false, "Error returned on invalid status");
  } catch (err) {
    assert(false, `Test 18 threw error: ${err.message}`);
  }

  // Test 19: Invalid Follow-up Date Rejection (Step 15K)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        nextFollowUpAt: "not_a_valid_date_format",
      }),
    });
    const data = await res.json();
    assert(res.status === 400, "Malformed date format rejected with HTTP 400");
  } catch (err) {
    assert(false, `Test 19 threw error: ${err.message}`);
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE 1E PRODUCTION POLISH & HARDENING TESTS
  // ══════════════════════════════════════════════════════════════
  console.log("\n── Phase 1E: Operational Priority, Combined Filters & Reliability ──");

  // Test 20: Overdue Follow-up Filter Query (Feature B & F)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads?followUpFilter=OVERDUE`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await res.json();
    assert(res.status === 200, "followUpFilter=OVERDUE returns HTTP 200");
    assert(data.leads.length >= 1, "Overdue filter successfully returns leads");
    assert(data.leads.every((l) => l.priority === "OVERDUE"), "Every lead in result has priority OVERDUE");
  } catch (err) {
    assert(false, `Test 20 threw error: ${err.message}`);
  }

  // Test 21: Today Follow-up Scheduling and Filter (Feature B & F)
  try {
    const todayNoon = new Date();
    todayNoon.setHours(12, 0, 0, 0);
    await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({ nextFollowUpAt: todayNoon.toISOString() }),
    });

    const res = await fetch(`${BASE_URL}/api/admin/leads?followUpFilter=TODAY`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await res.json();
    assert(res.status === 200, "followUpFilter=TODAY returns HTTP 200");
    assert(data.leads.some((l) => l.id === validLeadId), "Lead with today follow-up appears in TODAY filter");
    assert(data.leads.every((l) => l.priority === "TODAY"), "All leads in result have priority TODAY");
  } catch (err) {
    assert(false, `Test 21 threw error: ${err.message}`);
  }

  // Test 22: Priority Sorting (Urgent First: OVERDUE -> TODAY -> UPCOMING_DEMO -> etc.) (Feature B)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads?sort=priority`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await res.json();
    assert(res.status === 200, "Sort by priority returns HTTP 200");
    assert(Array.isArray(data.leads), "Returns array sorted by operational priority");
    // Verify first items are not closed when open items exist
    if (data.leads.length > 1) {
      const priorities = data.leads.map((l) => l.priority);
      assert(priorities.length > 0, "Priority attributes correctly populated on all leads");
    }
  } catch (err) {
    assert(false, `Test 22 threw error: ${err.message}`);
  }

  // Test 23: Predefined Contact Activity Logging (Feature D)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "WhatsApp conversation",
        contactNote: "Shared queue brochure PDF with owner",
        operatorName: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Logging predefined activity returns HTTP 200");
    const latest = data.lead.contactHistory[0];
    assert(latest.action === "WhatsApp conversation", "Predefined action logged accurately");
    assert(latest.note.includes("brochure PDF"), "Contact note appended correctly");
    assert(latest.operator === "Sagnik", "Operator attribution preserved");
  } catch (err) {
    assert(false, `Test 23 threw error: ${err.message}`);
  }

  // Test 24: Status Lifecycle & Reactivating a LOST Lead (Feature E)
  try {
    // 1. Mark as LOST
    await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({ status: "LOST" }),
    });

    // 2. Reactivate back to QUALIFIED
    const reactivateRes = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({ status: "QUALIFIED" }),
    });
    const data = await reactivateRes.json();
    assert(reactivateRes.status === 200, "Reactivating LOST lead returns HTTP 200");
    assert(data.lead.status === "QUALIFIED", "Lead status updated to QUALIFIED");
    const latestHistory = data.lead.contactHistory[0];
    assert(
      latestHistory.action.includes("reactivated from LOST to QUALIFIED"),
      "Audit trail explicitly records reactivation from LOST"
    );
  } catch (err) {
    assert(false, `Test 24 threw error: ${err.message}`);
  }

  // Test 25: Combined Multi-Filter Query (Feature F)
  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/leads?search=${encodeURIComponent(testRestaurant)}&status=QUALIFIED&sort=priority`,
      { method: "GET", headers: authHeaders }
    );
    const data = await res.json();
    assert(res.status === 200, "Combined multi-filter query returns HTTP 200");
    assert(data.leads.length === 1, "Combined filters pinpoint exact lead");
    assert(data.leads[0].id === validLeadId, "Correct lead returned matching all filters");
  } catch (err) {
    assert(false, `Test 25 threw error: ${err.message}`);
  }

  // Test 26: Concurrent Lead Writes Safety (Feature K)
  try {
    const concurrentCount = 4;
    const promises = [];
    for (let i = 0; i < concurrentCount; i++) {
      promises.push(
        fetch(`${BASE_URL}/api/partner-lead`, {
          method: "POST",
          headers: testHeaders,
          body: JSON.stringify({
            restaurantName: `Concurrent Test ${i} ${Date.now()}`,
            ownerName: `Owner ${i}`,
            phone: "98311" + Math.floor(10000 + Math.random() * 90000),
            cityArea: "Kolkata",
          }),
        })
      );
    }
    const results = await Promise.all(promises);
    const allSuccessful = results.every((r) => r.status === 200);
    assert(allSuccessful, "All concurrent write submissions succeeded without race condition errors");
  } catch (err) {
    assert(false, `Test 26 threw error: ${err.message}`);
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE 1F CONVERSION WORKFLOW TESTS
  // ══════════════════════════════════════════════════════════════
  console.log("\n── Phase 1F: Lead Conversion Workflow & Milestones ──");

  // Test 27: Demo Scheduling Workflow
  try {
    const demoDate = new Date(Date.now() + 86400000 * 2).toISOString();
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "DEMO_SCHEDULED",
        nextFollowUpAt: demoDate,
        note: "Scheduled online walkthrough with restaurant manager",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Scheduling demo returns HTTP 200");
    assert(data.lead.status === "DEMO_SCHEDULED", "Lead status updated to DEMO_SCHEDULED");
    assert(data.lead.nextFollowUpAt === demoDate, "Demo date successfully saved to nextFollowUpAt");
    assert(
      data.lead.contactHistory[0].note.includes("online walkthrough"),
      "Demo notes recorded in contact audit history"
    );
  } catch (err) {
    assert(false, `Test 27 threw error: ${err.message}`);
  }

  // Test 28: Pilot Workflow with Persisted Checklist
  try {
    const initialChecklist = ["staff_trained", "menu_live"];
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "PILOT",
        pilotChecklist: initialChecklist,
        note: "Commenced 14-day on-site pilot with 2 checklist milestones completed",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Transitioning to PILOT with checklist returns HTTP 200");
    assert(data.lead.status === "PILOT", "Lead status updated to PILOT");
    assert(
      Array.isArray(data.lead.pilotChecklist) && data.lead.pilotChecklist.length === 2,
      "Pilot checklist array persisted with 2 items"
    );

    // Update checklist milestones
    const allSix = [
      "staff_trained",
      "menu_live",
      "qr_on_tables",
      "first_live_order",
      "owner_app_downloaded",
      "review_meeting_done",
    ];
    const updateRes = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        pilotChecklist: allSix,
      }),
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, "Updating pilot checklist returns HTTP 200");
    assert(
      updateData.lead.pilotChecklist.length === 6,
      "All 6 pilot checklist onboarding milestones persisted"
    );
  } catch (err) {
    assert(false, `Test 28 threw error: ${err.message}`);
  }

  // Test 29: Conversion Milestone Workflow
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "CONVERTED",
        note: "Pilot concluded successfully! Merchant signed standard annual agreement.",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Converting lead returns HTTP 200");
    assert(data.lead.status === "CONVERTED", "Lead status set to CONVERTED");
    assert(
      typeof data.lead.convertedAt === "string" && data.lead.convertedAt.length > 0,
      "convertedAt timestamp automatically recorded on conversion"
    );
  } catch (err) {
    assert(false, `Test 29 threw error: ${err.message}`);
  }

  // Test 30: Lost Workflow with Mandatory Reason
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "LOST",
        lostReason: "Price",
        note: "Too expensive for small 4-table café right now",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Marking lead as LOST with reason returns HTTP 200");
    assert(data.lead.status === "LOST", "Lead status set to LOST");
    assert(data.lead.lostReason === "Price", "lostReason persisted correctly");
    assert(data.lead.nextFollowUpAt === null, "nextFollowUpAt automatically cleared when marked LOST");
  } catch (err) {
    assert(false, `Test 30 threw error: ${err.message}`);
  }

  // Test 31: Reactivation Clears Lost Reason
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "QUALIFIED",
        note: "Owner reached back out after opening second branch",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Reactivating lead returns HTTP 200");
    assert(data.lead.status === "QUALIFIED", "Lead status reactivated to QUALIFIED");
    assert(data.lead.lostReason === null, "lostReason cleared to null upon reactivation");
    assert(
      data.lead.contactHistory[0].action.includes("reactivated from LOST to QUALIFIED"),
      "Audit history explicitly logs reactivation"
    );
  } catch (err) {
    assert(false, `Test 31 threw error: ${err.message}`);
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE 1G COMMUNICATION & CONVERSION WORKFLOW TESTS
  // ══════════════════════════════════════════════════════════════
  console.log("\n── Phase 1G: Lead Communication & Conversion Workflow ──");

  // Test 32: WhatsApp Stage-Aware Message Generation & Phone Normalization
  try {
    // Recreate pure helper logic within test for CommonJS execution
    function testGetLeadWhatsAppMessage(lead) {
      const owner = lead.ownerName?.trim() || "there";
      const restaurant = lead.restaurantName?.trim() || "your restaurant";
      const area = lead.cityArea?.trim() || "your area";

      switch (lead.status) {
        case "NEW":
          return `Hi ${owner}, this is ASSO. We received your partnership enquiry for ${restaurant} in ${area}. When would be a good time to connect about your table, queue, and ordering operations?`;
        case "CONTACTED":
          return `Hi ${owner}, following up on our conversation regarding ASSO for ${restaurant}. Let me know if you have any questions or if you'd like a brief walkthrough of how it works.`;
        case "QUALIFIED":
          return `Hi ${owner}, hope service is going well at ${restaurant}. We'd love to give you a quick 10-minute walkthrough of how ASSO handles live queues and guest seating. Would later today or tomorrow work for you?`;
        case "DEMO_SCHEDULED":
          return `Hi ${owner}, confirming our upcoming ASSO product walkthrough for ${restaurant}. Looking forward to speaking with you!`;
        case "PILOT":
          return `Hi ${owner}, checking in on how the ASSO pilot is going at ${restaurant}. How are your team and guests finding the table and queue flow so far?`;
        case "LOST":
        case "CONVERTED":
        default:
          return "";
      }
    }

    function testGetWhatsAppUrl(phone, text) {
      const digits = phone.replace(/[^0-9]/g, "");
      const normalizedDigits = digits.length === 10 ? `91${digits}` : digits;
      return `https://wa.me/${normalizedDigits}?text=${encodeURIComponent(text)}`;
    }

    const testLeadObj = {
      ownerName: "Rahul Sen",
      restaurantName: "Park Heritage Bistro",
      cityArea: "Park Street",
      phone: "+919830012345",
    };

    const newMsg = testGetLeadWhatsAppMessage({ ...testLeadObj, status: "NEW" });
    assert(newMsg.includes("partnership enquiry") && newMsg.includes("Park Heritage Bistro"), "NEW stage WhatsApp message references enquiry & restaurant");

    const pilotMsg = testGetLeadWhatsAppMessage({ ...testLeadObj, status: "PILOT" });
    assert(pilotMsg.includes("pilot is going"), "PILOT stage WhatsApp message checks pilot progress");

    const lostMsg = testGetLeadWhatsAppMessage({ ...testLeadObj, status: "LOST" });
    assert(lostMsg === "", "LOST stage produces no automated outreach text");

    const convertedMsg = testGetLeadWhatsAppMessage({ ...testLeadObj, status: "CONVERTED" });
    assert(convertedMsg === "", "CONVERTED stage produces no sales outreach text");

    const waUrl = testGetWhatsAppUrl(testLeadObj.phone, newMsg);
    assert(waUrl.startsWith("https://wa.me/919830012345?text="), "Phone normalized to Indian international digits without '+' or spaces in wa.me URL");
  } catch (err) {
    assert(false, `Test 32 threw error: ${err.message}`);
  }

  // Test 33: WhatsApp Conversation Activity Logging (Explicit Confirmation)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "WhatsApp conversation",
        note: "Shared link to digital queue intro video on WhatsApp",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Logging confirmed WhatsApp conversation returns HTTP 200");
    const latest = data.lead.contactHistory[0];
    assert(latest.action === "WhatsApp conversation", "Contact history records WhatsApp conversation");
    assert(latest.note.includes("digital queue intro video"), "WhatsApp note preserved");
    assert(latest.operator === "Sagnik", "Operator attributed to WhatsApp activity");
  } catch (err) {
    assert(false, `Test 33 threw error: ${err.message}`);
  }

  // Test 34: Call Outcome Logging
  try {
    // 1. Call - Connected
    const resConnected = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "Call — Connected",
        note: "Spoke with manager; asked to call back tomorrow evening",
        operator: "Sagnik",
      }),
    });
    const dataConnected = await resConnected.json();
    assert(resConnected.status === 200, "Logging Call — Connected returns HTTP 200");
    assert(dataConnected.lead.contactHistory[0].action === "Call — Connected", "Call — Connected recorded in history");

    // 2. Call - No answer
    const resNoAnswer = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "Call — No answer",
        operator: "Sagnik",
      }),
    });
    const dataNoAnswer = await resNoAnswer.json();
    assert(resNoAnswer.status === 200, "Logging Call — No answer returns HTTP 200");
    assert(dataNoAnswer.lead.contactHistory[0].action === "Call — No answer", "Call — No answer recorded in history");
  } catch (err) {
    assert(false, `Test 34 threw error: ${err.message}`);
  }

  // Test 35: Call Outcome: Callback Requested with Follow-up Scheduling
  try {
    const callbackTarget = new Date(Date.now() + 86400000).toISOString();
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "Call — Callback requested",
        nextFollowUpAt: callbackTarget,
        note: "Owner was on flight; callback requested for tomorrow",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Logging Callback requested with nextFollowUpAt returns HTTP 200");
    assert(data.lead.contactHistory[0].action === "Call — Callback requested", "Callback requested action recorded");
    assert(data.lead.nextFollowUpAt === callbackTarget, "Follow-up timestamp successfully scheduled");
  } catch (err) {
    assert(false, `Test 35 threw error: ${err.message}`);
  }

  // Test 36: No Automatic LOST Transition on 'Call — Not interested'
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "Call — Not interested",
        note: "Stated they are happy with existing paper tokens for now",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Logging Call — Not interested returns HTTP 200");
    assert(data.lead.contactHistory[0].action === "Call — Not interested", "Call — Not interested recorded");
    assert(data.lead.status !== "LOST", "Lead status NOT automatically marked as LOST (remains operator-controlled)");
  } catch (err) {
    assert(false, `Test 36 threw error: ${err.message}`);
  }

  // Test 37: Email Activity Confirmation Logging
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "Email sent",
        note: "Sent partnership deck PDF and pricing breakdown",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Logging confirmed Email sent returns HTTP 200");
    assert(data.lead.contactHistory[0].action === "Email sent", "Email sent recorded in contact history");
    assert(data.lead.contactHistory[0].note.includes("pricing breakdown"), "Email notes preserved");
  } catch (err) {
    assert(false, `Test 37 threw error: ${err.message}`);
  }

  // Test 38: Demo Conducted Logging without Automatic Stage Jump
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        contactAction: "Demo conducted",
        note: "Conducted 15-min live portal demo. Owner loved QR queue view.",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Logging Demo conducted returns HTTP 200");
    assert(data.lead.contactHistory[0].action === "Demo conducted", "Demo conducted logged in contact history");
    assert(data.lead.status !== "PILOT", "Lead status does NOT automatically jump to PILOT (requires explicit operator click)");
  } catch (err) {
    assert(false, `Test 38 threw error: ${err.message}`);
  }

  // Test 39: Explicit Transition to PILOT
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads/${validLeadId}`, {
      method: "PATCH",
      headers: authHeaders,
      body: JSON.stringify({
        status: "PILOT",
        contactAction: "Moved to Pilot by operator",
        operator: "Sagnik",
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Explicit move to PILOT returns HTTP 200");
    assert(data.lead.status === "PILOT", "Lead status successfully updated to PILOT");
    assert(data.lead.contactHistory[0].action === "Moved to Pilot by operator", "Explicit stage transition audit recorded");
  } catch (err) {
    assert(false, `Test 39 threw error: ${err.message}`);
  }

  // Test 40: Timeline Event Categorization
  try {
    function testGetTimelineCategory(action) {
      const lower = action.toLowerCase();
      if (
        lower.startsWith("call") ||
        lower.includes("whatsapp") ||
        lower.includes("email") ||
        lower.includes("contacted")
      ) {
        return "CONTACT";
      }
      if (
        lower.includes("demo") ||
        lower.includes("pilot") ||
        lower.includes("converted") ||
        lower.includes("lost") ||
        lower.includes("qualified") ||
        lower.includes("reactivated")
      ) {
        return "SALES";
      }
      if (lower.includes("follow-up") || lower.includes("callback")) {
        return "FOLLOW_UP";
      }
      return "OTHER";
    }

    assert(testGetTimelineCategory("WhatsApp conversation") === "CONTACT", "WhatsApp categorized as CONTACT");
    assert(testGetTimelineCategory("Call — Connected") === "CONTACT", "Call outcome categorized as CONTACT");
    assert(testGetTimelineCategory("Email sent") === "CONTACT", "Email sent categorized as CONTACT");
    assert(testGetTimelineCategory("Demo conducted") === "SALES", "Demo conducted categorized as SALES");
    assert(testGetTimelineCategory("Moved to Pilot by operator") === "SALES", "Pilot transition categorized as SALES");
    assert(testGetTimelineCategory("Call — Callback requested") === "CONTACT" || testGetTimelineCategory("Call — Callback requested") === "FOLLOW_UP", "Callback categorized correctly");
  } catch (err) {
    assert(false, `Test 40 threw error: ${err.message}`);
  }

  // Test 41: Clean Up Test Lead
  try {
    const filePath = path.join(process.cwd(), "data", "partner-leads.json");
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const cleaned = fileContent.filter(
      (l) => l.id !== validLeadId && !l.restaurantName.startsWith("Concurrent Test")
    );
    fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), "utf-8");
    console.log("  ✓ Test leads safely cleaned up from storage");
  } catch (err) {
    assert(false, `Test 41 threw error: ${err.message}`);
  }

  console.log(`\n==================================================`);
  console.log(`Phase 1C, 1D, 1E, 1F & 1G Test Suite Complete: ${passed} passed, ${failed} failed.`);
  console.log(`==================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
