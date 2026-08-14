import {
  SleepPlannerMode,
  AgeGroupBracket,
  Chronotype,
  SleepCycleOption,
  PowerNapOption,
  SleepDebtResult,
  ChronotypeQuizResult,
  SleepCalculationResult,
} from "./types";

export function formatTime12h(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' is '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minutesStr} ${ampm}`;
}

export function parseTimeString(timeStr: string): Date {
  const d = new Date();
  if (!timeStr) return d;

  const [time, modifier] = timeStr.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier) {
    if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
  }

  d.setHours(hours, minutes, 0, 0);
  return d;
}

export function calculateSleepCycles(
  targetTimeStr: string,
  mode: SleepPlannerMode = "wakeup",
  latencyMinutes: number = 15,
  ageBracket: AgeGroupBracket = "adult"
): SleepCycleOption[] {
  const targetDate = mode === "now" ? new Date() : parseTimeString(targetTimeStr);
  const cycleCountList = [6, 5, 4, 3];

  return cycleCountList.map((cycles) => {
    const cycleMinutes = cycles * 90;
    const calcDate = new Date(targetDate.getTime());

    if (mode === "wakeup") {
      // Subtract sleep time + latency from wake-up time
      calcDate.setMinutes(calcDate.getMinutes() - cycleMinutes - latencyMinutes);
    } else {
      // Add latency + sleep time to bedtime / now
      calcDate.setMinutes(calcDate.getMinutes() + latencyMinutes + cycleMinutes);
    }

    const totalSleepMinutes = cycleMinutes;
    const totalSleepHours = cycleMinutes / 60;
    const formatted = formatTime12h(calcDate);

    let status: "optimal" | "sufficient" | "deficit" = "sufficient";
    let colorTag = "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300";
    let note = `${cycles} Cycles (6.0 Hours) — Acceptable Minimum`;

    if (cycles >= 5) {
      status = "optimal";
      colorTag = "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 font-bold";
      note = `${cycles} Cycles (${totalSleepHours} Hours) — Optimal & Recommended`;
    } else if (cycles <= 3) {
      status = "deficit";
      colorTag = "bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300";
      note = `${cycles} Cycles (4.5 Hours) — Warning: Risk of Sleep Inertia & Brain Fog`;
    }

    return {
      cycles,
      totalSleepMinutes,
      totalSleepHours,
      timeFormatted: formatted,
      status,
      colorTag,
      note,
    };
  });
}

export function calculatePowerNaps(baseDate: Date = new Date()): PowerNapOption[] {
  // Quick 20-min
  const date20 = new Date(baseDate.getTime());
  date20.setMinutes(date20.getMinutes() + 20);

  // Full 90-min
  const date90 = new Date(baseDate.getTime());
  date90.setMinutes(date90.getMinutes() + 90);

  // Nappuccino (20-min caffeine nap)
  const dateNap = new Date(baseDate.getTime());
  dateNap.setMinutes(dateNap.getMinutes() + 20);

  return [
    {
      type: "quick",
      title: "20-Minute Power Nap (Quick Refresh)",
      durationMinutes: 20,
      bestFor: "Midday energy boost without entering N3 deep sleep.",
      instructions: "Set alarm for 20 minutes. Avoid napping past 3:00 PM.",
      wakeTimeFormatted: formatTime12h(date20),
    },
    {
      type: "full",
      title: "90-Minute Full Cycle Nap (Memory Reset)",
      durationMinutes: 90,
      bestFor: "Complete NREM + REM cycle for intense physical & mental recovery.",
      instructions: "Wakes you at the completion of a full ultradian cycle.",
      wakeTimeFormatted: formatTime12h(date90),
    },
    {
      type: "nappuccino",
      title: "Caffeine Nap ('Nappuccino')",
      durationMinutes: 20,
      bestFor: "Maximum alertness boost combining coffee with adenosine clearance.",
      instructions: "Drink a cup of black coffee immediately before a 20-minute nap. Caffeine peaks right as you wake up.",
      wakeTimeFormatted: formatTime12h(dateNap),
    },
  ];
}

export function calculateSleepDebt(
  dailyTargetHours: number = 8,
  actualWeeklyHours: number = 42
): SleepDebtResult {
  const targetWeekly = dailyTargetHours * 7;
  const debtHours = Math.max(0, parseFloat((targetWeekly - actualWeeklyHours).toFixed(1)));

  let days = 3;
  let extraMins = 45;
  let plan = "You are getting sufficient sleep! Keep maintaining your current routine.";

  if (debtHours > 0 && debtHours <= 5) {
    days = 3;
    extraMins = 30;
    plan = `Gentle 3-Day Recovery Plan: Add 30 minutes of extra sleep per night for 3 days. Go to bed 30 mins earlier to clear your ${debtHours}h debt.`;
  } else if (debtHours > 5) {
    days = 5;
    extraMins = 60;
    plan = `Structured 5-Day Recovery Plan: You have accumulated ${debtHours} hours of sleep debt. Add 60 minutes of extra sleep per night for 5 days. Avoid weekend sleep-ins past 90 mins to protect your circadian rhythm.`;
  }

  return {
    weeklyActualHours: actualWeeklyHours,
    weeklyTargetHours: targetWeekly,
    totalDebtHours: debtHours,
    recoveryDays: days,
    dailyExtraMinutes: extraMins,
    recoveryPlanNotes: plan,
  };
}

export function evaluateChronotype(answers: { morningAlertness: number; eveningEnergy: number; lightSensitivity: number }): ChronotypeQuizResult {
  const score = answers.morningAlertness + answers.eveningEnergy + answers.lightSensitivity;

  if (score <= 4) {
    return {
      chronotype: "lion",
      name: "Lion (Early Morning Lark)",
      description: "Early risers who wake up energized at dawn and perform peak work before noon. Energy fades by early evening.",
      idealBedtimeWindow: "9:00 PM – 10:00 PM",
      peakProductivityHours: "8:00 AM – 12:00 PM",
      caffeineCutoff: "12:00 PM",
    };
  } else if (score <= 7) {
    return {
      chronotype: "bear",
      name: "Bear (Solar Rhythm)",
      description: "Tracks the sun's natural cycle. Represents 55% of the population. Performs best with 8 hours of sleep per night.",
      idealBedtimeWindow: "10:00 PM – 11:00 PM",
      peakProductivityHours: "10:00 AM – 2:00 PM",
      caffeineCutoff: "2:00 PM",
    };
  } else if (score <= 10) {
    return {
      chronotype: "wolf",
      name: "Wolf (Night Owl)",
      description: "Late risers who experience peak mental sharpness in the late afternoon and evening.",
      idealBedtimeWindow: "12:00 AM – 1:00 AM",
      peakProductivityHours: "5:00 PM – 9:00 PM",
      caffeineCutoff: "4:00 PM",
    };
  } else {
    return {
      chronotype: "dolphin",
      name: "Dolphin (Light / Sensitive Sleeper)",
      description: "High intelligence, detail-oriented, but prone to light sleeping, anxiety, and insomnia.",
      idealBedtimeWindow: "11:30 PM – 12:00 AM",
      peakProductivityHours: "3:00 PM – 7:00 PM",
      caffeineCutoff: "1:00 PM",
    };
  }
}

export function calculateSleepFromInputs(inputs: Record<string, any>): SleepCalculationResult {
  const mode = (inputs.mode as SleepPlannerMode) || "wakeup";
  const targetTime = inputs.targetTime || "07:00 AM";
  const latency = Number(inputs.latency) || 15;
  const ageBracket = (inputs.ageBracket as AgeGroupBracket) || "adult";

  const cycles = calculateSleepCycles(targetTime, mode, latency, ageBracket);
  const naps = calculatePowerNaps(new Date());

  return {
    mode,
    targetTime,
    latencyMinutes: latency,
    ageBracket,
    cycles,
    naps,
  };
}
