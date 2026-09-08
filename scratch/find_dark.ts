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

async function findDark() {
  const html = await fetchPage('http://localhost:3000/calculators/roman-numeral-converter');
  const matches = [...html.matchAll(/(.{0,80}(?<!dark:)bg-(?:slate|zinc|gray|neutral)-(?:800|900|950).{0,80})/g)];
  matches.forEach((m, i) => {
    console.log(`Match ${i + 1}:`, m[0]);
  });
}

findDark().catch(console.error);
