export const HI_DOWN_PAYMENT_OVERLAY = {
  title: "डाउन पेमेंट कैलकुलेटर (Down Payment Calculator)",
  description: "घर खरीदने हेतु आवश्यक डाउन पेमेंट, 3%, 5%, 10% और 20% पर किस्तों की तुलना, PMI बीमा समाप्ति और क्लोजिंग लागत की गणना करें।",
  inputs: {
  "homePrice": "घर का कुल खरीद मूल्य",
  "downPaymentPercent": "डाउन पेमेंट प्रतिशत (%)",
  "downPaymentAmount": "डाउन पेमेंट राशि ($)",
  "interestRate": "वार्षिक ब्याज दर (%)",
  "loanTermYears": "ऋण अवधि (वर्ष)",
  "propertyTaxRate": "संपत्ति कर दर (%)",
  "homeInsuranceAnnual": "वार्षिक गृह बीमा ($)",
  "pmiRate": "PMI बीमा दर (%)",
  "closingCostPercent": "अनुमानित क्लोजिंग लागत (%)"
},
  outputs: {
  "loanAmount": "कुल ऋण राशि",
  "monthlyPrincipalInterest": "मासिक किस्त (मूलधन + ब्याज)",
  "monthlyPmi": "मासिक PMI बीमा",
  "totalMonthlyPayment": "कुल अनुमानित मासिक भुगतान",
  "cashToClose": "क्लोजिंग पर कुल आवश्यक नकदी",
  "pmiDropOffMonth": "PMI समाप्ति का महीना",
  "totalLifetimeInterest": "कुल वित्तपोषित ब्याज"
}
};

export default HI_DOWN_PAYMENT_OVERLAY;
