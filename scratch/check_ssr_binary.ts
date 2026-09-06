async function checkSSR() {
  const url = "http://localhost:3000/calculators/binary-calculator";
  console.log("Fetching:", url);
  try {
    const res = await fetch(url);
    console.log("HTTP Status:", res.status);
    const html = await res.text();

    const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
    console.log("H1 Count:", h1Count);

    const canonicalPresent = html.includes('rel="canonical"') || html.includes('canonical');
    console.log("Canonical present:", canonicalPresent);

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1] : "N/A");

    const hasEduContent = html.includes("Understanding the Binary System") || html.includes("How to Use the Binary Calculator");
    console.log("Educational content present:", hasEduContent);

    const hasMalformedLatex = /\\\([^)]*$/m.test(html) || /\\\[[^\]]*$/m.test(html);
    console.log("Malformed LaTeX:", hasMalformedLatex);

    const hasDebug = html.includes("DEBUG") || html.includes("console.log");
    console.log("Debug text present:", hasDebug);

    if (res.status === 200 && h1Count === 1) {
      console.log("SSR SANITY CHECK: PASS");
    } else {
      console.log("SSR SANITY CHECK: WARNING");
    }
  } catch (err: any) {
    console.error("Fetch error:", err.message);
  }
}

checkSSR();
