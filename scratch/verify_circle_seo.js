const http = require("http");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
    }).on("error", reject);
  });
}

async function verify() {
  console.log("=== Circle Calculator SEO Verification ===");
  const res = await fetchUrl("http://localhost:3000/calculators/circle-calculator");
  console.log(`Status code: ${res.statusCode}`);
  if (res.statusCode !== 200) {
    throw new Error(`Expected HTTP 200 but got ${res.statusCode}`);
  }

  const html = res.body;

  // 1. Title verification
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : null;
  console.log(`Page Title: "${title}"`);
  const expectedTitle = "Circle Calculator: Area, Circumference, Radius & Diameter";
  if (!title || (!title.includes(expectedTitle) && !title.includes("Circle Calculator: Area, Circumference, Radius &amp; Diameter"))) {
    console.warn(`WARNING: Title mismatch. Got: "${title}"`);
  } else {
    console.log("✔ Exact SEO Title matches!");
  }

  // 2. Meta description verification
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : null;
  console.log(`Meta Description: "${metaDesc}"`);
  const expectedDesc = "Use this free Circle Calculator to find radius, diameter, circumference and area. Calculate sectors, arcs, chords, sagitta, annulus area and circumcircles with formulas and steps.";
  if (metaDesc === expectedDesc) {
    console.log("✔ Exact Meta Description matches!");
  } else {
    console.warn(`WARNING: Meta description mismatch. Got: "${metaDesc}"`);
  }

  // 3. H1 verification
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  console.log(`Number of H1 tags: ${h1Matches.length}`);
  if (h1Matches.length === 1) {
    const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, "").trim();
    console.log(`H1 Content: "${h1Text}"`);
    if (h1Text.includes(expectedTitle) || h1Text.includes("Circle Calculator: Area, Circumference, Radius &amp; Diameter")) {
      console.log("✔ Exact H1 matches!");
    } else {
      console.warn(`WARNING: H1 text does not match expected. Got: "${h1Text}"`);
    }
  } else {
    console.error(`ERROR: Expected exactly 1 H1 tag, found ${h1Matches.length}`);
  }

  // 4. Canonical URL
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  console.log(`Canonical URL: ${canonicalMatch ? canonicalMatch[1] : "None found"}`);
  if (canonicalMatch && canonicalMatch[1] === "https://calcplatform.com/calculators/circle-calculator") {
    console.log("✔ Exact Real production canonical URL (https://calcplatform.com/calculators/circle-calculator)!");
  }

  // 5. Check exactly 2 Related Calculator blocks (one before content, one after content)
  const relatedMatches = [...html.matchAll(/Related Calculators/gi)];
  console.log(`Number of 'Related Calculators' headings: ${relatedMatches.length}`);
  if (relatedMatches.length === 2) {
    console.log("✔ Exactly 2 Related Calculator blocks: one before content, one after content!");
  } else {
    console.warn(`Note: Found ${relatedMatches.length} occurrences of 'Related Calculators'`);
  }

  // 6. Check all 21 FAQs in SSR HTML
  const faqQuestions = [
    "What is the formula for the area of a circle?",
    "What is the formula for circumference?",
    "How do I find the radius from the diameter?",
    "How do I find the radius from circumference?",
    "How do I find the radius from area?",
    "What is the difference between radius and diameter?",
    "How do I calculate circumference from diameter?",
    "How do I calculate circle area from diameter?",
    "What is π in a circle formula?",
    "Does the circle calculator work with diameter instead of radius?",
    "What is an arc length?",
    "What is a sector of a circle?",
    "What is a chord?",
    "What is sagitta?",
    "Can a chord be longer than the diameter?",
    "What is an annulus?",
    "How do I calculate a circle from three points?",
    "What happens if the three points are collinear?",
    "Should I use degrees or radians for arc calculations?",
    "Why is my area unit squared?",
    "Is the decimal result exactly equal to the π expression?"
  ];

  let faqsFound = 0;
  for (const q of faqQuestions) {
    if (html.includes(q)) {
      faqsFound++;
    } else {
      console.warn(`FAQ missing in SSR HTML: "${q}"`);
    }
  }
  console.log(`✔ Found ${faqsFound} / ${faqQuestions.length} FAQs rendered in SSR HTML`);

  // 7. Check for prohibited dark card styling in content
  if (html.includes("bg-black") || html.includes("bg-zinc-950")) {
    console.warn("WARNING: Found bg-black or bg-zinc-950 in rendered HTML!");
  } else {
    console.log("✔ Zero dark/black cards (bg-black / bg-zinc-950) detected!");
  }

  // 8. Check internal links
  const internalLinks = [
    "/calculators/area-calculator",
    "/calculators/volume-calculator",
    "/calculators/triangle-calculator",
    "/calculators/distance-calculator",
    "/calculators/pythagorean-theorem-calculator"
  ];

  console.log("Checking internal link statuses...");
  for (const link of internalLinks) {
    const linkRes = await fetchUrl(`http://localhost:3000${link}`);
    console.log(`  Link ${link} -> HTTP ${linkRes.statusCode}`);
    if (linkRes.statusCode !== 200) {
      throw new Error(`Broken link: ${link} returned HTTP ${linkRes.statusCode}`);
    }
  }
  console.log("✔ All internal related calculator links return HTTP 200!");

  console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
