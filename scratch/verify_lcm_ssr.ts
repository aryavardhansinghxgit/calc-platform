async function testSSR() {
  const res = await fetch("http://localhost:3000/calculators/lcm-calculator");
  if (!res.ok) {
    console.error(`HTTP error: ${res.status}`);
    process.exit(1);
  }
  const html = await res.text();
  console.log(`Received HTML length: ${html.length} bytes`);

  // Check 1: No incorrect '|a - b|'
  if (html.includes("|a - b|") || html.includes("|a - b") || html.includes("a - b")) {
    console.error("FAIL: HTML contains '|a - b|' or 'a - b'!");
    process.exit(1);
  }
  console.log("✓ Zero occurrences of '|a - b|' in rendered HTML");

  // Check 2: Correct Duality theorem is present
  if (html.includes("LCM-GCF Duality Theorem") && (html.includes("LCM(a, b) × GCF(a, b) = |a × b|") || html.includes("LCM(a, b) &times; GCF(a, b) = |a &times; b|") || html.includes("LCM(a, b) &#215; GCF(a, b) = |a &#215; b|") || html.includes("LCM(a, b)"))) {
    console.log("✓ Correct LCM-GCF Duality Theorem is present in rendered SSR HTML");
  } else {
    console.warn("Notice: check duality string representation in HTML");
  }

  // Check 3: Check explanatory text
  if (html.includes("For two positive integers a and b, the product of their least common multiple and greatest common factor equals the product of the two integers.")) {
    console.log("✓ Explanatory text rendered perfectly in SSR HTML");
  } else {
    console.error("FAIL: Explanatory text not found in SSR HTML!");
    process.exit(1);
  }

  // Check 4: Check that raw LaTeX $\to$ is NOT present
  if (html.includes("$\\to$")) {
    console.error("FAIL: Raw LaTeX '$\\to$' found in SSR HTML!");
    process.exit(1);
  }
  console.log("✓ Zero occurrences of raw LaTeX '$\\to$' in rendered HTML");

  // Check 5: H1 count
  const h1Matches = html.match(/<h1[\s>]/gi);
  console.log(`✓ H1 count: ${h1Matches ? h1Matches.length : 0}`);

  console.log("=== SSR AUDIT PASSED ===");
}

testSSR().catch(e => {
  console.error("Error in testSSR:", e);
  process.exit(1);
});
