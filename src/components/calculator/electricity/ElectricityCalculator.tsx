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
  Copy,
  Check,
  FileText,
  Printer,
  RotateCcw,
  AlertCircle,
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

// ─── Local Storage Hook with Full Raw State & Restore ───────────────────────

interface SavedCalculation<TState, TResult> {
  id: string;
  timestamp: string;
  inputSummary: string;
  rawState: TState;
  result: TResult;
  notes: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<TState, TResult>(storageKey: string) {
  const [saved, setSaved] = useState<SavedCalculation<TState, TResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, rawState: TState, result: TResult, notes = "") => {
      const entry: SavedCalculation<TState, TResult> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        rawState,
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:border-slate-300 print:break-inside-avoid">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between print:bg-slate-100 print:text-slate-900">
        <h3 className="font-bold text-xs tracking-wide text-white print:text-slate-900">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5 print:hidden">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                title="View saved calculations"
                aria-label={`View ${savedCount} saved calculations`}
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
              aria-label="Save this calculation"
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

function SavedDrawer<TState, TResult>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedCalculation<TState, TResult>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: TResult) => string;
  onRestore: (rawState: TState) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Result Summary"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `electricity_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_saved.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs print:hidden">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} History ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            aria-label="Export saved items to CSV"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
            aria-label="Clear saved history"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-36 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums gap-2"
          >
            <div className="truncate flex-1">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {formatSummary(item.result)}
              </span>
              <span className="text-zinc-400 ml-1.5">({item.inputSummary})</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRestore(item.rawState)}
                className="h-5 px-1.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 cursor-pointer"
                title="Restore these inputs into the calculator"
                aria-label="Restore calculation inputs"
              >
                <RotateCcw className="w-2.5 h-2.5 mr-0.5" /> Restore
              </Button>
              <button
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                title="Delete item"
                aria-label="Delete saved entry"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
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
  totalMonthlyKwh,
}: {
  allocations: { name: string; monthlyKwh: number; monthlyCost: number; pctOfTotal: number }[];
  currencySymbol: string;
  totalMonthlyBill: number;
  totalMonthlyKwh: number;
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

  const hasConsumption = totalMonthlyKwh > 0;

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

      {hasConsumption ? (
        <>
          {/* Multi-segment Horizontal Progress Bar */}
          <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden flex shadow-inner">
            {allocations.filter((a) => a.pctOfTotal > 0).map((item, idx) => (
              <div
                key={idx}
                style={{ width: `${item.pctOfTotal}%` }}
                className={`${colors[idx % colors.length]} h-full transition-all`}
                title={`${item.name}: ${item.pctOfTotal}% (${item.monthlyKwh} kWh/mo)`}
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
        </>
      ) : (
        <div className="py-2.5 text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium italic">
          No active electricity consumption to allocate. Enter appliance wattages and runtimes above.
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function ElectricityCalculator() {
  // Global Currency State
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const currencyConfig = CURRENCY_CONFIGS[currency];

  // Feedback State
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

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
  const [singleError, setSingleError] = useState<string | null>(null);

  type SingleApplianceState = {
    presetId: string;
    powerValue: string;
    powerUnit: PowerUnit;
    dutyCyclePct: string;
    hoursPerDay: string;
    daysPerWeek: string;
    monthsPerYear: string;
    ratePerKwh: string;
    currency: CurrencyCode;
  };
  const singleSaved = useCardSaved<SingleApplianceState, SingleApplianceResult>("saved_electricity_single");

  // ─── CARD 2: TIERED & TIME-OF-USE (TOU) ───
  const [peakKwh, setPeakKwh] = useState("8");
  const [offPeakKwh, setOffPeakKwh] = useState("16");
  const [peakRate, setPeakRate] = useState("0.28");
  const [offPeakRate, setOffPeakRate] = useState("0.12");
  const [fixedMonthlyFee, setFixedMonthlyFee] = useState("15.00");
  const [touResult, setTouResult] = useState<TimeOfUseResult | null>(null);
  const [touSaveSuccess, setTouSaveSuccess] = useState(false);
  const [touError, setTouError] = useState<string | null>(null);

  type TouState = {
    peakKwh: string;
    offPeakKwh: string;
    peakRate: string;
    offPeakRate: string;
    fixedMonthlyFee: string;
    currency: CurrencyCode;
  };
  const touSaved = useCardSaved<TouState, TimeOfUseResult>("saved_electricity_tou");

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
  const [houseError, setHouseError] = useState<string | null>(null);

  type HouseState = {
    appliances: HouseApplianceRow[];
    ratePerKwh: string;
    currency: CurrencyCode;
  };
  const houseSaved = useCardSaved<HouseState, HouseAggregatorResult>("saved_electricity_house");

  // ─── CARD 4: ENERGY EFFICIENCY & LED SAVINGS CONVERTER ───
  const [oldWatts, setOldWatts] = useState("60"); // 60W Incandescent
  const [newWatts, setNewWatts] = useState("9"); // 9W LED
  const [upgradeQty, setUpgradeQty] = useState("10");
  const [upgradeDailyHours, setUpgradeDailyHours] = useState("6");
  const [upgradeUnitCost, setUpgradeUnitCost] = useState("4.00");
  const [efficiencyResult, setEfficiencyResult] = useState<EnergyEfficiencyResult | null>(null);
  const [efficiencySaveSuccess, setEfficiencySaveSuccess] = useState(false);
  const [effError, setEffError] = useState<string | null>(null);

  type EffState = {
    oldWatts: string;
    newWatts: string;
    upgradeQty: string;
    upgradeDailyHours: string;
    upgradeUnitCost: string;
    ratePerKwh: string;
    currency: CurrencyCode;
  };
  const efficiencySaved = useCardSaved<EffState, EnergyEfficiencyResult>("saved_electricity_efficiency");

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

  // Helper validation parser
  const validateNumber = (str: string, name: string, min = 0, max = Infinity): { val: number; err: string | null } => {
    if (str.trim() === "") return { val: 0, err: null };
    const num = Number(str);
    if (isNaN(num)) return { val: 0, err: `${name} must be a valid number.` };
    if (num < min) return { val: min, err: `${name} cannot be less than ${min}.` };
    if (num > max) return { val: max, err: `${name} cannot exceed ${max}.` };
    return { val: num, err: null };
  };

  // Calculations
  const handleSingleCalc = useCallback(() => {
    const pVal = validateNumber(powerValue, "Power Rating", 0);
    const dVal = validateNumber(dutyCyclePct, "Duty Cycle", 0, 100);
    const hVal = validateNumber(hoursPerDay, "Operating Hours", 0, 24);
    const dayVal = validateNumber(daysPerWeek, "Frequency", 0, 7);
    const rVal = validateNumber(ratePerKwh, "Tariff Rate", 0);

    const firstErr = pVal.err || dVal.err || hVal.err || dayVal.err || rVal.err;
    setSingleError(firstErr);

    const res = calculateSingleAppliance({
      powerValue: pVal.val,
      powerUnit,
      dutyCyclePct: dVal.val,
      hoursPerDay: hVal.val,
      daysPerWeek: dayVal.val,
      monthsPerYear: Number(monthsPerYear) || 12,
      currency,
      ratePerKwh: rVal.val,
    });
    setSingleResult(res);
  }, [powerValue, powerUnit, dutyCyclePct, hoursPerDay, daysPerWeek, monthsPerYear, currency, ratePerKwh]);

  const handleTouCalc = useCallback(() => {
    const pkVal = validateNumber(peakKwh, "Peak Usage", 0);
    const opVal = validateNumber(offPeakKwh, "Off-Peak Usage", 0);
    const prVal = validateNumber(peakRate, "Peak Rate", 0);
    const orVal = validateNumber(offPeakRate, "Off-Peak Rate", 0);
    const ffVal = validateNumber(fixedMonthlyFee, "Fixed Grid Fee", 0);

    const firstErr = pkVal.err || opVal.err || prVal.err || orVal.err || ffVal.err;
    setTouError(firstErr);

    const res = calculateTimeOfUse({
      peakKwhPerDay: pkVal.val,
      offPeakKwhPerDay: opVal.val,
      peakRate: prVal.val,
      offPeakRate: orVal.val,
      fixedMonthlyGridFee: ffVal.val,
      currency,
    });
    setTouResult(res);
  }, [peakKwh, offPeakKwh, peakRate, offPeakRate, fixedMonthlyFee, currency]);

  const handleHouseCalc = useCallback(() => {
    let err: string | null = null;
    for (const app of houseAppliances) {
      if (app.powerWatts < 0) err = "Appliance wattage cannot be negative.";
      if (app.dailyHours < 0 || app.dailyHours > 24) err = "Daily runtime must be between 0 and 24 hours.";
      if (app.quantity < 0) err = "Quantity cannot be negative.";
    }
    setHouseError(err);

    const rVal = validateNumber(ratePerKwh, "Tariff Rate", 0);
    const res = calculateHouseAggregator({
      appliances: houseAppliances,
      ratePerKwh: rVal.val,
      currency,
    });
    setHouseResult(res);
  }, [houseAppliances, ratePerKwh, currency]);

  const handleEfficiencyCalc = useCallback(() => {
    const owVal = validateNumber(oldWatts, "Existing Power", 0);
    const nwVal = validateNumber(newWatts, "New Power", 0);
    const qVal = validateNumber(upgradeQty, "Quantity", 0);
    const dhVal = validateNumber(upgradeDailyHours, "Daily Hours", 0, 24);
    const rVal = validateNumber(ratePerKwh, "Tariff Rate", 0);
    const ucVal = validateNumber(upgradeUnitCost, "Unit Cost", 0);

    const firstErr = owVal.err || nwVal.err || qVal.err || dhVal.err || rVal.err || ucVal.err;
    setEffError(firstErr);

    const res = calculateEnergyEfficiency({
      oldWatts: owVal.val,
      newWatts: nwVal.val,
      quantity: qVal.val,
      dailyHours: dhVal.val,
      ratePerKwh: rVal.val,
      replacementCostPerUnit: ucVal.val,
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

  // Restore Handlers
  const handleRestoreSingle = (state: SingleApplianceState) => {
    setSelectedPresetId(state.presetId);
    setPowerValue(state.powerValue);
    setPowerUnit(state.powerUnit);
    setDutyCyclePct(state.dutyCyclePct);
    setHoursPerDay(state.hoursPerDay);
    setDaysPerWeek(state.daysPerWeek);
    setMonthsPerYear(state.monthsPerYear);
    setRatePerKwh(state.ratePerKwh);
    setCurrency(state.currency);
    flashSave(setSingleSaveSuccess);
  };

  const handleRestoreTou = (state: TouState) => {
    setPeakKwh(state.peakKwh);
    setOffPeakKwh(state.offPeakKwh);
    setPeakRate(state.peakRate);
    setOffPeakRate(state.offPeakRate);
    setFixedMonthlyFee(state.fixedMonthlyFee);
    setCurrency(state.currency);
    flashSave(setTouSaveSuccess);
  };

  const handleRestoreHouse = (state: HouseState) => {
    setHouseAppliances(state.appliances);
    setRatePerKwh(state.ratePerKwh);
    setCurrency(state.currency);
    flashSave(setHouseSaveSuccess);
  };

  const handleRestoreEfficiency = (state: EffState) => {
    setOldWatts(state.oldWatts);
    setNewWatts(state.newWatts);
    setUpgradeQty(state.upgradeQty);
    setUpgradeDailyHours(state.upgradeDailyHours);
    setUpgradeUnitCost(state.upgradeUnitCost);
    setRatePerKwh(state.ratePerKwh);
    setCurrency(state.currency);
    flashSave(setEfficiencySaveSuccess);
  };

  // ─── ACTION TOOLBAR HANDLERS ──────────────────────────────────────────────

  const copyToClipboard = (text: string, actionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(actionName);
    setTimeout(() => setCopiedAction(null), 1500);
  };

  const handleCopyResult = () => {
    const sym = currencyConfig.symbol;
    const parts: string[] = [];
    if (singleResult) parts.push(`Single Appliance: ${sym}${singleResult.monthlyCost.toFixed(2)}/mo (${singleResult.monthlyKwh} kWh)`);
    if (touResult) parts.push(`TOU Bill: ${sym}${touResult.totalMonthlyBill.toFixed(2)}/mo (Effective: ${sym}${touResult.effectiveRatePerKwh.toFixed(3)}/kWh)`);
    if (houseResult) parts.push(`Household Bill: ${sym}${houseResult.totalMonthlyBill.toFixed(2)}/mo (Top: ${houseResult.topDrainingAppliance})`);
    if (efficiencyResult) parts.push(`Efficiency ROI: Saves ${sym}${efficiencyResult.annualCostSaved.toFixed(2)}/yr (Payback: ${efficiencyResult.paybackMonths} mos)`);
    copyToClipboard(parts.join("\n"), "Result");
  };

  const handleCopySummary = () => {
    const sym = currencyConfig.symbol;
    const summary = [
      `=== Electricity & Power Consumption Takeoff ===`,
      `Date: ${new Date().toLocaleString()}`,
      `Currency: ${currencyConfig.name} (${sym})`,
      `Electricity Tariff: ${sym}${ratePerKwh}/kWh`,
      ``,
      singleResult
        ? `[Single Appliance Estimator]\n- Power: ${powerValue} ${powerUnit} (${dutyCyclePct}% duty cycle)\n- Usage: ${hoursPerDay} hrs/day, ${daysPerWeek} days/wk\n- Energy: ${singleResult.dailyKwh} kWh/day | ${singleResult.monthlyKwh} kWh/mo | ${singleResult.annualKwh} kWh/yr\n- Cost: ${sym}${singleResult.monthlyCost.toFixed(2)}/mo | ${sym}${singleResult.annualCost.toFixed(2)}/yr\n- Carbon: ${singleResult.carbonKgPerYear} kg CO2e/year`
        : "",
      touResult
        ? `[Time-of-Use (TOU) Tariff]\n- Peak: ${peakKwh} kWh/day @ ${sym}${peakRate}/kWh (${sym}${touResult.peakMonthlyCost.toFixed(2)}/mo)\n- Off-Peak: ${offPeakKwh} kWh/day @ ${sym}${offPeakRate}/kWh (${sym}${touResult.offPeakMonthlyCost.toFixed(2)}/mo)\n- Fixed Grid Fee: ${sym}${fixedMonthlyFee}/mo\n- Monthly Bill: ${sym}${touResult.totalMonthlyBill.toFixed(2)}/mo (${touResult.totalMonthlyKwh} kWh)\n- Effective Rate: ${sym}${touResult.effectiveRatePerKwh.toFixed(3)}/kWh`
        : "",
      houseResult
        ? `[Whole-House Load Aggregator]\n- Inventory Count: ${houseAppliances.length} appliances\n- Monthly Consumption: ${houseResult.totalMonthlyKwh} kWh/mo\n- Monthly Bill: ${sym}${houseResult.totalMonthlyBill.toFixed(2)}/mo\n- Annual Bill: ${sym}${houseResult.totalAnnualBill.toLocaleString(undefined, { minimumFractionDigits: 2 })}/yr\n- Top Power Hog: ${houseResult.topDrainingAppliance}\n- Household Carbon: ${houseResult.totalAnnualCarbonKg} kg CO2e/yr`
        : "",
      efficiencyResult
        ? `[Energy Efficiency & LED Upgrade ROI]\n- Retrofit: ${oldWatts}W → ${newWatts}W across ${upgradeQty} units (${upgradeDailyHours} hrs/day)\n- Power Saved: ${efficiencyResult.powerSavedWatts} W (${efficiencyResult.annualKwhSaved} kWh/yr)\n- Annual Savings: ${sym}${efficiencyResult.annualCostSaved.toFixed(2)}/year\n- Initial Investment: ${sym}${efficiencyResult.totalInvestmentCost.toFixed(2)}\n- Payback Period: ${efficiencyResult.paybackMonths} Months (ROI: ${efficiencyResult.annualRoiPct}%)\n- 5-Year Cumulative Savings: ${sym}${efficiencyResult.fiveYearSavings.toLocaleString()}\n- 5-Year Net Profit: ${sym}${efficiencyResult.fiveYearNetProfit.toLocaleString()}\n- Carbon Avoided: ${efficiencyResult.annualCarbonAvoidedKg} kg CO2e/yr`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    copyToClipboard(summary, "Summary");
  };

  const handleCopyLatex = () => {
    const latex = [
      `% Electricity Consumption & Utility Cost Formulas`,
      `% 1. Fundamental Energy Consumption`,
      `E_{\\text{daily}} = \\frac{P \\times \\text{duty} \\times t}{1000} \\quad [\\text{kWh/day}]`,
      `E_{\\text{monthly}} = E_{\\text{daily}} \\times 30.4375 \\quad [\\text{kWh/month}]`,
      `\\text{Cost}_{\\text{monthly}} = E_{\\text{monthly}} \\times R_{\\text{tariff}}`,
      ``,
      `% 2. Time-of-Use (TOU) Energy Billing`,
      `\\text{Bill}_{\\text{TOU}} = (E_{\\text{peak}} \\times R_{\\text{peak}}) + (E_{\\text{offpeak}} \\times R_{\\text{offpeak}}) + \\text{Fee}_{\\text{grid}}`,
      `R_{\\text{blended}} = \\frac{\\text{Bill}_{\\text{TOU}} - \\text{Fee}_{\\text{grid}}}{E_{\\text{total}}}`,
      ``,
      `% 3. Energy Efficiency ROI & Payback`,
      `\\Delta P = (P_{\\text{old}} - P_{\\text{new}}) \\times N \\quad [\\text{Watts}]`,
      `\\text{Savings}_{\\text{annual}} = \\frac{\\Delta P \\times t \\times 365.25}{1000} \\times R_{\\text{tariff}}`,
      `\\text{Payback} = \\frac{N \\times \\text{Cost}_{\\text{unit}}}{\\text{Savings}_{\\text{annual}} / 12} \\quad [\\text{Months}]`,
    ].join("\n");

    copyToClipboard(latex, "LaTeX");
  };

  const handleExportCsv = () => {
    const sym = currencyConfig.symbol;
    const rows = [
      ["Module", "Field / Parameter", "Value", "Unit"],
      ["Single Appliance", "Preset", selectedPresetId, ""],
      ["Single Appliance", "Power Rating", powerValue, powerUnit],
      ["Single Appliance", "Operating Duty Cycle", dutyCyclePct, "%"],
      ["Single Appliance", "Operating Hours", hoursPerDay, "hrs/day"],
      ["Single Appliance", "Frequency", daysPerWeek, "days/wk"],
      ["Single Appliance", "Effective Power", singleResult ? singleResult.effectiveWatts : "", "W"],
      ["Single Appliance", "Daily Energy", singleResult ? singleResult.dailyKwh : "", "kWh/day"],
      ["Single Appliance", "Monthly Energy", singleResult ? singleResult.monthlyKwh : "", "kWh/mo"],
      ["Single Appliance", "Annual Energy", singleResult ? singleResult.annualKwh : "", "kWh/yr"],
      ["Single Appliance", "Monthly Cost", singleResult ? `${sym}${singleResult.monthlyCost.toFixed(2)}` : "", "/mo"],
      ["Single Appliance", "Annual Cost", singleResult ? `${sym}${singleResult.annualCost.toFixed(2)}` : "", "/yr"],
      ["Single Appliance", "Carbon Footprint", singleResult ? singleResult.carbonKgPerYear : "", "kg CO2e/yr"],
      [],
      ["TOU Tariff", "Peak Usage", peakKwh, "kWh/day"],
      ["TOU Tariff", "Peak Rate", `${sym}${peakRate}`, "/kWh"],
      ["TOU Tariff", "Off-Peak Usage", offPeakKwh, "kWh/day"],
      ["TOU Tariff", "Off-Peak Rate", `${sym}${offPeakRate}`, "/kWh"],
      ["TOU Tariff", "Fixed Grid Fee", `${sym}${fixedMonthlyFee}`, "/mo"],
      ["TOU Tariff", "Monthly Bill", touResult ? `${sym}${touResult.totalMonthlyBill.toFixed(2)}` : "", "/mo"],
      ["TOU Tariff", "Effective Rate", touResult ? `${sym}${touResult.effectiveRatePerKwh.toFixed(3)}` : "", "/kWh"],
      ["TOU Tariff", "Annual Projected Bill", touResult ? `${sym}${touResult.totalAnnualBill.toFixed(2)}` : "", "/yr"],
      [],
      ["Whole House", "Total Monthly Energy", houseResult ? houseResult.totalMonthlyKwh : "", "kWh/mo"],
      ["Whole House", "Total Monthly Bill", houseResult ? `${sym}${houseResult.totalMonthlyBill.toFixed(2)}` : "", "/mo"],
      ["Whole House", "Top Power Hog", houseResult ? houseResult.topDrainingAppliance : "", ""],
      ...houseAppliances.map((app) => ["Whole House Row", app.name, `${app.quantity}x, ${app.powerWatts}W, ${app.dailyHours}h`, app.category]),
      [],
      ["Efficiency ROI", "Old Power", oldWatts, "W"],
      ["Efficiency ROI", "New Power", newWatts, "W"],
      ["Efficiency ROI", "Quantity", upgradeQty, "units"],
      ["Efficiency ROI", "Daily Hours", upgradeDailyHours, "hrs/day"],
      ["Efficiency ROI", "Annual Energy Saved", efficiencyResult ? efficiencyResult.annualKwhSaved : "", "kWh/yr"],
      ["Efficiency ROI", "Annual Money Saved", efficiencyResult ? `${sym}${efficiencyResult.annualCostSaved.toFixed(2)}` : "", "/yr"],
      ["Efficiency ROI", "Payback Period", efficiencyResult ? efficiencyResult.paybackMonths : "", "Months"],
      ["Efficiency ROI", "Annual ROI", efficiencyResult ? `${efficiencyResult.annualRoiPct}%` : "", ""],
      ["Efficiency ROI", "5-Year Cumulative Savings", efficiencyResult ? `${sym}${efficiencyResult.fiveYearSavings}` : "", ""],
      ["Efficiency ROI", "5-Year Net Profit", efficiencyResult ? `${sym}${efficiencyResult.fiveYearNetProfit}` : "", ""],
      ["Efficiency ROI", "Carbon Avoided", efficiencyResult ? efficiencyResult.annualCarbonAvoidedKg : "", "kg CO2e/yr"],
    ];

    const csv = rows.map((r) => r.map((c) => `"${c ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `electricity_calculator_takeoff_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportTxt = () => {
    const sym = currencyConfig.symbol;
    const txt = [
      `================================================================`,
      `ELECTRICITY & POWER CONSUMPTION AUDIT REPORT`,
      `Generated: ${new Date().toLocaleString()}`,
      `Platform: CalcPlatform (calcplatform.com/calculators/electricity-calculator)`,
      `================================================================`,
      ``,
      `REGIONAL PARAMETERS:`,
      `  Region / Currency: ${currencyConfig.name}`,
      `  Standard Tariff: ${sym}${ratePerKwh}/kWh`,
      `  Carbon Intensity: ${currencyConfig.carbonIntensityKgPerKwh} kg CO2e/kWh (estimated regional average)`,
      ``,
      `1. SINGLE APPLIANCE ESTIMATOR:`,
      `  Preset: ${selectedPresetId}`,
      `  Power: ${powerValue} ${powerUnit}`,
      `  Duty Cycle: ${dutyCyclePct}%`,
      `  Runtime: ${hoursPerDay} hrs/day, ${daysPerWeek} days/wk`,
      `  Effective Power: ${singleResult ? singleResult.effectiveWatts : 0} Watts`,
      `  Daily Energy: ${singleResult ? singleResult.dailyKwh : 0} kWh/day`,
      `  Monthly Energy: ${singleResult ? singleResult.monthlyKwh : 0} kWh/month`,
      `  Annual Energy: ${singleResult ? singleResult.annualKwh : 0} kWh/year`,
      `  Monthly Cost: ${sym}${singleResult ? singleResult.monthlyCost.toFixed(2) : 0.00}`,
      `  Annual Cost: ${sym}${singleResult ? singleResult.annualCost.toFixed(2) : 0.00}`,
      `  Carbon Footprint: ${singleResult ? singleResult.carbonKgPerYear : 0} kg CO2e/year`,
      ``,
      `2. TIME-OF-USE (TOU) TARIFF CALCULATION:`,
      `  Peak Usage: ${peakKwh} kWh/day @ ${sym}${peakRate}/kWh -> ${sym}${touResult ? touResult.peakMonthlyCost.toFixed(2) : 0.00}/mo`,
      `  Off-Peak Usage: ${offPeakKwh} kWh/day @ ${sym}${offPeakRate}/kWh -> ${sym}${touResult ? touResult.offPeakMonthlyCost.toFixed(2) : 0.00}/mo`,
      `  Fixed Grid Fee: ${sym}${fixedMonthlyFee}/mo`,
      `  Total Monthly Bill: ${sym}${touResult ? touResult.totalMonthlyBill.toFixed(2) : 0.00}`,
      `  Effective Blended Rate: ${sym}${touResult ? touResult.effectiveRatePerKwh.toFixed(3) : 0.000}/kWh`,
      `  Annual Projected Bill: ${sym}${touResult ? touResult.totalAnnualBill.toFixed(2) : 0.00}`,
      ``,
      `3. WHOLE-HOUSE APPLIANCE INVENTORY (${houseAppliances.length} Devices):`,
      ...houseAppliances.map((a, i) => `  ${i + 1}. ${a.name} (Qty ${a.quantity}) - ${a.powerWatts}W, ${a.dailyHours}h/day [${a.category}]`),
      `  Total Monthly Load: ${houseResult ? houseResult.totalMonthlyKwh : 0} kWh/month`,
      `  Monthly Electric Bill: ${sym}${houseResult ? houseResult.totalMonthlyBill.toFixed(2) : 0.00}`,
      `  Annual Electric Bill: ${sym}${houseResult ? houseResult.totalAnnualBill.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
      `  Top Power Hog: ${houseResult ? houseResult.topDrainingAppliance : "None"}`,
      `  Household Carbon: ${houseResult ? houseResult.totalAnnualCarbonKg : 0} kg CO2e/year`,
      ``,
      `4. ENERGY EFFICIENCY & LED RETROFIT ROI:`,
      `  Upgrade: ${oldWatts}W -> ${newWatts}W (${upgradeQty} units, ${upgradeDailyHours} hrs/day)`,
      `  Power Saved: ${efficiencyResult ? efficiencyResult.powerSavedWatts : 0} Watts`,
      `  Annual kWh Saved: ${efficiencyResult ? efficiencyResult.annualKwhSaved : 0} kWh/year`,
      `  Annual Money Saved: ${sym}${efficiencyResult ? efficiencyResult.annualCostSaved.toFixed(2) : 0.00}/year`,
      `  Total Upgrade Cost: ${sym}${efficiencyResult ? efficiencyResult.totalInvestmentCost.toFixed(2) : 0.00}`,
      `  Payback Period: ${efficiencyResult ? efficiencyResult.paybackMonths : 0} Months`,
      `  Annual ROI: ${efficiencyResult ? efficiencyResult.annualRoiPct : 0}%`,
      `  5-Year Cumulative Savings: ${sym}${efficiencyResult ? efficiencyResult.fiveYearSavings.toLocaleString() : 0}`,
      `  5-Year Net Profit: ${sym}${efficiencyResult ? efficiencyResult.fiveYearNetProfit.toLocaleString() : 0} (after initial investment)`,
      `  Carbon Avoided: ${efficiencyResult ? efficiencyResult.annualCarbonAvoidedKg : 0} kg CO2e/year`,
      `================================================================`,
    ].join("\n");

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `electricity_audit_summary_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
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
          { label: "5-Year Cumulative Savings", value: `${sym}${efficiencyResult.fiveYearSavings.toLocaleString()}` },
          { label: "5-Year Net Profit", value: `${sym}${efficiencyResult.fiveYearNetProfit.toLocaleString()}` },
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
      {/* ═══════════════════ GLOBAL ACTION TOOLBAR ═══════════════════ */}
      <div className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl flex flex-wrap items-center justify-between gap-1.5 shadow-xs print:hidden">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 px-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Electricity Takeoff Suite</span>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyResult}
            className="h-7 text-xs gap-1 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50"
            title="Copy current active calculated results"
            aria-label="Copy current calculation result"
          >
            {copiedAction === "Result" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-slate-400" />}
            <span>{copiedAction === "Result" ? "Copied" : "Copy Result"}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="h-7 text-xs gap-1 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50"
            title="Copy full inputs and calculation summary"
            aria-label="Copy calculation summary"
          >
            {copiedAction === "Summary" ? <Check className="h-3 w-3 text-emerald-500" /> : <FileText className="h-3 w-3 text-slate-400" />}
            <span>{copiedAction === "Summary" ? "Copied" : "Copy Summary"}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyLatex}
            className="h-7 text-xs gap-1 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 font-mono text-[11px]"
            title="Copy LaTeX formulas"
            aria-label="Copy LaTeX mathematical equations"
          >
            {copiedAction === "LaTeX" ? <Check className="h-3 w-3 text-emerald-500" /> : <span className="font-bold text-[10px]">fx</span>}
            <span>{copiedAction === "LaTeX" ? "Copied" : "LaTeX"}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-7 text-xs gap-1 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50"
            title="Download full calculation CSV takeoff"
            aria-label="Export CSV spreadsheet"
          >
            <Download className="h-3 w-3 text-blue-500" /> CSV
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportTxt}
            className="h-7 text-xs gap-1 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50"
            title="Download formatted text audit"
            aria-label="Download plain text file"
          >
            <FileText className="h-3 w-3 text-emerald-500" /> TXT
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="h-7 text-xs gap-1 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50"
            title="Print or Save PDF report"
            aria-label="Print or save as PDF"
          >
            <Printer className="h-3 w-3 text-indigo-500" /> Print
          </Button>
        </div>
      </div>

      {/* ═══════════════════ GLOBAL CURRENCY & TARIFF CONTROLS ═══════════════════ */}
      <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <label htmlFor="electricity-currency-select" className="font-bold text-blue-950 dark:text-blue-100">
              Regional Currency &amp; Tariff:
            </label>
            <select
              id="electricity-currency-select"
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value as CurrencyCode)}
              className="h-7 text-xs font-semibold rounded border border-blue-300 dark:border-blue-800 bg-white dark:bg-zinc-800 px-2 text-blue-900 dark:text-blue-100 cursor-pointer shadow-xs"
              aria-label="Select regional currency and default tariff"
            >
              {Object.values(CURRENCY_CONFIGS).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="electricity-tariff-input" className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
              Electric Tariff ({currencyConfig.symbol}/{currencyConfig.billingUnitName}):
            </label>
            <Input
              id="electricity-tariff-input"
              type="number"
              value={ratePerKwh}
              onChange={(e) => setRatePerKwh(e.target.value)}
              step={0.01}
              min={0}
              className="w-20 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-blue-950 dark:text-blue-100 font-bold"
              aria-label="Electric tariff rate per kilowatt-hour"
            />
          </div>
        </div>

        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 pt-0.5">
          * Carbon emission factors (e.g. {currencyConfig.carbonIntensityKgPerKwh} kg CO₂e/kWh for {currencyConfig.name}) are estimated national grid averages. Local emissions vary by state and regional utility mix.
        </p>
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
            `${powerValue}${powerUnit}, ${hoursPerDay}h/day @ ${currencyConfig.symbol}${ratePerKwh}`,
            {
              presetId: selectedPresetId,
              powerValue,
              powerUnit,
              dutyCyclePct,
              hoursPerDay,
              daysPerWeek,
              monthsPerYear,
              ratePerKwh,
              currency,
            },
            singleResult
          );
          flashSave(setSingleSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Preset Appliance Selection */}
          <div className="space-y-1">
            <label htmlFor="electricity-preset-picker" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
              Quick Preset Appliance Picker
            </label>
            <select
              id="electricity-preset-picker"
              value={selectedPresetId}
              onChange={(e) => handlePresetSelect(e.target.value)}
              className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              aria-label="Choose appliance preset profile"
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
              <label htmlFor="electricity-power-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Power Rating</label>
              <div className="flex gap-1">
                <Input
                  id="electricity-power-input"
                  type="number"
                  value={powerValue}
                  onChange={(e) => setPowerValue(e.target.value)}
                  min={0}
                  step={10}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  aria-label="Appliance power rating"
                />
                <select
                  id="electricity-power-unit-select"
                  value={powerUnit}
                  onChange={(e) => setPowerUnit(e.target.value as PowerUnit)}
                  className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans cursor-pointer"
                  aria-label="Appliance power rating unit"
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
              <label htmlFor="electricity-duty-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium" title="Compressor or active heating cycle %">
                Operating Duty Cycle (%)
              </label>
              <div className="flex items-center gap-1">
                <Input
                  id="electricity-duty-input"
                  type="number"
                  value={dutyCyclePct}
                  onChange={(e) => setDutyCyclePct(e.target.value)}
                  min={0}
                  max={100}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  aria-label="Operating duty cycle percentage"
                />
                <span className="text-xs text-zinc-500 font-semibold">%</span>
              </div>
            </div>

            {/* Daily Hours */}
            <div className="space-y-1">
              <label htmlFor="electricity-hours-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Operating Hours / Day</label>
              <div className="flex items-center gap-1">
                <Input
                  id="electricity-hours-input"
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  min={0}
                  max={24}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  aria-label="Operating hours per day"
                />
                <span className="text-xs text-zinc-500 font-semibold">hrs</span>
              </div>
            </div>

            {/* Days per Week */}
            <div className="space-y-1">
              <label htmlFor="electricity-frequency-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Frequency (Days/Wk)</label>
              <div className="flex items-center gap-1">
                <Input
                  id="electricity-frequency-input"
                  type="number"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  min={0}
                  max={7}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  aria-label="Frequency days per week"
                />
                <span className="text-xs text-zinc-500 font-semibold">days</span>
              </div>
            </div>
          </div>

          {singleError && (
            <div role="alert" className="p-2 text-xs bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 rounded border border-red-200 dark:border-red-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
              <span>{singleError}</span>
            </div>
          )}

          <div className="flex gap-2 pt-1 print:hidden">
            <Button
              onClick={handleSingleCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
              aria-label="Calculate single appliance consumption"
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
                setDaysPerWeek("7");
              }}
              className="text-xs font-semibold h-7 px-3 cursor-pointer"
              aria-label="Reset single appliance inputs to default"
            >
              Clear
            </Button>
          </div>

          {/* Results Grid */}
          {singleResult && (
            <div aria-live="polite" className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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
          formatSummary={(r) => `${r.currencySymbol}${r.monthlyCost.toFixed(2)}/mo (${r.monthlyKwh} kWh/mo)`}
          onRestore={handleRestoreSingle}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: TIERED TARIFF & TIME-OF-USE (TOU) ═══════════════════ */}
      <CardWrapper
        title="Tiered Tariff &amp; Time-of-Use (TOU) Energy Calculator"
        hasResult={!!touResult}
        isSaved={touSaveSuccess}
        savedCount={touSaved.saved.length}
        onToggleSaved={() => touSaved.setIsOpen(!touSaved.isOpen)}
        onSave={() => {
          if (!touResult) return;
          touSaved.save(
            `Peak: ${peakKwh}kWh@${currencyConfig.symbol}${peakRate}, Off-Peak: ${offPeakKwh}kWh@${currencyConfig.symbol}${offPeakRate}`,
            {
              peakKwh,
              offPeakKwh,
              peakRate,
              offPeakRate,
              fixedMonthlyFee,
              currency,
            },
            touResult
          );
          flashSave(setTouSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label htmlFor="tou-peak-usage-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Peak Usage (kWh/day)</label>
              <Input
                id="tou-peak-usage-input"
                type="number"
                value={peakKwh}
                onChange={(e) => setPeakKwh(e.target.value)}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                aria-label="Peak electricity usage in kWh per day"
              />
            </div>
            <div>
              <label htmlFor="tou-peak-rate-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Peak Rate ({currencyConfig.symbol}/kWh)</label>
              <Input
                id="tou-peak-rate-input"
                type="number"
                value={peakRate}
                onChange={(e) => setPeakRate(e.target.value)}
                step={0.01}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-rose-600 font-semibold"
                aria-label="Peak electricity tariff rate per kWh"
              />
            </div>
            <div>
              <label htmlFor="tou-offpeak-usage-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Off-Peak (kWh/day)</label>
              <Input
                id="tou-offpeak-usage-input"
                type="number"
                value={offPeakKwh}
                onChange={(e) => setOffPeakKwh(e.target.value)}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                aria-label="Off-peak electricity usage in kWh per day"
              />
            </div>
            <div>
              <label htmlFor="tou-offpeak-rate-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Off-Peak Rate ({currencyConfig.symbol}/kWh)</label>
              <Input
                id="tou-offpeak-rate-input"
                type="number"
                value={offPeakRate}
                onChange={(e) => setOffPeakRate(e.target.value)}
                step={0.01}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-emerald-600 font-semibold"
                aria-label="Off-peak electricity tariff rate per kWh"
              />
            </div>
            <div>
              <label htmlFor="tou-fixed-fee-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Fixed Meter Fee ({currencyConfig.symbol}/mo)</label>
              <Input
                id="tou-fixed-fee-input"
                type="number"
                value={fixedMonthlyFee}
                onChange={(e) => setFixedMonthlyFee(e.target.value)}
                step={1}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                aria-label="Fixed monthly utility grid meter fee"
              />
            </div>
          </div>

          {touError && (
            <div role="alert" className="p-2 text-xs bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 rounded border border-red-200 dark:border-red-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
              <span>{touError}</span>
            </div>
          )}

          <div className="flex gap-2 print:hidden">
            <Button
              onClick={handleTouCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
              aria-label="Calculate TOU electric bill"
            >
              Calculate TOU Bill
            </Button>
          </div>

          {touResult && (
            <div aria-live="polite" className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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
          formatSummary={(r) => `${r.currencySymbol}${r.totalMonthlyBill.toFixed(2)}/mo (Effective: ${r.currencySymbol}${r.effectiveRatePerKwh.toFixed(3)}/kWh)`}
          onRestore={handleRestoreTou}
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
            `${houseAppliances.length} Appliances: ${houseResult.currencySymbol}${houseResult.totalMonthlyBill.toFixed(2)}/mo (${houseResult.totalMonthlyKwh} kWh/mo)`,
            {
              appliances: houseAppliances,
              ratePerKwh,
              currency,
            },
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
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer print:hidden"
              aria-label="Add new household appliance row"
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
            <div className="col-span-1 text-right print:hidden">Del</div>
          </div>

          {/* Dynamic Rows */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {houseAppliances.map((app) => (
              <div
                key={app.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-4">
                  <Input
                    id={`house-name-${app.id}`}
                    type="text"
                    value={app.name}
                    onChange={(e) => updateHouseRow(app.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="Device name"
                    aria-label={`Appliance name for row ${app.id}`}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    id={`house-qty-${app.id}`}
                    type="number"
                    value={app.quantity}
                    onChange={(e) => updateHouseRow(app.id, "quantity", Math.max(0, Number(e.target.value)))}
                    min={0}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    aria-label={`Quantity for ${app.name}`}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    id={`house-power-${app.id}`}
                    type="number"
                    value={app.powerWatts}
                    onChange={(e) => updateHouseRow(app.id, "powerWatts", Math.max(0, Number(e.target.value)))}
                    min={0}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    aria-label={`Power in Watts for ${app.name}`}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    id={`house-hours-${app.id}`}
                    type="number"
                    value={app.dailyHours}
                    onChange={(e) => updateHouseRow(app.id, "dailyHours", Math.max(0, Math.min(24, Number(e.target.value))))}
                    min={0}
                    max={24}
                    step={0.5}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    aria-label={`Daily runtime in hours for ${app.name}`}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    id={`house-cat-${app.id}`}
                    type="text"
                    value={app.category}
                    onChange={(e) => updateHouseRow(app.id, "category", e.target.value)}
                    className="h-7 text-[10px] bg-white dark:bg-zinc-800"
                    placeholder="Cat"
                    aria-label={`Category for ${app.name}`}
                  />
                </div>
                <div className="col-span-1 flex justify-end print:hidden">
                  <button
                    type="button"
                    onClick={() => removeHouseRow(app.id)}
                    disabled={houseAppliances.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete appliance"
                    aria-label={`Delete appliance ${app.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {houseError && (
            <div role="alert" className="p-2 text-xs bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 rounded border border-red-200 dark:border-red-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
              <span>{houseError}</span>
            </div>
          )}

          <div className="flex gap-2 pt-1 print:hidden">
            <Button
              onClick={handleHouseCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
              aria-label="Recalculate household load"
            >
              Recalculate Household Load
            </Button>
          </div>

          {/* Interactive Power Allocation Bar Chart */}
          {houseResult && (
            <div aria-live="polite" className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <PowerAllocationVisualizer
                allocations={houseResult.allocations}
                currencySymbol={currencyConfig.symbol}
                totalMonthlyBill={houseResult.totalMonthlyBill}
                totalMonthlyKwh={houseResult.totalMonthlyKwh}
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
                  <span className="text-[10px] text-zinc-400 block">of monthly energy load</span>
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
          formatSummary={(r) => `${r.currencySymbol}${r.totalMonthlyBill.toFixed(2)}/mo (${r.totalMonthlyKwh} kWh/mo), Top: ${r.topDrainingAppliance}`}
          onRestore={handleRestoreHouse}
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
            `Upgrade ${upgradeQty}x (${oldWatts}W → ${newWatts}W): Saves ${currencyConfig.symbol}${efficiencyResult.annualCostSaved.toFixed(2)}/yr`,
            {
              oldWatts,
              newWatts,
              upgradeQty,
              upgradeDailyHours,
              upgradeUnitCost,
              ratePerKwh,
              currency,
            },
            efficiencyResult
          );
          flashSave(setEfficiencySaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label htmlFor="roi-old-power-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Existing/Old Power (W)</label>
              <Input
                id="roi-old-power-input"
                type="number"
                value={oldWatts}
                onChange={(e) => setOldWatts(e.target.value)}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="60W"
                aria-label="Existing appliance power in Watts"
              />
            </div>
            <div>
              <label htmlFor="roi-new-power-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">New Efficient Power (W)</label>
              <Input
                id="roi-new-power-input"
                type="number"
                value={newWatts}
                onChange={(e) => setNewWatts(e.target.value)}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 text-emerald-600 font-semibold"
                placeholder="9W"
                aria-label="New efficient appliance power in Watts"
              />
            </div>
            <div>
              <label htmlFor="roi-quantity-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Quantity of Units</label>
              <Input
                id="roi-quantity-input"
                type="number"
                value={upgradeQty}
                onChange={(e) => setUpgradeQty(e.target.value)}
                min={0}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                aria-label="Quantity of upgraded units"
              />
            </div>
            <div>
              <label htmlFor="roi-hours-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Daily Hours Run</label>
              <Input
                id="roi-hours-input"
                type="number"
                value={upgradeDailyHours}
                onChange={(e) => setUpgradeDailyHours(e.target.value)}
                min={0}
                max={24}
                step={0.5}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                aria-label="Daily operating runtime in hours"
              />
            </div>
            <div>
              <label htmlFor="roi-cost-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                New Unit Cost ({currencyConfig.symbol})
              </label>
              <Input
                id="roi-cost-input"
                type="number"
                value={upgradeUnitCost}
                onChange={(e) => setUpgradeUnitCost(e.target.value)}
                min={0}
                step={0.5}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                aria-label="Purchase price per upgraded unit"
              />
            </div>
          </div>

          {effError && (
            <div role="alert" className="p-2 text-xs bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 rounded border border-red-200 dark:border-red-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
              <span>{effError}</span>
            </div>
          )}

          <div className="flex gap-2 print:hidden">
            <Button
              onClick={handleEfficiencyCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
              aria-label="Calculate upgrade ROI and energy savings"
            >
              Calculate Upgrade ROI &amp; Savings
            </Button>
          </div>

          {efficiencyResult && (
            <div aria-live="polite" className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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
                  <span className="text-[10px] text-zinc-500 block font-medium">5-Year Cumulative / Net</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {efficiencyResult.currencySymbol}{efficiencyResult.fiveYearSavings.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-medium">
                    Net Profit: {efficiencyResult.currencySymbol}{efficiencyResult.fiveYearNetProfit.toLocaleString()}
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
          formatSummary={(r) => `Saves ${r.currencySymbol}${r.annualCostSaved.toFixed(2)}/yr (${r.annualKwhSaved} kWh), Payback: ${r.paybackMonths} mos`}
          onRestore={handleRestoreEfficiency}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1 print:hidden">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
          aria-label="Open comprehensive home energy audit report modal"
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

export default ElectricityCalculator;
