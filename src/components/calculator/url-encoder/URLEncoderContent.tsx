"use client";

import React from "react";

export function URLEncoderContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: FUNDAMENTALS OF URL & URI ENCODING */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          1. Fundamentals of URL & URI Encoding (Percent-Encoding)
        </h2>
        <p>
          <strong>URL encoding</strong>, officially defined in <strong>RFC 3986</strong> as <em>Percent-Encoding</em>, is a standardized data translation mechanism that allows arbitrary character sequences—including non-English scripts, spaces, symbols, and binary payloads—to be transmitted safely inside Uniform Resource Identifiers (URIs).
        </p>
        <p>
          The original Architecture of the World Wide Web was built upon 7-bit US-ASCII character set constraints. Because network routers, domain name servers, proxy firewalls, and HTTP gateways rely on specific ASCII characters (such as <code>:</code>, <code>/</code>, <code>?</code>, <code>#</code>, <code>&amp;</code>, and <code>=</code>) to parse protocol schemes, hostnames, paths, and query arguments, any literal use of these characters inside data values breaks URL syntax. Percent-encoding solves this by converting any unsafe or reserved character into a <code>%</code> symbol followed by a 2-digit hexadecimal representation of its UTF-8 byte value.
        </p>
      </section>

      {/* SECTION 2: THE RFC 3986 STANDARD & CHARACTER CLASSIFICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          2. The RFC 3986 Standard & Character Classifications
        </h2>
        <p>
          RFC 3986 categorizes all US-ASCII characters into two primary groups:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Unreserved Characters (Always Safe)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Unreserved characters hold no structural meaning in URIs and must <strong>never</strong> be percent-encoded:
            </p>
            <ul className="list-disc pl-5 font-sans tabular-nums space-y-0.5">
              <li>Uppercase: <code>A–Z</code></li>
              <li>Lowercase: <code>a–z</code></li>
              <li>Digits: <code>0–9</code></li>
              <li>Symbols: <code>- _ . ~</code></li>
            </ul>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Reserved Characters (Must be Encoded if Data)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Reserved characters act as structural delimiters. If used inside key/value data, they <strong>must</strong> be encoded:
            </p>
            <ul className="list-disc pl-5 font-sans tabular-nums space-y-0.5">
              <li>Gen-Delims: <code>: / ? # [ ] @</code></li>
              <li>Sub-Delims: <code>! $ &amp; ' ( ) * + , ; =</code></li>
            </ul>
          </div>
        </div>

        <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-4">
          ASCII-to-Hex Percent-Encoding Reference Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Character</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Description</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">% Hex Code</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Character</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Description</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">% Hex Code</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">(space)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Space character</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%20</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">&amp;</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Ampersand delimiter</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%26</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">/</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Forward slash path separator</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%2F</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">=</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Equals sign assignment</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%3D</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">?</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Query string start indicator</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%3F</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">#</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Fragment anchor indicator</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%23</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">:</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Colon scheme/port separator</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%3A</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold">+</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Plus sign (form space)</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 text-blue-600 font-bold">%2B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: SPACE ENCODING: %20 VS + EXPLAINED */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          3. Space Encoding: %20 vs. + Explained
        </h2>
        <p>
          One of the most frequent points of confusion for developers is why space characters are encoded as <code>%20</code> in some contexts and <code>+</code> in others.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-700 dark:text-blue-300">RFC 3986 Standard (%20)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              According to standard URI syntax (RFC 3986), spaces in paths, hostnames, and query strings must be encoded as <code>%20</code>. This is the universal standard used by REST APIs, GraphQL, and modern web application routing frameworks.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-50/20 border border-purple-200 dark:border-purple-900 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">HTML Form Submission (+ Sign)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              When HTML web forms submit data using <code>application/x-www-form-urlencoded</code>, space characters are historically encoded as a plus sign (<code>+</code>). Web servers decoding form inputs treat <code>+</code> as a space character.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: KEY DIFFERENCES: encodeURI vs encodeURIComponent */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          4. Key Differences: encodeURI vs. encodeURIComponent
        </h2>
        <p>
          In JavaScript, selecting the wrong encoding function causes broken routing or corrupted query parameters:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Function</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Intended Purpose</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Preserved Delimiters</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Example Output</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">encodeURI()</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Full web address / page URL</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Preserves <code>: / ? # &amp; =</code></td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">https://site.com/search?q=c%2B%2B</td>
              </tr>
              <tr>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-bold text-blue-600">encodeURIComponent()</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Single query parameter value</td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Encodes ALL delimiters into <code>%XX</code></td>
                <td className="p-2 border border-zinc-200 dark:border-zinc-800">https%3A%2F%2Fsite.com%2F...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: SECURITY IMPLICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          5. Security Implications & Common Pitfalls
        </h2>
        <div className="bg-blue-50/60 dark:bg-blue-50/20 border border-amber-200 dark:border-amber-900 p-4 rounded-xl space-y-2 text-xs">
          <h4 className="font-bold text-amber-900 dark:text-blue-400">1. Double-Encoding Bugs (%2520)</h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Double encoding occurs when an already encoded string (such as <code>%20</code>) is passed through an encoder a second time. The <code>%</code> character becomes <code>%25</code>, producing <code>%2520</code>. When decoded on the server, it yields literal <code>%20</code> text rather than a space character, leading to 404 errors.
          </p>

          <h4 className="font-bold text-amber-900 dark:text-blue-400 mt-2">2. Open Redirect & SSRF Prevention</h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Passing unvalidated encoded URLs into redirect endpoints allows attackers to perform Open Redirect or Server-Side Request Forgery (SSRF) attacks. Always parse and validate hostname domains before initiating HTTP requests.
          </p>
        </div>
      </section>

      {/* SECTION 6: CODE SNIPPETS FOR DEVELOPERS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          6. Code Snippets Across Languages
        </h2>

        <div className="space-y-3 text-xs font-sans tabular-nums">
          {/* JavaScript */}
          <div className="bg-zinc-900 text-zinc-100 p-3.5 rounded-xl space-y-1">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">// JavaScript (Browser & Node.js)</div>
            <pre className="text-blue-400 overflow-x-auto">
{`// Encode parameter value
const queryParam = encodeURIComponent("hello world & c++");
// "hello%20world%20%26%20c%2B%2B"

// Decode query string
const decodedText = decodeURIComponent("%2Fv1%2Fsearch");
// "/v1/search"`}
            </pre>
          </div>

          {/* Python */}
          <div className="bg-zinc-900 text-zinc-100 p-3.5 rounded-xl space-y-1">
            <div className="text-zinc-400 text-[10px] uppercase font-bold"># Python 3</div>
            <pre className="text-blue-400 overflow-x-auto">
{`import urllib.parse

# Percent-encode query parameter
encoded = urllib.parse.quote("hello world & c++", safe="")
# Decode URL string
decoded = urllib.parse.unquote("https%3A%2F%2Fexample.com")`}
            </pre>
          </div>

          {/* PHP */}
          <div className="bg-zinc-900 text-zinc-100 p-3.5 rounded-xl space-y-1">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">// PHP</div>
            <pre className="text-blue-400 overflow-x-auto">
{`$encoded = rawurlencode("hello world & c++");
$decoded = rawurldecode("https%3A%2F%2Fexample.com");`}
            </pre>
          </div>
        </div>
      </section>
    </article>
  );
}
