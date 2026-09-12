"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileCode2, 
  BookOpen, 
  ChevronDown, 
  AlertTriangle,
  HelpCircle,
  Hash,
  Terminal,
  Cpu
} from "lucide-react";
import { password_generatorFaqs } from "@/app/calculators/password-generator/faq";

export function PasswordContent() {
  // All 15 FAQs open by default (fully unfolded matching PDF layout)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: password_generatorFaqs.length }, (_, i) => i))
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
        
        {/* Main Article Header */}
        <header className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
            The Complete Guide to Password Generation, Entropy, Passphrases and Account Security
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            A strong password is not simply a string containing a capital letter, a number and a symbol. The security of a credential depends on how difficult it is for an attacker to predict, guess or obtain it. Length, randomness, uniqueness, password-reuse behavior, breach exposure, authentication controls and the attacker&apos;s available resources all matter.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            This Password Generator is designed to generate random passwords, memorable word passphrases and numeric PINs using a cryptographically secure random source. It also provides entropy and search-space estimates, character-set controls, exclusions, no-repeat generation, bulk generation and a password-strength analysis mode.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            The calculator performs generation locally in the browser. Its production audit verified use of <code>crypto.getRandomValues()</code> rather than <code>Math.random()</code>, rejection sampling for unbiased character selection, and zero credential-data leakage in the tested network paths.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            That makes the tool useful for understanding both the mathematics of random credentials and the practical decisions involved in creating unique credentials.
          </p>
        </header>

        {/* Section 1 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            1. What Makes a Password Strong?
          </h3>
          <p>
            Password strength is best understood as resistance to guessing rather than visual complexity.
          </p>
          <p>
            A password such as:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-rose-600 dark:text-rose-400">
            Password1!
          </div>
          <p>
            may look more complex than:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-blue-600 dark:text-blue-400">
            correct-horse-battery-staple
          </div>
          <p>
            but visible complexity does not automatically mean stronger security. Attackers can prioritize common passwords, leaked credentials, dictionary terms, predictable substitutions and familiar patterns.
          </p>
          <p>
            For generated passwords, the most important advantages are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Randomness:</strong> each character is selected unpredictably.</li>
            <li><strong>Length:</strong> a longer credential generally creates a larger search space.</li>
            <li><strong>Uniqueness:</strong> using a different credential for each important service limits the effect of credential theft elsewhere.</li>
            <li><strong>Resistance to known-password guessing:</strong> passwords that are common or previously exposed should be rejected by secure authentication systems.</li>
          </ul>
          <p>
            Current NIST guidance specifically recommends screening passwords against commonly used or compromised values and does not require arbitrary composition rules such as &quot;must contain one uppercase, one number and one symbol.&quot;
          </p>
          <p>
            That is why this calculator lets the user control character categories without presenting symbol mixing as a universal definition of security.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            2. Password Length vs. Complexity
          </h3>
          <p>
            Suppose a generator selects each character independently from a pool of <em>N</em> possible characters and creates a credential of length <em>L</em>.
          </p>
          <p>
            The theoretical search space is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            S = N^L
          </div>
          <p>
            and the corresponding idealized entropy is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            H = L × log2(N)
          </div>
          <p>
            For example, with a 94-character pool and 16 independently selected characters:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>N = 94</div>
            <div>H = 16 × log2(94) ≈ 104.8 bits</div>
            <div>Search Space = 94^16 ≈ 3.71 × 10^31 possible strings</div>
          </div>
          <p>
            The calculator&apos;s production test suite independently verifies this 16-character example.
          </p>
          <p>
            The important word is <strong>theoretical</strong>. That number describes the space of possible outputs under the assumptions of the model. It does not mean that every real-world attack will require exactly that many guesses. An attacker&apos;s success depends on password hashing, rate limiting, breach databases, password choice, implementation flaws and many other factors.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            3. What Is Password Entropy?
          </h3>
          <p>
            Entropy is a mathematical way to describe uncertainty.
          </p>
          <p>
            For independent uniform selection from a pool of <em>N</em> equally likely characters, each position contributes:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            log2(N) bits
          </div>
          <p>
            For a credential of length <em>L</em>:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            H = L × log2(N)
          </div>
          <p>
            A larger value means a larger theoretical search space:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>
              For a 10-character lowercase-only password: <code>H = 10 × log2(26) ≈ 47.0 bits</code>
            </li>
            <li>
              For a six-digit decimal PIN: <code>H = 6 × log2(10) ≈ 19.93 bits</code>, and the search space is exactly <code>10^6 = 1,000,000</code> combinations.
            </li>
          </ul>
          <p>
            The PDF&apos;s six-digit example uses exactly this relationship. Entropy is therefore useful for understanding a generator&apos;s mathematical search space, but it should not be interpreted as a guaranteed &quot;time to crack.&quot;
          </p>
          <p>
            OWASP likewise cautions that entropy estimates for user-chosen passwords have important assumptions and recommends length and compromised-password screening rather than simplistic complexity rules.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            4. Search Space and Why Longer Credentials Matter
          </h3>
          <p>
            Search space is simply the number of possible outputs an attacker could theoretically test.
          </p>
          <p>
            If every position has the same pool of <em>N</em> characters, <code>S = N^L</code>. Increasing <em>L</em> therefore multiplies the number of possibilities exponentially:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>94^8  ≈ 6.10 × 10^15 combinations</div>
            <div>94^16 ≈ 3.71 × 10^31 combinations (over 6 quadrillion times larger)</div>
          </div>
          <p>
            This is one reason length has such a massive mathematical effect. However, the formula assumes the credential was actually generated according to that model. Human-created passwords often do not satisfy the assumption because people select memorable or predictable patterns.
          </p>
          <p>
            A random 16-character credential and a human-created 16-character phrase therefore should not automatically be assigned the same effective security.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            5. No-Repeat Passwords Require Different Mathematics
          </h3>
          <p>
            The calculator supports a <strong>No Repeated Characters</strong> option. That changes the mathematical model.
          </p>
          <p>
            With replacement, the search space is <code>N^L</code>. Without replacement, the first character has <em>N</em> possibilities, the second has <em>N - 1</em>, the third has <em>N - 2</em>, and so on.
          </p>
          <p>
            The search space becomes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            S = N × (N - 1) × (N - 2) × ... × (N - L + 1) = N! / (N - L)!
          </div>
          <p>
            The corresponding entropy is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            H = log2(N! / (N - L)!) = &Sigma; log2(N - i) for i = 0 to L - 1
          </div>
          <p>
            The production implementation was explicitly corrected to use this without-replacement model and independently verified against it. This distinction matters because simply using <code>L × log2(N)</code> would overstate the search space for no-repeat generation.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            6. Requiring One Character From Each Category
          </h3>
          <p>
            The generator also supports a rule requiring at least one character from each selected category (lowercase, uppercase, numbers, symbols).
          </p>
          <p>
            This guarantees composition constraints, but it also changes the generation process. A generator that first guarantees one character from each category and then fills the remaining positions is not necessarily equivalent to independent uniform selection from a single combined pool.
          </p>
          <p>
            Therefore the entropy displayed for constrained generation must correspond to the actual algorithm rather than blindly applying a generic formula. The production audit explicitly checks mandatory-category entropy against an independent oracle.
          </p>
          <p>
            For practical account security, however, mandatory composition should not be confused with current standards guidance. NIST recommends avoiding arbitrary composition requirements and instead focusing on length, blocklists and effective authentication controls.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            7. Why a Cryptographically Secure Random Generator Matters
          </h3>
          <p>
            A password generator needs more than a source that merely &quot;looks random.&quot;
          </p>
          <p>
            JavaScript&apos;s <code>Math.random()</code> is not designed for cryptographic secrets. MDN explicitly states that it does not provide cryptographically secure random numbers and recommends the Web Crypto API for security-sensitive randomness.
          </p>
          <p>
            The browser API:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-blue-600 dark:text-blue-400">
            window.crypto.getRandomValues()
          </div>
          <p>
            provides cryptographically strong random values suitable for generating random bytes. MDN documents it as the Web Crypto API&apos;s cryptographically strong random-number facility.
          </p>
          <p>
            This calculator&apos;s audit verifies <code>crypto.getRandomValues()</code> and confirms that no <code>Math.random()</code> fallback remains in the production generation path. That is an important property because a mathematically large password space is not useful if the generator repeatedly produces predictable outputs.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            8. What Is Rejection Sampling and Why Is It Used?
          </h3>
          <p>
            Suppose a random byte can have one of 256 values but the character pool has a size that does not divide 256 evenly.
          </p>
          <p>
            For example, a pool of 10 characters does not divide 256:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-slate-700 dark:text-slate-300">
            256 ÷ 10 = 25 remainder 6
          </div>
          <p>
            A naive calculation such as <code>randomByte % 10</code> would give some characters slightly higher probability than others. That effect is called <strong>modulo bias</strong>.
          </p>
          <p>
            A generator can avoid the problem by using rejection sampling:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Generate a secure random value.</li>
            <li>Ignore values outside the largest evenly divisible range.</li>
            <li>Map an accepted value to the character pool.</li>
            <li>Repeat until a valid sample is obtained.</li>
          </ol>
          <p>
            The calculator&apos;s audit explicitly tests rejection sampling and modulo bias across multiple pool sizes. This is one reason a serious password generator should be evaluated at the algorithm level rather than merely inspecting whether its output &quot;looks random.&quot;
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            9. Random Passwords vs. Passphrases
          </h3>
          <p>
            A random password and a random passphrase use different representations of uncertainty.
          </p>
          <p>
            A random password is a sequence of unpredictable characters, while a passphrase is a sequence of randomly selected dictionary words. The key property is not whether the result looks complicated. It is whether the underlying choices were made independently and unpredictably.
          </p>
          <p>
            For a dictionary containing <em>N</em> words and <em>L</em> independent word selections:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>S = N^L</div>
            <div>H = L × log2(N)</div>
          </div>
          <p>
            The calculator uses a verified 96-word dictionary. For four independently selected words:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>96^4 = 84,934,656 possible phrases</div>
            <div>4 × log2(96) ≈ 26.3 bits of entropy</div>
          </div>
          <p>
            Those values are independently verified by the production suite. Increasing the number of independent words creates a much larger search space (e.g. 6 words yields ~39.5 bits, 8 words yields ~52.7 bits).
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            10. Passphrase Length and Human Usability
          </h3>
          <p>
            Passphrases are often attractive because words are easier for people to read and remember than arbitrary character strings.
          </p>
          <p>
            That does not mean every phrase is secure. A phrase selected by a human from familiar quotations, song lyrics, names or predictable sentences may have much less effective uncertainty than the theoretical dictionary calculation suggests.
          </p>
          <p>
            A randomly generated passphrase is different because the words are selected from a defined pool using a random process. When choosing between a generated password and a passphrase, consider: required length, where the credential will be used, whether a password manager is available, whether the system allows spaces, and whether the service imposes legacy restrictions.
          </p>
          <p>
            For many users, a password manager makes long random credentials practical without requiring memorization.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            11. Secure PINs Have a Smaller Search Space
          </h3>
          <p>
            A decimal PIN uses only ten possible digits (0 through 9).
          </p>
          <p>
            A six-digit PIN therefore has <code>10^6 = 1,000,000</code> possible combinations. Its idealized entropy is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            H = 6 × log2(10) ≈ 19.93 bits
          </div>
          <p>
            The calculator verifies both the search-space and entropy calculation. A PIN should therefore not be compared directly with a long random password simply because both are called &quot;credentials.&quot; They have different alphabets, lengths, attack surfaces and usage environments.
          </p>
          <p>
            Device PINs can also be protected by local hardware security chips and lockout mechanisms that materially change the practical attack model.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            12. What Is a Password Strength Checker Actually Measuring?
          </h3>
          <p>
            A password-strength checker is an estimator, not an oracle.
          </p>
          <p>
            A good analyzer considers factors such as: length, character composition, common password patterns, repeated characters, keyboard sequences, dictionary-like structure and estimated search space.
          </p>
          <p>
            The calculator&apos;s analyzer has been tested against common weak patterns, length sensitivity and strength-boundary behavior. A strength label should therefore be interpreted as guidance. It does not prove that &quot;Very Strong&quot; means &quot;Impossible to crack.&quot; Real security depends on how the credential is stored, how guesses are limited, whether the password has appeared in a breach, and whether additional authentication factors are used.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            13. Online Attacks vs. Offline Attacks
          </h3>
          <p>
            Attack conditions matter enormously:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Online Guessing</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                An attacker interacts directly with a login service. Defensive controls may include rate limiting, login throttling, temporary lockouts, bot detection, MFA and risk-based authentication. These controls can dramatically restrict the number of guesses an attacker can make.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Offline Guessing</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                An attacker obtains password-verification data such as password hashes and performs guesses locally. There is no network round trip and no login lockout mechanism. The attacker can therefore test billions of guesses per second, depending on the password-hashing scheme and available hardware.
              </p>
            </div>
          </div>
          <p>
            The PDF correctly separates online and offline attack models. This is why a single universal &quot;your password takes X years to crack&quot; number is misleading.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            14. Why Password Reuse Is Dangerous
          </h3>
          <p>
            Suppose the same password is used for email, banking, shopping, social media and work. If one service suffers a breach and the password becomes known, an attacker can attempt the same credential against the other services. This is called <strong>credential stuffing</strong>.
          </p>
          <p>
            The defense is straightforward in principle: one account, one unique credential. Password managers make this much more practical because users do not need to memorize every random password.
          </p>
          <p>
            Network administrators can also use the{" "}
            <Link href="/calculators/ip-subnet-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              IP Subnet Calculator
            </Link>{" "}
            when planning address ranges and network segmentation to isolate administrative login portals from untrusted networks.
          </p>
          <p>
            OWASP recommends password managers and emphasizes the importance of unique credentials and support for long passwords.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            15. Password Managers Change the Usability Equation
          </h3>
          <p>
            Long random passwords are difficult to memorize. That is precisely where password managers become valuable.
          </p>
          <p>
            A password manager can generate, store and autofill unique credentials for different accounts. OWASP recommends that websites support password-manager workflows and allow sufficiently long credentials rather than imposing unnecessarily restrictive limits.
          </p>
          <p>
            A practical workflow is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs text-blue-600 dark:text-blue-400">
            Password Generator &rarr; Generate unique credential &rarr; Store it in password manager &rarr; Use a different credential for every account &rarr; Protect the password manager with strong authentication
          </div>
          <p>
            The goal is not to make humans memorize dozens of random strings. The goal is to make unique, unpredictable credentials usable at scale.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            16. When Should a Password Be Changed?
          </h3>
          <p>
            Older security advice often recommended changing passwords on a fixed schedule (such as every 30, 60 or 90 days).
          </p>
          <p>
            Current NIST guidance takes a different approach: verifiers should not require arbitrary periodic password changes. Password changes should instead be triggered by circumstances such as evidence of compromise or changes that require replacement.
          </p>
          <p>
            Changing a password is therefore especially important when:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>The credential was exposed in a known breach</li>
            <li>A breach affects the account or service provider</li>
            <li>Someone else may know or have accessed it</li>
            <li>The same credential was reused elsewhere</li>
            <li>A suspicious login event occurred</li>
          </ul>
          <p>
            A forced calendar-based change can otherwise encourage predictable patterns such as <code>Winter2025!</code> to <code>Spring2025!</code>, which can be easier to predict than a genuinely random credential.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            17. Multi-Factor Authentication Adds Another Layer
          </h3>
          <p>
            A password is only one authentication factor. Multi-Factor Authentication (MFA) adds additional evidence, typically from categories such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Something you know:</strong> password, PIN or passphrase</li>
            <li><strong>Something you have:</strong> hardware security key, authenticator app or device token</li>
            <li><strong>Something you are:</strong> biometric verification (fingerprint, facial recognition)</li>
          </ul>
          <p>
            This means that stealing the password alone may not be sufficient to gain account access. NIST&apos;s current digital identity guidance treats passwords as a form of authentication secret but also emphasizes stronger authentication mechanisms and notes that passwords are not phishing-resistant.
          </p>
          <p>
            For important accounts, a strong unique password and MFA should generally be considered complementary rather than competing controls.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            18. Passkeys and the Future of Authentication
          </h3>
          <p>
            Passkeys represent a different model from traditional shared passwords.
          </p>
          <p>
            WebAuthn uses public-key credentials scoped to a relying party. The credential is created by an authenticator and subsequently used through public-key authentication rather than sending a reusable shared password to the service. The current W3C WebAuthn Level 3 specification describes this public-key credential model and its relying-party scoping.
          </p>
          <p>
            That changes the problem fundamentally:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>traditional password: shared secret stored in service database</div>
            <div>passkey: public-key credential + local private key on authenticator</div>
          </div>
          <p>
            Passkeys are therefore not simply &quot;better passwords.&quot; They are a different authentication architecture.
          </p>
          <p>
            For binary representation and radix conversion, see the{" "}
            <Link href="/calculators/binary-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Advanced Binary Calculator &amp; Multi-Base Converter
            </Link>.
          </p>
          <p>
            For users, the long-term direction of account security increasingly combines password managers, MFA and phishing-resistant public-key authentication.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            19. How to Use This Password Generator
          </h3>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Random Password:</strong> Choose password length, lowercase, uppercase, numbers and symbols. Then optionally configure custom symbols, ambiguous-character exclusions, bracket exclusions, custom exclusions, no repeated characters and minimum category inclusion. Generate the credential and review the displayed entropy/search-space estimate. The production implementation has independently verified exact length, pool membership, exclusions, no-repeat behavior, mandatory category constraints and bulk generation.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Word Passphrase:</strong> Choose the number of words. Optionally enable capitalization, random number and random symbol. Then generate the passphrase.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Secure PIN:</strong> Choose the required digit length and generate a cryptographically random PIN.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Strength Checker:</strong> Enter a credential to inspect its estimated strength. The checker operates locally in the browser according to the production audit.
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            For an existing real password, avoid pasting it into any service unless you understand exactly where the value is processed and stored. This calculator&apos;s tested analyzer is designed to operate locally, but users should still follow their own security policies for sensitive credentials.
          </p>
        </section>

        {/* Security & Privacy Notes */}
        <section className="space-y-3 p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Security and Privacy Notes
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            This generator should be presented as a password-generation utility, not as a guarantee of account security.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            The calculator&apos;s production audit verifies that generation and analysis are client-side and that the tested network audit found no plaintext credential transmission, URL leakage, local-storage credential leakage, cookie leakage or analytics credential leakage.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            The same audit verifies that printing masks generated credentials and hides the interactive plaintext output from the print view.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Even so, the page avoids language such as &quot;unhackable password&quot;, &quot;impossible to crack&quot;, &quot;100% secure&quot; or &quot;guaranteed protection&quot;. No password generator can make that guarantee because security is an end-to-end property of the entire authentication system.
          </p>
        </section>

        {/* Technical Reference: Formulas Used by the Calculator */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Technical Reference: Formulas Used by the Calculator
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block font-sans">Independent Character Selection</span>
              <div>S = N^L</div>
              <div>H = L × log2(N)</div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block font-sans">No Repeated Characters</span>
              <div>S = N! / (N - L)!</div>
              <div>H = log2(S)</div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block font-sans">Decimal PIN</span>
              <div>S = 10^L</div>
              <div>H = L × log2(10)</div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block font-sans">Independent Word Passphrase</span>
              <div>S = N^L</div>
              <div>H = L × log2(N)</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans mt-1">
                Additional entropy is included only when appended symbols or numbers are genuinely randomized rather than deterministically added.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (Questions 20 to 34 - Fully Unfolded) */}
      <div className="pt-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {password_generatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            const qNum = idx + 20; // Numbering 20 to 34
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

      {/* 3. STANDARDS & AUTHORITATIVE REFERENCES */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Standards &amp; Authoritative References
          </h3>
        </div>
        <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              NIST SP 800-63B &mdash; Digital Identity Guidelines: Authentication and Lifecycle Management
            </span>
            <p className="mt-0.5">
              The current NIST Digital Identity Guidelines provide requirements and recommendations for memorized secrets, including minimum password length, compromised-password blocklists, composition-rule policy and password-change behavior.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              OWASP Authentication Cheat Sheet
            </span>
            <p className="mt-0.5">
              Provides practical application guidance for password strength, password managers, breach screening, password length, MFA and avoiding arbitrary composition and rotation policies.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              MDN Web Docs &mdash; Web Crypto API: crypto.getRandomValues()
            </span>
            <p className="mt-0.5">
              Documents <code>crypto.getRandomValues()</code> and its role in generating cryptographically strong random values in web applications.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              W3C WebAuthn &mdash; Web Authentication: An API for accessing Public Key Credentials
            </span>
            <p className="mt-0.5">
              Defines the public-key credential model used by WebAuthn and the relying-party scoping of credentials underlying modern passkey authentication.
            </p>
          </div>
        </div>
      </div>

    </article>
  );
}

export default PasswordContent;
