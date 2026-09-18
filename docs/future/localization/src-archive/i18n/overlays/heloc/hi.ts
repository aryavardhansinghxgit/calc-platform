export const HI_HELOC_OVERLAY = {
  title: "हेलॉक क्रेडिट लाइन कैलकुलेटर (HELOC Calculator)",
  description: "हेलॉक (HELOC) ऋण क्षमता, केवल-ब्याज ड्रॉ भुगतान, पुनर्भुगतान चरण की किस्तें और परिवर्तनीय ब्याज दर परिदृश्यों की गणना करें।",
  inputs: {
  "homeValue": "घर का बाजार मूल्य",
  "currentMortgageBalance": "पहले मॉर्गेज का शेष",
  "helocLineAmount": "इच्छित हेलॉक क्रेडिट लाइन",
  "interestRate": "प्रारंभिक परिवर्तनीय ब्याज दर",
  "drawPeriodYears": "ड्रॉ अवधि (वर्ष)",
  "repayPeriodYears": "पुनर्भुगतान अवधि (वर्ष)",
  "closingCosts": "प्रारंभिक क्लोजिंग लागत",
  "annualFee": "वार्षिक रखरखाव शुल्क",
  "drawPaymentType": "ड्रॉ अवधि भुगतान प्रकार",
  "cltvLimit": "अधिकतम सीएलटीवी सीमा",
  "interestRateStress": "ब्याज दर वृद्धि सिमुलेशन",
  "extraMonthlyPrincipal": "अतिरिक्त मासिक मूलधन"
},
  outputs: {
  "maxBorrowingPower": "अधिकतम हेलॉक क्षमता",
  "drawnCltv": "उपयोग उपरांत सीएलटीवी",
  "drawMonthlyPayment": "ड्रॉ अवधि की मासिक किस्त",
  "repaymentMonthlyPayment": "पुनर्भुगतान चरण की मासिक किस्त",
  "paymentShockIncrease": "पेमेंट शॉक (किस्त उछाल)",
  "totalLifetimeInterest": "कुल अनुमानित ब्याज"
}
};

export default HI_HELOC_OVERLAY;
