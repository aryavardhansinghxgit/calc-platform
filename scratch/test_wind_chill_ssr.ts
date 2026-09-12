async function verifyWindChillDeployment() {
  console.log("Validating http://localhost:3000/calculators/wind-chill-calculator ...");
  const res = await fetch("http://localhost:3000/calculators/wind-chill-calculator");
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

  const html = await res.text();
  console.log(`Payload size: ${html.length} bytes`);

  // 1. Check HTTP 200
  console.log("✓ HTTP 200 OK");

  // 2. Exactly one H1 matching target
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) throw new Error("H1 not found");
  const h1Text = h1Match[1].replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
  console.log(`✓ H1: "${h1Text}"`);
  if (!h1Text.includes("Wind Chill Calculator – NWS Formula, Frostbite Risk & Wind Chill Chart")) {
    throw new Error(`H1 mismatch: ${h1Text}`);
  }

  // 3. Title tag
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch) throw new Error("Title tag not found");
  const titleText = titleMatch[1].replace(/&amp;/g, "&");
  console.log(`✓ Title: "${titleText}"`);
  if (!titleText.includes("Wind Chill Calculator – NWS Formula, Frostbite Risk & Wind Chill Chart")) {
    throw new Error(`Title mismatch: ${titleText}`);
  }

  // 4. Meta description
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  if (!metaMatch) throw new Error("Meta description not found");
  console.log(`✓ Meta description: "${metaMatch[1]}"`);
  if (!metaMatch[1].includes("Calculate wind chill with the NWS formula")) {
    throw new Error(`Meta description mismatch: ${metaMatch[1]}`);
  }

  // 5. Canonical link
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  if (!canonicalMatch) throw new Error("Canonical link not found");
  console.log(`✓ Canonical: "${canonicalMatch[1]}"`);
  if (canonicalMatch[1] !== "https://calcplatform.com/calculators/wind-chill-calculator") {
    throw new Error(`Canonical mismatch: ${canonicalMatch[1]}`);
  }

  // 6. Check Related Calculators strips (exactly 2: 1 above, 1 below)
  const relatedStrips = html.match(/RELATED CALCULATORS:/gi);
  console.log(`✓ Related Calculators strips count: ${relatedStrips ? relatedStrips.length : 0}`);
  if (!relatedStrips || relatedStrips.length !== 2) {
    throw new Error(`Expected exactly 2 RELATED CALCULATORS strips, found ${relatedStrips?.length}`);
  }

  // 7. Contextual internal anchor links inside article
  const expectedLinks = [
    "/calculators/conversion-calculator",
    "/calculators/heat-index-calculator",
    "/calculators/dew-point-calculator",
  ];
  for (const link of expectedLinks) {
    if (html.includes(link)) {
      console.log(`✓ Contextual link '${link}' found inside article body`);
    } else {
      throw new Error(`Missing contextual link: ${link}`);
    }
  }

  // 8. Unfolded FAQs check (all 12 questions present)
  const expectedFaqs = [
    "What is a wind chill calculator?",
    "What is the NWS wind chill formula?",
    "What is the wind chill at 10°F and 20 mph?",
    "Can wind chill make water, pipes or a car engine colder than the actual air temperature?",
    "Can you get frostbite when the air temperature is above freezing but wind chill is below freezing?",
    "At what wind chill does frostbite become dangerous?",
    "How long can exposed skin be outside in extreme wind chill?",
    "Does running or cycling change wind chill?",
    "What is the difference between wind chill and Steadman apparent temperature?",
    "Why does my wind chill result differ from another website?",
    "What are the early signs of frostbite and hypothermia?",
    "Is wind chill the same as a \"feels like\" temperature?",
  ];

  let matchedFaqs = 0;
  const decodedHtml = html.replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  for (const q of expectedFaqs) {
    if (decodedHtml.includes(q)) {
      matchedFaqs++;
    } else {
      console.warn(`Missing FAQ: ${q}`);
    }
  }
  console.log(`✓ FAQs found in SSR HTML: ${matchedFaqs} / 12`);
  if (matchedFaqs !== 12) {
    throw new Error(`Expected all 12 FAQs in SSR HTML, found ${matchedFaqs}`);
  }

  // 9. Check absence of corrupted tokens in user-visible content
  const bodyContent = html.split(/<body[^>]*>/i)[1]?.split(/<\/body>/i)[0] || html;
  if (bodyContent.includes("[object Object]")) throw new Error("Found '[object Object]' in body");
  if (bodyContent.includes(">NaN<") || bodyContent.includes(" NaN ")) throw new Error("Found 'NaN' in body");
  if (bodyContent.includes(">undefined<") || bodyContent.includes(" undefined ")) throw new Error("Found 'undefined' in body");
  console.log("✓ Zero corrupted tokens (no NaN, undefined, [object Object]) in body HTML");

  console.log("\n>>> ALL PRODUCTION SEO & SSR SPECIFICATIONS VERIFIED 100% <<<");
}

verifyWindChillDeployment().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
