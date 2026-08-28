export interface FaqItem {
  question: string;
  answer: string;
}

export const gstFaqs: FaqItem[] = [
  {
    question: "What is a GST calculator?",
    answer:
      "A GST calculator is a tool that calculates GST on a taxable amount and determines the resulting invoice total. It can also work backward from a GST-inclusive price or known GST amount.",
  },
  {
    question: "How do I calculate GST on an amount?",
    answer:
      "Multiply the taxable amount by the GST percentage and divide by 100. For ₹10,000 at 18%: ₹10,000 × 18 ÷ 100 = ₹1,800 GST.",
  },
  {
    question: "How do I calculate GST inclusive price?",
    answer:
      "Use the formula: Inclusive Total = Base × (1 + GST Rate ÷ 100). At ₹10,000 and 18%, the total is ₹11,800.",
  },
  {
    question: "How do I remove GST from an inclusive price?",
    answer:
      "Divide the inclusive price by (1 + GST rate ÷ 100). For ₹11,800 at 18%: ₹11,800 ÷ 1.18 = ₹10,000 taxable base.",
  },
  {
    question: "What is reverse GST?",
    answer:
      "Reverse GST calculation starts with a known GST amount and derives the underlying taxable value. For ₹1,800 GST at 18%: ₹1,800 ÷ 0.18 = ₹10,000 taxable value.",
  },
  {
    question: "What is the difference between CGST, SGST and IGST?",
    answer:
      "For an applicable intra-State supply, GST is generally divided equally between CGST and SGST/UTGST. For an applicable inter-State supply, GST is generally levied as IGST.",
  },
  {
    question: "How is 18% GST split between CGST and SGST?",
    answer:
      "For an intra-State transaction at 18%, the normal mathematical split is: 9% CGST + 9% SGST. So ₹10,000 produces ₹900 CGST and ₹900 SGST.",
  },
  {
    question: "Is GST always 18%?",
    answer:
      "No. GST rates vary according to the classification and applicable provisions. The calculator lets you enter the rate rather than assuming one universal percentage. CBIC's published schedules contain multiple classifications and rates.",
  },
  {
    question: "Does the GST calculator determine the correct HSN code?",
    answer:
      "No. It performs GST calculations using the rate supplied by the user. It does not replace HSN/SAC classification analysis.",
  },
  {
    question: "Does compensation cess apply to every GST transaction?",
    answer:
      "No. Compensation cess applies only to specified supplies covered by the applicable law and notifications.",
  },
  {
    question: "Can I calculate GST for multiple products?",
    answer:
      "Yes. Use the multi-item invoice mode and calculate each line separately when different goods or services have different GST rates.",
  },
  {
    question: "Can I use this GST calculator for inter-State sales?",
    answer:
      "Yes. Select the inter-State calculation and the calculator will show the GST as IGST rather than splitting it into CGST and SGST.",
  },
  {
    question: "What is the 40% GST rate?",
    answer:
      "The GST Council's post-2025 framework introduced a 40% rate for specified categories. For example, the official GST Council FAQ states that specified actionable claims such as betting, casinos, gambling, horse racing, lottery and online money gaming attract 40% GST. It should not be interpreted as a universal luxury goods rate.",
  },
  {
    question: "When did the major recent GST rate changes take effect?",
    answer:
      "The GST Council's official FAQ states that the relevant goods and services rate changes from the 56th GST Council recommendations took effect from 22 September 2025, with specific exceptions subject to separate implementation.",
  },
  {
    question: "Can this calculator tell me whether I am eligible for the Composition Scheme?",
    answer:
      "No. The calculator can provide an illustrative comparison based on your inputs, but legal eligibility depends on the applicable GST provisions and taxpayer circumstances.",
  },
  {
    question: "Can Composition taxpayers claim normal input tax credit?",
    answer:
      "Composition taxation operates under different rules from the regular scheme, and composition taxpayers generally cannot claim normal ITC. CBIC's composition guidance describes this important restriction.",
  },
  {
    question: "Is GST inclusive the same as adding GST to the price?",
    answer:
      "No. When GST is exclusive, you add GST to the taxable value. When GST is inclusive, the quoted total already contains GST and you must extract the tax portion mathematically.",
  },
  {
    question: "How accurate is this GST calculator?",
    answer:
      "The calculator performs the underlying arithmetic using the rate and values entered by the user. The rate itself remains a separate legal/classification question. Always verify the applicable HSN/SAC and current GST notification for an actual transaction.",
  },
  {
    question: "Can I use the calculator for business invoices?",
    answer:
      "Yes. It can be used for estimating taxable values, GST amounts, invoice totals, tax-head splits and multi-item calculations. For statutory invoicing and filing, reconcile against your accounting system and applicable GST requirements.",
  },
  {
    question: "Does GST apply to all goods and services?",
    answer:
      "No. Some supplies may be exempt, nil-rated, zero-rated, outside the scope of GST, or subject to special provisions. The calculator should not be used to infer taxability solely from the amount entered.",
  },
];
