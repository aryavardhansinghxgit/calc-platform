async function main() {
  const res = await fetch("http://localhost:3000/calculators/period-calculator");
  const html = await res.text();

  console.log("=== LIVE SERVER RESPONSE VERIFICATION ===");
  console.log("HTTP Status:", res.status);
  console.log("HTML length:", html.length);
  console.log("Title tag:", html.match(/<title>.*?<\/title>/)?.[0]);
  console.log("Meta description:", html.match(/<meta name="description" content=".*?"/)?.[0]);
  console.log("H1 tag:", html.match(/<h1.*?>.*?<\/h1>/)?.[0]);
  console.log("Cycle Regularity Score present:", html.includes("Cycle Regularity Score"));
  console.log("6-Day Fertile Window present:", html.includes("6-Day Fertile Window") || html.includes("6-day fertile window"));
  console.log("Prediction Range (Irregular) present:", html.includes("Estimated Prediction Range") || html.includes("prediction range"));
  console.log("Quick Answer present:", html.includes("How Do You Calculate Your Next Period?"));
  console.log("Menstrual Cycle Diagram present:", html.includes("Menstrual Cycle Flow Architecture") || html.includes("Cycle Day 1 = first day of menstrual bleeding."));
  console.log("FAQ questions rendered count:", (html.match(/Q[0-9]+\./g) || []).length);
  console.log("Related Calculators count:", (html.match(/Related Calculators/g) || []).length);
  console.log("Medical Disclaimer count:", (html.match(/Medical Disclaimer/g) || []).length);
  console.log("All 3 internal links present:");
  console.log("- /calculators/ovulation-calculator:", html.includes("/calculators/ovulation-calculator"));
  console.log("- /calculators/pregnancy-conception-calculator:", html.includes("/calculators/pregnancy-conception-calculator"));
  console.log("- /calculators/due-date-calculator:", html.includes("/calculators/due-date-calculator"));
}

main();
