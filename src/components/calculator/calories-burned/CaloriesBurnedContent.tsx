"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity, Flame, Zap, ShieldCheck } from "lucide-react";

export function CaloriesBurnedContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is MET (Metabolic Equivalent of Task)?",
      a: "MET is a standardized physiological measure expressing the energy cost of physical activities relative to quiet resting metabolic rate. One MET is defined as an oxygen uptake of 3.5 mL O₂ per kilogram of body weight per minute, which equals burning approximately 1.0 kcal per kilogram per hour at rest."
    },
    {
      q: "How is calories burned calculated from MET?",
      a: "The standard clinical equation for calories burned is: Calories = (Duration in minutes × MET × Body Weight in kg) / 200. For example, a 70 kg person walking at 3.5 METs for 60 minutes burns: (60 × 3.5 × 70) / 200 = 73.5 × 3.5 = 257.25 kcal."
    },
    {
      q: "Why does a heavier person burn more calories for the exact same activity?",
      a: "Energy expenditure is directly proportional to body mass. Moving a larger body mass against gravity or air resistance requires greater muscle force, higher oxygen consumption (VO₂), and more metabolic energy."
    },
    {
      q: "Does walking 5 miles burn the same calories as running 5 miles?",
      a: "Running 5 miles burns approximately 20% to 30% more calories total than walking 5 miles. While both cover the same distance, running involves higher vertical oscillation (lifting body weight with each stride) and greater aerodynamic drag."
    },
    {
      q: "What is EPOC (Excess Post-Exercise Oxygen Consumption)?",
      a: "EPOC, commonly known as the 'afterburn effect', is the elevated rate of oxygen consumption following intense physical activity (such as HIIT or heavy weightlifting) as the body restores glycogen, clears lactate, and repairs muscle tissue."
    },
    {
      q: "How many calories must be burned to lose 1 pound of body fat?",
      a: "One pound of human adipose fat tissue stores approximately 3,500 kcal of energy. Creating a cumulative energy deficit of 3,500 kcal through exercise and caloric reduction results in approximately 1 lb (0.45 kg) of fat loss."
    },
    {
      q: "How accurate are smartwatch calorie counters compared to this calculator?",
      a: "Consumer smartwatches rely on heart rate sensors and motion accelerometers with a clinical margin of error between ±10% and ±25%. MET-based formulas provide a standardized scientific baseline validated by room calorimetry studies."
    },
    {
      q: "Does temperature affect how many calories you burn during exercise?",
      a: "Yes. Exercising in extreme cold increases calorie burn through shivering thermogenesis. Exercising in extreme heat increases heart rate and sweat production, slightly elevating caloric cost due to thermoregulatory strain."
    },
    {
      q: "Why do high-intensity workouts burn more fat even if they burn fewer total fat calories during the workout?",
      a: "During high-intensity exercise (HIIT), carbohydrates provide the primary metabolic fuel. However, post-workout recovery (EPOC) relies heavily on fat oxidation to rebuild muscle glycogen, boosting total 24-hour fat loss."
    },
    {
      q: "Does muscle mass increase calories burned during exercise?",
      a: "Yes. Muscle tissue is metabolically active and consumes more oxygen per minute than adipose fat mass, increasing both resting metabolic rate (BMR) and total calories burned during physical exertion."
    },
    {
      q: "What is the difference between gross calories burned and net calories burned?",
      a: "Gross calories burned includes total energy expended during the workout, including basal metabolism. Net calories burned subtracts your resting BMR calories from the gross total to calculate calories burned strictly by exercise movement."
    },
    {
      q: "How does cycling speed impact calorie burn?",
      a: "Aerodynamic drag increases quadratically with speed in cycling. Doubling your cycling speed from 10 mph to 20 mph requires nearly 8 times more power output, dramatically increasing MET and calorie burn per mile."
    },
    {
      q: "Can resistance training burn as many calories as cardio?",
      a: "Intense circuit weightlifting or powerlifting can achieve MET ratings of 6.0 to 8.0, matching moderate cardio. Additionally, resistance training preserves lean muscle mass during weight loss, preventing BMR reduction."
    },
    {
      q: "What role does Non-Exercise Activity Thermogenesis (NEAT) play?",
      a: "NEAT includes all non-workout movement such as fidgeting, walking to the car, and household chores. NEAT can account for 15% to 50% of total daily energy expenditure and varies widely between individuals."
    },
    {
      q: "Why does exercise calorie burn plateau as fitness improves?",
      a: "As neuromuscular efficiency and cardiovascular conditioning improve, your body performs movements with less biomechanical waste and lower heart rates, slightly reducing caloric expenditure for the same workload."
    },
    {
      q: "How does swimming compare to running in calorie burn?",
      a: "Vigorous swimming (butterfly or fast freestyle, MET 9.8-13.8) burns calories at rates comparable to or higher than 6-7 mph running, while eliminating joint impact due to water buoyancy."
    },
    {
      q: "Should I eat back all the calories I burn during workouts when trying to lose weight?",
      a: "No. Consuming 100% of estimated exercise calories often leads to weight loss plateaus due to overestimating calorie burn and underestimating food intake. Refueling 50% of workout calories is recommended for active weight loss."
    },
    {
      q: "What is the Compendium of Physical Activities?",
      a: "The Compendium of Physical Activities is a comprehensive coding system originally developed by Dr. Barbara Ainsworth in 1993 and updated regularly by ACSM researchers to categorize MET values for hundreds of human activities."
    },
    {
      q: "How does age affect calories burned during exercise?",
      a: "Older adults experience gradual reductions in maximal oxygen consumption (VO₂ max) and skeletal muscle mass, which slightly lowers maximal caloric expenditure capability compared to younger individuals at peak intensity."
    },
    {
      q: "What is the best exercise for maximum calorie burn per minute?",
      a: "High-intensity activities such as sprinting (14.5 METs), continuous jump rope (11.8 METs), competitive rowing (12.0 METs), and butterfly swimming (13.8 METs) yield the highest calorie burn rates per minute."
    },
    {
      q: "How does altitude impact exercise calorie burn?",
      a: "At high altitudes, lower ambient oxygen density forces the respiratory and cardiovascular systems to work harder (higher heart rate and breathing frequency), increasing acute metabolic exertion."
    },
    {
      q: "Does caffeine increase calories burned during workouts?",
      a: "Caffeine stimulates the central nervous system, increases epinephrine release, enhances fatty acid mobilization, and reduces perceived exertion, allowing athletes to train harder and burn 3-5% more calories."
    },
    {
      q: "What is the difference between aerobic and anaerobic calorie burn?",
      a: "Aerobic exercise burns fuel (fat and glucose) in the presence of oxygen for sustained energy. Anaerobic exercise burns glycogen rapidly without oxygen, producing lactate and driving higher post-exercise EPOC."
    },
    {
      q: "How often should I log physical activity calories?",
      a: "Log workout duration and intensity after each session or weekly to track cumulative physical activity volume and evaluate energy balance trends over 4-to-8-week intervals."
    },
    {
      q: "What is the single most important factor in exercise calorie calculation?",
      a: "Body weight and activity intensity (MET) are the two primary mathematical multipliers determining energy expenditure during physical exercise."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
          <Flame className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Clinical Guide to Exercise Energetics &amp; MET Physiology
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Understanding the bioenergetics of physical exercise is essential for weight management, athletic performance, and metabolic health. When human skeletal muscles contract, ATP (adenosine triphosphate) is hydrolyzed to produce mechanical work. The body resynthesizes ATP through oxidative phosphorylation and anaerobic glycolysis, requiring measurable volumes of oxygen (VO₂) and burning dietary calories.
        </p>
      </section>

      {/* 2. Clinical Formula Section */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. Mathematical Formulation of MET Calorie Expenditure
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">A. ACSM Standard MET Calorie Equation</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-amber-600 dark:text-amber-400">
              Calories Burned (kcal) = [ Duration (minutes) × MET × Weight (kg) ] / 200
            </code>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">B. Oxygen Consumption ($V_O2$) Equivalent</h4>
            <code className="block p-2 mt-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-blue-600 dark:text-blue-400">
              1 MET = 3.5 mL O₂ / kg / min ≈ 5.0 kcal / L O₂ consumed
            </code>
          </div>
        </div>
      </section>

      {/* 3. 25 Clinical FAQs Accordion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <HelpCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          <h3>Frequently Asked Questions</h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-semibold text-sm text-zinc-900 dark:text-zinc-100 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform text-zinc-500 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
