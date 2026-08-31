const fs = require('fs');
const html = fs.readFileSync('.next/server/app/calculators/pregnancy-weight-gain-calculator.html', 'utf-8');

const titleMatch = html.match(/<title>(.*?)<\/title>/);
const metaDescMatch = html.match(/<meta name="description" content="(.*?)"/);
const h1s = html.match(/<h1/g) || [];
const faqHeadings = html.match(/Frequently Asked Questions/g) || [];
const bmiLinks = html.match(/\/calculators\/bmi-calculator/g) || [];
const calLinks = html.match(/\/calculators\/calorie-calculator/g) || [];

// Check JSON-LD schemas
const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
let faqJsonCount = 0;
for (const tag of jsonLdMatches) {
  if (tag.includes('"FAQPage"')) {
    const raw = tag.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      const parsed = JSON.parse(raw);
      if (parsed.mainEntity) faqJsonCount = parsed.mainEntity.length;
    } catch (e) {}
  }
}

console.log('Title:', titleMatch ? titleMatch[1] : 'none');
console.log('Meta Desc:', metaDescMatch ? metaDescMatch[1] : 'none');
console.log('H1 count:', h1s.length);
console.log('FAQ headings in DOM:', faqHeadings.length);
console.log('FAQ items in JSON-LD:', faqJsonCount);
console.log('BMI calculator links:', bmiLinks.length);
console.log('Calorie calculator links:', calLinks.length);
