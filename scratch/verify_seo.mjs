async function verify() {
  const res = await fetch('http://localhost:3000/calculators/volume-calculator');
  console.log('HTTP Status:', res.status);
  const html = await res.text();
  console.log('HTML Length:', html.length);

  // 1. Single H1
  const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log('H1 Count:', h1s.length);
  h1s.forEach(h => console.log('H1 Text:', h.replace(/<[^>]+>/g, '').trim()));

  // 2. FAQ section check
  const faqTitles = html.match(/Frequently Asked Questions/gi) || [];
  console.log('FAQ Section Headings:', faqTitles.length);

  // 3. Question check: all 12 FAQs present
  const faqQuestions = [
    'What is the formula for volume?',
    'How do I calculate the volume of a box?',
    'How do I calculate cylinder volume?',
    'How do I calculate the volume of a sphere?',
    'How many liters are in one cubic foot?',
    'How do I calculate tank capacity?',
    'What is the difference between tank capacity and liquid volume?',
    'Can I convert cubic feet to gallons?',
    'What is the volume of a cone?',
    'Can I calculate the volume of a hollow pipe?',
    'What unit should I use for volume?',
    'Why is my volume result different after changing units?'
  ];
  let faqsFound = 0;
  for (const q of faqQuestions) {
    if (html.includes(q)) faqsFound++;
    else console.warn('Missing question:', q);
  }
  console.log('Verified FAQs present:', faqsFound, '/ 12');

  // 4. Tank example check
  const tankChecks = [
    '5,097.0324',
    '6,796.0432',
    '1,346.4935',
    '1,795.3247',
    '240 ft³',
    '180 ft³',
    '60 ft³'
  ];
  let tankPass = true;
  for (const num of tankChecks) {
    const present = html.includes(num);
    if (!present) {
      console.warn('Missing tank metric:', num);
      tankPass = false;
    }
  }
  console.log('Tank calculations match:', tankPass);

  // 5. Internal link check
  console.log('Surface Area link:', html.includes('/calculators/surface-area-calculator'));
  console.log('Area link:', html.includes('/calculators/area-calculator'));
  console.log('Density link:', html.includes('/calculators/density-calculator'));
}

verify().catch(console.error);
