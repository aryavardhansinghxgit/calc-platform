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

async function checkDuplicates() {
  const html = await fetchPage('http://localhost:3000/calculators/roman-numeral-converter');
  
  // Check H2 duplicates
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h2Map = new Map<string, number>();
  h2Matches.forEach(h2 => {
    h2Map.set(h2, (h2Map.get(h2) || 0) + 1);
  });
  console.log('Total H2s:', h2Matches.length);
  let duplicateH2Count = 0;
  h2Map.forEach((count, h2) => {
    if (count > 1) {
      console.log(`Duplicate H2 (${count}x): "${h2}"`);
      duplicateH2Count++;
    }
  });
  if (duplicateH2Count === 0) {
    console.log('Duplicate H2 check: PASS (0 duplicate H2s)');
  }

  // Check H3 duplicates in article
  const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h3Map = new Map<string, number>();
  h3Matches.forEach(h3 => {
    h3Map.set(h3, (h3Map.get(h3) || 0) + 1);
  });
  console.log('Total H3s:', h3Matches.length);
  let duplicateH3Count = 0;
  h3Map.forEach((count, h3) => {
    if (count > 1) {
      console.log(`Duplicate H3 (${count}x): "${h3}"`);
      duplicateH3Count++;
    }
  });
  if (duplicateH3Count === 0) {
    console.log('Duplicate H3 check: PASS (0 duplicate H3s)');
  }
}

checkDuplicates().catch(console.error);
