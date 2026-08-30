export type UnitSystem = "imperial" | "metric";
export type ActivityCategory =
  | "Walking"
  | "Running"
  | "Cycling"
  | "Swimming"
  | "Gym & Conditioning"
  | "Sports & Athletics"
  | "Outdoor & Recreation"
  | "Daily & Occupational";

export interface ActivityItem {
  id: string;
  name: string;
  category: ActivityCategory;
  met: number;
  description: string;
  sourceCode?: string; // ACSM Compendium code reference
}

export const ACTIVITIES_DATABASE: ActivityItem[] = [
  // --- 1. Walking & Hiking (9 entries) ---
  { id: "walk-slow", name: "Walking: Slow (2.0 mph / 3.2 km/h)", category: "Walking", met: 2.8, description: "Strolling at a relaxed pace on flat, firm surface", sourceCode: "17151" },
  { id: "walk-mod", name: "Walking: Moderate (3.0 mph / 4.8 km/h)", category: "Walking", met: 3.5, description: "Standard moderate walking pace, level ground", sourceCode: "17170" },
  { id: "walk-brisk", name: "Walking: Brisk (3.5 mph / 5.6 km/h)", category: "Walking", met: 4.3, description: "Brisk pace with purposeful stride", sourceCode: "17190" },
  { id: "walk-fast", name: "Walking: Very Brisk (4.0 mph / 6.4 km/h)", category: "Walking", met: 5.0, description: "Very brisk pace with vigorous arm swing", sourceCode: "17200" },
  { id: "walk-power", name: "Walking: Fast / Power Walking (4.5 mph / 7.2 km/h)", category: "Walking", met: 5.5, description: "High-cadence fitness walking", sourceCode: "17220" },
  { id: "walk-race", name: "Race Walking: Competitive", category: "Walking", met: 6.5, description: "Olympic or competitive race-walking technique", sourceCode: "17230" },
  { id: "walk-uphill", name: "Walking: Uphill (3.5 mph, 6% grade)", category: "Walking", met: 6.0, description: "Brisk walking on moderate incline or hill", sourceCode: "17190" },
  { id: "walk-hike", name: "Hiking: Cross-country / Trail", category: "Walking", met: 6.0, description: "Trail hiking over uneven terrain with elevation change", sourceCode: "17080" },
  { id: "walk-backpack", name: "Backpacking: Carrying 15-30 lb Pack", category: "Walking", met: 7.0, description: "Wilderness hiking carrying camping gear", sourceCode: "17010" },

  // --- 2. Running & Jogging (12 entries) ---
  { id: "run-jog", name: "Jogging (5.0 mph / 8.0 km/h, 12 min/mi)", category: "Running", met: 8.3, description: "Gentle continuous jog", sourceCode: "12020" },
  { id: "run-5.2mph", name: "Running (5.2 mph / 8.4 km/h, 11.5 min/mi)", category: "Running", met: 9.0, description: "Steady endurance running", sourceCode: "12025" },
  { id: "run-6mph", name: "Running (6.0 mph / 9.6 km/h, 10 min/mi)", category: "Running", met: 9.8, description: "Moderate distance running", sourceCode: "12030" },
  { id: "run-6.7mph", name: "Running (6.7 mph / 10.8 km/h, 9 min/mi)", category: "Running", met: 10.5, description: "Aerobic pace for recreational runners", sourceCode: "12040" },
  { id: "run-7mph", name: "Running (7.0 mph / 11.3 km/h, 8.5 min/mi)", category: "Running", met: 11.0, description: "Brisk continuous distance running", sourceCode: "12050" },
  { id: "run-7.5mph", name: "Running (7.5 mph / 12.0 km/h, 8 min/mi)", category: "Running", met: 11.5, description: "Vigorous aerobic tempo running", sourceCode: "12060" },
  { id: "run-8mph", name: "Running (8.0 mph / 12.9 km/h, 7.5 min/mi)", category: "Running", met: 11.8, description: "Fast tempo distance pace", sourceCode: "12070" },
  { id: "run-8.5mph", name: "Running (8.5 mph / 13.7 km/h, 7 min/mi)", category: "Running", met: 12.3, description: "High-effort threshold pace", sourceCode: "12080" },
  { id: "run-9mph", name: "Running (9.0 mph / 14.5 km/h, 6.6 min/mi)", category: "Running", met: 12.8, description: "Competitive club distance racing pace", sourceCode: "12090" },
  { id: "run-10mph", name: "Running (10.0 mph / 16.0 km/h, 6 min/mi)", category: "Running", met: 14.5, description: "Sub-elite competitive running pace", sourceCode: "12100" },
  { id: "run-sprint", name: "Sprinting / Track Intervals (11+ mph)", category: "Running", met: 15.0, description: "All-out sprint repeats on track", sourceCode: "12130" },
  { id: "run-trail", name: "Trail Running: Mountain & Obstacles", category: "Running", met: 10.0, description: "Continuous trail running over rough terrain", sourceCode: "12030" },

  // --- 3. Cycling & Bicycling (8 entries) ---
  { id: "bike-leisure", name: "Cycling: Leisure (<10 mph / <16 km/h)", category: "Cycling", met: 4.0, description: "Casual neighborhood bicycling, very light effort", sourceCode: "01010" },
  { id: "bike-light", name: "Cycling: Light (10-12 mph / 16-19 km/h)", category: "Cycling", met: 6.0, description: "Commuter or recreational cycling, light effort", sourceCode: "01015" },
  { id: "bike-mod", name: "Cycling: Moderate (12-14 mph / 19-22 km/h)", category: "Cycling", met: 8.0, description: "Standard road cycling pace, moderate effort", sourceCode: "01020" },
  { id: "bike-vig", name: "Cycling: Vigorous (14-16 mph / 22-25 km/h)", category: "Cycling", met: 10.0, description: "Fast group cycling or solo tempo, vigorous", sourceCode: "01030" },
  { id: "bike-fast", name: "Cycling: Very Fast (16-19 mph / 25-30 km/h)", category: "Cycling", met: 12.0, description: "High-performance cycling, racing pace", sourceCode: "01040" },
  { id: "bike-race", name: "Cycling: Racing (>20 mph / >32 km/h)", category: "Cycling", met: 14.0, description: "Competitive road or draft-free criterium racing", sourceCode: "01050" },
  { id: "bike-mountain", name: "Mountain Biking: Singletrack / Off-road", category: "Cycling", met: 8.5, description: "Ascending and descending technical dirt trails", sourceCode: "01009" },
  { id: "bike-stationary", name: "Stationary Bike: Moderate (100W)", category: "Cycling", met: 6.8, description: "Indoor gym spin bike at moderate resistance", sourceCode: "02011" },

  // --- 4. Swimming & Aquatics (7 entries) ---
  { id: "swim-tread", name: "Swimming: Treading Water (Moderate)", category: "Swimming", met: 3.5, description: "Treading water with moderate continuous kicking", sourceCode: "18310" },
  { id: "swim-breast", name: "Swimming: Breaststroke", category: "Swimming", met: 5.3, description: "Moderate breaststroke laps", sourceCode: "18240" },
  { id: "swim-back", name: "Swimming: Backstroke", category: "Swimming", met: 4.8, description: "Recreational backstroke lap swimming", sourceCode: "18230" },
  { id: "swim-mod", name: "Swimming: Freestyle Moderate (50 yd/min)", category: "Swimming", met: 5.8, description: "Continuous freestyle lap swimming at steady aerobic pace", sourceCode: "18250" },
  { id: "swim-vig", name: "Swimming: Freestyle Vigorous (75 yd/min)", category: "Swimming", met: 9.8, description: "Fast-paced competitive freestyle lap swimming", sourceCode: "18260" },
  { id: "swim-butterfly", name: "Swimming: Butterfly", category: "Swimming", met: 13.8, description: "Vigorous butterfly stroke laps", sourceCode: "18270" },
  { id: "swim-aerobics", name: "Water Aerobics / Calisthenics", category: "Swimming", met: 5.3, description: "Structured pool-based resistance and cardio class", sourceCode: "18355" },

  // --- 5. Gym, Strength & Conditioning (12 entries) ---
  { id: "gym-weights-light", name: "Weightlifting: Light / Machine Workout", category: "Gym & Conditioning", met: 3.5, description: "Machine circuit or light dumbbells with standard rests", sourceCode: "02052" },
  { id: "gym-weights-mod", name: "Weightlifting: Moderate / Hypertrophy", category: "Gym & Conditioning", met: 5.0, description: "Free-weight compound resistance training", sourceCode: "02054" },
  { id: "gym-weights-heavy", name: "Weightlifting: Heavy / Powerlifting", category: "Gym & Conditioning", met: 6.0, description: "Near-maximal squats, deadlifts, and bench presses", sourceCode: "02050" },
  { id: "gym-calisthenics-mod", name: "Calisthenics: Push-ups, Pull-ups, Sit-ups", category: "Gym & Conditioning", met: 5.0, description: "Bodyweight resistance routine, moderate pace", sourceCode: "02020" },
  { id: "gym-calisthenics-vig", name: "Calisthenics: Vigorous Burpees & Plyometrics", category: "Gym & Conditioning", met: 8.0, description: "Explosive continuous bodyweight training", sourceCode: "02030" },
  { id: "gym-hiit", name: "HIIT / Circuit Training", category: "Gym & Conditioning", met: 8.0, description: "High-intensity interval rounds with short recovery", sourceCode: "02040" },
  { id: "gym-elliptical", name: "Elliptical Trainer: Moderate Effort", category: "Gym & Conditioning", met: 5.0, description: "Standard elliptical cardio at moderate resistance", sourceCode: "02065" },
  { id: "gym-rowing-mod", name: "Rowing Machine: Moderate (100W)", category: "Gym & Conditioning", met: 7.0, description: "Ergometer rowing at steady 22-26 strokes/min", sourceCode: "02070" },
  { id: "gym-rowing-vig", name: "Rowing Machine: Vigorous (150W+)", category: "Gym & Conditioning", met: 8.5, description: "High-intensity ergometer rowing intervals", sourceCode: "02072" },
  { id: "gym-stair", name: "Stairmaster / Stepping Machine", category: "Gym & Conditioning", met: 7.5, description: "Continuous stair climbing machine at moderate pace", sourceCode: "02080" },
  { id: "gym-jumprope-mod", name: "Jump Rope: Moderate (<100 skips/min)", category: "Gym & Conditioning", met: 10.0, description: "Steady rhythm rope skipping", sourceCode: "02090" },
  { id: "gym-jumprope-fast", name: "Jump Rope: Fast (120-140 skips/min)", category: "Gym & Conditioning", met: 12.0, description: "Double-unders or rapid skipping pace", sourceCode: "02091" },

  // --- 6. Mind-Body & Flexibility (3 entries) ---
  { id: "gym-yoga", name: "Hatha Yoga / Gentle Stretching", category: "Gym & Conditioning", met: 2.8, description: "Isometric balance holds, breathing and restorative flow", sourceCode: "02120" },
  { id: "gym-power-yoga", name: "Power / Vinyasa Yoga", category: "Gym & Conditioning", met: 4.0, description: "Continuous flow yoga with dynamic transitions", sourceCode: "02130" },
  { id: "gym-pilates", name: "Pilates: Mat & Reformer", category: "Gym & Conditioning", met: 3.0, description: "Core strength, postural control and flexibility", sourceCode: "02140" },

  // --- 7. Sports & Athletics (12 entries) ---
  { id: "sport-basketball", name: "Basketball: Game Play (Full Court)", category: "Sports & Athletics", met: 8.0, description: "Competitive match play with running and jumping", sourceCode: "15050" },
  { id: "sport-basketball-shoot", name: "Basketball: Shooting Baskets", category: "Sports & Athletics", met: 4.5, description: "Practicing shooting and light ball handling", sourceCode: "15055" },
  { id: "sport-soccer", name: "Soccer: Competitive Game", category: "Sports & Athletics", met: 7.0, description: "Match play with continuous field running", sourceCode: "15610" },
  { id: "sport-tennis-singles", name: "Tennis: Singles Match", category: "Sports & Athletics", met: 7.3, description: "Active tournament or club singles tennis", sourceCode: "15675" },
  { id: "sport-tennis-doubles", name: "Tennis: Doubles Match", category: "Sports & Athletics", met: 5.0, description: "Moderate movement doubles play", sourceCode: "15680" },
  { id: "sport-football", name: "Football: Touch / Flag", category: "Sports & Athletics", met: 8.0, description: "Active recreational game play", sourceCode: "15250" },
  { id: "sport-volleyball", name: "Volleyball: Indoor Court Game", category: "Sports & Athletics", met: 4.0, description: "Standard court volleyball match", sourceCode: "15710" },
  { id: "sport-beach-volleyball", name: "Volleyball: Beach / Sand", category: "Sports & Athletics", met: 8.0, description: "Playing in deep sand with high physical resistance", sourceCode: "15720" },
  { id: "sport-golf", name: "Golf: Walking & Carrying Clubs", category: "Sports & Athletics", met: 4.3, description: "Walking 18 holes carrying golf bag", sourceCode: "15300" },
  { id: "sport-boxing-spar", name: "Boxing: In Ring Sparring", category: "Sports & Athletics", met: 7.8, description: "High-intensity technical ring sparring", sourceCode: "15080" },
  { id: "sport-boxing-bag", name: "Boxing: Heavy Bag Workout", category: "Sports & Athletics", met: 5.5, description: "Rounds on the heavy punching bag", sourceCode: "15090" },
  { id: "sport-badminton", name: "Badminton: Competitive Match", category: "Sports & Athletics", met: 7.0, description: "Fast-paced tournament or club match play", sourceCode: "15040" },

  // --- 8. Outdoor, Winter & Water Sports (6 entries) ---
  { id: "out-ski-downhill", name: "Skiing: Downhill / Alpine (Moderate)", category: "Outdoor & Recreation", met: 6.0, description: "Downhill skiing on intermediate groomed runs", sourceCode: "19030" },
  { id: "out-ski-nordic", name: "Skiing: Cross Country / Nordic", category: "Outdoor & Recreation", met: 9.0, description: "Cross country skiing at moderate 4-5 mph pace", sourceCode: "19050" },
  { id: "out-skate-ice", name: "Ice Skating: General (9 mph)", category: "Outdoor & Recreation", met: 7.0, description: "Recreational continuous ice skating", sourceCode: "19070" },
  { id: "out-kayak", name: "Kayaking / Canoeing (Moderate)", category: "Outdoor & Recreation", met: 5.0, description: "Paddling at steady 3-4 mph speed", sourceCode: "18070" },
  { id: "out-rock-climb", name: "Rock Climbing: Ascending Route", category: "Outdoor & Recreation", met: 8.0, description: "Ascending technical rock or indoor climbing wall", sourceCode: "15580" },
  { id: "out-skate-roller", name: "Rollerblading / Inline Skating", category: "Outdoor & Recreation", met: 7.5, description: "Continuous moderate inline skating on pavement", sourceCode: "15600" },
];

export interface CaloriesBurnedInput {
  mode: "duration" | "distance";
  unitSystem: UnitSystem;
  activityId: string;
  durationMinutes?: number;
  distanceMiles?: number;
  distanceKm?: number;
  speedMph?: number;
  speedKmh?: number;
  weightLbs?: number;
  weightKg?: number;
}

export interface CaloriesBurnedResult {
  mode: "duration" | "distance";
  activityName: string;
  category: ActivityCategory;
  met: number;
  durationMinutes: number;
  caloriesBurned: number;
  caloriesBurnedRaw: number;
  rawCalories: number;
  rawBurnRate: number;
  rawHourlyRate: number;
  rawFatMassLossLbs: number;
  caloriesPerMinute: number;
  caloriesPerHour: number;
  fatMassLossLbs: number;
  fatMassLossGrams: number;
  foodEquivalents: {
    pizzaSlices: number;
    bananas: number;
    apples: number;
    cheeseburgers: number;
  };
  weightKg: number;
  weightLbs: number;
  comparisonMatrix: Array<{
    activityName: string;
    met: number;
    caloriesBurned: number;
  }>;
}

/**
 * Authoritative Standard Compendium MET Calorie Expenditure Calculation
 *
 * Scientific Conversion Equation:
 * rawCaloriesPerMinute = (MET × 3.5 × weightKg) / 200
 * rawCalories = rawCaloriesPerMinute × durationMinutes = (durationMinutes × MET × 3.5 × weightKg) / 200
 * rawHourlyRate = rawCaloriesPerMinute × 60
 *
 * Internal Migration Note:
 * Legacy reference PDF used a simplified/nonstandard calorie convention (omitting the 3.5 O2 equivalent factor).
 * Production scientific methodology now strictly follows the documented 2024 Compendium of Physical Activities conversion.
 *
 * Baseline Fixtures Verified:
 * 1. Moderate Walking, MET 3.5, 160 lb (72.5748 kg), 45 min = ~200 kcal, 4.45 kcal/min, 266.71 kcal/hr
 * 2. Running 6 mph, MET 9.8, 160 lb (72.5748 kg), 5 miles at 6 mph (50 min) = ~622 kcal, 12.45 kcal/min, 746.79 kcal/hr
 */
export function calculateCaloriesBurned(input: CaloriesBurnedInput): CaloriesBurnedResult {
  const unitSystem = input.unitSystem;
  const mode = input.mode;

  // Weight resolution with high internal precision (1 lb = 0.45359237 kg)
  let weightKg = 70;
  if (unitSystem === "imperial") {
    weightKg = (Number(input.weightLbs) || 160) * 0.45359237;
  } else {
    weightKg = Number(input.weightKg) || 70;
  }
  weightKg = Math.max(20, Math.min(300, weightKg));
  const weightLbs = parseFloat((weightKg / 0.45359237).toFixed(1));

  // Activity lookup
  const activity = ACTIVITIES_DATABASE.find((a) => a.id === input.activityId) || ACTIVITIES_DATABASE[1];
  let durationMinutes = Math.max(1, Number(input.durationMinutes) || 45);
  let met = activity.met;

  if (mode === "distance") {
    let distanceMiles = Number(input.distanceMiles) || 5;
    if (unitSystem === "metric") {
      distanceMiles = (Number(input.distanceKm) || 8) / 1.609344;
    }

    let speedMph = Number(input.speedMph) || 6.0;
    if (unitSystem === "metric") {
      speedMph = (Number(input.speedKmh) || 9.656064) / 1.609344;
    }
    speedMph = Math.max(0.5, Math.min(35, speedMph));

    durationMinutes = Math.round((distanceMiles / speedMph) * 60);

    // Speed-dependent MET categorization
    if (activity.category === "Running") {
      if (speedMph <= 5.0) met = 8.3;
      else if (speedMph <= 5.5) met = 9.0;
      else if (speedMph <= 6.3) met = 9.8;
      else if (speedMph <= 7.0) met = 10.5;
      else if (speedMph <= 7.7) met = 11.5;
      else if (speedMph <= 8.5) met = 12.0;
      else if (speedMph <= 9.5) met = 12.8;
      else met = 14.5;
    } else if (activity.category === "Cycling") {
      if (speedMph <= 10.0) met = 4.0;
      else if (speedMph <= 12.0) met = 6.0;
      else if (speedMph <= 14.0) met = 8.0;
      else if (speedMph <= 16.0) met = 10.0;
      else if (speedMph <= 19.0) met = 12.0;
      else met = 14.0;
    } else {
      // Walking
      if (speedMph <= 2.2) met = 2.8;
      else if (speedMph <= 3.2) met = 3.5;
      else if (speedMph <= 3.7) met = 4.3;
      else if (speedMph <= 4.2) met = 5.0;
      else met = 5.5;
    }
  }

  // Authoritative Standard Compendium MET Formula:
  // rawCaloriesPerMinute = (MET × 3.5 × weightKg) / 200
  // rawCalories = rawCaloriesPerMinute × durationMinutes
  const rawBurnRate = (met * 3.5 * weightKg) / 200;
  const caloriesBurnedRaw = rawBurnRate * durationMinutes;
  const rawHourlyRate = rawBurnRate * 60;
  const rawFatMassLossLbs = caloriesBurnedRaw / 3500;
  const rawFatMassLossGrams = (caloriesBurnedRaw / 7700) * 1000;

  // Boundary-rounded display outputs
  const caloriesBurned = Math.round(caloriesBurnedRaw);
  const caloriesPerMinute = parseFloat(rawBurnRate.toFixed(2));
  const caloriesPerHour = parseFloat(rawHourlyRate.toFixed(2));
  const fatMassLossLbs = parseFloat(rawFatMassLossLbs.toFixed(3));
  const fatMassLossGrams = Math.round(rawFatMassLossGrams);

  // Food equivalents (visual representation aids)
  const foodEquivalents = {
    pizzaSlices: parseFloat((caloriesBurnedRaw / 280).toFixed(1)),
    bananas: parseFloat((caloriesBurnedRaw / 105).toFixed(1)),
    apples: parseFloat((caloriesBurnedRaw / 95).toFixed(1)),
    cheeseburgers: parseFloat((caloriesBurnedRaw / 300).toFixed(1)),
  };

  // Dynamic Comparison Matrix (selected benchmark activities)
  const benchmarkIds = ["walk-slow", "walk-mod", "walk-fast", "walk-hike", "walk-race", "run-jog"];
  const comparisonActivities = ACTIVITIES_DATABASE.filter((a) =>
    a.id !== activity.id && benchmarkIds.includes(a.id)
  ).slice(0, 5);

  const comparisonMatrix = [
    { activityName: activity.name, met, caloriesBurned },
    ...comparisonActivities.map((comp) => ({
      activityName: comp.name,
      met: comp.met,
      caloriesBurned: Math.round((durationMinutes * comp.met * 3.5 * weightKg) / 200),
    })),
  ];

  return {
    mode,
    activityName: activity.name,
    category: activity.category,
    met,
    durationMinutes,
    caloriesBurned,
    caloriesBurnedRaw,
    rawCalories: caloriesBurnedRaw,
    rawBurnRate,
    rawHourlyRate,
    rawFatMassLossLbs,
    caloriesPerMinute,
    caloriesPerHour,
    fatMassLossLbs,
    fatMassLossGrams,
    foodEquivalents,
    weightKg: parseFloat(weightKg.toFixed(1)),
    weightLbs,
    comparisonMatrix,
  };
}
