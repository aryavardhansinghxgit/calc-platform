async function test() {
  try {
    const res = await fetch('http://localhost:3000/calculators/day-counter-calculator');
    console.log('Status:', res.status);
    const html = await res.text();
    
    // 1. H1 check
    const h1s = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || [];
    console.log('H1 count:', h1s.length);
    h1s.forEach((h, i) => console.log(`H1 [${i}]:`, h.replace(/<[^>]+>/g, '').trim()));
    
    // 2. Title check
    const titleMatch = html.match(/<title\b[^>]*>(.*?)<\/title>/i);
    console.log('Page Title:', titleMatch ? titleMatch[1] : 'NONE');

    // 3. Meta description check
    const metaDesc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    console.log('Meta Description:', metaDesc ? metaDesc[1] : 'NONE');

    // 4. FAQ check
    console.log('Includes FAQs section:', html.includes('Frequently Asked Questions'));
    console.log('Includes FAQ 1:', html.includes('How many days are between two dates?'));
    console.log('Includes FAQ 21:', html.includes('Can I print the result as a PDF?'));
    
    // 5. Contextual anchor text links
    const anchors = ['Age Calculator', 'Date Calculator', 'Time Duration Calculator', 'Time Calculator'];
    for (const a of anchors) {
      console.log(`Includes anchor [${a}]:`, html.includes(a));
    }

    // 6. Print report container
    console.log('Print report div present:', html.includes('id="day-counter-print-report"'));

    // 7. Check no forbidden dark cards in content
    const fs = require('fs');
    const content = fs.readFileSync('src/components/calculator/day-counter/DayCounterContent.tsx', 'utf8');
    const darkMatches = content.match(/bg-(slate|zinc|gray|neutral|black)-9[0-9]+/g) || [];
    console.log('Dark cards in DayCounterContent:', darkMatches.length);

    // 8. Check related calculators positioning: one before and one after content
    const relatedMatches = html.match(/RELATED CALCULATORS/gi) || [];
    console.log('Related Calculators count:', relatedMatches.length);

    // 9. Check duplicate FAQs count: 'Frequently Asked Questions' should appear exactly once
    const faqHeadings = html.match(/Frequently Asked Questions/gi) || [];
    console.log('Frequently Asked Questions headings count:', faqHeadings.length);

  } catch (err) {
    console.error('Error fetching:', err);
  }
}

test();
