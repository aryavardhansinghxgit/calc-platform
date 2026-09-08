import * as http from "http";

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", (err) => reject(err));
    });
  });
}

async function audit() {
  console.log("Fetching http://localhost:3000/calculators/roman-numeral-converter ...");
  const html = await fetchUrl("http://localhost:3000/calculators/roman-numeral-converter");

  const results: { test: string; pass: boolean; details?: string }[] = [];

  // 1. Status & HTML
  results.push({
    test: "HTML received",
    pass: html.length > 5000,
    details: `HTML size: ${html.length} bytes`,
  });

  // 2. H1 check
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Texts = h1Matches.map((m) => m.replace(/<[^>]+>/g, "").trim());
  results.push({
    test: "H1 count is exactly 1",
    pass: h1Matches.length === 1 && h1Texts[0] === "Roman Numeral Converter",
    details: `Found ${h1Matches.length} H1(s): ${JSON.stringify(h1Texts)}`,
  });

  // 3. Title check
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? titleMatch[1].trim() : "";
  results.push({
    test: "Title tag matches",
    pass: titleText.includes("Roman Numeral Converter"),
    details: `Title: ${titleText}`,
  });

  // 4. Meta description check
  const metaDescMatch =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : "";
  results.push({
    test: "Meta description present",
    pass: metaDesc.length > 20,
    details: `Meta description: ${metaDesc}`,
  });

  // 5. Canonical check
  const canonicalMatch =
    html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
    html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : "";
  results.push({
    test: "Canonical URL matches",
    pass: canonical.includes("/calculators/roman-numeral-converter"),
    details: `Canonical: ${canonical}`,
  });

  // 6. Check Card 1, Card 2, Card 3 present in SSR
  const card1Present = html.includes("Roman Numeral Converter");
  const card2Present = html.includes("Roman Numeral Date Converter");
  const card3Present = html.includes("Roman Numeral Calculator (Arithmetic)");
  results.push({
    test: "All three calculator cards present in SSR",
    pass: card1Present && card2Present && card3Present,
    details: `Card 1: ${card1Present}, Card 2: ${card2Present}, Card 3: ${card3Present}`,
  });

  // 7. Check Vinculum option and reference buttons
  const vinculumPresent = html.includes("Vinculum Overlines");
  results.push({
    test: "Vinculum Overlines toggle present",
    pass: vinculumPresent,
    details: `Vinculum toggle: ${vinculumPresent}`,
  });

  // 8. Check Reference Chart present in SSR
  const chartNumbers = [1, 5, 10, 50, 100, 500, 1000, 1776, 1984, 2000, 2024, 2025, 2026];
  let chartMissing: number[] = [];
  for (const num of chartNumbers) {
    if (!html.includes(`>${num}<`) && !html.includes(`">${num}<`) && !html.includes(` ${num} `)) {
      chartMissing.push(num);
    }
  }
  results.push({
    test: "Reference chart numbers present in SSR",
    pass: chartMissing.length === 0,
    details: chartMissing.length === 0 ? "All milestone numbers found" : `Missing: ${JSON.stringify(chartMissing)}`,
  });

  // 9. Check Export actions present
  const csvPresent = html.includes("CSV");
  const txtPresent = html.includes("TXT");
  const printPresent = html.includes("Print");
  const metroPresent = html.includes("Generate Metrology Sheet");
  results.push({
    test: "Export actions present (CSV, TXT, Print, Metrology Sheet)",
    pass: csvPresent && txtPresent && printPresent && metroPresent,
    details: `CSV: ${csvPresent}, TXT: ${txtPresent}, Print: ${printPresent}, Metrology: ${metroPresent}`,
  });

  // 10. Check for invalid rendering strings
  const nanCount = (html.match(/>NaN<|NaN\b/g) || []).length;
  const infCount = (html.match(/>Infinity<|Infinity\b/g) || []).length;
  const undefCount = (html.match(/>undefined<|"undefined"/g) || []).length;
  const nullCount = (html.match(/>null</g) || []).length;
  results.push({
    test: "Zero invalid SSR values (NaN, Infinity, undefined, null)",
    pass: nanCount === 0 && infCount === 0 && undefCount === 0 && nullCount === 0,
    details: `NaN: ${nanCount}, Infinity: ${infCount}, undefined: ${undefCount}, null: ${nullCount}`,
  });

  // Print Summary
  console.log("\n=================== SSR AUDIT RESULTS ===================");
  let allPass = true;
  for (const r of results) {
    console.log(`[${r.pass ? "PASS" : "FAIL"}] ${r.test}`);
    if (r.details) console.log(`       ${r.details}`);
    if (!r.pass) allPass = false;
  }
  console.log("=========================================================");
  console.log(`OVERALL AUDIT: ${allPass ? "PASS" : "FAIL"}`);
}

audit().catch(console.error);
