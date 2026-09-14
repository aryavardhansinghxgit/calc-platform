import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const target_heart_rate_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a good target heart rate when exercising?",
    answer: "The American Heart Association gives a general reference of about 50%–70% of maximum heart rate for moderate activity and 70%–85% for vigorous activity. These are population-based averages, not individualized prescriptions."
  },
  {
    question: "What is the Karvonen formula?",
    answer: "The Karvonen heart-rate-reserve formula is: THR = RHR + Intensity × (MHR − RHR). It incorporates resting heart rate instead of calculating the target solely as a percentage of maximum heart rate."
  },
  {
    question: "What is heart rate reserve?",
    answer: "Heart rate reserve is: HRR = MHR − RHR. It represents the difference between your maximum and resting heart rates within an HRR-based calculation."
  },
  {
    question: "Is 220 minus age an accurate maximum heart rate formula?",
    answer: "It is a commonly used general estimate, but it is not exact for every individual. The American Heart Association uses approximately 220 minus age for general target-zone guidance while emphasizing that the resulting values are averages."
  },
  {
    question: "Which maximum heart rate formula is best?",
    answer: "There is no universally exact formula for every person. Haskell & Fox, Tanaka, Nes and Gellish produce different estimates because they are based on different research models and populations."
  },
  {
    question: "Why does my target heart rate calculator give a different number from my watch?",
    answer: "The two devices or calculators may use different MHR equations, heart-rate-reserve methods, measured thresholds or proprietary algorithms. Compare the underlying methodology before comparing the numbers."
  },
  {
    question: "What is the difference between %MHR and %HRR?",
    answer: "%MHR applies intensity directly to maximum heart rate: MHR × intensity. %HRR first calculates MHR − RHR and then adds the chosen fraction of that reserve to resting heart rate. Because the formulas differ, identical percentages can produce different BPM values."
  },
  {
    question: "What is a normal resting heart rate?",
    answer: "For many adults, 60–100 BPM is considered a typical resting range, although active people can have lower resting heart rates. Individual context matters."
  },
  {
    question: "Is a lower resting heart rate always better?",
    answer: "Not necessarily. Lower resting heart rate can occur in physically fit people, but heart rate should be interpreted alongside symptoms, fitness, medications and overall health."
  },
  {
    question: "Can I use the Karvonen formula for running?",
    answer: "Yes, it can be used as a way to estimate running intensity, provided the MHR and RHR inputs are appropriate. It is still an estimate rather than a guarantee of physiological intensity."
  },
  {
    question: "What heart rate is considered moderate exercise?",
    answer: "The American Heart Association uses about 50%–70% of maximum heart rate as a general moderate-intensity target. The CDC's talk test provides another practical indicator: you can generally talk but not sing."
  },
  {
    question: "What heart rate is considered vigorous exercise?",
    answer: "The American Heart Association generally describes vigorous activity as about 70%–85% of maximum heart rate. The CDC describes vigorous effort as an intensity at which speaking more than a few words without pausing for breath becomes difficult."
  },
  {
    question: "Can I use this calculator if I take beta-blockers?",
    answer: "Heart-rate-based targets may require individualized adjustment because medications such as beta-blockers can alter heart-rate response. The American Heart Association recommends discussing appropriate target heart rate with a healthcare professional when medication or a heart condition affects heart rate."
  },
  {
    question: "Should beginners exercise in Zone 5?",
    answer: "Not simply because a calculator shows Zone 5. Very high-intensity exercise is demanding and is not necessary for every workout. Beginners generally benefit from gradually increasing exercise intensity and duration."
  },
  {
    question: "Is target heart rate the same for everyone of the same age?",
    answer: "No. Age-based equations estimate population averages. People of the same age can have substantially different resting and maximum heart rates."
  },
  {
    question: "Can heart rate predict exactly how hard my workout is?",
    answer: "No. Heart rate is useful, but intensity is also influenced by breathing, perceived exertion, exercise modality, environment, fitness and other factors. The CDC recommends multiple ways of assessing intensity."
  },
  {
    question: "How can I measure my heart rate during exercise?",
    answer: "You can use a wearable heart-rate monitor, chest strap or manually measure your pulse. The American Heart Association describes checking the pulse at the wrist and counting beats to estimate BPM when needed."
  },
  {
    question: "Why does my heart rate change even when I run at the same pace?",
    answer: "Heart rate can vary with temperature, hydration, fatigue, stress, sleep, illness and other conditions. The same pace therefore does not always create the same heart-rate response."
  },
  {
    question: "Should I always stay exactly inside my target zone?",
    answer: "No. Target zones are guides. Training sessions may intentionally use easier recovery periods, moderate steady work or short higher-intensity intervals. The appropriate intensity depends on your goals and individual circumstances."
  }
];
