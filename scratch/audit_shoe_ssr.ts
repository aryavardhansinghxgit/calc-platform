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

async function auditSSR() {
  console.log('Fetching http://localhost:3000/calculators/shoe-size-calculator ...');
  const html = await fetchPage('http://localhost:3000/calculators/shoe-size-calculator');
  console.log('HTML length:', html.length);

  // Title
  const title = html.match(/<title>([^<]*)<\/title>/);
  console.log('Title:', title ? title[1] : 'NONE');

  // Meta description
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  console.log('Description:', desc ? desc[1] : 'NONE');

  // H1
  const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log('H1 count:', h1s ? h1s.length : 0);
  if (h1s) h1s.forEach((h, i) => console.log(`  H1 [${i + 1}]:`, h.replace(/<[^>]+>/g, '').trim()));

  // Canonical
  const can = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  console.log('Canonical:', can ? can[1] : 'NONE');

  // Check NaN, null, undefined, Infinity
  const nanCount = (html.match(/>\s*NaN\s*</g) || []).length;
  const undefCount = (html.match(/>\s*undefined\s*</g) || []).length;
  const infCount = (html.match(/>\s*Infinity\s*</g) || []).length;
  const nullCount = (html.match(/>\s*null\s*</g) || []).length;
  console.log(`Corrupt text: NaN=${nanCount}, undefined=${undefCount}, Infinity=${infCount}, null=${nullCount}`);

  // Check FAQ in SSR
  const faqMatch = html.includes('How do I accurately measure my shoe size at home?');
  console.log('FAQ in SSR:', faqMatch);

  // Check Educational Content in SSR
  const anatomyMatch = html.includes('Anatomy') && html.includes('Biomechanics');
  const barleycornMatch = html.includes('Barleycorn System');
  const parisPointMatch = html.includes('Paris Point System');
  const mondopointMatch = html.includes('Mondopoint System');
  const tableMatch = html.includes('Complete International Sizing Conversion Tables');
  console.log('Educational Content Sections in SSR:');
  console.log('  - Anatomy & Biomechanics:', anatomyMatch);
  console.log('  - Barleycorn System:', barleycornMatch);
  console.log('  - Paris Point System:', parisPointMatch);
  console.log('  - Mondopoint System:', mondopointMatch);
  console.log('  - Conversion Tables:', tableMatch);

  // Related Calculators
  const relCount = (html.match(/Related Calculators/gi) || []).length;
  console.log('Related Calculators count:', relCount);
}

auditSSR().catch(console.error);
