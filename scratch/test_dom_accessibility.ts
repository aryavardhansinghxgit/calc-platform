async function testDom() {
  const res = await fetch('http://localhost:3000/calculators/half-life-calculator');
  const html = await res.text();

  console.log("=== DOM & ACCESSIBILITY AUDIT ===");

  const expectedIds = [
    "hl-isotope-preset",
    "hl-solve-target",
    "hl-qty-unit",
    "hl-initial-qty",
    "hl-remaining-qty",
    "hl-half-life-val",
    "hl-half-life-unit",
    "hl-elapsed-time-val",
    "hl-elapsed-time-unit",
    "hl-conv-half-life-val",
    "hl-conv-half-life-unit"
  ];

  for (const id of expectedIds) {
    const hasId = html.includes(`id="${id}"`);
    const hasLabel = html.includes(`for="${id}"`) || html.includes(`htmlFor="${id}"`) || html.includes(`aria-label=`);
    console.log(`ID [${id}]:`, hasId ? "PRESENT" : "MISSING", "| Associated label/aria:", hasLabel ? "YES" : "NO");
  }

  console.log("\n=== PRINT UTILITY AUDIT ===");
  const noPrintCount = (html.match(/no-print/g) || []).length;
  console.log("no-print occurrences:", noPrintCount);

  const breakInsideCount = (html.match(/break-inside/g) || []).length;
  console.log("break-inside occurrences:", breakInsideCount);

  console.log("\n=== ACTIONS & CONTENT AUDIT ===");
  console.log("Copy Result button:", html.includes("Copy Result") ? "PRESENT" : "MISSING");
  console.log("Copy LaTeX button:", html.includes("Copy LaTeX") ? "PRESENT" : "MISSING");
  console.log("Cobalt-60 in content table:", html.includes("Cobalt-60") ? "PRESENT" : "MISSING");
  console.log("Potassium-40 in content table:", html.includes("Potassium-40") ? "PRESENT" : "MISSING");
}

testDom();
