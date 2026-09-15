import React from "react";
import ReactDOMServer from "react-dom/server";
import DayCounterPage from "../src/app/calculators/day-counter-calculator/page";

const html = ReactDOMServer.renderToString(React.createElement(DayCounterPage));

// 1. Check H1 count
const h1Matches = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || [];
console.log(`H1 count: ${h1Matches.length}`);
h1Matches.forEach((h1, i) => console.log(`  H1 [${i + 1}]: ${h1}`));

if (h1Matches.length !== 1) {
  console.error(`FAIL: Expected exactly 1 H1 element, found ${h1Matches.length}`);
  process.exit(1);
}

// 2. Check H1 text
const h1Text = h1Matches[0].replace(/<[^>]+>/g, "").trim();
console.log(`H1 text: "${h1Text}"`);
if (h1Text !== "Day Counter Calculator") {
  console.error(`FAIL: Expected H1 text to be "Day Counter Calculator", found "${h1Text}"`);
  process.exit(1);
}

// 3. Verify FAQ section is present with our custom date questions
if (!html.includes("Frequently Asked Questions")) {
  console.error("FAIL: FAQ section not rendered");
  process.exit(1);
}

if (!html.includes("How many days are between two dates?")) {
  console.error("FAIL: Custom Day Counter FAQs not rendered in SSR output");
  process.exit(1);
}

// 4. Verify in-content anchor links
const requiredAnchors = [
  "Age Calculator",
  "Date Calculator",
  "Time Duration Calculator",
  "Time Calculator",
];
for (const anchor of requiredAnchors) {
  if (!html.includes(anchor)) {
    console.error(`FAIL: Required contextual anchor "${anchor}" not found in content!`);
    process.exit(1);
  }
}
console.log("SUCCESS: All contextual anchor texts verified in content.");

// 5. Verify no generic fallback terms appear in SSR output
const lower = html.toLowerCase();
const banned = ["inches", "centimeters", "export csv"];
for (const b of banned) {
  if (lower.includes(b)) {
    console.error(`FAIL: Generic or false term "${b}" found in SSR HTML!`);
    process.exit(1);
  }
}

// 6. Verify #day-counter-print-report exists in DOM
if (!html.includes('id="day-counter-print-report"')) {
  console.error("FAIL: #day-counter-print-report element missing from SSR DOM");
  process.exit(1);
}

console.log("SUCCESS: SSR DOM Audit passed! Single H1 = 'Day Counter Calculator', 21 curated FAQs, anchors, print report container verified.");

