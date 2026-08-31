import http from "http";

http.get("http://localhost:3000/calculators/ovulation-calculator", (res) => {
  let body = "";
  res.on("data", (chunk) => body += chunk);
  res.on("end", () => {
    console.log("FAQ occurrences:", (body.match(/When do I ovulate/g) || []).length);
    console.log("How long is the biological fertile window:", (body.match(/How long is the biological fertile window/g) || []).length);
    console.log("Frequently Asked Questions matches:", (body.match(/Frequently Asked Questions/g) || []).length);
    
    // Check JSON-LD in body
    const jsonLdMatches = body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    console.log("JSON-LD scripts count:", jsonLdMatches ? jsonLdMatches.length : 0);
    if (jsonLdMatches) {
      jsonLdMatches.forEach((script, idx) => {
        if (script.includes("FAQPage")) {
          console.log(`JSON-LD ${idx} is FAQPage, length:`, script.length);
        }
      });
    }
  });
});
