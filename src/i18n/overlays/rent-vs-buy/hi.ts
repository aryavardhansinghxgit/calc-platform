export const HI_RENT_VS_BUY_OVERLAY = {
  title: "किराया बनाम खरीद कैलकुलेटर (Rent vs Buy Calculator)",
  description: "किराये पर रहने और घर खरीदने की तुलना करें: मॉर्गेज लागत, किराया वृद्धि, संपत्ति मूल्य वृद्धि, कर लाभ और ब्रेक-इवेन अवधि।",
  inputs: {
  "homePrice": "घर का खरीद मूल्य",
  "downPaymentPercent": "डाउन पेमेंट प्रतिशत (%)",
  "interestRate": "मॉर्गेज ब्याज दर (%)",
  "loanTermYears": "ऋण अवधि (वर्ष)",
  "propertyTaxRate": "संपत्ति कर दर (%)",
  "homeInsuranceAnnual": "वार्षिक गृह बीमा ($)",
  "monthlyRent": "वर्तमान मासिक किराया ($)",
  "rentGrowthRate": "वार्षिक किराया वृद्धि दर (%)",
  "homeAppreciationRate": "वार्षिक संपत्ति मूल्य वृद्धि (%)",
  "investmentReturnRate": "वैकल्पिक निवेश रिटर्न (%)",
  "maintenanceRate": "वार्षिक रखरखाव दर (%)"
},
  outputs: {
  "breakevenYears": "ब्रेक-इवेन अवधि (वर्ष)",
  "netCostBuying30Yr": "खरीदने की 30 वर्षीय शुद्ध लागत",
  "netCostRenting30Yr": "किराये की 30 वर्षीय शुद्ध लागत",
  "netWorthBuying10Yr": "10 वर्ष में खरीदार की शुद्ध संपत्ति",
  "netWorthRenting10Yr": "10 वर्ष में किरायेदार की शुद्ध संपत्ति",
  "priceToRentRatio": "मूल्य-से-किराया अनुपात",
  "monthlyUnrecoverableCost": "मासिक गैर-वसूली योग्य लागत"
}
};

export default HI_RENT_VS_BUY_OVERLAY;
