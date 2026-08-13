import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const password_generatorFaqs: CalculatorFAQ[] = [
  {
    "question": "What is a secure password entropy level?",
    "answer": "For basic online accounts protected by rate limiting and lockouts, an entropy level of 60 bits is generally sufficient. For high-security systems or protection against local, offline GPU brute-force attacks, an entropy level of 80 bits to 100+ bits is highly recommended."
  },
  {
    "question": "How is password entropy calculated?",
    "answer": "Password entropy is calculated using Shannon's equation: H = L * log2(N), where 'L' is the password length and 'N' is the size of the character pool (e.g. 26 for lowercase letters, 94 for all ASCII printable characters). It represents the theoretical search space complexity."
  },
  {
    "question": "What is a cryptographically secure random number generator (CSPRNG)?",
    "answer": "A CSPRNG is an algorithm designed to generate random values that are statistically independent and completely unpredictable. Unlike standard pseudo-random generators (such as Math.random()), a CSPRNG prevents attackers from guessing future generated passwords by analyzing past outputs."
  },
  {
    "question": "What is modulo bias in password generation?",
    "answer": "Modulo bias occurs when a random number generator maps values to a target range using simple modulo arithmetic (%), causing some characters to have a slightly higher probability of selection than others. This tool uses rejection sampling to eliminate modulo bias, ensuring perfectly uniform distribution."
  },
  {
    "question": "Does this password generator store or log my passwords?",
    "answer": "No. All password generations and strength analyses are processed entirely locally inside your browser using JavaScript. No plaintext passwords or input values are logged, sent to external APIs, or transmitted over the internet."
  },
  {
    "question": "What is the difference between a password and a passphrase?",
    "answer": "A password is a string of random characters, numbers, and symbols. A passphrase is a sequence of randomly selected dictionary words. Passphrases are often much longer, providing extremely high search-space entropy, yet remain far easier for humans to remember and type."
  },
  {
    "question": "What are visually ambiguous characters?",
    "answer": "Visually ambiguous characters are letters and numbers that look very similar in certain fonts (such as lowercase 'l', uppercase 'I', the digit '1', uppercase 'O', and the digit '0'). Excluding them prevents errors when manually reading or typing passwords."
  },
  {
    "question": "What does 'no repeated characters' mean?",
    "answer": "When 'no repeated characters' is enabled, every character in the generated password is guaranteed to be unique. Note that this reduces the character pool size sequentially as characters are chosen, which slightly lowers the overall entropy compared to a fully random password of the same length."
  },
  {
    "question": "How do online and offline attacks differ?",
    "answer": "Online attacks interact with a live login interface and are limited by network latency, rate limiters, and lockouts. Offline attacks run locally on an attacker's hardware (like GPU clusters) using stolen password hashes, enabling them to test billions of guesses per second."
  },
  {
    "question": "Why shouldn't I reuse passwords?",
    "answer": "Password reuse is vulnerable to credential stuffing. If a single website is breached, attackers obtain your password and immediately use automated scripts to attempt logins on hundreds of other high-value services (like email, banking, or social media)."
  },
  {
    "question": "What is a password manager?",
    "answer": "A password manager is a secure software vault that generates, encrypts, stores, and autofills unique passwords for all your online accounts. It allows you to use complex, unique credentials for every service without needing to memorize them."
  },
  {
    "question": "Should I regularly rotate or change my passwords?",
    "answer": "Modern cybersecurity guidelines (such as NIST) recommend changing passwords only when there is evidence of a breach or compromise. Frequent rotation often leads users to adopt predictable pattern modifications (e.g. changing 'Winter2025!' to 'Spring2025!'), which reduces security."
  },
  {
    "question": "What is Multi-Factor Authentication (MFA)?",
    "answer": "MFA is a security mechanism requiring two or more distinct validation proofs to grant access: something you know (password), something you have (security key or authenticator app), or something you are (biometrics). MFA blocks access even if an attacker guesses your password."
  },
  {
    "question": "What are passkeys?",
    "answer": "Passkeys are cryptographic credentials stored on your device that use public-key cryptography to authenticate logins. Unlike passwords, passkeys are secure against phishing, cannot be guessed, and eliminate the need for traditional shared secrets entirely."
  },
  {
    "question": "Does adding symbols make a short password secure?",
    "answer": "No. Adding complex symbols to a short password (e.g. a 6-character complex password) still results in a tiny total search space. Increasing length (e.g. from 8 characters to 16 characters) is exponentially more effective at increasing security than adding complex characters."
  },
  {
    "question": "Is it safe to write down my passwords?",
    "answer": "Writing down passwords on a physical notebook stored in a secure location in your home is actually safer than reusing simple passwords or storing them in unencrypted text files on your computer. However, a dedicated digital password manager remains the recommended best practice."
  }
];

export default password_generatorFaqs;
