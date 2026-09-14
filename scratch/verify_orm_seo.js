const http = require('http');

async function verifySeo() {
  console.log("==========================================");
  console.log("ONE REP MAX CALCULATOR - SEO & CONTENT AUDIT");
  console.log("==========================================\n");

  const html = await new Promise((resolve, reject) => {
    http.get('http://localhost:3000/calculators/one-rep-max-calculator', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  let passes = 0;
  let failures = 0;

  function assert(condition, message) {
    if (condition) {
      passes++;
      console.log(`  ✓ PASS: ${message}`);
    } else {
      failures++;
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  // 1. Title Tag
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = (titleMatch ? titleMatch[1] : '').replace(/&amp;/g, '&');
  console.log(`Title: "${title}"`);
  assert(title.includes("One Rep Max Calculator (1RM): Estimate Your Max & Training Weights"), "Title matches exact SEO target");

  // 2. Meta Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const desc = (descMatch ? descMatch[1] : '').replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
  console.log(`Meta Description: "${desc}"`);
  assert(desc.includes("Calculate your estimated one-rep max from weight and reps using Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan and Lander formulas"), "Meta description matches exact SEO target");

  // 3. H1 Count & Content
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  assert(h1Matches.length === 1, `Single H1 on page (found: ${h1Matches.length})`);
  if (h1Matches.length === 1) {
    assert(h1Matches[0].includes("One Rep Max Calculator"), `H1 text contains 'One Rep Max Calculator'`);
  }

  // 4. Content Container Format (401(k) standard)
  assert(html.includes("rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7"), "Content uses 401(k) standard article container");

  // 5. Unfolded FAQs & FAQ Section
  const faqHeaderMatches = html.match(/Frequently Asked Questions/gi) || [];
  assert(faqHeaderMatches.length === 1, `Exactly one FAQ section header (found: ${faqHeaderMatches.length})`);
  assert(html.includes("24 Questions") || html.includes("24<!-- --> Questions"), "Displays '24 Questions' badge");
  assert(html.includes("What is a one-rep max?"), "FAQ 1 rendered in DOM");
  assert(html.includes("Is 1RM the same as strength?"), "FAQ 24 rendered in DOM");

  // 6. Related Calculators
  const relatedMatches = html.match(/RELATED CALCULATORS:/gi) || [];
  assert(relatedMatches.length === 2, `Exactly two Related Calculators placements (before & after content) (found: ${relatedMatches.length})`);

  // 7. Contextual Internal Anchor Links Inside Content
  assert(html.includes('href="/calculators/percentage-calculator"'), "Contains contextual internal link to Percentage Calculator");
  assert(html.includes('href="/calculators/target-heart-rate-calculator"'), "Contains contextual internal link to Target Heart Rate Calculator");
  assert(html.includes('href="/calculators/calories-burned-calculator"'), "Contains contextual internal link to Calories Burned Calculator");
  assert(html.includes('href="/calculators/body-fat-calculator"'), "Contains contextual internal link to Body Fat Calculator");

  // 8. Structured Data Schemas
  const ldJsonMatches = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  let hasFaqSchema = false;
  let hasAppSchema = false;
  let hasBreadcrumbSchema = false;
  for (const script of ldJsonMatches) {
    const raw = script.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const json = JSON.parse(raw);
      if (json['@type'] === 'FAQPage') hasFaqSchema = true;
      if (json['@type'] === 'SoftwareApplication') hasAppSchema = true;
      if (json['@type'] === 'BreadcrumbList') hasBreadcrumbSchema = true;
    } catch {}
  }
  assert(hasFaqSchema, "FAQPage JSON-LD schema present");
  assert(hasAppSchema, "SoftwareApplication JSON-LD schema present");
  assert(hasBreadcrumbSchema, "BreadcrumbList JSON-LD schema present");

  console.log("\n==========================================");
  console.log(`SEO AUDIT RESULT: ${passes} PASSED, ${failures} FAILED`);
  console.log("==========================================");
}

verifySeo();
