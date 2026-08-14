import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const base64_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the difference between Base64 encoding and encryption?",
    answer: "Base64 encoding is a public, deterministic algorithm designed to transform binary data into printable ASCII characters for safe transmission over text-based protocols. It provides zero security or data secrecy because anyone can decode it instantly without a key. Encryption, by contrast, uses secret cryptographic keys (such as AES or RSA) to scramble data so that unauthorized parties cannot read it."
  },
  {
    question: "Why does Base64 encoding increase data size by 33%?",
    answer: "Base64 represents 3 Bytes of binary data (24 bits) using 4 ASCII characters (each carrying 6 bits of information). Because 4 characters are used to represent the data originally contained in 3 Bytes, the output length is exactly 4/3 of the input size, resulting in a constant +33.33% data overhead expansion (plus up to 2 bytes of '=' padding)."
  },
  {
    question: "What is URL-Safe Base64 (Base64URL)?",
    answer: "Standard Base64 uses the '+' and '/' characters, which have special reserved meanings in URLs (e.g., '+' represents spaces and '/' separates path segments). URL-Safe Base64 (defined in RFC 4648 §5) replaces '+' with '-' (hyphen) and '/' with '_' (underscore), and typically omits trailing '=' padding characters so the string can be safely embedded in HTTP query parameters and URL paths."
  },
  {
    question: "What does the '=' symbol mean at the end of a Base64 string?",
    answer: "The '=' symbol is a padding character used when the total input length in bytes is not evenly divisible by 3. If 1 byte remains at the end of the input (8 bits), it is padded with zeros to 12 bits (2 Base64 characters) followed by '=='. If 2 bytes remain (16 bits), they are padded to 18 bits (3 Base64 characters) followed by '='."
  },
  {
    question: "How do I convert an image file to Base64 in my browser?",
    answer: "You can drag and drop any image file (PNG, JPEG, SVG, WebP) directly into our Base64 converter tool. The tool uses the HTML5 FileReader API to encode the binary file client-side and automatically format it as a raw Base64 string, an inline Data URI ('data:image/png;base64,...'), an HTML <img> tag, or a CSS background-image snippet."
  },
  {
    question: "Does Base64 support UTF-8 characters and non-English text?",
    answer: "Yes, provided the text is converted to raw UTF-8 byte sequences prior to encoding. Native JavaScript functions like btoa() only accept Latin-1 single-byte characters. Our tool encodes text using full UTF-8 byte arrays (via TextEncoder), allowing seamless support for international scripts, emojis, and mathematical symbols."
  },
  {
    question: "Can Base64 be used safely to store sensitive passwords?",
    answer: "No. Base64 encoding should NEVER be used for passwords or authentication tokens. Because Base64 is trivially reversible with zero key requirement, storing encoded passwords is equivalent to storing plain text. Passwords must always be hashed using slow, salted cryptographic algorithms like bcrypt, Argon2, or PBKDF2."
  },
  {
    question: "How do I decode Base64 programmatically in JavaScript?",
    answer: "In browser environments, decode ASCII strings using atob(base64String), or for UTF-8 text use new TextDecoder().decode(Uint8Array.from(atob(base64String), c => c.charCodeAt(0))). In Node.js server environments, use Buffer.from(base64String, 'base64').toString('utf-8')."
  },
  {
    question: "What is a Base64 Data URI and how does it work?",
    answer: "A Data URI allows small media assets to be embedded directly into HTML or CSS files without external HTTP requests. It uses the format scheme: data:[<mediatype>][;base64],<data>. For example, <img src=\"data:image/png;base64,iVBORw0KGgo...\" /> displays an image inline."
  },
  {
    question: "Why am I getting an 'Invalid character' error while decoding?",
    answer: "Decoding errors occur when the input string contains characters outside the valid Base64 alphabet (A–Z, a–z, 0–9, +, /, =), or when standard Base64 characters are mixed with URL-Safe symbols ('-', '_'). Corrupted strings, missing padding, or whitespace in strict decoders also trigger invalid character exceptions."
  }
];
