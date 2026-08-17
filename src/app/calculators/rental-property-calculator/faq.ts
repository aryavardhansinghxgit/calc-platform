export interface RentalFAQItem {
  question: string;
  answer: string;
}

export const rental_propertyFaqs: RentalFAQItem[] = [
  {
    question: "What is a good Cap Rate for a rental property?",
    answer:
      "A 'good' Capitalization Rate (Cap Rate) generally ranges between 5% and 10%, depending on property asset class, location, and market risk. High-demand primary urban markets (like NYC or San Francisco) typically trade at lower Cap Rates (4%–6%) due to strong long-term appreciation, whereas secondary or tertiary markets offer higher Cap Rates (8%–10%+) compensating for lower appreciation expectations.",
  },
  {
    question: "How is Cash-on-Cash (CoC) Return different from Cap Rate and IRR?",
    answer:
      "Cap Rate measures the unleveraged operational profitability of a property as if purchased 100% in cash (NOI / Purchase Price). Cash-on-Cash Return measures the actual leveraged cash dividend returned on your out-of-pocket cash invested (Annual Pre-Tax Cash Flow / Total Invested Cash). Internal Rate of Return (IRR) accounts for total compounding return over time, combining cash flow, principal loan paydown, and terminal profit at sale.",
  },
  {
    question: "What is the 1% rule and how do you calculate it?",
    answer:
      "The 1% Rule is a rapid screening heuristic establishing that monthly gross rent should equal at least 1% of the total purchase price plus initial renovation costs. For example, a property purchased and renovated for a total of $200,000 should generate at least $2,000 per month in gross rent to likely yield positive monthly cash flow.",
  },
  {
    question: "What expenses should be included when calculating Net Operating Income (NOI)?",
    answer:
      "Net Operating Income (NOI) includes all operational costs: property taxes, hazard insurance, maintenance and repairs, property management fees, HOA dues, utilities paid by owner, vacancy loss reserves, and leasing commissions. NOI explicitly excludes debt service (mortgage principal and interest payments), capital expenditures (CapEx), and income taxes.",
  },
  {
    question: "How does property depreciation shield rental income from income taxes?",
    answer:
      "Under IRS MACRS guidelines, residential rental property improvement values (excluding land) are depreciated over 27.5 years. Each year, 3.636% of the building value is deducted as a paper expense against rental revenue. This depreciation shield frequently offsets taxable net income, allowing real estate investors to collect positive cash flow tax-free or at significantly reduced tax rates.",
  },
  {
    question: "What is the difference between CapEx reserves and regular maintenance?",
    answer:
      "Regular maintenance addresses day-to-day wear and tear (fixing a leaking faucet, lawn care, minor painting, changing air filters). Capital Expenditures (CapEx) involve long-term, structural replacements of major capital components (replacing a roof every 25 years, installing a new HVAC system, or repaving a driveway). Setting aside 5%–10% of gross rent monthly into a dedicated CapEx reserve prevents sudden liquidity shocks.",
  },
  {
    question: "How does vacancy rate impact cash flow and debt service coverage?",
    answer:
      "Vacancy loss directly reduces Effective Gross Income. Even a modest increase from 5% to 10% vacancy reduces net operating income by the lost rental dollars, which directly compresses Cash-on-Cash Return and lowers the Debt Service Coverage Ratio (DSCR). Lenders typically require a minimum DSCR of 1.20 to ensure cash flow remains sufficient to cover mortgage payments.",
  },
  {
    question: "How does the BRRRR method allow investors to achieve infinite returns?",
    answer:
      "The BRRRR method (Buy, Rehab, Rent, Refinance, Repeat) involves purchasing a distressed property, adding value through renovation, leasing it at market rent, and completing a cash-out refinance at 75% LTV of the new After Repair Value (ARV). If the cash-out refinance repays 100% of your initial purchase and rehab capital, your remaining invested cash becomes $0, creating an infinite Return on Investment.",
  },
  {
    question: "What Debt Service Coverage Ratio (DSCR) do lenders require for investment property loans?",
    answer:
      "Most commercial and non-QM DSCR mortgage lenders require a minimum DSCR of 1.20x to 1.25x. This means the property's Net Operating Income (NOI) must equal at least 120% to 125% of annual mortgage principal and interest payments, providing a 20% to 25% safety buffer for unexpected vacancies or expense spikes.",
  },
  {
    question: "When should an investor use a 1031 exchange to defer capital gains taxes?",
    answer:
      "An investor should utilize an IRS Section 1031 exchange when selling an appreciated investment property to reinvest 100% of net sale proceeds into a 'like-kind' replacement real estate asset. This defers all capital gains taxes and depreciation recapture taxes, compounding wealth faster by keeping tax dollars working in real estate.",
  },
];
