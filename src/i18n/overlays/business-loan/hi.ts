export const HI_BUSINESS_LOAN_OVERLAY = {
  title: "बिजनेस लोन कैलकुलेटर — ईएमआई, ब्याज, शुल्क, वास्तविक APR और वाणिज्यिक ऋण विश्लेषण",
  description: "व्यावसायिक ऋण की मासिक ईएमआई, कुल ब्याज, प्रोसेसिंग शुल्क, वास्तविक actuarial APR, SBA लोन और DSCR कैश-फ्लो कवरेज की गणना करें।",
  inputs: {
  "loanAmount": "व्यावसायिक ऋण राशि",
  "interestRate": "वार्षिक ब्याज दर (APR %)",
  "loanTermYears": "ऋण अवधि (वर्ष)",
  "originationFeePercent": "प्रोसेसिंग / ओरिजिनेशन फीस (%)",
  "documentationFeeDollar": "दस्तावेज़ीकरण व फाइल शुल्क ($)"
},
  outputs: {
  "paybackAmount": "मासिक ईएमआई",
  "totalInterestPaid": "कुल देय ब्याज",
  "totalInterestAndFees": "कुल लागत (ब्याज + शुल्क)",
  "realAprPercent": "वास्तविक प्रभावी APR"
}
};

export default HI_BUSINESS_LOAN_OVERLAY;
