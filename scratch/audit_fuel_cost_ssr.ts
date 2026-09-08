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
  const rawHtml = await fetchPage('http://localhost:3000/calculators/fuel-cost-calculator');
  const cleanHtml = rawHtml.replace(/<!-- -->/g, '').replace(/&amp;/g, '&');

  console.log('--- SSR & SEO AUDIT ---');
  console.log('Raw Length:', rawHtml.length);
  console.log('Single H1:', (rawHtml.match(/<h1/g) || []).length === 1);
  console.log('Contains "$42.00":', cleanHtml.includes('$42.00'));
  console.log('Contains "12 gallons":', cleanHtml.includes('12 gallons'));
  console.log('Contains "106.6 kg CO2":', cleanHtml.includes('106.6 kg CO2'));
  console.log('Contains "Miles / MPG (US)":', cleanHtml.includes('Miles / MPG (US)'));
  console.log('Corrupt visible values:');
  console.log('  NaN:', (rawHtml.match(/>\s*NaN\s*</g) || []).length);
  console.log('  undefined:', (rawHtml.match(/>\s*undefined\s*</g) || []).length);
  console.log('  Infinity:', (rawHtml.match(/>\s*Infinity\s*</g) || []).length);
  console.log('  null:', (rawHtml.match(/>\s*null\s*</g) || []).length);
}

auditSSR().catch(console.error);
