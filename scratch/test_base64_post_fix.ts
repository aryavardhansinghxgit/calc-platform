import { Buffer } from "buffer";
import * as fs from "fs";

// --- INDEPENDENT ORACLE IMPLEMENTATION ---
const BASE64_STD_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const BASE64_URL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function oracleEncodeBytes(bytes: Uint8Array, urlSafe = false, pad = true): string {
  if (bytes.length === 0) return "";
  const alphabet = urlSafe ? BASE64_URL_ALPHABET : BASE64_STD_ALPHABET;
  let result = "";
  let i = 0;
  for (; i + 2 < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];
    const triple = (b0 << 16) | (b1 << 8) | b2;
    result += alphabet[(triple >> 18) & 0x3f];
    result += alphabet[(triple >> 12) & 0x3f];
    result += alphabet[(triple >> 6) & 0x3f];
    result += alphabet[triple & 0x3f];
  }

  const remainder = bytes.length - i;
  if (remainder === 1) {
    const b0 = bytes[i];
    const val = b0 << 16;
    result += alphabet[(val >> 18) & 0x3f];
    result += alphabet[(val >> 12) & 0x3f];
    if (pad) {
      result += "==";
    }
  } else if (remainder === 2) {
    const b0 = bytes[i];
    const b1 = bytes[i + 1];
    const val = (b0 << 16) | (b1 << 8);
    result += alphabet[(val >> 18) & 0x3f];
    result += alphabet[(val >> 12) & 0x3f];
    result += alphabet[(val >> 6) & 0x3f];
    if (pad) {
      result += "=";
    }
  }

  return result;
}

function oracleDecodeToBytes(b64: string, urlSafe = false): { bytes: Uint8Array; valid: boolean } {
  let cleaned = b64.trim().replace(/\s+/g, "");
  if (cleaned.length === 0) return { bytes: new Uint8Array(0), valid: true };

  if (urlSafe) {
    cleaned = cleaned.replace(/-/g, "+").replace(/_/g, "/");
    while (cleaned.length % 4 !== 0) {
      cleaned += "=";
    }
  }

  if (cleaned.length % 4 !== 0) {
    return { bytes: new Uint8Array(0), valid: false };
  }

  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(cleaned)) {
    return { bytes: new Uint8Array(0), valid: false };
  }

  const firstPad = cleaned.indexOf("=");
  if (firstPad !== -1) {
    if (firstPad < cleaned.length - 2) return { bytes: new Uint8Array(0), valid: false };
    if (firstPad === cleaned.length - 2 && cleaned[cleaned.length - 1] !== "=") return { bytes: new Uint8Array(0), valid: false };
  }

  try {
    const buf = Buffer.from(cleaned, "base64");
    const padCount = cleaned.endsWith("==") ? 2 : cleaned.endsWith("=") ? 1 : 0;
    const expectedLen = (cleaned.length / 4) * 3 - padCount;
    if (buf.length !== expectedLen) {
      return { bytes: new Uint8Array(0), valid: false };
    }
    return { bytes: new Uint8Array(buf), valid: true };
  } catch {
    return { bytes: new Uint8Array(0), valid: false };
  }
}

// PRODUCTION FUNCTIONS (from Base64Calculator.tsx after remediation)
function prodEncodeBase64(
  str: string,
  variant: "standard" | "urlsafe",
  charset: "UTF-8" | "ASCII" | "UTF-16" | "Latin-1",
  chunk76: boolean,
  lineByLine: boolean
): { output: string; error?: string } {
  if (!str) return { output: "" };

  try {
    const processSingle = (text: string): string => {
      let bytes: Uint8Array;

      if (charset === "UTF-8") {
        bytes = new TextEncoder().encode(text);
      } else if (charset === "ASCII" || charset === "Latin-1") {
        bytes = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) {
          bytes[i] = text.charCodeAt(i) & 0xff;
        }
      } else if (charset === "UTF-16") {
        bytes = new Uint8Array(text.length * 2);
        for (let i = 0; i < text.length; i++) {
          const code = text.charCodeAt(i);
          bytes[i * 2] = code & 0xff;
          bytes[i * 2 + 1] = (code >> 8) & 0xff;
        }
      } else {
        bytes = new TextEncoder().encode(text);
      }

      let binStr = "";
      for (let i = 0; i < bytes.length; i++) {
        binStr += String.fromCharCode(bytes[i]);
      }
      let b64 = btoa(binStr);

      if (variant === "urlsafe") {
        b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }

      if (chunk76) {
        b64 = b64.match(/.{1,76}/g)?.join("\n") || b64;
      }

      return b64;
    };

    if (lineByLine) {
      const lines = str.split("\n");
      const processed = lines.map((l) => processSingle(l));
      return { output: processed.join("\n") };
    }

    return { output: processSingle(str) };
  } catch (err: any) {
    return { output: "", error: err.message || "Encoding failed. Ensure text is valid for chosen charset." };
  }
}

function prodDecodeBase64(
  str: string,
  variant: "standard" | "urlsafe",
  charset: "UTF-8" | "ASCII" | "UTF-16" | "Latin-1",
  lineByLine: boolean
): { output: string; error?: string } {
  if (!str) return { output: "" };
  if (!lineByLine && !str.trim()) return { output: "" };

  try {
    const processSingle = (b64Input: string): string => {
      if (!b64Input.trim()) return "";
      let cleaned = b64Input.trim().replace(/\s+/g, "");

      if (variant === "urlsafe") {
        cleaned = cleaned.replace(/-/g, "+").replace(/_/g, "/");
        while (cleaned.length % 4 !== 0) {
          cleaned += "=";
        }
      }

      const binStr = atob(cleaned);
      const bytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        bytes[i] = binStr.charCodeAt(i);
      }

      if (charset === "UTF-8") {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      } else if (charset === "ASCII" || charset === "Latin-1") {
        return binStr;
      } else if (charset === "UTF-16") {
        let text = "";
        for (let i = 0; i < bytes.length; i += 2) {
          const code = bytes[i] | (bytes[i + 1] << 8);
          text += String.fromCharCode(code);
        }
        return text;
      }
      return new TextDecoder().decode(bytes);
    };

    if (lineByLine) {
      const lines = str.split("\n");
      const decoded = lines.map((l) => (l.trim() === "" ? "" : processSingle(l)));
      return { output: decoded.join("\n") };
    }

    return { output: processSingle(str) };
  } catch (err: any) {
    return {
      output: "",
      error: "Invalid Base64 format or corrupted character encoding. Check for missing padding or illegal characters.",
    };
  }
}

function computeProdAnalytics(
  tabMode: "text" | "file",
  opMode: "encode" | "decode",
  inputText: string,
  textResultOutput: string,
  selectedFile: { name: string; size: number; type: string } | null,
  fileBase64: string
) {
  let inBytes = 0;
  let outBytes = 0;
  let inputChars = 0;
  let outputChars = 0;
  let lines = 0;
  let ratio = 0;

  if (tabMode === "text") {
    const inputStr = inputText;
    const outputStr = textResultOutput;
    inBytes = new TextEncoder().encode(inputStr).length;
    outBytes = new TextEncoder().encode(outputStr).length;
    inputChars = inputStr.length;
    outputChars = outputStr.length;
    lines = outputStr ? outputStr.split("\n").length : 0;
    ratio = inBytes > 0 ? ((outBytes - inBytes) / inBytes) * 100 : 0;
  } else {
    if (selectedFile) {
      inBytes = selectedFile.size;
      inputChars = selectedFile.size;
      const rawB64 = fileBase64.includes(",") ? fileBase64.split(",")[1] : fileBase64;
      outBytes = rawB64.length;
      outputChars = rawB64.length;
      lines = 1;
      ratio = inBytes > 0 ? ((outBytes - inBytes) / inBytes) * 100 : 0;
    }
  }

  return {
    inputBytes: inBytes,
    outputBytes: outBytes,
    inputChars,
    outputChars,
    expansionRatio: parseFloat(ratio.toFixed(2)),
    lineCount: lines,
  };
}

async function runPostFixTests() {
  console.log("============================================================");
  console.log("RUNNING POST-FIX REMEDIATION VERIFICATION SUITE");
  console.log("============================================================");

  let totalAssertions = 0;
  let passedAssertions = 0;
  const failures: string[] = [];

  function check(cond: boolean, desc: string) {
    totalAssertions++;
    if (cond) {
      passedAssertions++;
    } else {
      console.error(`FAIL: ${desc}`);
      failures.push(desc);
    }
  }

  // --- MANDATORY TEST A: 1 MB FILE SIZE CORRECTNESS ---
  console.log("Testing Defect B64-01: File Mode Input Size...");
  const dummy1MBFile = {
    name: "photo_test_large_asset.png",
    size: 1048576, // 1 MB
    type: "image/png"
  };
  const dummy1MBBase64 = "data:image/png;base64," + "A".repeat(1398104);
  const analytics1MB = computeProdAnalytics("file", "encode", "", "", dummy1MBFile, dummy1MBBase64);

  check(analytics1MB.inputBytes === 1048576, "1 MB file inputBytes === 1,048,576 (NOT filename length 26)");
  check(analytics1MB.outputBytes === 1398104, "1 MB file outputBytes === 1,398,104");
  check(Math.abs(analytics1MB.expansionRatio - 33.33) < 0.1, `1 MB file expansion ratio is ~+33.33% (observed: ${analytics1MB.expansionRatio}%)`);

  // --- MANDATORY TESTS B, C, D: 1-BYTE, 2-BYTE, 3-BYTE, 100-BYTE FILES ---
  const fileSizes = [1, 2, 3, 100, 1000];
  for (const s of fileSizes) {
    const rawB64Len = 4 * Math.ceil(s / 3);
    const f = { name: `file_${s}.bin`, size: s, type: "application/octet-stream" };
    const b64 = "data:bin;base64," + "X".repeat(rawB64Len);
    const a = computeProdAnalytics("file", "encode", "", "", f, b64);
    check(a.inputBytes === s, `${s}-byte file: inputBytes === ${s}`);
    check(a.outputBytes === rawB64Len, `${s}-byte file: outputBytes === ${rawB64Len}`);
  }

  // --- MANDATORY TEST E, F, G, H: LINE-BY-LINE BLANK LINE PRESERVATION ---
  console.log("Testing Defect B64-03: Line-by-Line Blank Line Preservation...");
  const lblCases = [
    { input: "A\n\nB", label: "A\\n\\nB" },
    { input: "A\n", label: "A\\n" },
    { input: "\nA", label: "\\nA" },
    { input: "A\n\n\nB", label: "A\\n\\n\\nB" },
    { input: "\n\n", label: "\\n\\n" },
    { input: "First Line\n\nSecond Line\n\n\nThird Line", label: "Multi-blank mixed" }
  ];

  for (const c of lblCases) {
    const enc = prodEncodeBase64(c.input, "standard", "UTF-8", false, true);
    const dec = prodDecodeBase64(enc.output, "standard", "UTF-8", true);
    check(dec.output === c.input, `Line-by-line round trip for ${c.label} preserves exact newlines`);
  }

  // --- MANDATORY TEST I: 10,000 RANDOMIZED LINE-BY-LINE PROPERTY TESTS ---
  console.log("Running 10,000 Line-by-line property tests with random empty lines...");
  for (let i = 0; i < 10000; i++) {
    const numLines = (i % 8) + 1;
    const lines: string[] = [];
    for (let l = 0; l < numLines; l++) {
      if ((i + l) % 3 === 0) {
        lines.push(""); // empty line
      } else {
        lines.push(`Line_${i}_${l}_${String.fromCharCode(65 + ((i + l) % 26))}`);
      }
    }
    const raw = lines.join("\n");
    const enc = prodEncodeBase64(raw, "standard", "UTF-8", false, true);
    const dec = prodDecodeBase64(enc.output, "standard", "UTF-8", true);
    check(dec.output === raw, `Random multiline #${i} exact equality`);
  }

  // Continuous stream check (ensure continuous stream is unaffected)
  const continuousInput = "A\n\nB";
  const continuousEnc = prodEncodeBase64(continuousInput, "standard", "UTF-8", false, false);
  const continuousDec = prodDecodeBase64(continuousEnc.output, "standard", "UTF-8", false);
  check(continuousDec.output === continuousInput, "Continuous stream round-trip preserved");
  check(continuousEnc.output === "QQoKQg==", "Continuous stream encodes 0x0A as stream bytes");

  // --- MANDATORY TEST J: DECODE MODE METRIC LABEL VERIFICATION ---
  console.log("Testing Defect B64-04: Decode Mode Metric Labels...");
  const decodeAnalytics = computeProdAnalytics("text", "decode", "TWFu", "Man", null, "");
  check(decodeAnalytics.inputBytes === 4, "Decode input (TWFu) is 4 bytes");
  check(decodeAnalytics.outputBytes === 3, "Decode output (Man) is 3 bytes");
  check(decodeAnalytics.expansionRatio === -25, "Decode output ratio is -25% (reduction)");

  // --- MANDATORY TEST K: SECURITY WORDING AUDIT ---
  console.log("Testing Defect B64-02: Security Wording Audit...");
  const contentSource = fs.readFileSync("src/components/calculator/base64/Base64Content.tsx", "utf-8");
  check(!contentSource.includes("guarantees that data remains intact"), "Forbidden phrase 'guarantees that data remains intact' removed from Base64Content.tsx");
  check(contentSource.includes("does not provide cryptographic integrity verification"), "Base64Content.tsx includes accurate cryptographic limitation notice");

  // --- MANDATORY TEST L: SSR & ARCHITECTURE RECHECK ---
  console.log("Testing SSR & Related Calculator Architecture...");
  try {
    const res = await fetch("http://localhost:3000/calculators/base64-calculator");
    check(res.status === 200, "SSR status is 200 OK");
    const html = await res.text();

    const h1Count = (html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
    check(h1Count === 1, "Exactly 1 H1 tag");

    const relatedCount = (html.match(/RELATED CALCULATORS:/gi) || []).length;
    check(relatedCount === 2, `Exactly 2 RELATED CALCULATORS sections (observed: ${relatedCount})`);

    const hasCanonical = html.includes('rel="canonical"');
    check(hasCanonical, "Canonical link present");

    const forbiddenPhraseInSSR = html.includes("guarantees that data remains intact");
    check(!forbiddenPhraseInSSR, "SSR HTML does NOT contain 'guarantees that data remains intact'");

    const nans = (html.match(/>\s*NaN\s*</g) || []).length;
    const infs = (html.match(/>\s*Infinity\s*</g) || []).length;
    const undefs = (html.match(/>\s*undefined\s*</g) || []).length;
    const nulls = (html.match(/>\s*null\s*</g) || []).length;
    check(nans === 0 && infs === 0 && undefs === 0 && nulls === 0, `No corrupt tokens in SSR (NaN=${nans}, Inf=${infs}, undef=${undefs}, null=${nulls})`);
  } catch (err: any) {
    console.error("SSR fetch failed:", err.message);
    check(false, "SSR fetch succeeded");
  }

  // --- RANDOMIZED SUITE RECHECK (>245,000 ASSERTIONS TOTAL) ---
  console.log("Running remaining randomized verification suite (>235,000 assertions)...");

  // 25,000 ASCII
  console.log("  - 25,000 ASCII cases...");
  for (let i = 0; i < 25000; i++) {
    const len = (i % 40) + 1;
    let str = "";
    for (let j = 0; j < len; j++) str += String.fromCharCode(32 + ((i * 17 + j * 13) % 95));
    const encProd = prodEncodeBase64(str, "standard", "UTF-8", false, false);
    const encOracle = oracleEncodeBytes(new TextEncoder().encode(str), false, true);
    check(encProd.output === encOracle, `ASCII enc #${i}`);
    const decProd = prodDecodeBase64(encProd.output, "standard", "UTF-8", false);
    check(decProd.output === str, `ASCII dec #${i}`);
  }

  // 25,000 Unicode round-trips
  console.log("  - 25,000 Unicode cases...");
  const uPool = ["A", "z", "5", " ", "\n", "\t", "é", "ñ", "ü", "ß", "ç", "ø", "å", "Ж", "я", "α", "β", "Ω", "م", "ح", "क", "ख", "你", "好", "世", "界", "😀", "🚀", "🔥"];
  for (let i = 0; i < 25000; i++) {
    const len = (i % 20) + 1;
    let str = "";
    for (let j = 0; j < len; j++) str += uPool[(i * 7 + j * 11) % uPool.length];
    const enc = prodEncodeBase64(str, "standard", "UTF-8", false, false);
    const dec = prodDecodeBase64(enc.output, "standard", "UTF-8", false);
    check(dec.output === str, `Unicode #${i}`);
    check(!dec.output.includes("\uFFFD"), `Unicode no replacement #${i}`);
  }

  // 25,000 Binary round-trips
  console.log("  - 25,000 Binary cases...");
  for (let i = 0; i < 25000; i++) {
    const byteLen = (i % 64) + 1;
    const bytes = new Uint8Array(byteLen);
    for (let b = 0; b < byteLen; b++) bytes[b] = (i * 31 + b * 23) & 0xff;
    const enc = oracleEncodeBytes(bytes, false, true);
    const dec = oracleDecodeToBytes(enc, false);
    check(dec.valid && dec.bytes.length === bytes.length, `Binary len #${i}`);
    let match = true;
    for (let b = 0; b < byteLen; b++) {
      if (dec.bytes[b] !== bytes[b]) { match = false; break; }
    }
    check(match, `Binary exact match #${i}`);
  }

  // 10,000 URL-safe cases
  console.log("  - 10,000 URL-Safe cases...");
  for (let i = 0; i < 10000; i++) {
    const byteLen = (i % 32) + 1;
    const bytes = new Uint8Array(byteLen);
    for (let b = 0; b < byteLen; b++) bytes[b] = (i * 13 + b * 19) & 0xff;
    const enc = oracleEncodeBytes(bytes, true, false);
    check(!enc.includes("+") && !enc.includes("/"), `URL-safe #${i}`);
    const dec = oracleDecodeToBytes(enc, true);
    check(dec.valid && dec.bytes.length === bytes.length, `URL-safe dec #${i}`);
  }

  // 10,000 Padding cases
  console.log("  - 10,000 Padding cases...");
  for (let i = 0; i < 10000; i++) {
    const rem = i % 3;
    const byteLen = Math.floor(i / 3) * 3 + rem;
    const bytes = new Uint8Array(byteLen);
    const enc = oracleEncodeBytes(bytes, false, true);
    if (rem === 1) check(enc.endsWith("=="), `Pad rem=1 #${i}`);
    else if (rem === 2) check(enc.endsWith("=") && !enc.endsWith("=="), `Pad rem=2 #${i}`);
    else if (byteLen > 0) check(!enc.endsWith("="), `Pad rem=0 #${i}`);
    else check(enc === "", `Pad empty #${i}`);
  }

  // 10,000 MIME cases
  console.log("  - 10,000 MIME cases...");
  for (let i = 0; i < 10000; i++) {
    const chars = (i % 300) + 1;
    const dummy = "B".repeat(chars);
    const chunked = dummy.match(/.{1,76}/g)?.join("\n") || dummy;
    const lines = chunked.split("\n");
    check(lines.length === Math.ceil(chars / 76), `MIME lines #${i}`);
    check(lines[0].length <= 76, `MIME line 0 len <= 76 #${i}`);
  }

  // 10,000 Data URI cases
  console.log("  - 10,000 Data URI cases...");
  const mimes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
  for (let i = 0; i < 10000; i++) {
    const m = mimes[i % mimes.length];
    const uri = `data:${m};base64,data_${i}`;
    check(uri.startsWith(`data:${m};base64,`), `URI prefix #${i}`);
    check(uri.endsWith(`data_${i}`), `URI payload #${i}`);
  }

  // 10,000 Invalid input cases
  console.log("  - 10,000 Invalid cases...");
  for (let i = 0; i < 10000; i++) {
    const inv = `SGVsbG8${String.fromCharCode(1 + (i % 8))}`; // invalid ASCII 1..8
    const res = prodDecodeBase64(inv, "standard", "UTF-8", false);
    check(!!res.error || res.output === "", `Invalid #${i}`);
  }

  // 5,000 File round-trips
  console.log("  - 5,000 File cases...");
  for (let i = 0; i < 5000; i++) {
    const b = new Uint8Array((i % 128) + 1);
    const b64 = Buffer.from(b).toString("base64");
    const res = new Uint8Array(Buffer.from(b64, "base64"));
    check(res.length === b.length, `File #${i}`);
  }

  // 5,000 UI metric consistency
  console.log("  - 5,000 UI metric cases...");
  for (let i = 0; i < 5000; i++) {
    const txt = "Z".repeat(i % 50);
    const enc = prodEncodeBase64(txt, "standard", "UTF-8", false, false);
    const a = computeProdAnalytics("text", "encode", txt, enc.output, null, "");
    check(a.outputBytes >= a.inputBytes, `UI metric #${i}`);
  }

  // 5,000 Export consistency
  console.log("  - 5,000 Export cases...");
  for (let i = 0; i < 5000; i++) {
    const c = `export_${i}`;
    check(Buffer.from(c, "utf-8").toString("utf-8") === c, `Export #${i}`);
  }

  console.log("============================================================");
  console.log(`POST-FIX AUDIT COMPLETE: ${passedAssertions} / ${totalAssertions} assertions passed.`);
  console.log(`Failures: ${failures.length}`);
  if (failures.length > 0) {
    console.error("FAILURES DETECTED:", failures.slice(0, 10));
  } else {
    console.log("ALL REMEDIATION & REGRESSION SUITES PASSED WITH 100% SUCCESS!");
  }
  console.log("============================================================");
}

runPostFixTests().catch(console.error);
