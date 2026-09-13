import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const tip_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate a 20% tip?",
    answer:
      "Multiply the bill's chosen tip base by 0.20. For example, for a $50 pre-tax bill: $50 × 0.20 = $10.00.",
  },
  {
    question: "How much is an 18% tip on $50?",
    answer:
      "An 18% tip on $50 is $50 × 0.18 = $9.00. If sales tax is 8.5% ($4.25), the grand total is $50 + $4.25 + $9.00 = $63.25.",
  },
  {
    question: "Should I calculate the tip before or after tax?",
    answer:
      "There is no single universal calculation basis for every situation. Emily Post's current restaurant guidance uses a pre-tax basis for its 15%–20% sit-down-service guideline. Some payment systems or diners calculate from the after-tax amount for convenience. Check the establishment's practice and choose the appropriate setting in the calculator.",
  },
  {
    question: "How do I calculate a tip with tax?",
    answer:
      "First calculate the tax amount: Subtotal × (Tax Rate / 100). Then calculate the tip using either the pre-tax subtotal or the after-tax total, depending on the selected basis, and sum subtotal, tax, and tip.",
  },
  {
    question: "What is the formula for a restaurant tip?",
    answer:
      "The basic formula is Tip = Tip Base × (Tip Rate / 100). For a pre-tax tip, Tip Base is the food and beverage subtotal. For a post-tax tip, Tip Base is Subtotal + Sales Tax.",
  },
  {
    question: "How do I split a $63.25 bill between two people?",
    answer:
      "The exact mathematical share is $31.625 each. Because currency cannot be paid in fractions of a cent, a fair-cent allocation distributes the odd cent: Diner 1 pays $31.63 and Diner 2 pays $31.62, summing exactly to $63.25.",
  },
  {
    question: "How do I split a restaurant bill by item?",
    answer:
      "Use the Itemized Group Splitter. Enter each diner and their individual line items, then enter shared appetizers or beverages separately. The calculator allocates shared items, distributes sales tax and tip proportionally, and reconciles the final amounts to the exact cent.",
  },
  {
    question: "How are shared appetizers divided?",
    answer:
      "In the calculator's itemized workflow, shared items are divided equally among participating diners. If the shared amount does not divide evenly into cents, the remainder cents are allocated deterministically so the shared allocations sum exactly to the original pool.",
  },
  {
    question: "What if one person ordered much more than everyone else?",
    answer:
      "Use itemized splitting instead of an equal split. Each diner pays for their own items plus an equal share of common appetizers and a proportional share of tax and gratuity based on their consumption.",
  },
  {
    question: "Why do equal bill splits sometimes differ by one cent?",
    answer:
      "Because a currency total may not divide evenly into cents. For example, $10.01 divided by three is $3.3366... Three identical $3.34 payments would total $10.02. A deterministic remainder allocation assigns $3.34 to two diners and $3.33 to one diner, making the final payments reconcile exactly to $10.01.",
  },
  {
    question: "Does this calculator round each person's bill independently?",
    answer:
      "No. The monetary engine works in integer cents and applies the Largest Remainder Method (Hare-Niemeyer Algorithm) to ensure that the sum of individual diner totals equals the grand total across 100% of cases without cent drift.",
  },
  {
    question: "What happens if the restaurant already added a service charge?",
    answer:
      "Check the receipt before adding another discretionary tip. A mandatory service charge or automatic gratuity may already be included according to the establishment's stated policy.",
  },
  {
    question: "Is a service charge the same as a tip?",
    answer:
      "Not necessarily. A tip is generally a voluntary, discretionary payment chosen by the customer. A service charge is imposed by the business and may be mandatory. The exact treatment and staff distribution depend on the establishment and applicable jurisdiction.",
  },
  {
    question: "Is tipping legally required in the United States?",
    answer:
      "No federal law mandates that restaurant patrons must pay a tip. U.S. labor law governs how employers handle tip pools and when qualifying employers may claim a tip credit under the Fair Labor Standards Act (FLSA), but customer gratuities remain discretionary.",
  },
  {
    question: "Is 15%–20% a legal requirement in the United States?",
    answer:
      "No. Emily Post suggests 15%–20% pre-tax as a current general etiquette benchmark for full table service, but this is a cultural norm, not a legal requirement.",
  },
  {
    question: "Is tipping expected in Japan?",
    answer:
      "Tipping is generally not customary in Japan. Japan's official tourism organization notes that exceptional hospitality (Omotenashi) is included in the bill. Offering extra cash directly to staff is uncommon and can cause confusion, with very limited exceptions for specialized private guides.",
  },
  {
    question: "Can I split a bill with different currencies?",
    answer:
      "A calculation should normally be performed in the bill's native currency. If diners contribute in different currencies, convert individual totals using prevailing exchange rates after calculating the bill in the restaurant's local currency.",
  },
  {
    question: "What is the difference between an equal split and an itemized split?",
    answer:
      "An equal split divides the grand total evenly among diners. An itemized split assigns individual items and shared dishes to each person, distributing tax and tip proportionally based on each diner's order value.",
  },
  {
    question: "Why does my per-person amount sometimes differ from simple division?",
    answer:
      "Simple division produces a mathematical average that often contains fractional cents (e.g. $31.625). Actual payments must be settled in whole cents, so deterministic allocation distributes remainder cents so the total adds up without discrepancy.",
  },
  {
    question: "Can I calculate a tip on the tax-inclusive amount?",
    answer:
      "Yes. Select the 'Post-Tax Total' mode in the calculator. This applies your tip percentage to the subtotal plus sales tax, matching modern payment terminal presets.",
  },
  {
    question: "What percentage should I enter for a tip?",
    answer:
      "Enter the percentage appropriate for your location and service level. Common U.S. benchmarks are 15% for adequate service, 18% for good service, and 20% or more for great service.",
  },
  {
    question: "Does the calculator decide whether I should tip?",
    answer:
      "No. The calculator computes the exact mathematical figures based on your inputs. Social customs, service quality, and establishment policies require your personal judgment.",
  },
];
