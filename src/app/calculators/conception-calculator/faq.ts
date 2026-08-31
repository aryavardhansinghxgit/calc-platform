export interface FAQItem {
  question: string;
  answer: string;
}

export const conception_calculatorFaqs: FAQItem[] = [
  {
    question: "What is a conception calculator?",
    answer:
      "A conception calculator estimates when fertilization most likely occurred by using information such as your last menstrual period, ovulation date, estimated due date, ultrasound dating or IVF transfer date.",
  },
  {
    question: "Can a conception calculator tell me the exact day I conceived?",
    answer:
      "No. It can estimate the most likely conception date, but fertilization occurs inside the reproductive tract and cannot usually be observed directly. Ovulation timing and sperm survival also introduce natural uncertainty.",
  },
  {
    question: "Is the conception date the same as the date I had sex?",
    answer:
      "Not necessarily. Sperm can survive for several days, so intercourse may occur before ovulation and fertilization may happen later.",
  },
  {
    question: "How does a conception calculator estimate the fertile window?",
    answer:
      "The calculator uses the relationship between ovulation and the days immediately preceding it. Its primary fertile-window framework follows the ASRM counseling definition of the six-day interval ending on the day of ovulation.",
  },
  {
    question: "What is the difference between ovulation and conception?",
    answer:
      "Ovulation is the release of an egg from the ovary. Conception occurs when sperm fertilizes the egg. Fertilization usually happens around the time of ovulation.",
  },
  {
    question: "Can I calculate conception from my due date?",
    answer:
      "Yes. A due date can be used to estimate conception by working backward approximately 266 days. This is an estimate and should not be treated as proof of the exact fertilization date.",
  },
  {
    question: "Is an early ultrasound more accurate than an LMP-based conception estimate?",
    answer:
      "Early ultrasound is generally the most accurate method for establishing or confirming gestational age. ACOG considers first-trimester ultrasound the most accurate method for pregnancy dating.",
  },
  {
    question: "How does IVF change conception dating?",
    answer:
      "IVF dating can be more precise because the embryo-transfer date and embryo age are known. The appropriate pregnancy-dating calculation depends on the embryo's developmental age at transfer.",
  },
  {
    question: "When should I take a pregnancy test after estimated conception?",
    answer:
      "Most home pregnancy tests are most reliable from the first day of a missed period. If you do not know when your period is due, the NHS advises testing at least 21 days after the last unprotected sex.",
  },
  {
    question: "Why is my conception date different from my doctor's date?",
    answer:
      "Different dating methods can produce different estimates. Your clinician may use an early ultrasound, LMP information or assisted-reproduction dates when establishing the official pregnancy dates.",
  },
];

export default conception_calculatorFaqs;
