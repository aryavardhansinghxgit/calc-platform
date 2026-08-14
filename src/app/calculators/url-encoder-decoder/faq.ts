import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const url_encoder_decoderFaqs: CalculatorFAQ[] = [
  {
    question: "What is URL encoding (Percent-Encoding)?",
    answer: "URL encoding (officially termed Percent-Encoding) is a mechanism specified in RFC 3986 for encoding arbitrary binary or non-ASCII data within Uniform Resource Identifiers (URIs). It replaces unsafe, reserved, or non-printable ASCII characters with a '%' symbol followed by two hexadecimal digits representing the character's byte value in UTF-8 (e.g., a space character becomes '%20')."
  },
  {
    question: "Why do spaces turn into %20 or + in a URL?",
    answer: "The general URI specification (RFC 3986) mandates that spaces be percent-encoded as '%20'. However, HTML form submissions submitted via HTTP POST or GET requests use the 'application/x-www-form-urlencoded' MIME type, which historically defines space characters as '+' (plus sign). General URL components require '%20', whereas query parameter forms often use '+'."
  },
  {
    question: "What is the difference between encodeURI and encodeURIComponent in JavaScript?",
    answer: "encodeURI() is designed to encode a complete, working URL while preserving structural protocol and domain delimiters (such as ':', '/', '?', '#', and '&'). encodeURIComponent() is designed to encode an individual query parameter key or value, aggressively converting delimiters like '/', '?', ':', and '&' into their percent-encoded equivalents (e.g., '/' becomes '%2F') so they don't break parameter boundaries."
  },
  {
    question: "Which characters are safe and never get encoded in a URL?",
    answer: "According to RFC 3986 §2.3, unreserved characters are always safe and must never be percent-encoded. Unreserved characters consist of uppercase letters (A–Z), lowercase letters (a–z), decimal digits (0–9), hyphen ('-'), underscore ('_'), period ('.'), and tilde ('~')."
  },
  {
    question: "What is Double Encoding and why does it break links?",
    answer: "Double encoding occurs when an already percent-encoded string is passed through a URL encoder a second time. For example, a space '%20' has its percent sign '%' encoded into '%25', producing '%2520'. When Web servers or API gateways attempt to decode '%2520', they receive literal text '%20' instead of a space character, leading to 404 errors, invalid query parameters, or broken authentication tokens."
  },
  {
    question: "Can URL encoding prevent Cross-Site Scripting (XSS) and SQL Injection?",
    answer: "While URL encoding prevents control characters and delimiters from breaking URL syntax during network transmission, it is NOT a substitute for security sanitization. Malicious scripts (e.g., '<script>alert(1)</script>') will simply be decoded by web applications upon receipt. Preventing XSS and SQL injection requires context-aware HTML output encoding, strict Content Security Policies (CSP), and parameterized SQL database queries."
  },
  {
    question: "How do I encode non-English characters (like accents or emojis) in a URL?",
    answer: "Non-English characters, accented letters (like 'é' or 'ñ'), and multibyte Unicode emojis (like '🚀') are first converted into raw UTF-8 byte sequences. Each byte in the sequence is then percent-encoded individually. For example, the emoji '🚀' consists of 4 bytes in UTF-8 (0xF0 0x9F 0x9A 0x80), which encodes to '%F0%9F%9A%80'."
  },
  {
    question: "What characters are considered reserved in RFC 3986?",
    answer: "Reserved characters are divided into general delimiters ('gen-delims': ':', '/', '?', '#', '[', ']', '@') and sub-delimiters ('sub-delims': '!', '$', '&', '\'', '(', ')', '*', '+', ',', ';', '='). They hold special syntactic meanings in URIs and must be percent-encoded if used as literal data content rather than structural delimiters."
  },
  {
    question: "Why did my browser automatically decode my query parameters?",
    answer: "Modern web browsers (like Chrome, Firefox, Safari, and Edge) automatically decode percent-encoded characters in the address bar display to improve visual readability for human users. However, under the hood, the browser continues to send the raw, properly percent-encoded string over the wire to the web server."
  },
  {
    question: "What is the maximum allowed length of an encoded URL?",
    answer: "While the official HTTP specification does not enforce a rigid maximum URL length, practical web standards limit URLs to 2,048 characters to ensure compatibility across older browsers (like Internet Explorer), search engine crawlers, and proxy servers. Modern servers (Apache, Nginx) typically support URLs up to 8,192 bytes before returning a 414 URI Too Long status code."
  }
];
