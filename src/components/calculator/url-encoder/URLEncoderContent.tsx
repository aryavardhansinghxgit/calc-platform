"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, FileCode2 } from "lucide-react";
import { url_encoder_decoderFaqs } from "@/app/calculators/url-encoder-decoder/faq";

export function URLEncoderContent() {
  // All 19 FAQs open by default (fully unfolded)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: url_encoder_decoderFaqs.length }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is URL Encoding?
          </h2>
          <p>
            URL encoding, more precisely called <strong>percent-encoding</strong>, is the mechanism used to represent characters and bytes in a URI or URL when those characters cannot safely appear in a particular URL component in their literal form.
          </p>
          <p>
            A percent-encoded byte is written as a percent sign followed by two hexadecimal digits. For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div>space → %20</div>
            <div>&amp;     → %26</div>
            <div>=     → %3D</div>
            <div>+     → %2B</div>
          </div>
          <p>
            RFC 3986 defines percent-encoding as a way to represent an octet inside a URI component when the corresponding character is outside the permitted set or would conflict with the component&apos;s syntax.
          </p>
          <p>
            This distinction is important because a URL is not simply one unrestricted text string. It contains components with different meanings, including the scheme, authority, path, query and fragment. A character that is structural in one context can represent ordinary data in another.
          </p>
          <p>
            For example:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-blue-600 dark:text-blue-400">
            https://example.com/search?q=red&amp;sort=price
          </div>
          <p>
            contains URL syntax as well as data. The <code>?</code> introduces the query, <code>&amp;</code> separates parameters, and <code>=</code> separates a parameter name from its value.
          </p>
          <p>
            When a literal <code>&amp;</code> is actually part of a parameter value, it generally needs to be encoded so that it is not mistaken for the next parameter delimiter.
          </p>
          <p>
            That is why a URL encoder / decoder should be context-aware rather than simply replacing a few characters everywhere.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Percent-Encoding Syntax: %HH
          </h2>
          <p>
            The basic percent-encoding unit has this structure:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            %HH
          </div>
          <p>
            where <code>H</code> represents a hexadecimal digit (0–9, A–F). Examples include:
          </p>
          <ul className="list-disc pl-5 font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <li><code>%20</code> (space)</li>
            <li><code>%23</code> (# fragment anchor)</li>
            <li><code>%26</code> (&amp; delimiter)</li>
            <li><code>%2F</code> (/ forward slash)</li>
            <li><code>%C3%A9</code> (UTF-8 byte sequence for &eacute;)</li>
          </ul>
          <p>
            The first examples correspond to ASCII characters, while <code>%C3%A9</code> represents the UTF-8 byte sequence used for &eacute;.
          </p>
          <p>
            RFC 3986 defines the syntax as <code>%</code> followed by exactly two hexadecimal digits. It also states that hexadecimal letters are case-insensitive, although producers should use uppercase hexadecimal digits for consistency.
          </p>
          <p>
            Therefore, <code>%2F</code> and <code>%2f</code> represent the same percent-encoded octet, although <code>%2F</code> is the cleaner canonical presentation.
          </p>
          <p>
            A malformed sequence such as <code>%2</code>, <code>%G0</code>, or <code>%ZZ</code> is not a valid percent-encoding triplet. The calculator explicitly validates malformed percent sequences rather than silently deleting or inventing characters.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Reserved and Unreserved URL Characters
          </h2>
          <p>
            RFC 3986 divides URI characters into important classes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Unreserved Characters</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The unreserved set consists of:
              </p>
              <div className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                A–Z, a–z, 0–9, -, ., _, ~
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                These characters do not have a reserved structural purpose in the generic URI syntax. RFC 3986 says URI producers should not unnecessarily percent-encode them.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Reserved Characters</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The reserved set consists of:
              </p>
              <div className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                : / ? # [ ] @ ! $ &amp; &apos; ( ) * + , ; =
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                These characters can serve as delimiters or have special meaning within URI syntax.
              </p>
            </div>
          </div>
          <p>
            However, reserved does not mean &ldquo;always encode.&rdquo; Whether a reserved character needs percent-encoding depends on the component and whether the character is acting as syntax or as data. RFC 3986 explicitly makes this component-sensitive distinction.
          </p>
          <p>
            For example, <code>https://example.com/a/b</code> uses <code>/</code> structurally in the path. But if <code>/</code> is part of an individual query parameter value, encoding it as <code>%2F</code> may be necessary to preserve its literal data meaning.
          </p>
          <p>
            This is one of the main reasons <code>encodeURI()</code> and <code>encodeURIComponent()</code> are not interchangeable.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Why Spaces Become %20
          </h2>
          <p>
            Under RFC 3986-style percent-encoding, a space is represented as:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs">
            hello world &rarr; hello%20world
          </div>
          <p>
            The reason is straightforward: the space character is not part of the normal unreserved URI character set. RFC 3986 gives <code>%20</code> as the canonical percent-encoding example for the ASCII space octet.
          </p>
          <p>
            The important exception is form-style URL encoding, where spaces are commonly represented using <code>+</code>. That means:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs">
            hello world &rarr; hello+world
          </div>
          <p>
            in <code>application/x-www-form-urlencoded</code> serialization.
          </p>
          <p>
            The WHATWG URL Standard explicitly defines the form-urlencoded percent-encode set and its spaceAsPlus behavior. MDN&apos;s documentation for URLSearchParams likewise states that spaces are serialized as <code>+</code>.
          </p>
          <p>
            So:
          </p>
          <ul className="list-disc pl-5 font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <li>RFC-style: <code>hello%20world</code></li>
            <li>Form-style: <code>hello+world</code></li>
          </ul>
          <p>
            These should not be treated as accidental spelling variations. They belong to different encoding conventions.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. %20 and + Are Not Always Interchangeable
          </h2>
          <p>
            A particularly common URL bug involves a literal plus sign. Consider:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs">
            C++
          </div>
          <p>
            The correct query-component representation is:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            C%2B%2B
          </div>
          <p>
            because the literal <code>+</code> characters need to survive as data.
          </p>
          <p>
            If a form/query parser interprets a raw <code>+</code> as a space, an input such as <code>C++</code> can accidentally be interpreted as <code>C&nbsp;&nbsp;</code>.
          </p>
          <p>
            That is precisely why blindly feeding raw query strings through generic parameter APIs can produce surprising results. MDN documents this behavior for URLSearchParams: when parsing a string, it interprets <code>+</code> as a space because it follows the <code>application/x-www-form-urlencoded</code> convention.
          </p>
          <p>
            The calculator was specifically tested for this failure mode. Its query-parameter editor now preserves literal plus signs in non-form modes and serializes spaces according to the selected encoding mode.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. encodeURI() vs encodeURIComponent()
          </h2>
          <p>
            JavaScript provides two commonly used functions that are easy to confuse:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1">
            <div>encodeURI()</div>
            <div>encodeURIComponent()</div>
          </div>
          <p>
            They serve different purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>encodeURI():</strong> Intended for a complete URI and therefore preserves characters that are meaningful for URI structure. For example, the delimiters in <code>https://example.com/search?q=test</code> must generally remain recognizable as URI structure.
            </li>
            <li>
              <strong>encodeURIComponent():</strong> Intended for an individual component such as a query value, path segment, or parameter value. It encodes a much larger set of characters so that the result can safely represent one component rather than an entire structured URI.
            </li>
          </ul>
          <p>
            Suppose the value is <code>hello world &amp; C++</code>. As a query-component value, the data should not be allowed to become accidental URL syntax.
          </p>
          <p>
            The production calculator explicitly tests and distinguishes these modes rather than treating them as interchangeable functions.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Example: Encoding a Query Parameter Correctly
          </h2>
          <p>
            Consider:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>Parameter: query</div>
            <div>Value: hello world</div>
          </div>
          <p>
            A percent-encoded query component becomes:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs">
            query=hello%20world
          </div>
          <p>
            Now consider <code>category=dev tools</code>, which becomes <code>category=dev%20tools</code>. And <code>tags=c++</code> becomes <code>tags=c%2B%2B</code>.
          </p>
          <p>
            The complete query can therefore be:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-blue-600 dark:text-blue-400">
            query=hello%20world&amp;category=dev%20tools&amp;tags=c%2B%2B
          </div>
          <p>
            Notice the two different roles of <code>&amp;</code>:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-0.5">
            <div>query=hello%20world</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">&amp;</div>
            <div>category=dev%20tools</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">&amp;</div>
            <div>tags=c%2B%2B</div>
          </div>
          <p>
            Here <code>&amp;</code> is structural because it separates parameters. If <code>&amp;</code> were part of a parameter value, it would instead be encoded as <code>%26</code>.
          </p>
          <p>
            This is the practical reason that encoding the component is different from encoding the entire URL.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. How a URL Is Structured
          </h2>
          <p>
            A typical URL can be viewed as:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            scheme://authority/path?query#fragment
          </div>
          <p>
            For example:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-blue-600 dark:text-blue-400">
            https://api.example.com/v1/search?query=hello%20world#results
          </div>
          <p>
            can be conceptually divided into:
          </p>
          <ul className="list-disc pl-5 font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <li>Scheme: <code>https:</code></li>
            <li>Hostname: <code>api.example.com</code></li>
            <li>Path: <code>/v1/search</code></li>
            <li>Query: <code>query=hello%20world</code></li>
            <li>Fragment: <code>#results</code></li>
          </ul>
          <p>
            A port can appear after the host, such as <code>https://example.com:8443/</code>. RFC 3986 defines these generic URI components and the delimiters separating them.
          </p>
          <p>
            The calculator&apos;s live URL breakdown is designed around this structure and independently verifies protocol, hostname, explicit port, pathname, query and fragment extraction.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Query Strings and Parameter Encoding
          </h2>
          <p>
            The query component is introduced by <code>?</code>. For example:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs">
            https://example.com/search?q=shoes&amp;color=black
          </div>
          <p>
            contains two common key-value parameters: <code>q=shoes</code> and <code>color=black</code>. The <code>&amp;</code> separates them and <code>=</code> separates each name from its value.
          </p>
          <p>
            When a query value contains characters that might be interpreted as delimiters, those characters should be encoded as data. For example:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs">
            search = shoes &amp; boots
          </div>
          <p>
            should not be serialized naively as <code>search=shoes &amp; boots</code> because the ampersand can be interpreted as a parameter separator. A safer encoded value is <code>search=shoes%20%26%20boots</code>.
          </p>
          <p>
            The interactive parameter editor on this calculator is specifically designed to make this distinction visible instead of requiring users to construct query strings manually.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Duplicate Query Parameters Are Valid Data
          </h2>
          <p>
            Not every query string behaves like a simple JavaScript object. This is completely valid:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs">
            tag=red&amp;tag=blue&amp;tag=green
          </div>
          <p>
            The same parameter name appears multiple times. An implementation that converts everything immediately to a simple <code>{`{ key: value }`}</code> object can accidentally collapse duplicate values.
          </p>
          <p>
            The calculator therefore preserves duplicate query parameters and tests their ordering and serialization behavior. This matters for APIs, search interfaces, filters and other systems where repeated parameters have deliberate semantics. Do not assume <code>a=1&amp;a=2</code> is automatically equivalent to <code>a=2</code>. The interpretation belongs to the receiving application or protocol.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. URL Encoding and UTF-8
          </h2>
          <p>
            Percent-encoding ultimately represents bytes, so non-ASCII text needs a character-to-byte encoding step. For modern web applications, <strong>UTF-8</strong> is the critical encoding to understand.
          </p>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 font-mono text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>
              <strong>&eacute;</strong> is represented in UTF-8 by bytes <code>C3 A9</code> &rarr; percent-encoded as <code>%C3%A9</code>
            </li>
            <li>
              <strong>&euro;</strong> uses bytes <code>E2 82 AC</code> &rarr; becomes <code>%E2%82%AC</code>
            </li>
            <li>
              <strong>&#128512; (grinning face)</strong> uses bytes <code>F0 9F 98 80</code> &rarr; becomes <code>%F0%9F%98%80</code>
            </li>
          </ul>
          <p>
            RFC 3986 recommends that textual data from the Unicode character set be converted to UTF-8 octets before percent-encoding the octets that need representation in URI syntax.
          </p>
          <p>
            The calculator&apos;s Unicode regression suite explicitly tests accented characters, euro signs, CJK text, Devanagari, Arabic, Cyrillic, emoji and supplementary Unicode characters.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. What Is Double URL Encoding?
          </h2>
          <p>
            Double encoding happens when a value that has already been percent-encoded is encoded again.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>Start with: hello world</div>
            <div>First encoding: hello%20world</div>
            <div>Second encoding: hello%2520world</div>
          </div>
          <p>
            If the already encoded value is treated as literal input and encoded again, the <code>%</code> itself becomes <code>%25</code>: <code>hello%2520world</code>.
          </p>
          <p>
            This is not necessarily a calculator error. It can be the mathematically expected result when the input really is the literal string <code>hello%20world</code>. The problem occurs when an application unintentionally encodes the same logical data twice.
          </p>
          <p>
            RFC 3986 specifically warns against repeatedly encoding or decoding the same URI string because doing so can change how percent signs are interpreted.
          </p>
          <p>
            A practical debugging rule is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-slate-700 dark:text-slate-300">
            Raw data &darr; Encode once &darr; Store/transmit it in encoded form &darr; Decode once at the correct boundary
          </div>
          <p>
            Do not repeatedly apply encoding simply because the string still contains percent signs.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Decoding Must Respect URL Structure
          </h2>
          <p>
            Decoding is not always safely performed by globally replacing every <code>%XX</code> sequence before parsing the URL. Suppose a percent-encoded value represents a reserved delimiter. Decoding it too early can change the interpretation of the URL.
          </p>
          <p>
            RFC 3986 explains that the components and subcomponents should be identified before percent-encoded octets are safely decoded, because decoding first can cause encoded data to be mistaken for URI delimiters.
          </p>
          <p>
            This is particularly important for full URLs. For example, a percent-encoded question mark inside data (<code>%3F</code>) must not suddenly become a structural <code>?</code> before the application has determined which URL component the value belongs to.
          </p>
          <p>
            The calculator therefore distinguishes full-address decoding from component decoding.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. RFC 3986 Strict Mode
          </h2>
          <p>
            A strict RFC 3986-oriented encoder is useful when you need predictable percent-encoding based on URI syntax rather than the behavior of a form serializer. Important principles include:
          </p>
          <ul className="list-disc pl-5 font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <li>Unreserved: <code>A-Z a-z 0-9 - . _ ~</code></li>
            <li>Percent encoding: <code>%HH</code></li>
            <li>Canonical hexadecimal presentation: uppercase <code>%A-F</code></li>
            <li>Reserved characters remain context-sensitive</li>
          </ul>
          <p>
            The standard should therefore be used as a syntax model, while the application layer determines which component is being encoded. This is why a URL path, a query value and an entire URL should not necessarily receive identical transformations.
          </p>
          <p>
            The calculator&apos;s strict mode was independently tested against reserved and unreserved character classes, percent sequences and Unicode.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Form Encoding and URLSearchParams
          </h2>
          <p>
            Modern web developers frequently encounter a different convention through <code>URLSearchParams</code>.
          </p>
          <p>
            <code>URLSearchParams</code> follows the <code>application/x-www-form-urlencoded</code> serialization rules when converting its parameter collection to a string. In this representation, spaces become <code>+</code>, and additional characters can receive percent-encoding according to the form-urlencoded percent-encode set.
          </p>
          <p>
            For example:
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
{`new URLSearchParams([
  ["q", "hello world"]
]).toString() // produces: "q=hello+world"`}
          </pre>
          <p>
            That differs from manually constructing a query with an RFC-style <code>%20</code> convention. This difference is one reason developers can see a URL apparently &ldquo;change itself&rdquo; after manipulating its query parameters.
          </p>
          <p>
            MDN documents this distinction between <code>URL.search</code> and serialized <code>URLSearchParams</code>, including the different treatment of spaces and other characters.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. URL Encoding Is Not Security
          </h2>
          <p>
            Encoding changes representation. It does not automatically make input trustworthy.
          </p>
          <p>
            Percent-encoding can prevent characters from interfering with a URL&apos;s syntax, but it does not by itself prevent:
          </p>
          <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-xs space-y-1 text-amber-900 dark:text-amber-200 font-medium">
            <div>&bull; Cross-Site Scripting (XSS)</div>
            <div>&bull; SQL injection</div>
            <div>&bull; Server-Side Request Forgery (SSRF)</div>
            <div>&bull; Open Redirect</div>
            <div>&bull; Command injection</div>
            <div>&bull; Authorization flaws</div>
          </div>
          <p>
            For example, encoding <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> does not magically make a web application secure. The receiving system may decode the value later, and the correct security control must be applied in the actual processing context.
          </p>
          <p>
            Similarly, URL encoding does not validate whether a redirect target is trustworthy, whether a hostname is allowed for an outbound request, or whether a database query is safely parameterized.
          </p>
          <p>
            The calculator&apos;s security material explicitly preserves this distinction. Google&apos;s guidance also emphasizes accurate, trustworthy explanations rather than unsupported security claims.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Double Encoding and Open Redirect Problems
          </h2>
          <p>
            Two practical URL bugs deserve special attention:
          </p>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Double Encoding</h3>
            <p>
              An application may encode a <code>%</code> character that was already introduced by a previous encoding stage: <code>%20 &rarr; %2520</code>. This can cause broken routing or incorrect parameter values.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Open Redirects</h3>
            <p>
              A URL encoder does not determine whether a redirect destination is safe. An application that accepts <code>?next=https://attacker.example</code> must validate the destination according to its security requirements. Encoding the parameter does not solve that architectural problem.
            </p>
          </div>
          <p>
            The URL calculator can help you represent the data correctly, but the application must still enforce its own destination policy.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. URL Encoding vs Base64
          </h2>
          <p>
            URL percent-encoding and Base64 solve different problems:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Percent-encoding represents bytes using <code>%HH</code> sequences so that data can be placed safely within URI syntax.</li>
            <li>Base64 represents binary data using a 64-character alphabet.</li>
          </ul>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-2 text-slate-700 dark:text-slate-300">
            <div>
              <span className="text-zinc-400 block font-sans text-[11px]">For URL syntax:</span>
              hello world &rarr; hello%20world
            </div>
            <div>
              <span className="text-zinc-400 block font-sans text-[11px]">For Base64 text representation:</span>
              hello world &rarr; aGVsbG8gd29ybGQ=
            </div>
          </div>
          <p>
            If your problem is putting a parameter value into a URL, percent-encoding is generally the relevant operation. When binary data needs to be represented as text rather than placed into a URL component, the{" "}
            <Link href="/calculators/base64-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Base64 Encoder / Decoder
            </Link>{" "}
            is a more appropriate tool.
          </p>
          <p>
            The two techniques can also appear together in larger systems, but they should not be treated as interchangeable encoding systems.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Practical JavaScript Examples
          </h2>
          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-sans block mb-1">Encode a query value:</span>
              <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg overflow-x-auto text-slate-800 dark:text-slate-200">
{`const value = "hello world & C++";
const encoded = encodeURIComponent(value);
console.log(encoded); // "hello%20world%20%26%20C%2B%2B"`}
              </pre>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-sans block mb-1">Decode a query value:</span>
              <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg overflow-x-auto text-slate-800 dark:text-slate-200">
{`const decoded = decodeURIComponent(encoded);
console.log(decoded); // "hello world & C++"`}
              </pre>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-sans block mb-1">Encode a complete URL:</span>
              <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg overflow-x-auto text-slate-800 dark:text-slate-200">
{`const url = "https://example.com/search?q=hello world";
const encoded = encodeURI(url);
console.log(encoded); // "https://example.com/search?q=hello%20world"`}
              </pre>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-sans block mb-1">Build query parameters with URLSearchParams:</span>
              <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg overflow-x-auto text-slate-800 dark:text-slate-200">
{`const params = new URLSearchParams();
params.set("query", "hello world");
params.set("category", "dev tools");
console.log(params.toString()); // "query=hello+world&category=dev+tools"`}
              </pre>
            </div>
          </div>
          <p>
            Remember that <code>URLSearchParams</code> follows form-urlencoded serialization rules, including <code>+</code> for spaces. For an individual query value, use component encoding rather than encoding the complete URL.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Python Examples
          </h2>
          <p>
            Python&apos;s standard library provides URL parsing and quoting functionality through <code>urllib.parse</code>:
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
{`from urllib.parse import quote, unquote

encoded = quote("hello world & C++", safe="")
decoded = unquote(encoded)

print(encoded) # "hello%20world%20%26%20C%2B%2B"
print(decoded) # "hello world & C++"`}
          </pre>
          <p>
            For form-style query data, Python also provides <code>quote_plus()</code>:
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
{`from urllib.parse import quote_plus

encoded = quote_plus("hello world")
print(encoded) # "hello+world"`}
          </pre>
          <p>
            The distinction matters because <code>quote_plus()</code> uses <code>+</code> for spaces, while the generic quoting behavior can use <code>%20</code>. Use the function that matches the format expected by the receiving system rather than choosing one merely because both are called &ldquo;URL encoding.&rdquo;
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. PHP Examples
          </h2>
          <p>
            PHP provides both generic and form-style URL functions:
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
{`// RFC 3986 encoding (space as %20)
$encoded = rawurlencode("hello world & C++");
$decoded = rawurldecode($encoded);

// Form-style query data (space as +)
$form_encoded = urlencode("hello world");
$form_decoded = urldecode($form_encoded);`}
          </pre>
          <p>
            These functions are useful precisely because URL encoding is context-sensitive. The distinction between <code>rawurlencode()</code> and <code>urlencode()</code> should not be erased when explaining the behavior.
          </p>
          <p>
            For IP addressing and CIDR planning rather than URL syntax, use the{" "}
            <Link href="/calculators/ip-subnet-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              IP Subnet Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            22. How to Use This URL Encoder / Decoder
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">For a single parameter value:</span>
              <ol className="list-decimal pl-5 space-y-0.5 text-slate-600 dark:text-slate-400">
                <li>Enter the original value.</li>
                <li>Select the query/component mode.</li>
                <li>Encode.</li>
                <li>Copy the resulting value.</li>
              </ol>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">For a complete URL:</span>
              <ol className="list-decimal pl-5 space-y-0.5 text-slate-600 dark:text-slate-400">
                <li>Enter the full URL.</li>
                <li>Select full-address encoding.</li>
                <li>Encode the URL while preserving its structural delimiters.</li>
                <li>Inspect protocol, hostname, port, path, query and fragment.</li>
              </ol>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">For an existing encoded value:</span>
              <ol className="list-decimal pl-5 space-y-0.5 text-slate-600 dark:text-slate-400">
                <li>Select Decode.</li>
                <li>Paste the percent-encoded value.</li>
                <li>Select the appropriate decoding mode.</li>
                <li>Decode once.</li>
                <li>Verify that the resulting text is what you expect.</li>
              </ol>
            </div>
          </div>
          <p>
            For multiple parameters, use the query parameter editor rather than manually assembling a long query string. The calculator supports adding, deleting, enabling, disabling and editing parameters and preserves duplicate keys.
          </p>
          <p>
            For repeated lines of data, batch mode can process each line independently.
          </p>
        </section>

      </div>

      {/* 2. FULLY UNFOLDED FAQ SECTION (Questions 23 to 41, open by default) */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {url_encoder_decoderFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            const qNum = idx + 23; // Matching the numbering 23 to 41 from the prompt
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      {`${qNum}.`}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. TECHNICAL NOTES & STANDARDS REFERENCES */}
      <div className="pt-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Technical Notes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-zinc-100">Percent Encoding Is Component-Specific</h3>
              <p>
                A URL should not be treated as an undifferentiated string. Encoding rules depend on whether you are handling a complete URL, scheme, host, path, path segment, query, parameter name, parameter value, or fragment. That is why this calculator exposes multiple encoding modes instead of one generic replace button. RFC 3986 explicitly describes URI components and context-sensitive use of reserved characters.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-zinc-100">+ Is Especially Context-Sensitive</h3>
              <p>
                Do not automatically replace <code>%20 &harr; +</code> in every URL. The <code>+</code> space convention is associated with form-urlencoded serialization, while RFC 3986 percent-encoding uses <code>%20</code> for a space. WHATWG and MDN document the form-urlencoded behavior separately.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-zinc-100">Decode Once at the Correct Boundary</h3>
              <p>
                An application should parse the URL structure before decoding values where necessary. Otherwise an encoded delimiter can become an actual delimiter and change how the URL is interpreted.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-zinc-100">Encoding Does Not Sanitize</h3>
              <p>
                Percent-encoding is a representation operation. Security validation must occur separately in the application context where the data is consumed.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileCode2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Standards &amp; References
            </h2>
          </div>
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">RFC 3986 &mdash; Uniform Resource Identifier (URI): Generic Syntax</span>
              <p className="mt-0.5">The primary reference for generic URI syntax, percent-encoding, reserved characters, unreserved characters, URI components and normalization.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">WHATWG URL Standard</span>
              <p className="mt-0.5">Defines current web-platform URL parsing and serialization behavior, including the <code>application/x-www-form-urlencoded</code> percent-encode set and space-as-plus serialization.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">MDN &mdash; URLSearchParams</span>
              <p className="mt-0.5">Documents browser behavior for parsing and serializing query parameters, including <code>+</code> as the serialized representation of spaces in form-urlencoded data.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">MDN &mdash; JavaScript URI Encoding APIs</span>
              <p className="mt-0.5">Use the browser&apos;s <code>encodeURI()</code>, <code>encodeURIComponent()</code>, <code>decodeURI()</code> and <code>decodeURIComponent()</code> APIs according to whether the value is a complete URI or an individual component.</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default URLEncoderContent;
