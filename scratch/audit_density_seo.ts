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
  console.log("Fetching http://localhost:3000/calculators/density-calculator ...");
  const html = await fetchUrl("http://localhost:3000/calculators/density-calculator");

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
    pass: h1Matches.length === 1 && h1Texts[0] === "Density Calculator",
    details: `Found ${h1Matches.length} H1(s): ${JSON.stringify(h1Texts)}`,
  });

  // 3. Title check
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? titleMatch[1].trim() : "";
  const decodedTitle = titleText.replace(/&amp;/g, "&");
  const expectedTitle = "Density Calculator – Density, Mass, Volume & Specific Gravity";
  results.push({
    test: "Title tag matches exact requirement",
    pass: decodedTitle.includes(expectedTitle),
    details: `Title: ${titleText} (Decoded: ${decodedTitle})`,
  });

  // 4. Meta description check
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : "";
  const expectedDesc = "Calculate density, mass, or volume from ρ = m/V. Convert density units, compare specific gravity, test buoyancy, calculate gas density and hydrostatic pressure.";
  results.push({
    test: "Meta description matches exact requirement",
    pass: metaDesc === expectedDesc,
    details: `Meta description: ${metaDesc}`,
  });

  // 5. Canonical check
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                         html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : "";
  const expectedCanonical = "https://calcplatform.com/calculators/density-calculator";
  results.push({
    test: "Canonical URL matches exact requirement",
    pass: canonical === expectedCanonical,
    details: `Canonical: ${canonical}`,
  });

  // 6. OpenGraph title & description
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  const decodedOgTitle = ogTitleMatch ? ogTitleMatch[1].replace(/&amp;/g, "&") : "";
  results.push({
    test: "OG Title matches requirement",
    pass: !!ogTitleMatch && decodedOgTitle.includes("Density Calculator – Mass, Volume, Specific Gravity & Buoyancy"),
    details: `OG Title: ${ogTitleMatch ? ogTitleMatch[1] : "NOT FOUND"} (Decoded: ${decodedOgTitle})`,
  });
  results.push({
    test: "OG Description matches requirement",
    pass: !!ogDescMatch && ogDescMatch[1].includes("Calculate density from mass and volume, find mass or volume, convert density units"),
    details: `OG Description: ${ogDescMatch ? ogDescMatch[1] : "NOT FOUND"}`,
  });

  // 7. Related Calculators blocks
  const relatedMatches = html.match(/RELATED CALCULATORS/gi) || [];
  results.push({
    test: "Related Calculators block count is exactly 2",
    pass: relatedMatches.length === 2,
    details: `Found ${relatedMatches.length} 'RELATED CALCULATORS' string(s)`,
  });

  // 8. Unfolded FAQ: Check all 25 FAQs in SSR HTML
  const faqQuestions = [
    "What is the formula for density?",
    "How do I calculate density from mass and volume?",
    "How do I calculate mass from density?",
    "How do I calculate volume from density?",
    "What is the SI unit of density?",
    "How many kg/m³ is 1 g/cm³?",
    "Is g/mL the same as g/cm³?",
    "What is specific gravity?",
    "What is the specific gravity of water?",
    "Why does ice float?",
    "What is the density of water?",
    "Why is water densest around 4°C?",
    "What is the density of air at 20°C?",
    "What is the ideal-gas density formula?",
    "What happens to gas density when pressure increases?",
    "What happens to gas density when temperature increases?",
    "What is hydrostatic pressure?",
    "What is the pressure 10 m underwater?",
    "What is API gravity?",
    "Is API gravity the same as specific gravity?",
    "Can density change?",
    "Does the calculator's material density represent an exact laboratory value?",
    "Why does my density result differ from another calculator?",
    "Can density be zero?",
    "Can density be negative?",
  ];

  let missingFaqs: string[] = [];
  for (const q of faqQuestions) {
    if (!html.includes(q)) {
      missingFaqs.push(q);
    }
  }
  results.push({
    test: "All 25 FAQs present in SSR HTML",
    pass: missingFaqs.length === 0,
    details: missingFaqs.length === 0 ? "All 25 FAQs present in SSR HTML" : `Missing: ${JSON.stringify(missingFaqs)}`,
  });

  // Check JSON-LD schema
  const ldJsonMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  let faqSchemaFound = false;
  let faqSchemaCount = 0;
  for (const block of ldJsonMatches) {
    const rawJson = block.replace(/<[^>]+>/g, "");
    try {
      const parsed = JSON.parse(rawJson);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item["@type"] === "FAQPage") {
            faqSchemaFound = true;
            faqSchemaCount = item.mainEntity?.length || 0;
          }
        }
      } else if (parsed["@type"] === "FAQPage") {
        faqSchemaFound = true;
        faqSchemaCount = parsed.mainEntity?.length || 0;
      }
    } catch {}
  }
  results.push({
    test: "JSON-LD FAQPage schema matches all 25 FAQs",
    pass: faqSchemaFound && faqSchemaCount === 25,
    details: `FAQPage schema found: ${faqSchemaFound}, question count: ${faqSchemaCount}`,
  });

  // 9. Contextual internal anchor links
  const massCalcLink = html.includes('href="/calculators/mass-calculator"');
  const convCalcLink = html.includes('href="/calculators/conversion-calculator"');
  const weightCalcLink = html.includes('href="/calculators/weight-calculator"');
  results.push({
    test: "Contextual anchor links present (/calculators/mass-calculator, /conversion-calculator, /weight-calculator)",
    pass: massCalcLink && convCalcLink && weightCalcLink,
    details: `Mass: ${massCalcLink}, Conversion: ${convCalcLink}, Weight: ${weightCalcLink}`,
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

  // 11. Check section numbering 1 to 23
  const sectionHeaders = [
    "1. What Is Density?",
    "2. Density Formula: ρ = m / V",
    "3. How to Calculate Mass From Density and Volume",
    "4. How to Calculate Volume From Mass and Density",
    "5. Why Density Units Matter",
    "6. Density Conversion Reference",
    "7. Worked Example: 8,900 kg/m³",
    "8. Density, Specific Gravity and Relative Density",
    "9. Density and Buoyancy",
    "10. Understanding the Buoyancy Visualization",
    "11. Material Density: Why Reference Values Vary",
    "12. Common Material Density Examples",
    "13. Water Density Is Temperature-Dependent",
    "14. Gas Density and the Ideal Gas Law",
    "15. Worked Air-Density Example",
    "16. Hydrostatic Pressure From Density and Depth",
    "17. API Gravity",
    "18. Mass Density and Dimensional Analysis",
    "19. How to Use the Density Calculator",
    "20. Common Density Calculation Mistakes",
    "21. Density Calculator Accuracy and Limitations",
    "22. Frequently Asked Questions",
    "23. Standards and References",
  ];
  let missingSections: string[] = [];
  for (const s of sectionHeaders) {
    if (!html.includes(s)) {
      missingSections.push(s);
    }
  }
  results.push({
    test: "All 23 sections present in sequence",
    pass: missingSections.length === 0,
    details: missingSections.length === 0 ? "All 23 sections verified" : `Missing: ${JSON.stringify(missingSections)}`,
  });

  // Print Summary
  console.log("\n=================== SEO AUDIT RESULTS ===================");
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
