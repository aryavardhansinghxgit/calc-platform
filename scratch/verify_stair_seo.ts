import fs from 'fs';
import path from 'path';

const htmlPath = path.join(process.cwd(), '.next', 'server', 'app', 'calculators', 'stair-calculator.html');
if (!fs.existsSync(htmlPath)) {
  console.error('HTML file not found:', htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- 1. HEAD & SEO METADATA ---');
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
console.log('Meta Description:', descMatch ? descMatch[1] : 'NOT FOUND');

const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');

const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
console.log('H1 count:', h1Matches ? h1Matches.length : 0);
if (h1Matches) console.log('H1 texts:', h1Matches.map(h => h.replace(/<[^>]*>/g, '').trim()));

console.log('\n--- 2. RELATED CALCULATORS CHECK ---');
const relatedMatches = html.match(/RELATED CALCULATORS/gi);
console.log('RELATED CALCULATORS block occurrences:', relatedMatches ? relatedMatches.length : 0);

const sqftLinks = (html.match(/\/calculators\/square-footage-calculator/gi) || []).length;
console.log('Square Footage Calculator link count:', sqftLinks);

const concLinks = (html.match(/\/calculators\/concrete-calculator/gi) || []).length;
console.log('Concrete Calculator link count:', concLinks);

console.log('\n--- 3. DARK CARD CHECK IN CONTENT ---');
const contentStartIndex = html.indexOf('Stair Calculator: Riser');
const contentSection = contentStartIndex !== -1 ? html.substring(contentStartIndex) : '';
const darkMatches = contentSection.match(/bg-slate-900|bg-gray-900|bg-black/gi);
console.log('Dark background classes in content:', darkMatches || 'None');

console.log('\n--- 4. FAQ CHECK ---');
const faqCount = (html.match(/Frequently Asked Questions About Stair Calculations/gi) || []).length;
console.log('FAQ section occurrences:', faqCount);
const questionCount = (html.match(/How do I calculate the number of stair risers\?/gi) || []).length;
console.log('Sample FAQ Question present:', questionCount > 0);

console.log('\n--- 5. RAW LATEX LEAK CHECK ---');
const rawLatex = html.match(/\\lceil|\\rceil|\\arctan|\\sqrt/gi);
console.log('Raw LaTeX string leaks:', rawLatex ? rawLatex.length : 0);
