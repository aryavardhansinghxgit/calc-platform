const http = require('http');

http.get('http://localhost:3000/calculators/molecular-weight-calculator', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    
    // Check h1
    const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log('H1 count:', h1Match ? h1Match.length : 0);
    if (h1Match) console.log('H1 content:', h1Match[0].replace(/<[^>]+>/g, '').trim());

    // Check title
    const titleMatch = data.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'NONE');

    // Check meta description
    const metaDesc = data.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    console.log('Meta description:', metaDesc ? metaDesc[1] : 'NONE');

    // Check Related Calculators occurrences
    const relMatches = data.match(/Related Calculators/gi);
    console.log('Related Calculators text occurrences:', relMatches ? relMatches.length : 0);

    // Check links to related calculators
    const molarityLinks = (data.match(/\/calculators\/molarity-calculator/g) || []).length;
    const densityLinks = (data.match(/\/calculators\/density-calculator/g) || []).length;
    const percentageLinks = (data.match(/\/calculators\/percentage-calculator/g) || []).length;
    const selfLinks = (data.match(/\/calculators\/molecular-weight-calculator/g) || []).length;
    console.log('Link counts: molarity =', molarityLinks, ', density =', densityLinks, ', percentage =', percentageLinks, ', self =', selfLinks);

    // Check FAQ questions
    const faqQuestions = [
      'What is a molecular weight calculator?',
      'What is the molar mass of H₂O?',
      'What is the molecular weight of NaCl?',
      'What is the molar mass of C₆H₁₂O₆?',
      'How do I calculate molar mass from a chemical formula?',
      'What is the difference between molecular weight and molar mass?',
      'What is an empirical formula?',
      'What is the difference between empirical and molecular formula?',
      'How do I find a molecular formula from an empirical formula?',
      'How do hydrates affect molar mass?',
      'What is monoisotopic mass?',
      'Why can my molecular-weight result differ slightly from another calculator?',
      'How do I convert grams to moles?',
      'How do I convert moles to molecules?',
      'Why is chemical formula capitalization important?',
      'Can this calculator handle parentheses and hydrates?'
    ];
    let faqFound = 0;
    for (const q of faqQuestions) {
      if (data.includes(q)) faqFound++;
      else console.log('Missing FAQ:', q);
    }
    console.log('FAQ questions found:', faqFound, '/', faqQuestions.length);

    // Check anchor phrases
    const anchor1 = data.includes('For solution preparation, the next step after determining molar mass is often a');
    const anchor2 = data.includes('When a concentration calculation requires solution density, the');
    const anchor3 = data.includes('For checking a standalone percentage calculation, the');
    console.log('Anchor 1 present:', anchor1);
    console.log('Anchor 2 present:', anchor2);
    console.log('Anchor 3 present:', anchor3);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
