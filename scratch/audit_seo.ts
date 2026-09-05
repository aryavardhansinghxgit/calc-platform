async function auditSeo() {
  try {
    const res = await fetch("http://localhost:3000/calculators/root-calculator");
    console.log("HTTP STATUS:", res.status);
    const html = await res.text();

    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gis) || [];
    console.log("H1 COUNT:", h1Matches.length);
    console.log("H1 TEXT:", h1Matches.map(h => h.replace(/<[^>]+>/g, "").trim()));

    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    console.log("TITLE:", titleMatch ? titleMatch[1] : "NONE");

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    console.log("META DESC:", descMatch ? descMatch[1] : "NONE");

    console.log("RELATED CALCULATORS BLOCK PRESENT:", html.includes("RELATED CALCULATORS:"));
    console.log("SECTION 1 INTRO PRESENT:", html.includes("1. Introduction to Roots, Radicals, and the Root Calculator"));
    console.log("REFERENCE TABLE PRESENT:", html.includes("Core Operations &amp; Radical Reference Table") || html.includes("Core Operations & Radical Reference Table"));
    console.log("SECTION 20 FAQ PRESENT:", html.includes("20. Frequently Asked Questions"));
    console.log("SECTION 21 FINAL TAKEAWAY PRESENT:", html.includes("21. Final Takeaway"));
    console.log("ALL 4 CONTEXTUAL LINKS PRESENT:", 
      html.includes("/calculators/exponent-calculator") &&
      html.includes("/calculators/scientific-calculator") &&
      html.includes("/calculators/factor-calculator") &&
      html.includes("/calculators/pythagorean-theorem-calculator")
    );
  } catch (err: any) {
    console.error("Audit error:", err.message);
  }
}

auditSeo();
