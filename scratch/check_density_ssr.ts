async function checkDensitySsr() {
  const url = "http://localhost:3000/calculators/density-calculator";
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    console.log(`HTTP Status: ${res.status}`);
    if (!res.ok) {
      console.error(`Fetch failed with status ${res.status}`);
      return;
    }
    const html = await res.text();
    console.log(`HTML length: ${html.length}`);
    console.log(`HTML snippet:\n${html.slice(0, 1000)}`);

    // 1. H1
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    console.log(`\nH1 Count: ${h1Matches.length}`);
    h1Matches.forEach((m, idx) => console.log(`  H1 [${idx + 1}]: ${m[1].trim()}`));

    // 2. Title and Meta Description
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NOT FOUND"}`);

    const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    console.log(`Meta Description: ${metaDescMatch ? metaDescMatch[1].trim() : "NOT FOUND"}`);

    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1].trim() : "NOT FOUND"}`);

    // 3. Search for leaks: NaN, Infinity, undefined, null
    const nanMatches = [...html.matchAll(/(>[^<]*\bNaN\b[^<]*<)/gi)];
    const infMatches = [...html.matchAll(/(>[^<]*\bInfinity\b[^<]*<)/gi)];
    const undefMatches = [...html.matchAll(/(>[^<]*\bundefined\b[^<]*<)/gi)];
    const nullMatches = [...html.matchAll(/(>[^<]*\bnull\b[^<]*<)/gi)];

    console.log(`\nVisible SSR Anomalies:`);
    console.log(`  Visible NaN matches: ${nanMatches.length}`);
    console.log(`  Visible Infinity matches: ${infMatches.length}`);
    console.log(`  Visible undefined matches: ${undefMatches.length}`);
    console.log(`  Visible null matches: ${nullMatches.length}`);

    // 4. Content check
    const hasEducationalContent = html.includes("Physical Definition of Density &amp; Fundamental Principles") || html.includes("Physical Definition of Density & Fundamental Principles");
    console.log(`\nEducational content present in SSR: ${hasEducationalContent}`);

    const hasWaterAnomaly = html.includes("Thermodynamic Anomaly: Water") || html.includes("Water&#x27;s Maximum Density at 3.98°C");
    console.log(`Water anomaly section in SSR: ${hasWaterAnomaly}`);

    const hasMaterialMatrix = html.includes("Material Density &amp; Specific Gravity Reference Matrix") || html.includes("Material Density & Specific Gravity Reference Matrix");
    console.log(`Material matrix in SSR: ${hasMaterialMatrix}`);

    const hasWorkedExample = html.includes("Step-by-Step Worked Calculation Examples");
    console.log(`Worked calculation examples in SSR: ${hasWorkedExample}`);

    // Check for raw LaTeX delimiters leaked in visible text
    const rawLatexMatch = html.match(/(\$\\[a-zA-Z]+|\$[a-zA-Z]\$)/g);
    console.log(`Raw LaTeX delimiter leaks: ${rawLatexMatch ? rawLatexMatch.length : 0}`);

  } catch (err) {
    console.error("Fetch error:", err);
  }
}

checkDensitySsr();
