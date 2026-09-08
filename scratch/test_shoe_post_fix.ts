import {
  calculateShoeSize,
  calculateInternationalSizes,
  calculateFootWidthCategory,
  calculateBrandFit,
  calculateKidsGrowth,
  convertToInches,
  convertToCm,
} from '../src/app/calculators/shoe-size-calculator/calculator';

interface Stats {
  total: number;
  passed: number;
  failed: number;
  anomalies: string[];
}

const stats: Stats = { total: 0, passed: 0, failed: 0, anomalies: [] };

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

console.log('========================================================');
console.log('RUNNING SHOE SIZE POST-FIX PRODUCTION VERIFICATION SUITE');
console.log('========================================================\n');

// 1. Reference Case Regression
console.log('--- 1. Reference Case Regression ---');
{
  const res = calculateShoeSize(10.0, 9.9, 3.8, 3.7, 'in', 'men', 'standard');
  assert(Boolean(res.isValid), 'Ref case should be valid');
  assert(res.internationalSizes.usMen === 8.5, `Ref case US Men expected 8.5, got ${res.internationalSizes.usMen}`);
  assert(res.internationalSizes.uk === 7.5, `Ref case UK expected 7.5, got ${res.internationalSizes.uk}`);
  assert(res.internationalSizes.eu === 40, `Ref case EU expected 40, got ${res.internationalSizes.eu}`);
  assert(res.internationalSizes.japanCm === 25.5, `Ref case JP expected 25.5, got ${res.internationalSizes.japanCm}`);
  assert(res.widthCategory === 'Standard / Medium (D / M)', `Ref case Width expected Standard/Medium (D/M), got ${res.widthCategory}`);
  assert(res.isBilateralUsed === true, 'Ref case isBilateralUsed expected true');
  assert(res.largerFootNote?.includes('Left') === true, 'Ref case note must state Left foot is longer');
  assert(Boolean(res.largerFootNote?.includes('0.10')), 'Ref case note must state 0.10 inches difference');
}

// 2. P0-02 Fix Verification: UK / India Reverse-Conversion
console.log('--- 2. P0-02 Verification: UK / India Reverse Conversion ---');
{
  // Test UK 7.5 -> inches = (7.5 + 22.5)/3 = 10.0 in -> US Men 8.5 -> UK 7.5
  const ukValues = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0];
  ukValues.forEach(uk => {
    const inches = (uk + 22.5) / 3;
    const res = calculateInternationalSizes(inches, 'men');
    assert(res.uk === uk, `UK roundtrip failed for UK ${uk}: got UK ${res.uk} (US Men ${res.usMen})`);
  });

  // 1,000 randomized UK roundtrips
  for (let i = 0; i < 1000; i++) {
    const rawUk = 4.0 + Math.floor(Math.random() * 20) * 0.5; // half-size steps
    const inches = (rawUk + 22.5) / 3;
    const res = calculateInternationalSizes(inches, 'men');
    assert(res.uk === rawUk, `Randomized UK roundtrip failed for ${rawUk}: got ${res.uk}`);
  }
}

// 3. P0-03 Fix Verification: Unit Conversion & Transformation
console.log('--- 3. P0-03 Verification: Unit Transformation Consistency ---');
{
  // 10 in -> 25.4 cm -> 254 mm -> 10 in
  const convertVal = (val: number, from: 'in' | 'cm' | 'mm', to: 'in' | 'cm' | 'mm'): number => {
    let inVal = val;
    if (from === 'cm') inVal = val / 2.54;
    else if (from === 'mm') inVal = val / 25.4;

    if (to === 'in') return parseFloat(inVal.toFixed(2));
    if (to === 'cm') return parseFloat((inVal * 2.54).toFixed(2));
    if (to === 'mm') return parseFloat((inVal * 25.4).toFixed(1));
    return val;
  };

  const lenIn = 10.0;
  const lenCm = convertVal(lenIn, 'in', 'cm');
  const lenMm = convertVal(lenCm, 'cm', 'mm');
  const lenInRecovered = convertVal(lenMm, 'mm', 'in');

  assert(lenCm === 25.4, `10 in to cm expected 25.4, got ${lenCm}`);
  assert(lenMm === 254, `25.4 cm to mm expected 254, got ${lenMm}`);
  assert(lenInRecovered === 10.0, `254 mm back to in expected 10.0, got ${lenInRecovered}`);

  // Width 3.8 in
  const wIn = 3.8;
  const wCm = convertVal(wIn, 'in', 'cm');
  const wMm = convertVal(wCm, 'cm', 'mm');
  const wInRecovered = convertVal(wMm, 'mm', 'in');
  assert(wInRecovered === 3.8, `3.8 in roundtrip expected 3.8, got ${wInRecovered}`);

  // Test that shoe size recommendation is identical across units
  const resIn = calculateShoeSize(10.0, 10.0, 3.8, 3.8, 'in', 'men');
  const resCm = calculateShoeSize(25.4, 25.4, 9.65, 9.65, 'cm', 'men');
  const resMm = calculateShoeSize(254, 254, 96.5, 96.5, 'mm', 'men');

  assert(resIn.internationalSizes.usMen === resCm.internationalSizes.usMen, 'US Men size must match across in and cm');
  assert(resIn.internationalSizes.usMen === resMm.internationalSizes.usMen, 'US Men size must match across in and mm');
  assert(resIn.widthCategory === resCm.widthCategory, 'Width category must match across in and cm');
  assert(resIn.widthCategory === resMm.widthCategory, 'Width category must match across in and mm');
}

// 4. P1-05 Fix Verification: Invalid / Zero Inputs Rejected
console.log('--- 4. P1-05 Verification: Invalid Input Handling ---');
{
  const resZero = calculateShoeSize(0, 10, 3.8, 3.7, 'in', 'men');
  assert(resZero.isValid === false, 'Zero length must yield isValid=false');
  assert(Boolean(resZero.errorMessage), 'Zero length must produce error message');
  assert(resZero.usedFootLengthInches === 0, 'Zero length must not default to 10.0 in');

  const resNeg = calculateShoeSize(-5, 10, 3.8, 3.7, 'in', 'men');
  assert(resNeg.isValid === false, 'Negative length must yield isValid=false');

  const resNan = calculateShoeSize(NaN, 10, 3.8, 3.7, 'in', 'men');
  assert(resNan.isValid === false, 'NaN length must yield isValid=false');
}

// 5. P1-06 Fix Verification: Bilateral Width Asymmetry
console.log('--- 5. P1-06 Verification: Bilateral Width Asymmetry ---');
{
  // No significant width asymmetry (3.8 vs 3.7 -> diff = 0.10 < 0.15)
  const resSym = calculateShoeSize(10.0, 10.0, 3.8, 3.7, 'in', 'men');
  assert(!resSym.widthAsymmetryNote, 'Width diff < 0.15 should not produce width asymmetry note');

  // Width asymmetry: Left 3.8, Right 4.4 (diff = 0.60 >= 0.15)
  const resAsymR = calculateShoeSize(10.0, 10.0, 3.8, 4.4, 'in', 'men');
  assert(Boolean(resAsymR.widthAsymmetryNote), 'Width diff >= 0.15 must produce width asymmetry note');
  assert(resAsymR.widthAsymmetryNote?.includes('Right') === true, 'Width note must name Right foot as wider');
  assert(resAsymR.widthAsymmetryNote?.includes('0.60') === true, 'Width note must state 0.60 inches difference');

  // Reversed: Left 4.4, Right 3.8
  const resAsymL = calculateShoeSize(10.0, 10.0, 4.4, 3.8, 'in', 'men');
  assert(resAsymL.widthAsymmetryNote?.includes('Left') === true, 'Reversed width note must name Left foot as wider');
}

// 6. P1-07 Fix Verification: Kids Sizing Domain Logic
console.log('--- 6. P1-07 Verification: Kids Sizing Domain Logic ---');
{
  // Child foot: 6.0 in (~15.2 cm) -> valid child size
  const resChild = calculateShoeSize(6.0, 6.0, 2.5, 2.5, 'in', 'kids');
  assert(!resChild.kidsTransitionNote, 'Child foot <= 8.5 in should not have transition note');
  assert(resChild.internationalSizes.usKids > 0 && resChild.internationalSizes.usKids <= 13.5, `Child size in range, got ${resChild.internationalSizes.usKids}`);

  // Adult foot in kids mode: 10.0 in -> advisory note triggered
  const resAdultInKids = calculateShoeSize(10.0, 10.0, 3.8, 3.7, 'in', 'kids');
  assert(Boolean(resAdultInKids.kidsTransitionNote), 'Foot length > 8.5 in Kids mode must trigger transition note');
  assert(resAdultInKids.kidsTransitionNote?.includes('exceeds standard children') === true, 'Transition note must explain adult boundary');
}

// 7. 30,000+ Random Assertions Battery
console.log('--- 7. 30,000+ Random Assertions Battery ---');
// 10,000 Core foot length calculations
for (let i = 0; i < 10000; i++) {
  const len = 8.0 + Math.random() * 5.0;
  const resM = calculateInternationalSizes(len, 'men');
  const expectedRawM = 3 * len - 21.5;
  const expectedM = Math.round(expectedRawM * 2) / 2;
  assert(resM.usMen === expectedM, `Monotonic Men calculation error at len ${len}`);
  assert(resM.uk === resM.usMen - 1, `UK should be US Men - 1 at len ${len}`);
  assert(resM.india === resM.uk, `IND should equal UK at len ${len}`);
}

// 5,000 Unit conversion assertions
for (let i = 0; i < 5000; i++) {
  const inVal = 4.0 + Math.random() * 12.0;
  const cmVal = inVal * 2.54;
  const mmVal = cmVal * 10;
  assert(Math.abs(convertToInches(cmVal, 'cm') - inVal) < 1e-10, `in -> cm -> in failed`);
  assert(Math.abs(convertToInches(mmVal, 'mm') - inVal) < 1e-10, `in -> mm -> in failed`);
}

// 5,000 Width assertions
for (let i = 0; i < 5000; i++) {
  const len = 9.0 + Math.random() * 3.0;
  const w = 3.0 + Math.random() * 2.0;
  const cat = calculateFootWidthCategory(len, w, 'men');
  assert(Boolean(cat), 'Width category must be defined');
}

// 5,000 Bilateral asymmetry assertions
for (let i = 0; i < 5000; i++) {
  const l = 8.0 + Math.random() * 4.0;
  const r = 8.0 + Math.random() * 4.0;
  const res = calculateShoeSize(l, r, 3.8, 3.8, 'in', 'men');
  const maxL = Math.max(l, r);
  assert(Math.abs(res.usedFootLengthInches - parseFloat(maxL.toFixed(2))) <= 0.01, 'Used length must follow larger foot');
}

// 5,000 Brand fit assertions
const brands = ['standard', 'nike', 'adidas', 'converse', 'hoka', 'vans', 'asics', 'doc_martens'] as const;
for (let i = 0; i < 5000; i++) {
  const size = 6.0 + (i % 15) * 0.5;
  const b = brands[i % brands.length];
  const fit = calculateBrandFit(size, b);
  assert(fit.recommendedSizeUs > 0, 'Brand size must be positive');
}

console.log('\n========================================================');
console.log('POST-FIX TEST SUITE RESULTS:');
console.log(`Total Assertions: ${stats.total.toLocaleString()}`);
console.log(`Passed: ${stats.passed.toLocaleString()}`);
console.log(`Failed: ${stats.failed.toLocaleString()}`);
console.log('========================================================\n');

if (stats.failed > 0) {
  console.error('Anomalies encountered:');
  stats.anomalies.forEach(a => console.error(' - ' + a));
  process.exit(1);
} else {
  console.log('ALL REMEDIATIONS VERIFIED WITH 100% PASS RATE.');
}
