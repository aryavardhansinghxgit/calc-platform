import * as http from 'http';

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function auditSEO() {
  console.log('Fetching SSR HTML from http://localhost:3000/calculators/electricity-calculator...');
  const html = await fetchPage('http://localhost:3000/calculators/electricity-calculator');

  console.log('\n============================================================');
  console.log('MASTER SSR & SEO AUDIT REPORT — ELECTRICITY CALCULATOR');
  console.log('============================================================');
  console.log('HTML Length:', html.length, 'bytes');

  let allPassed = true;

  // 1. Meta Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const expectedTitle = 'Electricity Calculator – kWh, Appliance Cost & Energy Usage';
  const actualTitle = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '';
  const titlePass = actualTitle === expectedTitle;
  console.log(`\n1. Meta Title: ${titlePass ? 'PASS' : 'FAIL'}`);
  console.log(`   Expected: "${expectedTitle}"`);
  console.log(`   Actual:   "${actualTitle}"`);
  if (!titlePass) allPassed = false;

  // 2. Meta Description
  const descMatch =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
    html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  const expectedDesc =
    'Calculate appliance kWh, electricity cost, time-of-use bills, whole-home energy use, carbon emissions, and energy-efficiency savings.';
  const actualDesc = descMatch ? descMatch[1].replace(/&amp;/g, '&') : '';
  const descPass = actualDesc === expectedDesc;
  console.log(`\n2. Meta Description: ${descPass ? 'PASS' : 'FAIL'}`);
  console.log(`   Expected: "${expectedDesc}"`);
  console.log(`   Actual:   "${actualDesc}"`);
  if (!descPass) allPassed = false;

  // 3. H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  const h1Count = h1Matches ? h1Matches.length : 0;
  const h1Text = h1Matches ? h1Matches[0].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim() : '';
  const h1Pass = h1Count === 1 && h1Text.includes('Electricity Calculator');
  console.log(`\n3. H1: ${h1Pass ? 'PASS' : 'FAIL'}`);
  console.log(`   Count: ${h1Count}, Text: "${h1Text}"`);
  if (!h1Pass) allPassed = false;

  // 4. Canonical
  const canonicalMatch =
    html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) ||
    html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i);
  const expectedCanonical = 'https://calcplatform.com/calculators/electricity-calculator';
  const actualCanonical = canonicalMatch ? canonicalMatch[1] : '';
  const canonicalPass = actualCanonical === expectedCanonical;
  console.log(`\n4. Canonical: ${canonicalPass ? 'PASS' : 'FAIL'}`);
  console.log(`   Expected: "${expectedCanonical}"`);
  console.log(`   Actual:   "${actualCanonical}"`);
  if (!canonicalPass) allPassed = false;

  // 5. OpenGraph
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const expectedOgTitle = 'Electricity Calculator – kWh, Energy Cost & Savings';
  const expectedOgDesc =
    'Estimate appliance electricity use, kWh, utility costs, TOU bills, household consumption, carbon emissions, and upgrade savings.';
  const actualOgTitle = ogTitleMatch ? ogTitleMatch[1].replace(/&amp;/g, '&') : '';
  const actualOgDesc = ogDescMatch ? ogDescMatch[1].replace(/&amp;/g, '&') : '';
  const ogTitlePass = actualOgTitle === expectedOgTitle;
  const ogDescPass = actualOgDesc === expectedOgDesc;
  console.log(`\n5. OpenGraph: ${ogTitlePass && ogDescPass ? 'PASS' : 'FAIL'}`);
  console.log(`   OG Title: "${actualOgTitle}" (Expected: "${expectedOgTitle}")`);
  console.log(`   OG Desc:  "${actualOgDesc}" (Expected: "${expectedOgDesc}")`);
  if (!ogTitlePass || !ogDescPass) allPassed = false;

  // 6. Article Sections in SSR (All 25 canonical sections)
  const canonicalSections = [
    '1. What Is an Electricity Calculator?',
    '2. Watts, Kilowatts, Watt-Hours and Kilowatt-Hours',
    '3. The Basic Formula for Appliance Energy Consumption',
    '4. How Duty Cycle Changes Electricity Consumption',
    '5. How to Calculate Monthly and Annual Electricity Use',
    '6. How to Calculate the Electricity Cost of an Appliance',
    '7. Why Electricity Prices Differ by Location',
    '8. Electricity Consumption vs Your Actual Utility Bill',
    '9. What Is a Time-of-Use Electricity Rate?',
    '10. Worked Time-of-Use Example',
    '11. Why Time of Use Can Change Your Electricity Bill Without Changing kWh',
    '12. Whole-House Electricity Consumption',
    '13. How the Household Power Allocation Visualization Works',
    '14. Power Hog vs Energy Hog',
    '15. Standby and Vampire Electricity Consumption',
    '16. Power Units Used in Electrical and HVAC Calculations',
    '17. Why a 1.5-Ton AC Does Not Automatically Use 3.5 kW of Electricity',
    '18. Energy-Efficiency and LED Upgrade Savings',
    '19. How Energy-Upgrade Payback Is Calculated',
    '20. Cumulative Savings vs Net Profit',
    '21. Electricity Carbon Emissions',
    '22. Why Your Actual Electricity Consumption May Differ',
    '23. How to Use the Electricity Calculator',
    '24. Worked Example: 1,500 W Appliance at 60% Duty Cycle',
    '25. Common Electricity Calculation Mistakes',
  ];
  let sectionsPass = true;
  for (const s of canonicalSections) {
    if (!html.includes(s)) {
      console.log(`   Missing section in SSR: "${s}"`);
      sectionsPass = false;
    }
  }
  console.log(`\n6. Article in SSR (25/25 sections): ${sectionsPass ? 'PASS' : 'FAIL'}`);
  if (!sectionsPass) allPassed = false;

  // 7. FAQ Unfolded & in SSR
  const faqQuestions = [
    'How do I calculate how much electricity an appliance uses?',
    'How do I calculate appliance electricity cost?',
    'How much electricity does a 1,500 W appliance use in 8 hours?',
    'What is the difference between watts and kWh?',
    'How does duty cycle affect the electricity bill?',
    'What electricity rate should I enter?',
    'Why is my electricity bill higher than the calculator estimate?',
    'What is a time-of-use electricity rate?',
    'Can shifting electricity usage reduce my bill without reducing kWh?',
    'What is a whole-house electricity calculator?',
    'What is the biggest electricity user in a home?',
    'What is standby or vampire power?',
    'Does a 1.5-ton AC use 3.5 kW of electricity?',
    'How are electricity carbon emissions estimated?',
    'How do I calculate energy savings from an LED upgrade?',
    'How is simple electricity-upgrade payback calculated?',
    'What is the difference between five-year cumulative savings and net profit?',
    'Can a zero tariff be used?',
    'Is the carbon result exact?',
    'Is this calculator a replacement for my electricity meter?',
  ];
  let faqCount = 0;
  for (const q of faqQuestions) {
    if (html.includes(q)) {
      faqCount++;
    } else {
      console.log(`   Missing FAQ: "${q}"`);
    }
  }
  const faqPass = faqCount === 20;
  console.log(`\n7. FAQ Unfolded in SSR: ${faqPass ? 'PASS' : 'FAIL'} (${faqCount}/20 present)`);
  if (!faqPass) allPassed = false;

  // Check no duplicate generic FAQ from CalculatorLayout
  const faqSectionHeaders = html.match(/Frequently Asked Questions/gi) || [];
  const noDuplicateFAQ = faqSectionHeaders.length === 1;
  console.log(`   Single FAQ Section (no duplicate): ${noDuplicateFAQ ? 'PASS' : 'FAIL'} (Found ${faqSectionHeaders.length})`);
  if (!noDuplicateFAQ) allPassed = false;

  // 8. Related Calculators Blocks (Exactly 2)
  const relBlockMatches = html.match(/Related Calculators/gi) || [];
  const relBlockPass = relBlockMatches.length === 2;
  console.log(`\n8. Related Calculator Blocks: ${relBlockPass ? 'PASS' : 'FAIL'} (Found ${relBlockMatches.length}, Expected exactly 2)`);
  if (!relBlockPass) allPassed = false;

  // Check destination links
  const hasBtuLink = html.includes('/calculators/btu-calculator');
  const hasConvLink = html.includes('/calculators/conversion-calculator');
  console.log(`   Has BTU Calculator link: ${hasBtuLink ? 'PASS' : 'FAIL'}`);
  console.log(`   Has Conversion Calculator link: ${hasConvLink ? 'PASS' : 'FAIL'}`);
  if (!hasBtuLink || !hasConvLink) allPassed = false;

  // 9. Contextual Anchors
  const hasMassLink = html.includes('/calculators/mass-calculator');
  console.log(`\n9. Contextual Internal Anchors: ${hasBtuLink && hasConvLink && hasMassLink ? 'PASS' : 'FAIL'}`);
  console.log(`   BTU Calculator: ${hasBtuLink ? 'PASS' : 'FAIL'}`);
  console.log(`   Conversion Calculator: ${hasConvLink ? 'PASS' : 'FAIL'}`);
  console.log(`   Mass Calculator: ${hasMassLink ? 'PASS' : 'FAIL'}`);
  if (!hasMassLink) allPassed = false;

  // 10. References / Sources
  const hasReferences = html.includes('Electricity and Utility-Rate References') &&
                        html.includes('U.S. Department of Energy') &&
                        html.includes('U.S. Energy Information Administration') &&
                        html.includes('U.S. Environmental Protection Agency');
  console.log(`\n10. Sources / References Section: ${hasReferences ? 'PASS' : 'FAIL'}`);
  if (!hasReferences) allPassed = false;

  // 11. No corrupt visible values
  const nanMatches = html.match(/>\s*NaN\s*</g) || [];
  const undefMatches = html.match(/>\s*undefined\s*</g) || [];
  const infMatches = html.match(/>\s*Infinity\s*</g) || [];
  const nullMatches = html.match(/>\s*null\s*</g) || [];
  const corruptCount = nanMatches.length + undefMatches.length + infMatches.length + nullMatches.length;
  const corruptPass = corruptCount === 0;
  console.log(`\n11. Corrupt Visible Values: ${corruptPass ? 'PASS' : 'FAIL'}`);
  console.log(`    NaN: ${nanMatches.length}, undefined: ${undefMatches.length}, Infinity: ${infMatches.length}, null: ${nullMatches.length}`);
  if (!corruptPass) allPassed = false;

  // 12. Formula and Reference Value Consistency
  const hasReferenceAppliance = html.includes('219.15') && html.includes('2,629.80') && html.includes('35.06') && html.includes('420.77');
  console.log(`\n12. Formula & Reference Value Consistency: ${hasReferenceAppliance ? 'PASS' : 'FAIL'}`);
  if (!hasReferenceAppliance) allPassed = false;

  console.log('\n============================================================');
  console.log(`OVERALL SEO QA STATUS: ${allPassed ? 'SEO IMPLEMENTATION PASS' : 'FAIL'}`);
  console.log('============================================================');
}

auditSEO().catch(console.error);
