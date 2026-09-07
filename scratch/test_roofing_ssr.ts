export {};
async function testSsr() {
  try {
    const res = await fetch("http://localhost:3000/calculators/roofing-calculator");
    console.log("Status:", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);
    
    // Check H1
    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi);
    console.log("H1 matches:", h1Matches);
    
    // Check title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1] : "None");
    
    // Check meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log("Meta description:", descMatch ? descMatch[1] : "None");
    
    // Check canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "None");
    
    // Check for FAQ policy violation in SSR
    const hasFaq = html.includes("Frequently Asked Questions");
    console.log("Has FAQ section in SSR HTML?:", hasFaq);
    
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testSsr();
