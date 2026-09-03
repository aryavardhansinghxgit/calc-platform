async function verifyConfidenceIntervalSSR() {
  const res = await fetch("http://localhost:3000/calculators/confidence-interval-calculator");
  console.log("HTTP Status:", res.status);
  const html = await res.text();

  console.log("HTML length:", html.length);
  console.log("Has H1:", html.includes("<h1"));
  console.log("Has Single Mean Suite:", html.includes("Single Population Mean Estimation Suite"));
  console.log("Has Master Action Toolbar:", html.includes("Export CSV") && html.includes("Print / Save PDF"));
  console.log("Has Interactive Chart:", html.includes("Interactive Shaded Probability Distribution Curve"));
  console.log("Has Wilson Score (Recommended):", html.includes("Wilson Score Interval"));
  console.log("Has Two Means Welch:", html.includes("Difference Between Two Independent Means"));
  console.log("Has Variance Chi-Square:", html.includes("Population Variance &amp; Standard Deviation CI") || html.includes("Population Variance & Standard Deviation CI"));
  console.log("Has Sample Size Link:", html.includes("/calculators/sample-size-calculator"));
  console.log("Has Z-Score Link:", html.includes("/calculators/z-score-calculator"));
  console.log("Has Std Dev Link:", html.includes("/calculators/standard-deviation-calculator"));
  console.log("No duplicate fallback FAQ:", !html.includes("How is the confidence interval calculated?"));
}

verifyConfidenceIntervalSSR();
