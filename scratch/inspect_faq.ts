async function inspectFaq() {
  const res = await fetch("http://localhost:3000/calculators/period-calculator");
  const html = await res.text();

  const idx = html.indexOf("Frequently Asked Questions");
  console.log("Found 'Frequently Asked Questions' at index:", idx);
  if (idx !== -1) {
    console.log("Snippet after 'Frequently Asked Questions':");
    console.log(html.slice(idx - 100, idx + 1500));
  }
}
inspectFaq();
