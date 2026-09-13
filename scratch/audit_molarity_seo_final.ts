import http from "http";

async function runSeoAudit() {
  console.log("=================================================");
  console.log("FINAL SEO AUDIT: MOLARITY CALCULATOR");
  console.log("=================================================");

  const html = await new Promise<string>((resolve, reject) => {
    http.get("http://localhost:3000/calculators/molarity-calculator", (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });

  let pass = true;
  function test(name: string, ok: boolean, details?: string) {
    if (ok) {
      console.log(`[PASS] ${name}`);
    } else {
      console.error(`[FAIL] ${name} ${details ? "- " + details : ""}`);
      pass = false;
    }
  }

  // 1. H1 count and text
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  test("Exactly 1 H1 tag", h1Matches.length === 1, `Found ${h1Matches.length}`);
  const h1Text = h1Matches[0] ? h1Matches[0].replace(/<[^>]+>/g, "").trim() : "";
  test("H1 text is 'Molarity Calculator'", h1Text === "Molarity Calculator", `Actual: "${h1Text}"`);

  // 2. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  test("Title contains 'Molarity Calculator – Mass, Volume, Molar Mass & Dilution'", title.includes("Molarity Calculator – Mass, Volume, Molar Mass &amp; Dilution") || title.includes("Molarity Calculator – Mass, Volume, Molar Mass & Dilution"), `Actual: "${title}"`);

  // 3. Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descMatch ? descMatch[1] : "";
  test("Meta description contains expected text", desc.includes("Calculate molarity, solute mass, solution volume and molar mass"), `Actual: "${desc}"`);

  // 4. Canonical
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonMatch ? canonMatch[1] : "";
  test("Canonical href points to molarity-calculator", canonical === "https://calcplatform.com/calculators/molarity-calculator", `Actual: "${canonical}"`);

  // 5. Contextual Internal Anchors
  const hasMolWeightAnchor = html.includes('href="/calculators/molecular-weight-calculator"') &&
                             html.includes("Molecular Weight Calculator");
  test("Contextual anchor for Molecular Weight Calculator exists", hasMolWeightAnchor);

  const hasDensityAnchor = html.includes('href="/calculators/density-calculator"') &&
                           html.includes("Density Calculator");
  test("Contextual anchor for Density Calculator exists", hasDensityAnchor);

  const hasPercentageAnchor = html.includes('href="/calculators/percentage-calculator"') &&
                              html.includes("Percentage Calculator");
  test("Contextual anchor for Percentage Calculator exists", hasPercentageAnchor);

  // 6. Related Calculators sections
  const relBlockCount = (html.match(/RELATED CALCULATORS:/gi) || []).length;
  test("Exactly 2 Related Calculators blocks in SSR", relBlockCount === 2, `Found ${relBlockCount}`);

  // Check no self-link in related calculator links
  const selfLinksInCards = (html.match(/href="\/calculators\/molarity-calculator"[^>]*class="[^"]*group/g) || []).length;
  test("No self-referential link in related calculator cards", selfLinksInCards === 0, `Found ${selfLinksInCards}`);

  // 7. FAQs in raw SSR HTML
  const faqQuestions = [
    "What is molarity?",
    "How do you calculate molarity from mass?",
    "How many grams of NaCl are needed for 500 mL of 0.25 M solution?",
    "What is the difference between molarity and molality?",
    "What is the dilution formula C₁V₁ = C₂V₂?",
    "Can I dilute a 1 M solution to make a 10 M solution?",
    "How do I convert mass percentage to molarity?",
    "Does molarity depend on temperature?",
    "How do hydrates affect molarity calculations?",
    "Can PPM be converted directly to molarity?",
    "What is normality?",
  ];

  let missingFaqs = 0;
  faqQuestions.forEach((q) => {
    // Escape special chars for checking
    const qClean = q.replace(/[₁₂]/g, "");
    if (!html.includes(q) && !html.includes(qClean)) {
      console.error(`Missing FAQ in SSR: ${q}`);
      missingFaqs++;
    }
  });
  test("All 11 FAQs present in server-rendered HTML", missingFaqs === 0, `Missing: ${missingFaqs}`);

  // Check answers are present in SSR HTML (unfolded)
  const has7305Answer = html.includes("7.305");
  test("FAQ answers rendered in SSR HTML (7.305 g)", has7305Answer);

  // 8. Corrupted tokens in visible HTML
  const bodyText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                       .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  test("No visible 'NaN'", !bodyText.includes("NaN"));
  test("No visible 'undefined'", !bodyText.includes("undefined"));
  test("No visible '[object Object]'", !bodyText.includes("[object Object]"));

  console.log("\n=================================================");
  if (pass) {
    console.log("ALL FINAL SEO AUDIT CHECKS PASSED!");
  } else {
    console.error("FAILURES ENCOUNTERED IN SEO AUDIT!");
  }
  console.log("=================================================");
}

runSeoAudit().catch(console.error);
