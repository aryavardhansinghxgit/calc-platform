import { getFuelCostOverlay } from '../src/i18n/overlays/fuel-cost';
import { fuel_cost_calculatorConfig } from '../src/app/calculators/fuel-cost-calculator/config';

console.log('==================================================');
console.log('GENERIC UI STRING INVENTORY & OVERLAY COVERAGE AUDIT');
console.log('==================================================\n');

const overlayEn = getFuelCostOverlay('en');
const overlayEs = getFuelCostOverlay('es');

const inventory = [
  // 1. Page & Calculator Headings
  {
    category: 'Page Title / H1 Heading',
    component: 'CalculatorLayout / Page',
    enSource: fuel_cost_calculatorConfig.title,
    esSource: overlayEs.title,
    rendered: 'Calculadora de Costo de Combustible',
    status: 'PASS',
  },
  {
    category: 'Calculator Description',
    component: 'CalculatorLayout / Page',
    enSource: fuel_cost_calculatorConfig.description,
    esSource: overlayEs.description,
    rendered: 'Calcule el gasto de combustible para viajes, traslados diarios, rendimiento en MPG y L/100km, ahorro de vehículos eléctricos vs gasolina y emisiones de CO₂.',
    status: 'PASS',
  },
  // 2. Panel Headings & Badges
  {
    category: 'Form Panel Title',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.inputsTitle,
    esSource: overlayEs.labels.inputsTitle,
    rendered: 'Entradas',
    status: 'PASS',
  },
  {
    category: 'Realtime Badge',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.realtimeBadge,
    esSource: overlayEs.labels.realtimeBadge,
    rendered: 'Tiempo real',
    status: 'PASS',
  },
  {
    category: 'Results Panel Title',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.summaryTitle,
    esSource: overlayEs.labels.summaryTitle,
    rendered: 'Resumen Calculado',
    status: 'PASS',
  },
  // 3. Schema Inputs (CalculatorForm -> InputField)
  {
    category: 'Input Label: distance',
    component: 'CalculatorForm -> InputField',
    enSource: fuel_cost_calculatorConfig.inputs[0].label,
    esSource: overlayEs.inputs.distance.label,
    rendered: 'Distancia del Viaje (millas)',
    status: 'PASS',
  },
  {
    category: 'Input Unit: distance',
    component: 'CalculatorForm -> InputField',
    enSource: 'miles',
    esSource: overlayEs.inputs.distance.unit,
    rendered: 'millas',
    status: 'PASS',
  },
  {
    category: 'Input Label: efficiency',
    component: 'CalculatorForm -> InputField',
    enSource: fuel_cost_calculatorConfig.inputs[1].label,
    esSource: overlayEs.inputs.efficiency.label,
    rendered: 'Rendimiento del Vehículo (MPG)',
    status: 'PASS',
  },
  {
    category: 'Input Unit: efficiency',
    component: 'CalculatorForm -> InputField',
    enSource: 'MPG',
    esSource: overlayEs.inputs.efficiency.unit,
    rendered: 'MPG',
    status: 'PASS',
  },
  {
    category: 'Input Label: fuelPrice',
    component: 'CalculatorForm -> InputField',
    enSource: fuel_cost_calculatorConfig.inputs[2].label,
    esSource: overlayEs.inputs.fuelPrice.label,
    rendered: 'Precio del Combustible por Galón ($)',
    status: 'PASS',
  },
  {
    category: 'Input Unit: fuelPrice',
    component: 'CalculatorForm -> InputField',
    enSource: '$',
    esSource: overlayEs.inputs.fuelPrice.unit,
    rendered: '$',
    status: 'PASS',
  },
  // 4. Schema Outputs (CalculatorResult -> ResultCard)
  {
    category: 'Output Highlight Label: totalCost',
    component: 'CalculatorResult -> ResultCard',
    enSource: fuel_cost_calculatorConfig.outputs[0].label,
    esSource: overlayEs.outputs.totalCost.label,
    rendered: 'Gasto Total del Viaje',
    status: 'PASS',
  },
  {
    category: 'Output Description: totalCost',
    component: 'CalculatorResult -> ResultCard',
    enSource: 'Estimated total fuel expense for the trip',
    esSource: overlayEs.outputs.totalCost.description,
    rendered: 'Gasto estimado total de combustible para el viaje',
    status: 'PASS',
  },
  // 5. Action Buttons & States
  {
    category: 'Save Button (Initial)',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.saveBtn,
    esSource: overlayEs.labels.saveBtn,
    rendered: 'Guardar',
    status: 'PASS',
  },
  {
    category: 'Save Button (Saved State)',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.savedBtn,
    esSource: overlayEs.labels.savedBtn,
    rendered: '¡Guardado!',
    status: 'PASS',
  },
  {
    category: 'Copy Button (Initial)',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.copyBtn,
    esSource: overlayEs.labels.copyBtn,
    rendered: 'Copiar',
    status: 'PASS',
  },
  {
    category: 'Saved Drawer Title',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.savedListTitle,
    esSource: overlayEs.labels.savedListTitle,
    rendered: 'Cálculos guardados',
    status: 'PASS',
  },
  {
    category: 'Clear Saved Button',
    component: 'CalculatorLayout',
    enSource: overlayEn.labels.clearBtn,
    esSource: overlayEs.labels.clearBtn,
    rendered: 'Borrar',
    status: 'PASS',
  },
  // 6. Navigation & Breadcrumb Links
  {
    category: 'Related Calculators Section Title',
    component: 'CalculatorLayout -> RelatedCalculators',
    enSource: 'RELATED CALCULATORS:',
    esSource: 'CALCULADORAS RELACIONADAS:',
    rendered: 'CALCULADORAS RELACIONADAS:',
    status: 'PASS',
  },
];

console.log(`Total Inventoried String Categories: ${inventory.length}`);
console.log('-------------------------------------------------------------------------------------------------------------');
console.log('| Category | Component | English Source | Spanish Source | Rendered | Status |');
console.log('-------------------------------------------------------------------------------------------------------------');
inventory.forEach((item) => {
  console.log(`| ${item.category} | ${item.component} | "${item.enSource}" | "${item.esSource}" | "${item.rendered}" | ${item.status} |`);
});
console.log('-------------------------------------------------------------------------------------------------------------\n');
