const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function runTests() {
  console.log(`Starting Phase 1C Lead Pipeline Test Suite against ${BASE_URL}...\n`);
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

  // Test 5: Storage Verification & Cleanup
  try {
    const filePath = path.join(process.cwd(), "data", "partner-leads.json");
    assert(fs.existsSync(filePath), "data/partner-leads.json file created on disk");

    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const matched = fileContent.find((l) => l.id === validLeadId);
    assert(matched !== undefined, "Lead record found persisted in storage");
    assert(matched.phone === `+91${testPhone}`, "Phone number properly normalized to +91");
    assert(matched.restaurantName === testRestaurant, "Restaurant name correctly preserved");

    // Clean up test lead
    const cleaned = fileContent.filter((l) => l.id !== validLeadId);
    fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), "utf-8");
    console.log("  ✓ Test lead safely cleaned up from storage");
  } catch (err) {
    assert(false, `Test 5 threw error: ${err.message}`);
  }

  // Test 6: Rate Limiting Verification
  try {
    const rateLimitIp = `198.51.100.${Math.floor(Math.random() * 200 + 1)}`;
    let hitRateLimit = false;

    for (let i = 0; i < 6; i++) {
      const res = await fetch(`${BASE_URL}/api/partner-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": rateLimitIp,
        },
        body: JSON.stringify({
          restaurantName: `Spam Check ${i}`,
          ownerName: "Spammer",
          phone: "9830099999",
          cityArea: "Kolkata",
        }),
      });

      if (res.status === 429) {
        hitRateLimit = true;
        break;
      }
    }
    assert(hitRateLimit === true, "Rate limiter returns HTTP 429 upon exceeding 5 requests");
  } catch (err) {
    assert(false, `Test 6 threw error: ${err.message}`);
  }

  console.log(`\nTest results: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
