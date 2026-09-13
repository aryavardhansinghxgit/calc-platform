async function check() {
  const res = await fetch("http://localhost:3000/calculators/gdp-calculator");
  const html = await res.text();
  const m = html.match(/<a[^>]*href="[^"]*gdp-calculator"[^>]*>[\s\S]*?<\/a>/gi);
  console.log("Self link matches count:", m?.length);
  console.log("Matches:", m);
}
check();
