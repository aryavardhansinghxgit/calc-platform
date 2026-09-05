const http = require("http");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

async function verifySEO() {
  console.log("=== Surface Area Calculator SEO Verification ===");
  const url = "http://localhost:3000/calculators/surface-area-calculator";
  const { status, data: html } = await fetchUrl(url);

  console.log(`Status code: ${status}`);
  if (status !== 200) {
    throw new Error(`Expected HTTP 200, got ${status}`);
  }

  // 1. Page Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : "";
  console.log(`Page Title: "${title}"`);
  if (title.includes("Surface Area Calculator – 3D Shapes, Solids &amp; Surface Area") || title.includes("Surface Area Calculator – 3D Shapes, Solids & Surface Area")) {
    console.log("✔ Target SEO Title matches!");
  } else {
    console.error("FAIL: Title mismatch!");
    process.exit(1);
  }

  // 2. Meta Description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const desc = descMatch ? descMatch[1] : "";
  console.log(`Meta Description: "${desc}"`);
  if (desc.includes("Calculate surface area for spheres, hemispheres, cones, frustums, cylinders, pipes, cubes, prisms, pyramids, capsules and ellipsoids. Includes formulas and unit conversions.")) {
    console.log("✔ Exact Meta Description matches!");
  } else {
    console.error("FAIL: Meta description mismatch!");
    process.exit(1);
  }

  // 3. Single H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log(`Number of H1 tags: ${h1Matches ? h1Matches.length : 0}`);
  if (!h1Matches || h1Matches.length !== 1) {
    console.error("FAIL: Expected exactly 1 H1 tag!");
    process.exit(1);
  }
  const h1Content = h1Matches[0].replace(/<[^>]*>/g, "").trim();
  console.log(`H1 Content: "${h1Content}"`);
  if (h1Content.includes("Surface Area Calculator & 3D Solids Net Suite") || h1Content.includes("Surface Area Calculator &amp; 3D Solids Net Suite")) {
    console.log("✔ Exact H1 matches!");
  } else {
    console.error("FAIL: H1 content mismatch!");
    process.exit(1);
  }

  // 4. Canonical URL
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : "";
  console.log(`Canonical URL: ${canonical}`);
  if (canonical === "https://calcplatform.com/calculators/surface-area-calculator") {
    console.log("✔ Exact Real production canonical URL (https://calcplatform.com/calculators/surface-area-calculator)!");
  } else {
    console.error("FAIL: Canonical URL mismatch!");
    process.exit(1);
  }

  // 5. Related Calculator Blocks
  const quickAccessCount = (html.match(/Related Calculators:/g) || []).length;
  const exploreCount = (html.match(/Explore Related Calculators/g) || []).length;
  console.log(`Quick Access blocks: ${quickAccessCount}, Explore blocks: ${exploreCount}`);
  if (quickAccessCount === 1 && exploreCount === 1) {
    console.log("✔ Exactly 2 Related Calculator blocks: one before content, one after content!");
  } else {
    console.error("FAIL: Duplicate or missing related calculator blocks!");
    process.exit(1);
  }

  // 6. FAQs (17 FAQs rendered and visible in HTML)
  const faqQuestions = [
    "What is a surface area calculator?",
    "How do I calculate surface area?",
    "What is the formula for surface area of a sphere?",
    "What is the formula for surface area of a cylinder?",
    "What is the surface area of a cone?",
    "What is the difference between total and lateral surface area?",
    "How do I calculate the surface area of a cube?",
    "How do I calculate the surface area of a rectangular prism?",
    "What is the surface area of a hemisphere?",
    "How is the surface area of a hollow pipe calculated?",
    "Can I calculate the surface area of a conical frustum?",
    "Is ellipsoid surface area exact?",
    "What units does surface area use?",
    "Why can surface area and volume have similar-looking formulas but different units?",
    "Can I save my surface area calculations?",
    "Can I export a surface area calculation?",
    "How does the square pyramid slant height differ from vertical height?"
  ];

  let faqsFound = 0;
  for (const q of faqQuestions) {
    if (html.includes(q)) {
      faqsFound++;
    } else {
      console.error(`Missing FAQ question: "${q}"`);
    }
  }
  console.log(`✔ Found ${faqsFound} / ${faqQuestions.length} FAQs rendered in SSR HTML`);
  if (faqsFound !== faqQuestions.length) {
    console.error("FAIL: Not all FAQs were rendered!");
    process.exit(1);
  }

  // 7. Check for Zero Dark / Black Cards
  const hasDarkCards = html.includes("bg-black") || html.includes("bg-zinc-950");
  if (!hasDarkCards) {
    console.log("✔ Zero dark/black cards (bg-black / bg-zinc-950) detected!");
  } else {
    console.error("FAIL: Dark/black cards found in HTML!");
    process.exit(1);
  }

  // 8. Verify Internal Links Status
  const internalLinks = [
    "/calculators/volume-calculator",
    "/calculators/area-calculator",
    "/calculators/circle-calculator"
  ];
  console.log("Checking internal link statuses...");
  for (const link of internalLinks) {
    const res = await fetchUrl(`http://localhost:3000${link}`);
    console.log(`  Link ${link} -> HTTP ${res.status}`);
    if (res.status !== 200) {
      console.error(`FAIL: Broken internal link: ${link}`);
      process.exit(1);
    }
  }
  console.log("✔ All internal related calculator links return HTTP 200!");

  console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
}

verifySEO().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
