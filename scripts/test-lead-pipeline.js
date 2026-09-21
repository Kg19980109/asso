const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "asso_operator_dev_secret_2026";

async function runTests() {
  console.log(`Starting Phase 1C & 1D Lead Management & Pipeline Test Suite against ${BASE_URL}...\n`);
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
  let sessionCookie = null;
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
    if (rawCookie) {
      sessionCookie = rawCookie.split(";")[0];
    }
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

  // Test 20: Storage Cleanup of Test Lead
  try {
    const filePath = path.join(process.cwd(), "data", "partner-leads.json");
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const cleaned = fileContent.filter((l) => l.id !== validLeadId);
    fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), "utf-8");
    console.log("  ✓ Test lead safely cleaned up from storage");
  } catch (err) {
    assert(false, `Test 20 threw error: ${err.message}`);
  }

  console.log(`\n==================================================`);
  console.log(`Phase 1C & 1D Test Suite Complete: ${passed} passed, ${failed} failed.`);
  console.log(`==================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
