const fs = require("fs");
const html = fs.readFileSync("scratch/ssr_output.html", "utf8");

const out = [];
// H1 count
const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
out.push("H1 count: " + h1Matches.length);
h1Matches.forEach((h, i) => out.push("H1 [" + i + "]: " + h.replace(/<[^>]+>/g, "").trim()));

// Title
const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
out.push("Title: " + (titleMatch ? titleMatch[1] : "NONE"));

// Meta description
const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
out.push("Meta description: " + (descMatch ? descMatch[1] : "NONE"));

// Canonical
const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i);
out.push("Canonical: " + (canonicalMatch ? canonicalMatch[1] : "NONE"));

// Check duplicate related calculators
const relMatches = html.match(/RELATED CALCULATORS:/gi) || [];
out.push("RELATED CALCULATORS count: " + relMatches.length);

fs.writeFileSync("scratch/ssr_report.txt", out.join("\n"), "utf8");
console.log("Wrote scratch/ssr_report.txt");
