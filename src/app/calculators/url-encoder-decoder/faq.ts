import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const url_encoder_decoderFaqs: CalculatorFAQ[] = [
  {
    question: "What is URL encoding?",
    answer: "URL encoding, commonly called percent-encoding, represents characters or bytes using % followed by two hexadecimal digits so that data can be safely represented within a particular URI component. RFC 3986 defines the generic percent-encoding mechanism."
  },
  {
    question: "What is URL decoding?",
    answer: "URL decoding reverses valid percent-encoded byte sequences back into their represented data. Correct decoding should be performed in the appropriate URL component and character encoding context rather than blindly decoding an entire URL before parsing it."
  },
  {
    question: "Why does a space become %20?",
    answer: "Under RFC 3986-style percent-encoding, a space is represented by %20. Form-style URL serialization is different and commonly represents a space using +."
  },
  {
    question: "Why does a space sometimes become +?",
    answer: "The + convention belongs to application/x-www-form-urlencoded serialization, which is used by form/query-oriented APIs such as URLSearchParams. WHATWG and MDN document the space-as-plus behavior for this encoding model."
  },
  {
    question: "How do I encode a plus sign in a URL?",
    answer: "When a literal + is data, it should generally be percent-encoded as %2B (for example, C++ → C%2B%2B). This is especially important with query parameters because form-style parsers may interpret an unescaped + as a space."
  },
  {
    question: "What is the difference between encodeURI() and encodeURIComponent()?",
    answer: "encodeURI() is intended for a complete URI and leaves many structural delimiters intact. encodeURIComponent() is intended for an individual URI component such as a parameter value and therefore encodes more characters. They solve different problems and should not be substituted for one another."
  },
  {
    question: "What are reserved URL characters?",
    answer: "RFC 3986 defines reserved characters including : / ? # [ ] @ ! $ & ' ( ) * + , ; =. They are called reserved because they can have structural meaning in URI syntax. Whether they should be encoded depends on the component and whether they are acting as delimiters or data."
  },
  {
    question: "Which characters are unreserved in RFC 3986?",
    answer: "The unreserved set consists of uppercase letters (A–Z), lowercase letters (a–z), decimal digits (0–9), hyphen (-), period (.), underscore (_), and tilde (~). RFC 3986 recommends that URI producers not unnecessarily percent-encode these characters."
  },
  {
    question: "How do I encode Unicode or emoji in a URL?",
    answer: "Convert the text to UTF-8 bytes first and then percent-encode the bytes that need encoding. For example, é becomes %C3%A9, while the UTF-8 bytes for 😀 produce %F0%9F%98%80. RFC 3986 specifies UTF-8 as the recommended octet representation for new URI schemes carrying Unicode data."
  },
  {
    question: "What is double URL encoding?",
    answer: "Double URL encoding occurs when an already percent-encoded value is encoded again (e.g. %20 → %2520) because the % itself becomes %25. It can be intentional when %20 is literal data, but accidental double encoding often causes broken parameters and routing errors. RFC 3986 warns against encoding or decoding the same URI more than once."
  },
  {
    question: "Does URL encoding make input secure?",
    answer: "No. URL encoding changes representation; it is not a substitute for sanitization, validation, authorization, parameterized database queries, output encoding or other security controls. It does not by itself prevent XSS, SQL injection, SSRF or open redirects."
  },
  {
    question: "Does URL encoding encrypt data?",
    answer: "No. Percent-encoding is reversible representation, not encryption. Anyone who can read the URL can normally decode percent-encoded values."
  },
  {
    question: "What is the difference between URL encoding and Base64?",
    answer: "URL encoding uses percent-encoded bytes such as %20 and %2F to represent data within URI syntax. Base64 converts bytes into a larger text representation using a 64-character alphabet. They are different tools for different data-formatting requirements."
  },
  {
    question: "Can a URL contain duplicate query parameters?",
    answer: "Yes. A query can contain repeated names such as tag=red&tag=blue&tag=green. The receiving application determines the semantic meaning. A URL-processing tool should not silently collapse repeated parameters unless that behavior is explicitly intended."
  },
  {
    question: "Can I encode an entire URL with encodeURIComponent()?",
    answer: "You can, but that generally treats the entire URL as one data component. It will encode structural delimiters that are meaningful when the string is actually intended to remain a complete URL. For complete URLs, encodeURI() or a component-aware URL-building approach is usually more appropriate."
  },
  {
    question: "Why does my URL change after using URLSearchParams?",
    answer: "URLSearchParams serializes parameters using the application/x-www-form-urlencoded rules. This can change spaces to + and can alter some percent-encoding choices compared with the original URL.search string. MDN documents this difference explicitly."
  },
  {
    question: "What does %25 mean?",
    answer: "%25 is the percent-encoded representation of the % character. Therefore, %20 encoded as literal text becomes %2520 because the percent sign has become %25."
  },
  {
    question: "Should hexadecimal digits in percent-encoding be uppercase?",
    answer: "Percent-encoding hexadecimal digits are case-insensitive, but RFC 3986 recommends uppercase hexadecimal digits for consistent URI production. Thus %2F is the preferred canonical presentation over %2f."
  },
  {
    question: "Is there one universal maximum URL length?",
    answer: "There is no single universal application limit that can safely be assumed for every browser, server, proxy, framework and gateway. Practical limits depend on the entire request path through the systems handling the URL. Very large data generally belongs in an appropriate request body or another transport mechanism rather than an excessively long URL."
  }
];
