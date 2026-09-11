import { Buffer } from "buffer";

function testPerf() {
  console.log("============================================================");
  console.log("TESTING BASE64 PERFORMANCE ACROSS SIZES");
  console.log("============================================================");

  const sizes = [
    { label: "1 KB", bytes: 1024 },
    { label: "100 KB", bytes: 100 * 1024 },
    { label: "1 MB", bytes: 1024 * 1024 },
    { label: "10 MB", bytes: 10 * 1024 * 1024 },
  ];

  for (const s of sizes) {
    const raw = Buffer.alloc(s.bytes, 0x65); // 'e' repeated
    
    // Test Encode
    const t0 = performance.now();
    const enc = raw.toString("base64");
    const t1 = performance.now();
    const encTime = (t1 - t0).toFixed(2);

    // Test Decode
    const t2 = performance.now();
    const dec = Buffer.from(enc, "base64");
    const t3 = performance.now();
    const decTime = (t3 - t2).toFixed(2);

    console.log(`Size: ${s.label.padEnd(6)} | Encode: ${encTime.padStart(6)} ms | Decode: ${decTime.padStart(6)} ms | Match: ${dec.length === raw.length}`);
  }

  console.log("============================================================");
}

testPerf();
