import {
  parseToScientific,
  formatNormalizedScientific,
  multiplyScientific,
  divideScientific
} from "../src/app/calculators/scientific-notation-calculator/scientific-notation-logic";

console.log("--- EXTREME VALUES TEST ---");

const test1 = multiplyScientific({ mantissa: 1, exponent: 308 }, { mantissa: 1, exponent: 1 });
console.log("1e308 * 10:", test1, formatNormalizedScientific(test1));

const test2 = divideScientific({ mantissa: 1, exponent: -308 }, { mantissa: 1, exponent: 1 });
console.log("1e-308 / 10:", test2, formatNormalizedScientific(test2));

const test3 = multiplyScientific({ mantissa: 5, exponent: 100 }, { mantissa: 2, exponent: 200 });
console.log("5e100 * 2e200:", test3, formatNormalizedScientific(test3));

const test4 = parseToScientific("1e-250");
console.log("parse 1e-250:", test4, formatNormalizedScientific(test4));
