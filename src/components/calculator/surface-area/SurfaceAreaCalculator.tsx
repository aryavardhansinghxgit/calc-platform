"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Copy,
  Check,
  FileSpreadsheet,
  Code,
  AlertTriangle,
  Layers,
  Box,
  Circle,
  Shapes,
  Maximize2
} from "lucide-react";
import {
  computeSphereSurfaceArea,
  computeConeSurfaceArea,
  computeCylinderSurfaceArea,
  computeBoxSurfaceArea,
  computePyramidSurfaceArea,
  computeCapsuleSurfaceArea,
  computeEllipsoidSurfaceArea,
  convertSurfaceAreaUnits,
  convertFromUnitToSqMeters,
  SphereSAResult,
  ConeSAResult,
  CylinderSAResult,
  BoxSAResult,
  PyramidSAResult,
  CapsuleSAResult,
  EllipsoidSAResult
} from "@/app/calculators/surface-area-calculator/surface-area-logic";

export interface SavedSAItem {
  id: string;
  moduleKey: string;
  title: string;
  inputs: string;
  rawInputs: Record<string, string>;
  mode?: string;
  operation: string;
  result: string;
  resultsList: string[];
  latex: string;
  timestamp: string;
}

export function SurfaceAreaCalculator() {
  // Precision state
  const [precision, setPrecision] = useState<number>(4);

  // Card 1: Sphere State
  const [sphereRStr, setSphereRStr] = useState<string>("5");

  // Card 2: Cone State
  const [coneMode, setConeMode] = useState<"right" | "frustum">("right");
  const [coneRStr, setConeRStr] = useState<string>("4");
  const [coneHStr, setConeHStr] = useState<string>("10");
  const [frustTopRStr, setFrustTopRStr] = useState<string>("2");

  // Card 3: Cylinder State
  const [cylMode, setCylMode] = useState<"solid" | "hollow">("solid");
  const [cylRStr, setCylRStr] = useState<string>("4");
  const [cylHStr, setCylHStr] = useState<string>("10");
  const [pipeInnerRStr, setPipeInnerRStr] = useState<string>("2");

  // Card 4: Box / Cube State
  const [boxMode, setBoxMode] = useState<"prism" | "cube">("prism");
  const [boxLStr, setBoxLStr] = useState<string>("6");
  const [boxWStr, setBoxWStr] = useState<string>("4");
  const [boxHStr, setBoxHStr] = useState<string>("5");
  const [cubeAStr, setCubeAStr] = useState<string>("5");

  // Card 5: Pyramid / Tetrahedron State
  const [pyrMode, setPyrMode] = useState<"square" | "tetra">("square");
  const [pyrAStr, setPyrAStr] = useState<string>("6");
  const [pyrHStr, setPyrHStr] = useState<string>("4");

  // Card 6: Capsule State
  const [capRStr, setCapRStr] = useState<string>("3");
  const [capHStr, setCapHStr] = useState<string>("8");

  // Card 7: Ellipsoid State
  const [ellAStr, setEllAStr] = useState<string>("5");
  const [ellBStr, setEllBStr] = useState<string>("4");
  const [ellCStr, setEllCStr] = useState<string>("3");

  // Card 8: Converter State
  const [convValStr, setConvValStr] = useState<string>("100");
  const [convUnit, setConvUnit] = useState<string>("sqMeters");

  // Saved items states
  const [savedSphereItems, setSavedSphereItems] = useState<SavedSAItem[]>([]);
  const [savedConeItems, setSavedConeItems] = useState<SavedSAItem[]>([]);
  const [savedCylItems, setSavedCylItems] = useState<SavedSAItem[]>([]);
  const [savedBoxItems, setSavedBoxItems] = useState<SavedSAItem[]>([]);
  const [savedPyrItems, setSavedPyrItems] = useState<SavedSAItem[]>([]);
  const [savedCapItems, setSavedCapItems] = useState<SavedSAItem[]>([]);
  const [savedEllItems, setSavedEllItems] = useState<SavedSAItem[]>([]);
  const [savedConvItems, setSavedConvItems] = useState<SavedSAItem[]>([]);

  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const showCopyFeedback = (key: string) => {
    setCopyFeedback(key);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    showCopyFeedback(key);
  };

  // Local storage persistence
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_sa_sphere_v2"); if (s1) setSavedSphereItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_sa_cone_v2"); if (s2) setSavedConeItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_sa_cyl_v2"); if (s3) setSavedCylItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_sa_box_v2"); if (s4) setSavedBoxItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_sa_pyr_v2"); if (s5) setSavedPyrItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_sa_cap_v2"); if (s6) setSavedCapItems(JSON.parse(s6));
      const s7 = localStorage.getItem("saved_sa_ell_v2"); if (s7) setSavedEllItems(JSON.parse(s7));
      const s8 = localStorage.getItem("saved_sa_conv_v2"); if (s8) setSavedConvItems(JSON.parse(s8));
    } catch (e) {}
  }, []);

  // Validation helpers
  const parsePos = (str: string): number | null => {
    const val = parseFloat(str);
    return !isNaN(val) && isFinite(val) && val > 0 ? val : null;
  };

  // Card 1: Sphere computation
  const sphereR = parsePos(sphereRStr);
  const sphereError = sphereR === null ? "Radius must be a positive number." : null;
  const resultSphere: SphereSAResult | null = useMemo(() => {
    if (sphereR === null) return null;
    return computeSphereSurfaceArea(sphereR, precision);
  }, [sphereR, precision]);

  // Card 2: Cone computation
  const coneR = parsePos(coneRStr);
  const coneH = parsePos(coneHStr);
  const frustTopR = parsePos(frustTopRStr);

  const coneError = useMemo(() => {
    if (coneR === null) return "Base radius must be a positive number.";
    if (coneH === null) return "Height must be a positive number.";
    if (coneMode === "frustum") {
      if (frustTopR === null) return "Top radius must be a positive number.";
      if (coneR <= frustTopR) return "Bottom radius R must be strictly greater than top radius r (R > r).";
    }
    return null;
  }, [coneR, coneH, coneMode, frustTopR]);

  const resultCone: ConeSAResult | null = useMemo(() => {
    if (coneError || coneR === null || coneH === null) return null;
    return computeConeSurfaceArea(coneR, coneH, coneMode === "frustum", frustTopR || 0, precision);
  }, [coneR, coneH, coneMode, frustTopR, coneError, precision]);

  // Card 3: Cylinder computation
  const cylR = parsePos(cylRStr);
  const cylH = parsePos(cylHStr);
  const pipeInnerR = parsePos(pipeInnerRStr);

  const cylError = useMemo(() => {
    if (cylR === null) return "Outer radius must be a positive number.";
    if (cylH === null) return "Height must be a positive number.";
    if (cylMode === "hollow") {
      if (pipeInnerR === null) return "Inner radius must be a positive number.";
      if (cylR <= pipeInnerR) return "Outer radius R must be strictly greater than inner radius r (R > r).";
    }
    return null;
  }, [cylR, cylH, cylMode, pipeInnerR]);

  const resultCyl: CylinderSAResult | null = useMemo(() => {
    if (cylError || cylR === null || cylH === null) return null;
    return computeCylinderSurfaceArea(cylR, cylH, cylMode === "hollow", pipeInnerR || 0, precision);
  }, [cylR, cylH, cylMode, pipeInnerR, cylError, precision]);

  // Card 4: Box / Cube computation
  const boxL = parsePos(boxLStr);
  const boxW = parsePos(boxWStr);
  const boxH = parsePos(boxHStr);
  const cubeA = parsePos(cubeAStr);

  const boxError = useMemo(() => {
    if (boxMode === "cube") {
      if (cubeA === null) return "Cube side length must be a positive number.";
    } else {
      if (boxL === null) return "Length must be a positive number.";
      if (boxW === null) return "Width must be a positive number.";
      if (boxH === null) return "Height must be a positive number.";
    }
    return null;
  }, [boxMode, cubeA, boxL, boxW, boxH]);

  const resultBox: BoxSAResult | null = useMemo(() => {
    if (boxError) return null;
    if (boxMode === "cube") {
      return computeBoxSurfaceArea(cubeA!, cubeA!, cubeA!, true, precision);
    }
    return computeBoxSurfaceArea(boxL!, boxW!, boxH!, false, precision);
  }, [boxMode, cubeA, boxL, boxW, boxH, boxError, precision]);

  // Card 5: Pyramid computation
  const pyrA = parsePos(pyrAStr);
  const pyrH = parsePos(pyrHStr);

  const pyrError = useMemo(() => {
    if (pyrA === null) return "Base edge length must be a positive number.";
    if (pyrMode === "square" && pyrH === null) return "Vertical height must be a positive number.";
    return null;
  }, [pyrA, pyrH, pyrMode]);

  const resultPyr: PyramidSAResult | null = useMemo(() => {
    if (pyrError || pyrA === null) return null;
    return computePyramidSurfaceArea(pyrA, pyrH || 0, pyrMode === "tetra", precision);
  }, [pyrA, pyrH, pyrMode, pyrError, precision]);

  // Card 6: Capsule computation
  const capR = parsePos(capRStr);
  const capH = parsePos(capHStr);

  const capError = useMemo(() => {
    if (capR === null) return "Radius must be a positive number.";
    if (capH === null) return "Cylindrical section height must be a positive number.";
    return null;
  }, [capR, capH]);

  const resultCap: CapsuleSAResult | null = useMemo(() => {
    if (capError || capR === null || capH === null) return null;
    return computeCapsuleSurfaceArea(capR, capH, precision);
  }, [capR, capH, capError, precision]);

  // Card 7: Ellipsoid computation
  const ellA = parsePos(ellAStr);
  const ellB = parsePos(ellBStr);
  const ellC = parsePos(ellCStr);

  const ellError = useMemo(() => {
    if (ellA === null || ellB === null || ellC === null) return "Semi-axes a, b, and c must all be positive numbers.";
    return null;
  }, [ellA, ellB, ellC]);

  const resultEll: EllipsoidSAResult | null = useMemo(() => {
    if (ellError || ellA === null || ellB === null || ellC === null) return null;
    return computeEllipsoidSurfaceArea(ellA, ellB, ellC, precision);
  }, [ellA, ellB, ellC, ellError, precision]);

  // Card 8: Converter computation
  const convVal = parsePos(convValStr);
  const convError = convVal === null ? "Area value must be a positive number." : null;
  const resultConv = useMemo(() => {
    if (convVal === null) return null;
    const m2 = convertFromUnitToSqMeters(convVal, convUnit);
    return convertSurfaceAreaUnits(m2, precision);
  }, [convVal, convUnit, precision]);

  // CSV Export utility
  const exportToCSV = (filename: string, rows: (string | number)[][]) => {
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Handlers
  const handleSaveSphere = () => {
    if (!resultSphere || sphereR === null) return;
    const inputsStr = `Radius r = ${sphereRStr}`;
    const resList = [
      `Total Surface Area A = ${resultSphere.totalArea} (${resultSphere.exactPi})`,
      `Curved Hemisphere SA = ${resultSphere.curvedHemisphereArea}`,
      `Closed Hemisphere Total SA = ${resultSphere.closedHemisphereArea}`,
      `Full Sphere Volume = ${resultSphere.sphereVolume}`,
      `Hemisphere Volume = ${resultSphere.hemisphereVolume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "sphere",
      title: `Sphere SA = ${resultSphere.totalArea}`,
      inputs: inputsStr,
      rawInputs: { sphereRStr },
      operation: "Sphere & Hemisphere",
      result: resList.join(" | "),
      resultsList: resList,
      latex: `A = 4\\pi r^2 = 4\\pi (${sphereRStr})^2 = ${resultSphere.totalArea}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSphereItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSphereItems(updated);
    try { localStorage.setItem("saved_sa_sphere_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("sphere"); setTimeout(() => setJustSaved(null), 2000);
  };

  const handleSaveCone = () => {
    if (!resultCone) return;
    const inputsStr = coneMode === "right"
      ? `Radius r = ${coneRStr}, Height h = ${coneHStr}`
      : `Bottom R = ${coneRStr}, Top r = ${frustTopRStr}, Height h = ${coneHStr}`;
    const resList = [
      `Total Surface Area A = ${resultCone.totalArea}`,
      `Curved Lateral Area = ${resultCone.lateralArea}`,
      `Base Area = ${resultCone.baseArea}`,
      `Slant Height s = ${resultCone.slantHeight}`,
      `Volume = ${resultCone.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "cone",
      title: `${coneMode === "right" ? "Cone" : "Frustum"} SA = ${resultCone.totalArea}`,
      inputs: inputsStr,
      rawInputs: { coneRStr, coneHStr, frustTopRStr },
      mode: coneMode,
      operation: coneMode === "right" ? "Right Cone" : "Conical Frustum",
      result: resList.join(" | "),
      resultsList: resList,
      latex: coneMode === "right" ? `A = \\pi r(r + s) = ${resultCone.totalArea}` : `A = \\pi(R + r)s + \\pi R^2 + \\pi r^2 = ${resultCone.totalArea}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConeItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConeItems(updated);
    try { localStorage.setItem("saved_sa_cone_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("cone"); setTimeout(() => setJustSaved(null), 2000);
  };

  const handleSaveCyl = () => {
    if (!resultCyl) return;
    const inputsStr = cylMode === "solid"
      ? `Radius r = ${cylRStr}, Height h = ${cylHStr}`
      : `Outer R = ${cylRStr}, Inner r = ${pipeInnerRStr}, Height h = ${cylHStr}`;
    const resList = [
      `Total Surface Area A = ${resultCyl.totalArea}`,
      `Curved Lateral Area = ${resultCyl.lateralArea}`,
      `End Bases Area = ${resultCyl.baseArea}`,
      `Volume = ${resultCyl.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "cyl",
      title: `${cylMode === "solid" ? "Cylinder" : "Hollow Pipe"} SA = ${resultCyl.totalArea}`,
      inputs: inputsStr,
      rawInputs: { cylRStr, cylHStr, pipeInnerRStr },
      mode: cylMode,
      operation: cylMode === "solid" ? "Solid Cylinder" : "Hollow Pipe",
      result: resList.join(" | "),
      resultsList: resList,
      latex: cylMode === "solid" ? `A = 2\\pi r(r + h) = ${resultCyl.totalArea}` : `A = 2\\pi Rh + 2\\pi rh + 2\\pi(R^2 - r^2) = ${resultCyl.totalArea}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCylItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCylItems(updated);
    try { localStorage.setItem("saved_sa_cyl_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("cyl"); setTimeout(() => setJustSaved(null), 2000);
  };

  const handleSaveBox = () => {
    if (!resultBox) return;
    const inputsStr = boxMode === "cube"
      ? `Cube Side a = ${cubeAStr}`
      : `Length l = ${boxLStr}, Width w = ${boxWStr}, Height h = ${boxHStr}`;
    const resList = [
      `Total Surface Area A = ${resultBox.totalArea}`,
      `Open-Top Area = ${resultBox.openTopArea}`,
      `Lateral Walls = ${resultBox.lateralArea}`,
      `Volume = ${resultBox.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "box",
      title: `${boxMode === "cube" ? "Cube" : "Prism"} SA = ${resultBox.totalArea}`,
      inputs: inputsStr,
      rawInputs: { boxLStr, boxWStr, boxHStr, cubeAStr },
      mode: boxMode,
      operation: boxMode === "cube" ? "Cube" : "Rectangular Prism",
      result: resList.join(" | "),
      resultsList: resList,
      latex: boxMode === "cube" ? `A = 6a^2 = ${resultBox.totalArea}` : `A = 2(lw + lh + wh) = ${resultBox.totalArea}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedBoxItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedBoxItems(updated);
    try { localStorage.setItem("saved_sa_box_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("box"); setTimeout(() => setJustSaved(null), 2000);
  };

  const handleSavePyr = () => {
    if (!resultPyr) return;
    const inputsStr = pyrMode === "square"
      ? `Base Edge a = ${pyrAStr}, Height h = ${pyrHStr}`
      : `Tetrahedron Edge a = ${pyrAStr}`;
    const resList = [
      `Total Surface Area A = ${resultPyr.totalArea}`,
      `Lateral Area = ${resultPyr.lateralArea}`,
      `Base Area = ${resultPyr.baseArea}`,
      `Slant Height = ${resultPyr.slantHeight}`,
      `Volume = ${resultPyr.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "pyr",
      title: `${pyrMode === "square" ? "Square Pyramid" : "Tetrahedron"} SA = ${resultPyr.totalArea}`,
      inputs: inputsStr,
      rawInputs: { pyrAStr, pyrHStr },
      mode: pyrMode,
      operation: pyrMode === "square" ? "Square Pyramid" : "Regular Tetrahedron",
      result: resList.join(" | "),
      resultsList: resList,
      latex: pyrMode === "square" ? `A = a^2 + 2as = ${resultPyr.totalArea}` : `A = \\sqrt{3}a^2 = ${resultPyr.totalArea}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPyrItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPyrItems(updated);
    try { localStorage.setItem("saved_sa_pyr_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("pyr"); setTimeout(() => setJustSaved(null), 2000);
  };

  const handleSaveCap = () => {
    if (!resultCap) return;
    const inputsStr = `Radius r = ${capRStr}, Height h = ${capHStr}`;
    const resList = [
      `Total Surface Area A = ${resultCap.totalArea}`,
      `Total Capsule Length L = ${resultCap.totalLength}`,
      `Hemispherical Ends SA = ${resultCap.sphereEndsArea}`,
      `Cylindrical Side Area = ${resultCap.cylinderLateralArea}`,
      `Volume = ${resultCap.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "cap",
      title: `Capsule SA = ${resultCap.totalArea}`,
      inputs: inputsStr,
      rawInputs: { capRStr, capHStr },
      operation: "Capsule Surface Area",
      result: resList.join(" | "),
      resultsList: resList,
      latex: `A = 2\\pi r(2r + h) = ${resultCap.totalArea}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCapItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCapItems(updated);
    try { localStorage.setItem("saved_sa_cap_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("cap"); setTimeout(() => setJustSaved(null), 2000);
  };

  const handleSaveEll = () => {
    if (!resultEll) return;
    const inputsStr = `Semi-axes a = ${ellAStr}, b = ${ellBStr}, c = ${ellCStr}`;
    const resList = [
      `Approximate Surface Area A ≈ ${resultEll.surfaceArea}`,
      `Volume V = ${resultEll.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "ell",
      title: `Ellipsoid SA ≈ ${resultEll.surfaceArea}`,
      inputs: inputsStr,
      rawInputs: { ellAStr, ellBStr, ellCStr },
      operation: "Ellipsoid (Knud Thomsen)",
      result: resList.join(" | "),
      resultsList: resList,
      latex: `A \\approx 4\\pi \\left(\\frac{(ab)^p + (ac)^p + (bc)^p}{3}\\right)^{1/p} \\approx ${resultEll.surfaceArea}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedEllItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedEllItems(updated);
    try { localStorage.setItem("saved_sa_ell_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("ell"); setTimeout(() => setJustSaved(null), 2000);
  };

  const handleSaveConv = () => {
    if (!resultConv) return;
    const inputsStr = `Area = ${convValStr} ${convUnit}`;
    const resList = [
      `${resultConv.sqMeters} m²`,
      `${resultConv.sqFeet} ft²`,
      `${resultConv.sqInches} in²`,
      `${resultConv.sqYards} yd²`,
      `${resultConv.acres} acres`,
      `${resultConv.hectares} ha`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      moduleKey: "conv",
      title: `Converted = ${resultConv.sqMeters} m²`,
      inputs: inputsStr,
      rawInputs: { convValStr, convUnit },
      operation: "Unit Conversion Matrix",
      result: resList.join(" | "),
      resultsList: resList,
      latex: `${convValStr}\\text{ ${convUnit}} = ${resultConv.sqMeters}\\text{ m}^2`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_sa_conv_v2", JSON.stringify(updated)); } catch (e) {}
    setJustSaved("conv"); setTimeout(() => setJustSaved(null), 2000);
  };

  // Restore Handlers
  const handleRestoreItem = (item: SavedSAItem) => {
    if (item.moduleKey === "sphere") {
      if (item.rawInputs.sphereRStr) setSphereRStr(item.rawInputs.sphereRStr);
    } else if (item.moduleKey === "cone") {
      if (item.mode) setConeMode(item.mode as any);
      if (item.rawInputs.coneRStr) setConeRStr(item.rawInputs.coneRStr);
      if (item.rawInputs.coneHStr) setConeHStr(item.rawInputs.coneHStr);
      if (item.rawInputs.frustTopRStr) setFrustTopRStr(item.rawInputs.frustTopRStr);
    } else if (item.moduleKey === "cyl") {
      if (item.mode) setCylMode(item.mode as any);
      if (item.rawInputs.cylRStr) setCylRStr(item.rawInputs.cylRStr);
      if (item.rawInputs.cylHStr) setCylHStr(item.rawInputs.cylHStr);
      if (item.rawInputs.pipeInnerRStr) setPipeInnerRStr(item.rawInputs.pipeInnerRStr);
    } else if (item.moduleKey === "box") {
      if (item.mode) setBoxMode(item.mode as any);
      if (item.rawInputs.boxLStr) setBoxLStr(item.rawInputs.boxLStr);
      if (item.rawInputs.boxWStr) setBoxWStr(item.rawInputs.boxWStr);
      if (item.rawInputs.boxHStr) setBoxHStr(item.rawInputs.boxHStr);
      if (item.rawInputs.cubeAStr) setCubeAStr(item.rawInputs.cubeAStr);
    } else if (item.moduleKey === "pyr") {
      if (item.mode) setPyrMode(item.mode as any);
      if (item.rawInputs.pyrAStr) setPyrAStr(item.rawInputs.pyrAStr);
      if (item.rawInputs.pyrHStr) setPyrHStr(item.rawInputs.pyrHStr);
    } else if (item.moduleKey === "cap") {
      if (item.rawInputs.capRStr) setCapRStr(item.rawInputs.capRStr);
      if (item.rawInputs.capHStr) setCapHStr(item.rawInputs.capHStr);
    } else if (item.moduleKey === "ell") {
      if (item.rawInputs.ellAStr) setEllAStr(item.rawInputs.ellAStr);
      if (item.rawInputs.ellBStr) setEllBStr(item.rawInputs.ellBStr);
      if (item.rawInputs.ellCStr) setEllCStr(item.rawInputs.ellCStr);
    } else if (item.moduleKey === "conv") {
      if (item.rawInputs.convValStr) setConvValStr(item.rawInputs.convValStr);
      if (item.rawInputs.convUnit) setConvUnit(item.rawInputs.convUnit);
    }
  };

  // Dynamic Reactive SVG Renderers
  const renderSphereSVG = (rVal: number | null) => {
    const width = 240; const height = 180;
    const r = rVal ? Math.min(68, Math.max(20, 20 + Math.log10(Math.max(1, rVal)) * 25)) : 55;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44 select-none" aria-label="Sphere geometric diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx="120" cy="90" r={r} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2.5" />
        <ellipse cx="120" cy="90" rx={r} ry={r * 0.35} fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="120" cy="90" r="3" fill="#1d4ed8" />
        <line x1="120" y1="90" x2={120 + r} y2="90" stroke="#dc2626" strokeWidth="2" />
        <text x={120 + r / 2} y="85" textAnchor="middle" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">
          r = {rVal ?? "?"}
        </text>
        <text x="120" y="24" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
          A = 4πr²
        </text>
      </svg>
    );
  };

  const renderConeSVG = (rVal: number | null, hVal: number | null, mode: "right" | "frustum", topRVal: number | null) => {
    const width = 240; const height = 180;
    const isFrust = mode === "frustum";
    const baseR = rVal ? Math.min(65, Math.max(25, 25 + Math.log10(Math.max(1, rVal)) * 20)) : 50;
    const topR = isFrust && topRVal ? Math.min(baseR - 5, Math.max(10, 10 + Math.log10(Math.max(1, topRVal)) * 18)) : 0;
    const coneH = hVal ? Math.min(105, Math.max(35, 35 + Math.log10(Math.max(1, hVal)) * 35)) : 80;

    const botY = 145;
    const topY = botY - coneH;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44 select-none" aria-label="Cone geometric diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Base Ellipse */}
        <ellipse cx="120" cy={botY} rx={baseR} ry={baseR * 0.3} fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
        {isFrust && topR > 0 ? (
          <>
            {/* Top Ellipse */}
            <ellipse cx="120" cy={topY} rx={topR} ry={topR * 0.3} fill="#3b82f6" fillOpacity="0.3" stroke="#2563eb" strokeWidth="2" />
            <line x1={120 - baseR} y1={botY} x2={120 - topR} y2={topY} stroke="#2563eb" strokeWidth="2" />
            <line x1={120 + baseR} y1={botY} x2={120 + topR} y2={topY} stroke="#2563eb" strokeWidth="2" />
            <line x1="120" y1={topY} x2="120" y2={botY} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="125" y={(topY + botY) / 2} className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h = {hVal ?? "?"}</text>
            <text x={120 + (baseR + topR) / 2 + 8} y={(topY + botY) / 2} className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">s</text>
            <text x="120" y={topY - 6} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-600 dark:fill-blue-400">top r = {topRVal ?? "?"}</text>
            <text x="120" y={botY + 16} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-600 dark:fill-blue-400">base R = {rVal ?? "?"}</text>
          </>
        ) : (
          <>
            <line x1={120 - baseR} y1={botY} x2="120" y2={topY} stroke="#2563eb" strokeWidth="2.5" />
            <line x1={120 + baseR} y1={botY} x2="120" y2={topY} stroke="#2563eb" strokeWidth="2.5" />
            <line x1="120" y1={topY} x2="120" y2={botY} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="125" y={(topY + botY) / 2} className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h = {hVal ?? "?"}</text>
            <text x={120 + baseR / 2 + 8} y={(topY + botY) / 2} className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">s</text>
            <text x="120" y={botY + 16} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">r = {rVal ?? "?"}</text>
          </>
        )}
      </svg>
    );
  };

  const renderCylinderSVG = (rVal: number | null, hVal: number | null, mode: "solid" | "hollow", innerRVal: number | null) => {
    const width = 240; const height = 180;
    const isHollow = mode === "hollow";
    const outerR = rVal ? Math.min(65, Math.max(25, 25 + Math.log10(Math.max(1, rVal)) * 20)) : 50;
    const innerR = isHollow && innerRVal ? Math.min(outerR - 6, Math.max(10, 10 + Math.log10(Math.max(1, innerRVal)) * 18)) : 0;
    const cylH = hVal ? Math.min(95, Math.max(30, 30 + Math.log10(Math.max(1, hVal)) * 30)) : 75;

    const topY = 90 - cylH / 2;
    const botY = 90 + cylH / 2;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44 select-none" aria-label="Cylinder geometric diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Bottom Ellipse */}
        <ellipse cx="120" cy={botY} rx={outerR} ry={outerR * 0.28} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        {/* Top Ellipse */}
        <ellipse cx="120" cy={topY} rx={outerR} ry={outerR * 0.28} fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2" />
        {/* Sides */}
        <line x1={120 - outerR} y1={topY} x2={120 - outerR} y2={botY} stroke="#2563eb" strokeWidth="2.5" />
        <line x1={120 + outerR} y1={topY} x2={120 + outerR} y2={botY} stroke="#2563eb" strokeWidth="2.5" />

        {isHollow && innerR > 0 && (
          <>
            <ellipse cx="120" cy={topY} rx={innerR} ry={innerR * 0.28} fill="#ffffff" className="dark:fill-slate-900" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="120" y={topY + 3} textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">inner r</text>
          </>
        )}

        <line x1={120 + outerR + 8} y1={topY} x2={120 + outerR + 8} y2={botY} stroke="#64748b" strokeWidth="1.5" />
        <text x={120 + outerR + 12} y="94" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">h = {hVal ?? "?"}</text>
        <text x="120" y={botY + 16} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
          {isHollow ? `R = ${rVal ?? "?"}, r = ${innerRVal ?? "?"}` : `r = ${rVal ?? "?"}`}
        </text>
      </svg>
    );
  };

  const renderBoxSVG = (lVal: number | null, wVal: number | null, hVal: number | null, isCube: boolean, sideA: number | null) => {
    const width = 240; const height = 180;
    const l = isCube ? (sideA ? Math.min(65, 30 + Math.log10(Math.max(1, sideA)) * 20) : 45) : (lVal ? Math.min(80, 25 + Math.log10(Math.max(1, lVal)) * 25) : 55);
    const w = isCube ? l * 0.6 : (wVal ? Math.min(45, 15 + Math.log10(Math.max(1, wVal)) * 15) : 30);
    const h = isCube ? l : (hVal ? Math.min(70, 20 + Math.log10(Math.max(1, hVal)) * 25) : 45);

    const x0 = 120 - l / 2 - w * 0.4;
    const y0 = 90 + h / 2;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44 select-none" aria-label="Box geometric diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Front Face */}
        <polygon points={`${x0},${y0} ${x0 + l},${y0} ${x0 + l},${y0 - h} ${x0},${y0 - h}`} fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2" />
        {/* Top Face */}
        <polygon points={`${x0},${y0 - h} ${x0 + l},${y0 - h} ${x0 + l + w},${y0 - h - w * 0.5} ${x0 + w},${y0 - h - w * 0.5}`} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        {/* Right Face */}
        <polygon points={`${x0 + l},${y0} ${x0 + l + w},${y0 - w * 0.5} ${x0 + l + w},${y0 - h - w * 0.5} ${x0 + l},${y0 - h}`} fill="#3b82f6" fillOpacity="0.35" stroke="#2563eb" strokeWidth="2" />

        <text x={x0 + l / 2} y={y0 + 14} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
          {isCube ? `a = ${sideA ?? "?"}` : `l = ${lVal ?? "?"}`}
        </text>
        {!isCube && (
          <>
            <text x={x0 + l + w * 0.5 + 6} y={y0 - w * 0.25 + 10} className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">w = {wVal ?? "?"}</text>
            <text x={x0 - 8} y={y0 - h / 2} textAnchor="end" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h = {hVal ?? "?"}</text>
          </>
        )}
      </svg>
    );
  };

  const renderPyramidSVG = (aVal: number | null, hVal: number | null, isTetra: boolean) => {
    const width = 240; const height = 180;
    const a = aVal ? Math.min(80, 30 + Math.log10(Math.max(1, aVal)) * 25) : 55;
    const h = isTetra ? a * 0.82 : (hVal ? Math.min(90, 25 + Math.log10(Math.max(1, hVal)) * 30) : 65);

    const cx = 120;
    const botY = 145;
    const apexY = botY - h;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44 select-none" aria-label="Pyramid geometric diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {isTetra ? (
          <>
            <polygon points={`${cx - a * 0.6},${botY} ${cx + a * 0.6},${botY} ${cx},${botY - a * 0.35}`} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
            <line x1={cx - a * 0.6} y1={botY} x2={cx} y2={apexY} stroke="#2563eb" strokeWidth="2.5" />
            <line x1={cx + a * 0.6} y1={botY} x2={cx} y2={apexY} stroke="#2563eb" strokeWidth="2.5" />
            <line x1={cx} y1={botY - a * 0.35} x2={cx} y2={apexY} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x={cx} y={botY + 14} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">Edge a = {aVal ?? "?"}</text>
          </>
        ) : (
          <>
            {/* Base */}
            <polygon points={`${cx - a * 0.6},${botY} ${cx + a * 0.2},${botY} ${cx + a * 0.6},${botY - 20} ${cx - a * 0.2},${botY - 20}`} fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
            {/* Apex to corners */}
            <line x1={cx - a * 0.6} y1={botY} x2={cx} y2={apexY} stroke="#2563eb" strokeWidth="2.5" />
            <line x1={cx + a * 0.2} y1={botY} x2={cx} y2={apexY} stroke="#2563eb" strokeWidth="2.5" />
            <line x1={cx + a * 0.6} y1={botY - 20} x2={cx} y2={apexY} stroke="#2563eb" strokeWidth="2.5" />
            <line x1={cx - a * 0.2} y1={botY - 20} x2={cx} y2={apexY} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />
            {/* Height line */}
            <line x1={cx} y1={apexY} x2={cx} y2={botY - 10} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x={cx + 6} y={(apexY + botY) / 2} className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h = {hVal ?? "?"}</text>
            <text x={cx - a * 0.2} y={botY + 14} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">a = {aVal ?? "?"}</text>
          </>
        )}
      </svg>
    );
  };

  const renderCapsuleSVG = (rVal: number | null, hVal: number | null) => {
    const width = 240; const height = 180;
    const r = rVal ? Math.min(38, Math.max(16, 16 + Math.log10(Math.max(1, rVal)) * 14)) : 26;
    const h = hVal ? Math.min(85, Math.max(25, 25 + Math.log10(Math.max(1, hVal)) * 28)) : 60;

    const leftX = 120 - h / 2;
    const rightX = 120 + h / 2;
    const cy = 90;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44 select-none" aria-label="Capsule geometric diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Left Hemispherical End */}
        <path d={`M ${leftX} ${cy - r} A ${r} ${r} 0 0 0 ${leftX} ${cy + r}`} fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2" />
        {/* Right Hemispherical End */}
        <path d={`M ${rightX} ${cy - r} A ${r} ${r} 0 0 1 ${rightX} ${cy + r}`} fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2" />
        {/* Cylinder Body */}
        <rect x={leftX} y={cy - r} width={h} height={2 * r} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />

        {/* Separator lines */}
        <line x1={leftX} y1={cy - r} x2={leftX} y2={cy + r} stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1={rightX} y1={cy - r} x2={rightX} y2={cy + r} stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />

        <text x="120" y={cy + 4} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">h = {hVal ?? "?"}</text>
        <text x={rightX + r / 2 + 2} y={cy + 4} className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">r = {rVal ?? "?"}</text>
        <text x="120" y="24" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
          Total Length L = h + 2r
        </text>
      </svg>
    );
  };

  const renderEllipsoidSVG = (aVal: number | null, bVal: number | null, cVal: number | null) => {
    const width = 240; const height = 180;
    const rx = aVal ? Math.min(75, Math.max(25, 25 + Math.log10(Math.max(1, aVal)) * 25)) : 60;
    const ry = bVal ? Math.min(50, Math.max(18, 18 + Math.log10(Math.max(1, bVal)) * 18)) : 40;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44 select-none" aria-label="Ellipsoid geometric diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <ellipse cx="120" cy="90" rx={rx} ry={ry} fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />
        <ellipse cx="120" cy="90" rx={rx} ry={ry * 0.35} fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="120" cy="90" r="3" fill="#1d4ed8" />
        <line x1="120" y1="90" x2={120 + rx} y2="90" stroke="#dc2626" strokeWidth="2" />
        <line x1="120" y1="90" x2="120" y2={90 - ry} stroke="#059669" strokeWidth="2" />

        <text x={120 + rx / 2} y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">a = {aVal ?? "?"}</text>
        <text x="126" y={90 - ry / 2} className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">b = {bVal ?? "?"}</text>
        <text x="120" y="24" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
          Knud Thomsen Formula (p = 1.6075)
        </text>
      </svg>
    );
  };

  // Reusable Saved Card Component with dedicated RESTORE / LOAD
  const renderSavedCardsGroup = (
    title: string,
    items: SavedSAItem[],
    onClear: () => void,
    onDelete: (id: string) => void
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span>{title} ({items.length})</span>
          </h3>
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => {
            const isExpanded = !!expandedIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleRestoreItem(item)}
                      className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                      title="Restore / Load inputs into calculator"
                      aria-label="Restore calculation inputs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                      title="Delete saved calculation"
                      aria-label="Delete saved calculation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                  <div>
                    <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                  </button>

                  {isExpanded && (
                    <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                        Calculation Details:
                      </span>
                      <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                        {item.resultsList.map((resLine, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                            {resLine}
                          </div>
                        ))}
                      </div>
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
      {/* GLOBAL UTILITY BAR: PRECISION & EXPORT */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="global-precision" className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Decimal Precision:
          </label>
          <select
            id="global-precision"
            value={precision}
            onChange={(e) => setPrecision(Number(e.target.value))}
            className="h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
          >
            <option value={2}>2 decimal places</option>
            <option value={4}>4 decimal places</option>
            <option value={6}>6 decimal places</option>
          </select>
        </div>

        <div className="text-xs font-medium text-slate-500">
          Interactive 3D Solids Suite: Select shapes below to calculate surface areas with step-by-step formulas.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: SPHERE & HEMISPHERE MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Circle className="w-3.5 h-3.5" /> Sphere &amp; Hemisphere Surface Area Module</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => resultSphere && copyToClipboard(`Sphere Total SA = ${resultSphere.totalArea} (${resultSphere.exactPi})\nCurved Hemisphere SA = ${resultSphere.curvedHemisphereArea}\nClosed Hemisphere Total SA = ${resultSphere.closedHemisphereArea}\nFull Sphere Volume = ${resultSphere.sphereVolume}\nHemisphere Volume = ${resultSphere.hemisphereVolume}`, "sphere-sum")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy Summary"
            >
              {copyFeedback === "sphere-sum" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copyFeedback === "sphere-sum" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(`A = 4\\pi r^2 = 4\\pi (${sphereRStr})^2 = ${resultSphere?.totalArea}`, "sphere-latex")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy LaTeX"
            >
              <Code className="w-3 h-3" />
              <span>{copyFeedback === "sphere-latex" ? "Copied LaTeX!" : "LaTeX"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveSphere}
              disabled={!resultSphere}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "sphere" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label htmlFor="sphere-r" className="font-bold block mb-1">Radius (r):</label>
                <input
                  id="sphere-r"
                  type="text"
                  value={sphereRStr}
                  onChange={(e) => setSphereRStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 5"
                />
              </div>

              {sphereError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{sphereError}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Total Sphere Surface Area (4πr²)</span>
              {resultSphere ? (
                <>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {resultSphere.totalArea} <span className="text-base text-blue-600">({resultSphere.exactPi})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Curved Hemisphere SA (2πr²):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultSphere.curvedHemisphereArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Closed Hemisphere Total SA (3πr²):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultSphere.closedHemisphereArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Full Sphere Volume (⁴/₃πr³):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultSphere.sphereVolume}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Hemisphere Volume (⅔πr³):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultSphere.hemisphereVolume}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-slate-400 py-4">Enter a valid positive radius to calculate.</div>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderSphereSVG(sphereR)}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Sphere Calculations", savedSphereItems, () => setSavedSphereItems([]), (id) => setSavedSphereItems(savedSphereItems.filter(i => i.id !== id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: CONE & CONICAL FRUSTUM MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Shapes className="w-3.5 h-3.5" /> Cone &amp; Conical Frustum Surface Area Module</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => resultCone && copyToClipboard(`Cone Total SA = ${resultCone.totalArea}\nLateral Area = ${resultCone.lateralArea}\nBase Area = ${resultCone.baseArea}\nSlant Height = ${resultCone.slantHeight}\nVolume = ${resultCone.volume}`, "cone-sum")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copyFeedback === "cone-sum" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copyFeedback === "cone-sum" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(coneMode === "right" ? `A = \\pi r(r + s) = ${resultCone?.totalArea}` : `A = \\pi(R + r)s + \\pi R^2 + \\pi r^2 = ${resultCone?.totalArea}`, "cone-latex")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3 h-3" />
              <span>LaTeX</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCone}
              disabled={!resultCone}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "cone" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Mode Selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setConeMode("right")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                coneMode === "right"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Right Cone (r, h)
            </button>
            <button
              type="button"
              onClick={() => setConeMode("frustum")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                coneMode === "frustum"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Conical Frustum (R, r, h)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label htmlFor="cone-r" className="font-bold block mb-1">
                  {coneMode === "right" ? "Base Radius (r):" : "Bottom Base Radius (R):"}
                </label>
                <input
                  id="cone-r"
                  type="text"
                  value={coneRStr}
                  onChange={(e) => setConeRStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 4"
                />
              </div>

              {coneMode === "frustum" && (
                <div>
                  <label htmlFor="cone-top-r" className="font-bold block mb-1">Top Radius (r):</label>
                  <input
                    id="cone-top-r"
                    type="text"
                    value={frustTopRStr}
                    onChange={(e) => setFrustTopRStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    placeholder="e.g. 2"
                  />
                </div>
              )}

              <div>
                <label htmlFor="cone-h" className="font-bold block mb-1">Height (h):</label>
                <input
                  id="cone-h"
                  type="text"
                  value={coneHStr}
                  onChange={(e) => setConeHStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 10"
                />
              </div>

              {coneError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{coneError}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">
                {coneMode === "right" ? "Total Surface Area (πr(r + s))" : "Frustum Total Surface Area (π(R + r)s + πR² + πr²)"}
              </span>
              {resultCone ? (
                <>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {resultCone.totalArea}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Lateral Area:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCone.lateralArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">{coneMode === "frustum" ? "Total Bases Area:" : "Base Area:"}</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCone.baseArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Slant Height s:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCone.slantHeight}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Volume:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCone.volume}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-slate-400 py-4">Enter valid positive dimensions to calculate.</div>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderConeSVG(coneR, coneH, coneMode, frustTopR)}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Cone Calculations", savedConeItems, () => setSavedConeItems([]), (id) => setSavedConeItems(savedConeItems.filter(i => i.id !== id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: CYLINDER & TUBE / HOLLOW PIPE MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Cylinder &amp; Tube / Hollow Pipe Module</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => resultCyl && copyToClipboard(`Cylinder Total SA = ${resultCyl.totalArea}\nLateral Area = ${resultCyl.lateralArea}\nBases Area = ${resultCyl.baseArea}\nVolume = ${resultCyl.volume}`, "cyl-sum")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copyFeedback === "cyl-sum" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copyFeedback === "cyl-sum" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(cylMode === "solid" ? `A = 2\\pi r(r + h) = ${resultCyl?.totalArea}` : `A = 2\\pi Rh + 2\\pi rh + 2\\pi(R^2 - r^2) = ${resultCyl?.totalArea}`, "cyl-latex")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3 h-3" />
              <span>LaTeX</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCyl}
              disabled={!resultCyl}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "cyl" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCylMode("solid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                cylMode === "solid"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Solid Cylinder
            </button>
            <button
              type="button"
              onClick={() => setCylMode("hollow")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                cylMode === "hollow"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Hollow Pipe / Tube
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label htmlFor="cyl-r" className="font-bold block mb-1">
                  {cylMode === "solid" ? "Radius (r):" : "Outer Radius (R):"}
                </label>
                <input
                  id="cyl-r"
                  type="text"
                  value={cylRStr}
                  onChange={(e) => setCylRStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 4"
                />
              </div>

              {cylMode === "hollow" && (
                <div>
                  <label htmlFor="cyl-inner-r" className="font-bold block mb-1">Inner Radius (r):</label>
                  <input
                    id="cyl-inner-r"
                    type="text"
                    value={pipeInnerRStr}
                    onChange={(e) => setPipeInnerRStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    placeholder="e.g. 2"
                  />
                </div>
              )}

              <div>
                <label htmlFor="cyl-h" className="font-bold block mb-1">Height (h):</label>
                <input
                  id="cyl-h"
                  type="text"
                  value={cylHStr}
                  onChange={(e) => setCylHStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 10"
                />
              </div>

              {cylError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{cylError}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">
                {cylMode === "solid" ? "Total Surface Area (2πr(r + h))" : "Hollow Pipe Total SA (2πRh + 2πrh + 2π(R² - r²))"}
              </span>
              {resultCyl ? (
                <>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {resultCyl.totalArea}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">{cylMode === "hollow" ? "Total Curved Walls:" : "Curved Lateral Area:"}</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCyl.lateralArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">{cylMode === "hollow" ? "Two End Annular Rings:" : "Two Bases Area:"}</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCyl.baseArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 col-span-2">
                      <span className="text-slate-500 block text-[11px]">{cylMode === "hollow" ? "Pipe Wall Material Volume:" : "Cylinder Volume:"}</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCyl.volume}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-slate-400 py-4">Enter valid positive dimensions to calculate.</div>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderCylinderSVG(cylR, cylH, cylMode, pipeInnerR)}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Cylinder Calculations", savedCylItems, () => setSavedCylItems([]), (id) => setSavedCylItems(savedCylItems.filter(i => i.id !== id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: CUBE & RECTANGULAR PRISM / TANK MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Box className="w-3.5 h-3.5" /> Cube &amp; Rectangular Prism Surface Area Module</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => resultBox && copyToClipboard(`Box Total SA = ${resultBox.totalArea}\nOpen-Top Area = ${resultBox.openTopArea}\nSide Walls = ${resultBox.lateralArea}\nVolume = ${resultBox.volume}`, "box-sum")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copyFeedback === "box-sum" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copyFeedback === "box-sum" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(boxMode === "cube" ? `A = 6a^2 = ${resultBox?.totalArea}` : `A = 2(lw + lh + wh) = ${resultBox?.totalArea}`, "box-latex")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3 h-3" />
              <span>LaTeX</span>
            </button>
            <button
              type="button"
              onClick={handleSaveBox}
              disabled={!resultBox}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "box" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setBoxMode("prism")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                boxMode === "prism"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Rectangular Prism (l, w, h)
            </button>
            <button
              type="button"
              onClick={() => setBoxMode("cube")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                boxMode === "cube"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Cube (Side a)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              {boxMode === "cube" ? (
                <div>
                  <label htmlFor="cube-a" className="font-bold block mb-1">Side Length (a):</label>
                  <input
                    id="cube-a"
                    type="text"
                    value={cubeAStr}
                    onChange={(e) => setCubeAStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    placeholder="e.g. 5"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label htmlFor="box-l" className="font-bold block mb-1">Length (l):</label>
                    <input
                      id="box-l"
                      type="text"
                      value={boxLStr}
                      onChange={(e) => setBoxLStr(e.target.value)}
                      className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <label htmlFor="box-w" className="font-bold block mb-1">Width (w):</label>
                    <input
                      id="box-w"
                      type="text"
                      value={boxWStr}
                      onChange={(e) => setBoxWStr(e.target.value)}
                      className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      placeholder="4"
                    />
                  </div>
                  <div>
                    <label htmlFor="box-h" className="font-bold block mb-1">Height (h):</label>
                    <input
                      id="box-h"
                      type="text"
                      value={boxHStr}
                      onChange={(e) => setBoxHStr(e.target.value)}
                      className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      placeholder="5"
                    />
                  </div>
                </div>
              )}

              {boxError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{boxError}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">
                {boxMode === "cube" ? "Cube Surface Area (6a²)" : "Prism Total Surface Area (2(lw + lh + wh))"}
              </span>
              {resultBox ? (
                <>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {resultBox.totalArea}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">{boxMode === "cube" ? "Open-Top Cube (5 Faces):" : "Open-Top Tank Area:"}</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultBox.openTopArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">4 Side Walls Area:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultBox.lateralArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 col-span-2">
                      <span className="text-slate-500 block text-[11px]">Volume:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultBox.volume}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-slate-400 py-4">Enter valid positive dimensions to calculate.</div>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderBoxSVG(boxL, boxW, boxH, boxMode === "cube", cubeA)}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Box Calculations", savedBoxItems, () => setSavedBoxItems([]), (id) => setSavedBoxItems(savedBoxItems.filter(i => i.id !== id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: SQUARE PYRAMID & TETRAHEDRON MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Shapes className="w-3.5 h-3.5" /> Square Pyramid &amp; Tetrahedron Module</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => resultPyr && copyToClipboard(`Pyramid Total SA = ${resultPyr.totalArea}\nLateral Area = ${resultPyr.lateralArea}\nBase Area = ${resultPyr.baseArea}\nSlant Height = ${resultPyr.slantHeight}\nVolume = ${resultPyr.volume}`, "pyr-sum")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copyFeedback === "pyr-sum" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copyFeedback === "pyr-sum" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(pyrMode === "square" ? `A = a^2 + 2as = ${resultPyr?.totalArea}` : `A = \\sqrt{3}a^2 = ${resultPyr?.totalArea}`, "pyr-latex")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3 h-3" />
              <span>LaTeX</span>
            </button>
            <button
              type="button"
              onClick={handleSavePyr}
              disabled={!resultPyr}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "pyr" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPyrMode("square")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                pyrMode === "square"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Square Pyramid (a, h)
            </button>
            <button
              type="button"
              onClick={() => setPyrMode("tetra")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                pyrMode === "tetra"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Regular Tetrahedron (Edge a)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label htmlFor="pyr-a" className="font-bold block mb-1">
                  {pyrMode === "square" ? "Base Edge (a):" : "Tetrahedron Edge (a):"}
                </label>
                <input
                  id="pyr-a"
                  type="text"
                  value={pyrAStr}
                  onChange={(e) => setPyrAStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 6"
                />
              </div>

              {pyrMode === "square" && (
                <div>
                  <label htmlFor="pyr-h" className="font-bold block mb-1">Vertical Height (h):</label>
                  <input
                    id="pyr-h"
                    type="text"
                    value={pyrHStr}
                    onChange={(e) => setPyrHStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    placeholder="e.g. 4"
                  />
                </div>
              )}

              {pyrError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{pyrError}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">
                {pyrMode === "square" ? "Square Pyramid Total SA (a² + 2as)" : "Regular Tetrahedron Total SA (√3 a²)"}
              </span>
              {resultPyr ? (
                <>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {resultPyr.totalArea}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">{pyrMode === "square" ? "4 Triangular Faces (2as):" : "3 Triangular Faces:"}</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultPyr.lateralArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Base Area:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultPyr.baseArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Slant Height s:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultPyr.slantHeight}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Volume:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultPyr.volume}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-slate-400 py-4">Enter valid positive dimensions to calculate.</div>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderPyramidSVG(pyrA, pyrH, pyrMode === "tetra")}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Pyramid Calculations", savedPyrItems, () => setSavedPyrItems([]), (id) => setSavedPyrItems(savedPyrItems.filter(i => i.id !== id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: CAPSULE MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Maximize2 className="w-3.5 h-3.5" /> Capsule Surface Area Module</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => resultCap && copyToClipboard(`Capsule Total SA = ${resultCap.totalArea}\nTotal Length L = ${resultCap.totalLength}\nHemispherical Ends = ${resultCap.sphereEndsArea}\nCylindrical Wall = ${resultCap.cylinderLateralArea}\nVolume = ${resultCap.volume}`, "cap-sum")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copyFeedback === "cap-sum" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copyFeedback === "cap-sum" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(`A = 2\\pi r(2r + h) = ${resultCap?.totalArea}`, "cap-latex")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3 h-3" />
              <span>LaTeX</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCap}
              disabled={!resultCap}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "cap" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label htmlFor="cap-r" className="font-bold block mb-1">Radius (r):</label>
                <input
                  id="cap-r"
                  type="text"
                  value={capRStr}
                  onChange={(e) => setCapRStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 3"
                />
              </div>

              <div>
                <label htmlFor="cap-h" className="font-bold block mb-1">Cylinder Section Height (h):</label>
                <input
                  id="cap-h"
                  type="text"
                  value={capHStr}
                  onChange={(e) => setCapHStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  placeholder="e.g. 8"
                />
              </div>

              {capError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{capError}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Total Capsule Surface Area (2πr(2r + h))</span>
              {resultCap ? (
                <>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {resultCap.totalArea}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Total Capsule Length (L = h + 2r):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCap.totalLength}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Two Hemispherical Ends (4πr²):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCap.sphereEndsArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Cylindrical Side Wall (2πrh):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCap.cylinderLateralArea}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Capsule Volume:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultCap.volume}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-slate-400 py-4">Enter valid positive dimensions to calculate.</div>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderCapsuleSVG(capR, capH)}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Capsule Calculations", savedCapItems, () => setSavedCapItems([]), (id) => setSavedCapItems(savedCapItems.filter(i => i.id !== id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: ELLIPSOID MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Circle className="w-3.5 h-3.5" /> Ellipsoid Surface Area Module (Knud Thomsen)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => resultEll && copyToClipboard(`Ellipsoid Approximate SA ≈ ${resultEll.surfaceArea}\nVolume = ${resultEll.volume}`, "ell-sum")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copyFeedback === "ell-sum" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copyFeedback === "ell-sum" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(`A \\approx 4\\pi \\left(\\frac{(ab)^p + (ac)^p + (bc)^p}{3}\\right)^{1/p} \\approx ${resultEll?.surfaceArea}`, "ell-latex")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3 h-3" />
              <span>LaTeX</span>
            </button>
            <button
              type="button"
              onClick={handleSaveEll}
              disabled={!resultEll}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "ell" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="ell-a" className="font-bold block mb-1">Semi-axis a:</label>
                  <input
                    id="ell-a"
                    type="text"
                    value={ellAStr}
                    onChange={(e) => setEllAStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label htmlFor="ell-b" className="font-bold block mb-1">Semi-axis b:</label>
                  <input
                    id="ell-b"
                    type="text"
                    value={ellBStr}
                    onChange={(e) => setEllBStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                    placeholder="4"
                  />
                </div>
                <div>
                  <label htmlFor="ell-c" className="font-bold block mb-1">Semi-axis c:</label>
                  <input
                    id="ell-c"
                    type="text"
                    value={ellCStr}
                    onChange={(e) => setEllCStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                    placeholder="3"
                  />
                </div>
              </div>

              {ellError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{ellError}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">
                Approximate Surface Area (Knud Thomsen formula, p = 1.6075)
              </span>
              {resultEll ? (
                <>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    ≈ {resultEll.surfaceArea}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Ellipsoid Volume (⁴/₃π abc):</span>
                      <strong className="text-slate-800 dark:text-slate-200">{resultEll.volume}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[11px]">Accuracy Relative Error:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">&lt; 1.061% max error</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-slate-400 py-4">Enter valid positive semi-axes to calculate.</div>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderEllipsoidSVG(ellA, ellB, ellC)}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Ellipsoid Calculations", savedEllItems, () => setSavedEllItems([]), (id) => setSavedEllItems(savedEllItems.filter(i => i.id !== id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 8: MASTER SURFACE AREA UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Master Surface Area Unit Converter Matrix</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (!resultConv) return;
                exportToCSV("surface_area_conversion_matrix.csv", [
                  ["Unit", "Converted Area"],
                  ["Square Meters (m²)", resultConv.sqMeters],
                  ["Square Feet (ft²)", resultConv.sqFeet],
                  ["Square Inches (in²)", resultConv.sqInches],
                  ["Square Centimeters (cm²)", resultConv.sqCm],
                  ["Square Millimeters (mm²)", resultConv.sqMm],
                  ["Square Yards (yd²)", resultConv.sqYards],
                  ["Acres", resultConv.acres],
                  ["Hectares", resultConv.hectares]
                ]);
              }}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3 h-3" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleSaveConv}
              disabled={!resultConv}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved === "conv" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label htmlFor="conv-val" className="block text-xs font-bold mb-1">Surface Area Value:</label>
              <input
                id="conv-val"
                type="text"
                value={convValStr}
                onChange={(e) => setConvValStr(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                placeholder="e.g. 100"
              />
            </div>
            <div>
              <label htmlFor="conv-unit" className="block text-xs font-bold mb-1">Base Unit:</label>
              <select
                id="conv-unit"
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="sqMeters">Square Meters (m²)</option>
                <option value="sqFeet">Square Feet (ft²)</option>
                <option value="sqInches">Square Inches (in²)</option>
                <option value="sqCm">Square Centimeters (cm²)</option>
                <option value="sqYards">Square Yards (yd²)</option>
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>

          {convError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{convError}</span>
            </div>
          )}

          {resultConv && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Unit</th>
                    <th className="p-2.5">Converted Surface Area</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                  <tr><td className="p-2 font-bold font-sans">Square Meters (m²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.sqMeters}</td></tr>
                  <tr><td className="p-2 font-bold font-sans">Square Feet (ft²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.sqFeet}</td></tr>
                  <tr><td className="p-2 font-bold font-sans">Square Inches (in²)</td><td className="p-2 font-bold">{resultConv.sqInches}</td></tr>
                  <tr><td className="p-2 font-bold font-sans">Square Centimeters (cm²)</td><td className="p-2 font-bold">{resultConv.sqCm}</td></tr>
                  <tr><td className="p-2 font-bold font-sans">Square Millimeters (mm²)</td><td className="p-2 font-bold">{resultConv.sqMm}</td></tr>
                  <tr><td className="p-2 font-bold font-sans">Square Yards (yd²)</td><td className="p-2 font-bold">{resultConv.sqYards}</td></tr>
                  <tr><td className="p-2 font-bold font-sans">Acres</td><td className="p-2 font-bold">{resultConv.acres}</td></tr>
                  <tr><td className="p-2 font-bold font-sans">Hectares</td><td className="p-2 font-bold">{resultConv.hectares}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {renderSavedCardsGroup("Saved Converter Calculations", savedConvItems, () => setSavedConvItems([]), (id) => setSavedConvItems(savedConvItems.filter(i => i.id !== id)))}
        </div>
      </div>
    </div>
  );
}

export default SurfaceAreaCalculator;
