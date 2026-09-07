async function verifyGravelSSR() {
  try {
    const res = await fetch("http://localhost:3000/calculators/gravel-calculator");
    console.log("Status:", res.status);
    const html = await res.text();

    console.log("--- SSR & DOM VERIFICATION ---");
    const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log("H1 Count:", h1s ? h1s.length : 0);
    if (h1s) console.log("H1 Text:", h1s.map(h => h.replace(/<[^>]*>/g, "").trim()));

    const relBlocks = (html.match(/RELATED CALCULATORS/gi) || []).length;
    console.log("RELATED CALCULATORS block occurrences:", relBlocks);

    const faqBlocks = (html.match(/Frequently Asked Questions/gi) || []).length;
    console.log("Frequently Asked Questions occurrences:", faqBlocks);

    console.log("Contains gravel-quantity:", html.includes('id="gravel-quantity"'));
    console.log("Contains Copy Result:", html.includes("Copy Result"));
    console.log("Contains Copy LaTeX:", html.includes("Copy LaTeX"));
    console.log("Contains Export CSV:", html.includes("Export CSV"));
    console.log("Contains Download TXT:", html.includes("Download TXT"));
    console.log("Contains Restore text in component:", html.includes("Restore"));
    console.log("Contains GRAVEL-FILLED SWALE:", html.includes("GRAVEL-FILLED SWALE (NO PIPE)"));

    const withoutScripts = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    const visibleNan = withoutScripts.match(/\b(NaN|Infinity|undefined)\b/g);
    console.log("Visible NaN/Infinity/undefined:", visibleNan || "None");
  } catch (err) {
    console.error("SSR Verification Error:", err);
  }
}

verifyGravelSSR();
