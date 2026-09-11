import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const base64_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is Base64 used for?",
    answer: "Base64 is used to represent binary data as text using a restricted character set. Common applications include data transport in text-oriented systems, MIME content, Data URLs, embedded assets and protocol-specific representations. RFC 4648 defines the general Base64 encoding, while other specifications define particular contexts in which Base64 is used."
  },
  {
    question: "Is Base64 encryption?",
    answer: "No. Base64 is reversible encoding, not encryption. It does not provide confidentiality or a secret key. Anyone who has the encoded data can generally decode it."
  },
  {
    question: "Is Base64 secure for passwords?",
    answer: "No. Passwords should not be stored as Base64 because Base64 is reversible. Password storage requires a dedicated password-hashing approach rather than a reversible encoding. The calculator's security guidance explicitly warns against Base64 password storage."
  },
  {
    question: "What is the difference between Base64 and Base64URL?",
    answer: "Standard Base64 uses + and /, while Base64URL replaces them with - and _ for URL- and filename-friendly use. RFC 4648 defines Base64URL as a distinct variant rather than simply another name for standard Base64."
  },
  {
    question: "Why does Base64 make data larger?",
    answer: "Base64 maps every group of three input bytes to four output characters. As payload size becomes large, the expansion approaches approximately 33.33%, although small inputs can have much higher percentage expansion because of padding."
  },
  {
    question: "How do I encode Unicode text in Base64?",
    answer: "Convert the Unicode text to UTF-8 bytes first, then Base64-encode those bytes. This avoids the limitations of treating JavaScript Unicode strings as one-byte binary strings. MDN specifically recommends a byte-oriented approach for arbitrary Unicode text."
  },
  {
    question: "What does = mean at the end of Base64?",
    answer: "The = character is padding. It appears when the input length is not a multiple of three bytes and helps complete the final Base64 output group according to the encoding rules. RFC 4648 specifies this behavior."
  },
  {
    question: "What does TWFu decode to?",
    answer: "TWFu → Man. It is the classic Base64 example produced by encoding the three ASCII bytes representing M, a and n."
  },
  {
    question: "What does SGVsbG8= decode to?",
    answer: "SGVsbG8= → Hello. The final = is padding because the five-byte input does not divide evenly into three-byte encoding groups."
  },
  {
    question: "Why does btoa() fail on some Unicode characters?",
    answer: "Browser btoa() expects a binary-string style input in which each character represents a single byte. Arbitrary Unicode characters can require multiple UTF-8 bytes, so direct use of btoa() on such text can throw an error. MDN recommends converting the text to UTF-8 bytes before Base64 encoding."
  },
  {
    question: "What is a Base64 Data URI?",
    answer: "A Data URI is a data: URL that contains the data inline. With Base64 content it follows the general form: data:[media-type][;base64],<payload>. For example: data:image/png;base64,... RFC 2397 defines this URI scheme."
  },
  {
    question: "What is the 76-character Base64 rule?",
    answer: "In MIME Base64, RFC 2045 specifies encoded lines no longer than 76 characters, excluding the line-ending sequence. This is a MIME formatting convention rather than a universal requirement for every Base64 string."
  },
  {
    question: "What is the difference between file size and Base64 size?",
    answer: "File size is the number of source bytes. Base64 size is the size of the encoded representation. Because Base64 expands data, the encoded representation is normally larger than the source. The calculator reports these as separate metrics and uses the actual file byte count rather than the filename length."
  },
  {
    question: "Can Base64 be decoded without knowing the original file type?",
    answer: "Yes. Base64 itself represents bytes and does not inherently contain the original filename or complete file metadata. To reconstruct a useful file, you may also need its MIME type, file extension or other context."
  },
  {
    question: "Does changing one Base64 character change the decoded data?",
    answer: "Usually yes. Because Base64 characters represent groups of bits, changing a character can alter one or more reconstructed bytes. Whether decoding succeeds depends on whether the modified string still satisfies the format's syntax and padding rules."
  }
];
