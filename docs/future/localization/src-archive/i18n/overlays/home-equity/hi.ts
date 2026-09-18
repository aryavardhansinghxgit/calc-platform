export const HI_HOME_EQUITY_OVERLAY = {
  title: "होम इक्विटी लोन कैलकुलेटर (Home Equity Loan Calculator)",
  description: "होम इक्विटी लोन की मासिक किस्त, संयुक्त ऋण-से-मूल्य (CLTV), वास्तविक APR, पुनर्भुगतान अनुसूची और अधिकतम ऋण सीमा की गणना करें।",
  inputs: {
  "homeValue": "घर का अनुमानित बाजार मूल्य",
  "currentMortgageBalance": "पहले मॉर्गेज का वर्तमान शेष",
  "loanAmount": "इच्छित ऋण राशि",
  "interestRate": "वार्षिक निश्चित ब्याज दर",
  "loanTerm": "ऋण की अवधि (वर्ष)",
  "closingCosts": "अनुमानित क्लोजिंग लागत",
  "closingCostMode": "क्लोजिंग लागत का प्रकार",
  "mode": "गणना मोड (राशि / क्षमता)",
  "cltvLimit": "अधिकतम सीएलटीवी सीमा",
  "extraMonthlyPayment": "अतिरिक्त मासिक मूलधन भुगतान",
  "grossMonthlyIncome": "सकल मासिक आय",
  "monthlyDebtPayments": "अन्य मासिक ऋण भुगतान"
},
  outputs: {
  "monthlyPayment": "निश्चित मासिक किस्त",
  "totalInterest": "कुल देय ब्याज",
  "totalCost": "कुल वित्तपोषण लागत",
  "maxLoanAmount": "अधिकतम उपलब्ध ऋण",
  "postLoanCltv": "अंतिम सीएलटीवी",
  "trueApr": "वास्तविक प्रभावी APR",
  "interestSavings": "अतिरिक्त भुगतान से ब्याज बचत"
}
};

export default HI_HOME_EQUITY_OVERLAY;
