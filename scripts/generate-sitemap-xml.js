const fs = require("fs");
const path = require("path");

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calcplatform.com";
const currentDate = new Date().toISOString().split("T")[0];

const categories = [
  "finance",
  "health",
  "math",
  "construction",
  "converters",
  "date",
  "other",
];

const standalonePages = [
  "",
  "loan-calculator",
  "cd-calculator",
  "finance-calculator",
  "house-affordability-calculator",
  "interest-rate-calculator",
  "refinance-calculator",
  "cash-back-or-low-interest-calculator",
];

const calculatorsDir = path.join(__dirname, "../src/app/calculators");
const calculatorSlugs = [];

if (fs.existsSync(calculatorsDir)) {
  const dirs = fs.readdirSync(calculatorsDir);
  for (const dir of dirs) {
    const stat = fs.statSync(path.join(calculatorsDir, dir));
    if (stat.isDirectory()) {
      calculatorSlugs.push(dir);
    }
  }
}

// Build XML elements
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

// 1. Standalone & Home pages
for (const slug of standalonePages) {
  const url = slug ? `${baseUrl}/${slug}` : baseUrl;
  const priority = slug === "" ? "1.0" : "0.8";
  const freq = slug === "" ? "daily" : "weekly";
  xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

// 2. Category Hubs
for (const cat of categories) {
  xml += `  <url>
    <loc>${baseUrl}/category/${cat}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
`;
}

// 3. All Calculators
for (const slug of calculatorSlugs) {
  xml += `  <url>
    <loc>${baseUrl}/calculators/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>\n`;

const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf-8");
console.log(`Generated public/sitemap.xml with ${standalonePages.length + categories.length + calculatorSlugs.length} URLs.`);
