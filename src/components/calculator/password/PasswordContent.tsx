"use client";

import React from "react";
import { BookOpen, AlertTriangle, ShieldCheck, Key } from "lucide-react";

export function PasswordContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mt-10  dark:border-zinc-800 pt-8">
      <header>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          The Cryptographic Reference to Password Entropy, Passphrases, and Authentication Security
        </h2>
        <p className="text-slate-900 dark:text-slate-100 text-xs">
          An authoritative educational guide on Shannon entropy, search space scales, offline cracking vectors, and password managers.
        </p>
      </header>

      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>1.</span> Introduction to Password Generation
        </h3>
        <p>
          A **Password Generator** is a critical security utility used to construct strong, unpredictable passwords that resist unauthorized access. In computer systems security, passwords act as shared secrets verifying user identities. Naive human password creation relies on predictable patterns, dictionary terms, or personal dates, leaving credentials vulnerable to brute-force attacks.
        </p>
        <p>
          This calculator suite leverages **Cryptographically Secure Pseudo-Random Number Generation (CSPRNG)** to eliminate predictable selection patterns. By calculating theoretical search space entropy, analyzing character types distribution, and planning passphrase layouts, this tool helps users establish bulletproof login credentials.
        </p>
      </section>

      {/* SECTION 2: WHAT MAKES A PASSWORD STRONG */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>2.</span> What Makes a Password Strong?
        </h3>
        <p>
          Strong credentials stand out on three primary dimensions:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Length:</strong> The single most effective variable. Increasing the number of characters increases the search space exponentially, making brute-force cracking exponentially harder.
          </li>
          <li>
            <strong>Randomness:</strong> Characters must be chosen completely independently of each other. Deterministic combinations (like placing symbols only at the end or capitalizing only the first letter) reduce randomness and are targeted by cracking algorithms.
          </li>
          <li>
            <strong>Uniqueness:</strong> Reusing passwords across multiple platforms introduces credential stuffing risks. If one database is compromised, attackers automatically test those credentials on other high-value services.
          </li>
        </ul>
      </section>

      {/* SECTION 3: PASSWORD LENGTH VS COMPLEXITY */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>3.</span> Password Length vs. Complexity
        </h3>
        <p>
          A common mistake is prioritizing complexity (symbols, mixed cases) over length. For example, a 6-character complex password (e.g. `P@ss1!`) has a search space of approximately 94^6 (approx. 6.89 × 10^11) combinations.
        </p>
        <p>
          Conversely, a simple 16-character alphabetic password (e.g. `rivercobaltlantern`) has a search space of 26^16 (approx. 4.36 × 10^22) combinations. By choosing length over complexity, you create a search space that is over 60 billion times larger, making it substantially harder to crack while remaining easier to type and remember.
        </p>
      </section>

      {/* SECTION 4: PASSWORD ENTROPY */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>4.</span> Understanding Password Entropy in Bits
        </h3>
        <p>
          Password entropy quantifies the strength of a password-generation process, measured in bits of entropy. It is calculated using Shannon&apos;s formula:
        </p>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-xl font-sans tabular-nums text-xs">
          Entropy (H) = Length (L) × log2(Pool Size N)
        </div>
        <p>
          Each bit of entropy doubles the number of guesses an attacker must make to brute-force the password:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>40 bits:</strong> 2^40 (approx. 1 trillion) combinations (Very Weak, crackable in seconds).</li>
          <li><strong>60 bits:</strong> 2^60 (approx. 1.15 quintillion) combinations (Fair, moderate security).</li>
          <li><strong>80 bits:</strong> 2^80 (approx. 1.2 x 10^24) combinations (Strong, standard for modern web accounts).</li>
          <li><strong>100+ bits:</strong> 2^100 (approx. 1.26 x 10^30) combinations (Very Strong, secure against high-performance offline brute-forcing).</li>
        </ul>
      </section>

      {/* SECTION 5: HOW THE CALCULATION WORKS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>5.</span> How the Calculations Work (Bitwise Operations)
        </h3>
        <p>
          The generator follows a cryptographically sound process:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Define Pool Size:</strong> Based on checked categories, count the total size of available characters (e.g. 26 lowercase + 26 uppercase + 10 digits = 62).
          </li>
          <li>
            <strong>Apply Exclusions:</strong> Remove ambiguous characters (`i`, `l`, `1`, `o`, `0`) and custom exclusions from the pool, adjusting the total count.
          </li>
          <li>
            <strong>CSPRNG Sampling:</strong> Retrieve a secure random byte using `crypto.getRandomValues()`.
          </li>
          <li>
            <strong>Rejection Sampling:</strong> Map the random byte to the pool index. If the byte value is greater than the largest multiple of the pool size below 256, it is rejected and re-sampled. This eliminates modulo bias.
          </li>
          <li>
            <strong>Calculate Entropy:</strong> Solve $H = L \times \log_2(N)$ to determine the bit rating.
          </li>
        </ol>
      </section>

      {/* SECTION 6: WORKED EXAMPLES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>6.</span> Worked Sizing Examples
        </h3>
        <div className="space-y-4">
          
          {/* Example 1 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-blue-600" />
              Example A: 16-Character Random Password (All Sets)
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 mt-1">
              Determine the entropy and combination space of a 16-character password generated using lowercase, uppercase, digits, and symbols.
            </p>
            <div className="mt-2 text-xs font-sans tabular-nums bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Define Pool Size (N):</strong> 26 + 26 + 10 + 32 = 94 characters</div>
              <div><strong>2. Calculate Search Space (Combinations):</strong></div>
              <div>Combinations = 94^16 ≈ 3.71 × 10^31 possible passwords</div>
              <div><strong>3. Calculate Entropy:</strong></div>
              <div>H = 16 × log2(94) ≈ 16 × 6.55 = 104.8 bits</div>
              <div><strong>Interpretation:</strong> With 104.8 bits of entropy, the password is extremely secure against brute-force attacks.</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-blue-600" />
              Example B: 4-Word Passphrase
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 mt-1">
              Calculate the entropy of a 4-word passphrase chosen from a curated list of 96 words.
            </p>
            <div className="mt-2 text-xs font-sans tabular-nums bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Define pool size (N):</strong> 96 words</div>
              <div><strong>2. Calculate Combinations:</strong></div>
              <div>Combinations = 96^4 ≈ 8.49 × 10^7 possible phrases</div>
              <div><strong>3. Calculate Entropy:</strong></div>
              <div>H = 4 × log2(96) ≈ 4 × 6.58 = 26.3 bits</div>
              <div><strong>Interpretation:</strong> A 4-word passphrase from a small 96-word list provides moderate security suitable for low-risk accounts. To achieve high security, increase the word count to 6 or 8 words.</div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>7.</span> Common Weak Password Patterns
        </h3>
        <div className="p-4 border border-amber-200 dark:border-amber-900/60 bg-blue-50/50 dark:bg-blue-50/20 rounded-2xl space-y-2">
          <p className="flex items-center gap-1 text-amber-800 dark:text-blue-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" /> Avoid these patterns when creating credentials:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Keyboard Patterns and Runs:</strong> Sequences like `qwerty`, `asdfgh`, or consecutive rows (`123456`) are the first guess patterns tested by brute-force dictionaries.
            </li>
            <li>
              <strong>Predictable Character Substitution:</strong> Substituting letters with visually similar characters (like `p@ssword` or `secr3t`) is widely known. Modern cracking tools use automated rules to guess these variations instantly.
            </li>
            <li>
              <strong>Incorporating Personal Information:</strong> Including names, birthdays, pet names, or company names in your password makes it highly vulnerable to targeted social engineering attacks.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 8: ONLINE VS OFFLINE ATTACKS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>8.</span> Online vs. Offline Password Attacks
        </h3>
        <p>
          Understanding the threat model helps clarify the level of entropy required for your accounts:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Online Attacks:</strong> The attacker attempts to log in via a web interface or login portal. These attacks are slow and limited by network latency, rate limiting, and account lockouts (e.g. blocking the IP after 5 failed attempts). A 60-bit entropy password is often sufficient here.
          </li>
          <li>
            <strong>Offline Attacks:</strong> The attacker obtains a copy of the database containing hashed passwords. They can run cracking software locally on high-performance GPU hardware, testing billions of guesses per second without network constraints. To protect against offline attacks, you need high-entropy passwords (80+ bits) and slow, salted hashing algorithms (like bcrypt or Argon2).
          </li>
        </ul>
      </section>

      {/* SECTION 9: ENGINEERING DISCLAIMER */}
      <section className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Technical Disclaimer
        </h3>
        <p className="text-xs mt-1">
          A strong password is only one layer of account security. To protect your accounts against credential leaks, always enable Multi-Factor Authentication (MFA) and consider using cryptographic passkeys. Passkeys eliminate traditional passwords entirely, replacing them with public-key cryptography keys stored securely on your device.
        </p>
      </section>
    </article>
  );
}

export default PasswordContent;
