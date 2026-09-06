async function inspectHeadMeta() {
  const url = "http://localhost:3000/calculators/binary-calculator";
  const res = await fetch(url);
  const html = await res.text();

  console.log("=== HEAD METADATA INSPECTION ===");

  const getTag = (pattern: RegExp) => {
    const match = html.match(pattern);
    return match ? match[1] : "NOT FOUND";
  };

  console.log("Title:               ", getTag(/<title[^>]*>([^<]+)<\/title>/i));
  console.log("Meta Description:    ", getTag(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i));
  console.log("Canonical:           ", getTag(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i));
  console.log("OG Title:            ", getTag(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i));
  console.log("OG Description:      ", getTag(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i));
  console.log("OG URL:              ", getTag(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i));
  console.log("OG Image:            ", getTag(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i));
  console.log("Twitter Card:        ", getTag(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i));
  console.log("Twitter Title:       ", getTag(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i));
  console.log("Twitter Description: ", getTag(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i));

  // Check visible subtitle under H1
  const h1Block = html.match(/<div[^>]*class=["'][^"']*bg-slate-50[^"']*["'][^>]*>[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  if (h1Block) {
    console.log("\nVisible H1 Title:    ", h1Block[1].trim());
    console.log("Visible Subtitle:    ", h1Block[2].trim());
  } else {
    console.log("\nVisible H1 Block not matched via regex");
  }
}

inspectHeadMeta();
