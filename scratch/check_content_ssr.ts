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

async function check() {
  const html = await fetchPage('http://localhost:3000/calculators/shoe-size-calculator');
  console.log('Includes Anatomy:', html.includes('Anatomy'));
  console.log('Includes Biomechanics:', html.includes('Biomechanics'));
  console.log('Includes Paris Point:', html.includes('Paris Point'));
  console.log('Includes Mondopoint:', html.includes('Mondopoint'));
  console.log('Includes 26 bones:', html.includes('26 bones'));
}

check().catch(console.error);
