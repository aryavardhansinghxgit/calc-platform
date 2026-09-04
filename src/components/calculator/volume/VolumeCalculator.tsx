"use client";

import React, { useState, useMemo, useEffect } from "react";
import jsPDF from "jspdf";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  Copy,
  CheckCircle2,
  BarChart2,
  Zap,
  Box,
  Droplet,
  Maximize2,
  RotateCcw,
  Download,
  FileText,
  AlertCircle
} from "lucide-react";
import {
  computeSphereVolume,
  computeConeVolume,
  computeCylinderVolume,
  computeCubeVolume,
  computePrismVolume,
  computeCapsuleVolume,
  computeSphericalCapVolume,
  computeFrustumVolume,
  computeEllipsoidVolume,
  computePyramidVolume,
  computeTubeVolume,
  convertVolumeFromCubicMeters,
  toMeters,
  formatNumber,
  ShapeVolumeResult,
  TankVolumeResult
} from "@/app/calculators/volume-calculator/volume-logic";

export interface SavedVolumeItem {
  id: string;
  title: string;
  moduleKey: "univ" | "tank" | "sph" | "cone" | "cyl" | "conv";
  shapeOrMode: string;
  rawInputs: Record<string, string>;
  unit: LengthUnit;
  precision: number;
  inputsSummary: string;
  operation: string;
  result: string;
  resultsList?: string[];
  formula?: string;
  timestamp: string;
}

type LengthUnit = "m" | "cm" | "mm" | "ft" | "in" | "yd";

export function VolumeCalculator() {
  // Global / Card 1 Precision
  const [precision1, setPrecision1] = useState<number>(4);

  // Card 1 Raw String Inputs: Universal Shape Solver
  const [uShape, setUShape] = useState<"cylinder" | "sphere" | "cone" | "cube" | "prism">("cylinder");
  const [rawUDim1, setRawUDim1] = useState<string>("5"); // r or l or a
  const [rawUDim2, setRawUDim2] = useState<string>("10"); // h or w
  const [rawUDim3, setRawUDim3] = useState<string>("4"); // h for prism
  const [uUnit, setUUnit] = useState<LengthUnit>("m");

  // Card 2 Raw String Inputs: Rectangular Tank & Capacity
  const [rawTankL, setRawTankL] = useState<string>("10");
  const [rawTankW, setRawTankW] = useState<string>("6");
  const [rawTankH, setRawTankH] = useState<string>("4");
  const [rawTankFill, setRawTankFill] = useState<string>("3");
  const [tankUnit, setTankUnit] = useState<LengthUnit>("ft");

  // Card 3 Raw String Inputs: Sphere, Cap & Ellipsoid
  const [sphMode, setSphMode] = useState<"sphere" | "cap" | "ellipsoid">("sphere");
  const [rawSphR, setRawSphR] = useState<string>("4");
  const [rawCapBaseR, setRawCapBaseR] = useState<string>("3");
  const [rawCapBallR, setRawCapBallR] = useState<string>("5");
  const [rawCapH, setRawCapH] = useState<string>("2");
  const [rawEllA, setRawEllA] = useState<string>("3");
  const [rawEllB, setRawEllB] = useState<string>("4");
  const [rawEllC, setRawEllC] = useState<string>("5");
  const [sphUnit, setSphUnit] = useState<LengthUnit>("m");

  // Card 4 Raw String Inputs: Cone, Frustum & Pyramid
  const [coneMode, setConeMode] = useState<"cone" | "frustum" | "pyramid">("cone");
  const [rawCnR, setRawCnR] = useState<string>("5");
  const [rawCnH, setRawCnH] = useState<string>("12");
  const [rawFrustTopR, setRawFrustTopR] = useState<string>("3");
  const [rawFrustBotR, setRawFrustBotR] = useState<string>("6");
  const [rawFrustH, setRawFrustH] = useState<string>("8");
  const [rawPyrA, setRawPyrA] = useState<string>("6");
  const [rawPyrH, setRawPyrH] = useState<string>("9");
  const [coneUnit, setConeUnit] = useState<LengthUnit>("m");

  // Card 5 Raw String Inputs: Cylinder, Tube & Capsule
  const [cylMode, setCylMode] = useState<"cylinder" | "tube" | "capsule">("cylinder");
  const [rawCyR, setRawCyR] = useState<string>("4");
  const [rawCyH, setRawCyH] = useState<string>("10");
  const [rawTbD1, setRawTbD1] = useState<string>("10");
  const [rawTbD2, setRawTbD2] = useState<string>("8");
  const [rawTbL, setRawTbL] = useState<string>("20");
  const [rawCapR2, setRawCapR2] = useState<string>("3");
  const [rawCapH2, setRawCapH2] = useState<string>("8");
  const [cylUnit, setCylUnit] = useState<LengthUnit>("m");

  // Card 6 Raw String Inputs: Converter Matrix
  const [rawConvVal, setRawConvVal] = useState<string>("1");
  const [convUnit, setConvUnit] = useState<LengthUnit>("m");

  // Saved calculation states
  const [savedUnivItems, setSavedUnivItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedUniv, setJustSavedUniv] = useState<boolean>(false);

  const [savedTankItems, setSavedTankItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedTank, setJustSavedTank] = useState<boolean>(false);

  const [savedSphItems, setSavedSphItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedSph, setJustSavedSph] = useState<boolean>(false);

  const [savedConeItems, setSavedConeItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedCone, setJustSavedCone] = useState<boolean>(false);

  const [savedCylItems, setSavedCylItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedCyl, setJustSavedCyl] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  // Copy state feedback
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_vol_univ_v2"); if (s1) setSavedUnivItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_vol_tank_v2"); if (s2) setSavedTankItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_vol_sph_v2"); if (s3) setSavedSphItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_vol_cone_v2"); if (s4) setSavedConeItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_vol_cyl_v2"); if (s5) setSavedCylItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_vol_conv_v2"); if (s6) setSavedConvItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Card 1 Calculations (Universal Shape)
  const univResult: ShapeVolumeResult = useMemo(() => {
    const d1 = parseFloat(rawUDim1);
    const d2 = parseFloat(rawUDim2);
    const d3 = parseFloat(rawUDim3);

    switch (uShape) {
      case "sphere": return computeSphereVolume(d1, uUnit, precision1);
      case "cone": return computeConeVolume(d1, d2, uUnit, precision1);
      case "cube": return computeCubeVolume(d1, uUnit, precision1);
      case "prism": return computePrismVolume(d1, d2, d3, undefined, uUnit, precision1);
      default: return computeCylinderVolume(d1, d2, uUnit, precision1);
    }
  }, [uShape, rawUDim1, rawUDim2, rawUDim3, uUnit, precision1]);

  // Card 2 Calculations (Tank & Capacity)
  const tankResult: TankVolumeResult = useMemo(() => {
    const l = parseFloat(rawTankL);
    const w = parseFloat(rawTankW);
    const h = parseFloat(rawTankH);
    const fill = rawTankFill.trim() !== "" ? parseFloat(rawTankFill) : undefined;
    return computePrismVolume(l, w, h, fill, tankUnit, precision1);
  }, [rawTankL, rawTankW, rawTankH, rawTankFill, tankUnit, precision1]);

  // Card 3 Calculations (Sphere/Cap/Ellipsoid)
  const sphResult: ShapeVolumeResult = useMemo(() => {
    if (sphMode === "cap") {
      const br = parseFloat(rawCapBaseR);
      const R = parseFloat(rawCapBallR);
      const h = parseFloat(rawCapH);
      return computeSphericalCapVolume(br, R, h, sphUnit, precision1);
    }
    if (sphMode === "ellipsoid") {
      const a = parseFloat(rawEllA);
      const b = parseFloat(rawEllB);
      const c = parseFloat(rawEllC);
      return computeEllipsoidVolume(a, b, c, sphUnit, precision1);
    }
    const r = parseFloat(rawSphR);
    return computeSphereVolume(r, sphUnit, precision1);
  }, [sphMode, rawSphR, rawCapBaseR, rawCapBallR, rawCapH, rawEllA, rawEllB, rawEllC, sphUnit, precision1]);

  // Card 4 Calculations (Cone/Frustum/Pyramid)
  const coneResult: ShapeVolumeResult = useMemo(() => {
    if (coneMode === "frustum") {
      const r1 = parseFloat(rawFrustTopR);
      const r2 = parseFloat(rawFrustBotR);
      const h = parseFloat(rawFrustH);
      return computeFrustumVolume(r1, r2, h, coneUnit, precision1);
    }
    if (coneMode === "pyramid") {
      const a = parseFloat(rawPyrA);
      const h = parseFloat(rawPyrH);
      return computePyramidVolume(a, h, coneUnit, precision1);
    }
    const r = parseFloat(rawCnR);
    const h = parseFloat(rawCnH);
    return computeConeVolume(r, h, coneUnit, precision1);
  }, [coneMode, rawCnR, rawCnH, rawFrustTopR, rawFrustBotR, rawFrustH, rawPyrA, rawPyrH, coneUnit, precision1]);

  // Card 5 Calculations (Cylinder/Tube/Capsule)
  const cylResult: ShapeVolumeResult & { wallThickness?: number; formattedWallThickness?: string } = useMemo(() => {
    if (cylMode === "tube") {
      const d1 = parseFloat(rawTbD1);
      const d2 = parseFloat(rawTbD2);
      const l = parseFloat(rawTbL);
      return computeTubeVolume(d1, d2, l, cylUnit, precision1);
    }
    if (cylMode === "capsule") {
      const r = parseFloat(rawCapR2);
      const h = parseFloat(rawCapH2);
      return computeCapsuleVolume(r, h, cylUnit, precision1);
    }
    const r = parseFloat(rawCyR);
    const h = parseFloat(rawCyH);
    return computeCylinderVolume(r, h, cylUnit, precision1);
  }, [cylMode, rawCyR, rawCyH, rawTbD1, rawTbD2, rawTbL, rawCapR2, rawCapH2, cylUnit, precision1]);

  // Card 6 Calculations (Master Converter)
  const convMatrix = useMemo(() => {
    const val = parseFloat(rawConvVal);
    const safeVal = isNaN(val) ? 0 : val;
    const valM = toMeters(safeVal, convUnit);
    const vM3 = Math.pow(valM, 3);
    return convertVolumeFromCubicMeters(vM3, precision1);
  }, [rawConvVal, convUnit, precision1]);

  // Quick Preset Handlers
  const handleApplyPreset = (preset: "soda" | "beach" | "cube" | "pool") => {
    if (preset === "soda") {
      setUShape("cylinder");
      setRawUDim1("3.3");
      setRawUDim2("12.2");
      setUUnit("cm");
    } else if (preset === "beach") {
      setUShape("sphere");
      setRawUDim1("1.5");
      setUUnit("ft");
    } else if (preset === "cube") {
      setUShape("cube");
      setRawUDim1("12");
      setUUnit("in");
    } else if (preset === "pool") {
      setUShape("prism");
      setRawUDim1("25");
      setRawUDim2("10");
      setRawUDim3("2");
      setUUnit("m");
    }
  };

  // Safe Clipboard Copy Helper
  const handleCopyText = async (text: string, cardKey: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedKey(cardKey);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  // CSV Export Helper
  const downloadCSV = (filename: string, rows: (string | number)[][]) => {
    const escapeCsv = (val: string | number) => {
      const str = String(val ?? "");
      if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
        return `"${str.replace(/"/g, "\"\"")}"`;
      }
      return str;
    };
    const content = rows.map(r => r.map(escapeCsv).join(",")).join("\n");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // PDF Export Helper
  const downloadPDF = (title: string, lines: { label: string; value: string }[]) => {
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(30, 64, 175);
      doc.text("CalcPlatform — Volume & 3D Shape Suite", 40, 50);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 68);

      doc.setDrawColor(226, 232, 240);
      doc.line(40, 80, 555, 80);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text(title, 40, 105);

      let y = 135;
      lines.forEach(({ label, value }) => {
        if (y > 770) {
          doc.addPage();
          y = 50;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        doc.text(label, 40, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        doc.text(value, 200, y);
        y += 22;
      });

      doc.setDrawColor(226, 232, 240);
      doc.line(40, y + 10, 555, y + 10);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("Educational & Professional 3D Solid Calculation Report", 40, y + 30);

      doc.save(`${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}.pdf`);
    } catch (e) {
      console.error("PDF generation failed", e);
    }
  };

  // Card 1 Save / Copy / CSV / PDF
  const handleSaveUniv = () => {
    const inputsStr = `${univResult.shapeName}: dim1=${rawUDim1}, dim2=${rawUDim2}${uShape === "prism" ? `, dim3=${rawUDim3}` : ""} (${uUnit})`;
    const resList = [
      `Volume = ${univResult.formattedVolume} ${uUnit}³`,
      `Surface Area = ${univResult.formattedSurfaceArea ?? "N/A"} ${uUnit}²`,
      `Capacity = ${univResult.formattedConversions.liters} L (${univResult.formattedConversions.usGallons} US Gal)`
    ];

    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${univResult.shapeName} Volume = ${univResult.formattedVolume} ${uUnit}³`,
      moduleKey: "univ",
      shapeOrMode: uShape,
      rawInputs: { rawUDim1, rawUDim2, rawUDim3 },
      unit: uUnit,
      precision: precision1,
      inputsSummary: inputsStr,
      operation: "Universal 3D Engine",
      result: resList.join(" | "),
      resultsList: resList,
      formula: univResult.formula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedUnivItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedUnivItems(updated);
    try { localStorage.setItem("saved_vol_univ_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSavedUniv(true);
    setTimeout(() => setJustSavedUniv(false), 2000);
  };

  const handleCopyUniv = () => {
    const text = [
      `=== Volume Calculator: Universal Engine ===`,
      `Shape: ${univResult.shapeName}`,
      `Inputs: dim1=${rawUDim1}, dim2=${rawUDim2}${uShape === "prism" ? `, dim3=${rawUDim3}` : ""} ${uUnit}`,
      `Formula: ${univResult.formula}`,
      `Calculated Volume: ${univResult.formattedVolume} ${uUnit}³`,
      `Total Surface Area: ${univResult.formattedSurfaceArea ?? "N/A"} ${uUnit}²`,
      `Liters: ${univResult.formattedConversions.liters} L`,
      `US Gallons: ${univResult.formattedConversions.usGallons} gal`,
      `Cubic Feet: ${univResult.formattedConversions.cubicFeet} ft³`,
      `Precision: ${precision1} Decimals`,
      `Timestamp: ${new Date().toLocaleString()}`
    ].join("\n");
    handleCopyText(text, "univ");
  };

  const handleExportCSVUniv = () => {
    const headers = ["Module", "Shape", "Inputs", "Unit", "Formula", "Volume", "Surface Area", "Liters", "US Gallons", "Precision", "Timestamp"];
    const row = [
      "Universal 3D Shape Volume Engine",
      univResult.shapeName,
      `dim1=${rawUDim1}; dim2=${rawUDim2}; dim3=${rawUDim3}`,
      uUnit,
      univResult.formula,
      univResult.formattedVolume,
      univResult.formattedSurfaceArea ?? "N/A",
      univResult.formattedConversions.liters,
      univResult.formattedConversions.usGallons,
      precision1,
      new Date().toISOString()
    ];
    downloadCSV(`volume-universal-${uShape}-${Date.now()}.csv`, [headers, row]);
  };

  const handleExportPDFUniv = () => {
    downloadPDF(`Universal 3D Engine — ${univResult.shapeName}`, [
      { label: "Shape:", value: univResult.shapeName },
      { label: "Dimensions:", value: `dim1=${rawUDim1} ${uUnit}, dim2=${rawUDim2} ${uUnit}${uShape === "prism" ? `, dim3=${rawUDim3} ${uUnit}` : ""}` },
      { label: "Unit:", value: uUnit },
      { label: "Formula:", value: univResult.formula },
      { label: "Calculated Volume:", value: `${univResult.formattedVolume} ${uUnit}³` },
      { label: "Total Surface Area:", value: `${univResult.formattedSurfaceArea ?? "N/A"} ${uUnit}²` },
      { label: "Capacity (Liters):", value: `${univResult.formattedConversions.liters} L` },
      { label: "Capacity (US Gallons):", value: `${univResult.formattedConversions.usGallons} gal` },
      { label: "Equivalent (Cubic Feet):", value: `${univResult.formattedConversions.cubicFeet} ft³` },
      { label: "Precision:", value: `${precision1} decimal places` }
    ]);
  };

  // Card 2 Save / Copy / CSV / PDF
  const handleSaveTank = () => {
    const inputsStr = `Tank ${rawTankL}×${rawTankW}×${rawTankH} ${tankUnit} (Fill=${rawTankFill} ${tankUnit})`;
    const resList = [
      `Filled Liquid = ${tankResult.formattedLiquidVolume} ${tankUnit}³ (${tankResult.formattedLiquidCapacityLiters} L)`,
      `Total Capacity = ${tankResult.formattedTotalTankVolume} ${tankUnit}³ (${tankResult.formattedTotalCapacityLiters} L)`,
      `Remaining Air = ${tankResult.formattedRemainingAirVolume} ${tankUnit}³`
    ];

    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `Tank Liquid: ${tankResult.formattedLiquidCapacityLiters} L (${tankResult.formattedLiquidVolume} ${tankUnit}³)`,
      moduleKey: "tank",
      shapeOrMode: "tank",
      rawInputs: { rawTankL, rawTankW, rawTankH, rawTankFill },
      unit: tankUnit,
      precision: precision1,
      inputsSummary: inputsStr,
      operation: "Rectangular Tank & Liquid Capacity",
      result: resList.join(" | "),
      resultsList: resList,
      formula: "V = l·w·h",
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedTankItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedTankItems(updated);
    try { localStorage.setItem("saved_vol_tank_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTank(true);
    setTimeout(() => setJustSavedTank(false), 2000);
  };

  const handleCopyTank = () => {
    const text = [
      `=== Rectangular Tank & Liquid Capacity ===`,
      `Dimensions: Length=${rawTankL}, Width=${rawTankW}, Total Height=${rawTankH} ${tankUnit}`,
      `Liquid Fill Depth: ${rawTankFill} ${tankUnit}`,
      `Formula: V = l·w·h`,
      `Filled Liquid Volume: ${tankResult.formattedLiquidVolume} ${tankUnit}³`,
      `Liquid Storage Capacity: ${tankResult.formattedLiquidCapacityLiters} Liters (${tankResult.formattedLiquidCapacityUsGallons} US Gallons)`,
      `Total Tank Volume: ${tankResult.formattedTotalTankVolume} ${tankUnit}³`,
      `Total Tank Capacity: ${tankResult.formattedTotalCapacityLiters} Liters (${tankResult.formattedTotalCapacityUsGallons} US Gallons)`,
      `Remaining Air Volume: ${tankResult.formattedRemainingAirVolume} ${tankUnit}³`,
      `Timestamp: ${new Date().toLocaleString()}`
    ].join("\n");
    handleCopyText(text, "tank");
  };

  const handleExportCSVTank = () => {
    const headers = ["Module", "Length", "Width", "Height", "Fill Depth", "Unit", "Liquid Volume", "Liquid Liters", "Liquid US Gal", "Total Tank Vol", "Total Liters", "Total US Gal", "Air Volume", "Timestamp"];
    const row = [
      "Rectangular Tank & Liquid Capacity",
      rawTankL,
      rawTankW,
      rawTankH,
      rawTankFill,
      tankUnit,
      tankResult.formattedLiquidVolume,
      tankResult.formattedLiquidCapacityLiters,
      tankResult.formattedLiquidCapacityUsGallons,
      tankResult.formattedTotalTankVolume,
      tankResult.formattedTotalCapacityLiters,
      tankResult.formattedTotalCapacityUsGallons,
      tankResult.formattedRemainingAirVolume,
      new Date().toISOString()
    ];
    downloadCSV(`tank-capacity-${Date.now()}.csv`, [headers, row]);
  };

  const handleExportPDFTank = () => {
    downloadPDF("Rectangular Tank & Capacity Report", [
      { label: "Tank Length (l):", value: `${rawTankL} ${tankUnit}` },
      { label: "Tank Width (w):", value: `${rawTankW} ${tankUnit}` },
      { label: "Total Height (h):", value: `${rawTankH} ${tankUnit}` },
      { label: "Liquid Fill Depth (d):", value: `${rawTankFill} ${tankUnit}` },
      { label: "Formula:", value: "V = l·w·h" },
      { label: "Filled Liquid Volume:", value: `${tankResult.formattedLiquidVolume} ${tankUnit}³` },
      { label: "Liquid Capacity (Liters):", value: `${tankResult.formattedLiquidCapacityLiters} L` },
      { label: "Liquid Capacity (US Gal):", value: `${tankResult.formattedLiquidCapacityUsGallons} gal` },
      { label: "Total Tank Volume:", value: `${tankResult.formattedTotalTankVolume} ${tankUnit}³` },
      { label: "Total Tank Capacity (Liters):", value: `${tankResult.formattedTotalCapacityLiters} L` },
      { label: "Total Tank Capacity (US Gal):", value: `${tankResult.formattedTotalCapacityUsGallons} gal` },
      { label: "Remaining Air Volume:", value: `${tankResult.formattedRemainingAirVolume} ${tankUnit}³` }
    ]);
  };

  // Card 3 Save / Copy / CSV / PDF
  const handleSaveSph = () => {
    const inputsStr = `${sphResult.shapeName} (${sphUnit})`;
    const resList = [
      `Volume = ${sphResult.formattedVolume} ${sphUnit}³`,
      `Surface Area = ${sphResult.formattedSurfaceArea ?? "N/A"} ${sphUnit}²`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${sphResult.shapeName} V = ${sphResult.formattedVolume} ${sphUnit}³`,
      moduleKey: "sph",
      shapeOrMode: sphMode,
      rawInputs: { rawSphR, rawCapBaseR, rawCapBallR, rawCapH, rawEllA, rawEllB, rawEllC },
      unit: sphUnit,
      precision: precision1,
      inputsSummary: inputsStr,
      operation: "Sphere / Cap / Ellipsoid Suite",
      result: resList.join(" | "),
      resultsList: resList,
      formula: sphResult.formula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSphItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedSphItems(updated);
    try { localStorage.setItem("saved_vol_sph_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSph(true); setTimeout(() => setJustSavedSph(false), 2000);
  };

  const handleCopySph = () => {
    const text = [
      `=== Sphere, Cap & Ellipsoid Suite ===`,
      `Shape: ${sphResult.shapeName}`,
      `Formula: ${sphResult.formula}`,
      `Volume: ${sphResult.formattedVolume} ${sphUnit}³`,
      `Surface Area: ${sphResult.formattedSurfaceArea ?? "N/A"} ${sphUnit}²`,
      `Capacity (Liters): ${sphResult.formattedConversions.liters} L`,
      `Capacity (US Gal): ${sphResult.formattedConversions.usGallons} gal`,
      `Timestamp: ${new Date().toLocaleString()}`
    ].join("\n");
    handleCopyText(text, "sph");
  };

  const handleExportCSVSph = () => {
    const headers = ["Module", "Shape", "Unit", "Formula", "Volume", "Surface Area", "Liters", "US Gallons", "Timestamp"];
    const row = [
      "Sphere Suite",
      sphResult.shapeName,
      sphUnit,
      sphResult.formula,
      sphResult.formattedVolume,
      sphResult.formattedSurfaceArea ?? "N/A",
      sphResult.formattedConversions.liters,
      sphResult.formattedConversions.usGallons,
      new Date().toISOString()
    ];
    downloadCSV(`sphere-suite-${sphMode}-${Date.now()}.csv`, [headers, row]);
  };

  const handleExportPDFSph = () => {
    downloadPDF(`Sphere Suite — ${sphResult.shapeName}`, [
      { label: "Selected Shape:", value: sphResult.shapeName },
      { label: "Formula:", value: sphResult.formula },
      { label: "Unit:", value: sphUnit },
      { label: "Calculated Volume:", value: `${sphResult.formattedVolume} ${sphUnit}³` },
      { label: "Surface Area:", value: `${sphResult.formattedSurfaceArea ?? "N/A"} ${sphUnit}²` },
      { label: "Capacity (Liters):", value: `${sphResult.formattedConversions.liters} L` },
      { label: "Capacity (US Gallons):", value: `${sphResult.formattedConversions.usGallons} gal` }
    ]);
  };

  // Card 4 Save / Copy / CSV / PDF
  const handleSaveCone = () => {
    const inputsStr = `${coneResult.shapeName} (${coneUnit})`;
    const resList = [
      `Volume = ${coneResult.formattedVolume} ${coneUnit}³`,
      `Slant Height = ${coneResult.formattedSlantHeight ?? "N/A"} ${coneUnit}`,
      `Surface Area = ${coneResult.formattedSurfaceArea ?? "N/A"} ${coneUnit}²`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${coneResult.shapeName} V = ${coneResult.formattedVolume} ${coneUnit}³`,
      moduleKey: "cone",
      shapeOrMode: coneMode,
      rawInputs: { rawCnR, rawCnH, rawFrustTopR, rawFrustBotR, rawFrustH, rawPyrA, rawPyrH },
      unit: coneUnit,
      precision: precision1,
      inputsSummary: inputsStr,
      operation: "Cone / Frustum / Pyramid Suite",
      result: resList.join(" | "),
      resultsList: resList,
      formula: coneResult.formula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConeItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedConeItems(updated);
    try { localStorage.setItem("saved_vol_cone_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCone(true); setTimeout(() => setJustSavedCone(false), 2000);
  };

  const handleCopyCone = () => {
    const text = [
      `=== Cone, Frustum & Pyramid Suite ===`,
      `Shape: ${coneResult.shapeName}`,
      `Formula: ${coneResult.formula}`,
      `Volume: ${coneResult.formattedVolume} ${coneUnit}³`,
      `Slant Height: ${coneResult.formattedSlantHeight ?? "N/A"} ${coneUnit}`,
      `Surface Area: ${coneResult.formattedSurfaceArea ?? "N/A"} ${coneUnit}²`,
      `Capacity (Liters): ${coneResult.formattedConversions.liters} L`,
      `Timestamp: ${new Date().toLocaleString()}`
    ].join("\n");
    handleCopyText(text, "cone");
  };

  const handleExportCOneCSV = () => {
    const headers = ["Module", "Shape", "Unit", "Formula", "Volume", "Slant Height", "Surface Area", "Liters", "US Gallons", "Timestamp"];
    const row = [
      "Cone Suite",
      coneResult.shapeName,
      coneUnit,
      coneResult.formula,
      coneResult.formattedVolume,
      coneResult.formattedSlantHeight ?? "N/A",
      coneResult.formattedSurfaceArea ?? "N/A",
      coneResult.formattedConversions.liters,
      coneResult.formattedConversions.usGallons,
      new Date().toISOString()
    ];
    downloadCSV(`cone-suite-${coneMode}-${Date.now()}.csv`, [headers, row]);
  };

  const handleExportPDFCone = () => {
    downloadPDF(`Cone Suite — ${coneResult.shapeName}`, [
      { label: "Selected Shape:", value: coneResult.shapeName },
      { label: "Formula:", value: coneResult.formula },
      { label: "Unit:", value: coneUnit },
      { label: "Calculated Volume:", value: `${coneResult.formattedVolume} ${coneUnit}³` },
      { label: "Slant Height:", value: `${coneResult.formattedSlantHeight ?? "N/A"} ${coneUnit}` },
      { label: "Surface Area:", value: `${coneResult.formattedSurfaceArea ?? "N/A"} ${coneUnit}²` },
      { label: "Capacity (Liters):", value: `${coneResult.formattedConversions.liters} L` },
      { label: "Capacity (US Gal):", value: `${coneResult.formattedConversions.usGallons} gal` }
    ]);
  };

  // Card 5 Save / Copy / CSV / PDF
  const handleSaveCyl = () => {
    const inputsStr = `${cylResult.shapeName} (${cylUnit})`;
    const resList = [
      `Volume = ${cylResult.formattedVolume} ${cylUnit}³`,
      `Surface Area = ${cylResult.formattedSurfaceArea ?? "N/A"} ${cylUnit}²`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${cylResult.shapeName} V = ${cylResult.formattedVolume} ${cylUnit}³`,
      moduleKey: "cyl",
      shapeOrMode: cylMode,
      rawInputs: { rawCyR, rawCyH, rawTbD1, rawTbD2, rawTbL, rawCapR2, rawCapH2 },
      unit: cylUnit,
      precision: precision1,
      inputsSummary: inputsStr,
      operation: "Cylinder / Tube / Capsule Suite",
      result: resList.join(" | "),
      resultsList: resList,
      formula: cylResult.formula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCylItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedCylItems(updated);
    try { localStorage.setItem("saved_vol_cyl_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCyl(true); setTimeout(() => setJustSavedCyl(false), 2000);
  };

  const handleCopyCyl = () => {
    const text = [
      `=== Cylinder, Hollow Tube & Capsule Suite ===`,
      `Shape: ${cylResult.shapeName}`,
      `Formula: ${cylResult.formula}`,
      `Volume: ${cylResult.formattedVolume} ${cylUnit}³`,
      `Surface Area: ${cylResult.formattedSurfaceArea ?? "N/A"} ${cylUnit}²`,
      `Wall Thickness: ${cylResult.formattedWallThickness ?? "N/A"} ${cylUnit}`,
      `Capacity (Liters): ${cylResult.formattedConversions.liters} L`,
      `Timestamp: ${new Date().toLocaleString()}`
    ].join("\n");
    handleCopyText(text, "cyl");
  };

  const handleExportCSVCyl = () => {
    const headers = ["Module", "Shape", "Unit", "Formula", "Volume", "Surface Area", "Wall Thickness", "Liters", "US Gallons", "Timestamp"];
    const row = [
      "Cylinder Suite",
      cylResult.shapeName,
      cylUnit,
      cylResult.formula,
      cylResult.formattedVolume,
      cylResult.formattedSurfaceArea ?? "N/A",
      cylResult.formattedWallThickness ?? "N/A",
      cylResult.formattedConversions.liters,
      cylResult.formattedConversions.usGallons,
      new Date().toISOString()
    ];
    downloadCSV(`cylinder-suite-${cylMode}-${Date.now()}.csv`, [headers, row]);
  };

  const handleExportPDFCyl = () => {
    downloadPDF(`Cylinder Suite — ${cylResult.shapeName}`, [
      { label: "Selected Shape:", value: cylResult.shapeName },
      { label: "Formula:", value: cylResult.formula },
      { label: "Unit:", value: cylUnit },
      { label: "Calculated Volume:", value: `${cylResult.formattedVolume} ${cylUnit}³` },
      { label: "Surface Area:", value: `${cylResult.formattedSurfaceArea ?? "N/A"} ${cylUnit}²` },
      { label: "Wall Thickness:", value: `${cylResult.formattedWallThickness ?? "N/A"} ${cylUnit}` },
      { label: "Capacity (Liters):", value: `${cylResult.formattedConversions.liters} L` },
      { label: "Capacity (US Gal):", value: `${cylResult.formattedConversions.usGallons} gal` }
    ]);
  };

  // Card 6 Save / Copy / CSV / PDF
  const handleSaveConv = () => {
    const inputsStr = `1 ${convUnit}³`;
    const resList = [
      `${convMatrix.formatted.liters} Liters`,
      `${convMatrix.formatted.usGallons} US Gallons`,
      `${convMatrix.formatted.cubicFeet} Cubic Feet`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `Converted 1 ${convUnit}³ = ${convMatrix.formatted.liters} L`,
      moduleKey: "conv",
      shapeOrMode: "converter",
      rawInputs: { rawConvVal },
      unit: convUnit,
      precision: precision1,
      inputsSummary: inputsStr,
      operation: "Master Volume Unit Converter",
      result: resList.join(" | "),
      resultsList: resList,
      formula: "1 Unit³ = Multi-Unit Equivalents",
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_vol_conv_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  const handleCopyConv = () => {
    const text = [
      `=== Master Volume Unit Converter Matrix ===`,
      `Base Volume: ${rawConvVal} ${convUnit}³`,
      `Cubic Meters: ${convMatrix.formatted.cubicMeters} m³`,
      `Liters: ${convMatrix.formatted.liters} L`,
      `Milliliters: ${convMatrix.formatted.milliliters} mL`,
      `US Gallons: ${convMatrix.formatted.usGallons} gal`,
      `US Fluid Ounces: ${convMatrix.formatted.usFluidOunces} fl oz`,
      `Imperial Gallons: ${convMatrix.formatted.impGallons} imp gal`,
      `Cubic Feet: ${convMatrix.formatted.cubicFeet} ft³`,
      `Cubic Inches: ${convMatrix.formatted.cubicInches} in³`,
      `Cubic Yards: ${convMatrix.formatted.cubicYards} yd³`,
      `Timestamp: ${new Date().toLocaleString()}`
    ].join("\n");
    handleCopyText(text, "conv");
  };

  const handleExportCSVConv = () => {
    const headers = ["Base Value", "Base Unit", "Cubic Meters", "Liters", "Milliliters", "US Gallons", "US Fluid Ounces", "Imperial Gallons", "Cubic Feet", "Cubic Inches", "Cubic Yards", "Timestamp"];
    const row = [
      rawConvVal,
      convUnit,
      convMatrix.formatted.cubicMeters,
      convMatrix.formatted.liters,
      convMatrix.formatted.milliliters,
      convMatrix.formatted.usGallons,
      convMatrix.formatted.usFluidOunces,
      convMatrix.formatted.impGallons,
      convMatrix.formatted.cubicFeet,
      convMatrix.formatted.cubicInches,
      convMatrix.formatted.cubicYards,
      new Date().toISOString()
    ];
    downloadCSV(`volume-converter-matrix-${Date.now()}.csv`, [headers, row]);
  };

  const handleExportPDFConv = () => {
    downloadPDF("Master Volume Converter Matrix", [
      { label: "Base Volume:", value: `${rawConvVal} ${convUnit}³` },
      { label: "Cubic Meters:", value: `${convMatrix.formatted.cubicMeters} m³` },
      { label: "Liters:", value: `${convMatrix.formatted.liters} L` },
      { label: "Milliliters:", value: `${convMatrix.formatted.milliliters} mL` },
      { label: "US Gallons:", value: `${convMatrix.formatted.usGallons} gal` },
      { label: "US Fluid Ounces:", value: `${convMatrix.formatted.usFluidOunces} fl oz` },
      { label: "UK Imperial Gallons:", value: `${convMatrix.formatted.impGallons} imp gal` },
      { label: "Cubic Feet:", value: `${convMatrix.formatted.cubicFeet} ft³` },
      { label: "Cubic Inches:", value: `${convMatrix.formatted.cubicInches} in³` },
      { label: "Cubic Yards:", value: `${convMatrix.formatted.cubicYards} yd³` }
    ]);
  };

  // RESTORE / LOAD SAVED CALCULATION
  const handleLoadSavedItem = (item: SavedVolumeItem) => {
    if (item.precision) setPrecision1(item.precision);

    if (item.moduleKey === "univ") {
      if (item.shapeOrMode) setUShape(item.shapeOrMode as any);
      if (item.unit) setUUnit(item.unit);
      if (item.rawInputs) {
        if (item.rawInputs.rawUDim1 !== undefined) setRawUDim1(item.rawInputs.rawUDim1);
        if (item.rawInputs.rawUDim2 !== undefined) setRawUDim2(item.rawInputs.rawUDim2);
        if (item.rawInputs.rawUDim3 !== undefined) setRawUDim3(item.rawInputs.rawUDim3);
      }
    } else if (item.moduleKey === "tank") {
      if (item.unit) setTankUnit(item.unit);
      if (item.rawInputs) {
        if (item.rawInputs.rawTankL !== undefined) setRawTankL(item.rawInputs.rawTankL);
        if (item.rawInputs.rawTankW !== undefined) setRawTankW(item.rawInputs.rawTankW);
        if (item.rawInputs.rawTankH !== undefined) setRawTankH(item.rawInputs.rawTankH);
        if (item.rawInputs.rawTankFill !== undefined) setRawTankFill(item.rawInputs.rawTankFill);
      }
    } else if (item.moduleKey === "sph") {
      if (item.shapeOrMode) setSphMode(item.shapeOrMode as any);
      if (item.unit) setSphUnit(item.unit);
      if (item.rawInputs) {
        if (item.rawInputs.rawSphR !== undefined) setRawSphR(item.rawInputs.rawSphR);
        if (item.rawInputs.rawCapBaseR !== undefined) setRawCapBaseR(item.rawInputs.rawCapBaseR);
        if (item.rawInputs.rawCapBallR !== undefined) setRawCapBallR(item.rawInputs.rawCapBallR);
        if (item.rawInputs.rawCapH !== undefined) setRawCapH(item.rawInputs.rawCapH);
        if (item.rawInputs.rawEllA !== undefined) setRawEllA(item.rawInputs.rawEllA);
        if (item.rawInputs.rawEllB !== undefined) setRawEllB(item.rawInputs.rawEllB);
        if (item.rawInputs.rawEllC !== undefined) setRawEllC(item.rawInputs.rawEllC);
      }
    } else if (item.moduleKey === "cone") {
      if (item.shapeOrMode) setConeMode(item.shapeOrMode as any);
      if (item.unit) setConeUnit(item.unit);
      if (item.rawInputs) {
        if (item.rawInputs.rawCnR !== undefined) setRawCnR(item.rawInputs.rawCnR);
        if (item.rawInputs.rawCnH !== undefined) setRawCnH(item.rawInputs.rawCnH);
        if (item.rawInputs.rawFrustTopR !== undefined) setRawFrustTopR(item.rawInputs.rawFrustTopR);
        if (item.rawInputs.rawFrustBotR !== undefined) setRawFrustBotR(item.rawInputs.rawFrustBotR);
        if (item.rawInputs.rawFrustH !== undefined) setRawFrustH(item.rawInputs.rawFrustH);
        if (item.rawInputs.rawPyrA !== undefined) setRawPyrA(item.rawInputs.rawPyrA);
        if (item.rawInputs.rawPyrH !== undefined) setRawPyrH(item.rawInputs.rawPyrH);
      }
    } else if (item.moduleKey === "cyl") {
      if (item.shapeOrMode) setCylMode(item.shapeOrMode as any);
      if (item.unit) setCylUnit(item.unit);
      if (item.rawInputs) {
        if (item.rawInputs.rawCyR !== undefined) setRawCyR(item.rawInputs.rawCyR);
        if (item.rawInputs.rawCyH !== undefined) setRawCyH(item.rawInputs.rawCyH);
        if (item.rawInputs.rawTbD1 !== undefined) setRawTbD1(item.rawInputs.rawTbD1);
        if (item.rawInputs.rawTbD2 !== undefined) setRawTbD2(item.rawInputs.rawTbD2);
        if (item.rawInputs.rawTbL !== undefined) setRawTbL(item.rawInputs.rawTbL);
        if (item.rawInputs.rawCapR2 !== undefined) setRawCapR2(item.rawInputs.rawCapR2);
        if (item.rawInputs.rawCapH2 !== undefined) setRawCapH2(item.rawInputs.rawCapH2);
      }
    } else if (item.moduleKey === "conv") {
      if (item.unit) setConvUnit(item.unit);
      if (item.rawInputs && item.rawInputs.rawConvVal !== undefined) {
        setRawConvVal(item.rawInputs.rawConvVal);
      }
    }
  };

  // Render Interactive 3D SVG Shape Visualizer Helper with Notation
  const renderShapeSVG = (shape: string) => {
    const w = 220; const h = 160;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-52 h-40">
        <rect width={w} height={h} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* 1. SPHERE */}
        {(shape === "Sphere" || shape === "Standard Sphere") && (
          <g>
            <circle cx="110" cy="80" r="55" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="80" rx="55" ry="18" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="110" y1="80" x2="165" y2="80" stroke="#dc2626" strokeWidth="2" />
            <circle cx="110" cy="80" r="3" fill="#1d4ed8" />
            <text x="138" y="74" textAnchor="middle" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">r</text>
          </g>
        )}

        {/* 2. CONE */}
        {(shape === "Cone" || shape === "Standard Cone") && (
          <g>
            <path d="M 110 25 L 165 125 L 55 125 Z" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="125" rx="55" ry="15" fill="#93c5fd" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="1.5" />
            <line x1="110" y1="25" x2="110" y2="125" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="75" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <line x1="110" y1="125" x2="165" y2="125" stroke="#16a34a" strokeWidth="2" />
            <text x="138" y="120" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
          </g>
        )}

        {/* 3. CYLINDER */}
        {(shape === "Cylinder" || shape === "Solid Cylinder") && (
          <g>
            <rect x="55" y="40" width="110" height="80" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="40" rx="55" ry="15" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="2" />
            <ellipse cx="110" cy="120" rx="55" ry="15" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="110" y1="40" x2="165" y2="40" stroke="#16a34a" strokeWidth="2" />
            <text x="138" y="34" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
            <line x1="165" y1="40" x2="165" y2="120" stroke="#dc2626" strokeWidth="2" />
            <text x="173" y="85" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
          </g>
        )}

        {/* 4. CUBE */}
        {shape === "Cube" && (
          <g>
            <rect x="65" y="55" width="70" height="70" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 65 55 L 95 30 L 165 30 L 135 55 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 135 55 L 165 30 L 165 100 L 135 125 Z" fill="#2563eb" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <text x="100" y="142" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-700 dark:fill-blue-300">edge (a)</text>
          </g>
        )}

        {/* 5. RECTANGULAR PRISM / TANK */}
        {(shape.includes("Prism") || shape.includes("Tank")) && (
          <g>
            <rect x="45" y="55" width="100" height="65" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 45 55 L 75 30 L 175 30 L 145 55 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 145 55 L 175 30 L 175 95 L 145 120 Z" fill="#2563eb" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <text x="95" y="135" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">length (l)</text>
            <text x="165" y="112" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">w</text>
            <text x="183" y="65" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
          </g>
        )}

        {/* 6. SPHERICAL CAP */}
        {shape === "Spherical Cap" && (
          <g>
            <path d="M 50 100 A 70 70 0 0 1 170 100 Z" fill="#3b82f6" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="100" rx="60" ry="12" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
            <line x1="110" y1="100" x2="170" y2="100" stroke="#16a34a" strokeWidth="2" />
            <text x="140" y="95" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
            <line x1="110" y1="30" x2="110" y2="100" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="65" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <line x1="110" y1="130" x2="170" y2="100" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2,2" />
            <text x="145" y="125" className="text-[10px] font-mono font-bold fill-purple-600 dark:fill-purple-400">R</text>
          </g>
        )}

        {/* 7. ELLIPSOID */}
        {shape === "Ellipsoid" && (
          <g>
            <ellipse cx="110" cy="80" rx="70" ry="45" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="80" rx="70" ry="18" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="110" y1="80" x2="180" y2="80" stroke="#dc2626" strokeWidth="2" />
            <text x="145" y="75" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">a</text>
            <line x1="110" y1="80" x2="110" y2="35" stroke="#16a34a" strokeWidth="2" />
            <text x="100" y="55" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">b</text>
            <line x1="110" y1="80" x2="140" y2="95" stroke="#8b5cf6" strokeWidth="2" />
            <text x="130" y="92" className="text-[10px] font-mono font-bold fill-purple-600 dark:fill-purple-400">c</text>
          </g>
        )}

        {/* 8. CONICAL FRUSTUM */}
        {shape === "Conical Frustum" && (
          <g>
            <path d="M 80 40 L 140 40 L 170 120 L 50 120 Z" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="40" rx="30" ry="8" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
            <ellipse cx="110" cy="120" rx="60" ry="15" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
            <line x1="110" y1="40" x2="140" y2="40" stroke="#16a34a" strokeWidth="2" />
            <text x="125" y="35" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
            <line x1="110" y1="120" x2="170" y2="120" stroke="#8b5cf6" strokeWidth="2" />
            <text x="140" y="115" className="text-[10px] font-mono font-bold fill-purple-600 dark:fill-purple-400">R</text>
            <line x1="110" y1="40" x2="110" y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="80" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
          </g>
        )}

        {/* 9. SQUARE PYRAMID */}
        {shape === "Square Pyramid" && (
          <g>
            <path d="M 110 25 L 165 115 L 55 115 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 110 25 L 165 115 L 185 95 L 110 25 Z" fill="#2563eb" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="110" y1="25" x2="110" y2="115" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="70" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <text x="110" y="130" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">base (a)</text>
          </g>
        )}

        {/* 10. HOLLOW TUBE / CYLINDER */}
        {(shape.includes("Tube") || shape.includes("Hollow")) && (
          <g>
            <rect x="50" y="40" width="120" height="80" fill="#3b82f6" fillOpacity="0.15" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="40" rx="60" ry="16" fill="none" stroke="#1d4ed8" strokeWidth="2" />
            <ellipse cx="110" cy="40" rx="40" ry="10" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2,2" />
            <ellipse cx="110" cy="120" rx="60" ry="16" fill="none" stroke="#1d4ed8" strokeWidth="2" />
            <ellipse cx="110" cy="120" rx="40" ry="10" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="50" y1="20" x2="170" y2="20" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="110" y="15" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">d1 (outer)</text>
            <line x1="70" y1="30" x2="150" y2="30" stroke="#dc2626" strokeWidth="1.5" />
            <text x="110" y="27" textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">d2</text>
            <text x="178" y="85" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">l</text>
          </g>
        )}

        {/* 11. CAPSULE */}
        {shape === "Capsule" && (
          <g>
            <rect x="60" y="50" width="100" height="60" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 60 50 A 30 30 0 0 0 60 110 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 160 50 A 30 30 0 0 1 160 110 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="60" y1="80" x2="160" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="110" y="75" textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <line x1="60" y1="50" x2="60" y2="80" stroke="#16a34a" strokeWidth="2" />
            <text x="52" y="68" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
          </g>
        )}
      </svg>
    );
  };

  // Reusable Saved Items List Renderer
  const renderSavedSection = (
    title: string,
    items: SavedVolumeItem[],
    setItems: React.Dispatch<React.SetStateAction<SavedVolumeItem[]>>,
    storageKey: string
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span>{title} ({items.length})</span>
          </h3>
          <button
            type="button"
            onClick={() => {
              setItems([]);
              try { localStorage.removeItem(storageKey); } catch (e) {}
            }}
            className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => {
            const isExpanded = !!expandedIds[item.id];
            const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 line-clamp-1">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleLoadSavedItem(item)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                      title="Load and restore this calculation"
                    >
                      <RotateCcw className="w-3 h-3" /> Load
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = items.filter(i => i.id !== item.id);
                        setItems(updated);
                        try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch (e) {}
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                      title="Delete saved calculation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                  <div>
                    <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputsSummary}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center justify-between px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
                      {item.formula && (
                        <div className="text-slate-500 font-mono">
                          <strong>Formula: </strong>{item.formula}
                        </div>
                      )}
                      {resParts.map((r, idx) => (
                        <div key={idx} className="text-slate-800 dark:text-slate-200">
                          &bull; {r}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: UNIVERSAL 3D SHAPE VOLUME ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <span className="font-extrabold uppercase tracking-wider">Universal 3D Shape Volume Engine</span>
          <div className="flex items-center gap-1.5 print:hidden">
            <button
              type="button"
              onClick={handleCopyUniv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy calculation summary to clipboard"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKey === "univ" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSVUniv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export calculation as CSV"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDFUniv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Download report as PDF"
            >
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveUniv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Save snapshot to browser storage"
            >
              <Bookmark className="w-3 h-3" />
              <span>{justSavedUniv ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* QUICK PRESETS BAR */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold print:hidden">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset("soda")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Standard Soda Can
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("beach")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Standard Beach Ball
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("cube")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Shipping Box (12 in)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("pool")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Pool (25m × 10m × 2m)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: SHAPE & DIMENSIONS INPUT */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Box className="h-4 w-4 text-blue-600" />
                  <span>3D Shape Parameters</span>
                </h2>
                <select
                  id="univ-length-unit"
                  value={uUnit}
                  onChange={(e) => setUUnit(e.target.value as LengthUnit)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <option value="m">meters (m)</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="ft">feet (ft)</option>
                  <option value="in">inches (in)</option>
                  <option value="yd">yards (yd)</option>
                </select>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="univ-shape-select" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select 3D Shape:
                  </label>
                  <select
                    id="univ-shape-select"
                    value={uShape}
                    onChange={(e) => setUShape(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
                  >
                    <option value="cylinder">Cylinder (Radius r, Height h)</option>
                    <option value="sphere">Sphere (Radius r)</option>
                    <option value="cone">Cone (Radius r, Height h)</option>
                    <option value="cube">Cube (Edge Length a)</option>
                    <option value="prism">Rectangular Prism / Tank (l, w, h)</option>
                  </select>
                </div>

                {uShape === "sphere" && (
                  <div>
                    <label htmlFor="univ-sphere-radius" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Radius (r):
                    </label>
                    <input
                      id="univ-sphere-radius"
                      type="text"
                      inputMode="decimal"
                      value={rawUDim1}
                      onChange={(e) => setRawUDim1(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 5"
                    />
                  </div>
                )}

                {uShape === "cube" && (
                  <div>
                    <label htmlFor="univ-cube-edge" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Edge Length (a):
                    </label>
                    <input
                      id="univ-cube-edge"
                      type="text"
                      inputMode="decimal"
                      value={rawUDim1}
                      onChange={(e) => setRawUDim1(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 5"
                    />
                  </div>
                )}

                {(uShape === "cylinder" || uShape === "cone") && (
                  <>
                    <div>
                      <label htmlFor="univ-cyl-radius" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Base Radius (r):
                      </label>
                      <input
                        id="univ-cyl-radius"
                        type="text"
                        inputMode="decimal"
                        value={rawUDim1}
                        onChange={(e) => setRawUDim1(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                        placeholder="e.g. 5"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-cyl-height" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Height (h):
                      </label>
                      <input
                        id="univ-cyl-height"
                        type="text"
                        inputMode="decimal"
                        value={rawUDim2}
                        onChange={(e) => setRawUDim2(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                        placeholder="e.g. 10"
                      />
                    </div>
                  </>
                )}

                {uShape === "prism" && (
                  <>
                    <div>
                      <label htmlFor="univ-prism-len" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Length (l):
                      </label>
                      <input
                        id="univ-prism-len"
                        type="text"
                        inputMode="decimal"
                        value={rawUDim1}
                        onChange={(e) => setRawUDim1(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                        placeholder="e.g. 10"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-prism-width" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Width (w):
                      </label>
                      <input
                        id="univ-prism-width"
                        type="text"
                        inputMode="decimal"
                        value={rawUDim2}
                        onChange={(e) => setRawUDim2(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                        placeholder="e.g. 6"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-prism-height" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Height (h):
                      </label>
                      <input
                        id="univ-prism-height"
                        type="text"
                        inputMode="decimal"
                        value={rawUDim3}
                        onChange={(e) => setRawUDim3(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                        placeholder="e.g. 4"
                      />
                    </div>
                  </>
                )}

                {/* Display Decimals Precision Selector */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Display Decimals:</span>
                  <div className="flex gap-1 text-[11px] font-bold">
                    {[2, 4, 6].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPrecision1(p)}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${precision1 === p ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"}`}
                      >
                        {p} Dec
                      </button>
                    ))}
                  </div>
                </div>

                {univResult.error && (
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-1.5 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{univResult.error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: MAIN RESULTS & 3D DIAGRAM */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Calculated {univResult.shapeName} Volume
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      {univResult.formula}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {univResult.formattedVolume} <span className="text-lg text-blue-600">{uUnit}³</span>
                  </div>

                  {univResult.surfaceArea !== undefined && (
                    <p className="text-xs font-mono font-bold text-slate-500">
                      Total Surface Area A = {univResult.formattedSurfaceArea} {uUnit}²
                      {univResult.slantHeight !== undefined && ` | Slant Height s = ${univResult.formattedSlantHeight} ${uUnit}`}
                    </p>
                  )}
                </div>

                {/* CAPACITY & CONVERSIONS SUMMARY */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Liters</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.formattedConversions.liters} L</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">US Gallons</span>
                    <span className="text-blue-600 dark:text-blue-400">{univResult.formattedConversions.usGallons} gal</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Cubic Feet</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.formattedConversions.cubicFeet} ft³</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Cubic Inches</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.formattedConversions.cubicInches} in³</span>
                  </div>
                </div>

                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderShapeSVG(univResult.shapeName)}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 1 */}
          {renderSavedSection(
            "Saved Universal Volume Calculations",
            savedUnivItems,
            setSavedUnivItems,
            "saved_vol_univ_v2"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: RECTANGULAR TANK & LIQUID CAPACITY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <span className="font-extrabold uppercase tracking-wider">Rectangular Tank &amp; Liquid Capacity Calculator</span>
          <div className="flex items-center gap-1.5 print:hidden">
            <button
              type="button"
              onClick={handleCopyTank}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy tank summary"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKey === "tank" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSVTank}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export Tank CSV"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDFTank}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export Tank PDF"
            >
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveTank}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3" />
              <span>{justSavedTank ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-blue-600" />
                  <span>Tank Dimensions</span>
                </h2>
                <select
                  id="tank-unit-select"
                  value={tankUnit}
                  onChange={(e) => setTankUnit(e.target.value as LengthUnit)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded text-xs font-bold"
                >
                  <option value="ft">feet (ft)</option>
                  <option value="m">meters (m)</option>
                  <option value="cm">cm</option>
                  <option value="in">inches (in)</option>
                </select>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="tank-len-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Length (l):
                  </label>
                  <input
                    id="tank-len-input"
                    type="text"
                    inputMode="decimal"
                    value={rawTankL}
                    onChange={(e) => setRawTankL(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    placeholder="e.g. 10"
                  />
                </div>

                <div>
                  <label htmlFor="tank-width-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Width (w):
                  </label>
                  <input
                    id="tank-width-input"
                    type="text"
                    inputMode="decimal"
                    value={rawTankW}
                    onChange={(e) => setRawTankW(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    placeholder="e.g. 6"
                  />
                </div>

                <div>
                  <label htmlFor="tank-height-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Total Height (h):
                  </label>
                  <input
                    id="tank-height-input"
                    type="text"
                    inputMode="decimal"
                    value={rawTankH}
                    onChange={(e) => setRawTankH(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    placeholder="e.g. 4"
                  />
                </div>

                <div>
                  <label htmlFor="tank-fill-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Liquid Fill Depth (d):
                  </label>
                  <input
                    id="tank-fill-input"
                    type="text"
                    inputMode="decimal"
                    value={rawTankFill}
                    onChange={(e) => setRawTankFill(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    placeholder="e.g. 3"
                  />
                </div>

                {tankResult.error && (
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-1.5 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{tankResult.error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: TANK OUTPUTS & DIAGRAM */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                {/* PRIMARY METRIC: FILLED LIQUID CAPACITY */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Liquid Storage Capacity (Filled)
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      V_liq = l·w·d
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {tankResult.formattedLiquidCapacityLiters} <span className="text-lg text-blue-600">Liters</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    {tankResult.formattedLiquidCapacityUsGallons} US Gallons | Filled Liquid Volume = {tankResult.formattedLiquidVolume} {tankUnit}³
                  </p>
                </div>

                {/* SECONDARY BREAKDOWN: TOTAL CAPACITY & REMAINING AIR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                    <span className="text-[10px] text-blue-800 dark:text-blue-300 block uppercase">Total Tank Capacity</span>
                    <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {tankResult.formattedTotalCapacityLiters} Liters
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {tankResult.formattedTotalCapacityUsGallons} US Gal | {tankResult.formattedTotalTankVolume} {tankUnit}³
                    </span>
                  </div>

                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block uppercase">Remaining Air Volume</span>
                    <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {tankResult.formattedRemainingAirVolume} {tankUnit}³
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Available Air Space
                    </span>
                  </div>
                </div>

                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderShapeSVG("Rectangular Prism / Tank")}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 2 */}
          {renderSavedSection(
            "Saved Tank Liquid Calculations",
            savedTankItems,
            setSavedTankItems,
            "saved_vol_tank_v2"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: SPHERE, SPHERICAL CAP & ELLIPSOID SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <span className="font-extrabold uppercase tracking-wider">Sphere, Spherical Cap &amp; Ellipsoid Suite</span>
          <div className="flex items-center gap-1.5 print:hidden">
            <button
              type="button"
              onClick={handleCopySph}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKey === "sph" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSVSph}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDFSph}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveSph}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3" />
              <span>{justSavedSph ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* TAB SELECTOR */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 print:hidden">
            {[
              { id: "sphere", label: "Standard Sphere" },
              { id: "cap", label: "Spherical Cap" },
              { id: "ellipsoid", label: "Ellipsoid" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSphMode(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sphMode === tab.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
              {sphMode === "sphere" && (
                <div>
                  <label htmlFor="sph-radius-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Radius (r):
                  </label>
                  <input
                    id="sph-radius-input"
                    type="text"
                    inputMode="decimal"
                    value={rawSphR}
                    onChange={(e) => setRawSphR(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    placeholder="e.g. 4"
                  />
                </div>
              )}

              {sphMode === "cap" && (
                <>
                  <div>
                    <label htmlFor="cap-base-r-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Base Radius (r):
                    </label>
                    <input
                      id="cap-base-r-input"
                      type="text"
                      inputMode="decimal"
                      value={rawCapBaseR}
                      onChange={(e) => setRawCapBaseR(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 3"
                    />
                  </div>
                  <div>
                    <label htmlFor="cap-ball-r-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Ball/Sphere Radius (R) (optional if r and h provided):
                    </label>
                    <input
                      id="cap-ball-r-input"
                      type="text"
                      inputMode="decimal"
                      value={rawCapBallR}
                      onChange={(e) => setRawCapBallR(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 5"
                    />
                  </div>
                  <div>
                    <label htmlFor="cap-h-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Cap Height (h):
                    </label>
                    <input
                      id="cap-h-input"
                      type="text"
                      inputMode="decimal"
                      value={rawCapH}
                      onChange={(e) => setRawCapH(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 2"
                    />
                  </div>
                </>
              )}

              {sphMode === "ellipsoid" && (
                <>
                  <div>
                    <label htmlFor="ell-a-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Semi-axis (a):
                    </label>
                    <input
                      id="ell-a-input"
                      type="text"
                      inputMode="decimal"
                      value={rawEllA}
                      onChange={(e) => setRawEllA(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 3"
                    />
                  </div>
                  <div>
                    <label htmlFor="ell-b-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Semi-axis (b):
                    </label>
                    <input
                      id="ell-b-input"
                      type="text"
                      inputMode="decimal"
                      value={rawEllB}
                      onChange={(e) => setRawEllB(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 4"
                    />
                  </div>
                  <div>
                    <label htmlFor="ell-c-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Semi-axis (c):
                    </label>
                    <input
                      id="ell-c-input"
                      type="text"
                      inputMode="decimal"
                      value={rawEllC}
                      onChange={(e) => setRawEllC(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 5"
                    />
                  </div>
                </>
              )}

              {sphResult.error && (
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-1.5 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{sphResult.error}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      {sphResult.shapeName} Results
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      {sphResult.formula}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {sphResult.formattedVolume} <span className="text-lg text-blue-600">{sphUnit}³</span>
                  </div>
                  {sphResult.surfaceArea !== undefined && (
                    <p className="text-xs font-mono font-bold text-slate-500">
                      Surface Area = {sphResult.formattedSurfaceArea} {sphUnit}²
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderShapeSVG(sphResult.shapeName)}
                </div>
              </div>
            </div>
          </div>

          {renderSavedSection(
            "Saved Sphere Suite Calculations",
            savedSphItems,
            setSavedSphItems,
            "saved_vol_sph_v2"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: CONE, CONICAL FRUSTUM & PYRAMID SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <span className="font-extrabold uppercase tracking-wider">Cone, Conical Frustum &amp; Pyramid Suite</span>
          <div className="flex items-center gap-1.5 print:hidden">
            <button
              type="button"
              onClick={handleCopyCone}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKey === "cone" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCOneCSV}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDFCone}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCone}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3" />
              <span>{justSavedCone ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* TAB SELECTOR */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 print:hidden">
            {[
              { id: "cone", label: "Standard Cone" },
              { id: "frustum", label: "Conical Frustum" },
              { id: "pyramid", label: "Square Pyramid" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setConeMode(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  coneMode === tab.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
              {coneMode === "cone" && (
                <>
                  <div>
                    <label htmlFor="cone-base-r" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Base Radius (r):
                    </label>
                    <input
                      id="cone-base-r"
                      type="text"
                      inputMode="decimal"
                      value={rawCnR}
                      onChange={(e) => setRawCnR(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 5"
                    />
                  </div>
                  <div>
                    <label htmlFor="cone-height-h" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Height (h):
                    </label>
                    <input
                      id="cone-height-h"
                      type="text"
                      inputMode="decimal"
                      value={rawCnH}
                      onChange={(e) => setRawCnH(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 12"
                    />
                  </div>
                </>
              )}

              {coneMode === "frustum" && (
                <>
                  <div>
                    <label htmlFor="frust-top-r" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Top Radius (r):
                    </label>
                    <input
                      id="frust-top-r"
                      type="text"
                      inputMode="decimal"
                      value={rawFrustTopR}
                      onChange={(e) => setRawFrustTopR(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 3"
                    />
                  </div>
                  <div>
                    <label htmlFor="frust-bot-r" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Bottom Radius (R):
                    </label>
                    <input
                      id="frust-bot-r"
                      type="text"
                      inputMode="decimal"
                      value={rawFrustBotR}
                      onChange={(e) => setRawFrustBotR(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 6"
                    />
                  </div>
                  <div>
                    <label htmlFor="frust-h-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Height (h):
                    </label>
                    <input
                      id="frust-h-input"
                      type="text"
                      inputMode="decimal"
                      value={rawFrustH}
                      onChange={(e) => setRawFrustH(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 8"
                    />
                  </div>
                </>
              )}

              {coneMode === "pyramid" && (
                <>
                  <div>
                    <label htmlFor="pyr-base-edge" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Base Edge (a):
                    </label>
                    <input
                      id="pyr-base-edge"
                      type="text"
                      inputMode="decimal"
                      value={rawPyrA}
                      onChange={(e) => setRawPyrA(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 6"
                    />
                  </div>
                  <div>
                    <label htmlFor="pyr-height-h" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Height (h):
                    </label>
                    <input
                      id="pyr-height-h"
                      type="text"
                      inputMode="decimal"
                      value={rawPyrH}
                      onChange={(e) => setRawPyrH(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 9"
                    />
                  </div>
                </>
              )}

              {coneResult.error && (
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-1.5 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{coneResult.error}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      {coneResult.shapeName} Results
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      {coneResult.formula}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {coneResult.formattedVolume} <span className="text-lg text-blue-600">{coneUnit}³</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    {coneResult.slantHeight !== undefined && `Slant Height = ${coneResult.formattedSlantHeight} ${coneUnit} | `}
                    Surface Area = {coneResult.formattedSurfaceArea ?? "N/A"} {coneUnit}²
                  </p>
                </div>

                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderShapeSVG(coneResult.shapeName)}
                </div>
              </div>
            </div>
          </div>

          {renderSavedSection(
            "Saved Cone Suite Calculations",
            savedConeItems,
            setSavedConeItems,
            "saved_vol_cone_v2"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: CYLINDER, HOLLOW TUBE & CAPSULE SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <span className="font-extrabold uppercase tracking-wider">Cylinder, Hollow Tube &amp; Capsule Suite</span>
          <div className="flex items-center gap-1.5 print:hidden">
            <button
              type="button"
              onClick={handleCopyCyl}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKey === "cyl" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSVCyl}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDFCyl}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCyl}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3" />
              <span>{justSavedCyl ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* TAB SELECTOR */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 print:hidden">
            {[
              { id: "cylinder", label: "Solid Cylinder" },
              { id: "tube", label: "Hollow Tube / Pipe" },
              { id: "capsule", label: "Capsule" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCylMode(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  cylMode === tab.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
              {cylMode === "cylinder" && (
                <>
                  <div>
                    <label htmlFor="cyl-radius-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Radius (r):
                    </label>
                    <input
                      id="cyl-radius-input"
                      type="text"
                      inputMode="decimal"
                      value={rawCyR}
                      onChange={(e) => setRawCyR(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 4"
                    />
                  </div>
                  <div>
                    <label htmlFor="cyl-height-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Height (h):
                    </label>
                    <input
                      id="cyl-height-input"
                      type="text"
                      inputMode="decimal"
                      value={rawCyH}
                      onChange={(e) => setRawCyH(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 10"
                    />
                  </div>
                </>
              )}

              {cylMode === "tube" && (
                <>
                  <div>
                    <label htmlFor="tube-outer-d" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Outer Diameter (d1):
                    </label>
                    <input
                      id="tube-outer-d"
                      type="text"
                      inputMode="decimal"
                      value={rawTbD1}
                      onChange={(e) => setRawTbD1(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div>
                    <label htmlFor="tube-inner-d" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Inner Diameter (d2):
                    </label>
                    <input
                      id="tube-inner-d"
                      type="text"
                      inputMode="decimal"
                      value={rawTbD2}
                      onChange={(e) => setRawTbD2(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 8"
                    />
                  </div>
                  <div>
                    <label htmlFor="tube-length-l" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Length / Height (l):
                    </label>
                    <input
                      id="tube-length-l"
                      type="text"
                      inputMode="decimal"
                      value={rawTbL}
                      onChange={(e) => setRawTbL(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 20"
                    />
                  </div>
                </>
              )}

              {cylMode === "capsule" && (
                <>
                  <div>
                    <label htmlFor="capsule-radius-r" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Radius (r):
                    </label>
                    <input
                      id="capsule-radius-r"
                      type="text"
                      inputMode="decimal"
                      value={rawCapR2}
                      onChange={(e) => setRawCapR2(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 3"
                    />
                  </div>
                  <div>
                    <label htmlFor="capsule-cylinder-h" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Cylindrical Section Height (h):
                    </label>
                    <input
                      id="capsule-cylinder-h"
                      type="text"
                      inputMode="decimal"
                      value={rawCapH2}
                      onChange={(e) => setRawCapH2(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      placeholder="e.g. 8"
                    />
                  </div>
                </>
              )}

              {cylResult.error && (
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-1.5 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{cylResult.error}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      {cylResult.shapeName} Results
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      {cylResult.formula}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {cylResult.formattedVolume} <span className="text-lg text-blue-600">{cylUnit}³</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Surface Area = {cylResult.formattedSurfaceArea ?? "N/A"} {cylUnit}²
                    {cylResult.wallThickness !== undefined && ` | Wall Thickness = ${cylResult.formattedWallThickness} ${cylUnit}`}
                  </p>
                </div>

                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderShapeSVG(cylResult.shapeName)}
                </div>
              </div>
            </div>
          </div>

          {renderSavedSection(
            "Saved Cylinder Suite Calculations",
            savedCylItems,
            setSavedCylItems,
            "saved_vol_cyl_v2"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: MASTER VOLUME UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <span className="font-extrabold uppercase tracking-wider">Master Volume Unit Converter Matrix</span>
          <div className="flex items-center gap-1.5 print:hidden">
            <button
              type="button"
              onClick={handleCopyConv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKey === "conv" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSVConv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDFConv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveConv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3" />
              <span>{justSavedConv ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <label htmlFor="conv-val-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Volume Value:
              </label>
              <input
                id="conv-val-input"
                type="text"
                inputMode="decimal"
                value={rawConvVal}
                onChange={(e) => setRawConvVal(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                placeholder="e.g. 1"
              />
            </div>

            <div>
              <label htmlFor="conv-unit-select" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Base Length Unit:
              </label>
              <select
                id="conv-unit-select"
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value as LengthUnit)}
                className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
              >
                <option value="m">cubic meters (m³)</option>
                <option value="cm">cubic cm (cm³ / mL)</option>
                <option value="mm">cubic mm (mm³)</option>
                <option value="ft">cubic feet (ft³)</option>
                <option value="in">cubic inches (in³)</option>
                <option value="yd">cubic yards (yd³)</option>
              </select>
            </div>
          </div>

          {/* CONVERSION TABLE */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-blue-600 text-white font-bold font-sans">
                  <th className="p-3">Volume Unit</th>
                  <th className="p-3">Equivalent Converted Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                <tr><td className="p-2.5 font-bold font-sans">Cubic Meters (m³)</td><td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.formatted.cubicMeters}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Liters (L)</td><td className="p-2.5">{convMatrix.formatted.liters}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Milliliters (mL / cc)</td><td className="p-2.5">{convMatrix.formatted.milliliters}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">US Fluid Gallons (gal)</td><td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.formatted.usGallons}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">US Fluid Ounces (fl oz)</td><td className="p-2.5">{convMatrix.formatted.usFluidOunces}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">UK Imperial Gallons (imp gal)</td><td className="p-2.5">{convMatrix.formatted.impGallons}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Cubic Feet (ft³)</td><td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.formatted.cubicFeet}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Cubic Inches (in³)</td><td className="p-2.5">{convMatrix.formatted.cubicInches}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Cubic Yards (yd³)</td><td className="p-2.5">{convMatrix.formatted.cubicYards}</td></tr>
              </tbody>
            </table>
          </div>

          {renderSavedSection(
            "Saved Converter Calculations",
            savedConvItems,
            setSavedConvItems,
            "saved_vol_conv_v2"
          )}
        </div>
      </div>
    </div>
  );
}

export default VolumeCalculator;
