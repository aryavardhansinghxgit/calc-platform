import fs from "fs";

async function auditMassUIMetrology() {
  console.log("=== STARTING MASS CALCULATOR UI, SSR & METROLOGY AUDIT ===");

  // 1. Fetch SSR HTML from running dev server
  console.log("\n1. Fetching http://localhost:3000/calculators/mass-calculator ...");
  const res = await fetch("http://localhost:3000/calculators/mass-calculator");
  console.log(`   HTTP Status: ${res.status}`);
  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, got ${res.status}`);
  }

  const html = await res.text();

  // 2. H1 Check
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`   H1 Count: ${h1Matches.length}`);
  h1Matches.forEach((h, i) => {
    console.log(`     H1 [${i + 1}]: "${h.replace(/<[^>]+>/g, "").trim()}"`);
  });

  // 3. Metadata
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "NOT FOUND";
  console.log(`   Title: "${title}"`);

  const metaDescMatch =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : "NOT FOUND";
  console.log(`   Meta Description: "${metaDesc}"`);

  const canonicalMatch =
    html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
    html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : "NOT FOUND";
  console.log(`   Canonical: "${canonical}"`);

  // 4. Sanity check for NaN, Infinity, undefined, null
  const cleanText = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");

  const nanMatches = cleanText.match(/\bNaN\b/g) || [];
  const infMatches = cleanText.match(/\bInfinity\b/g) || [];
  const undefMatches = cleanText.match(/\bundefined\b/g) || [];
  const nullMatches = cleanText.match(/\bnull\b/g) || [];

  console.log("\n2. SSR Text Sanity:", {
    NaN_count: nanMatches.length,
    Infinity_count: infMatches.length,
    undefined_count: undefMatches.length,
    null_count: nullMatches.length,
  });

  // 5. Inspect UI Component Source code (Accessibility, IDs, Labels)
  console.log("\n3. Inspecting Component Source: MassCalculator.tsx ...");
  const compSource = fs.readFileSync("src/components/calculator/mass/MassCalculator.tsx", "utf8");

  // Check for accessible inputs & labels with mass- prefix
  const hasDensityId = compSource.includes('id="mass-density-input"');
  const hasDensityLabel = compSource.includes('htmlFor="mass-density-input"');
  const hasVolumeId = compSource.includes('id="mass-volume-input"');
  const hasVolumeLabel = compSource.includes('htmlFor="mass-volume-input"');
  const hasCelestialId = compSource.includes('id="mass-celestial-mass"');
  const hasCelestialLabel = compSource.includes('htmlFor="mass-celestial-mass"');
  const hasAriaLive = compSource.includes('aria-live="polite"');
  const hasRoleAlert = compSource.includes('role="alert"');

  // Verify zero old weight- IDs remain
  const hasOldWeightIds = compSource.includes("weight-density-input") ||
                          compSource.includes("weight-volume-input") ||
                          compSource.includes("weight-celestial-mass");

  console.log("   Accessibility Attributes (mass- prefix):", {
    hasDensityId,
    hasDensityLabel,
    hasVolumeId,
    hasVolumeLabel,
    hasCelestialId,
    hasCelestialLabel,
    hasAriaLive,
    hasRoleAlert,
    zeroOldWeightIds: !hasOldWeightIds,
  });

  // Verify SSR HTML contains zero "Weight Calculator" and zero old IDs
  const ssrWeightCalcMatches = html.match(/Weight Calculator/g) || [];
  const ssrOldIdMatches = html.match(/weight-density-input|weight-volume-input|weight-celestial-mass/g) || [];
  console.log(`\n   SSR 'Weight Calculator' occurrences: ${ssrWeightCalcMatches.length}`);
  console.log(`   SSR old 'weight-' ID occurrences: ${ssrOldIdMatches.length}`);

  // 6. Check Action Toolbar exports
  console.log("\n4. Checking Action Toolbar & Export Handlers:");
  const hasCopyResult = compSource.includes("onCopyResult");
  const hasCopySummary = compSource.includes("onCopySummary");
  const hasCopyLatex = compSource.includes("onCopyLatex");
  const hasExportCsv = compSource.includes("onExportCsv");
  const hasDownloadTxt = compSource.includes("onDownloadTxt");
  const hasReportModal = compSource.includes("ReportModal");
  const hasRestore = compSource.includes("onRestore");

  console.log({
    hasCopyResult,
    hasCopySummary,
    hasCopyLatex,
    hasExportCsv,
    hasDownloadTxt,
    hasReportModal,
    hasRestore,
  });

  // 7. Check Print Styles
  console.log("\n5. Checking Print / PDF Styles:");
  const hasPrintHidden = compSource.includes("print:hidden");
  const hasBreakInsideAvoid = compSource.includes("print:break-inside-avoid");
  console.log({ hasPrintHidden, hasBreakInsideAvoid });

  // 8. Terminology and Text Inspection in MassContent.tsx
  console.log("\n6. Terminology & Anomaly Audit in MassContent.tsx:");
  const contentSource = fs.readFileSync("src/components/calculator/mass/MassContent.tsx", "utf8");

  // Check if "Weight Calculator" is used as the title or in headings
  const weightCalcMatches = contentSource.match(/Weight Calculator/g) || [];
  console.log(`   'Weight Calculator' occurrences in MassContent.tsx: ${weightCalcMatches.length}`);

  // Check for BIPM 2019 Planck constant mention
  const hasPlanck =
    contentSource.includes("6.62607015") &&
    (contentSource.includes("10⁻³⁴") || contentSource.includes("10^-34") || contentSource.includes("10^{-34}"));
  console.log(`   2019 BIPM Kilogram Planck constant (6.62607015 × 10^-34 J·s): ${hasPlanck}`);

  // Check for W = mg
  const hasWmg = contentSource.includes("W = mg") || contentSource.includes("W = m");
  console.log(`   Gravitational weight formula (W = mg): ${hasWmg}`);

  // Check for 185.5 lb worked example
  const hasWorkedEx = contentSource.includes("185.5");
  console.log(`   185.5 lb worked example present: ${hasWorkedEx}`);

  // Check for FAQ
  const hasFaq = contentSource.includes("Frequently Asked Questions");
  console.log(`   FAQ present: ${hasFaq}`);

  console.log("\n=== AUDIT COMPLETE ===");
}

auditMassUIMetrology().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
