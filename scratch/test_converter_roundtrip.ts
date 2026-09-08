import { calculateInternationalSizes } from '../src/app/calculators/shoe-size-calculator/calculator';

function testConverterRoundtrip() {
  console.log('--- TESTING DIRECT CONVERTER FORMULAS ---');
  
  // Test UK 7.5 -> US Men -> UK
  const ukInput = 7.5;
  const inchesFromUk = (ukInput + 23) / 3;
  const resFromUk = calculateInternationalSizes(inchesFromUk, 'men');
  console.log(`Input UK: ${ukInput}`);
  console.log(`Calculated Inches: ${inchesFromUk.toFixed(4)} in`);
  console.log(`Resulting US Men: ${resFromUk.usMen}`);
  console.log(`Resulting UK: ${resFromUk.uk}`);
  console.log(`Discrepancy: UK input ${ukInput} resulted in UK ${resFromUk.uk} (diff: ${resFromUk.uk - ukInput})!`);

  // Test US Men 8.5
  const usMenInput = 8.5;
  const inchesFromUsMen = (usMenInput + 21.5) / 3;
  const resFromUsMen = calculateInternationalSizes(inchesFromUsMen, 'men');
  console.log(`\nInput US Men: ${usMenInput}`);
  console.log(`Calculated Inches: ${inchesFromUsMen.toFixed(4)} in`);
  console.log(`Resulting US Men: ${resFromUsMen.usMen}`);
  console.log(`Resulting UK: ${resFromUsMen.uk}`);

  // Test EU 40
  const euInput = 40;
  const inchesFromEu = (euInput / 1.5 - 1.5) / 2.54;
  const resFromEu = calculateInternationalSizes(inchesFromEu, 'men');
  console.log(`\nInput EU: ${euInput}`);
  console.log(`Calculated Inches: ${inchesFromEu.toFixed(4)} in`);
  console.log(`Resulting EU: ${resFromEu.eu}`);
  console.log(`Resulting US Men: ${resFromEu.usMen}`);
}

testConverterRoundtrip();
