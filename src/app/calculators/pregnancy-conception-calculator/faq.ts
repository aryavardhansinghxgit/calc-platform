import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const pregnancy_conception_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a pregnancy conception calculator?",
    answer:
      "A pregnancy conception calculator estimates a likely conception or fertilization date and related pregnancy milestones from information such as LMP, cycle length, ovulation, ultrasound dating, conception date, due date or IVF transfer.",
  },
  {
    question: "How do you calculate a conception date from the last period?",
    answer:
      "The calculator uses the relationship between cycle length and estimated luteal phase to estimate ovulation, then uses that timing to estimate conception. This is a calendar model, not direct observation of fertilization.",
  },
  {
    question: "What is the fertile window?",
    answer:
      "The fertile window is the six-day interval ending on the day of ovulation. It can be represented as O−5 through O.",
  },
  {
    question: "What are the best days to conceive?",
    answer:
      "The days immediately before ovulation are especially important. ASRM reports peak fecundability when intercourse occurs within approximately two days before ovulation.",
  },
  {
    question: "Can I get pregnant on ovulation day?",
    answer:
      "Yes. Ovulation day is within the fertile window, and conception can occur when viable sperm are present around ovulation.",
  },
  {
    question: "Can I get pregnant before ovulation?",
    answer:
      "Yes. Sperm can remain viable for several days, which is why the fertile window begins before ovulation. Prospective research identified conception from intercourse occurring during the six-day interval ending on ovulation.",
  },
  {
    question: "Is conception the same as ovulation?",
    answer:
      "No. Ovulation is the release of an egg; fertilization occurs when sperm and egg combine. A calendar calculator estimates these events rather than directly observing them.",
  },
  {
    question: "Is a 28-day cycle always ovulation on day 14?",
    answer:
      "No. Day 14 is a common calendar estimate for a 28-day cycle using an approximately 14-day luteal-phase assumption. Actual ovulation can vary between cycles.",
  },
  {
    question: "How does cycle length affect conception timing?",
    answer:
      "Longer or shorter cycles can shift the estimated ovulation and conception dates. A calendar model therefore uses the selected cycle length instead of forcing every user into a 28-day cycle.",
  },
  {
    question: "What is the luteal phase?",
    answer:
      "The luteal phase is the interval between ovulation and the start of the next menstrual period. It is important in reverse calendar calculations because it helps estimate ovulation from cycle length.",
  },
  {
    question: "How accurate is a conception calculator?",
    answer:
      "It provides an estimate, not an exact biological measurement. Fertile-window timing can vary substantially, even among people with regular cycles.",
  },
  {
    question: "Can I use the calculator with irregular periods?",
    answer:
      "Yes, but the result should be interpreted cautiously because calendar predictions become less reliable when cycle timing varies. Combining calendar information with fertility-awareness signs can provide additional information.",
  },
  {
    question: "How does an ovulation predictor kit help?",
    answer:
      "OPKs detect urinary LH changes associated with the LH surge that generally precedes ovulation by about 1–2 days. A positive OPK is indirect evidence of impending ovulation rather than proof that ovulation occurred.",
  },
  {
    question: "What is an implantation window?",
    answer:
      "The implantation window is an estimated period after fertilization when implantation may occur. The calculator presents it as a reference range rather than an exact event date.",
  },
  {
    question: "When should I take a pregnancy test?",
    answer:
      "Pregnancy tests become useful as hCG rises after implantation. Testing very early can produce a negative result even when pregnancy has occurred, so the calculator provides reference timing rather than a universal guaranteed test date.",
  },
  {
    question: "Can the calculator predict my exact chance of pregnancy?",
    answer:
      "No. Any probability values are population-level reference data, not personalized predictions. Individual fecundability depends on many biological factors.",
  },
  {
    question: "Does intercourse timing determine the baby's sex?",
    answer:
      "No reliable evidence supports timing intercourse as a method of selecting fetal sex. The prospective Wilcox study found no practical relationship between intercourse timing and baby sex.",
  },
  {
    question: "How often should we have intercourse during the fertile window?",
    answer:
      "ASRM states that intercourse every 1–2 days during the fertile window provides the highest reproductive efficiency, although 2–3 times per week can be nearly equivalent for many couples.",
  },
  {
    question: "How is ultrasound dating different from LMP dating?",
    answer:
      "LMP dating uses menstrual history and cycle assumptions, while ultrasound dating uses measurements obtained during pregnancy. They therefore represent different types of pregnancy-dating evidence.",
  },
  {
    question: "How does IVF dating work?",
    answer:
      "IVF dating uses the embryo-transfer date together with embryo age rather than estimating ovulation from a natural menstrual cycle. Day-3 and Day-5 transfers therefore use different dating offsets.",
  },
  {
    question: "Can a calculator confirm implantation?",
    answer:
      "No. A calculator can estimate a reference implantation window but cannot confirm that implantation occurred.",
  },
  {
    question: "Can a calculator confirm ovulation?",
    answer:
      "No. A calendar estimate predicts when ovulation may occur. OPKs, BBT, cervical mucus observations and clinical testing can provide additional evidence.",
  },
  {
    question: "When should I seek a fertility evaluation?",
    answer:
      "When there are no known risk factors, ASRM generally recommends evaluation after 12 months of regular unprotected intercourse when the female partner is under 35, and after 6 months when the female partner is 35 or older. Earlier evaluation can be appropriate when risk factors or concerning symptoms are present.",
  },
  {
    question: "Can I use a conception calculator to avoid pregnancy?",
    answer:
      "A conception calculator should not be treated as a guaranteed contraceptive method. Fertile-window timing can vary substantially, so calendar prediction alone may be unreliable for contraception.",
  },
];

export default pregnancy_conception_calculatorFaqs;
