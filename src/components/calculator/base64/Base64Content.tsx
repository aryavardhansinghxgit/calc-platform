"use client";

import React from "react";

export function Base64Content() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: WHAT IS BASE64 ENCODING */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What is Base64 Encoding?
        </h2>
        <p>
          <strong>Base64</strong> is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. It translates raw 8-bit bytes into a sequence of printable ASCII characters chosen from a universally safe 64-character alphabet ($2^6 = 64$).
        </p>
        <p>
          In modern computing systems, legacy network protocols—such as SMTP (Email), HTTP header fields, and URL query strings—were originally designed to process standard 7-bit or 8-bit printable ASCII characters. Transporting raw binary files (such as images, compiled executables, or compressed archives) directly through these text-based channels risks data corruption caused by control characters, system line-ending conversions (\r\n vs \n), or character set translation mismatches. Base64 guarantees that data remains intact during transit across any network layer.
        </p>
      </section>

      {/* SECTION 2: HOW THE BASE64 ALGORITHM WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. How the Base64 Algorithm Works (Step-by-Step)
        </h2>
        <p>
          The Base64 algorithm processes binary data by grouping 3 input Bytes (24 bits total) and splitting them into 4 6-bit units. Each 6-bit unit yields a decimal value between 0 and 63, which maps directly to a character in the Base64 Index Table.
        </p>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mt-3">
          Step-by-Step Conversion Matrix: Encoding the String "Man"
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Step</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700" colSpan={3}>Byte 1 ('M')</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700" colSpan={3}>Byte 2 ('a')</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700" colSpan={3}>Byte 3 ('n')</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">1. ASCII Character</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>M</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>a</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>n</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">2. Decimal Value</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>77</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>97</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>110</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">3. 8-Bit Binary Stream</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>01001101</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>01100001</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>01101110</td>
              </tr>
              <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-bold">
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans text-blue-600">4. 6-Bit Regrouping</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={2}>010011</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>010110</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>000101</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center">101110</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">5. Base64 Index (0–63)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={2}>19</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>22</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center" colSpan={3}>5</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center">46</td>
              </tr>
              <tr className="bg-blue-50/50 dark:bg-blue-50/20 font-bold text-blue-600 dark:text-blue-400">
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">6. Encoded Output</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center text-sm" colSpan={2}>T</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center text-sm" colSpan={3}>W</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center text-sm" colSpan={3}>F</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-center text-sm">u</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mt-4">
          Understanding Base64 Padding ('=')
        </h3>
        <p>
          Because Base64 processes data in 3-byte blocks, inputs whose byte lengths are not divisible by 3 require trailing <strong>padding characters ('=')</strong>:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>1 Remainder Byte (8 bits):</strong> Appends 4 zero bits to form 12 bits (2 Base64 characters) followed by two padding characters (<code>==</code>). Example: <code>"M"</code> → <code>"TQ=="</code>.</li>
          <li><strong>2 Remainder Bytes (16 bits):</strong> Appends 2 zero bits to form 18 bits (3 Base64 characters) followed by one padding character (<code>=</code>). Example: <code>"Ma"</code> → <code>"TWE="</code>.</li>
        </ul>
      </section>

      {/* SECTION 3: BASE64 INDEX TABLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. The Base64 Index Table Reference (RFC 4648)
        </h2>
        <p>
          The standard Base64 character set maps indices 0 to 63 to printable ASCII characters:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans tabular-nums">
          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="font-bold text-blue-600 border-b pb-1 mb-1">Index 0 – 15</div>
            <div>0: A &nbsp; 4: E &nbsp; 8: I &nbsp; 12: M</div>
            <div>1: B &nbsp; 5: F &nbsp; 9: J &nbsp; 13: N</div>
            <div>2: C &nbsp; 6: G &nbsp; 10: K &nbsp; 14: O</div>
            <div>3: D &nbsp; 7: H &nbsp; 11: L &nbsp; 15: P</div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="font-bold text-blue-600 border-b pb-1 mb-1">Index 16 – 31</div>
            <div>16: Q &nbsp; 20: U &nbsp; 24: Y &nbsp; 28: c</div>
            <div>17: R &nbsp; 21: V &nbsp; 25: Z &nbsp; 29: d</div>
            <div>18: S &nbsp; 22: W &nbsp; 26: a &nbsp; 30: e</div>
            <div>19: T &nbsp; 23: X &nbsp; 27: b &nbsp; 31: f</div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="font-bold text-blue-600 border-b pb-1 mb-1">Index 32 – 47</div>
            <div>32: g &nbsp; 36: k &nbsp; 40: o &nbsp; 44: s</div>
            <div>33: h &nbsp; 37: l &nbsp; 41: p &nbsp; 45: t</div>
            <div>34: i &nbsp; 38: m &nbsp; 42: q &nbsp; 46: u</div>
            <div>35: j &nbsp; 39: n &nbsp; 43: r &nbsp; 47: v</div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="font-bold text-blue-600 border-b pb-1 mb-1">Index 48 – 63</div>
            <div>48: w &nbsp; 52: 0 &nbsp; 56: 4 &nbsp; 60: 8</div>
            <div>49: x &nbsp; 53: 1 &nbsp; 57: 5 &nbsp; 61: 9</div>
            <div>50: y &nbsp; 54: 2 &nbsp; 58: 6 &nbsp; 62: + (-)</div>
            <div>51: z &nbsp; 55: 3 &nbsp; 59: 7 &nbsp; 63: / (_)</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: KEY USE CASES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Key Use Cases in Modern Software Engineering
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">1. Data URIs in Web Development</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Embed small icons, logos, and fonts inline directly inside HTML (<code>&lt;img src="data:image/png;base64,..." /&gt;</code>) or CSS files to reduce HTTP request round-trips.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">2. HTTP Basic Authentication</h3>
            <p className="text-slate-900 dark:text-slate-100">
              HTTP Basic Auth headers pass <code>username:password</code> credentials in Base64 encoding: <code>Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=</code>.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">3. JSON Web Tokens (JWT)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              JWT headers, claims payloads, and signatures rely on URL-Safe Base64 (Base64URL) to transmit authentication tokens across HTTP headers.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">4. Email Attachments (MIME RFC 2045)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              SMTP protocol transmits binary attachments (PDFs, ZIPs, photos) safely by converting binary streams into 76-character chunked Base64 text.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PERFORMANCE CONSIDERATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Performance Considerations & Data Overhead
        </h2>
        <p>
          Base64 encoding always increases data size by approximately <strong>+33.33%</strong> ($4/3$ ratio).
        </p>
        <div className="bg-blue-50/60 dark:bg-blue-50/20 border border-amber-200 dark:border-amber-900 p-4 rounded-xl space-y-2 text-xs">
          <h4 className="font-bold text-amber-900 dark:text-blue-400">When to Use Base64 vs. Direct Binary Storage</h4>
          <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
            <li><strong>DO USE Base64:</strong> For inline web assets under 10 KB, micro-icons, API payload JSON strings, authentication headers, and small cryptographic signatures.</li>
            <li><strong>AVOID Base64:</strong> For large assets (e.g., multi-megabyte photos, high-resolution videos, large PDFs). Base64 bloats a 10 MB image to ~13.3 MB, causing unnecessary CPU decoding overhead and wasted network bandwidth. Use CDN asset hosting or multi-part binary uploads instead.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 6: CODE SNIPPETS FOR DEVELOPERS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Code Snippets for Developers
        </h2>

        <div className="space-y-3 text-xs">
          {/* JavaScript Browser */}
          <div className="bg-zinc-900 text-zinc-100 p-3.5 rounded-xl space-y-1 font-sans tabular-nums">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">// JavaScript Browser (UTF-8 Compatible)</div>
            <pre className="text-blue-400 overflow-x-auto">
{`// Encode Unicode text to Base64
const encodeUtf8 = (text) => btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode('0x' + p1)));

// Decode Base64 back to UTF-8
const decodeUtf8 = (b64) => decodeURIComponent(Array.from(atob(b64), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));`}
            </pre>
          </div>

          {/* Node.js */}
          <div className="bg-zinc-900 text-zinc-100 p-3.5 rounded-xl space-y-1 font-sans tabular-nums">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">// Node.js (Buffer API)</div>
            <pre className="text-blue-400 overflow-x-auto">
{`const encoded = Buffer.from("Hello CalcPlatform 🚀", "utf-8").toString("base64");
const decoded = Buffer.from(encoded, "base64").toString("utf-8");`}
            </pre>
          </div>

          {/* Python */}
          <div className="bg-zinc-900 text-zinc-100 p-3.5 rounded-xl space-y-1 font-sans tabular-nums">
            <div className="text-zinc-400 text-[10px] uppercase font-bold"># Python 3</div>
            <pre className="text-blue-400 overflow-x-auto">
{`import base64

# Standard Base64
encoded = base64.b64encode("Hello World".encode("utf-8")).decode("utf-8")

# URL-Safe Base64
url_safe = base64.urlsafe_b64encode("Hello World".encode("utf-8")).decode("utf-8")`}
            </pre>
          </div>
        </div>
      </section>
    </article>
  );
}
