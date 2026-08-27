"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, BarChart2, Table, BookOpen, Calculator as CalcIcon, Search, ArrowRight, Printer, Bookmark, Check, Trash2, History, Copy } from "lucide-react";
import dynamic from "next/dynamic";
import { CalculatorModuleDefinition } from "@/calculators";
import { CalculationResult } from "@/lib/calculator-engine/types";
import { CalculatorEngine } from "@/lib/calculator-engine/engine";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";
import { getTenHighQualityFaqs } from "@/lib/calculator-engine/faq-generator";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResult } from "./CalculatorResult";
import { FormulaSection } from "./FormulaSection";
import { RelatedCalculators } from "./RelatedCalculators";
import { AmortizationTable } from "./mortgage/AmortizationTable";
import { MortgageContentSection } from "./mortgage/MortgageContentSection";
import { MortgageCalculator } from "./mortgage/MortgageCalculator";
import { AmortizationCalculator } from "./amortization/AmortizationCalculator";
import { LoanCalculator } from "./loan/LoanCalculator";
import { EmiCalculator } from "./emi/EmiCalculator";
import { HouseAffordabilityCalculator } from "./house-affordability/HouseAffordabilityCalculator";
import { RefinanceCalculator } from "./refinance/RefinanceCalculator";
import { AutoLoanCalculator } from "./auto-loan/AutoLoanCalculator";
import { AutoLeaseCalculator } from "./auto-lease/AutoLeaseCalculator";
import { LeaseCalculator } from "./lease/LeaseCalculator";
import { LeaseContent } from "./lease/LeaseContent";
import { CollegeCostCalculator } from "./college-cost/CollegeCostCalculator";
import { CollegeCostContent } from "./college-cost/CollegeCostContent";
import { DepreciationCalculator } from "./depreciation/DepreciationCalculator";
import { DepreciationContent } from "./depreciation/DepreciationContent";
import { BoatLoanCalculator } from "./boat-loan/BoatLoanCalculator";
import { BoatLoanContent } from "./boat-loan/BoatLoanContent";
import { CreditCardPayoffCalculator } from "./credit-card-payoff/CreditCardPayoffCalculator";
import { CreditCardPayoffContent } from "./credit-card-payoff/CreditCardPayoffContent";
import { GDPCalculator } from "./gdp/GDPCalculator";
import { GDPContent } from "./gdp/GDPContent";
import { CreditCardCalculator } from "./credit-card/CreditCardCalculator";
import { CreditCardContent } from "./credit-card/CreditCardContent";
import { RepaymentCalculator } from "./repayment/RepaymentCalculator";
import { RepaymentContent } from "./repayment/RepaymentContent";
import { CompoundInterestCalculator } from "./compound-interest/CompoundInterestCalculator";
import { SimpleInterestCalculator } from "./simple-interest/SimpleInterestCalculator";
import { InterestCalculator } from "./interest/InterestCalculator";
import { InterestContent } from "./interest/InterestContent";
import { InvestmentCalculator } from "./investment/InvestmentCalculator";
import { InvestmentContent } from "./investment/InvestmentContent";
import { SavingsCalculator } from "./savings/SavingsCalculator";
import { SavingsContent } from "./savings/SavingsContent";
import { SipCalculator } from "./sip/SipCalculator";
import { SipContent } from "./sip/SipContent";
import { FdCalculator } from "./fd/FdCalculator";
import { FdContent } from "./fd/FdContent";
import { RdCalculator } from "./rd/RdCalculator";
import { RdContent } from "./rd/RdContent";
import { CagrCalculator } from "./cagr/CagrCalculator";
import { CagrContent } from "./cagr/CagrContent";
import { RoiCalculator } from "./roi/RoiCalculator";
import { RoiContent } from "./roi/RoiContent";
import { FutureValueCalculator } from "./future-value/FutureValueCalculator";
import { PresentValueCalculator } from "./present-value/PresentValueCalculator";
import { IncomeTaxCalculator } from "./income-tax/IncomeTaxCalculator";
import { IncomeTaxContent } from "./income-tax/IncomeTaxContent";
import { SalaryContent } from "./salary/SalaryContent";
import { GstCalculator } from "./gst/GstCalculator";
import { VatCalculator } from "./vat/VatCalculator";
import { SalesTaxCalculator } from "./sales-tax/SalesTaxCalculator";
import { DebtPayoffCalculator } from "./debt-payoff/DebtPayoffCalculator";
import { DebtConsolidationCalculator } from "./debt-consolidation/DebtConsolidationCalculator";
import { DebtConsolidationContent } from "./debt-consolidation/DebtConsolidationContent";
import { RetirementCalculator } from "./retirement/RetirementCalculator";
import { RetirementContent } from "./retirement/RetirementContent";
import { FourZeroOneKCalculator } from "./401k/FourZeroOneKCalculator";
import { IraCalculator } from "./ira/IraCalculator";
import { RothIraCalculator } from "./roth-ira/RothIraCalculator";
import { RothIraContent } from "./roth-ira/RothIraContent";
import { RmdCalculator } from "./rmd/RmdCalculator";
import { PensionCalculator } from "./pension/PensionCalculator";
import { SocialSecurityCalculator } from "./social-security/SocialSecurityCalculator";
import { AnnuityCalculator } from "./annuity/AnnuityCalculator";
import { AnnuityPayoutCalculator } from "./annuity-payout/AnnuityPayoutCalculator";
import { PaymentCalculator } from "./payment/PaymentCalculator";
import { TipCalculator } from "./tip/TipCalculator";
import { CommissionCalculator } from "./commission/CommissionCalculator";
import { MarginCalculator } from "./margin/MarginCalculator";
import { MarginContent } from "./margin/MarginContent";
import { DiscountCalculator } from "./discount/DiscountCalculator";
import { DiscountContent } from "./discount/DiscountContent";
import { PersonalLoanCalculator } from "./personal-loan/PersonalLoanCalculator";
import { BusinessLoanCalculator } from "./business-loan/BusinessLoanCalculator";
import { StudentLoanCalculator } from "./student-loan/StudentLoanCalculator";
import { BudgetCalculator } from "./budget/BudgetCalculator";
import { BudgetContent } from "./budget/BudgetContent";
import { BmiCalculator } from "./bmi/BmiCalculator";
import { BmiContent } from "./bmi/BmiContent";
import { CalorieCalculator } from "./calorie/CalorieCalculator";
import { CalorieContent } from "./calorie/CalorieContent";
import { BodyFatCalculator } from "./body-fat/BodyFatCalculator";
import { BodyFatContent } from "./body-fat/BodyFatContent";
import { BmrCalculator } from "./bmr/BmrCalculator";
import { BmrContent } from "./bmr/BmrContent";
import { IdealWeightCalculator } from "./ideal-weight/IdealWeightCalculator";
import { IdealWeightContent } from "./ideal-weight/IdealWeightContent";
import { PaceCalculator } from "./pace/PaceCalculator";
import { PaceContent } from "./pace/PaceContent";
import { ArmyBodyFatCalculator } from "./army-body-fat/ArmyBodyFatCalculator";
import { ArmyBodyFatContent } from "./army-body-fat/ArmyBodyFatContent";
import { LeanBodyMassCalculator } from "./lean-body-mass/LeanBodyMassCalculator";
import { LeanBodyMassContent } from "./lean-body-mass/LeanBodyMassContent";
import { HealthyWeightCalculator } from "./healthy-weight/HealthyWeightCalculator";
import { HealthyWeightContent } from "./healthy-weight/HealthyWeightContent";
import { CaloriesBurnedCalculator } from "./calories-burned/CaloriesBurnedCalculator";
import { CaloriesBurnedContent } from "./calories-burned/CaloriesBurnedContent";
import { OneRepMaxCalculator } from "./one-rep-max/OneRepMaxCalculator";
import { OneRepMaxContent } from "./one-rep-max/OneRepMaxContent";
import { TargetHeartRateCalculator } from "./target-heart-rate/TargetHeartRateCalculator";
import { TargetHeartRateContent } from "./target-heart-rate/TargetHeartRateContent";
import { PregnancyCalculator } from "./pregnancy/PregnancyCalculator";
import { PregnancyContent } from "./pregnancy/PregnancyContent";
import { PregnancyWeightGainCalculator } from "./pregnancy-weight-gain/PregnancyWeightGainCalculator";
import { PregnancyWeightGainContent } from "./pregnancy-weight-gain/PregnancyWeightGainContent";
import { PregnancyConceptionCalculator } from "./pregnancy-conception/PregnancyConceptionCalculator";
import { PregnancyConceptionContent } from "./pregnancy-conception/PregnancyConceptionContent";
import { DueDateCalculator } from "./due-date/DueDateCalculator";
import { DueDateContent } from "./due-date/DueDateContent";
import { BodyTypeCalculator } from "./body-type/BodyTypeCalculator";
import { BodyTypeContent } from "./body-type/BodyTypeContent";
import { GfrCalculator } from "./gfr/GfrCalculator";
import { GfrContent } from "./gfr/GfrContent";
import { TdeeCalculator } from "./tdee/TdeeCalculator";
import { TdeeContent } from "./tdee/TdeeContent";
import { FatIntakeCalculator } from "./fat-intake/FatIntakeCalculator";
import { FatIntakeContent } from "./fat-intake/FatIntakeContent";
import { ProteinCalculator } from "./protein/ProteinCalculator";
import { ProteinContent } from "./protein/ProteinContent";
import { CarbohydrateCalculator } from "./carbohydrate/CarbohydrateCalculator";
import { CarbohydrateContent } from "./carbohydrate/CarbohydrateContent";
import { MacroCalculator } from "./macro/MacroCalculator";
import { MacroContent } from "./macro/MacroContent";
import { PeriodCalculator } from "./period/PeriodCalculator";
import { PeriodContent } from "./period/PeriodContent";
import { ConceptionCalculator } from "./conception/ConceptionCalculator";
import { ConceptionContent } from "./conception/ConceptionContent";
import { OvulationCalculator } from "./ovulation/OvulationCalculator";
import { OvulationContent } from "./ovulation/OvulationContent";
import { BsaCalculator } from "./bsa/BsaCalculator";
import { BsaContent } from "./bsa/BsaContent";
import { BacCalculator } from "./bac/BacCalculator";
import { BacContent } from "./bac/BacContent";
import { ScientificCalculator } from "./scientific/ScientificCalculator";
import { ScientificCalculatorContent } from "./scientific/ScientificCalculatorContent";
import { FractionCalculator } from "./fraction/FractionCalculator";
import { FractionContent } from "./fraction/FractionContent";
import { StatisticsCalculator } from "./statistics/StatisticsCalculator";
import { StatisticsContent } from "./statistics/StatisticsContent";
import { PercentErrorCalculator } from "./percent-error/PercentErrorCalculator";
import { PercentErrorContent } from "./percent-error/PercentErrorContent";
import { DownPaymentCalculator } from "./down-payment/DownPaymentCalculator";
import { DownPaymentContent } from "./down-payment/DownPaymentContent";
import { RentVsBuyCalculator } from "./rent-vs-buy/RentVsBuyCalculator";
import { RentVsBuyContent } from "./rent-vs-buy/RentVsBuyContent";
import { HorsepowerCalculator } from "./horsepower/HorsepowerCalculator";
import { HorsepowerContent } from "./horsepower/HorsepowerContent";
import { GasMileageCalculator } from "./gas-mileage/GasMileageCalculator";
import { GasMileageContent } from "./gas-mileage/GasMileageContent";
import { FuelCostCalculator } from "./fuel-cost/FuelCostCalculator";
import { FuelCostContent } from "./fuel-cost/FuelCostContent";
import { DewPointCalculator } from "./dew-point/DewPointCalculator";
import { DewPointContent } from "./dew-point/DewPointContent";
import { HeatIndexCalculator } from "./heat-index/HeatIndexCalculator";
import { HeatIndexContent } from "./heat-index/HeatIndexContent";
import { WindChillCalculator } from "./wind-chill/WindChillCalculator";
import { WindChillContent } from "./wind-chill/WindChillContent";
import { SleepCalculator } from "./sleep/SleepCalculator";
import { SleepContent } from "./sleep/SleepContent";
import { EngineHorsepowerCalculator } from "./engine-horsepower/EngineHorsepowerCalculator";
import { EngineHorsepowerContent } from "./engine-horsepower/EngineHorsepowerContent";
import { MileageCalculator } from "./mileage/MileageCalculator";
import { MileageContent } from "./mileage/MileageContent";
import { TireSizeCalculator } from "./tire-size/TireSizeCalculator";
import { TireSizeContent } from "./tire-size/TireSizeContent";
import { DiceRollerCalculator } from "./dice-roller/DiceRollerCalculator";
import { DiceRollerContent } from "./dice-roller/DiceRollerContent";
import { LoveCalculator } from "./love/LoveCalculator";
import { LoveContent } from "./love/LoveContent";
import { GPACalculator } from "./gpa/GPACalculator";
import { GPAContent } from "./gpa/GPAContent";
import { GradeCalculator } from "./grade/GradeCalculator";
import { GradeContent } from "./grade/GradeContent";
import { MolarityCalculator } from "./molarity/MolarityCalculator";
import { MolarityContent } from "./molarity/MolarityContent";
import { MolecularWeightCalculator } from "./molecular-weight/MolecularWeightCalculator";
import { MolecularWeightContent } from "./molecular-weight/MolecularWeightContent";
import { ConcreteCalculator } from "./concrete/ConcreteCalculator";
import { ConcreteContent } from "./concrete/ConcreteContent";
import { BTUCalculator } from "./btu/BTUCalculator";
import { BTUContent } from "./btu/BTUContent";
import { SquareFootageCalculator } from "./square-footage/SquareFootageCalculator";
import { SquareFootageContent } from "./square-footage/SquareFootageContent";
import { StairCalculator } from "./stair/StairCalculator";
import { StairContent } from "./stair/StairContent";
import { RoofingCalculator } from "./roofing/RoofingCalculator";
import { RoofingContent } from "./roofing/RoofingContent";
import { TileCalculator } from "./tile/TileCalculator";
import { TileContent } from "./tile/TileContent";
import { MulchCalculator } from "./mulch/MulchCalculator";
import { MulchContent } from "./mulch/MulchContent";
import { GravelCalculator } from "./gravel/GravelCalculator";
import { GravelContent } from "./gravel/GravelContent";
import { ElectricityCalculator } from "./electricity/ElectricityCalculator";
import { ElectricityContent } from "./electricity/ElectricityContent";
import { HeightCalculator } from "./height/HeightCalculator";
import { HeightContent } from "./height/HeightContent";
import { ConversionCalculator } from "./conversion/ConversionCalculator";
import { ConversionContent } from "./conversion/ConversionContent";
import { DensityCalculator } from "./density/DensityCalculator";
import { DensityContent } from "./density/DensityContent";
import { MassCalculator } from "./mass/MassCalculator";
import { MassContent } from "./mass/MassContent";
import { SpeedCalculator } from "./speed/SpeedCalculator";
import { SpeedContent } from "./speed/SpeedContent";
import { RomanNumeralCalculator } from "./roman/RomanNumeralCalculator";
import { RomanNumeralContent } from "./roman/RomanNumeralContent";
import { DateCalculator } from "./date/DateCalculator";
import { DateContent } from "./date/DateContent";
import { HoursCalculator } from "./hours/HoursCalculator";
import { HoursContent } from "./hours/HoursContent";
import { TimeDurationContent } from "./time-duration/TimeDurationContent";
import { AutoLoanContentSection } from "./auto-loan/AutoLoanContentSection";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { CalculatorErrorBoundary } from "./CalculatorErrorBoundary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReportModal from "@/components/report/ReportModal";
import { generateGenericReportData } from "@/lib/report-generator/generic-report";

// Lazy load heavy chart components
const MortgagePieChart = dynamic(() => import("./charts/MortgagePieChart").then((m) => m.MortgagePieChart), {
  ssr: false,
  loading: () => <div className="h-40 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">Loading chart...</div>,
});
const BalanceLineChart = dynamic(() => import("./charts/BalanceLineChart").then((m) => m.BalanceLineChart), {
  ssr: false,
  loading: () => <div className="h-40 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">Loading line chart...</div>,
});
const AmortizationAreaChart = dynamic(() => import("./charts/AmortizationAreaChart").then((m) => m.AmortizationAreaChart), {
  ssr: false,
  loading: () => <div className="h-40 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">Loading area chart...</div>,
});

export interface CalculatorLayoutProps {
  definition: Omit<CalculatorModuleDefinition, "calculate">;
  children?: React.ReactNode;
}

export function CalculatorLayout({ definition }: CalculatorLayoutProps) {
  const initialInputs = useMemo(() => {
    const defaults: Record<string, any> = {};
    definition.inputs.forEach((input) => {
      defaults[input.name] = input.defaultValue;
    });
    return defaults;
  }, [definition]);

  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<Array<{ id: string; title: string; primaryResult: string; timestamp: string }>>([]);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopyResult = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: definition.title, url: window.location.href }).catch(() => { });
    } else {
      handleCopyResult();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveCalculation = () => {
    if (!calculationResult.success) return;
    const firstOutput = definition.outputs[0];
    const primaryResult = firstOutput ? `${firstOutput.label}: ${calculationResult.formatted[firstOutput.name] || (calculationResult.data ? calculationResult.data[firstOutput.name] : "")}` : "Calculated Result";
    const newItem = {
      id: Date.now().toString(),
      title: definition.title,
      primaryResult,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newItem, ...savedItems.filter(i => i.primaryResult !== newItem.primaryResult)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem(`saved_calc_${definition.id}`, JSON.stringify(updated));
    } catch (e) { }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDeleteSavedItem = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem(`saved_calc_${definition.id}`, JSON.stringify(updated));
    } catch (e) { }
  };

  const handleInputChange = (key: string, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const calculationResult: CalculationResult = useMemo(() => {
    return CalculatorEngine.run(definition.id, inputs);
  }, [definition.id, inputs]);

  const genericReportData = useMemo(() => {
    return generateGenericReportData(definition, inputs, calculationResult);
  }, [definition, inputs, calculationResult]);

  const amortizationSchedule: AmortizationRow[] = useMemo(() => {
    if (calculationResult.success && calculationResult.data?.amortizationSchedule) {
      return calculationResult.data.amortizationSchedule;
    }
    return [];
  }, [calculationResult]);



  const idLower = (definition?.id || "").toLowerCase();
  const slugLower = (definition?.slug || "").toLowerCase();

  const isMortgage = idLower.includes("mortgage");
  const isAmortization = idLower.includes("amortization");
  const isLoan = definition.id === "loan" || definition.slug === "loan-calculator";
  const isEmi = definition.id === "emi" || definition.slug === "emi-calculator";
  const isHouseAffordability = definition.id === "house-affordability" || definition.slug === "house-affordability-calculator";
  const isRefinance = definition.id === "refinance" || definition.slug === "refinance-calculator";
  const isAutoLoan = definition.id === "auto-loan" || definition.slug === "auto-loan-calculator";
  const isAutoLease = definition.id === "auto-lease" || definition.slug === "auto-lease-calculator";
  const isLease = idLower === "lease-calculator" || slugLower === "lease-calculator" || idLower === "lease" || slugLower === "lease";
  const isTip = idLower === "tip-calculator" || slugLower === "tip-calculator" || idLower === "tip" || slugLower === "tip";
  const isCollegeCost = idLower === "college-cost-calculator" || slugLower === "college-cost-calculator" || idLower === "college-cost" || slugLower === "college-cost" || idLower === "college-calculator" || slugLower === "college-calculator";
  const isDepreciation = idLower === "depreciation-calculator" || slugLower === "depreciation-calculator" || idLower === "depreciation" || slugLower === "depreciation";
  const isBoatLoan = idLower === "boat-loan-calculator" || slugLower === "boat-loan-calculator" || idLower === "boat-loan" || slugLower === "boat-loan" || idLower === "boat-calculator" || slugLower === "boat-calculator";
  const isCreditCardPayoff = idLower === "credit-card-payoff-calculator" || slugLower === "credit-card-payoff-calculator" || idLower === "credit-card-payoff" || slugLower === "credit-card-payoff" || idLower === "credit-cards-payoff-calculator" || slugLower === "credit-cards-payoff-calculator";
  const isGdp = idLower === "gdp-calculator" || slugLower === "gdp-calculator" || idLower === "gdp" || slugLower === "gdp";
  const isCompoundInterest = definition.id === "compound-interest" || definition.slug === "compound-interest-calculator";
  const isSimpleInterest = definition.id === "simple-interest" || definition.slug === "simple-interest-calculator";
  const isInterest = definition.id === "interest" || definition.slug === "interest-calculator";
  const isInvestment = definition.id === "investment" || definition.slug === "investment-calculator";
  const isSavings = definition.id === "savings" || definition.slug === "savings-calculator";
  const isSip = definition.id === "sip" || definition.slug === "sip-calculator";
  const isFd = definition.id === "fd" || definition.slug === "fd-calculator";
  const isRd = definition.id === "rd" || definition.slug === "rd-calculator";
  const isCagr = definition.id === "cagr" || definition.slug === "cagr-calculator";
  const isRoi = definition.id === "roi" || definition.slug === "roi-calculator";
  const isFutureValue = definition.id === "future-value" || definition.slug === "future-value-calculator";
  const isPresentValue = definition.id === "present-value" || definition.slug === "present-value-calculator";
  const isIncomeTax = definition.id === "income-tax" || definition.slug === "income-tax-calculator";
  const isGst = definition.id === "gst" || definition.slug === "gst-calculator";
  const isVat = definition.id === "vat" || definition.slug === "vat-calculator";
  const isSalesTax = definition.id === "sales-tax" || definition.slug === "sales-tax-calculator";
  const isRepayment = definition.id === "repayment" || definition.slug === "repayment-calculator";
  const isCreditCard = definition.id === "credit-card" || definition.slug === "credit-card-calculator";
  const isDebtPayoff = definition.id === "debt-payoff" || definition.slug === "debt-payoff-calculator";
  const isDebtConsolidation = definition.id === "debt-consolidation" || definition.slug === "debt-consolidation-calculator";
  const isRetirement = definition.id === "retirement" || definition.slug === "retirement-calculator";
  const isFourZeroOneK = definition.id === "401k" || definition.slug === "401k-calculator";
  const isRothIra = definition.id === "roth-ira" || definition.slug === "roth-ira-calculator";
  const isRmd = definition.id === "rmd" || definition.slug === "rmd-calculator";
  const isPension = definition.id === "pension" || definition.slug === "pension-calculator";
  const isSocialSecurity = definition.id === "social-security" || definition.slug === "social-security-calculator";
  const isAnnuity = definition.id === "annuity" || definition.slug === "annuity-calculator";
  const isAnnuityPayout = definition.id === "annuity-payout" || definition.slug === "annuity-payout-calculator";
  const isPayment = definition.id === "payment" || definition.id === "payment-calculator" || definition.slug === "payment-calculator";
  const isMargin = definition.id === "margin" || definition.slug === "margin-calculator";
  const isDiscount = definition.id === "discount" || definition.slug === "discount-calculator";
  const isCommission = definition.id === "commission" || definition.slug === "commission-calculator";
  const isPersonalLoan = definition.id === "personal-loan" || definition.slug === "personal-loan-calculator";
  const isBusinessLoan = definition.id === "business-loan" || definition.slug === "business-loan-calculator";
  const isStudentLoan = definition.id === "student-loan" || definition.slug === "student-loan-calculator";
  const isBudget = definition.id === "budget" || definition.slug === "budget-calculator";
  const isBmi = definition.id === "bmi" || definition.slug === "bmi-calculator";
  const isCalorie = definition.id === "calorie" || definition.slug === "calorie-calculator";
  const isBodyFat = definition.id === "body-fat" || definition.slug === "body-fat-calculator";
  const isBmr = definition.id === "bmr" || definition.slug === "bmr-calculator";
  const isIdealWeight = definition.id === "ideal-weight" || definition.slug === "ideal-weight-calculator";
  const isPace = definition.id === "pace" || definition.slug === "pace-calculator";
  const isArmyBodyFat = definition.id === "army-body-fat" || definition.slug === "army-body-fat-calculator";
  const isLeanBodyMass = definition.id === "lean-body-mass" || definition.slug === "lean-body-mass-calculator";
  const isHealthyWeight = definition.id === "healthy-weight" || definition.slug === "healthy-weight-calculator";
  const isCaloriesBurned = definition.id === "calories-burned" || definition.slug === "calories-burned-calculator";
  const isOneRepMax = definition.id === "one-rep-max" || definition.slug === "one-rep-max-calculator";
  const isTargetHeartRate = definition.id === "target-heart-rate" || definition.slug === "target-heart-rate-calculator";
  const isOvulation =
    definition.id === "ovulation" ||
    definition.id === "ovulation-calculator" ||
    definition.slug === "ovulation-calculator";
  const isDueDate =
    definition.id === "due-date" ||
    definition.id === "due-date-calculator" ||
    definition.slug === "due-date-calculator";
  const isPregnancyConception =
    definition.id === "pregnancy-conception" ||
    definition.id === "pregnancy-conception-calculator" ||
    definition.slug === "pregnancy-conception-calculator";
  const isPregnancyWeightGain =
    definition.id === "pregnancy-weight-gain" ||
    definition.id === "pregnancy-weight-gain-calculator" ||
    definition.slug === "pregnancy-weight-gain-calculator";
  const isPregnancy =
    !isDueDate &&
    !isPregnancyWeightGain &&
    !isPregnancyConception &&
    (definition.id === "pregnancy" || definition.id === "pregnancy-calculator" || definition.slug === "pregnancy-calculator");
  const isBsa = idLower === "body-surface-area" || idLower === "body-surface-area-calculator" || slugLower === "body-surface-area-calculator" || idLower === "bsa" || slugLower === "bsa-calculator";
  const isBac = idLower === "bac" || idLower === "bac-calculator" || slugLower === "bac-calculator";
  const isBodyType = idLower === "body-type" || idLower === "body-type-calculator" || slugLower === "body-type-calculator";
  const isGfr = idLower === "gfr" || idLower === "gfr-calculator" || slugLower === "gfr-calculator";
  const isTdee = idLower === "tdee" || idLower === "tdee-calculator" || slugLower === "tdee-calculator";
  const isFatIntake = idLower === "fat-intake" || idLower === "fat-intake-calculator" || slugLower === "fat-intake-calculator";
  const isProtein = idLower === "protein" || idLower === "protein-calculator" || slugLower === "protein-calculator";
  const isCarbohydrate = idLower === "carbohydrate" || idLower === "carbohydrate-calculator" || slugLower === "carbohydrate-calculator" || slugLower === "carb-calculator";
  const isMacro = idLower === "macro" || idLower === "macro-calculator" || slugLower === "macro-calculator";
  const isPeriod = idLower === "period" || idLower === "period-calculator" || slugLower === "period-calculator";
  const isConception = !isPregnancyConception && (idLower === "conception" || idLower === "conception-calculator" || slugLower === "conception-calculator");
  const isIra =
    definition.id === "ira" ||
    definition.slug === "ira-calculator" ||
    definition.id === "traditional-ira" ||
    definition.slug === "traditional-ira-calculator";
  const isScientific = idLower === "scientific-calculator" || slugLower === "scientific-calculator";
  const isHorsepower = idLower === "horsepower-calculator" || slugLower === "horsepower-calculator";
  const isGasMileage = idLower === "gas-mileage-calculator" || slugLower === "gas-mileage-calculator";
  const isFuelCost = idLower === "fuel-cost-calculator" || slugLower === "fuel-cost-calculator";
  const isDewPoint = idLower === "dew-point-calculator" || slugLower === "dew-point-calculator";
  const isHeatIndex = idLower === "heat-index-calculator" || slugLower === "heat-index-calculator";
  const isWindChill = idLower === "wind-chill-calculator" || slugLower === "wind-chill-calculator";
  const isSleep = idLower === "sleep-calculator" || slugLower === "sleep-calculator";
  const isEngineHorsepower = idLower === "engine-horsepower-calculator" || slugLower === "engine-horsepower-calculator";
  const isMileage = idLower === "mileage-calculator" || slugLower === "mileage-calculator";
  const isTireSize = idLower === "tire-size-calculator" || slugLower === "tire-size-calculator";
  const isDiceRoller = idLower === "dice-roller" || slugLower === "dice-roller" || idLower === "dice-roller-calculator" || slugLower === "dice-roller-calculator";
  const isLove = idLower === "love-calculator" || slugLower === "love-calculator";
  const isGPA = idLower === "gpa-calculator" || slugLower === "gpa-calculator";
  const isFraction = idLower === "fraction-calculator" || slugLower === "fraction-calculator";
  const isStatistics = idLower === "statistics-calculator" || slugLower === "statistics-calculator";
  const isPercentError = idLower === "percent-error-calculator" || slugLower === "percent-error-calculator";
  const isDownPayment = idLower === "down-payment-calculator" || slugLower === "down-payment-calculator";
  const isRentVsBuy = idLower === "rent-vs-buy-calculator" || slugLower === "rent-vs-buy-calculator";
  const isDate = idLower === "date-calculator" || slugLower === "date-calculator";
  const isHours = idLower === "hours-calculator" || slugLower === "hours-calculator";
  const isGrade = idLower === "grade-calculator" || slugLower === "grade-calculator";
  const isMolarity = idLower === "molarity-calculator" || slugLower === "molarity-calculator";
  const isMolecularWeight = idLower === "molecular-weight-calculator" || slugLower === "molecular-weight-calculator";
  const isConcrete = idLower === "concrete-calculator" || slugLower === "concrete-calculator";
  const isBtu = idLower === "btu-calculator" || slugLower === "btu-calculator";
  const isSquareFootage = idLower === "square-footage-calculator" || slugLower === "square-footage-calculator";
  const isStair = idLower === "stair-calculator" || slugLower === "stair-calculator";
  const isRoofing = idLower === "roofing-calculator" || slugLower === "roofing-calculator";
  const isTile = idLower === "tile-calculator" || slugLower === "tile-calculator";
  const isMulch = idLower === "mulch-calculator" || slugLower === "mulch-calculator";
  const isGravel = idLower === "gravel-calculator" || slugLower === "gravel-calculator";
  const isElectricity = idLower === "electricity-calculator" || slugLower === "electricity-calculator";
  const isHeight = idLower === "height-calculator" || slugLower === "height-calculator";
  const isConversion = idLower === "conversion-calculator" || slugLower === "conversion-calculator";
  const isDensity = idLower === "density-calculator" || slugLower === "density-calculator";
  const isMass = idLower === "mass-calculator" || slugLower === "mass-calculator" || idLower === "weight-calculator" || slugLower === "weight-calculator";
  const isSpeed = idLower === "speed-calculator" || slugLower === "speed-calculator";
  const isRoman = idLower === "roman-numeral-converter" || slugLower === "roman-numeral-converter";
  const isBond = idLower === "bond-calculator" || slugLower === "bond-calculator" || idLower === "bond" || slugLower === "bond";
  const isMutualFund = idLower === "mutual-fund-calculator" || slugLower === "mutual-fund-calculator" || idLower === "mutual-fund" || slugLower === "mutual-fund";
  const isAverageReturn = idLower === "average-return-calculator" || slugLower === "average-return-calculator" || idLower === "average-return" || slugLower === "average-return";
  const isIrr = idLower === "irr-calculator" || slugLower === "irr-calculator" || idLower === "irr" || slugLower === "irr";
  const isTime = idLower === "time-calculator" || slugLower === "time-calculator" || idLower === "time" || slugLower === "time";
  const isAge = idLower === "age-calculator" || slugLower === "age-calculator" || idLower === "age" || slugLower === "age";
  const isPaybackPeriod = idLower === "payback-period-calculator" || slugLower === "payback-period-calculator" || idLower === "payback-period" || slugLower === "payback-period";
  const isSalary = idLower === "salary-calculator" || slugLower === "salary-calculator" || idLower === "salary" || slugLower === "salary";
  const isMarriageTax = idLower === "marriage-tax-calculator" || slugLower === "marriage-tax-calculator" || idLower === "marriage-tax" || slugLower === "marriage-tax";
  const isEstateTax = idLower === "estate-tax-calculator" || slugLower === "estate-tax-calculator" || idLower === "estate-tax" || slugLower === "estate-tax";
  const isTakeHomePay = idLower === "take-home-pay-calculator" || slugLower === "take-home-pay-calculator" || idLower === "take-home-pay" || slugLower === "take-home-pay";
  const isRepaymentMatch = idLower === "repayment-calculator" || slugLower === "repayment-calculator" || idLower === "repayment" || slugLower === "repayment";
  const isCurrency = idLower === "currency-calculator" || slugLower === "currency-calculator" || idLower === "currency" || slugLower === "currency";
  const isInflation = idLower === "inflation-calculator" || slugLower === "inflation-calculator" || idLower === "inflation" || slugLower === "inflation";
  const isTimeDuration = idLower === "time-duration-calculator" || slugLower === "time-duration-calculator" || idLower === "time-duration" || slugLower === "time-duration";

  const CustomContent = (definition as any).ContentComponent || (
    isInterest ? InterestContent :
    isRothIra ? RothIraContent :
    isTimeDuration ? TimeDurationContent :
    isInvestment ? InvestmentContent :
      isRetirement ? RetirementContent :
        isGdp ? GDPContent :
          isCreditCardPayoff ? CreditCardPayoffContent :
            isBoatLoan ? BoatLoanContent :
              isDepreciation ? DepreciationContent :
                isCollegeCost ? CollegeCostContent :
                  isLease ? LeaseContent :
                    isRepayment ? RepaymentContent :
                      isCreditCard ? CreditCardContent :
                        isRoman ? RomanNumeralContent :
                          isSpeed ? SpeedContent :
                            isMass ? MassContent :
                              isDensity ? DensityContent :
                                isConversion ? ConversionContent :
                                  isHeight ? HeightContent :
                                    isElectricity ? ElectricityContent :
                                      isGravel ? GravelContent :
                                        isMulch ? MulchContent :
                                          isTile ? TileContent :
                                            isRoofing ? RoofingContent :
                                              isStair ? StairContent :
                                                isSquareFootage ? SquareFootageContent :
                                                  isBtu ? BTUContent :
                                                    isConcrete ? ConcreteContent :
                                                      isMolecularWeight ? MolecularWeightContent :
                                                        isMolarity ? MolarityContent :
                                                          isGrade ? GradeContent :
                                                            isGPA ? GPAContent :
                                                              isDate ? DateContent :
                                                                isHours ? HoursContent :
                                                                  isLove ? LoveContent :
                                                                    isDiceRoller ? DiceRollerContent :
                                                                      isTireSize ? TireSizeContent :
                                                                        isMileage ? MileageContent :
                                                                          isEngineHorsepower ? EngineHorsepowerContent :
                                                                            isHorsepower ? HorsepowerContent :
                                                                            isGasMileage ? GasMileageContent :
                                                                              isFuelCost ? FuelCostContent :
                                                                                isDewPoint ? DewPointContent :
                                                                                  isHeatIndex ? HeatIndexContent :
                                                                                    isWindChill ? WindChillContent :
                                                                                      isSleep ? SleepContent :
                                                                                      isIncomeTax ? IncomeTaxContent :
                                                                                        isSalary ? SalaryContent :
                                                                                           isMargin ? MarginContent :
                                                                                           isDiscount ? DiscountContent :
                                                                                           isAutoLoan ? AutoLoanContentSection :
                                                                                              isDebtConsolidation ? DebtConsolidationContent : isScientific ? ScientificCalculatorContent : isFraction ? FractionContent : isStatistics ? StatisticsContent : isPercentError ? PercentErrorContent : isDownPayment ? DownPaymentContent : isRentVsBuy ? RentVsBuyContent : isBac ? BacContent : isBsa ? BsaContent : isBodyType ? BodyTypeContent : isGfr ? GfrContent : isTdee ? TdeeContent : isFatIntake ? FatIntakeContent : isProtein ? ProteinContent : isCarbohydrate ? CarbohydrateContent : isMacro ? MacroContent : isPeriod ? PeriodContent : isConception ? ConceptionContent : isOvulation ? OvulationContent : isDueDate ? DueDateContent : isPregnancyConception ? PregnancyConceptionContent : isPregnancyWeightGain ? PregnancyWeightGainContent : isPregnancy ? PregnancyContent : isTargetHeartRate ? TargetHeartRateContent : isOneRepMax ? OneRepMaxContent : isCaloriesBurned ? CaloriesBurnedContent : isHealthyWeight ? HealthyWeightContent : isLeanBodyMass ? LeanBodyMassContent : isArmyBodyFat ? ArmyBodyFatContent : isPace ? PaceContent : isIdealWeight ? IdealWeightContent : isBmr ? BmrContent : isBodyFat ? BodyFatContent : isCalorie ? CalorieContent : isBmi ? BmiContent : isBudget ? BudgetContent : isRoi ? RoiContent : isCagr ? CagrContent : isRd ? RdContent : isFd ? FdContent : isSip ? SipContent : isSavings ? SavingsContent : isMortgage ? MortgageContentSection : null
  );
  const CustomChart = definition.ChartComponent;

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
      {/* 1. Accessible Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
        >
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
        <Link
          href={`/category/${definition.category.toLowerCase()}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
        >
          {definition.category}
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
        <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">{definition.title}</span>
      </nav>

      {/* 2. Main Full-Width Calculator Layout */}
      <div className="w-full min-w-0 space-y-4">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
            {isLoan ? "Loan Calculator & Amortization Payment Analyzer" : isPersonalLoan ? "Personal Loan Calculator & Amortization Payment Suite" : isTimeDuration ? "Time Duration Calculator – Calculate Elapsed Time Between Two Times and Dates" : definition.title}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-xl leading-normal font-medium">
            {definition.description}
          </p>
        </div>

        <CalculatorErrorBoundary fallbackTitle={`${definition.title} Error`}>
          {(definition as any).CustomComponent ? (
            React.createElement((definition as any).CustomComponent)
          ) : isMolecularWeight ? (
            <MolecularWeightCalculator />
          ) : isMolarity ? (
            <MolarityCalculator />
          ) : isGrade ? (
            <GradeCalculator />
          ) : isGPA ? (
            <GPACalculator />
          ) : isDate ? (
            <DateCalculator />
          ) : isHours ? (
            <HoursCalculator />
          ) : isScientific ? (
            <ScientificCalculator />
          ) : isFraction ? (
            <FractionCalculator />
          ) : isStatistics ? (
            <StatisticsCalculator />
          ) : isPercentError ? (
            <PercentErrorCalculator />
          ) : isDownPayment ? (
            <DownPaymentCalculator />
          ) : isRentVsBuy ? (
            <RentVsBuyCalculator />
          ) : isLove ? (
            <LoveCalculator />
          ) : isDiceRoller ? (
            <DiceRollerCalculator />
          ) : isTireSize ? (
            <TireSizeCalculator />
          ) : isMileage ? (
            <MileageCalculator />
          ) : isEngineHorsepower ? (
            <EngineHorsepowerCalculator />
          ) : isHorsepower ? (
            <HorsepowerCalculator />
          ) : isGasMileage ? (
            <GasMileageCalculator />
          ) : isFuelCost ? (
            <FuelCostCalculator />
          ) : isDewPoint ? (
            <DewPointCalculator />
          ) : isHeatIndex ? (
            <HeatIndexCalculator />
          ) : isWindChill ? (
            <WindChillCalculator />
          ) : isSleep ? (
            <SleepCalculator />
          ) : isScientific ? (
            <ScientificCalculator />
          ) : isBac ? (
            <BacCalculator />
          ) : isBsa ? (
            <BsaCalculator />
          ) : isBodyType ? (
            <BodyTypeCalculator />
          ) : isGfr ? (
            <GfrCalculator />
          ) : isTdee ? (
            <TdeeCalculator />
          ) : isFatIntake ? (
            <FatIntakeCalculator />
          ) : isProtein ? (
            <ProteinCalculator />
          ) : isCarbohydrate ? (
            <CarbohydrateCalculator />
          ) : isMacro ? (
            <MacroCalculator />
          ) : isPeriod ? (
            <PeriodCalculator />
          ) : isConception ? (
            <ConceptionCalculator />
          ) : isOvulation ? (
            <OvulationCalculator />
          ) : isDueDate ? (
            <DueDateCalculator />
          ) : isPregnancyConception ? (
            <PregnancyConceptionCalculator />
          ) : isPregnancyWeightGain ? (
            <PregnancyWeightGainCalculator />
          ) : isPregnancy ? (
            <PregnancyCalculator />
          ) : isTargetHeartRate ? (
            <TargetHeartRateCalculator />
          ) : isOneRepMax ? (
            <OneRepMaxCalculator />
          ) : isCaloriesBurned ? (
            <CaloriesBurnedCalculator />
          ) : isHealthyWeight ? (
            <HealthyWeightCalculator />
          ) : isLeanBodyMass ? (
            <LeanBodyMassCalculator />
          ) : isArmyBodyFat ? (
            <ArmyBodyFatCalculator />
          ) : isPace ? (
            <PaceCalculator />
          ) : isIdealWeight ? (
            <IdealWeightCalculator />
          ) : isBmr ? (
            <BmrCalculator />
          ) : isBodyFat ? (
            <BodyFatCalculator />
          ) : isCalorie ? (
            <CalorieCalculator />
          ) : isBmi ? (
            <BmiCalculator />
          ) : isBudget ? (
            <BudgetCalculator />
          ) : isStudentLoan ? (
            <StudentLoanCalculator />
          ) : isAutoLoan ? (
            <AutoLoanCalculator />
          ) : isBusinessLoan ? (
            <BusinessLoanCalculator />
          ) : isPersonalLoan ? (
            <PersonalLoanCalculator />
          ) : isCommission ? (
            <CommissionCalculator />
          ) : isDiscount ? (
            <DiscountCalculator />
          ) : isMargin ? (
            <MarginCalculator />
          ) : isAnnuityPayout ? (
            <AnnuityPayoutCalculator />
          ) : isAnnuity ? (
            <AnnuityCalculator />
          ) : isPayment ? (
            <PaymentCalculator />
          ) : isLease ? (
            <LeaseCalculator />
          ) : isTip ? (
            <TipCalculator />
          ) : isSocialSecurity ? (
            <SocialSecurityCalculator />
          ) : isPension ? (
            <PensionCalculator />
          ) : isRmd ? (
            <RmdCalculator />
          ) : isRothIra ? (
            <RothIraCalculator />
          ) : isIra ? (
            <IraCalculator />
          ) : isFourZeroOneK ? (
            <FourZeroOneKCalculator />
          ) : isRetirement ? (
            <RetirementCalculator />
          ) : isDebtConsolidation ? (
            <DebtConsolidationCalculator />
          ) : isDebtPayoff ? (
            <DebtPayoffCalculator />
          ) : isRepayment ? (
            <RepaymentCalculator />
          ) : isCreditCard ? (
            <CreditCardCalculator />
          ) : isSalesTax ? (
            <SalesTaxCalculator />
          ) : isVat ? (
            <VatCalculator />
          ) : isGst ? (
            <GstCalculator />
          ) : isIncomeTax ? (
            <IncomeTaxCalculator />
          ) : isPresentValue ? (
            <PresentValueCalculator />
          ) : isFutureValue ? (
            <FutureValueCalculator />
          ) : isRoi ? (
            <RoiCalculator />
          ) : isCagr ? (
            <CagrCalculator />
          ) : isRd ? (
            <RdCalculator />
          ) : isFd ? (
            <FdCalculator />
          ) : isSip ? (
            <SipCalculator />
          ) : isSavings ? (
            <SavingsCalculator />
          ) : isInvestment ? (
            <InvestmentCalculator />
          ) : isInterest ? (
            <InterestCalculator />
          ) : isSimpleInterest ? (
            <SimpleInterestCalculator />
          ) : isCompoundInterest ? (
            <CompoundInterestCalculator />
          ) : isRepayment ? (
            <RepaymentCalculator />
          ) : isCreditCard ? (
            <CreditCardCalculator />
          ) : isGdp ? (
            <GDPCalculator />
          ) : isCreditCardPayoff ? (
            <CreditCardPayoffCalculator />
          ) : isBoatLoan ? (
            <BoatLoanCalculator />
          ) : isDepreciation ? (
            <DepreciationCalculator />
          ) : isCollegeCost ? (
            <CollegeCostCalculator />
          ) : isLease ? (
            <LeaseCalculator />
          ) : isAutoLease ? (
            <AutoLeaseCalculator />
          ) : isAutoLoan ? (
            <AutoLoanCalculator />
          ) : isRefinance ? (
            <RefinanceCalculator />
          ) : isHouseAffordability ? (
            <HouseAffordabilityCalculator />
          ) : isEmi ? (
            <EmiCalculator />
          ) : isLoan ? (
            <LoanCalculator />
          ) : isAmortization ? (
            <AmortizationCalculator />
          ) : isMortgage ? (
            <MortgageCalculator />
          ) : isConcrete ? (
            <ConcreteCalculator />
          ) : isBtu ? (
            <BTUCalculator />
          ) : isSquareFootage ? (
            <SquareFootageCalculator />
          ) : isStair ? (
            <StairCalculator />
          ) : isRoofing ? (
            <RoofingCalculator />
          ) : isTile ? (
            <TileCalculator />
          ) : isMulch ? (
            <MulchCalculator />
          ) : isGravel ? (
            <GravelCalculator />
          ) : isElectricity ? (
            <ElectricityCalculator />
          ) : isHeight ? (
            <HeightCalculator />
          ) : isConversion ? (
            <ConversionCalculator />
          ) : isDensity ? (
            <DensityCalculator />
          ) : isMass ? (
            <MassCalculator />
          ) : isSpeed ? (
            <SpeedCalculator />
          ) : isRoman ? (
            <RomanNumeralCalculator />
          ) : (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
              <div className="grid min-w-0 grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Left: Inputs Panel */}
                <div className="min-w-0 md:col-span-6 space-y-2 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 pb-4 md:pb-0 md:pr-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center justify-between">
                    <span>Inputs</span>
                    <span className="text-[10px] font-normal text-zinc-400">Real-time</span>
                  </h2>
                  <CalculatorForm
                    definition={definition}
                    values={inputs}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Right: Results Panel */}
                <div className="min-w-0 md:col-span-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="min-w-0 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Calculated Summary
                    </h2>
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleSaveCalculation}
                        className="h-7 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 cursor-pointer hover:bg-zinc-50"
                      >
                        {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Bookmark className="h-3.5 w-3.5 text-blue-500" />}
                        {isSaved ? "Saved!" : "Save"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (calculationResult.success) {
                            const summary = definition.outputs.map(o => `${o.label}: ${calculationResult.formatted[o.name] || (calculationResult.data ? calculationResult.data[o.name] : "")}`).join(" | ");
                            navigator.clipboard.writeText(summary);
                          }
                        }}
                        className="h-7 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 cursor-pointer hover:bg-zinc-50 no-print"
                      >
                        <Copy className="h-3.5 w-3.5 text-zinc-500" /> Copy
                      </Button>
                    </div>
                  </div>
                  <CalculatorResult
                    definition={definition}
                    result={calculationResult}
                  />

                  {/* SAVED CALCULATIONS LIST */}
                  {savedItems.length > 0 && (
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                        <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                          <History className="w-3 h-3 text-blue-500" /> Saved Calculations ({savedItems.length})
                        </span>
                        <button
                          onClick={() => {
                            setSavedItems([]);
                            localStorage.removeItem(`saved_calc_${definition.id}`);
                          }}
                          className="text-[10px] text-zinc-400 hover:text-red-500 font-medium cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {savedItems.map((item) => (
                          <div key={item.id} className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-sans tabular-nums">
                            <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate">{item.primaryResult}</span>
                            <button onClick={() => handleDeleteSavedItem(item.id)} className="text-zinc-400 hover:text-red-500 p-0.5" title="Delete">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {CustomChart && calculationResult.data && (
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <CustomChart data={calculationResult.data} inputs={inputs} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CalculatorErrorBoundary>

        {/* Related Calculators Links directly below calculator box */}
        <div className="pt-3 pb-1 space-y-1.5 border-t border-slate-200/60 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
            RELATED CALCULATORS:
          </span>
          <RelatedCalculators
            currentId={definition.id}
            category={definition.category}
            explicitRelated={definition.relatedCalculators}
          />
        </div>
      </div>


      {/* 3. Full-Width Educational Resource: Long Content + FAQs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-8 shadow-xs text-slate-900 dark:text-slate-100">
        {/* Formula & Calculation Method (Fallback for calculators without a dedicated CustomContent component) */}
        {definition.formulaDescription && !CustomContent && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Formula &amp; Calculation Method
            </h3>
            <FormulaSection
              formula={definition.formulaDescription}
              explanation={`How ${definition.title} calculations work.`}
            />
          </div>
        )}

          {/* Educational Content & Examples */}
          {CustomContent && (
            <div className="space-y-3 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                <CustomContent />
              </div>
            </div>
          )}

          {/* Frequently Asked Questions: Custom Domain FAQs or Fallback */}
          {Boolean(definition.faqs && definition.faqs.length > 0) ? (
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {definition.faqs!.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : !isInterest && !isRothIra && !isTimeDuration && !isIncomeTax && !isPersonalLoan && !isLoan && !isCompoundInterest && !isSip && !isEmi && !isMortgage && !isGdp && !isCreditCardPayoff && !isBoatLoan && !isDepreciation && !isCollegeCost && !isLease && !isRepayment && !isRepaymentMatch && !isCreditCard && !isInflation && !isCurrency && !isPayment && !isTakeHomePay && !isSalesTax && !isDiscount && !isMargin && !isRoi && !isEstateTax && !isMarriageTax && !isSalary && !isPaybackPeriod && !isIrr && !isAverageReturn && !isMutualFund && !isBond && !isConcrete && !isBtu && !isSquareFootage && !isStair && !isRoofing && !isTile && !isMulch && !isGravel && !isElectricity && !isHeight && !isConversion && !isDensity && !isMass && !isSpeed && !isRoman && !isRetirement && !isInvestment && !isCalorie && !isAutoLoan && !isStudentLoan && !isBudget && !isSavings && !isHouseAffordability && !isTime && !isAge && !isAmortization && !isGrade && !isDebtConsolidation && definition.category !== "Math" ? (
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {getTenHighQualityFaqs(definition.title, definition.category).slice(0, 10).map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

      {/* Generic Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={genericReportData}
      />
    </div>
  );
}

export default CalculatorLayout;
