import { CalculatorFAQ } from "../../types";

export const leaseFaqs: CalculatorFAQ[] = [
  {
    question: "How is a monthly lease payment calculated?",
    answer:
      "A lease payment depends on the modeled capitalized cost, residual value, lease term, periodic financing or rent rate, payment timing, taxes and applicable fees. The exact formula should be identified because consumer auto leases and commercial leases can use different conventions.",
  },
  {
    question: "What is residual value in a lease?",
    answer:
      "Residual value is the modeled value assigned to the asset at the end of the lease term. It affects the amount of depreciation being recovered through the payments and can materially affect the monthly lease payment.",
  },
  {
    question: "What is a money factor?",
    answer:
      "A money factor is a lease financing quotation convention expressed as a small decimal. A common approximate conversion is Money Factor × 2,400 = APR equivalent, but that convention should not automatically be treated as a universal actuarial APR disclosure.",
  },
  {
    question: "How do I convert a money factor to APR?",
    answer:
      "A common industry approximation is to multiply the money factor by 2,400. For example, 0.00250 corresponds to approximately 6.00%. Actual contract economics can still depend on timing, fees, taxes and the complete lease structure.",
  },
  {
    question: "Should I put a large down payment on a lease?",
    answer:
      "A larger upfront payment may reduce recurring payments by lowering the modeled capitalized cost, but it also uses cash at signing. Compare upfront cash, recurring payments and total contract cost rather than judging the decision from the monthly payment alone.",
  },
  {
    question: "What is the difference between leasing and buying a vehicle?",
    answer:
      "Leasing generally pays for use and modeled depreciation over a defined period, while buying through financing builds ownership in the asset. A fair comparison should include upfront cash, periodic payment, total cost and the value that remains at the end.",
  },
  {
    question: "What happens if I exceed the mileage allowance?",
    answer:
      "Excess-mileage charges are contract-specific. The allowed mileage, per-mile charge and applicable conditions should be taken from the actual lease agreement rather than assumed from a generic calculator.",
  },
  {
    question: "Can I buy the asset at the end of the lease?",
    answer:
      "Some leases include a purchase option, but the purchase price, fees and conditions depend on the contract. A displayed residual should not automatically be interpreted as the complete cash amount required to purchase the asset.",
  },
  {
    question: "What are acquisition and disposition fees?",
    answer:
      "An acquisition fee may be charged when a lease is initiated, while a disposition fee may apply when the asset is returned. Whether those fees exist and how much they cost depends on the contract.",
  },
  {
    question: "What is a closed-end lease?",
    answer:
      "A closed-end lease generally places specified residual-value risk on the lessor subject to the contract's mileage, condition and other requirements. The exact obligations depend on the lease agreement and applicable rules.",
  },
  {
    question: "What is an equipment or commercial lease?",
    answer:
      "An equipment lease is a commercial arrangement for using business assets such as machinery, technology or vehicles. Present-value and accounting treatment depend on the applicable reporting framework and contract terms.",
  },
  {
    question: "Is leasing financially better than buying?",
    answer:
      "There is no universal answer. The better choice depends on asset value, residual assumptions, rates, fees, taxes, ownership horizon, resale value, mileage, liquidity needs and the user's priorities. A lease-versus-buy model can compare a defined set of assumptions.",
  },
];
