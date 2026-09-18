export const HI_VA_OVERLAY = {
  title: "वीए मॉर्गेज कैलकुलेटर (VA Mortgage Calculator)",
  description: "0% डाउन पेमेंट वाले वीए (VA) ऋण, फंडिंग शुल्क (Funding Fee), PITI मासिक किस्त, विकलांगता छूट और ऋण तुलना की गणना करें।",
  inputs: {
  "homePrice": "घर का खरीद मूल्य",
  "downPaymentPercent": "डाउन पेमेंट प्रतिशत (%)",
  "interestRate": "निश्चित ब्याज दर (%)",
  "loanTermYears": "ऋण अवधि (वर्ष)",
  "militaryCategory": "सैन्य सेवा श्रेणी",
  "vaUsageType": "वीए उपयोग प्रकार (प्रथम / पुन:)",
  "isDisabilityExempt": "विकलांगता छूट (0% शुल्क)",
  "financeFundingFee": "शुल्क को ऋण में शामिल करें",
  "propertyTaxRate": "संपत्ति कर दर (%)",
  "homeInsuranceAnnual": "वार्षिक गृह बीमा ($)",
  "monthlyHoa": "मासिक सोसाइटी शुल्क ($)"
},
  outputs: {
  "baseLoanAmount": "मूल ऋण राशि",
  "fundingFeeAmount": "वीए फंडिंग शुल्क ($)",
  "totalFinancedLoan": "कुल वित्तपोषित ऋण",
  "monthlyPrincipalInterest": "मासिक किस्त (मूलधन + ब्याज)",
  "totalMonthlyPiti": "कुल मासिक खर्च (PITI)",
  "vaFundingFeePercent": "लागू शुल्क प्रतिशत (%)",
  "lifetimeSavingsVsFha": "FHA की तुलना में कुल बचत"
}
};

export default HI_VA_OVERLAY;
