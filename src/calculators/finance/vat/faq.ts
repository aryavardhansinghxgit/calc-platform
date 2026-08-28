export interface VatFaq {
  question: string;
  answer: string;
}

export const vatFaqs: VatFaq[] = [
  {
    question: "What is VAT?",
    answer:
      "VAT, or Value-Added Tax, is an indirect consumption tax applied to taxable goods and services. It is generally collected through businesses in the supply chain, with input-tax mechanisms helping prevent the same value from being taxed repeatedly.",
  },
  {
    question: "How do I calculate VAT on a price?",
    answer:
      "For a VAT-exclusive price: VAT = Net × (Rate / 100), then Gross = Net + VAT. For example, £1,000 at 20% VAT produces £200 VAT and a £1,200 gross price.",
  },
  {
    question: "How do I calculate VAT backwards from an inclusive price?",
    answer:
      "Divide the VAT-inclusive amount by (1 + VAT Rate / 100). For example: £1,200 ÷ 1.20 = £1,000. The VAT amount is then £200.",
  },
  {
    question: "Is VAT 20% of the final price?",
    answer:
      "No. When a price already includes 20% VAT, the VAT component is not 20% of the final price. At 20%, the VAT fraction is 20/120 = 1/6. HMRC gives this same treatment for VAT-inclusive UK prices.",
  },
  {
    question: "What is the difference between VAT-inclusive and VAT-exclusive?",
    answer:
      "A VAT-exclusive price does not contain VAT. A VAT-inclusive price already contains VAT. For example: £100 exclusive + £20 VAT = £120 inclusive.",
  },
  {
    question: "What is reverse VAT?",
    answer:
      "Reverse VAT is the process of starting with a VAT-inclusive amount and calculating the underlying net price and VAT component.",
  },
  {
    question: "What is input VAT?",
    answer:
      "Input VAT is VAT charged to a business on qualifying purchases. Depending on the jurisdiction and the nature of the purchase, the business may be able to recover that amount as input tax.",
  },
  {
    question: "What is output VAT?",
    answer:
      "Output VAT is VAT a registered business charges on its taxable sales.",
  },
  {
    question: "What is the difference between zero-rated and exempt VAT?",
    answer:
      "Zero-rated supplies generally have a 0% tax rate but can remain within the taxable VAT system. Exempt supplies are treated differently and can have different input-tax recovery consequences.",
  },
  {
    question: "Is GST the same as VAT?",
    answer:
      "GST and VAT are closely related forms of consumption tax, but the exact rules depend on the jurisdiction. Countries can use different terminology and different administrative structures.",
  },
  {
    question: "Does every country charge the same VAT rate?",
    answer:
      "No. VAT/GST rates vary by country and often by product, service or transaction type. The EU framework, for example, allows Member States to set their own VAT rates within specified rules.",
  },
  {
    question: "Does the United States have VAT?",
    answer:
      "The United States does not have a nationwide federal VAT. It uses state and local sales taxes, whose rates and rules vary by jurisdiction.",
  },
  {
    question: "What is the standard VAT rate in the UK?",
    answer:
      "The UK's standard VAT rate is currently 20%. Some qualifying goods and services are subject to 5% reduced VAT or 0% zero-rating, while some supplies are exempt.",
  },
  {
    question: "What is Australia's GST rate?",
    answer:
      "Australia's GST is currently 10% on most taxable goods and services, with specified exceptions and GST-free or input-taxed treatments.",
  },
  {
    question: "What is Singapore's GST rate?",
    answer:
      "Singapore's standard GST rate is currently 9% for standard-rated supplies.",
  },
  {
    question: "What is Japan's consumption tax rate?",
    answer:
      "Japan's standard consumption tax rate is 10%, with an 8% reduced rate for specified categories.",
  },
  {
    question: "What is the GST rate in Canada?",
    answer:
      "Canada requires location-specific treatment. The federal GST rate is 5% in non-participating provinces, while HST rates vary by participating province.",
  },
  {
    question: "Can I use this calculator for tax filing?",
    answer:
      "Use it as a calculation aid, not as a substitute for the applicable tax authority's rules, official filing software, or professional tax advice. The calculator does not determine whether a transaction is taxable or which legal rate applies.",
  },
];
