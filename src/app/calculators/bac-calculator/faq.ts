export interface BacFaqItem {
  question: string;
  answer: string;
  category: "Fundamentals" | "Formulas" | "Metabolism" | "Driving & Law" | "Health & Safety";
}

export const bacFaqs: BacFaqItem[] = [
  {
    question: "What is a BAC calculator?",
    answer: "A BAC calculator estimates blood alcohol concentration from inputs such as alcohol consumed, beverage strength, body weight, sex, and elapsed time. It uses a mathematical model and therefore provides an estimate rather than a measured BAC.",
    category: "Fundamentals",
  },
  {
    question: "How accurate is a BAC calculator?",
    answer: "Its arithmetic can be deterministic, but the physiological estimate is uncertain. Real BAC varies with absorption, distribution and metabolism, and individual metabolism differs substantially.",
    category: "Fundamentals",
  },
  {
    question: "What is the Widmark formula?",
    answer: "Widmark is a mathematical model that estimates BAC from alcohol dose, body mass and an alcohol-distribution factor. This calculator also applies assumptions for time and other selected model parameters.",
    category: "Formulas",
  },
  {
    question: "How many grams of alcohol are in a standard drink?",
    answer: "A U.S. standard drink contains about 14 grams of pure alcohol (approximately 0.6 fluid ounces).",
    category: "Fundamentals",
  },
  {
    question: "Is a 12-ounce beer always one standard drink?",
    answer: "No. A 12-ounce beer at approximately 5% ABV is about one U.S. standard drink, but a 12-ounce beer at 10% ABV contains about twice as much alcohol.",
    category: "Fundamentals",
  },
  {
    question: "Does body weight affect BAC?",
    answer: "Yes. In Widmark-style models, a larger distribution mass generally lowers the estimated concentration from the same alcohol dose. Actual BAC also depends on many factors beyond weight.",
    category: "Formulas",
  },
  {
    question: "Does drinking on an empty stomach increase BAC?",
    answer: "It can increase the rate of alcohol absorption and result in a higher blood alcohol level compared with drinking on a full stomach.",
    category: "Metabolism",
  },
  {
    question: "Does food make alcohol leave your body faster?",
    answer: "Food primarily affects absorption and the timing/magnitude of the peak. It does not provide a simple shortcut for removing alcohol from the bloodstream.",
    category: "Metabolism",
  },
  {
    question: "What is the alcohol elimination rate?",
    answer: "This calculator uses a default model value of 0.015% BAC per hour. It is an assumption used for projection, not a guaranteed personal metabolic rate.",
    category: "Metabolism",
  },
  {
    question: "Does coffee lower BAC?",
    answer: "Coffee does not reliably accelerate alcohol metabolism. NIAAA notes that alcohol metabolism is not sped up by caffeine or similar attempts to sober up.",
    category: "Metabolism",
  },
  {
    question: "How long does alcohol stay in your system?",
    answer: "There is no single exact time that applies to everyone. Alcohol metabolism varies substantially between individuals, so a calculator can only provide a model-based estimate.",
    category: "Metabolism",
  },
  {
    question: "What does 0.08% BAC mean?",
    answer: "It means a BAC of 0.08 grams of alcohol per deciliter of blood. In the United States it is the general illegal-per-se limit for adult drivers in most jurisdictions, while important exceptions and lower limits apply.",
    category: "Driving & Law",
  },
  {
    question: "Is 0.08% BAC a universal legal driving limit?",
    answer: "No. Laws vary by jurisdiction and driver category. Utah, for example, uses 0.05 for the general adult driving limit, while lower thresholds apply to certain drivers.",
    category: "Driving & Law",
  },
  {
    question: "Can I use a BAC calculator to know when I can drive?",
    answer: "No. Do not use a calculator to determine whether it is safe or legal to drive. NHTSA notes that driving impairment can occur below 0.08 BAC.",
    category: "Driving & Law",
  },
  {
    question: "Does a BAC of 0.00% on the calculator prove sobriety?",
    answer: "No. It means the selected mathematical model has reached zero. It does not prove physical sobriety, absence of impairment, or legal driving status.",
    category: "Health & Safety",
  },
  {
    question: "Why does my BAC result differ between Widmark and Seidl?",
    answer: "They use different distribution assumptions. Widmark uses a distribution factor, while Seidl estimates its factor from anthropometric variables such as height and body weight.",
    category: "Formulas",
  },
  {
    question: "Why does my result differ from another BAC calculator?",
    answer: "Different calculators may use different alcohol-density constants, distribution factors, elimination rates, food assumptions, drink definitions or timing models.",
    category: "Formulas",
  },
  {
    question: "Is the BAC calculator the same as a breathalyzer?",
    answer: "No. A calculator produces a mathematical estimate. A breathalyzer measures breath alcohol and is used as an actual alcohol-testing device.",
    category: "Fundamentals",
  },
  {
    question: "Does drinking water lower BAC?",
    answer: "Water can help with hydration, but it does not provide a reliable shortcut for clearing ethanol from the bloodstream. The calculator does not subtract BAC because water was consumed.",
    category: "Metabolism",
  },
  {
    question: "Does exercise lower BAC?",
    answer: "Exercise should not be treated as a method for rapidly eliminating alcohol. The calculator's elimination model is based on its specified metabolic assumption.",
    category: "Metabolism",
  },
  {
    question: "Does vomiting lower BAC?",
    answer: "Do not rely on vomiting as a method of reducing alcohol exposure or preventing overdose. Alcohol can already have entered the bloodstream, and repeated vomiting can create additional medical risks.",
    category: "Health & Safety",
  },
  {
    question: "How much alcohol is in wine compared with beer?",
    answer: "It depends on serving size and ABV. A typical 12-ounce 5% beer and 5-ounce 12% wine each contain approximately one U.S. standard drink (~14 grams of pure ethanol).",
    category: "Fundamentals",
  },
  {
    question: "How many drinks can raise BAC to 0.08%?",
    answer: "There is no universal number because body size, sex, drinking speed and other factors matter. NIAAA gives a typical pattern of four or more drinks for women or five or more for men in about two hours for reaching the 0.08% binge-drinking threshold, but individual BAC varies.",
    category: "Driving & Law",
  },
  {
    question: "Why does BAC continue rising after I stop drinking?",
    answer: "Alcohol can continue to be absorbed from the gastrointestinal tract after drinking has stopped. NIAAA notes that alcohol is absorbed faster than it is metabolized, so BAC can continue to build during the absorption phase.",
    category: "Metabolism",
  },
  {
    question: "What is peak BAC?",
    answer: "Peak BAC is the highest concentration predicted by the model during the modeled absorption period. It can occur after drinking has stopped because absorption continues.",
    category: "Fundamentals",
  },
  {
    question: "Why does food change my modeled peak BAC?",
    answer: "Food can slow alcohol absorption and alter the peak concentration. The calculator models this through its selected stomach-state assumptions.",
    category: "Metabolism",
  },
  {
    question: "Does the calculator measure my actual BAC?",
    answer: "No. It calculates a theoretical estimate based on the inputs and model assumptions. Actual BAC requires an appropriate alcohol measurement method.",
    category: "Health & Safety",
  },
  {
    question: "What does 'modeled BAC' mean?",
    answer: "It means the number is produced by the calculator's mathematical model rather than directly measured from blood or breath.",
    category: "Fundamentals",
  },
  {
    question: "Can BAC be negative?",
    answer: "No. The calculator constrains modeled BAC at zero. Once its projected value reaches zero, subsequent elimination points remain at zero.",
    category: "Formulas",
  },
  {
    question: "What happens when I enter zero drinks?",
    answer: "The calculator returns zero pure alcohol and zero modeled BAC rather than substituting a default drink session.",
    category: "Fundamentals",
  },
];
