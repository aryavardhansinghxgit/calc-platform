import http from 'http';

function get(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await get("http://localhost:3000/calculators/sleep-calculator");
  
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  if (h1Matches.length > 0) {
    console.log("H1 Content:", h1Matches[0].replace(/<[^>]+>/g, '').trim());
  }

  const titleMatches = html.match(/<title>([\s\S]*?)<\/title>/gi) || [];
  if (titleMatches.length > 0) {
    console.log("Title Tag:", titleMatches[0].replace(/<[^>]+>/g, '').trim());
  }

  const metaDescMatches = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [];
  if (metaDescMatches.length > 1) {
    console.log("Meta Description:", metaDescMatches[1]);
  }

  const relatedBlocks = html.match(/RELATED CALCULATORS:/gi) || [];
  console.log("Related Calculator block count:", relatedBlocks.length);

  const faqCount = (html.match(/Frequently Asked Questions/gi) || []).length;
  console.log("FAQ Blocks count:", faqCount);

  const qMatches = html.match(/Q\d+\./g) || [];
  console.log("Total visible FAQ items:", qMatches.length);

  const anchorExists = html.includes("/calculators/time-calculator");
  console.log("Contextual anchor /calculators/time-calculator present:", anchorExists);

  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  console.log("Visible NaN:", (visible.match(/\bNaN\b/g) || []).length);
  console.log("Visible undefined:", (visible.match(/\bundefined\b/g) || []).length);
  console.log("Visible [object Object]:", (visible.match(/\[object Object\]/g) || []).length);
}

run().catch(console.error);
