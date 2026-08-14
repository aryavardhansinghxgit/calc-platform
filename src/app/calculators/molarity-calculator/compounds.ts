import { ChemicalCompound } from "./types";

export const COMMON_CHEMICAL_COMPOUNDS: ChemicalCompound[] = [
  { name: "Sodium Chloride", formula: "NaCl", molarMass: 58.44, valence: 1 },
  { name: "Sodium Hydroxide", formula: "NaOH", molarMass: 39.997, valence: 1 },
  { name: "Tris Base", formula: "C4H11NO3", molarMass: 121.14, valence: 1 },
  { name: "EDTA Disodium Dihydrate", formula: "C10H14N2Na2O8·2H2O", molarMass: 372.24, valence: 2 },
  { name: "Sulfuric Acid", formula: "H2SO4", molarMass: 98.079, valence: 2 },
  { name: "Hydrochloric Acid", formula: "HCl", molarMass: 36.46, valence: 1 },
  { name: "Nitric Acid", formula: "HNO3", molarMass: 63.01, valence: 1 },
  { name: "Acetic Acid Glacial", formula: "CH3COOH", molarMass: 60.05, valence: 1 },
  { name: "Copper(II) Sulfate", formula: "CuSO4", molarMass: 159.6, valence: 2 },
  { name: "Copper(II) Sulfate Pentahydrate", formula: "CuSO4·5H2O", molarMass: 249.68, valence: 2 },
  { name: "Potassium Chloride", formula: "KCl", molarMass: 74.55, valence: 1 },
  { name: "Sodium Bicarbonate", formula: "NaHCO3", molarMass: 84.007, valence: 1 },
  { name: "D-Glucose", formula: "C6H12O6", molarMass: 180.16, valence: 1 },
  { name: "Sucrose", formula: "C12H22O11", molarMass: 342.3, valence: 1 },
  { name: "Ammonium Sulfate", formula: "(NH4)2SO4", molarMass: 132.14, valence: 2 },
  { name: "Calcium Chloride", formula: "CaCl2", molarMass: 110.98, valence: 2 },
  { name: "Magnesium Sulfate", formula: "MgSO4", molarMass: 120.37, valence: 2 },
  { name: "Magnesium Sulfate Heptahydrate", formula: "MgSO4·7H2O", molarMass: 246.47, valence: 2 },
  { name: "Potassium Phosphate Monobasic", formula: "KH2PO4", molarMass: 136.086, valence: 1 },
  { name: "Sodium Phosphate Dibasic", formula: "Na2HPO4", molarMass: 141.96, valence: 2 },
];

export const HYDRATE_WATER_MOLAR_MASS = 18.01528; // g/mol per H2O
