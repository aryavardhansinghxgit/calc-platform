// Test script to audit One Rep Max formulas and engine
const weight = 185;
const reps = 5;

// 1. Epley (1985)
const epley = weight * (1 + reps / 30);
// 185 * (1 + 5/30) = 185 * 1.166666... = 215.8333... -> 215.8

// 2. Brzycki (1993)
const brzycki = weight * (36 / (37 - reps));
// 185 * (36 / 32) = 185 * 1.125 = 208.125 -> 208.1

// 3. Lombardi (1989)
const lombardi = weight * Math.pow(reps, 0.1);
// 185 * 5^0.1 = 185 * 1.1746189... = 217.3045... -> 217.3

// 4. Mayhew et al. (1992)
const mayhew = (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps));
// 18500 / (52.2 + 41.9 * e^(-0.275)) = 18500 / (52.2 + 41.9 * 0.75957) = 18500 / (52.2 + 31.826) = 18500 / 84.026 = 220.17... -> 220.2

// 5. O'Conner et al. (1989)
const oconner = weight * (1 + 0.025 * reps);
// 185 * (1 + 0.025 * 5) = 185 * 1.125 = 208.125 -> 208.1

// 6. Wathan (1994)
const wathan = (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
// 18500 / (48.8 + 53.8 * e^(-0.375)) = 18500 / (48.8 + 53.8 * 0.687289) = 18500 / (48.8 + 36.976) = 18500 / 85.776 = 215.67... -> 215.7

// 7. Lander (1985)
const lander = (100 * weight) / (101.3 - 2.67123 * reps);
// 18500 / (101.3 - 2.67123 * 5) = 18500 / (101.3 - 13.35615) = 18500 / 87.94385 = 210.36... -> 210.4

const formulas = [
  { name: 'Epley', val: parseFloat(epley.toFixed(1)) },
  { name: 'Brzycki', val: parseFloat(brzycki.toFixed(1)) },
  { name: 'Lombardi', val: parseFloat(lombardi.toFixed(1)) },
  { name: 'Mayhew', val: parseFloat(mayhew.toFixed(1)) },
  { name: 'O\'Conner', val: parseFloat(oconner.toFixed(1)) },
  { name: 'Wathan', val: parseFloat(wathan.toFixed(1)) },
  { name: 'Lander', val: parseFloat(lander.toFixed(1)) },
];

console.log('Formula calculations (185 lbs x 5 reps):');
formulas.forEach(f => console.log(`  ${f.name}: ${f.val}`));

// Consensus: arithmetic mean of rounded formula outputs vs unrounded
const sumRounded = formulas.reduce((acc, f) => acc + f.val, 0);
const consensusFromRounded = parseFloat((sumRounded / 7).toFixed(1));

const sumUnrounded = epley + brzycki + lombardi + mayhew + oconner + wathan + lander;
const consensusFromUnrounded = parseFloat((sumUnrounded / 7).toFixed(1));

console.log('Consensus from rounded:', consensusFromRounded, `(${sumRounded}/7 = ${(sumRounded/7).toFixed(4)})`);
console.log('Consensus from unrounded:', consensusFromUnrounded, `(${sumUnrounded.toFixed(4)}/7 = ${(sumUnrounded/7).toFixed(4)})`);

// Rep-max breakdown from consensus:
console.log('\nRep-max Breakdown from Consensus (213.7 lbs):');
const repMap = [
  { reps: 1, pct: 1.0 },
  { reps: 2, pct: 0.95 },
  { reps: 3, pct: 0.93 },
  { reps: 4, pct: 0.90 },
  { reps: 5, pct: 0.87 },
  { reps: 6, pct: 0.85 },
  { reps: 7, pct: 0.83 },
  { reps: 8, pct: 0.80 },
  { reps: 9, pct: 0.77 },
  { reps: 10, pct: 0.75 },
  { reps: 11, pct: 0.73 },
  { reps: 12, pct: 0.70 },
];
repMap.forEach(r => {
  const targetW = parseFloat((consensusFromRounded * r.pct).toFixed(1));
  console.log(`  ${r.reps}RM (${Math.round(r.pct*100)}%): ${targetW} lbs`);
});
