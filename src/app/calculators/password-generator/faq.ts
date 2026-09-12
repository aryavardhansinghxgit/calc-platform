import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const password_generatorFaqs: CalculatorFAQ[] = [
  {
    "question": "What is a password generator?",
    "answer": "A password generator creates credentials using a defined set of characters and a random selection process. A good generator uses a cryptographically secure random source rather than an ordinary pseudo-random function intended for simulations or games."
  },
  {
    "question": "What makes a generated password secure?",
    "answer": "For a generated credential, important properties include unpredictable random selection, sufficient length, a large effective search space and uniqueness across accounts. The strength of the final account also depends on storage, rate limiting, MFA and whether the credential has been compromised."
  },
  {
    "question": "How long should a password be?",
    "answer": "There is no single length that makes every password universally secure. Current NIST guidance requires passwords used as a single authentication factor to be at least 15 characters and permits shorter passwords, with a minimum of eight, when they are used as part of MFA. NIST also recommends allowing long passwords and avoiding arbitrary composition rules."
  },
  {
    "question": "Are symbols necessary for a strong password?",
    "answer": "Not necessarily. Current NIST guidance does not recommend mandatory composition rules requiring specific mixes of uppercase letters, numbers or symbols. Randomness and sufficient length are more important than satisfying a cosmetic checklist."
  },
  {
    "question": "How is password entropy calculated?",
    "answer": "For independent uniform selections from a pool of N characters across L positions, entropy is H = L * log2(N). The calculator uses a different formula when characters cannot repeat because the sampling process is then without replacement: H = log2(N! / (N - L)!)."
  },
  {
    "question": "What is the search space of a 16-character password?",
    "answer": "The answer depends on the effective character pool. With a 94-character pool and independent selection, 94^16 (approximately 3.71 × 10^31) possible strings exist, corresponding to about 104.8 theoretical bits of entropy."
  },
  {
    "question": "Is a longer password always stronger?",
    "answer": "Length generally increases the theoretical search space, but the answer depends on how the password was generated. A long predictable phrase can be easier to guess than a shorter genuinely random credential. The randomness model and attacker's knowledge matter."
  },
  {
    "question": "Is a passphrase better than a password?",
    "answer": "Neither is automatically better. A randomly generated passphrase can provide strong security with better human readability, while a random character password can achieve a large search space in fewer characters. The important factor is how unpredictably the credential was generated."
  },
  {
    "question": "Is a six-digit PIN secure?",
    "answer": "A six-digit decimal PIN has 1,000,000 possible combinations and about 19.93 bits of idealized entropy. Whether that is sufficient depends heavily on how and where the PIN is used, especially the presence of local lockouts or other protective controls."
  },
  {
    "question": "Why is Math.random() unsuitable for passwords?",
    "answer": "Math.random() is not intended to provide cryptographically secure random values. MDN explicitly recommends the Web Crypto API for security-sensitive randomness."
  },
  {
    "question": "What is CSPRNG?",
    "answer": "CSPRNG stands for Cryptographically Secure Pseudo-Random Number Generator. It produces random-looking values using algorithms and unpredictable seeds suitable for security-sensitive applications. The browser's Web Crypto API exposes cryptographically strong random values through crypto.getRandomValues()."
  },
  {
    "question": "What is modulo bias?",
    "answer": "Modulo bias occurs when a random range is mapped to a target range whose size does not divide the source range evenly. Some target values then become slightly more probable. Rejection sampling is one way to eliminate that bias. The calculator's production implementation and tests explicitly verify rejection sampling."
  },
  {
    "question": "Should I reuse one strong password everywhere?",
    "answer": "No. A password that is unique to one service limits the damage when another service suffers a breach. Reusing credentials exposes users to credential-stuffing attacks. OWASP recommends password managers and unique credentials as part of a strong authentication strategy."
  },
  {
    "question": "Should I change my password every month?",
    "answer": "Not simply because a calendar says so. Current NIST guidance recommends against arbitrary periodic password changes and instead emphasizes changing credentials when compromise or another specific security event requires it."
  },
  {
    "question": "Is a password strength meter enough to protect an account?",
    "answer": "No. A strength meter is an advisory tool. Real account security also depends on compromised-password screening, rate limiting, secure password storage, MFA and protection against phishing and credential theft."
  }
];

export default password_generatorFaqs;
