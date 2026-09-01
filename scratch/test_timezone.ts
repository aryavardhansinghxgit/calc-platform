// Test timezone parsing behavior
function parseDateOld(dateStr: string) {
  return new Date(dateStr);
}

function parseDateSafe(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const input = "2026-01-01";
const dOld = parseDateOld(input);
const dSafe = parseDateSafe(input);

console.log("Input:", input);
console.log("dOld ISO:", dOld.toISOString());
console.log("dOld Local getDate():", dOld.getDate(), "getMonth():", dOld.getMonth() + 1);
console.log("dSafe ISO:", dSafe.toISOString());
console.log("dSafe Local getDate():", dSafe.getDate(), "getMonth():", dSafe.getMonth() + 1);
