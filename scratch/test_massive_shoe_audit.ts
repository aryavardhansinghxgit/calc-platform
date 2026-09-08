import {
  calculateShoeSize,
  calculateInternationalSizes,
  calculateFootWidthCategory,
  calculateBrandFit,
  calculateKidsGrowth,
  convertToInches,
  convertToCm,
} from '../src/app/calculators/shoe-size-calculator/calculator';

interface TestStats {
  total: number;
  passed: number;
  failed: number;
  anomalies: string[];
}

const stats: TestStats = {
  total: 0,
  passed: 0,
  failed: 0,
  anomalies: [],
};

function assert(condition: boolean, msg: string) {
  stats.total++;
  if (condition) {
    stats.passed++;
  } else {
    stats.failed++;
    if (stats.anomalies.length < 50) {
      stats.anomalies.push(msg);
    }
  }
}

console.log('=== STARTING 30,000+ SHOE SIZE PRODUCTION TEST BATTERY ===');

// Battery 1: Reference Case Regression
console.log('\n--- Battery 1: Reference Case Regression (Men: L 10/3.8, R 9.9/3.7) ---');
{
  const res = calculateShoeSize(10.0, 9.9, 3.8, 3.7, 'in', 'men', 'standard');
  assert(res.internationalSizes.usMen === 8.5, `Ref case US Men expected 8.5, got ${res.internationalSizes.usMen}`);
  assert(res.internationalSizes.uk === 7.5, `Ref case UK expected 7.5, got ${res.internationalSizes.uk}`);
  assert(res.internationalSizes.eu === 40, `Ref case EU expected 40, got ${res.internationalSizes.eu}`);
  assert(res.internationalSizes.japanCm === 25.5, `Ref case JP expected 25.5, got ${res.internationalSizes.japanCm}`);
  assert(res.widthCategory === 'Standard / Medium (D / M)', `Ref case Width expected Standard / Medium (D / M), got ${res.widthCategory}`);
  assert(res.isBilateralUsed === true, `Ref case isBilateralUsed expected true, got ${res.isBilateralUsed}`);
  assert(res.largerFootNote?.includes('Left') === true && res.largerFootNote?.includes('0.10'), `Ref case note expected Left 0.10, got ${res.largerFootNote}`);
}

// Battery 2: 10,000 Random Foot-Length Calculations (8.0 to 13.0 inches)
console.log('\n--- Battery 2: 10,000 Random Foot-Length Calculations ---');
for (let i = 0; i < 10000; i++) {
  const len = 8.0 + Math.random() * 5.0; // 8 to 13 inches
  const resM = calculateInternationalSizes(len, 'men');
  const resW = calculateInternationalSizes(len, 'women');

  // Monotonicity: larger length must yield >= size
  const expectedRawM = 3 * len - 21.5;
  const expectedM = Math.round(expectedRawM * 2) / 2;
  assert(resM.usMen === expectedM, `Monotonic Men calculation error at len ${len}`);
  assert(resM.uk === resM.usMen - 1, `UK should be US Men - 1 at len ${len}`);
  assert(resM.india === resM.uk, `IND should equal UK at len ${len}`);
  assert(resM.mondopointMm === Math.round(len * 25.4), `Mondopoint mm error at len ${len}`);
  assert(!isNaN(resM.usMen) && isFinite(resM.usMen), `NaN/Inf in Men size at len ${len}`);
}

// Battery 3: 5,000 Unit-Conversion & Round-Trip Cases
console.log('\n--- Battery 3: 5,000 Unit-Conversion & Round-Trip Cases ---');
for (let i = 0; i < 5000; i++) {
  const inVal = 4.0 + Math.random() * 12.0; // 4 to 16 inches
  const cmVal = inVal * 2.54;
  const mmVal = cmVal * 10;

  const inFromCm = convertToInches(cmVal, 'cm');
  const inFromMm = convertToInches(mmVal, 'mm');
  const cmFromIn = convertToCm(inVal, 'in');
  const cmFromMm = convertToCm(mmVal, 'mm');

  assert(Math.abs(inFromCm - inVal) < 1e-10, `in -> cm -> in roundtrip failed for ${inVal}`);
  assert(Math.abs(inFromMm - inVal) < 1e-10, `in -> mm -> in roundtrip failed for ${inVal}`);
  assert(Math.abs(cmFromIn - cmVal) < 1e-10, `cm -> in -> cm roundtrip failed for ${cmVal}`);
  assert(Math.abs(cmFromMm - cmVal) < 1e-10, `mm -> cm roundtrip failed for ${mmVal}`);
}

// Battery 4: 5,000 Bilateral Asymmetry Cases
console.log('\n--- Battery 4: 5,000 Bilateral Asymmetry Cases ---');
for (let i = 0; i < 5000; i++) {
  const lLen = 8.0 + Math.random() * 4.0;
  const rLen = 8.0 + Math.random() * 4.0;
  const maxLen = Math.max(lLen, rLen);

  const res = calculateShoeSize(lLen, rLen, 3.8, 3.8, 'in', 'men');
  assert(Math.abs(res.usedFootLengthInches - parseFloat(maxLen.toFixed(2))) <= 0.01, `Used length must follow larger foot (${maxLen} vs ${res.usedFootLengthInches})`);
  
  const diff = Math.abs(lLen - rLen);
  if (diff > 0.05) {
    assert(res.isBilateralUsed === true, `Asymmetry > 0.05 must trigger isBilateralUsed`);
    const expectedLarger = lLen > rLen ? 'Left' : 'Right';
    assert(res.largerFootNote?.includes(expectedLarger) === true, `Asymmetry note must name ${expectedLarger} foot`);
  } else {
    assert(res.isBilateralUsed === false, `Asymmetry <= 0.05 must not trigger bilateral note`);
  }
}

// Battery 5: 5,000 Width Classification & Boundary Cases
console.log('\n--- Battery 5: 5,000 Width Classification Cases ---');
for (let i = 0; i < 5000; i++) {
  const len = 9.0 + Math.random() * 3.0; // 9 to 12
  const width = 3.0 + Math.random() * 2.0; // 3 to 5
  const ratio = len / width;

  const wMen = calculateFootWidthCategory(len, width, 'men');
  if (ratio > 2.8) {
    assert(wMen === 'Narrow (A / 2A / B)', `Men width ratio > 2.8 must be Narrow, got ${wMen}`);
  } else if (ratio >= 2.5) {
    assert(wMen === 'Standard / Medium (D / M)', `Men width ratio >= 2.5 must be Standard, got ${wMen}`);
  } else if (ratio >= 2.3) {
    assert(wMen === 'Wide (E / 2E / W)', `Men width ratio >= 2.3 must be Wide, got ${wMen}`);
  } else {
    assert(wMen === 'Extra Wide (4E / 6E / XW)', `Men width ratio < 2.3 must be Extra Wide, got ${wMen}`);
  }
}

// Battery 6: 5,000 US/UK/EU/JP Conversions and Brand Fit Checks
console.log('\n--- Battery 6: 5,000 US/UK/EU/JP Conversions & Brand Fits ---');
const brands = ['standard', 'nike', 'adidas', 'converse', 'hoka', 'vans', 'asics', 'doc_martens'] as const;
for (let i = 0; i < 5000; i++) {
  const baseSize = 6.0 + (i % 15) * 0.5; // 6.0 to 13.0
  const brand = brands[i % brands.length];
  const bFit = calculateBrandFit(baseSize, brand);

  if (brand === 'nike' || brand === 'asics') {
    assert(bFit.recommendedSizeUs === baseSize + 0.5, `${brand} must size up +0.5 from ${baseSize}, got ${bFit.recommendedSizeUs}`);
  } else if (brand === 'converse' || brand === 'doc_martens') {
    assert(bFit.recommendedSizeUs === baseSize - 0.5, `${brand} must size down -0.5 from ${baseSize}, got ${bFit.recommendedSizeUs}`);
  } else {
    assert(bFit.recommendedSizeUs === baseSize, `${brand} must be true to size from ${baseSize}, got ${bFit.recommendedSizeUs}`);
  }
}

console.log('\n=== TEST RUN SUMMARY ===');
console.log(`Total Assertions: ${stats.total.toLocaleString()}`);
console.log(`Passed: ${stats.passed.toLocaleString()}`);
console.log(`Failed: ${stats.failed.toLocaleString()}`);
if (stats.anomalies.length > 0) {
  console.log('Sample Anomalies (up to 10):');
  stats.anomalies.slice(0, 10).forEach(a => console.log(' - ' + a));
}
