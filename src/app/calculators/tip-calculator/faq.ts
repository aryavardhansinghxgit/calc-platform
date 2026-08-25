import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const tip_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "Should I calculate a tip before or after tax?",
    answer:
      "The calculator supports both conventions. Pre-tax tipping applies the selected percentage to the subtotal. Post-tax tipping applies it to the tax-inclusive base.",
  },
  {
    question: "What is the standard tip percentage in restaurants in the United States?",
    answer:
      "The reference presents 15%-20% as a common table-service range, with 15% for adequate service, 18% as typical for good service, and 20% or more for very good or exceptional service. These are etiquette benchmarks, not universal legal requirements.",
  },
  {
    question: "How do you split a restaurant bill evenly among friends with tip included?",
    answer:
      "Calculate subtotal, tax, and tip, add them to get the grand total, and divide by the number of diners. A reliable calculator then distributes any remainder cents so the displayed shares still reconcile to the displayed total.",
  },
  {
    question: "What is the difference between a tip and a mandatory service charge?",
    answer:
      "A tip is normally discretionary. A mandatory service charge or automatic gratuity is added by the business under the terms shown on the receipt. Check the bill carefully before adding another tip.",
  },
  {
    question: "Is tipping considered offensive in Japan and other countries?",
    answer:
      "Tipping customs vary by country and service context. The reference notes that tipping can be uncommon or culturally inappropriate in some places while being customary elsewhere. Local norms should guide the decision.",
  },
  {
    question: "How much should you tip for food delivery services?",
    answer:
      "The reference gives 15%-20% as a common benchmark and also mentions a minimum suggested base amount. Actual practice depends on local custom, distance, order size, weather, service quality, and personal preference.",
  },
  {
    question: "How do I quickly calculate a 20% tip in my head?",
    answer:
      "Find 10% by moving the decimal point one place left, then double it. For example, 10% of $45 is $4.50, so 20% is $9.00.",
  },
  {
    question: "What should I do if a restaurant automatically adds gratuity to the bill?",
    answer:
      "Check the receipt line by line. If an automatic gratuity or service charge is already present, do not automatically add another identical tip.",
  },
  {
    question: "How much should I tip hotel housekeeping and bellhops?",
    answer:
      "The reference gives example ranges for those services, but they are etiquette benchmarks and can vary by local practice and hotel policy.",
  },
  {
    question: "Do I need to tip on takeout and counter-service orders?",
    answer:
      "The reference treats takeout and counter-service tipping as voluntary and context-dependent. Local custom and the level of service can influence the choice.",
  },
];
