const http = require('http');

http.get('http://localhost:3000/calculators/day-of-the-week-calculator', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    
    // Title test
    const titleMatch = data.match(/<title>([^<]+)<\/title>/);
    console.log('TITLE:', titleMatch ? titleMatch[1] : 'NOT FOUND');

    // Meta description test
    const metaDescMatch = data.match(/<meta name="description" content="([^"]+)"/);
    console.log('META DESC:', metaDescMatch ? metaDescMatch[1] : 'NOT FOUND');

    // H1 count test
    const h1Matches = data.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
    console.log('H1 COUNT:', h1Matches.length);
    h1Matches.forEach((h, i) => console.log(`  H1 [${i}]:`, h.replace(/<[^>]+>/g, '').trim()));

    // FAQ schema count
    const ldJsonMatches = data.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    let faqSchemaCount = 0;
    for (const s of ldJsonMatches) {
      if (s.includes('"FAQPage"')) {
        const jsonText = s.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        try {
          const parsed = JSON.parse(jsonText);
          faqSchemaCount = parsed.mainEntity ? parsed.mainEntity.length : 0;
        } catch (e) {}
      }
    }
    console.log('FAQ SCHEMA COUNT:', faqSchemaCount);

    // Visible FAQs count
    const qMatches = data.match(/Q(?:<!-- -->)?\d+(?:<!-- -->)?\./g) || [];
    console.log('VISIBLE Q COUNT:', qMatches.length);

    // Check dark card class
    const hasBgBlack = data.includes('bg-black');
    console.log('HAS BG-BLACK:', hasBgBlack);

    // Check anchor links
    const hasDayCounter = data.includes('/calculators/day-counter-calculator');
    const hasDateCalc = data.includes('/calculators/date-calculator');
    const hasAgeCalc = data.includes('/calculators/age-calculator');
    const hasTimeCalc = data.includes('/calculators/time-calculator');
    const hasHoursCalc = data.includes('/calculators/hours-calculator');
    console.log('ANCHOR LINKS:');
    console.log('  day-counter-calculator:', hasDayCounter);
    console.log('  date-calculator:', hasDateCalc);
    console.log('  age-calculator:', hasAgeCalc);
    console.log('  time-calculator:', hasTimeCalc);
    console.log('  hours-calculator:', hasHoursCalc);

    // Check Related Calculators blocks
    const relatedMatches = data.match(/RELATED CALCULATORS:/g) || [];
    console.log('RELATED CALCULATORS HEADINGS COUNT:', relatedMatches.length);

    // Check generic FAQ boilerplate absence
    const hasCentimeter = data.includes('centimeter') || data.includes('financial values');
    console.log('HAS GENERIC BOILERPLATE:', hasCentimeter);

    if (
      res.statusCode === 200 &&
      h1Matches.length === 1 &&
      titleMatch && titleMatch[1].includes('Day of the Week Calculator: What Day Was Any Date?') &&
      metaDescMatch && metaDescMatch[1].startsWith('Find the day of the week for any date') &&
      qMatches.length === 24 &&
      faqSchemaCount === 24 &&
      relatedMatches.length === 2 &&
      hasDayCounter && hasDateCalc && hasAgeCalc && hasTimeCalc && hasHoursCalc &&
      !hasCentimeter
    ) {
      console.log('\n>>> ALL SEO & POSITIONING AUDIT CHECKS PASSED! <<<');
    } else {
      console.log('\n>>> AUDIT FAILED SOME CHECKS <<<');
    }
  });
}).on('error', err => {
  console.error('HTTP Error:', err.message);
});
