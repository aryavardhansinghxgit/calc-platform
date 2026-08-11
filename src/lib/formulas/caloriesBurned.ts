export type UnitSystem = "imperial" | "metric";
export type ActivityCategory =
  | "Walking"
  | "Running"
  | "Cycling"
  | "Swimming"
  | "Gym & Fitness"
  | "Sports & Athletics";

export interface ActivityItem {
  id: string;
  name: string;
  category: ActivityCategory;
  met: number;
  description: string;
}

export const ACTIVITIES_DATABASE: ActivityItem[] = [
  // Walking
  { id: "walk-slow", name: "Walking: Slow (2.0 mph / 3.2 km/h)", category: "Walking", met: 2.8, description: "Strolling at a relaxed pace on flat terrain" },
  { id: "walk-mod", name: "Walking: Moderate (3.0 mph / 4.8 km/h)", category: "Walking", met: 3.5, description: "Standard brisk walking pace" },
  { id: "walk-fast", name: "Walking: Brisk (4.0 mph / 6.4 km/h)", category: "Walking", met: 5.0, description: "Vigorous pace with active arm swing" },
  { id: "walk-hike", name: "Hiking: Cross-country / Trail", category: "Walking", met: 6.0, description: "Walking over uneven terrain with elevation" },
  { id: "walk-race", name: "Race Walking", category: "Walking", met: 6.5, description: "Competitive high-speed power walking" },

  // Running
  { id: "run-jog", name: "Jogging (5.0 mph / 8.0 km/h)", category: "Running", met: 8.3, description: "Light jogging pace" },
  { id: "run-6mph", name: "Running (6.0 mph / 9.6 km/h, 10 min/mi)", category: "Running", met: 9.8, description: "Moderate distance running" },
  { id: "run-7.5mph", name: "Running (7.5 mph / 12.0 km/h, 8 min/mi)", category: "Running", met: 11.5, description: "Vigorous aerobic running" },
  { id: "run-9mph", name: "Running (9.0 mph / 14.5 km/h, 6.6 min/mi)", category: "Running", met: 12.8, description: "High-speed competitive running" },
  { id: "run-sprint", name: "Sprinting / Track Intervals (10+ mph)", category: "Running", met: 14.5, description: "Maximum intensity sprint efforts" },

  // Cycling
  { id: "bike-leisure", name: "Cycling: Leisure (<10 mph / <16 km/h)", category: "Cycling", met: 5.8, description: "Casual neighborhood bicycling" },
  { id: "bike-mod", name: "Cycling: Moderate (12-14 mph / 19-22 km/h)", category: "Cycling", met: 8.0, description: "Standard road cycling pace" },
  { id: "bike-vig", name: "Cycling: Vigorous (14-16 mph / 22-25 km/h)", category: "Cycling", met: 10.0, description: "High-effort athletic cycling" },
  { id: "bike-race", name: "Cycling: Racing (>20 mph / >32 km/h)", category: "Cycling", met: 12.0, description: "Competitive road racing" },
  { id: "bike-stationary", name: "Stationary Bike: Moderate Effort", category: "Cycling", met: 6.8, description: "Indoor gym cycling" },

  // Swimming
  { id: "swim-mod", name: "Swimming: Freestyle Moderate", category: "Swimming", met: 5.8, description: "Continuous lap swimming at steady pace" },
  { id: "swim-vig", name: "Swimming: Freestyle Vigorous", category: "Swimming", met: 9.8, description: "Fast-paced competitive lap swimming" },
  { id: "swim-breast", name: "Swimming: Breaststroke", category: "Swimming", met: 5.3, description: "Moderate effort breaststroke laps" },
  { id: "swim-back", name: "Swimming: Backstroke", category: "Swimming", met: 4.8, description: "Moderate backstroke lap swimming" },
  { id: "swim-butterfly", name: "Swimming: Butterfly", category: "Swimming", met: 13.8, description: "Vigorous butterfly stroke" },

  // Gym & Fitness
  { id: "gym-weights-light", name: "Weightlifting: Light / Moderate", category: "Gym & Fitness", met: 3.5, description: "Standard hypertrophy training with rest periods" },
  { id: "gym-weights-heavy", name: "Weightlifting: Heavy / Powerlifting", category: "Gym & Fitness", met: 6.0, description: "Intense compound lifts with short rest" },
  { id: "gym-hiit", name: "HIIT / Calisthenics / Circuit Training", category: "Gym & Fitness", met: 8.0, description: "High-intensity interval training" },
  { id: "gym-elliptical", name: "Elliptical Trainer: Moderate", category: "Gym & Fitness", met: 5.0, description: "Standard elliptical cardio" },
  { id: "gym-rowing", name: "Rowing Machine: Moderate (100W)", category: "Gym & Fitness", met: 7.0, description: "Full-body ergometer rowing" },
  { id: "gym-jumprope", name: "Jump Rope: Fast Pace", category: "Gym & Fitness", met: 11.8, description: "Vigorous continuous skipping" },
  { id: "gym-yoga", name: "Hatha Yoga / Pilates", category: "Gym & Fitness", met: 2.8, description: "Stretching, isometric holds, core flow" },

  // Sports & Athletics
  { id: "sport-basketball", name: "Basketball: Game Play", category: "Sports & Athletics", met: 8.0, description: "Full-court competitive game" },
  { id: "sport-soccer", name: "Soccer: Competitive Game", category: "Sports & Athletics", met: 7.0, description: "Match play with continuous running" },
  { id: "sport-tennis", name: "Tennis: Singles Match", category: "Sports & Athletics", met: 7.3, description: "Active singles play" },
  { id: "sport-football", name: "Touch / Flag Football", category: "Sports & Athletics", met: 8.0, description: "Active recreational game" },
  { id: "sport-volleyball", name: "Volleyball: Game", category: "Sports & Athletics", met: 4.0, description: "Standard court match" },
  { id: "sport-golf", name: "Golf: Walking & Carrying Clubs", category: "Sports & Athletics", met: 4.3, description: "Walking 18 holes while carrying bag" },
  { id: "sport-boxing", name: "Boxing: Sparring", category: "Sports & Athletics", met: 7.8, description: "Competitive ring sparring" },
  { id: "sport-kayak", name: "Kayaking / Canoeing", category: "Sports & Athletics", met: 5.0, description: "Moderate paddling effort" },
];

export interface CaloriesBurnedInput {
  mode: "duration" | "distance";
  unitSystem: UnitSystem;
  activityId: string;
  durationMinutes?: number;
  distanceMiles?: number;
  distanceKm?: number;
  speedMph?: number;
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

export function calculateCaloriesBurned(input: CaloriesBurnedInput): CaloriesBurnedResult {
  const unitSystem = input.unitSystem;
  const mode = input.mode;

  let weightKg = 70;
  if (unitSystem === "imperial") {
    weightKg = (Number(input.weightLbs) || 160) / 2.20462;
  } else {
    weightKg = Number(input.weightKg) || 70;
  }
  weightKg = Math.max(20, Math.min(300, weightKg));
  const weightLbs = parseFloat((weightKg * 2.20462).toFixed(1));

  let activity = ACTIVITIES_DATABASE.find((a) => a.id === input.activityId) || ACTIVITIES_DATABASE[1];
  let durationMinutes = Math.max(1, Number(input.durationMinutes) || 45);
  let met = activity.met;

  if (mode === "distance") {
    let distanceMiles = Number(input.distanceMiles) || 5;
    if (unitSystem === "metric") {
      distanceMiles = (Number(input.distanceKm) || 8) / 1.60934;
    }

    let speedMph = Number(input.speedMph) || 6.0;
    speedMph = Math.max(0.5, Math.min(30, speedMph));

    durationMinutes = Math.round((distanceMiles / speedMph) * 60);

    // Dynamic MET derived from speed
    if (activity.category === "Running") {
      if (speedMph <= 5.0) met = 8.3;
      else if (speedMph <= 6.0) met = 9.8;
      else if (speedMph <= 7.5) met = 11.5;
      else if (speedMph <= 9.0) met = 12.8;
      else met = 14.5;
    } else if (activity.category === "Cycling") {
      if (speedMph <= 10.0) met = 5.8;
      else if (speedMph <= 14.0) met = 8.0;
      else if (speedMph <= 16.0) met = 10.0;
      else met = 12.0;
    } else {
      // Walking
      if (speedMph <= 2.5) met = 2.8;
      else if (speedMph <= 3.5) met = 3.5;
      else if (speedMph <= 4.5) met = 5.0;
      else met = 6.5;
    }
  }

  // Primary Calorie Formula: Calories = Time (min) * MET * Weight (kg) / 200
  const caloriesBurnedRaw = (durationMinutes * met * weightKg) / 200;
  const caloriesBurned = Math.round(caloriesBurnedRaw);

  const caloriesPerMinute = parseFloat((caloriesBurnedRaw / durationMinutes).toFixed(1));
  const caloriesPerHour = Math.round(caloriesPerMinute * 60);

  // Equivalents
  const fatMassLossLbs = parseFloat((caloriesBurnedRaw / 3500).toFixed(3));
  const fatMassLossGrams = Math.round((caloriesBurnedRaw / 7700) * 1000);

  const foodEquivalents = {
    pizzaSlices: parseFloat((caloriesBurnedRaw / 280).toFixed(1)),
    bananas: parseFloat((caloriesBurnedRaw / 105).toFixed(1)),
    apples: parseFloat((caloriesBurnedRaw / 95).toFixed(1)),
    cheeseburgers: parseFloat((caloriesBurnedRaw / 300).toFixed(1)),
  };

  // Comparison across top activities for this duration & body weight
  const comparisonActivities = ACTIVITIES_DATABASE.filter((a) => a.id !== activity.id).slice(0, 5);
  const comparisonMatrix = [
    { activityName: activity.name, met, caloriesBurned },
    ...comparisonActivities.map((comp) => ({
      activityName: comp.name,
      met: comp.met,
      caloriesBurned: Math.round((durationMinutes * comp.met * weightKg) / 200),
    })),
  ];

  return {
    mode,
    activityName: activity.name,
    category: activity.category,
    met,
    durationMinutes,
    caloriesBurned,
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
