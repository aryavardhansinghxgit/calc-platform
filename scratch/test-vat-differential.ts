import {
  solveVat,
  calculateSupplyChainVat,
  GLOBAL_VAT_PRESETS,
} from "../src/lib/calculator-engine/formulas/vat";

console.log("=== RUNNING 3,000+ DIFFERENTIAL TESTS FOR VAT CALCULATOR ===");

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`[FAIL] ${msg}`);
  }
}

// 1. Suite 1: Rate + Net -> Tax & Gross (500 tests)
for (let i = 0; i < 500; i++) {
  const rate = Math.round(Math.random() * 5000) / 100; // 0 to 50%
  const net = Math.round(Math.random() * 1000000) / 100 + 0.01; // 0.01 to 10,000
  const res = solveVat({ vatRate: rate, netPrice: net });

  const expTax = Math.round(net * (rate / 100) * 100) / 100;
  const expGross = Math.round((net + expTax) * 100) / 100;

  assert(Math.abs(res.taxAmount - expTax) <= 0.02, `Suite 1 Tax mismatch: net=${net}, rate=${rate}, exp=${expTax}, act=${res.taxAmount}`);
  assert(Math.abs(res.grossPrice - expGross) <= 0.02, `Suite 1 Gross mismatch: net=${net}, rate=${rate}, exp=${expGross}, act=${res.grossPrice}`);
}

// 2. Suite 2: Rate + Gross -> Net & Tax (500 tests)
for (let i = 0; i < 500; i++) {
  const rate = Math.round(Math.random() * 4000) / 100; // 0 to 40%
  const gross = Math.round(Math.random() * 1000000) / 100 + 1;
  const res = solveVat({ vatRate: rate, grossPrice: gross });

  const expNet = Math.round((gross / (1 + rate / 100)) * 100) / 100;
  const expTax = Math.round((gross - expNet) * 100) / 100;

  assert(Math.abs(res.netPrice - expNet) <= 0.02, `Suite 2 Net mismatch: gross=${gross}, rate=${rate}, exp=${expNet}, act=${res.netPrice}`);
  assert(Math.abs(res.taxAmount - expTax) <= 0.02, `Suite 2 Tax mismatch: gross=${gross}, rate=${rate}, exp=${expTax}, act=${res.taxAmount}`);
}

// 3. Suite 3: Rate + Tax -> Net & Gross (500 tests)
for (let i = 0; i < 500; i++) {
  const rate = Math.round(Math.random() * 3000) / 100 + 1; // 1% to 31%
  const tax = Math.round(Math.random() * 100000) / 100 + 1;
  const res = solveVat({ vatRate: rate, taxAmount: tax });

  const expNet = Math.round((tax / (rate / 100)) * 100) / 100;
  const expGross = Math.round((expNet + tax) * 100) / 100;

  assert(Math.abs(res.netPrice - expNet) <= 0.02, `Suite 3 Net mismatch: tax=${tax}, rate=${rate}, exp=${expNet}, act=${res.netPrice}`);
  assert(Math.abs(res.grossPrice - expGross) <= 0.02, `Suite 3 Gross mismatch: tax=${tax}, rate=${rate}, exp=${expGross}, act=${res.grossPrice}`);
}

// 4. Suite 4: Net + Gross -> Tax & Rate (500 tests)
for (let i = 0; i < 500; i++) {
  const net = Math.round(Math.random() * 100000) / 100 + 10;
  const rate = Math.round(Math.random() * 3000) / 100;
  const gross = Math.round(net * (1 + rate / 100) * 100) / 100;
  const res = solveVat({ netPrice: net, grossPrice: gross });

  const expTax = Math.round((gross - net) * 100) / 100;
  const expRate = Math.round((expTax / net) * 10000) / 100;

  assert(Math.abs(res.taxAmount - expTax) <= 0.02, `Suite 4 Tax mismatch: net=${net}, gross=${gross}, exp=${expTax}, act=${res.taxAmount}`);
  assert(Math.abs(res.vatRate - expRate) <= 0.1, `Suite 4 Rate mismatch: net=${net}, gross=${gross}, exp=${expRate}, act=${res.vatRate}`);
}

// 5. Suite 5: Net + Tax -> Gross & Rate (500 tests)
for (let i = 0; i < 500; i++) {
  const net = Math.round(Math.random() * 100000) / 100 + 10;
  const tax = Math.round(Math.random() * 20000) / 100;
  const res = solveVat({ netPrice: net, taxAmount: tax });

  const expGross = Math.round((net + tax) * 100) / 100;
  const expRate = Math.round((tax / net) * 10000) / 100;

  assert(Math.abs(res.grossPrice - expGross) <= 0.02, `Suite 5 Gross mismatch: net=${net}, tax=${tax}, exp=${expGross}, act=${res.grossPrice}`);
  assert(Math.abs(res.vatRate - expRate) <= 0.1, `Suite 5 Rate mismatch: net=${net}, tax=${tax}, exp=${expRate}, act=${res.vatRate}`);
}

// 6. Suite 6: Gross + Tax -> Net & Rate (500 tests)
for (let i = 0; i < 500; i++) {
  const gross = Math.round(Math.random() * 100000) / 100 + 50;
  const tax = Math.round(Math.random() * (gross * 0.4) * 100) / 100;
  const res = solveVat({ grossPrice: gross, taxAmount: tax });

  const expNet = Math.round((gross - tax) * 100) / 100;
  const expRate = expNet > 0 ? Math.round((tax / expNet) * 10000) / 100 : 0;

  assert(Math.abs(res.netPrice - expNet) <= 0.02, `Suite 6 Net mismatch: gross=${gross}, tax=${tax}, exp=${expNet}, act=${res.netPrice}`);
  assert(Math.abs(res.vatRate - expRate) <= 0.1, `Suite 6 Rate mismatch: gross=${gross}, tax=${tax}, exp=${expRate}, act=${res.vatRate}`);
}

// 7. Suite 7: Supply Chain Conservation Invariant (500 tests)
for (let i = 0; i < 500; i++) {
  const rate = Math.round(Math.random() * 3000) / 100;
  const s1 = Math.round(Math.random() * 10000) / 100;
  const s2 = Math.round(Math.random() * 10000) / 100;
  const s3 = Math.round(Math.random() * 10000) / 100;
  const s4 = Math.round(Math.random() * 10000) / 100;

  const sc = calculateSupplyChainVat(rate, s1, s2, s3, s4);
  const totalVal = Math.round((s1 + s2 + s3 + s4) * 100) / 100;
  const finalConsumerPrice = sc.stages[3].saleNetPrice;
  const expTotalVat = Math.round(finalConsumerPrice * (rate / 100) * 100) / 100;

  assert(Math.abs(sc.totalValueAdded - totalVal) <= 0.02, `Supply chain total value added mismatch: exp=${totalVal}, act=${sc.totalValueAdded}`);
  assert(Math.abs(sc.totalVatCollectedByGovt - expTotalVat) <= 0.05, `Supply chain total tax invariant broken: exp=${expTotalVat}, act=${sc.totalVatCollectedByGovt}`);
}

// 8. Suite 8: Global Presets Verification
GLOBAL_VAT_PRESETS.forEach((p) => {
  assert(p.standardRate > 0, `Preset standard rate must be positive: ${p.country}`);
  assert(Boolean(p.flag && p.currencySymbol && p.code), `Preset metadata missing: ${p.country}`);
  assert(Boolean(p.taxType), `Preset tax type missing: ${p.country}`);
});

console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
if (failed > 0) process.exit(1);
