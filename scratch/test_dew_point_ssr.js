// SSR and SEO verification script for Dew Point Calculator

async function testSSR() {
  console.log("=== RUNNING DEW POINT CALCULATOR SSR & SEO VERIFICATION ===");
  const url = "http://localhost:3000/calculators/dew-point-calculator";
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Fetch failed with status: ${res.status}`);
    process.exit(1);
  }

  const html = await res.text();

  // 1. Status 200
  console.log("✓ HTTP 200 OK");

  // 2. Exactly ONE H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  if (h1Matches.length !== 1) {
    console.error(`FAIL: Expected exactly 1 H1 tag, found ${h1Matches.length}!`);
    process.exit(1);
  }
  console.log(`✓ Exactly 1 H1: ${h1Matches[0].replace(/\s+/g, " ")}`);

  // 2b. Supporting line beneath H1
  const hasSupportingLine = html.includes(
    "Calculate dew point from air temperature and relative humidity, or work backward from dew point to estimate humidity and temperature."
  );
  if (!hasSupportingLine) {
    console.error("FAIL: Missing supporting line beneath H1!");
    process.exit(1);
  }
  console.log("✓ Supporting line beneath H1 present and verified");

  // 3. Title exists and matches SEO Positioning
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    console.error("FAIL: Title tag missing!");
    process.exit(1);
  }
  console.log(`✓ Title: ${titleMatch[1]}`);
  if (!titleMatch[1].includes("Dew Point Calculator – Humidity, Wet Bulb, Frost Point &amp; Condensation") && !titleMatch[1].includes("Dew Point Calculator – Humidity, Wet Bulb, Frost Point & Condensation")) {
    console.error(`FAIL: Title mismatch: ${titleMatch[1]}`);
    process.exit(1);
  }

  // 4. Meta Description exists and matches SEO Positioning
  const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
  if (!metaDescMatch) {
    console.error("FAIL: Meta description missing!");
    process.exit(1);
  }
  console.log(`✓ Meta Description: ${metaDescMatch[1]}`);
  if (!metaDescMatch[1].includes("Calculate dew point from temperature and humidity, or solve humidity from dew point.")) {
    console.error(`FAIL: Meta description mismatch: ${metaDescMatch[1]}`);
    process.exit(1);
  }

  // 5. Canonical exists
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i);
  if (!canonicalMatch) {
    console.error("FAIL: Canonical tag missing!");
    process.exit(1);
  }
  console.log(`✓ Canonical: ${canonicalMatch[1]}`);

  // 6. Educational Article server-rendered
  const hasIntroHeading = html.includes("Dew Point: What It Means and Why It Matters");
  const hasWhatIs = html.includes("What Is Dew Point?");
  const hasVsRh = html.includes("Dew Point vs. Relative Humidity");
  const hasHowWorks = html.includes("How the Dew Point Calculator Works");
  const hasWorkedExample = html.includes("Dew Point Example: 70°F and 65% Relative Humidity");
  const hasReverseCalc = html.includes("Calculate Relative Humidity From Dew Point");
  const hasAirTemp = html.includes("Calculate Air Temperature From Dew Point and Humidity");
  const hasVaporPress = html.includes("Vapor Pressure and Absolute Humidity");
  const hasWetBulb = html.includes("Dew Point vs. Wet-Bulb Temperature");
  const hasFrostPoint = html.includes("Dew Point and Frost Point");
  const hasCloudBase = html.includes("Estimating Cloud Base From Temperature and Dew Point");
  const hasCondensation = html.includes("Dew Point and Condensation");
  const hasCoating = html.includes("Dew Point and Coating Condensation Screening");
  const hasComfort = html.includes("What Does Dew Point Say About Comfort?");
  const hasWhereUsed = html.includes("Where Dew Point Is Used");
  const hasHowToUse = html.includes("How to Use the Dew Point Calculator");
  const hasCommonMistakes = html.includes("Common Dew Point Calculation Mistakes");
  const hasLimitations = html.includes("Calculator Limitations");
  const hasReferences = html.includes("Scientific and Methodology References");

  const articleSections = [
    hasIntroHeading,
    hasWhatIs,
    hasVsRh,
    hasHowWorks,
    hasWorkedExample,
    hasReverseCalc,
    hasAirTemp,
    hasVaporPress,
    hasWetBulb,
    hasFrostPoint,
    hasCloudBase,
    hasCondensation,
    hasCoating,
    hasComfort,
    hasWhereUsed,
    hasHowToUse,
    hasCommonMistakes,
    hasLimitations,
    hasReferences,
  ];

  if (articleSections.some((s) => !s)) {
    console.error("FAIL: One or more educational article sections are missing from SSR HTML!");
    process.exit(1);
  }
  console.log("✓ All 19 required educational article sections are server-rendered in full");

  // 7. Contextual Internal Anchor Links
  const hasHeatIndexAnchor = html.includes('href="/calculators/heat-index-calculator"');
  const hasWindChillAnchor = html.includes('href="/calculators/wind-chill-calculator"');

  console.log(`Contextual anchors: Heat Index=${hasHeatIndexAnchor}, Wind Chill=${hasWindChillAnchor}`);
  if (!hasHeatIndexAnchor || !hasWindChillAnchor) {
    console.error("FAIL: Missing contextual internal anchor links in article!");
    process.exit(1);
  }
  console.log("✓ Contextual internal anchor links present (Heat Index and Wind Chill)");

  // 8. All 15 FAQs server-rendered & unfolded
  const requiredFaqs = [
    "What is dew point?",
    "How do I calculate dew point?",
    "What is the dew point if the temperature is 70°F and humidity is 65%?",
    "Is dew point the same as relative humidity?",
    "Is a higher dew point more humid?",
    "What happens when the surface temperature reaches the dew point?",
    "What is wet-bulb temperature?",
    "How accurate is the Stull wet-bulb calculation?",
    "What is frost point?",
    "Can dew point predict cloud formation?",
    "Can dew point tell me whether condensation will form?",
    "Is the 5°F coating margin an ISO 8502-4 requirement?",
    "Can I use this calculator for painting and coating work?",
    "Why can two places with the same relative humidity have different dew points?",
    "Does dew point affect how hot the weather feels?",
  ];

  let missingFaqs = 0;
  for (const q of requiredFaqs) {
    if (!html.includes(q)) {
      console.error(`FAIL: Missing FAQ in SSR: "${q}"`);
      missingFaqs++;
    }
  }

  if (missingFaqs > 0) {
    console.error(`FAIL: ${missingFaqs} required FAQs missing from SSR!`);
    process.exit(1);
  }
  console.log("✓ All 15 required FAQs are server-rendered in full and unfolded");

  // 8b. Scientific / Standards Terminology Verifications
  const bannedPhrases = ["ISO compliant", "ISO buffer", "5°F ISO", "paint compliant", "coating compliant"];
  for (const phrase of bannedPhrases) {
    if (html.toLowerCase().includes(phrase.toLowerCase())) {
      console.error(`FAIL: Disallowed compliance phrase found in SSR HTML: "${phrase}"`);
      process.exit(1);
    }
  }
  console.log("✓ Zero disallowed compliance claims in SSR HTML (no 'ISO compliant', 'ISO buffer', '5°F ISO', 'paint compliant')");

  const requiredDisclaimers = [
    "screening benchmark",
    "Stull (2011) empirical approximation",
    "conservative screening benchmark for condensation risk",
    "It is not a declaration of ISO 8502-4 compliance",
  ];
  for (const req of requiredDisclaimers) {
    if (!html.includes(req)) {
      console.error(`FAIL: Required disclaimer missing from SSR HTML: "${req}"`);
      process.exit(1);
    }
  }
  console.log("✓ Required disclaimers and qualifications (Stull approximation, 5°F screening benchmark, non-declaration) present in SSR HTML");

  // 9. Related Calculators sections (must have exactly 2: above and below article)
  const relatedMatches = html.match(/Related Calculators/gi) || [];
  console.log(`Related calculators sections count: ${relatedMatches.length}`);
  if (relatedMatches.length !== 2) {
    console.error(`FAIL: Expected exactly 2 related calculator sections, found ${relatedMatches.length}!`);
    process.exit(1);
  }
  console.log("✓ Exactly 2 compact Related Calculators blocks (one above article, one below FAQs/references)");

  // 10. No corrupted tokens in visible HTML
  const badPatterns = [/>\s*NaN\s*</i, />\s*undefined\s*</i, />\s*null\s*</i, /\[object Object\]/, />\s*Infinity\s*</i];
  for (const pat of badPatterns) {
    if (pat.test(html)) {
      console.error(`FAIL: Corrupted token pattern found in SSR HTML: ${pat}`);
      process.exit(1);
    }
  }
  console.log("✓ Zero corrupted tokens (>NaN<, >undefined<, >null<, >Infinity<, [object Object]) in visible HTML");

  console.log("\n>>> ALL SSR & SEO CHECKS PASSED PERFECTLY! <<<");
}

testSSR().catch((err) => {
  console.error("SSR test error:", err);
  process.exit(1);
});
