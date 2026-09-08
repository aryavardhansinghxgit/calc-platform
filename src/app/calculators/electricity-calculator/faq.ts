import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const electricity_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate how much electricity an appliance uses?",
    answer:
      "Use: kWh = watts × hours ÷ 1,000. If the appliance operates only part of the time at its rated load, incorporate the appropriate duty cycle.",
  },
  {
    question: "How do I calculate appliance electricity cost?",
    answer:
      "Multiply the appliance's energy consumption in kWh by the applicable electricity price per kWh.",
  },
  {
    question: "How much electricity does a 1,500 W appliance use in 8 hours?",
    answer:
      "At 100% operation: 12 kWh. At 60% duty cycle: 7.2 kWh.",
  },
  {
    question: "What is the difference between watts and kWh?",
    answer:
      "Watts measure power. Kilowatt-hours measure accumulated electrical energy.",
  },
  {
    question: "How does duty cycle affect the electricity bill?",
    answer:
      "A lower duty cycle reduces the effective average power and therefore reduces calculated energy consumption and cost.",
  },
  {
    question: "What electricity rate should I enter?",
    answer:
      "Use the rate applicable to your utility plan. The EIA's 2025 U.S. residential average was 17.30¢/kWh, but actual prices vary significantly by location.",
  },
  {
    question: "Why is my electricity bill higher than the calculator estimate?",
    answer:
      "Your utility bill can include fixed charges, demand charges, taxes, delivery charges, TOU pricing or other components. DOE describes multiple categories of utility-bill charges beyond basic kWh energy charges.",
  },
  {
    question: "What is a time-of-use electricity rate?",
    answer:
      "It is a tariff in which electricity costs differ depending on when it is consumed. Peak and off-peak periods can have different prices.",
  },
  {
    question: "Can shifting electricity usage reduce my bill without reducing kWh?",
    answer:
      "Yes. Under a time-of-use plan, moving flexible consumption from higher-priced periods to lower-priced periods can reduce energy charges without necessarily reducing total kWh.",
  },
  {
    question: "What is a whole-house electricity calculator?",
    answer:
      "It combines estimates for multiple appliances to estimate total household electricity consumption and identify the loads contributing most to the total.",
  },
  {
    question: "What is the biggest electricity user in a home?",
    answer:
      "It depends on the appliances and their operating patterns. High wattage does not automatically mean highest monthly energy consumption.",
  },
  {
    question: "What is standby or vampire power?",
    answer:
      "It is electricity consumed by electronics while they are switched off, idle or in standby mode.",
  },
  {
    question: "Does a 1.5-ton AC use 3.5 kW of electricity?",
    answer:
      "No. One refrigeration ton represents 12,000 BTU/hr of cooling capacity, not 3.51685 kW of electrical input.",
  },
  {
    question: "How are electricity carbon emissions estimated?",
    answer:
      "A simplified estimate multiplies electricity consumption by an emissions factor. Actual factors depend on the electricity-generation mix and methodology. EPA maintains updated electricity-related emissions factors through its GHG reporting resources.",
  },
  {
    question: "How do I calculate energy savings from an LED upgrade?",
    answer:
      "Compare old and new power consumption, multiply the difference by operating time, and convert the result to annual kWh and annual monetary savings.",
  },
  {
    question: "How is simple electricity-upgrade payback calculated?",
    answer:
      "A simple payback period is: Initial investment ÷ periodic monetary savings. The calculator converts that relationship to months for the displayed payback metric.",
  },
  {
    question: "What is the difference between five-year cumulative savings and net profit?",
    answer:
      "Cumulative savings are the total electricity-cost savings. Net profit subtracts the original upgrade investment from those savings.",
  },
  {
    question: "Can a zero tariff be used?",
    answer:
      "Yes. The production version preserves valid zero values instead of replacing them with a default positive rate.",
  },
  {
    question: "Is the carbon result exact?",
    answer:
      "No. It is an estimate based on an emissions factor.",
  },
  {
    question: "Is this calculator a replacement for my electricity meter?",
    answer:
      "No. It is an estimation and planning tool. Meter data or appropriate monitoring equipment provides measured real-world consumption.",
  },
];
