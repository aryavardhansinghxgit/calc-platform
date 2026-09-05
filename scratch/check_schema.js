const fs = require("fs");
const html = fs.readFileSync("scratch/ssr_output.html", "utf8");

const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    const json = JSON.parse(match[1]);
    console.log(`Schema [${count++}] @type:`, json["@type"]);
    if (json["@type"] === "FAQPage") {
      console.log("FAQ count in schema:", json.mainEntity ? json.mainEntity.length : 0);
      if (json.mainEntity) {
        json.mainEntity.slice(0, 3).forEach((item, i) => {
          console.log(`FAQ [${i}]:`, item.name);
        });
      }
    }
  } catch (err) {
    console.error("JSON parse error:", err.message);
  }
}
