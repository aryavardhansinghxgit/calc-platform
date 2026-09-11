"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Code2 } from "lucide-react";
import { base64_calculatorFaqs } from "@/app/calculators/base64-calculator/faq";

export function Base64Content() {
  // All 15 FAQs open by default for immediate accessibility, people-first readability and complete SSR crawlability
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: base64_calculatorFaqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800 not-prose">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT (18 COMPLETE SECTIONS) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Base64 Encoding?
          </h2>
          <p>
            Base64 is a binary-to-text encoding method used to represent arbitrary bytes with a restricted set of ASCII characters. It is particularly useful when binary data needs to pass through systems, formats or interfaces that are designed primarily for text.
          </p>
          <p>
            Base64 is not encryption, compression, or hashing. The encoding is reversible: if the encoded data is valid and the decoder knows the correct variant, the original bytes can be recovered. RFC 4648 defines the standard Base64 encoding and its alphabet.
          </p>
          <p>
            This distinction matters in practical work. A Base64 string may look obscure, but it does not become secret merely because the bytes have been represented as letters, numbers and a few punctuation characters.
          </p>
          <p>
            This Base64 Encoder / Decoder is designed for both ordinary text and binary data. It supports UTF-8 text, arbitrary file bytes, Standard Base64, the URL-safe Base64 variant, MIME-style line wrapping, independent line processing and Data URI generation. The production implementation has been regression-tested across ASCII, Unicode, emoji, binary payloads, URL-safe conversions, MIME boundaries and file round trips.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How the Base64 Algorithm Works
          </h2>
          <p>
            Base64 operates on bytes rather than directly on human-readable characters.
          </p>
          <p>
            The basic transformation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>3 bytes → 24 bits → four 6-bit groups → four Base64 characters</div>
          </div>
          <p>
            Each 6-bit group has a value from 0 through 63. Those values are mapped to the Base64 alphabet.
          </p>
          <p>
            The standard alphabet is:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A–Z (index values 0–25)</li>
            <li>a–z (index values 26–51)</li>
            <li>0–9 (index values 52–61)</li>
            <li>+ (index value 62)</li>
            <li>/ (index value 63)</li>
          </ul>
          <p>
            That gives exactly 64 symbols. RFC 4648 specifies this alphabet and also defines the URL-safe variation discussed later in this guide.
          </p>
          <p>
            Conceptually, a 24-bit block can be viewed as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>aaaaaaaa bbbbbbbb cccccccc</div>
            <div className="text-slate-500 dark:text-slate-400">which is regrouped as:</div>
            <div>aaaaaa aabbbb bbbbcc cccccc</div>
          </div>
          <p>
            Each six-bit value is then converted to its corresponding Base64 symbol.
          </p>
          <p>
            This is why Base64 increases the textual representation size: three input bytes become four output characters.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Worked Example: Encoding &ldquo;Man&rdquo; as Base64
          </h2>
          <p>
            A classic test vector is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Man
          </div>
          <p>
            The ASCII byte values are:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>M = 77 (0x4D)</div>
            <div>a = 97 (0x61)</div>
            <div>n = 110 (0x6E)</div>
          </div>
          <p>
            In binary:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>01001101 01100001 01101110</div>
          </div>
          <p>
            Grouping those 24 bits into four 6-bit values gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>010011 | 010110 | 000101 | 101110</div>
          </div>
          <p>
            The decimal indexes are:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>19, 22, 5, 46</div>
          </div>
          <p>
            Those map to:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>T, W, F, u</div>
          </div>
          <p>
            Therefore:
          </p>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/60 font-mono text-xs font-bold text-blue-700 dark:text-blue-300">
            Man → TWFu
          </div>
          <p>
            This is the type of direct transformation performed by the calculator.
          </p>
          <p>
            The reverse operation reconstructs the original bytes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            TWFu → Man
          </div>
          <p>
            The production test suite independently verified this result along with other standard vectors.
          </p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100">
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Transformation Step</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-center" colSpan={3}>Byte 1 (&apos;M&apos;)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-center" colSpan={3}>Byte 2 (&apos;a&apos;)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-center" colSpan={3}>Byte 3 (&apos;n&apos;)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-medium">1. ASCII Character</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>M</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>a</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>n</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-medium">2. Decimal Value</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>77</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>97</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>110</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-medium">3. 8-Bit Binary Stream</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>01001101</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>01100001</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>01101110</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-medium text-blue-600 dark:text-blue-400">4. 6-Bit Regrouping</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={2}>010011</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>010110</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>000101</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">101110</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-medium">5. Base64 Index (0–63)</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={2}>19</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>22</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center" colSpan={3}>5</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">46</td>
                </tr>
                <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-bold text-blue-700 dark:text-blue-300">
                  <td className="p-2 border border-slate-200 dark:border-slate-800 font-sans">6. Encoded Output</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center text-sm" colSpan={2}>T</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center text-sm" colSpan={3}>W</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center text-sm" colSpan={3}>F</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 text-center text-sm">u</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Base64 Padding: Why &ldquo;=&rdquo; Appears at the End
          </h2>
          <p>
            Base64 works most naturally with input groups of three bytes. When the final group contains fewer than three bytes, padding is added.
          </p>
          <p>
            Examples:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>M → TQ==</div>
            <div>Ma → TWE=</div>
            <div>Man → TWFu</div>
          </div>
          <p>
            The reason is structural rather than semantic. Base64 always represents a complete output group, so missing input bits are handled according to the encoding rules and the resulting output is padded with = where necessary. RFC 4648 specifies the padding behavior and also explains situations where a referring specification may omit padding.
          </p>
          <p>
            For input byte count N, the standard padded Base64 output length is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            4 × ceil(N / 3)
          </div>
          <p>
            So:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>1 byte → 4 Base64 characters (2 value chars + 2 padding chars &ldquo;==&rdquo;)</li>
            <li>2 bytes → 4 Base64 characters (3 value chars + 1 padding char &ldquo;=&rdquo;)</li>
            <li>3 bytes → 4 Base64 characters (4 value chars + 0 padding chars)</li>
            <li>4 bytes → 8 Base64 characters</li>
            <li>5 bytes → 8 Base64 characters</li>
            <li>6 bytes → 8 Base64 characters</li>
          </ul>
          <p>
            The number of actual data characters and the number of padding characters depend on N mod 3.
          </p>
          <p>
            The calculator specifically verifies the 1-byte, 2-byte and 3-byte cases as well as larger randomized inputs.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Standard Base64 vs Base64URL
          </h2>
          <p>
            Standard Base64 and Base64URL are closely related, but they are not identical formats.
          </p>
          <p>
            Standard Base64 uses:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>+</div>
            <div>/</div>
          </div>
          <p>
            for its final two alphabet positions.
          </p>
          <p>
            The URL-safe Base64 variant replaces them with:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>- (hyphen)</div>
            <div>_ (underscore)</div>
          </div>
          <p>
            RFC 4648 defines the URL- and filename-safe Base64 alphabet specifically to avoid characters that have special meanings or awkward handling in URLs and filenames. It also notes that Base64URL should not simply be treated as the same thing as ordinary Base64. When the data will be placed into a URL, the{" "}
            <Link href="/calculators/url-encoder-decoder" className="text-blue-600 dark:text-blue-400 font-medium underline">
              URL Encoder / Decoder
            </Link>{" "}
            is the more appropriate companion tool for URL percent-encoding rather than Base64.
          </p>
          <p>
            The calculator supports both variants.
          </p>
          <p>
            For URL-safe encoding, the current implementation removes trailing = padding and restores the required padding during decoding. This behavior is explicitly tested against randomized URL-safe inputs.
          </p>
          <p>
            That distinction is particularly useful when Base64 data appears in:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>URL parameters</li>
            <li>filenames</li>
            <li>compact tokens</li>
            <li>JSON Web Tokens</li>
            <li>other web-oriented representations</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Base64URL Is Used in JWTs
          </h2>
          <p>
            JSON Web Tokens are a common place where Base64URL appears.
          </p>
          <p>
            A compact JWT has multiple dot-separated parts, and RFC 7519 specifies that each part contains a Base64URL-encoded value.
          </p>
          <p>
            A JWT therefore resembles:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            header.payload.signature
          </div>
          <p>
            The important security point is that Base64URL itself does not encrypt the header or payload.
          </p>
          <p>
            The cryptographic properties come from the signing or encryption mechanisms associated with the JOSE/JWT implementation, not from the Base64URL representation. RFC 7519 distinguishes signed/MACed JWTs from encrypted JWE structures.
          </p>
          <p>
            So decoding a JWT payload is not the same thing as breaking encryption.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Base64 and UTF-8: Why Unicode Needs Special Handling
          </h2>
          <p>
            A common misconception is that Base64 is inherently a text encoding.
          </p>
          <p>
            It is more accurate to say that Base64 encodes bytes. Text must first be converted to bytes using a character encoding such as UTF-8.
          </p>
          <p>
            This becomes important for characters outside basic ASCII.
          </p>
          <p>
            For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>é is represented in UTF-8 as two bytes: C3 A9 → Base64: w6k=</div>
            <div>€ uses three UTF-8 bytes: E2 82 AC → Base64: 4oKs</div>
            <div>😀 uses four UTF-8 bytes: F0 9F 98 80 → Base64: 8J+YgA==</div>
          </div>
          <p>
            The production calculator explicitly tests accented characters, CJK text, emoji and mixed Unicode strings, including exact round trips back to the original text.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. JavaScript btoa() and the Unicode Trap
          </h2>
          <p>
            Browser developers sometimes discover that:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            btoa(&quot;Hello&quot;)
          </div>
          <p>
            works while a direct call such as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            btoa(&quot;😀&quot;)
          </div>
          <p>
            does not.
          </p>
          <p>
            That happens because the browser btoa() API operates on a binary-string representation rather than automatically treating an arbitrary JavaScript Unicode string as a UTF-8 byte sequence. MDN specifically documents this distinction and recommends converting text to UTF-8 bytes first when arbitrary Unicode text is involved.
          </p>
          <p>
            A safer conceptual pipeline is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>Encoding: Unicode text → UTF-8 encoding → bytes → Base64</div>
            <div>Decoding: Base64 → bytes → UTF-8 decoding → Unicode text</div>
          </div>
          <p>
            That is also why this calculator reports byte counts separately from character counts. For example, the production audit confirms that the emoji 😀 is correctly measured as four UTF-8 bytes rather than merely relying on JavaScript&apos;s UTF-16 string length.
          </p>
          <p>
            For a browser implementation that must handle Unicode reliably, TextEncoder and TextDecoder are appropriate tools in this pipeline. MDN discusses this approach explicitly.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Base64 for Files and Binary Data
          </h2>
          <p>
            Base64 becomes especially useful when the source is not text at all.
          </p>
          <p>
            Images, PDFs, audio files, compressed assets and arbitrary binary payloads can all be represented as Base64 because the algorithm operates on bytes.
          </p>
          <p>
            The important rule is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            file bytes → Base64 (not: file → filename → Base64)
          </div>
          <p>
            The calculator&apos;s file mode therefore measures the actual file byte size using the file&apos;s size property. This was specifically corrected and then verified with a 1 MB fixture and additional file-size cases.
          </p>
          <p>
            The tool&apos;s regression suite also verifies exact byte-for-byte round trips for deterministic binary data and supported example file types such as PNG, JPEG, SVG, WebP, PDF and audio data.
          </p>
          <p>
            This matters because attempting to interpret arbitrary binary data as ordinary text before encoding can corrupt the original bytes.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Base64 Size Overhead: Why the Output Gets Larger
          </h2>
          <p>
            Base64 is convenient, but it is not space-efficient.
          </p>
          <p>
            The basic relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            3 bytes → 4 Base64 characters
          </div>
          <p>
            For large payloads, the output therefore approaches approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            4 / 3 ≈ 1.3333 (+33.33% expansion)
          </div>
          <p>
            The exact percentage for small inputs varies because of padding.
          </p>
          <p>
            For example, ignoring any line-break overhead:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>1 byte → 4 encoded characters (+300% expansion)</li>
            <li>2 bytes → 4 encoded characters (+100% expansion)</li>
            <li>3 bytes → 4 encoded characters (+33.33% expansion)</li>
          </ul>
          <p>
            The calculator reports the actual input size, output size and expansion ratio rather than blindly displaying +33.33% for every payload. Its audit specifically verifies +300% for one-byte input, +100% for two bytes and approximately +33.33% for three bytes and large inputs.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. MIME Base64 and 76-Character Lines
          </h2>
          <p>
            MIME introduced conventions for representing binary data in email-oriented text bodies.
          </p>
          <p>
            RFC 2045 specifies that Base64 encoded output in this context should be represented in lines no longer than 76 characters, excluding the line-ending characters.
          </p>
          <p>
            For example, a long Base64 string may be transformed into:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>[76 characters]</div>
            <div>[76 characters]</div>
            <div>[remaining characters]</div>
          </div>
          <p>
            The line breaks are formatting around the encoded stream; they are not additional Base64 data.
          </p>
          <p>
            The calculator supports 76-character chunking and independently tests boundary cases such as 75, 76, 77, 152, and 156 encoded characters.
          </p>
          <p>
            This is useful when preparing output for systems that expect MIME-style formatting. It should not, however, be mistaken for a universal requirement for every Base64 string used on the web.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Processing Each Line Independently
          </h2>
          <p>
            There are two different ways to treat multiline input.
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Continuous stream:
          </p>
          <p>
            The complete text, including newline bytes, is encoded as one byte stream. For &ldquo;Hello\nWorld&rdquo;, the newline is part of the encoded data.
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Independent line processing:
          </p>
          <p>
            Each line is encoded separately. For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>Hello → SGVsbG8=</div>
            <div>World → V29ybGQ=</div>
          </div>
          <p>
            These are different representations because the newline is not handled in the same way.
          </p>
          <p>
            The calculator supports an explicit per-line processing option and preserves empty lines exactly. For example, &ldquo;A\n\nB&rdquo; round-trips as &ldquo;A\n\nB&rdquo; without silently collapsing the blank line. The final regression suite includes 10,000 randomized multiline blank-line tests.
          </p>
          <p>
            That distinction is important when Base64 is being used to process structured text where line boundaries are meaningful.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Data URLs and Base64
          </h2>
          <p>
            A Data URL embeds data directly into a URL-like resource identifier.
          </p>
          <p>
            RFC 2397 defines the syntax:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            data:[mediatype][;base64],data
          </div>
          <p>
            For Base64 content, a typical example is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
          </div>
          <p>
            The ;base64 marker indicates that the data portion is Base64 encoded.
          </p>
          <p>
            Data URLs can be useful for small inline resources such as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>images and micro-icons</li>
            <li>embedded vector assets</li>
            <li>generated preview content</li>
            <li>quick prototypes</li>
          </ul>
          <p>
            They are not automatically the best choice for large assets. The Base64 representation itself introduces overhead, and very long inline data can make documents, stylesheets or URLs unwieldy.
          </p>
          <p>
            The calculator can produce an asset Data URI from supported file inputs and verifies that the encoded payload can be extracted and round-tripped correctly.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. HTTP Basic Authentication and Base64
          </h2>
          <p>
            HTTP Basic Authentication is another well-known Base64 use case.
          </p>
          <p>
            RFC 7617 defines the scheme in which the user-id and password are combined into a credential string and that byte sequence is encoded with Base64.
          </p>
          <p>
            Conceptually:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            username:password → Base64(username:password)
          </div>
          <p>
            and is then placed in an authorization header:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
          </div>
          <p>
            However, Base64 does not provide confidentiality.
          </p>
          <p>
            RFC 7617 explicitly explains that Basic Authentication is not considered secure unless it is used with an external secure mechanism such as TLS because the credentials are effectively exposed if intercepted.
          </p>
          <p>
            Therefore:
          </p>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/60 font-medium text-xs text-amber-800 dark:text-amber-200">
            Base64 encoding ≠ encryption. Do not use a Base64 encoder as a password-protection mechanism.
          </div>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Base64 Is Not Encryption
          </h2>
          <p>
            This is one of the most important concepts to understand.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Base64 is encoding, not encryption.
          </div>
          <p>
            Encoding is designed to represent information in another format.
          </p>
          <p>
            Encryption is designed to transform information using a cryptographic process so that unauthorized parties cannot recover the protected plaintext without the required key or cryptographic capability.
          </p>
          <p>
            Base64 has no secret key. Anyone with the encoded string and a suitable decoder can normally recover the original bytes.
          </p>
          <p>
            That is why the calculator&apos;s educational content explicitly distinguishes Base64 from encryption, authentication and cryptographic integrity mechanisms.
          </p>
          <p>
            Never store passwords as Base64. For password storage, use a purpose-built password hashing scheme with appropriate salting and work factors (such as Argon2id, scrypt or bcrypt) rather than reversible encoding.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Base64 and Data Integrity
          </h2>
          <p>
            Base64 also does not provide cryptographic integrity verification, tamper detection, authentication, or encryption.
          </p>
          <p>
            If an encoded string is modified, a decoder may:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>reject it</li>
            <li>produce different bytes</li>
            <li>or, depending on the implementation and exact mutation, still decode some partial result</li>
          </ul>
          <p>
            The Base64 transformation itself does not tell you whether the bytes were tampered with.
          </p>
          <p>
            Integrity and authenticity normally require separate mechanisms such as cryptographic hashes, MACs or digital signatures, depending on the application.
          </p>
          <p>
            This distinction is especially important for JWTs: the token&apos;s cryptographic security comes from the signature/MAC or encryption mechanism, not simply from the fact that its segments use Base64URL. RFC 7519 explicitly separates the representation from the cryptographic operations applied to the token.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Invalid Base64 and Whitespace
          </h2>
          <p>
            Valid Base64 uses a defined alphabet.
          </p>
          <p>
            In strict contexts, characters outside the permitted alphabet should not simply be ignored. RFC 4648 says implementations should reject non-alphabet characters unless the referring specification explicitly allows a different treatment; MIME is one example where line breaks and certain whitespace handling are part of the surrounding convention.
          </p>
          <p>
            The calculator therefore distinguishes malformed Base64 from valid input and produces explicit validation errors rather than fabricating decoded output.
          </p>
          <p>
            Examples of inputs that should trigger validation include malformed padding and illegal characters.
          </p>
          <p>
            The production audit confirms strict rejection of invalid symbols and malformed padding while supporting the intended whitespace behavior for supported decoding scenarios.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. How to Use the Base64 Encoder / Decoder
          </h2>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Encode text:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select <strong>Text Convert</strong>.</li>
            <li>Enter your text.</li>
            <li>Choose the required variant (Standard or URL-Safe).</li>
            <li>Choose the character encoding option where applicable (UTF-8, ASCII, Latin-1, UTF-16).</li>
            <li>Review the dynamically updated encoded output.</li>
            <li>Copy or download the result.</li>
          </ol>
          <p>
            For ordinary UTF-8 text, the conceptual process is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Text → UTF-8 bytes → Base64
          </div>

          <p className="font-semibold text-slate-900 dark:text-slate-100 pt-2">
            Decode Base64:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select <strong>Decode</strong> mode using the segmented toolbar pill.</li>
            <li>Paste the Base64 string into the input area.</li>
            <li>Choose the matching variant (Standard or URL-Safe).</li>
            <li>Review the decoded plaintext output and character counts.</li>
            <li>Use <strong>Swap</strong> to switch input and output if needed.</li>
          </ol>
          <p>
            For Unicode:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Base64 → bytes → UTF-8 text
          </div>

          <p className="font-semibold text-slate-900 dark:text-slate-100 pt-2">
            Convert a file:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select <strong>File to Base64 (Data URI)</strong> tab.</li>
            <li>Drop a file or choose one using the file picker.</li>
            <li>Review the exact file byte size and Base64 encoded size.</li>
            <li>Select your preferred output format: Data URI, Raw Base64, HTML &lt;img&gt;, or CSS background.</li>
            <li>Copy the snippet or download the encoded asset.</li>
          </ol>
          <p>
            The implementation processes supported files client-side and the audit confirmed zero external network transmission of local file payloads.
          </p>
        </section>

      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (15 / 15 FULLY UNFOLDED) */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Clear, mathematically verified answers to common questions about Base64 encoding, decoding, Unicode, Data URIs, and network transmission.
        </p>

        <div className="space-y-3 pt-2">
          {base64_calculatorFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            const questionNumber = index + 19; // Questions 19 through 33
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {`${questionNumber}. ${faq.question}`}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 shrink-0 mt-0.5 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/40 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. TECHNICAL NOTES AND LIMITATIONS */}
      <div className="pt-8 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold">Technical Notes and Limitations</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator is a representation and conversion tool, not a cryptographic security tool. Base64 should not be relied upon for:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li>confidentiality</li>
          <li>password storage</li>
          <li>authentication by itself</li>
          <li>tamper detection</li>
          <li>cryptographic integrity</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Use the appropriate security mechanism for the application.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For Unicode text, make the byte encoding explicit. UTF-8 is the relevant byte representation for the calculator&apos;s text workflow, and the implementation independently validates multibyte characters and emoji.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For files, distinguish: filename, file metadata, and file bytes. The actual Base64 payload is derived from the file bytes. The verified implementation measures file mode input using File.size, not the length of the filename.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For MIME use, remember that 76-character wrapping belongs to the MIME convention. For URL use, use the explicitly URL-safe Base64 variant where required rather than manually replacing characters without considering the consuming protocol.
        </p>
      </div>

      {/* 4. STANDARDS AND TECHNICAL REFERENCES */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold">Standards and Technical References</h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              RFC 4648 — The Base16, Base32, and Base64 Data Encodings
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Defines standard Base64, padding rules, treatment of non-alphabet characters and the URL- and filename-safe Base64 alphabet.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              RFC 2045 — MIME Part One
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Defines MIME Base64 formatting requirements, including the 76-character encoded-line limit.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              RFC 2397 — The &ldquo;data&rdquo; URL Scheme
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Defines the data: URL syntax and the ;base64 form used for inline binary representations.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              RFC 7617 — The &ldquo;Basic&rdquo; HTTP Authentication Scheme
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Defines HTTP Basic Authentication and its use of Base64 for credential representation, while explaining the need for TLS for secure deployment.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              RFC 7519 — JSON Web Token (JWT)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Defines JWT compact representation and the use of Base64URL-encoded token parts.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              MDN Web APIs — btoa() and atob()
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Documents browser Base64 encoding/decoding behavior and the need for explicit UTF-8 byte handling for arbitrary Unicode text.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
