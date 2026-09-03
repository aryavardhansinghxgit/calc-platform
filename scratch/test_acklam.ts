// Peter J. Acklam's algorithm for inverse normal cumulative distribution function
export function acklamInverseNormalCDF(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;

  // Coefficients in rational approximations
  const a = [
    -3.969683028665376e+01,
     2.209460984245205e+02,
    -2.759285104469687e+02,
     1.383577518672690e+02,
    -3.066479806614716e+01,
     2.506628277459239e+00
  ];

  const b = [
    -5.447609879822406e+01,
     1.615858368580409e+02,
    -1.556989798598866e+02,
     6.680131188771972e+01,
    -1.328068155288572e+01
  ];

  const c = [
    -7.784894002430293e-03,
    -3.223964580411365e-01,
    -2.400758277161838e+00,
    -2.549732539343734e+00,
     4.374664141464968e+00,
     2.938163982698783e+00
  ];

  const d = [
     7.784695709041462e-03,
     3.224671290700398e-01,
     2.445134137142996e+00,
     3.754408661907416e+00
  ];

  // Define break-points.
  const p_low = 0.02425;
  const p_high = 1 - p_low;

  let q: number, r: number;

  // Rational approximation for lower region:
  if (p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
           ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }

  // Rational approximation for upper region:
  if (p > p_high) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
            ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }

  // Rational approximation for central region:
  q = p - 0.5;
  r = q * q;
  return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q /
         (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
}

console.log("Acklam p=0.5:", acklamInverseNormalCDF(0.5));
console.log("Acklam p=0.975:", acklamInverseNormalCDF(0.975));
console.log("Acklam p=0.95:", acklamInverseNormalCDF(0.95));
console.log("Acklam p=0.99:", acklamInverseNormalCDF(0.99));
console.log("Acklam p=0.025:", acklamInverseNormalCDF(0.025));
console.log("Acklam p=0.975 with 4 dec:", acklamInverseNormalCDF(0.975).toFixed(4));
console.log("Acklam p=0.975 * 15:", (acklamInverseNormalCDF(0.975) * 15).toFixed(4));
console.log("Acklam 100 + p=0.975 * 15:", (100 + acklamInverseNormalCDF(0.975) * 15).toFixed(4));
