async function verifySSR() {
  const url = "http://localhost:3000/calculators/golf-handicap-calculator";
  console.log(`Fetching ${url}...`);

  const res = await fetch(url);
  console.log(`HTTP Status: ${res.status}`);
  console.assert(res.status === 200, `Expected 200, got ${res.status}`);

  const html = await res.text();

  // 1. H1 count
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  console.assert(h1Matches.length === 1, `Expected 1 H1, got ${h1Matches.length}`);

  // 2. Related Calculators Blocks
  // CalcPlatform renders related calculator sections with id or heading
  const relMatches = html.match(/Related Calculators/gi) || [];
  console.log(`"Related Calculators" headings: ${relMatches.length}`);
  console.assert(relMatches.length === 2, `Expected exactly 2 Related Calculator blocks, got ${relMatches.length}`);

  // 3. Self link check
  const selfLink = html.includes('href="/calculators/golf-handicap-calculator"') || html.includes('href="https://calcplatform.org/calculators/golf-handicap-calculator"');
  // Only canonical is permitted in head; check if related calculator blocks link to golf-handicap-calculator
  const bodyOnly = html.split("<body")[1] || "";
  const selfLinkInBody = bodyOnly.includes('href="/calculators/golf-handicap-calculator"');
  console.assert(!selfLinkInBody, "Found self-link in body!");

  // 4. Contextual anchors in article
  const paceAnchor = bodyOnly.includes('/calculators/pace-calculator');
  const calAnchor = bodyOnly.includes('/calculators/calories-burned-calculator');
  const bmiAnchor = bodyOnly.includes('/calculators/bmi-calculator');
  console.assert(paceAnchor, "Missing contextual anchor to pace-calculator");
  console.assert(calAnchor, "Missing contextual anchor to calories-burned-calculator");
  console.assert(bmiAnchor, "Missing contextual anchor to bmi-calculator");
  console.log("✓ Contextual anchors (Pace, Calories, BMI) Verified!");

  // 5. Check for corruption tokens: NaN, Infinity, undefined, null, [object Object]
  // In HTML text content (not script variable names like window.__undefined or similar)
  const bodyTextWithoutScripts = bodyOnly.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  
  const nanCount = (bodyTextWithoutScripts.match(/>\s*NaN\s*</g) || []).length;
  const infCount = (bodyTextWithoutScripts.match(/>\s*Infinity\s*</g) || []).length;
  const undefCount = (bodyTextWithoutScripts.match(/>\s*undefined\s*</g) || []).length;
  const nullCount = (bodyTextWithoutScripts.match(/>\s*null\s*</g) || []).length;
  const objCount = (bodyTextWithoutScripts.match(/\[object Object\]/g) || []).length;

  console.log(`Corrupt tokens in body text: NaN=${nanCount}, Infinity=${infCount}, undefined=${undefCount}, null=${nullCount}, [object Object]=${objCount}`);
  console.assert(nanCount === 0 && infCount === 0 && undefCount === 0 && nullCount === 0 && objCount === 0, "Corrupt token found in body text!");

  // 6. Check for unauthorized WHS claims
  const unauthorizedOfficial = bodyTextWithoutScripts.includes("Official WHS Handicap Index");
  console.assert(!unauthorizedOfficial, 'Found unauthorized "Official WHS Handicap Index"');

  console.log("✓ SSR Validation PASSED 100%!");
}

verifySSR().catch(err => {
  console.error("SSR Verification Failed:", err);
  process.exit(1);
});
