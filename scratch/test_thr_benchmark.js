
function testKarvonenBenchmark() {
  const age = 30;
  const mhr = 220 - age; // 190
  const rhr = 70;
  const hrr = mhr - rhr; // 120
  const thr65 = rhr + 0.65 * hrr; // 148
  const std65 = Math.round(mhr * 0.65); // 124
  
  console.log('Haskell MHR (Age 30):', mhr, 'Expected: 190');
  console.log('HRR:', hrr, 'Expected: 120');
  console.log('Karvonen 65%:', thr65, 'Expected: 148');
  console.log('Standard 65%:', std65, 'Expected: 124 (or 123.5)');
}

testKarvonenBenchmark();
