import {
  computeRectangleArea,
  computeTriangleArea,
  computeCircleArea,
  computeSectorArea,
  computeAnnulusArea,
  computeQuadrilateralArea,
  computeRegularPolygonArea,
  computeShoelaceArea,
  computeMaterialEstimate,
  convertAreaFromSquareMeters,
  formatNumber,
  formatSmallArea,
  parseShoelaceCoordinates
} from '../src/app/calculators/area-calculator/area-logic';

console.log('=== RUNNING AREA CALCULATOR POST-FIX TESTS ===\n');

// 1. GOLDEN CASES
const goldenTests = [
  {
    name: 'Rectangle (10 x 5)',
    fn: () => {
      const res = computeRectangleArea(10, 5);
      return res.isValid && Math.abs(res.area - 50) < 1e-4 && res.perimeter === 30;
    },
    expected: 'Area = 50, Perimeter = 30'
  },
  {
    name: 'Triangle base-height (10 x 6)',
    fn: () => {
      const res = computeTriangleArea({ mode: 'base-height', base: 10, height: 6 });
      return res.isValid && Math.abs(res.area - 30) < 1e-4;
    },
    expected: 'Area = 30'
  },
  {
    name: 'Heron Triangle (7, 8, 9)',
    fn: () => {
      const res = computeTriangleArea({ mode: 'heron', sideA: 7, sideB: 8, sideC: 9 });
      return res.isValid && Math.abs(res.area - 26.8328) < 1e-3 && res.perimeter === 24;
    },
    expected: 'Area ≈ 26.8328, Perimeter = 24'
  },
  {
    name: 'Circle (r = 5)',
    fn: () => {
      const res = computeCircleArea(5);
      return res.isValid && Math.abs(res.area - 78.5398) < 1e-3 && Math.abs(res.circumference! - 31.4159) < 1e-3;
    },
    expected: 'Area ≈ 78.5398, Circumference ≈ 31.4159'
  },
  {
    name: 'Sector (r = 10, theta = 90°)',
    fn: () => {
      const res = computeSectorArea(10, 90);
      return res.isValid && Math.abs(res.area - 78.5398) < 1e-3 && Math.abs(res.arcLength! - 15.7080) < 1e-3;
    },
    expected: 'Area ≈ 78.5398, Arc ≈ 15.7080'
  },
  {
    name: 'Annulus (R = 10, r = 5)',
    fn: () => {
      const res = computeAnnulusArea(10, 5);
      return res.isValid && Math.abs(res.area - 235.6194) < 1e-3;
    },
    expected: 'Area ≈ 235.6194'
  },
  {
    name: 'Trapezoid (b1 = 10, b2 = 6, h = 4)',
    fn: () => {
      const res = computeQuadrilateralArea('trapezoid', { b1: 10, b2: 6, h: 4 });
      return res.isValid && Math.abs(res.area - 32) < 1e-4;
    },
    expected: 'Area = 32'
  },
  {
    name: 'Parallelogram (b = 10, h = 6)',
    fn: () => {
      const res = computeQuadrilateralArea('parallelogram', { b: 10, h: 6 });
      return res.isValid && Math.abs(res.area - 60) < 1e-4;
    },
    expected: 'Area = 60'
  },
  {
    name: 'Rhombus (d1 = 10, d2 = 8)',
    fn: () => {
      const res = computeQuadrilateralArea('rhombus', { d1: 10, d2: 8 });
      return res.isValid && Math.abs(res.area - 40) < 1e-4;
    },
    expected: 'Area = 40'
  },
  {
    name: 'Kite (d1 = 10, d2 = 6)',
    fn: () => {
      const res = computeQuadrilateralArea('kite', { d1: 10, d2: 6 });
      return res.isValid && Math.abs(res.area - 30) < 1e-4;
    },
    expected: 'Area = 30'
  },
  {
    name: 'Regular Hexagon (n = 6, side = 5)',
    fn: () => {
      const res = computeRegularPolygonArea(6, 5);
      return res.isValid && Math.abs(res.area - 64.9519) < 1e-3 && Math.abs(res.apothem! - 4.3301) < 1e-3 && res.perimeter === 30;
    },
    expected: 'Area ≈ 64.9519, Apothem ≈ 4.3301, Perimeter = 30'
  },
  {
    name: 'Shoelace Polygon ((0,0),(10,0),(10,6),(4,10),(0,6))',
    fn: () => {
      const parsed = parseShoelaceCoordinates('0,0\n10,0\n10,6\n4,10\n0,6');
      if (!parsed.isValid) return false;
      const res = computeShoelaceArea(parsed.points);
      return res.isValid && Math.abs(res.area - 80) < 1e-4 && Math.abs(res.perimeter! - 34.868) < 1e-2;
    },
    expected: 'Area = 80, Perimeter ≈ 34.868'
  },
  {
    name: 'Material Estimator (50 m², $20/m², 10% waste)',
    fn: () => {
      const res = computeMaterialEstimate(50, 20, 10);
      return res.isValid && Math.abs(res.totalArea - 55) < 1e-4 && Math.abs(res.totalCost - 1100) < 1e-4;
    },
    expected: 'Total Area = 55 m², Cost = $1,100'
  }
];

let goldenPassed = 0;
console.log('--- 1. GOLDEN TESTS ---');
goldenTests.forEach((t) => {
  const ok = t.fn();
  if (ok) {
    goldenPassed++;
    console.log(`PASS: ${t.name} -> ${t.expected}`);
  } else {
    console.error(`FAIL: ${t.name}`);
  }
});
console.log(`Golden Tests Result: ${goldenPassed}/${goldenTests.length} Passed\n`);

// 2. INVALID TESTS AUDIT
console.log('--- 2. INVALID INPUT TESTS ---');
const invalidTests = [
  {
    name: 'Annulus R=5, r=5 (r >= R)',
    fn: () => {
      const res = computeAnnulusArea(5, 5);
      return !res.isValid && res.error === 'Inner radius must be less than outer radius.';
    }
  },
  {
    name: 'Annulus R=5, r=10 (r > R)',
    fn: () => {
      const res = computeAnnulusArea(5, 10);
      return !res.isValid && res.error === 'Inner radius must be less than outer radius.';
    }
  },
  {
    name: 'Annulus R=0, r=0',
    fn: () => {
      const res = computeAnnulusArea(0, 0);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Sector theta = 0',
    fn: () => {
      const res = computeSectorArea(10, 0);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Sector theta = 450 (angle > 360)',
    fn: () => {
      const res = computeSectorArea(10, 450);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Sector theta = -20',
    fn: () => {
      const res = computeSectorArea(10, -20);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Regular polygon n = 2',
    fn: () => {
      const res = computeRegularPolygonArea(2, 5);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Regular polygon n = 2.5',
    fn: () => {
      const res = computeRegularPolygonArea(2.5, 5);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Heron impossible triangle (1, 2, 5)',
    fn: () => {
      const res = computeTriangleArea({ mode: 'heron', sideA: 1, sideB: 2, sideC: 5 });
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Shoelace malformed coordinates "10,x"',
    fn: () => {
      const parsed = parseShoelaceCoordinates('0,0\n10,0\n10,x');
      return !parsed.isValid && Boolean(parsed.error?.includes('Line 3'));
    }
  },
  {
    name: 'Shoelace 2 points only',
    fn: () => {
      const parsed = parseShoelaceCoordinates('0,0\n10,0');
      return !parsed.isValid && Boolean(parsed.error);
    }
  },
  {
    name: 'Negative waste (-5%)',
    fn: () => {
      const res = computeMaterialEstimate(50, 20, -5);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Rectangle negative length (-10 x 5)',
    fn: () => {
      const res = computeRectangleArea(-10, 5);
      return !res.isValid && Boolean(res.error);
    }
  },
  {
    name: 'Circle negative radius (-5)',
    fn: () => {
      const res = computeCircleArea(-5);
      return !res.isValid && Boolean(res.error);
    }
  }
];

let invalidPassed = 0;
invalidTests.forEach((t) => {
  const ok = t.fn();
  if (ok) {
    invalidPassed++;
    console.log(`PASS (correctly rejected): ${t.name}`);
  } else {
    console.error(`FAIL (not rejected or wrong message): ${t.name}`);
  }
});
console.log(`Invalid Tests Result: ${invalidPassed}/${invalidTests.length} Passed\n`);

// 3. FORMATTER AND PRECISION TESTS
console.log('--- 3. FORMATTER & TRAILING ZEROS TESTS ---');
console.log(`formatNumber(50, 2) = "${formatNumber(50, 2)}" (Expected "50.00") -> ${formatNumber(50, 2) === '50.00' ? 'PASS' : 'FAIL'}`);
console.log(`formatNumber(50, 4) = "${formatNumber(50, 4)}" (Expected "50.0000") -> ${formatNumber(50, 4) === '50.0000' ? 'PASS' : 'FAIL'}`);
console.log(`formatNumber(78.539816, 4) = "${formatNumber(78.539816, 4)}" (Expected "78.5398") -> ${formatNumber(78.539816, 4) === '78.5398' ? 'PASS' : 'FAIL'}`);

const convResult = convertAreaFromSquareMeters(1, 4);
const smallAreaStr = convResult.formatted.sqMiles;
console.log(`Small area 1 m² in sq mi: "${smallAreaStr}" -> ${smallAreaStr === '< 0.0001' ? 'PASS' : 'FAIL'}`);

// 4. RANDOMIZED PROPERTY TESTING: 40,000 VALID TESTS
console.log('\n--- 4. RANDOMIZED PROPERTY TESTING: 40,000 VALID CASES ---');
let validRandomPassed = 0;
const validShapes = ['rect', 'tri_bh', 'tri_heron', 'circle', 'sector', 'annulus', 'trap', 'para', 'rhombus', 'kite', 'polygon', 'shoelace'];

for (let i = 0; i < 40000; i++) {
  const shape = validShapes[i % validShapes.length];
  let res: any;

  if (shape === 'rect') {
    const l = Math.random() * 500 + 0.1;
    const w = Math.random() * 500 + 0.1;
    res = computeRectangleArea(l, w);
  } else if (shape === 'tri_bh') {
    const b = Math.random() * 500 + 0.1;
    const h = Math.random() * 500 + 0.1;
    res = computeTriangleArea({ mode: 'base-height', base: b, height: h });
  } else if (shape === 'tri_heron') {
    // Generate mathematically valid triangle sides
    const a = Math.random() * 100 + 10;
    const b = Math.random() * 100 + 10;
    const minC = Math.abs(a - b) + 0.1;
    const maxC = a + b - 0.1;
    const c = minC + Math.random() * (maxC - minC);
    res = computeTriangleArea({ mode: 'heron', sideA: a, sideB: b, sideC: c });
  } else if (shape === 'circle') {
    const r = Math.random() * 500 + 0.1;
    res = computeCircleArea(r);
  } else if (shape === 'sector') {
    const r = Math.random() * 500 + 0.1;
    const th = Math.random() * 359.9 + 0.1;
    res = computeSectorArea(r, th);
  } else if (shape === 'annulus') {
    const r = Math.random() * 200 + 0.1;
    const R = r + Math.random() * 200 + 0.1;
    res = computeAnnulusArea(R, r);
  } else if (shape === 'trap') {
    const b1 = Math.random() * 100 + 1;
    const b2 = Math.random() * 100 + 1;
    const h = Math.random() * 100 + 1;
    res = computeQuadrilateralArea('trapezoid', { b1, b2, h });
  } else if (shape === 'para') {
    const b = Math.random() * 100 + 1;
    const h = Math.random() * 100 + 1;
    res = computeQuadrilateralArea('parallelogram', { b, h });
  } else if (shape === 'rhombus') {
    const d1 = Math.random() * 100 + 1;
    const d2 = Math.random() * 100 + 1;
    res = computeQuadrilateralArea('rhombus', { d1, d2 });
  } else if (shape === 'kite') {
    const d1 = Math.random() * 100 + 1;
    const d2 = Math.random() * 100 + 1;
    res = computeQuadrilateralArea('kite', { d1, d2 });
  } else if (shape === 'polygon') {
    const n = Math.floor(Math.random() * 50) + 3;
    const s = Math.random() * 100 + 0.1;
    res = computeRegularPolygonArea(n, s);
  } else {
    // Regular box shoelace
    const w = Math.random() * 100 + 5;
    const h = Math.random() * 100 + 5;
    const pts = [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }];
    res = computeShoelaceArea(pts);
  }

  if (res && res.isValid && !isNaN(res.area) && isFinite(res.area) && res.area > 0) {
    validRandomPassed++;
  }
}
console.log(`40,000 Valid Randomized Cases Result: ${validRandomPassed}/40000 Passed`);

// 5. 1,000 INVALID / DEGENERATE EDGE CASES
console.log('\n--- 5. 1,000 INVALID / DEGENERATE CASES ---');
let invalidRandomPassed = 0;

for (let i = 0; i < 1000; i++) {
  const pick = i % 8;
  let res: any;

  if (pick === 0) {
    // Annulus r >= R
    const r = Math.random() * 100 + 10;
    const R = r - Math.random() * 5; // R <= r
    res = computeAnnulusArea(R, r);
  } else if (pick === 1) {
    // Sector theta > 360 or <= 0
    const th = Math.random() > 0.5 ? 360.1 + Math.random() * 100 : -Math.random() * 50;
    res = computeSectorArea(10, th);
  } else if (pick === 2) {
    // Regular polygon n < 3 or non-integer
    const n = Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 3.5 + Math.random() * 5;
    res = computeRegularPolygonArea(n, 10);
  } else if (pick === 3) {
    // Impossible Heron triangle
    res = computeTriangleArea({ mode: 'heron', sideA: 1, sideB: 2, sideC: 10 + Math.random() * 10 });
  } else if (pick === 4) {
    // Negative dimensions
    res = computeRectangleArea(-Math.random() * 50 - 0.1, Math.random() * 50 + 0.1);
  } else if (pick === 5) {
    // Zero dimensions
    res = computeCircleArea(0);
  } else if (pick === 6) {
    // Malformed Shoelace
    res = parseShoelaceCoordinates('0,0\n10,abc');
  } else {
    // Negative waste
    res = computeMaterialEstimate(50, 20, -Math.random() * 20 - 0.1);
  }

  if (res && res.isValid === false && res.error && res.error.length > 0) {
    invalidRandomPassed++;
  }
}
console.log(`1,000 Invalid Edge Cases Result: ${invalidRandomPassed}/1000 Correctly Rejected`);

if (
  goldenPassed === goldenTests.length &&
  invalidPassed === invalidTests.length &&
  validRandomPassed === 40000 &&
  invalidRandomPassed === 1000
) {
  console.log('\n>>> ALL REGRESSION & PROPERTY TESTS PASSED PERFECTLY (100%) <<<');
} else {
  console.error('\n>>> SOME TESTS FAILED <<<');
  process.exit(1);
}
