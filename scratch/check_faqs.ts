async function checkVisibleFaqs() {
  const res = await fetch("http://localhost:3000/calculators/time-zone-calculator");
  const html = await res.text();
  
  // Count FAQ items in HTML
  const matches = [...html.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)];
  console.log("H4 FAQ questions found in HTML:", matches.length);
  matches.forEach((m, i) => {
    console.log(`FAQ #${i + 1}:`, m[1].replace(/<[^>]+>/g, "").trim());
  });
}
checkVisibleFaqs();
