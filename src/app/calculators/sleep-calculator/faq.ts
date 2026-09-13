import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const sleep_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a sleep calculator?",
    answer: "A sleep calculator uses a desired wake time, estimated sleep latency and a planned sleep duration to calculate bedtime options. This calculator also includes nap planning, a weekly sleep-deficit tracker and a consumer chronotype quiz."
  },
  {
    question: "What time should I go to bed if I wake at 7 AM?",
    answer: "It depends on how much sleep you need and how long you usually take to fall asleep. For example, with a 9-hour planned sleep duration and 15 minutes of sleep latency: 7:00 AM - 9 h - 15 min = 9:45 PM. The calculator can generate several planning options."
  },
  {
    question: "Is a 90-minute sleep cycle exact?",
    answer: "No. The calculator uses 90 minutes as a planning heuristic. NHLBI describes sleep cycles as generally restarting around every 80–100 minutes, and cycle duration can vary across the night and between individuals."
  },
  {
    question: "How much sleep should an adult get?",
    answer: "CDC currently recommends at least 7 hours per night for adults ages 18–60. CDC separately lists 7–9 hours for ages 61–64 and 7–8 hours for adults 65 and older."
  },
  {
    question: "Does waking at the end of a sleep cycle guarantee that I will feel refreshed?",
    answer: "No. Sleep inertia and morning alertness depend on factors beyond clock timing, including sleep duration, prior sleep loss, sleep depth and circadian timing."
  },
  {
    question: "What is sleep latency?",
    answer: "Sleep latency is the time it takes to fall asleep after trying to sleep. The calculator uses your estimated latency when working backward from a target wake time."
  },
  {
    question: "Is a 20-minute nap better than a 90-minute nap?",
    answer: "They serve different purposes. A short nap uses less time and may reduce the opportunity for deeper sleep, while a longer nap provides more time for sleep. Research does not support a universal guarantee that one duration will produce the same result for everyone."
  },
  {
    question: "Can a 20-minute nap prevent sleep inertia?",
    answer: "Not always. Short naps may reduce the risk of prolonged sleep inertia in some circumstances, but research shows that results depend on factors such as timing and prior sleep/wake history."
  },
  {
    question: "What is a caffeine nap?",
    answer: "A caffeine nap involves consuming caffeine shortly before a planned nap so that caffeine's alerting effect may coincide with waking. Research has found potential benefits in some settings, but responses vary and caffeine is not a substitute for adequate sleep."
  },
  {
    question: "What is sleep debt?",
    answer: "Sleep debt is commonly used to describe accumulated insufficient sleep. In this calculator, the Sleep Debt Tracker performs a simple arithmetic comparison between your weekly target and actual recorded sleep. It should not be interpreted as a clinical measurement of physiological recovery."
  },
  {
    question: "How is sleep debt calculated here?",
    answer: "The calculator multiplies your target daily sleep by seven and subtracts your actual sleep over the seven-day period: Weekly Deficit = (Target × 7) - Actual. For an 8-hour target and 44 actual hours: (8 × 7) - 44 = 12, so the result is 12 hours below target."
  },
  {
    question: "What if I sleep more than my weekly target?",
    answer: "The calculator reports the difference as a surplus rather than incorrectly setting the deficit to zero. For example, an 8-hour target gives a 56-hour weekly target; 60 actual hours is therefore 4 hours above target."
  },
  {
    question: "What is a chronotype?",
    answer: "Chronotype describes individual differences in preferred timing of sleep and activity. Scientific questionnaires can assess morningness/eveningness and other timing characteristics; this calculator uses a simpler consumer quiz to produce a behavioral profile."
  },
  {
    question: "Are Lion, Bear, Wolf and Dolphin medical diagnoses?",
    answer: "No. They are the categories used by this calculator's consumer chronotype quiz. They should not be treated as diagnoses of insomnia, anxiety or other medical conditions."
  },
  {
    question: "Can my chronotype change?",
    answer: "Your sleep-wake preferences can shift with age, schedule, light exposure and other circumstances. A questionnaire result is therefore better viewed as a snapshot of current preferences than a permanent biological identity."
  },
  {
    question: "What temperature should a bedroom be?",
    answer: "There is no universally mandatory temperature. CDC recommends a cool, dark and quiet bedroom, while CDC/NIOSH gives approximately 65–68°F as a comfortable cool range for many people. Individual comfort, bedding and climate matter."
  },
  {
    question: "Does the calculator diagnose insomnia?",
    answer: "No. It is a planning and educational calculator. Persistent difficulty falling or staying asleep or other concerning sleep symptoms should be discussed with a qualified healthcare professional."
  },
  {
    question: "Why does my calculated bedtime change when I change sleep latency?",
    answer: "Because the calculator solves: Bedtime = Wake - Sleep Duration - Latency. Increasing estimated latency by one minute moves the recommended bedtime one minute earlier while keeping the planned sleep duration unchanged."
  },
  {
    question: "Why does my nap time update when I change the start time?",
    answer: "The Power Nap Blueprint uses the selected Nap Start Time as its input. The current implementation supports a custom start time and a Now button and has been regression-tested for minute-by-minute changes."
  },
  {
    question: "Can I use this calculator for children?",
    answer: "The calculator provides age-specific sleep-duration guidance, but cycle-based timing should not be interpreted as a pediatric medical prescription. CDC sleep recommendations differ substantially by age, especially for infants and children."
  },
  {
    question: "Does more sleep always mean better sleep?",
    answer: "Not necessarily. Sleep quality, regularity, timing and individual circumstances also matter. The calculator is designed to help plan sufficient sleep rather than maximize hours without context."
  }
];
