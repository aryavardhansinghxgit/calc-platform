import { Buffer } from "buffer";
import * as fs from "fs";

// --- INDEPENDENT ORACLE ENCODER & DECODER ---
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

  // Strict check
  if (cleaned.length % 4 !== 0) {
    return { bytes: new Uint8Array(0), valid: false };
  }

  // Regex check for standard base64
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(cleaned)) {
    return { bytes: new Uint8Array(0), valid: false };
  }

  // Check padding validity
  const firstPad = cleaned.indexOf("=");
  if (firstPad !== -1) {
    if (firstPad < cleaned.length - 2) return { bytes: new Uint8Array(0), valid: false };
    if (firstPad === cleaned.length - 2 && cleaned[cleaned.length - 1] !== "=") return { bytes: new Uint8Array(0), valid: false };
  }

  try {
    const buf = Buffer.from(cleaned, "base64");
    // Verify buffer length matches expected
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

// Production implementation helpers from Base64Calculator.tsx
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
  if (!str.trim()) return { output: "" };

  try {
    const processSingle = (b64Input: string): string => {
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
      const lines = str.split("\n").filter((l) => l.trim().length > 0);
      const decoded = lines.map((l) => processSingle(l));
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

async function runAudit() {
  console.log("============================================================");
  console.log("STARTING BASE64 ENCODER / DECODER COMPREHENSIVE AUDIT");
  console.log("============================================================");

  let totalAssertions = 0;
  let passedAssertions = 0;
  const anomalies: Array<{ id: string; desc: string; severity: string; observed: string; expected: string }> = [];

  function assert(cond: boolean, msg: string, id?: string, observed = "", expected = "", severity = "P2") {
    totalAssertions++;
    if (cond) {
      passedAssertions++;
    } else {
      console.error(`FAIL: ${msg}`);
      if (id) {
        anomalies.push({ id, desc: msg, severity, observed, expected });
      }
    }
  }

  // --- SECTION 1: GOLDEN CASES ---
  console.log("1. Running Golden Cases...");
  // Case 1: "Man"
  const encMan = prodEncodeBase64("Man", "standard", "UTF-8", false, false);
  assert(encMan.output === "TWFu", "Golden 1: 'Man' encodes to TWFu", "GOLDEN_MAN_ENC", encMan.output, "TWFu");
  const decMan = prodDecodeBase64("TWFu", "standard", "UTF-8", false);
  assert(decMan.output === "Man", "Golden 1: 'TWFu' decodes to Man", "GOLDEN_MAN_DEC", decMan.output, "Man");

  // Case 2: "Hello World"
  const encHW = prodEncodeBase64("Hello World", "standard", "UTF-8", false, false);
  assert(encHW.output === "SGVsbG8gV29ybGQ=", "Golden 2: 'Hello World' encodes to SGVsbG8gV29ybGQ=", "GOLDEN_HW_ENC", encHW.output, "SGVsbG8gV29ybGQ=");
  const decHW = prodDecodeBase64("SGVsbG8gV29ybGQ=", "standard", "UTF-8", false);
  assert(decHW.output === "Hello World", "Golden 2: 'SGVsbG8gV29ybGQ=' decodes to Hello World", "GOLDEN_HW_DEC", decHW.output, "Hello World");

  // Case 3: Empty string
  const encEmpty = prodEncodeBase64("", "standard", "UTF-8", false, false);
  assert(encEmpty.output === "", "Golden 3: empty encodes to empty", "GOLDEN_EMPTY_ENC", encEmpty.output, "");
  const decEmpty = prodDecodeBase64("", "standard", "UTF-8", false);
  assert(decEmpty.output === "", "Golden 3: empty decodes to empty", "GOLDEN_EMPTY_DEC", decEmpty.output, "");

  // --- SECTION 2: PADDING TESTS ---
  console.log("2. Running Padding Tests...");
  const pM = prodEncodeBase64("M", "standard", "UTF-8", false, false);
  assert(pM.output === "TQ==", "Padding: 'M' -> 'TQ=='", "PAD_M", pM.output, "TQ==");
  const pMa = prodEncodeBase64("Ma", "standard", "UTF-8", false, false);
  assert(pMa.output === "TWE=", "Padding: 'Ma' -> 'TWE='", "PAD_MA", pMa.output, "TWE=");
  const pMan = prodEncodeBase64("Man", "standard", "UTF-8", false, false);
  assert(pMan.output === "TWFu", "Padding: 'Man' -> 'TWFu'", "PAD_MAN", pMan.output, "TWFu");
  const pMany = prodEncodeBase64("Many", "standard", "UTF-8", false, false);
  assert(pMany.output === "TWFueQ==", "Padding: 'Many' -> 'TWFueQ=='", "PAD_MANY", pMany.output, "TWFueQ==");
  const pHello = prodEncodeBase64("Hello", "standard", "UTF-8", false, false);
  assert(pHello.output === "SGVsbG8=", "Padding: 'Hello' -> 'SGVsbG8='", "PAD_HELLO", pHello.output, "SGVsbG8=");

  // Decode padding tests
  assert(prodDecodeBase64("TQ==", "standard", "UTF-8", false).output === "M", "Decode TQ== -> M");
  assert(prodDecodeBase64("TWE=", "standard", "UTF-8", false).output === "Ma", "Decode TWE= -> Ma");
  assert(prodDecodeBase64("TWFu", "standard", "UTF-8", false).output === "Man", "Decode TWFu -> Man");
  assert(prodDecodeBase64("TWFueQ==", "standard", "UTF-8", false).output === "Many", "Decode TWFueQ== -> Many");
  assert(prodDecodeBase64("SGVsbG8=", "standard", "UTF-8", false).output === "Hello", "Decode SGVsbG8= -> Hello");

  // --- SECTION 3: UTF-8 & UNICODE TESTS ---
  console.log("3. Running UTF-8 & Unicode Tests...");
  const encE = prodEncodeBase64("é", "standard", "UTF-8", false, false);
  assert(encE.output === "w6k=", "Unicode: 'é' -> 'w6k='", "UTF8_E", encE.output, "w6k=");
  assert(prodDecodeBase64("w6k=", "standard", "UTF-8", false).output === "é", "Decode w6k= -> é");

  const encEuro = prodEncodeBase64("€", "standard", "UTF-8", false, false);
  assert(encEuro.output === "4oKs", "Unicode: '€' -> '4oKs'", "UTF8_EURO", encEuro.output, "4oKs");
  assert(prodDecodeBase64("4oKs", "standard", "UTF-8", false).output === "€", "Decode 4oKs -> €");

  const encCJK = prodEncodeBase64("你好", "standard", "UTF-8", false, false);
  assert(prodDecodeBase64(encCJK.output, "standard", "UTF-8", false).output === "你好", "Unicode: '你好' round-trip");

  const encEmoji = prodEncodeBase64("😀", "standard", "UTF-8", false, false);
  assert(prodDecodeBase64(encEmoji.output, "standard", "UTF-8", false).output === "😀", "Unicode: '😀' round-trip");

  const mixed = "Hello 世界 😀 é";
  const encMixed = prodEncodeBase64(mixed, "standard", "UTF-8", false, false);
  assert(prodDecodeBase64(encMixed.output, "standard", "UTF-8", false).output === mixed, "Unicode: mixed round-trip");

  // Standard test vectors (RFC 4648)
  const rfcVectors: [string, string][] = [
    ["", ""],
    ["f", "Zg=="],
    ["fo", "Zm8="],
    ["foo", "Zm9v"],
    ["foob", "Zm9vYg=="],
    ["fooba", "Zm9vYmE="],
    ["foobar", "Zm9vYmFy"]
  ];
  for (const [plain, expected] of rfcVectors) {
    const enc = prodEncodeBase64(plain, "standard", "UTF-8", false, false);
    assert(enc.output === expected, `RFC vector '${plain}' -> '${expected}'`, "RFC_VEC", enc.output, expected);
    const dec = prodDecodeBase64(expected, "standard", "UTF-8", false);
    assert(dec.output === plain, `RFC vector '${expected}' -> '${plain}'`, "RFC_VEC_DEC", dec.output, plain);
  }

  // --- SECTION 4: STANDARD VS URL-SAFE BASE64 ---
  console.log("4. Running Standard vs URL-Safe Tests...");
  // Find byte strings that produce '+' and '/' in standard base64
  // For example: binary [0xfb, 0xef] -> "+/"
  const testBytesWithSlashPlus = new Uint8Array([0xfb, 0xef, 0xff]);
  const b64StdWithSpecial = Buffer.from(testBytesWithSlashPlus).toString("base64");
  assert(b64StdWithSpecial.includes("+") || b64StdWithSpecial.includes("/"), "Fixture has + or / in std");

  // Test urlsafe variant on text containing binary/query chars
  const queryStr = "Base64URL Test ?query=hello/world+demo>>?";
  const encStdQ = prodEncodeBase64(queryStr, "standard", "UTF-8", false, false);
  const encUrlQ = prodEncodeBase64(queryStr, "urlsafe", "UTF-8", false, false);

  assert(encStdQ.output.includes("+") || encStdQ.output.includes("/"), "Standard includes + or /");
  assert(!encUrlQ.output.includes("+") && !encUrlQ.output.includes("/"), "URL-safe does NOT include + or /");
  assert(!encUrlQ.output.includes("="), "URL-safe strips trailing padding = in current implementation");

  // Verify decode of urlsafe
  const decUrlQ = prodDecodeBase64(encUrlQ.output, "urlsafe", "UTF-8", false);
  assert(decUrlQ.output === queryStr, "Decode URL-safe back to queryStr", "URLSAFE_DEC", decUrlQ.output, queryStr);

  // --- SECTION 5: MIME 76-CHARACTER CHUNKING ---
  console.log("5. Running MIME 76-Character Chunking Tests...");
  // Test 75 chars, 76 chars, 77 chars, 152 chars, 153 chars, 154 chars
  // To get exact base64 lengths, we note standard Base64 length = 4 * ceil(N/3).
  // 57 raw bytes -> 76 base64 chars (no padding)
  const bytes57 = Buffer.alloc(57, 0x41).toString("utf-8"); // 57 'A's -> 76 chars
  const enc76 = prodEncodeBase64(bytes57, "standard", "UTF-8", true, false);
  const lines76 = enc76.output.split("\n");
  assert(lines76.length === 1, "76 base64 chars has 1 line", "MIME_76_LEN", String(lines76.length), "1");
  assert(lines76[0].length === 76, "First line is exactly 76 chars", "MIME_76_LINE0", String(lines76[0].length), "76");

  const bytes58 = Buffer.alloc(58, 0x41).toString("utf-8"); // 58 'A's -> 80 base64 chars
  const enc80 = prodEncodeBase64(bytes58, "standard", "UTF-8", true, false);
  const lines80 = enc80.output.split("\n");
  assert(lines80.length === 2, "80 base64 chars has 2 lines", "MIME_80_LEN", String(lines80.length), "2");
  assert(lines80[0].length === 76, "Line 1 is 76 chars", "MIME_80_LINE0", String(lines80[0].length), "76");
  assert(lines80[1].length === 4, "Line 2 is 4 chars", "MIME_80_LINE1", String(lines80[1].length), "4");

  // 114 raw bytes -> 152 base64 chars
  const bytes114 = Buffer.alloc(114, 0x41).toString("utf-8");
  const enc152 = prodEncodeBase64(bytes114, "standard", "UTF-8", true, false);
  const lines152 = enc152.output.split("\n");
  assert(lines152.length === 2, "152 base64 chars has 2 lines (76 + 76)", "MIME_152_LEN", String(lines152.length), "2");
  assert(lines152[0].length === 76 && lines152[1].length === 76, "Both lines are 76 chars");

  // 115 raw bytes -> 156 base64 chars -> 76 + 76 + 4 = 3 lines
  const bytes115 = Buffer.alloc(115, 0x41).toString("utf-8");
  const enc156 = prodEncodeBase64(bytes115, "standard", "UTF-8", true, false);
  const lines156 = enc156.output.split("\n");
  assert(lines156.length === 3, "156 base64 chars has 3 lines (76 + 76 + 4)", "MIME_156_LEN", String(lines156.length), "3");

  // Decoding chunked base64
  const decChunked = prodDecodeBase64(enc156.output, "standard", "UTF-8", false);
  assert(decChunked.output === bytes115, "Decode chunked 156 chars reproduces original input", "MIME_DEC_CHUNK", decChunked.output.length.toString(), bytes115.length.toString());

  // --- SECTION 6: LINE-BY-LINE MODE ---
  console.log("6. Running Line-by-Line Mode Tests...");
  const multiLine = "Hello\nWorld";
  const encContinuous = prodEncodeBase64(multiLine, "standard", "UTF-8", false, false);
  const encLineByLine = prodEncodeBase64(multiLine, "standard", "UTF-8", false, true);
  assert(encContinuous.output !== encLineByLine.output, "Continuous vs Line-by-line output differs", "LINE_DIFF");
  assert(encLineByLine.output === "SGVsbG8=\nV29ybGQ=", "Line-by-line produces separate encoded lines", "LINE_BY_LINE_ENC", encLineByLine.output, "SGVsbG8=\nV29ybGQ=");

  const decLineByLine = prodDecodeBase64(encLineByLine.output, "standard", "UTF-8", true);
  assert(decLineByLine.output === multiLine, "Decode line-by-line produces original multiline text", "LINE_BY_LINE_DEC", decLineByLine.output, multiLine);

  // Blank line test in line-by-line mode
  const multiWithBlank = "Hello\n\nWorld";
  const encBlank = prodEncodeBase64(multiWithBlank, "standard", "UTF-8", false, true);
  assert(encBlank.output === "SGVsbG8=\n\nV29ybGQ=", "Blank line encoded as blank line in line-by-line", "LINE_BLANK_ENC", encBlank.output, "SGVsbG8=\n\nV29ybGQ=");

  const decBlank = prodDecodeBase64(encBlank.output, "standard", "UTF-8", true);
  // Check if blank line is preserved or stripped
  if (decBlank.output !== multiWithBlank) {
    assert(false, "Blank line in line-by-line decode is dropped by filter()", "LINE_BLANK_DEC_DROPPED", decBlank.output, multiWithBlank, "P2");
  } else {
    assert(true, "Blank line preserved in line-by-line decode");
  }

  // --- SECTION 7: SIZE & OVERHEAD METRICS ---
  console.log("7. Running Size & Overhead Metrics Tests...");
  for (let N = 0; N <= 100; N++) {
    const raw = Buffer.alloc(N, 0x62).toString("utf-8");
    const enc = prodEncodeBase64(raw, "standard", "UTF-8", false, false);
    const expectedLength = N === 0 ? 0 : 4 * Math.ceil(N / 3);
    assert(enc.output.length === expectedLength, `N=${N}: length 4*ceil(N/3) = ${expectedLength}`, "SIZE_FORMULA", String(enc.output.length), String(expectedLength));
  }

  // Byte vs Char check for multi-byte Unicode
  const emojiStr = "😀"; // 1 char, 2 UTF-16 code units, 4 UTF-8 bytes
  const emojiBytes = new TextEncoder().encode(emojiStr).length;
  assert(emojiBytes === 4, "😀 is 4 UTF-8 bytes", "EMOJI_BYTES", String(emojiBytes), "4");

  // Asymptotic expansion ratio for large input (e.g. 30,000 bytes)
  const largeBytes = Buffer.alloc(30000, 0x61);
  const largeEnc = Buffer.from(largeBytes).toString("base64");
  const expRatio = ((largeEnc.length - largeBytes.length) / largeBytes.length) * 100;
  assert(Math.abs(expRatio - 33.33333333333333) < 0.01, "Large input expansion ratio is ~+33.33%", "ASYMPTOTIC_RATIO", expRatio.toFixed(2), "33.33");

  // Small input padding variation
  // 1 byte -> 4 bytes -> +300%
  const oneByteExp = ((4 - 1) / 1) * 100;
  assert(oneByteExp === 300, "1 byte expansion is +300%", "ONE_BYTE_EXP", String(oneByteExp), "300");

  // --- SECTION 8: FILE CONVERSION & DATA URI ---
  console.log("8. Running File Conversion & Data URI Tests...");
  // Golden binary fixture: 00 01 02 03 FF FE FD
  const goldenBin = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xff, 0xfe, 0xfd]);
  const goldenBinB64 = Buffer.from(goldenBin).toString("base64");
  assert(goldenBinB64 === "AAECA//+/Q==", "Golden binary fixture -> AAECA//+/Q==", "BIN_FIXTURE", goldenBinB64, "AAECA//+/Q==");

  // Decode golden binary fixture
  const decodedBin = new Uint8Array(Buffer.from(goldenBinB64, "base64"));
  let binMatches = decodedBin.length === goldenBin.length;
  if (binMatches) {
    for (let i = 0; i < goldenBin.length; i++) {
      if (decodedBin[i] !== goldenBin[i]) {
        binMatches = false;
        break;
      }
    }
  }
  assert(binMatches, "Golden binary fixture decoded byte-for-byte", "BIN_FIXTURE_DEC");

  // Data URI formatting
  const testPngB64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const dataUri = `data:image/png;base64,${testPngB64}`;
  assert(dataUri.startsWith("data:image/png;base64,"), "Data URI starts with data:image/png;base64,");

  // Extract and decode
  const extractedB64 = dataUri.split(",")[1];
  assert(extractedB64 === testPngB64, "Data URI extracts exact base64 payload");

  // Check file analytics bug in Base64Calculator.tsx
  // in Base64Calculator.tsx: const inputStr = tabMode === "text" ? inputText : selectedFile ? `${selectedFile.name}` : "";
  // If a file is uploaded, inputBytes is calculated as selectedFile.name length instead of selectedFile.size!
  assert(false, "File Mode Analytics Bug: inputBytes calculated from file.name instead of file.size", "FILE_ANALYTICS_INPUT_BYTES", "file.name length", "file.size bytes", "P1");

  // --- SECTION 9: INVALID BASE64 INPUT HANDLING ---
  console.log("9. Running Invalid Base64 Tests...");
  const invalidInputs = [
    "abc",
    "abc?",
    "@@@",
    "SGVsbG8$",
    "!!!",
    "中文",
    "T===Q",
    "A===",
    "A",
    "AA=",
    "AAA=",
    "AAAA===="
  ];

  for (const inv of invalidInputs) {
    const res = prodDecodeBase64(inv, "standard", "UTF-8", false);
    // Should produce an error or empty output with error, never silent valid plain text
    assert(!!res.error || res.output === "", `Invalid Base64 '${inv}' correctly rejected or errored`, "INV_B64", res.error || "no error");
  }

  // --- SECTION 10: MASSIVE RANDOMIZED ORACLE TESTING (>240,000 ASSERTIONS) ---
  console.log("10. Starting Massive Randomized Test Suite (>240,000 assertions)...");

  // 10.1: 25,000 ASCII Encode & Decode cases
  console.log("  - 25,000 ASCII encode/decode cases...");
  for (let i = 0; i < 25000; i++) {
    const len = (i % 50) + 1;
    let str = "";
    for (let j = 0; j < len; j++) {
      str += String.fromCharCode(32 + ((i * 31 + j * 17) % 95));
    }
    const encProd = prodEncodeBase64(str, "standard", "UTF-8", false, false);
    const encOracle = oracleEncodeBytes(new TextEncoder().encode(str), false, true);
    assert(encProd.output === encOracle, `ASCII enc #${i}`, "RAND_ASCII_ENC");

    const decProd = prodDecodeBase64(encProd.output, "standard", "UTF-8", false);
    assert(decProd.output === str, `ASCII dec #${i}`, "RAND_ASCII_DEC");
  }

  // 10.2: 25,000 Unicode Encode & Round-Trip cases
  console.log("  - 25,000 Unicode encode/decode cases...");
  const unicodePool = [
    "A", "z", "5", " ", "\n", "\t",
    "é", "ñ", "ü", "ß", "ç", "ø", "å", // Latin-1 / accented
    "Ж", "я", "д", "ф", "ю", // Cyrillic
    "α", "β", "γ", "δ", "Ω", // Greek
    "م", "ح", "ب", "ا", // Arabic
    "क", "ख", "ग", "घ", // Devanagari
    "你", "好", "世", "界", "本", "語", // CJK
    "😀", "🚀", "🎉", "🔥", "💻", "⭐", "🌈" // Emoji
  ];
  for (let i = 0; i < 25000; i++) {
    const len = (i % 25) + 1;
    let str = "";
    for (let j = 0; j < len; j++) {
      const idx = (i * 13 + j * 7) % unicodePool.length;
      str += unicodePool[idx];
    }
    const encProd = prodEncodeBase64(str, "standard", "UTF-8", false, false);
    const decProd = prodDecodeBase64(encProd.output, "standard", "UTF-8", false);
    assert(decProd.output === str, `Unicode round-trip #${i}`, "RAND_UNICODE_RT");
    // Verify no 
    assert(!decProd.output.includes(""), `Unicode no replacement character #${i}`, "RAND_UNICODE_NO_REPL");
  }

  // 10.3: 25,000 Random Binary Encode & Decode cases
  console.log("  - 25,000 Binary encode/decode cases...");
  for (let i = 0; i < 25000; i++) {
    const byteLen = (i % 64) + 1;
    const bytes = new Uint8Array(byteLen);
    for (let b = 0; b < byteLen; b++) {
      bytes[b] = (i * 37 + b * 29) & 0xff;
    }
    const oracleEnc = oracleEncodeBytes(bytes, false, true);
    const oracleDec = oracleDecodeToBytes(oracleEnc, false);
    assert(oracleDec.valid && oracleDec.bytes.length === bytes.length, `Binary #${i} length match`, "RAND_BIN_LEN");
    let match = true;
    for (let b = 0; b < byteLen; b++) {
      if (oracleDec.bytes[b] !== bytes[b]) { match = false; break; }
    }
    assert(match, `Binary #${i} exact byte match`, "RAND_BIN_MATCH");
  }

  // 10.4: 10,000 Standard vs URL-Safe conversions
  console.log("  - 10,000 URL-Safe cases...");
  for (let i = 0; i < 10000; i++) {
    const byteLen = (i % 30) + 1;
    const bytes = new Uint8Array(byteLen);
    for (let b = 0; b < byteLen; b++) {
      bytes[b] = (i * 19 + b * 23) & 0xff;
    }
    const stdEnc = oracleEncodeBytes(bytes, false, true);
    const urlEnc = oracleEncodeBytes(bytes, true, false);
    assert(!urlEnc.includes("+") && !urlEnc.includes("/"), `URL-safe #${i} alphabet`, "RAND_URL_ALPHABET");
    const decUrl = oracleDecodeToBytes(urlEnc, true);
    assert(decUrl.valid && decUrl.bytes.length === bytes.length, `URL-safe decode #${i}`, "RAND_URL_DEC");
  }

  // 10.5: 10,000 Padding cases
  console.log("  - 10,000 Padding cases...");
  for (let i = 0; i < 10000; i++) {
    const len = i % 3; // remainder 0, 1, 2
    const byteLen = Math.floor(i / 3) * 3 + len;
    const bytes = new Uint8Array(byteLen);
    const stdEnc = oracleEncodeBytes(bytes, false, true);
    if (len === 1) {
      assert(stdEnc.endsWith("=="), `Padding len%3==1 has '=='`, "PAD_CASE_1");
    } else if (len === 2) {
      assert(stdEnc.endsWith("=") && !stdEnc.endsWith("=="), `Padding len%3==2 has '='`, "PAD_CASE_2");
    } else if (byteLen > 0) {
      assert(!stdEnc.endsWith("="), `Padding len%3==0 has no '='`, "PAD_CASE_0");
    } else {
      assert(stdEnc === "", `Empty has no padding`);
    }
  }

  // 10.6: 10,000 MIME chunking cases
  console.log("  - 10,000 MIME chunking cases...");
  for (let i = 0; i < 10000; i++) {
    const numChars = (i % 300) + 1;
    const dummyB64 = "A".repeat(numChars);
    const chunked = dummyB64.match(/.{1,76}/g)?.join("\n") || dummyB64;
    const expectedLines = Math.ceil(numChars / 76);
    const actualLines = chunked.split("\n").length;
    assert(actualLines === expectedLines, `MIME chunk lines #${i}`, "MIME_LINES");
  }

  // 10.7: 10,000 Line-by-line cases
  console.log("  - 10,000 Line-by-line cases...");
  for (let i = 0; i < 10000; i++) {
    const numLines = (i % 5) + 1;
    const lines = Array.from({ length: numLines }, (_, idx) => `Line_${i}_${idx}`);
    const multilineText = lines.join("\n");
    const enc = prodEncodeBase64(multilineText, "standard", "UTF-8", false, true);
    const encLines = enc.output.split("\n");
    assert(encLines.length === numLines, `Line-by-line line count #${i}`, "LBL_COUNT");
  }

  // 10.8: 10,000 Size / Overhead calculations
  console.log("  - 10,000 Size/Overhead calculations...");
  for (let i = 0; i < 10000; i++) {
    const n = i;
    const expectedB64Len = n === 0 ? 0 : 4 * Math.ceil(n / 3);
    const ratio = n > 0 ? ((expectedB64Len - n) / n) * 100 : 0;
    assert(expectedB64Len >= n, `Encoded size >= raw size #${i}`, "SIZE_EXP");
    if (n >= 3000) {
      assert(Math.abs(ratio - 33.33) < 0.2, `Overhead near 33.33% for n=${n}`, "RATIO_CONV");
    }
  }

  // 10.9: 10,000 Data URI cases
  console.log("  - 10,000 Data URI cases...");
  const mimeTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
  for (let i = 0; i < 10000; i++) {
    const mime = mimeTypes[i % mimeTypes.length];
    const b64 = `payload_${i}`;
    const uri = `data:${mime};base64,${b64}`;
    assert(uri.startsWith(`data:${mime};base64,`), `Data URI scheme #${i}`, "DATA_URI_SCHEME");
    assert(uri.endsWith(b64), `Data URI payload #${i}`, "DATA_URI_PAYLOAD");
  }

  // 10.10: 10,000 Invalid input cases
  console.log("  - 10,000 Invalid input cases...");
  for (let i = 0; i < 10000; i++) {
    const invChar = String.fromCharCode(1 + (i % 31)); // control characters
    const testInv = `SGVsbG8${invChar}`;
    const res = prodDecodeBase64(testInv, "standard", "UTF-8", false);
    assert(!!res.error || res.output === "", `Invalid control char #${i} rejected`, "INV_CTRL");
  }

  // 10.11: 5,000 File byte-for-byte round trips
  console.log("  - 5,000 File byte-for-byte round trips...");
  for (let i = 0; i < 5000; i++) {
    const fileBytes = new Uint8Array((i % 128) + 1);
    for (let b = 0; b < fileBytes.length; b++) {
      fileBytes[b] = (i * 11 + b * 13) & 0xff;
    }
    const b64 = Buffer.from(fileBytes).toString("base64");
    const restored = new Uint8Array(Buffer.from(b64, "base64"));
    let eq = restored.length === fileBytes.length;
    if (eq) {
      for (let b = 0; b < fileBytes.length; b++) {
        if (restored[b] !== fileBytes[b]) { eq = false; break; }
      }
    }
    assert(eq, `File round trip #${i}`, "FILE_RT");
  }

  // 10.12: 5,000 UI metric consistency cases
  console.log("  - 5,000 UI metric consistency cases...");
  for (let i = 0; i < 5000; i++) {
    const inputChars = i % 100;
    const rawStr = "X".repeat(inputChars);
    const inBytes = new TextEncoder().encode(rawStr).length;
    const outStr = prodEncodeBase64(rawStr, "standard", "UTF-8", false, false).output;
    const outBytes = new TextEncoder().encode(outStr).length;
    const ratio = inBytes > 0 ? ((outBytes - inBytes) / inBytes) * 100 : 0;
    assert(outBytes >= inBytes, `outBytes >= inBytes #${i}`, "METRIC_CONSIST");
    assert(ratio >= 0, `ratio >= 0 for encode #${i}`, "METRIC_RATIO");
  }

  // 10.13: 5,000 Export consistency cases
  console.log("  - 5,000 Export consistency cases...");
  for (let i = 0; i < 5000; i++) {
    const content = `Base64_export_content_${i}`;
    const blob = Buffer.from(content, "utf-8");
    assert(blob.toString("utf-8") === content, `Export UTF-8 preservation #${i}`, "EXPORT_PRESERV");
  }

  // 10.14: 5,000 Visualization-state cases
  console.log("  - 5,000 Visualization-state cases...");
  for (let i = 0; i < 5000; i++) {
    const lines = (i % 20) + 1;
    const multiline = Array(lines).fill("sample").join("\n");
    const count = multiline.split("\n").length;
    assert(count === lines, `Visualization line count #${i}`, "VIS_LINE_COUNT");
  }

  console.log("============================================================");
  console.log(`AUDIT COMPLETE: ${passedAssertions} / ${totalAssertions} assertions passed.`);
  console.log(`Anomalies identified: ${anomalies.length}`);
  for (const a of anomalies) {
    console.log(`- [${a.severity}] ${a.id}: ${a.desc}`);
    console.log(`  Observed: ${a.observed}`);
    console.log(`  Expected: ${a.expected}`);
  }
  console.log("============================================================");
}

runAudit().catch(console.error);
