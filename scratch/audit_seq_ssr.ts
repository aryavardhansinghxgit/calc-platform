import http from "http";

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", reject);
  });
}

async function auditSSR() {
  const url = "http://localhost:3000/calculators/number-sequence-calculator";
  console.log(`Fetching ${url}...`);
  const html = await fetchPage(url);
  console.log(`HTML Length: ${html.length} bytes`);

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  // Meta Description
  const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  console.log(`H1 count: ${h1Matches.length}`);
  h1Matches.forEach((m, idx) => console.log(`  H1 [${idx + 1}]: ${m[1].trim()}`));

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

  // Related Calculators
  const relatedMatches = [...html.matchAll(/RELATED CALCULATORS/gi)];
  console.log(`Related calculators header count: ${relatedMatches.length}`);
}

auditSSR().catch(console.error);
