import http from "http";

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", reject);
  });
}

async function verify() {
  const url = "http://localhost:3000/calculators/big-number-calculator";
  console.log(`Fetching ${url}...`);
  const html = await fetchPage(url);

  console.log(`Page Length: ${html.length} bytes`);

  // Check Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  // Check Meta Description
  const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  // Check H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  console.log(`H1 count: ${h1Matches.length}`);
  h1Matches.forEach((m, idx) => {
    console.log(`  H1 [${idx + 1}]: ${m[1].trim().replace(/\s+/g, " ")}`);
  });

  // Check Canonical
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

  // Check H2 count
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  console.log(`H2 count: ${h2Matches.length}`);
  h2Matches.forEach((m, idx) => {
    console.log(`  H2 [${idx + 1}]: ${m[1].replace(/<[^>]+>/g, "").trim()}`);
  });

  // Check FAQ questions count
  const faqMatches = [...html.matchAll(/Q(?:<!-- -->)?(\d+)(?:<!-- -->)?\.\s*<\/span>\s*([^<]+)/g)];
  console.log(`FAQ matches count in DOM: ${faqMatches.length}`);
  faqMatches.slice(0, 5).forEach((m) => console.log(`  FAQ ${m[1]}: ${m[2].trim()}`));

  // Check Related Calculators occurrences
  const relatedMatches = [...html.matchAll(/RELATED CALCULATORS/gi)];
  console.log(`RELATED CALCULATORS header count: ${relatedMatches.length}`);

  // Check Dark / Black Card check
  const hasBlackCard = /bg-black|bg-zinc-950|bg-slate-950/.test(html);
  console.log("Has forbidden black cards (bg-black / bg-zinc-950 / bg-slate-950):", hasBlackCard);

  // Check In-body links
  const hasScientificLink = html.includes("/calculators/scientific-notation-calculator");
  const hasFactorLink = html.includes("/calculators/factor-calculator");
  const hasPermCombLink = html.includes("/calculators/permutation-combination-calculator");
  const hasGcfLink = html.includes("/calculators/gcf-calculator");
  const hasLcmLink = html.includes("/calculators/lcm-calculator");
  const hasRootLink = html.includes("/calculators/root-calculator");

  console.log("In-body links verified:", {
    hasScientificLink,
    hasFactorLink,
    hasPermCombLink,
    hasGcfLink,
    hasLcmLink,
    hasRootLink
  });

  // Check all 6 calculator modes present
  const hasArithmetic = html.includes("Arbitrary-Precision BigInt Arithmetic Engine");
  const hasModPow = html.includes("ModPow (Xʸ mod M)");
  const hasFactorial = html.includes("Factorials &amp; Combinatorics");
  const hasPrimality = html.includes("Miller-Rabin Primality");
  const hasGoogology = html.includes("Googology Presets");
  const hasDigitAnalytics = html.includes("Digit Inspector");

  console.log("6 Interactive modes present:", {
    hasArithmetic,
    hasModPow,
    hasFactorial,
    hasPrimality,
    hasGoogology,
    hasDigitAnalytics
  });
}

verify().catch(console.error);
