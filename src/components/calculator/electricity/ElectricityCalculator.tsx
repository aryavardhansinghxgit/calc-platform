"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Zap,
  Download,
  Trash2,
  Plus,
  FileSpreadsheet,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  DollarSign,
  TrendingDown,
  Globe,
  Leaf,
  Clock,
  PieChart as PieIcon,
  Tv,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  PowerUnit,
  CurrencyCode,
  CURRENCY_CONFIGS,
  APPLIANCE_PRESETS,
  calculateSingleAppliance,
  calculateTimeOfUse,
  calculateHouseAggregator,
  calculateEnergyEfficiency,
  SingleApplianceResult,
  TimeOfUseResult,
  HouseAggregatorResult,
  EnergyEfficiencyResult,
  HouseApplianceRow,
} from "@/lib/calculator-engine/formulas/electricity";

// ─── Local Storage Hook ─────────────────────────────────────────────────────

interface SavedEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T>(storageKey: string) {
  const [saved, setSaved] = useState<SavedEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedEstimate<T> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        result,
        notes,
      };
      setSaved((prev) => {
        const next = [entry, ...prev].slice(0, 15);
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [storageKey],
  );

  const remove = useCallback(
    (id: string) => {
      setSaved((prev) => {
        const next = prev.filter((e) => e.id !== id);
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [storageKey],
  );

  const clear = useCallback(() => {
    setSaved([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [storageKey]);

  return { saved, isOpen, setIsOpen, save, remove, clear };
}

// ─── UI Helper Components ───────────────────────────────────────────────────

function CardWrapper({
  title,
  children,
  hasResult,
  isSaved,
  savedCount,
  onToggleSaved,
  onSave,
}: {
  title: string;
  children: React.ReactNode;
  hasResult?: boolean;
  isSaved?: boolean;
  savedCount?: number;
  onToggleSaved?: () => void;
  onSave?: () => void;
}) {
  return (
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between">
        <h3 className="font-bold text-xs tracking-wide text-white">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                title="View saved calculations"
              >
                {savedCount} saved
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-all ${
                isSaved
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50 shadow-xs"
              }`}
            >
              {isSaved ? "Saved!" : "Save"}
            </button>
          </div>
        )}
      </div>
      <div className="p-3.5 space-y-3">{children}</div>
    </div>
  );
}

function SavedDrawer<T>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
}: {
  saved: SavedEstimate<T>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Result Summary"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `electricity_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} History ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-36 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums"
          >
            <div className="truncate pr-2">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {formatSummary(item.result)}
              </span>
              <span className="text-zinc-400 ml-1.5">({item.inputSummary})</span>
            </div>
            <button
              onClick={() => remove(item.id)}
              className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual Power Allocation Bar Chart Component ────────────────────────────

function PowerAllocationVisualizer({
  allocations,
  currencySymbol,
  totalMonthlyBill,
}: {
  allocations: { name: string; monthlyKwh: number; monthlyCost: number; pctOfTotal: number }[];
  currencySymbol: string;
  totalMonthlyBill: number;
}) {
  const colors = [
    "bg-blue-600",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-indigo-500",
    "bg-slate-400",
  ];

  return (
    <div className="space-y-2.5 p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700">
      <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
        <span className="flex items-center gap-1">
          <PieIcon className="w-3.5 h-3.5 text-blue-600" /> Whole-House Power Allocation
        </span>
        <span className="font-sans tabular-nums text-blue-700 dark:text-blue-300 font-bold">
          Total: {currencySymbol}{totalMonthlyBill.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
        </span>
      </div>

      {/* Multi-segment Horizontal Progress Bar */}
      <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden flex shadow-inner">
        {allocations.slice(0, 7).map((item, idx) => (
          <div
            key={idx}
            style={{ width: `${Math.max(2, item.pctOfTotal)}%` }}
            className={`${colors[idx % colors.length]} h-full transition-all`}
            title={`${item.name}: ${item.pctOfTotal}% (${item.monthlyKwh} kWh)`}
          />
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[10px] font-sans tabular-nums">
        {allocations.slice(0, 6).map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 truncate">
            <span className={`w-2 h-2 rounded-full shrink-0 ${colors[idx % colors.length]}`} />
            <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">{item.name}:</span>
            <span className="text-zinc-500 font-bold shrink-0">{item.pctOfTotal}% ({currencySymbol}{item.monthlyCost})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function ElectricityCalculator() {
  // Global Currency State
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const currencyConfig = CURRENCY_CONFIGS[currency];

  // ─── CARD 1: SINGLE APPLIANCE ESTIMATOR ───
  const [selectedPresetId, setSelectedPresetId] = useState("split_ac_1_5_ton");
  const [powerValue, setPowerValue] = useState("1500");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("watts");
  const [dutyCyclePct, setDutyCyclePct] = useState("60");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerWeek, setDaysPerWeek] = useState("7");
  const [monthsPerYear, setMonthsPerYear] = useState("12");
  const [ratePerKwh, setRatePerKwh] = useState(String(CURRENCY_CONFIGS.USD.defaultRatePerKwh));
  const [singleResult, setSingleResult] = useState<SingleApplianceResult | null>(null);
  const [singleSaveSuccess, setSingleSaveSuccess] = useState(false);
  const singleSaved = useCardSaved<SingleApplianceResult>("saved_electricity_single");

  // ─── CARD 2: TIERED & TIME-OF-USE (TOU) ───
  const [peakKwh, setPeakKwh] = useState("8");
  const [offPeakKwh, setOffPeakKwh] = useState("16");
  const [peakRate, setPeakRate] = useState("0.28");
  const [offPeakRate, setOffPeakRate] = useState("0.12");
  const [fixedMonthlyFee, setFixedMonthlyFee] = useState("15.00");
  const [touResult, setTouResult] = useState<TimeOfUseResult | null>(null);
  const [touSaveSuccess, setTouSaveSuccess] = useState(false);
  const touSaved = useCardSaved<TimeOfUseResult>("saved_electricity_tou");

  // ─── CARD 3: WHOLE-HOUSE MULTI-APPLIANCE AGGREGATOR ───
  const [houseAppliances, setHouseAppliances] = useState<HouseApplianceRow[]>([
    { id: "1", name: "Living Room AC (1.5 Ton)", quantity: 1, powerWatts: 1500, dailyHours: 8, category: "HVAC" },
    { id: "2", name: "Refrigerator (Frost-Free)", quantity: 1, powerWatts: 200, dailyHours: 24, category: "Kitchen" },
    { id: "3", name: "Water Heater / Geyser", quantity: 1, powerWatts: 3000, dailyHours: 1.5, category: "Laundry" },
    { id: "4", name: "Smart TV (55\")", quantity: 2, powerWatts: 110, dailyHours: 5, category: "Entertainment" },
    { id: "5", name: "Ceiling Fans", quantity: 4, powerWatts: 65, dailyHours: 12, category: "HVAC" },
    { id: "6", name: "LED Lights (9W)", quantity: 12, powerWatts: 9, dailyHours: 6, category: "Lighting" },
  ]);
  const [houseResult, setHouseResult] = useState<HouseAggregatorResult | null>(null);
  const [houseSaveSuccess, setHouseSaveSuccess] = useState(false);
  const houseSaved = useCardSaved<HouseAggregatorResult>("saved_electricity_house");

  // ─── CARD 4: ENERGY EFFICIENCY & LED SAVINGS CONVERTER ───
  const [oldWatts, setOldWatts] = useState("60"); // 60W Incandescent
  const [newWatts, setNewWatts] = useState("9"); // 9W LED
  const [upgradeQty, setUpgradeQty] = useState("10");
  const [upgradeDailyHours, setUpgradeDailyHours] = useState("6");
  const [upgradeUnitCost, setUpgradeUnitCost] = useState("4.00");
  const [efficiencyResult, setEfficiencyResult] = useState<EnergyEfficiencyResult | null>(null);
  const [efficiencySaveSuccess, setEfficiencySaveSuccess] = useState(false);
  const efficiencySaved = useCardSaved<EnergyEfficiencyResult>("saved_electricity_efficiency");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Sync currency change
  const handleCurrencyChange = (newCurr: CurrencyCode) => {
    setCurrency(newCurr);
    const cfg = CURRENCY_CONFIGS[newCurr];
    setRatePerKwh(String(cfg.defaultRatePerKwh));
    setPeakRate(String(Math.round(cfg.defaultRatePerKwh * 1.5 * 100) / 100));
    setOffPeakRate(String(Math.round(cfg.defaultRatePerKwh * 0.7 * 100) / 100));
    setFixedMonthlyFee(newCurr === "INR" ? "150.00" : "15.00");
    setUpgradeUnitCost(newCurr === "INR" ? "120.00" : "4.00");
  };

  // Preset Selection
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = APPLIANCE_PRESETS.find((p) => p.id === presetId);
    if (preset && preset.id !== "custom") {
      setPowerValue(String(preset.defaultWatts));
      setPowerUnit("watts");
      setHoursPerDay(String(preset.defaultHoursPerDay));
      setDutyCyclePct(String(preset.defaultDutyCyclePct));
    }
  };

  // Calculations
  const handleSingleCalc = useCallback(() => {
    const res = calculateSingleAppliance({
      powerValue: Number(powerValue) || 1000,
      powerUnit,
      dutyCyclePct: Number(dutyCyclePct) || 100,
      hoursPerDay: Number(hoursPerDay) || 4,
      daysPerWeek: Number(daysPerWeek) || 7,
      monthsPerYear: Number(monthsPerYear) || 12,
      currency,
      ratePerKwh: Number(ratePerKwh) || 0.16,
    });
    setSingleResult(res);
  }, [powerValue, powerUnit, dutyCyclePct, hoursPerDay, daysPerWeek, monthsPerYear, currency, ratePerKwh]);

  const handleTouCalc = useCallback(() => {
    const res = calculateTimeOfUse({
      peakKwhPerDay: Number(peakKwh) || 8,
      offPeakKwhPerDay: Number(offPeakKwh) || 16,
      peakRate: Number(peakRate) || 0.28,
      offPeakRate: Number(offPeakRate) || 0.12,
      fixedMonthlyGridFee: Number(fixedMonthlyFee) || 15,
      currency,
    });
    setTouResult(res);
  }, [peakKwh, offPeakKwh, peakRate, offPeakRate, fixedMonthlyFee, currency]);

  const handleHouseCalc = useCallback(() => {
    const res = calculateHouseAggregator({
      appliances: houseAppliances,
      ratePerKwh: Number(ratePerKwh) || 0.16,
      currency,
    });
    setHouseResult(res);
  }, [houseAppliances, ratePerKwh, currency]);

  const handleEfficiencyCalc = useCallback(() => {
    const res = calculateEnergyEfficiency({
      oldWatts: Number(oldWatts) || 60,
      newWatts: Number(newWatts) || 9,
      quantity: Number(upgradeQty) || 10,
      dailyHours: Number(upgradeDailyHours) || 6,
      ratePerKwh: Number(ratePerKwh) || 0.16,
      replacementCostPerUnit: Number(upgradeUnitCost) || 4,
      currency,
    });
    setEfficiencyResult(res);
  }, [oldWatts, newWatts, upgradeQty, upgradeDailyHours, ratePerKwh, upgradeUnitCost, currency]);

  useEffect(() => {
    handleSingleCalc();
  }, [handleSingleCalc]);

  useEffect(() => {
    handleTouCalc();
  }, [handleTouCalc]);

  useEffect(() => {
    handleHouseCalc();
  }, [handleHouseCalc]);

  useEffect(() => {
    handleEfficiencyCalc();
  }, [handleEfficiencyCalc]);

  // House row actions
  const addHouseRow = () => {
    setHouseAppliances((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: `Device ${prev.length + 1}`,
        quantity: 1,
        powerWatts: 500,
        dailyHours: 4,
        category: "General",
      },
    ]);
  };

  const removeHouseRow = (id: string) => {
    if (houseAppliances.length <= 1) return;
    setHouseAppliances((prev) => prev.filter((row) => row.id !== id));
  };

  const updateHouseRow = (id: string, field: keyof HouseApplianceRow, value: any) => {
    setHouseAppliances((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    const sym = currencyConfig.symbol;

    if (singleResult) {
      sections.push({
        title: "Single Appliance Energy & Cost Audit",
        items: [
          { label: "Appliance Profile", value: APPLIANCE_PRESETS.find((p) => p.id === selectedPresetId)?.name || "Custom" },
          { label: "Effective Operating Power", value: `${singleResult.effectiveWatts} W (${singleResult.effectiveKw} kW at ${dutyCyclePct}% duty cycle)` },
          { label: "Daily Energy Consumption", value: `${singleResult.dailyKwh} kWh / day` },
          { label: "Monthly Energy Consumption", value: `${singleResult.monthlyKwh} kWh / month` },
          { label: "Annual Energy Consumption", value: `${singleResult.annualKwh} kWh / year` },
          { label: "Monthly Electric Cost", value: `${sym}${singleResult.monthlyCost.toFixed(2)}` },
          { label: "Annual Electric Cost", value: `${sym}${singleResult.annualCost.toFixed(2)}` },
          { label: "Carbon Footprint", value: `${singleResult.carbonKgPerYear} kg CO2e / year (${singleResult.carbonMetricTonnesPerYear} tonnes)` },
        ],
      });
    }

    if (houseResult) {
      sections.push({
        title: "Whole-House Load & Appliance Breakdown",
        items: [
          { label: "Total Household Monthly Energy", value: `${houseResult.totalMonthlyKwh} kWh / month` },
          { label: "Estimated Monthly Electric Bill", value: `${sym}${houseResult.totalMonthlyBill.toFixed(2)}` },
          { label: "Total Annual Energy & Cost", value: `${houseResult.totalAnnualKwh} kWh (${sym}${houseResult.totalAnnualBill.toFixed(2)} / yr)` },
          { label: "Highest Power-Draining Appliance", value: houseResult.topDrainingAppliance },
          { label: "Annual Household Carbon Emission", value: `${houseResult.totalAnnualCarbonKg} kg CO2e` },
        ],
      });
    }

    if (efficiencyResult) {
      sections.push({
        title: "Energy Efficiency Upgrade ROI",
        items: [
          { label: "Power Reduction", value: `${efficiencyResult.powerSavedWatts} W saved across ${upgradeQty} units` },
          { label: "Annual Energy Saved", value: `${efficiencyResult.annualKwhSaved} kWh / year` },
          { label: "Annual Dollar Savings", value: `${sym}${efficiencyResult.annualCostSaved.toFixed(2)} / year` },
          { label: "Payback Period", value: `${efficiencyResult.paybackMonths} Months (ROI: ${efficiencyResult.annualRoiPct}%)` },
          { label: "10-Year Cumulative Savings", value: `${sym}${efficiencyResult.tenYearSavings.toFixed(2)}` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Electricity Calculator",
        reportTitle: "Home Energy Audit & Electricity Consumption Takeoff",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: sym,
      },
      keyMetrics: [
        { label: "Single Appliance Cost", value: singleResult ? `${sym}${singleResult.monthlyCost.toFixed(2)}/mo` : "—", highlight: true },
        { label: "Monthly Household Bill", value: houseResult ? `${sym}${houseResult.totalMonthlyBill.toFixed(2)}/mo` : "—" },
        { label: "Efficiency Savings", value: efficiencyResult ? `${sym}${efficiencyResult.annualCostSaved.toFixed(2)}/yr` : "—" },
      ],
      sections,
    };
  }, [singleResult, houseResult, efficiencyResult, currencyConfig, selectedPresetId, dutyCyclePct, upgradeQty]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ GLOBAL CURRENCY & TARIFF CONTROLS ═══════════════════ */}
      <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-bold text-blue-950 dark:text-blue-100">Regional Currency &amp; Tariff:</span>
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value as CurrencyCode)}
            className="h-7 text-xs font-semibold rounded border border-blue-300 dark:border-blue-800 bg-white dark:bg-zinc-800 px-2 text-blue-900 dark:text-blue-100 cursor-pointer shadow-xs"
          >
            {Object.values(CURRENCY_CONFIGS).map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
            Electric Tariff ({currencyConfig.symbol}/{currencyConfig.billingUnitName}):
          </span>
          <Input
            type="number"
            value={ratePerKwh}
            onChange={(e) => setRatePerKwh(e.target.value)}
            step={0.01}
            min={0.001}
            className="w-20 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-blue-950 dark:text-blue-100 font-bold"
          />
        </div>
      </div>

      {/* ═══════════════════ CARD 1: SINGLE APPLIANCE ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Single Appliance Power &amp; Electricity Cost Estimator"
        hasResult={!!singleResult}
        isSaved={singleSaveSuccess}
        savedCount={singleSaved.saved.length}
        onToggleSaved={() => singleSaved.setIsOpen(!singleSaved.isOpen)}
        onSave={() => {
          if (!singleResult) return;
          singleSaved.save(
            `${powerValue}${powerUnit}, ${hoursPerDay}h/day: ${singleResult.currencySymbol}${singleResult.monthlyCost}/mo (${singleResult.monthlyKwh} kWh)`,
            singleResult
          );
          flashSave(setSingleSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Preset Appliance Selection */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
              Quick Preset Appliance Picker
            </label>
            <select
              value={selectedPresetId}
              onChange={(e) => handlePresetSelect(e.target.value)}
              className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
            >
              {APPLIANCE_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name} ({preset.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {/* Power Rating Input */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Power Rating</label>
              <div className="flex gap-1">
                <Input
                  type="number"
                  value={powerValue}
                  onChange={(e) => setPowerValue(e.target.value)}
                  min={0}
                  step={10}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
                <select
                  value={powerUnit}
                  onChange={(e) => setPowerUnit(e.target.value as PowerUnit)}
                  className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans"
                >
                  <option value="watts">W</option>
                  <option value="kilowatts">kW</option>
                  <option value="btu_hr">BTU/hr</option>
                  <option value="mechanical_hp">HP (US)</option>
                  <option value="metric_hp">HP (Metric)</option>
                  <option value="refrigeration_tons">TR (Ton)</option>
                </select>
              </div>
            </div>

            {/* Duty Cycle % */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium" title="Compressor or active heating cycle %">
                Operating Duty Cycle (%)
              </label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={dutyCyclePct}
                  onChange={(e) => setDutyCyclePct(e.target.value)}
                  min={1}
                  max={100}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
                <span className="text-xs text-zinc-500 font-semibold">%</span>
              </div>
            </div>

            {/* Daily Hours */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Operating Hours / Day</label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  min={0.1}
                  max={24}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
                <span className="text-xs text-zinc-500 font-semibold">hrs</span>
              </div>
            </div>

            {/* Days per Week */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Frequency (Days/Wk)</label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  min={1}
                  max={7}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
                <span className="text-xs text-zinc-500 font-semibold">days</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleSingleCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Energy &amp; Cost
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPowerValue("1000");
                setPowerUnit("watts");
                setDutyCyclePct("100");
                setHoursPerDay("4");
              }}
              className="text-xs font-semibold h-7 px-3 cursor-pointer"
            >
              Clear
            </Button>
          </div>

          {/* Results Grid */}
          {singleResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Monthly Cost</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {singleResult.currencySymbol}{singleResult.monthlyCost.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {singleResult.monthlyKwh} kWh / month
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Annual Cost</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {singleResult.currencySymbol}{singleResult.annualCost.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {singleResult.annualKwh} kWh / year
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Daily Consumption</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {singleResult.dailyKwh} kWh
                  </span>
                  <span className="text-[10px] text-zinc-500 block">
                    {singleResult.currencySymbol}{singleResult.dailyCost.toFixed(2)} / day
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Carbon Emissions</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-sans tabular-nums">
                    {singleResult.carbonKgPerYear} kg
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    CO₂e / year ({singleResult.carbonMetricTonnesPerYear} t)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...singleSaved}
          cardTitle="Single Appliance"
          formatSummary={(r) => `${r.currencySymbol}${r.monthlyCost}/mo (${r.monthlyKwh} kWh), ${r.currencySymbol}${r.annualCost}/yr`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: TIERED & TIME-OF-USE (TOU) ═══════════════════ */}
      <CardWrapper
        title="Tiered Tariff &amp; Time-of-Use (TOU) Energy Calculator"
        hasResult={!!touResult}
        isSaved={touSaveSuccess}
        savedCount={touSaved.saved.length}
        onToggleSaved={() => touSaved.setIsOpen(!touSaved.isOpen)}
        onSave={() => {
          if (!touResult) return;
          touSaved.save(
            `TOU Peak (${peakKwh} kWh @ ${currencyConfig.symbol}${peakRate}) + Off-Peak (${offPeakKwh} kWh @ ${currencyConfig.symbol}${offPeakRate}): Total ${currencyConfig.symbol}${touResult.totalMonthlyBill}/mo`,
            touResult
          );
          flashSave(setTouSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Peak Usage (kWh/day)</label>
              <Input
                type="number"
                value={peakKwh}
                onChange={(e) => setPeakKwh(e.target.value)}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Peak Rate ({currencyConfig.symbol}/kWh)</label>
              <Input
                type="number"
                value={peakRate}
                onChange={(e) => setPeakRate(e.target.value)}
                step={0.01}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-rose-600 font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Off-Peak (kWh/day)</label>
              <Input
                type="number"
                value={offPeakKwh}
                onChange={(e) => setOffPeakKwh(e.target.value)}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Off-Peak Rate ({currencyConfig.symbol}/kWh)</label>
              <Input
                type="number"
                value={offPeakRate}
                onChange={(e) => setOffPeakRate(e.target.value)}
                step={0.01}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-emerald-600 font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Fixed Meter Fee ({currencyConfig.symbol}/mo)</label>
              <Input
                type="number"
                value={fixedMonthlyFee}
                onChange={(e) => setFixedMonthlyFee(e.target.value)}
                step={1}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleTouCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate TOU Bill
            </Button>
          </div>

          {touResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Monthly Electric Bill</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {touResult.currencySymbol}{touResult.totalMonthlyBill.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-medium">
                    {touResult.totalMonthlyKwh} kWh / month
                  </span>
                </div>

                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Effective Blended Rate</span>
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {touResult.currencySymbol}{touResult.effectiveRatePerKwh.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-zinc-500 block">per kWh overall</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Peak vs Off-Peak Cost</span>
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {touResult.currencySymbol}{touResult.peakMonthlyCost.toFixed(2)} / {touResult.currencySymbol}{touResult.offPeakMonthlyCost.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    {touResult.peakPct}% Peak / {touResult.offPeakPct}% Off-Peak
                  </span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Annual Projected Bill</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {touResult.currencySymbol}{touResult.totalAnnualBill.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">({touResult.totalAnnualKwh} kWh/yr)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...touSaved}
          cardTitle="TOU Tariff"
          formatSummary={(r) => `${r.currencySymbol}${r.totalMonthlyBill}/mo (Effective: ${r.currencySymbol}${r.effectiveRatePerKwh}/kWh)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: WHOLE-HOUSE MULTI-APPLIANCE AGGREGATOR ═══════════════════ */}
      <CardWrapper
        title="Whole-House Multi-Appliance Load Aggregator &amp; Visualizer"
        hasResult={!!houseResult}
        isSaved={houseSaveSuccess}
        savedCount={houseSaved.saved.length}
        onToggleSaved={() => houseSaved.setIsOpen(!houseSaved.isOpen)}
        onSave={() => {
          if (!houseResult) return;
          houseSaved.save(
            `${houseAppliances.length} Appliances: ${houseResult.currencySymbol}${houseResult.totalMonthlyBill}/mo (${houseResult.totalMonthlyKwh} kWh/mo)`,
            houseResult
          );
          flashSave(setHouseSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Household Appliance Inventory ({houseAppliances.length}):
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addHouseRow}
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Appliance
            </Button>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-1.5 px-2 py-1.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-md border border-blue-200/70 dark:border-blue-900/50 text-[11px] font-bold text-blue-900 dark:text-blue-200">
            <div className="col-span-4">Appliance / Device Name</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-2">Power (Watts)</div>
            <div className="col-span-2">Hours / Day</div>
            <div className="col-span-1">Category</div>
            <div className="col-span-1 text-right">Del</div>
          </div>

          {/* Dynamic Rows */}
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {houseAppliances.map((app) => (
              <div
                key={app.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-4">
                  <Input
                    type="text"
                    value={app.name}
                    onChange={(e) => updateHouseRow(app.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="Device name"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={app.quantity}
                    onChange={(e) => updateHouseRow(app.id, "quantity", Number(e.target.value))}
                    min={1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={app.powerWatts}
                    onChange={(e) => updateHouseRow(app.id, "powerWatts", Number(e.target.value))}
                    min={1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={app.dailyHours}
                    onChange={(e) => updateHouseRow(app.id, "dailyHours", Number(e.target.value))}
                    min={0.1}
                    max={24}
                    step={0.5}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    type="text"
                    value={app.category}
                    onChange={(e) => updateHouseRow(app.id, "category", e.target.value)}
                    className="h-7 text-[10px] bg-white dark:bg-zinc-800"
                    placeholder="Cat"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeHouseRow(app.id)}
                    disabled={houseAppliances.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleHouseCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Recalculate Household Load
            </Button>
          </div>

          {/* Interactive Power Allocation Bar Chart */}
          {houseResult && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <PowerAllocationVisualizer
                allocations={houseResult.allocations}
                currencySymbol={currencyConfig.symbol}
                totalMonthlyBill={houseResult.totalMonthlyBill}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Monthly Bill</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {houseResult.currencySymbol}{houseResult.totalMonthlyBill.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {houseResult.totalMonthlyKwh} kWh / mo
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Annual Bill</span>
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {houseResult.currencySymbol}{houseResult.totalAnnualBill.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {houseResult.totalAnnualKwh} kWh / yr
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Top Power Hog</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-sans block truncate">
                    {houseResult.topDrainingAppliance}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">of total load</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Carbon Footprint</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-300 font-sans tabular-nums">
                    {houseResult.totalAnnualCarbonKg} kg
                  </span>
                  <span className="text-[10px] text-zinc-400 block">CO₂e / year</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...houseSaved}
          cardTitle="Whole House"
          formatSummary={(r) => `${r.currencySymbol}${r.totalMonthlyBill}/mo (${r.totalMonthlyKwh} kWh/mo), Top: ${r.topDrainingAppliance}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: ENERGY EFFICIENCY & LED SAVINGS CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Energy Efficiency, Inverter &amp; LED Upgrade ROI Calculator"
        hasResult={!!efficiencyResult}
        isSaved={efficiencySaveSuccess}
        savedCount={efficiencySaved.saved.length}
        onToggleSaved={() => efficiencySaved.setIsOpen(!efficiencySaved.isOpen)}
        onSave={() => {
          if (!efficiencyResult) return;
          efficiencySaved.save(
            `Upgrade ${upgradeQty}x (${oldWatts}W → ${newWatts}W): Saves ${currencyConfig.symbol}${efficiencyResult.annualCostSaved}/yr (Payback: ${efficiencyResult.paybackMonths} mos)`,
            efficiencyResult
          );
          flashSave(setEfficiencySaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Existing/Old Power (W)</label>
              <Input
                type="number"
                value={oldWatts}
                onChange={(e) => setOldWatts(e.target.value)}
                min={1}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="60W"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">New Efficient Power (W)</label>
              <Input
                type="number"
                value={newWatts}
                onChange={(e) => setNewWatts(e.target.value)}
                min={1}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-emerald-600 font-semibold"
                placeholder="9W"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Quantity of Units</label>
              <Input
                type="number"
                value={upgradeQty}
                onChange={(e) => setUpgradeQty(e.target.value)}
                min={1}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Daily Hours Run</label>
              <Input
                type="number"
                value={upgradeDailyHours}
                onChange={(e) => setUpgradeDailyHours(e.target.value)}
                min={0.1}
                max={24}
                step={0.5}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                New Unit Cost ({currencyConfig.symbol})
              </label>
              <Input
                type="number"
                value={upgradeUnitCost}
                onChange={(e) => setUpgradeUnitCost(e.target.value)}
                min={0}
                step={0.5}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleEfficiencyCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Upgrade ROI &amp; Savings
            </Button>
          </div>

          {efficiencyResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-medium">Annual Money Saved</span>
                  <span className="text-2xl font-black text-emerald-950 dark:text-emerald-100 font-sans tabular-nums">
                    {efficiencyResult.currencySymbol}{efficiencyResult.annualCostSaved.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-300 block font-semibold">
                    {efficiencyResult.annualKwhSaved} kWh / year saved
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Payback Period / ROI</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {efficiencyResult.paybackMonths}{" "}
                    <span className="text-xs font-normal">Months</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    Annual ROI: {efficiencyResult.annualRoiPct}%
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">5-Year Net Profit</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {efficiencyResult.currencySymbol}{efficiencyResult.fiveYearSavings.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    (10-Yr: {efficiencyResult.currencySymbol}{efficiencyResult.tenYearSavings.toLocaleString()})
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Carbon Avoided</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-sans tabular-nums">
                    {efficiencyResult.annualCarbonAvoidedKg} kg
                  </span>
                  <span className="text-[10px] text-zinc-400 block">CO₂e per year</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...efficiencySaved}
          cardTitle="Efficiency Upgrade"
          formatSummary={(r) => `Saves ${r.currencySymbol}${r.annualCostSaved}/yr (${r.annualKwhSaved} kWh), Payback: ${r.paybackMonths} mos`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Home Energy Audit Report
        </Button>
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}
