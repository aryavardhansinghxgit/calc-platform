export const AUTO_LEASE_FAQS = [
  {
    question: "What is an auto lease calculator?",
    answer:
      "An auto lease calculator estimates a vehicle's lease payment and related costs from inputs such as selling price, MSRP, residual value, money factor or APR, lease term, fees, incentives, taxes and mileage. It can also be used to compare lease scenarios and evaluate total modeled cost.",
  },
  {
    question: "How is a car lease payment calculated?",
    answer:
      "A standard lease calculation separates the payment into depreciation and a rent or finance charge, then incorporates applicable taxes and other charges. The depreciation component is based on the difference between adjusted capitalized cost and residual value, while the finance component is commonly based on the adjusted capitalized cost plus residual value multiplied by the money factor.",
  },
  {
    question: "What is residual value on a car lease?",
    answer:
      "Residual value is the estimated value of the vehicle at the end of the lease term. It is an important part of the payment calculation because the lessee generally pays for the portion of the vehicle's value consumed during the lease rather than the entire vehicle value.",
  },
  {
    question: "How do I calculate residual value?",
    answer:
      "A common lease calculation is: Residual Value = MSRP × Residual Percentage. For example, a $36,000 MSRP with a 55% residual produces a $19,800 residual value.",
  },
  {
    question: "What is a money factor?",
    answer:
      "A money factor is a decimal used in many vehicle lease calculations to represent the financing or rent component of the lease. A common consumer conversion is approximately: APR = Money Factor × 2,400. The actual money factor disclosed by the leasing company should be used when available.",
  },
  {
    question: "How do I convert a 6% APR to a lease money factor?",
    answer:
      "Using the conventional conversion: 6 ÷ 2,400 = 0.0025. So a 6% equivalent corresponds to a money factor of approximately 0.0025.",
  },
  {
    question: "Is a lower money factor always better?",
    answer:
      "A lower money factor generally reduces the modeled rent or finance charge when all other lease assumptions remain constant. However, the complete lease should still be evaluated because price, residual, fees, incentives, mileage and upfront costs also affect the overall economics.",
  },
  {
    question: "Why is my lease payment different from the dealer's quote?",
    answer:
      "Possible reasons include a different negotiated price, money factor, residual percentage, acquisition fee, tax assumption, cap-cost reduction, trade-in treatment, manufacturer incentive, registration fee or other contract term. Enter every disclosed lease term into the calculator rather than relying only on the advertised payment.",
  },
  {
    question: "How much should I put down on a car lease?",
    answer:
      "There is no universal ideal amount. A larger upfront payment can reduce the displayed monthly payment, but it also increases the amount of cash you commit at signing. Compare due-at-signing cash and total modeled cost rather than judging the lease solely by its monthly payment. The CFPB identifies down payment and capitalized-cost reduction as important lease terms to evaluate.",
  },
  {
    question: "Does a trade-in reduce my lease payment?",
    answer:
      "A trade-in can reduce the lease's modeled capitalized cost when it provides positive equity. If the existing loan payoff is higher than the trade value, the transaction instead has negative equity that must be accounted for.",
  },
  {
    question: "What happens if I exceed my lease mileage?",
    answer:
      "The lease contract may charge an excess-mileage fee when the vehicle exceeds its contractual mileage allowance. The exact fee is contract-specific. In the calculator, excess miles are multiplied by the entered per-mile penalty rate to model the potential cost.",
  },
  {
    question: "Is leasing cheaper than buying?",
    answer:
      "Not necessarily. Leasing often produces a lower monthly payment because the customer is paying for the vehicle's modeled depreciation during the lease rather than financing the entire purchase price. Buying creates ownership equity, so a meaningful comparison should consider the entire modeled cost and the vehicle's value at the comparison date.",
  },
  {
    question: "Is a lower monthly lease payment always a better deal?",
    answer:
      "No. A lower payment can be produced by a larger down payment, trade-in contribution, rebate, longer term or other adjustment. Compare selling price, residual, money factor, due at signing, mileage allowance and total modeled cost before deciding.",
  },
  {
    question: "What is an adjusted capitalized cost?",
    answer:
      "Adjusted capitalized cost is the amount used in the lease payment calculation after subtracting applicable capitalized-cost reductions from the gross capitalized cost. These reductions can include qualifying cash, rebates, trade-in allowances or other credits.",
  },
  {
    question: "What is a lease acquisition fee?",
    answer:
      "An acquisition fee is a charge associated with originating a vehicle lease. Depending on the contract, it may be paid upfront or incorporated into the capitalized cost. In the calculator's reference scenario, the $695 acquisition fee increases gross capitalized cost from $35,000 to $35,695.",
  },
  {
    question: "Can I calculate a lease from a target monthly payment?",
    answer:
      "Yes. The calculator includes a reverse lease solver. In the reference scenario, a $450 target payment with a 36-month term, 6% APR, 55% residual and 7% modeled tax produces a maximum modeled vehicle selling price of $35,225.",
  },
  {
    question: "Does the calculator know the exact tax on my lease?",
    answer:
      "No. The calculator uses the tax rate and tax methodology represented by its inputs and model. Actual vehicle-lease taxation can vary by jurisdiction and transaction structure, so the lease contract and applicable local rules should be used for the final amount.",
  },
  {
    question: "Can I use this calculator to compare two dealership offers?",
    answer:
      "Yes. Enter each offer's vehicle price, MSRP, residual, financing factor, term, fees, incentives, upfront payment, mileage allowance and other relevant terms separately. Comparing the resulting monthly payment, upfront cash and total modeled cost is much more informative than comparing advertisements by monthly payment alone.",
  },
];
