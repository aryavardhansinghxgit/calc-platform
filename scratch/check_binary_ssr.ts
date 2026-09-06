async function checkSSR() {
  const res = await fetch("http://localhost:3000/calculators/binary-calculator");
  console.log("Status:", res.status);
  const html = await res.text();
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h1, i) => console.log(`  H1 [${i + 1}]:`, h1.replace(/<[^>]+>/g, "").trim()));
  const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1];
  console.log("Title:", title);
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i) || [])[1];
  console.log("Canonical:", canonical);
  const metaDesc = (html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) || [])[1];
  console.log("Meta Desc:", metaDesc);
}

checkSSR().catch(console.error);

export {};
