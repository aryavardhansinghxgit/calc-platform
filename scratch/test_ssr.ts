export async function testHexSSR() {
  const res = await fetch("http://localhost:3000/calculators/hex-calculator");
  const text = await res.text();
  console.log("Status:", res.status);
  const h1 = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 count:", h1.length, h1[0]?.replace(/<[^>]+>/g, "").trim());
  const title = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  console.log("Title:", title);
  const canonical = text.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1];
  console.log("Canonical:", canonical);
  const hasEducational = text.includes("Hexadecimal Number System") || text.includes("What Is Hexadecimal?");
  console.log("Has educational content:", hasEducational);
  const dupRelated = (text.match(/RELATED CALCULATORS/g) || []).length;
  console.log("Duplicate related:", dupRelated);
}

if (require.main === module) {
  testHexSSR();
}
