export const financeExamples = [
  {
    title: "Calculator.net Benchmark ($20k PV, -$2k PMT @ 6% for 10 Periods)",
    description: "Solving for Future Value (FV) with initial deposit $20,000, periodic payment -$2,000, 6% annual rate over 10 periods.",
    inputs: {
      mode: "FV",
      n: 10,
      iy: 6.0,
      pv: 20000,
      pmt: -2000,
      py: 1,
      cy: 1,
      pmtTiming: "end",
    },
    expectedOutput: {
      solvedVariable: "FV",
      fv: "-$9,455.36",
      totalInterest: "$9,455.36",
    },
  },
  {
    title: "Retirement Nest Egg ($100k Starting, $1,000/mo Deposit @ 8% for 20 Years)",
    description: "Compound growth calculation with monthly contributions.",
    inputs: {
      mode: "FV",
      n: 240,
      iy: 8.0,
      pv: 100000,
      pmt: 1000,
      py: 12,
      cy: 12,
      pmtTiming: "end",
    },
    expectedOutput: {
      solvedVariable: "FV",
    },
  },
];
