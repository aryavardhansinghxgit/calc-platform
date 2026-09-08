import {
  calculateShoeSize,
  calculateInternationalSizes,
  calculateFootWidthCategory,
  calculateBrandFit,
  calculateKidsGrowth,
} from '../src/app/calculators/shoe-size-calculator/calculator';

const lengths = [9.0, 9.25, 9.5, 9.65, 10.0, 10.5, 11.0, 12.0];

console.log('--- TESTING LENGTHS (MEN) ---');
lengths.forEach(len => {
  const res = calculateInternationalSizes(len, 'men');
  console.log(`Length: ${len} in (${(len * 2.54).toFixed(1)} cm) => US Men: ${res.usMen}, US Women: ${res.usWomen}, UK: ${res.uk}, EU: ${res.eu}, JP: ${res.japanCm}`);
});

console.log('\n--- TESTING TABLE VALUES FROM CONTENT.TSX ---');
// Table says:
// 9.25 in -> US Men 6.0, US Women 7.5, UK 5.0, EU 38, JP 23.5
// 9.65 in -> US Men 7.0, US Women 8.5, UK 6.0, EU 39-40, JP 24.5
// 10.0 in -> US Men 8.5, US Women 10.0, UK 7.5, EU 41-42, JP 25.5
// 10.5 in -> US Men 10.0, US Women 11.5, UK 9.0, EU 43, JP 27.0
// 11.0 in -> US Men 11.5, US Women 13.0, UK 10.5, EU 45, JP 28.0

const tableCheck = [
  { len: 9.25, expUsM: 6.0, expUsW: 7.5, expUk: 5.0, expEu: '38', expJp: 23.5 },
  { len: 9.65, expUsM: 7.0, expUsW: 8.5, expUk: 6.0, expEu: '39-40', expJp: 24.5 },
  { len: 10.0, expUsM: 8.5, expUsW: 10.0, expUk: 7.5, expEu: '41-42', expJp: 25.5 },
  { len: 10.5, expUsM: 10.0, expUsW: 11.5, expUk: 9.0, expEu: '43', expJp: 27.0 },
  { len: 11.0, expUsM: 11.5, expUsW: 13.0, expUk: 10.5, expEu: '45', expJp: 28.0 },
];

tableCheck.forEach(tc => {
  const res = calculateInternationalSizes(tc.len, 'men');
  console.log(`Len: ${tc.len} in:`);
  console.log(`  Engine: US Men=${res.usMen}, US Women=${res.usWomen}, UK=${res.uk}, EU=${res.eu}, JP=${res.japanCm}`);
  console.log(`  Table:  US Men=${tc.expUsM}, US Women=${tc.expUsW}, UK=${tc.expUk}, EU=${tc.expEu}, JP=${tc.expJp}`);
  const match = res.usMen === tc.expUsM && res.usWomen === tc.expUsW && res.uk === tc.expUk && res.japanCm === tc.expJp;
  console.log(`  Matches Table (US/UK/JP): ${match ? 'YES' : 'NO DISCREPANCY'}`);
});
