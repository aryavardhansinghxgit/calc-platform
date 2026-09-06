const http = require("http");

http.get("http://localhost:3000/calculators/square-footage-calculator", (res) => {
  console.log("Status Code:", res.statusCode);
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    console.log("=== SEO & SSR POST-IMPLEMENTATION AUDIT ===");
    console.log("HTML Length:", data.length);

    // 1. Status Code
    console.log("HTTP Status 200:", res.statusCode === 200 ? "PASS" : "FAIL");

    // 2. Exactly one H1
    const h1Matches = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log("H1 Count:", h1Matches.length, h1Matches.length === 1 ? "PASS" : "FAIL");
    if (h1Matches.length > 0) {
      console.log("H1 Content:", h1Matches[0].replace(/<[^>]+>/g, "").trim());
    }

    // 3. Canonical tag
    const canonicalMatch = data.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
    console.log("Canonical Present:", !!canonicalMatch ? "PASS" : "FAIL", canonicalMatch ? canonicalMatch[0] : "NONE");

    // 4. Title tag
    const titleMatch = data.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log("Title Present:", !!titleMatch ? "PASS" : "FAIL", titleMatch ? titleMatch[1] : "NONE");

    // 5. Meta description
    const metaDescMatch = data.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i);
    console.log("Meta Description:", !!metaDescMatch ? "PASS" : "FAIL", metaDescMatch ? metaDescMatch[1] : "NONE");

    // 6. Educational content in SSR
    const hasIntro = data.includes("Understanding Square Footage");
    const hasHowTo = data.includes("How to Calculate Square Feet");
    const hasDisclaimer = data.includes("Construction Estimating &amp; Engineering Disclaimer") || data.includes("Construction Estimating & Engineering Disclaimer");
    console.log("Educational Content (Understanding Square Footage):", hasIntro ? "PASS" : "FAIL");
    console.log("Educational Content (How to Calculate Square Feet):", hasHowTo ? "PASS" : "FAIL");
    console.log("Educational Content (Disclaimer):", hasDisclaimer ? "PASS" : "FAIL");

    // 7. Related Calculators blocks (should be exactly 2: above and after content)
    const relatedMatches = data.match(/Related Calculators/gi) || [];
    console.log("Related Calculators blocks count:", relatedMatches.length, relatedMatches.length === 2 ? "PASS (Exact 2 blocks)" : `COUNT: ${relatedMatches.length}`);

    // 8. Contextual links inside content
    const hasTileLink = data.includes('href="/calculators/tile-calculator"') && data.includes("tile calculator");
    const hasRoofingLink = data.includes('href="/calculators/roofing-calculator"') && data.includes("roofing calculator");
    console.log("Contextual anchor (tile calculator):", hasTileLink ? "PASS" : "FAIL");
    console.log("Contextual anchor (roofing calculator):", hasRoofingLink ? "PASS" : "FAIL");

    // 9. Raw LaTeX leakage in educational content
    const latexDollar = data.match(/\$A_[12]\$/g);
    const latexTimes = data.match(/\\times/g);
    const latexDots = data.match(/\\dots|\\cdots/g);
    console.log("Raw LaTeX $ leakage:", latexDollar ? "FAIL" : "PASS (0 found)");
    console.log("Raw LaTeX \\times leakage:", latexTimes ? "FAIL" : "PASS (0 found)");
    console.log("Raw LaTeX \\dots leakage:", latexDots ? "FAIL" : "PASS (0 found)");

    // 10. FAQs rendered and unfolded
    const faqQ1 = data.includes("How do I calculate square feet?");
    const faqQ15 = data.includes("Can I calculate irregular areas with a square footage calculator?");
    console.log("FAQ Q1 present:", faqQ1 ? "PASS" : "FAIL");
    console.log("FAQ Q15 present:", faqQ15 ? "PASS" : "FAIL");
  });
}).on("error", (err) => {
  console.error("Error fetching page:", err.message);
});
