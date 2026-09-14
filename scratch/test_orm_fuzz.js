// Randomized Fuzz Testing for One Rep Max Calculator

function calculateOneRepMax(input) {
  const unitSystem = input.unitSystem || "imperial";
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
      repBreakdown: [],
      trainingZones: []
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
    { formulaName: "Epley Formula (1985)", oneRepMax: parseFloat(epley.toFixed(1)) },
    { formulaName: "Brzycki Formula (1993)", oneRepMax: parseFloat(brzycki.toFixed(1)) },
    { formulaName: "Lombardi Formula (1989)", oneRepMax: parseFloat(lombardi.toFixed(1)) },
    { formulaName: "Mayhew et al. (1992)", oneRepMax: parseFloat(mayhew.toFixed(1)) },
    { formulaName: "O'Conner et al. (1989)", oneRepMax: parseFloat(oconner.toFixed(1)) },
    { formulaName: "Wathan Formula (1994)", oneRepMax: parseFloat(wathan.toFixed(1)) },
    { formulaName: "Lander Formula (1985)", oneRepMax: parseFloat(lander.toFixed(1)) },
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

let validPass = 0;
let validFail = 0;

for (let i = 0; i < 1000; i++) {
  const w = Math.floor(Math.random() * 999) + 1; // 1 to 1000
  const r = Math.floor(Math.random() * 15) + 1; // 1 to 15
  const exercises = ["bench", "squat", "deadlift", "press", "custom"];
  const ex = exercises[Math.floor(Math.random() * exercises.length)];
  const unit = Math.random() > 0.5 ? "imperial" : "metric";

  const res = calculateOneRepMax({ weightLifted: w, reps: r, exercise: ex, unitSystem: unit });

  let ok = true;
  if (!isFinite(res.consensusOneRepMax) || res.consensusOneRepMax <= 0) ok = false;
  if (r > 1) {
    if (res.formulaResults.length !== 7) ok = false;
    for (const f of res.formulaResults) {
      if (!isFinite(f.oneRepMax) || f.oneRepMax <= 0) ok = false;
    }
  }

  if (ok) validPass++;
  else validFail++;
}

console.log(`Valid Fuzz Tests (1,000 cases): Passed=${validPass}, Failed=${validFail}`);

let invalidPass = 0;
let invalidFail = 0;
const invalidInputs = [
  { weightLifted: -10, reps: 5 },
  { weightLifted: 0, reps: 5 },
  { weightLifted: NaN, reps: 5 },
  { weightLifted: Infinity, reps: 5 },
  { weightLifted: 100, reps: 0 },
  { weightLifted: 100, reps: -5 },
  { weightLifted: 100, reps: 20 },
  { weightLifted: 100, reps: NaN },
  { weightLifted: null, reps: null },
  { weightLifted: undefined, reps: undefined },
];

for (let i = 0; i < 250; i++) {
  const raw = invalidInputs[i % invalidInputs.length];
  const res = calculateOneRepMax(raw);
  if (isFinite(res.consensusOneRepMax) && res.consensusOneRepMax > 0) {
    invalidPass++;
  } else {
    invalidFail++;
  }
}
console.log(`Invalid Fuzz Tests (250 cases): Clamped/Handled=${invalidPass}, Crashed=${invalidFail}`);
