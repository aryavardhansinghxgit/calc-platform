async function check() {
  try {
    const res = await fetch('http://localhost:3000/calculators/target-heart-rate-calculator');
    const html = await res.text();
    console.log('HTTP STATUS:', res.status);
    
    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
    
    const metaDescMatch = html.match(/<meta name="description" content="([^"]*)"/);
    console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'NOT FOUND');
    
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g);
    console.log('H1 Count:', h1Matches ? h1Matches.length : 0);
    if (h1Matches) {
      console.log('H1 Raw:', h1Matches[0].replace(/<[^>]*>/g, '').trim());
    }
    
    console.log('Contextual Link Pace Calculator:', html.includes('href="/calculators/pace-calculator"'));
    console.log('Contextual Link Calories Burned:', html.includes('href="/calculators/calories-burned-calculator"'));
    console.log('Contextual Link Body Fat:', html.includes('href="/calculators/body-fat-calculator"'));
    
    const relatedCount = (html.match(/RELATED CALCULATORS:/g) || []).length;
    console.log('RELATED CALCULATORS count:', relatedCount);
    
    console.log('FAQ Q1 in HTML:', html.includes('What is a good target heart rate when exercising?'));
    console.log('FAQ Q19 in HTML:', html.includes('Should I always stay exactly inside my target zone?'));
    
    // Check if JSON-LD schema exists and has FAQPage
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    console.log('JSON-LD script tags count:', jsonLdMatch ? jsonLdMatch.length : 0);
    if (jsonLdMatch) {
      const hasFaqPage = jsonLdMatch.some(script => script.includes('"@type":"FAQPage"') || script.includes('"@type": "FAQPage"'));
      console.log('Has FAQPage in JSON-LD:', hasFaqPage);
      
      const faqScript = jsonLdMatch.find(script => script.includes('"@type":"FAQPage"'));
      if (faqScript) {
        const parsed = JSON.parse(faqScript.replace(/<script[^>]*>/, '').replace(/<\/script>/, ''));
        console.log('FAQ count in JSON-LD:', parsed.mainEntity ? parsed.mainEntity.length : 0);
      }
    }
    
    // Check for duplicate FAQ headings
    const faqHeadingCount = (html.match(/Frequently Asked Questions/g) || []).length;
    console.log('FAQ Heading Count:', faqHeadingCount);
  } catch (err) {
    console.error('Check failed:', err);
  }
}

check();
