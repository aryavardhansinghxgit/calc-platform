async function checkHtml() {
  try {
    const res = await fetch("http://localhost:3000/calculators/period-calculator");
    const html = await res.text();
    console.log("Status:", res.status);

    // 1. H1 Count
    const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    console.log("H1 count:", h1s.length, h1s);

    // 2. FAQ mentions / sections
    const faqHeadings = html.match(/<h[2-4][^>]*>[^<]*Frequently Asked Questions[^<]*<\/h[2-4]>/gi) || [];
    console.log("FAQ headings:", faqHeadings.length, faqHeadings);

    // 3. Related Calculators sections
    const relatedHeadings = html.match(/RELATED CALCULATORS/gi) || [];
    console.log("Related Calculators count:", relatedHeadings.length);

    // 4. Medical Disclaimer
    const disclaimerHeadings = html.match(/Medical Disclaimer/gi) || [];
    console.log("Medical Disclaimer count:", disclaimerHeadings.length);
  } catch (e: any) {
    console.error("Fetch error:", e.message);
  }
}
checkHtml();
