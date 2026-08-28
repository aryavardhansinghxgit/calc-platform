export interface FaqItem {
  question: string;
  answer: string;
}

export const traditionalIraFaqs: FaqItem[] = [
  {
    question: "What is a Traditional IRA?",
    answer:
      "A Traditional IRA is an individual retirement account that can provide tax advantages through potentially deductible contributions and tax-deferred growth. Tax treatment depends on the taxpayer's circumstances and applicable IRS rules.",
  },
  {
    question: "How much can I contribute to a Traditional IRA in 2026?",
    answer:
      "The 2026 IRA contribution limit is $7,500, or $8,600 for individuals age 50 or older after the $1,100 catch-up contribution. The limit is shared across Traditional and Roth IRAs and is also limited by taxable compensation when that amount is lower.",
  },
  {
    question: "What was the Traditional IRA contribution limit for 2025?",
    answer:
      "The 2025 IRA contribution limit was $7,000, with a $1,000 catch-up contribution for individuals age 50 or older, producing a potential $8,000 total under IRS rules.",
  },
  {
    question: "Are Traditional IRA contributions tax deductible?",
    answer:
      "They may be. Deductibility depends on factors including modified AGI, filing status and workplace retirement-plan coverage. A Traditional IRA contribution should not automatically be assumed to be fully deductible.",
  },
  {
    question: "What is the difference between a Traditional IRA and Roth IRA?",
    answer:
      "A Traditional IRA generally provides tax treatment earlier in the process through potentially deductible contributions and tax-deferred growth, while a Roth IRA uses after-tax contributions and can provide tax-free qualified withdrawals.",
  },
  {
    question: "Is a Traditional IRA better than a Roth IRA?",
    answer:
      "Neither is universally better. The relative outcome depends on assumptions such as your current tax rate, expected retirement tax rate, contribution timing and investment horizon. The calculator compares the modeled outcomes under your chosen assumptions.",
  },
  {
    question: "How does the Traditional IRA calculator estimate growth?",
    answer:
      "It combines your current balance, annual contributions, investment return and time horizon using the calculator's documented beginning-of-year contribution convention.",
  },
  {
    question: "Why does my contribution amount affect the result so much?",
    answer:
      "Contributions have additional time to compound when made earlier. Over several decades, relatively small annual differences can produce large differences in the ending balance.",
  },
  {
    question: "Can I contribute to both a Traditional IRA and a Roth IRA?",
    answer:
      "You can generally contribute to both when eligible, but the annual IRA limit is shared across the two account types. You do not generally receive a separate full IRA limit for each account.",
  },
  {
    question: "Can I contribute if I have a 401(k) at work?",
    answer:
      "Having a workplace retirement plan does not automatically prevent a Traditional IRA contribution. However, workplace-plan coverage can affect whether the Traditional IRA contribution is deductible.",
  },
  {
    question: "What happens at age 50?",
    answer:
      "Individuals age 50 or older can generally make an IRA catch-up contribution. For 2026, the IRA catch-up amount is $1,100, bringing the combined annual limit to $8,600.",
  },
  {
    question: "Does a Traditional IRA grow tax-free?",
    answer:
      "A Traditional IRA generally provides tax-deferred growth rather than permanently tax-free growth. Taxes are generally deferred until taxable distributions occur in retirement.",
  },
  {
    question: "What happens to a Traditional IRA when I retire?",
    answer:
      "Retirement itself does not automatically require you to withdraw the entire Traditional IRA. However, taxable withdrawals and eventually required minimum distributions can affect retirement income and taxes.",
  },
  {
    question: "What is a Traditional IRA RMD?",
    answer:
      "An RMD is a required minimum distribution that generally must be taken from applicable traditional retirement accounts once the owner reaches the required distribution age under current federal rules. Use the RMD Calculator for a detailed distribution estimate.",
  },
  {
    question: "Does a Traditional IRA have required minimum distributions?",
    answer:
      "Traditional IRA owners are generally subject to RMD requirements once they reach the applicable age (age 73, rising to 75 in 2033). Roth IRA owners generally do not have lifetime RMDs while alive under current federal rules.",
  },
  {
    question: "Can I use this calculator to determine my IRA deduction?",
    answer:
      "No. This calculator can model the retirement-growth consequences of a contribution, but actual Traditional IRA deduction eligibility depends on IRS rules involving income, filing status and retirement-plan coverage.",
  },
  {
    question: "Does this calculator predict my actual retirement balance?",
    answer:
      "No. It is a mathematical projection based on your assumptions. Actual investment returns, contributions, fees, taxes and withdrawals can differ significantly.",
  },
  {
    question: "What return should I enter?",
    answer:
      "Use a return assumption appropriate for scenario analysis rather than treating it as a guaranteed future return. Testing several return assumptions (e.g. 4%, 6%, 8%) is generally more informative than relying on one precise forecast.",
  },
];
