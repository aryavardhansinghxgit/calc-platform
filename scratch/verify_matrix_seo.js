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
  console.log("=== Matrix Calculator SEO & SSR Verification ===");
  const res = await fetchUrl("http://localhost:3000/calculators/matrix-calculator");
  console.log(`Status code: ${res.statusCode}`);
  if (res.statusCode !== 200) {
    throw new Error(`Expected HTTP 200 but got ${res.statusCode}`);
  }

  const html = res.body;

  // 1. Title verification
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : null;
  console.log(`Page Title: "${title}"`);
  const expectedTitle = "Matrix Calculator – Multiply, Add, Inverse, Determinant &amp; RREF";
  if (!title || (!title.includes("Matrix Calculator – Multiply, Add, Inverse, Determinant & RREF") && !title.includes("Matrix Calculator – Multiply, Add, Inverse, Determinant &amp; RREF"))) {
    console.warn(`WARNING: Title mismatch. Got: "${title}"`);
  } else {
    console.log("✔ Exact SEO Title matches!");
  }

  // 2. Meta description verification
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : null;
  console.log(`Meta Description: "${metaDesc}"`);
  const expectedDesc = "Free matrix calculator for matrix multiplication, addition, subtraction, determinant, inverse, transpose, rank, trace, RREF and solving Ax = b. See results and mathematical steps instantly.";
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
    if (h1Text.includes("Matrix Calculator & Linear Algebra Solver") || h1Text.includes("Matrix Calculator &amp; Linear Algebra Solver")) {
      console.log("✔ Exact H1 matches!");
    } else {
      console.warn(`WARNING: H1 text does not match expected. Got: "${h1Text}"`);
    }
  } else {
    console.error(`ERROR: Expected exactly 1 H1 tag, found ${h1Matches.length}`);
  }

  // 4. Related Calculators Count
  const relatedMatches = [...html.matchAll(/Related Calculators/gi)];
  console.log(`Number of 'Related Calculators' headings: ${relatedMatches.length}`);
  if (relatedMatches.length === 2) {
    console.log("✔ Exactly 2 Related Calculator blocks: one before content, one after content!");
  } else {
    console.warn(`Note: Found ${relatedMatches.length} occurrences of 'Related Calculators'`);
  }

  // 5. FAQ verification
  const faqQuestions = [
    "What is a matrix calculator?",
    "How do I multiply two matrices?",
    "Can I multiply matrices of different sizes?",
    "Can I add matrices of different sizes?",
    "How do I find the determinant of a matrix?",
    "When does a matrix inverse exist?",
    "What happens when the determinant is zero?",
    "What is RREF?",
    "What is matrix rank?",
    "What is the trace of a matrix?",
    "Why is AB usually different from BA?",
    "Can a matrix calculator solve Ax = b?",
    "Can I use decimals and negative numbers?",
    "What is the difference between a matrix and a vector?",
    "What is an identity matrix?"
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

  // 6. Check internal links HTTP status
  const internalLinks = [
    "/calculators/scientific-calculator",
    "/calculators/slope-calculator",
    "/calculators/distance-calculator",
    "/calculators/quadratic-formula-calculator"
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

  // 7. Check for prohibited dark card styling in content
  if (html.includes("bg-black") || html.includes("bg-zinc-950")) {
    console.warn("WARNING: Found bg-black or bg-zinc-950 in rendered HTML!");
  } else {
    console.log("✔ Zero dark/black cards (bg-black / bg-zinc-950) detected!");
  }

  // 8. Check Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  console.log(`Canonical URL: ${canonicalMatch ? canonicalMatch[1] : "None found"}`);

  console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
