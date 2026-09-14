const path = require('path');

// Replicate calculateOneRepMax logic from src/lib/formulas/oneRepMax.ts
function calculateOneRepMax(input) {
  const unitSystem = input.unitSystem;
  const unitLabel = unitSystem === "imperial" ? "lbs" : "kg";
  const weight = Math.max(1, Number(input.weightLifted) || 100);
  const reps = Math.max(1, Math.min(15, Math.round(Number(input.reps) || 5)));

  let exerciseName = "Custom Movement";
  if (input.exercise === "bench") exerciseName = "Bench Press";
  else if (input.exercise === "squat") exerciseName = "Barbell Squat";
  else if (input.exercise === "deadlift") exerciseName = "Deadlift";
  else if (input.exercise === "press") exerciseName = "Overhead Press";

  if (reps === 1) {
    const singleRes = [
      { formulaName: "Direct Measurement", oneRepMax: weight, description: "Direct single repetition maximum" }
    ];
    return {
      exerciseName,
      weightLifted: weight,
      repsPerformed: reps,
      consensusOneRepMax: weight,
      unitSystem,
      unitLabel,
      formulaResults: singleRes,
    };
  }

  const epley = weight * (1 + reps / 30);
  const brzycki = reps < 37 ? weight * (36 / (37 - reps)) : epley;
  const lombardi = weight * Math.pow(reps, 0.1);
  const mayhew = (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps));
  const oconner = weight * (1 + 0.025 * reps);
  const wathan = (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
  const lander = reps < 38 ? (100 * weight) / (101.3 - 2.67123 * reps) : epley;

  const formulaResults = [
    { formulaName: "Epley Formula (1985)", oneRepMax: parseFloat(epley.toFixed(1)), description: "Gold standard for sub-maximal repetitions (1-10 reps)" },
    { formulaName: "Brzycki Formula (1993)", oneRepMax: parseFloat(brzycki.toFixed(1)), description: "Classical clinical equation widely used in powerlifting" },
    { formulaName: "Lombardi Formula (1989)", oneRepMax: parseFloat(lombardi.toFixed(1)), description: "Exponential power curve for heavy compound movements" },
    { formulaName: "Mayhew et al. (1992)", oneRepMax: parseFloat(mayhew.toFixed(1)), description: "Empirical non-linear equation derived from collegiate athletes" },
    { formulaName: "O'Conner et al. (1989)", oneRepMax: parseFloat(oconner.toFixed(1)), description: "Linear fraction model developed for bench press & squat" },
    { formulaName: "Wathan Formula (1994)", oneRepMax: parseFloat(wathan.toFixed(1)), description: "Modern exponential curve fitting strength training" },
    { formulaName: "Lander Formula (1985)", oneRepMax: parseFloat(lander.toFixed(1)), description: "Empirical linear percentage model for athletic populations" },
  ];

  const avgOneRepMax = formulaResults.reduce((acc, curr) => acc + curr.oneRepMax, 0) / formulaResults.length;
  const consensusOneRepMax = parseFloat(avgOneRepMax.toFixed(1));

  return {
    exerciseName,
    weightLifted: weight,
    repsPerformed: reps,
    consensusOneRepMax,
    unitSystem,
    unitLabel,
    formulaResults,
  };
}

// 1. Test 0 weight
console.log('Testing weight = 0:');
const r0 = calculateOneRepMax({ unitSystem: 'imperial', exercise: 'bench', weightLifted: 0, reps: 5 });
console.log('Input: 0 lbs, Result weightLifted:', r0.weightLifted, 'Consensus:', r0.consensusOneRepMax);

// 2. Test reps = 1
console.log('\nTesting reps = 1:');
const r1 = calculateOneRepMax({ unitSystem: 'imperial', exercise: 'bench', weightLifted: 185, reps: 1 });
console.log('Formula count when reps=1:', r1.formulaResults.length);
console.log('Formulas:', r1.formulaResults);

// 3. Test reps = 15
console.log('\nTesting reps = 15 (185 lbs):');
const r15 = calculateOneRepMax({ unitSystem: 'imperial', exercise: 'bench', weightLifted: 185, reps: 15 });
r15.formulaResults.forEach(f => console.log(`  ${f.formulaName}: ${f.oneRepMax}`));
console.log('Consensus:', r15.consensusOneRepMax);

// 4. Test reps = 16 (clamping check)
console.log('\nTesting reps = 16:');
const r16 = calculateOneRepMax({ unitSystem: 'imperial', exercise: 'bench', weightLifted: 185, reps: 16 });
console.log('Reps performed after clamp:', r16.repsPerformed);
