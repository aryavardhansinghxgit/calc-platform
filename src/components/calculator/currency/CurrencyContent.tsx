"use client";

import React from "react";

export function CurrencyContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS A CURRENCY CONVERTER */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is a Currency Converter? (Foreign Exchange &amp; ISO 4217 Standards)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A <strong>Currency Converter</strong> is a computational financial tool that evaluates the relative purchasing power and exchange ratio between two or more sovereign fiat currencies based on global foreign exchange (Forex / FX) interbank market quotations.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Global financial systems identify national currencies using standardized 3-letter <strong>ISO 4217</strong> codes established by the International Organization for Standardization. The first two letters designate the country code (e.g., <em>US</em> for United States, <em>JP</em> for Japan, <em>GB</em> for Great Britain), while the third letter indicates the currency unit (<em>D</em>ollar, <em>Y</em>en, <em>P</em>ound).
        </p>
      </section>

      {/* 2. HOW FX RATES WORK */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. How Foreign Exchange Rates Work (Floating vs. Pegged Systems)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Floating Exchange Rates
            </h3>
            <p className="text-black dark:text-slate-100">
              The vast majority of major global currencies (including USD, EUR, GBP, JPY, CAD, and AUD) operate on a free-floating exchange regime. Their relative valuation fluctuates 24 hours a day, 5 days a week based purely on continuous market supply and demand, international trade flows, interest rate differentials, and global macroeconomic indicators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Fixed &amp; Pegged Exchange Rates
            </h3>
            <p className="text-black dark:text-slate-100">
              Some central monetary authorities peg their domestic currency at an artificial fixed ratio against a dominant anchor currency (most commonly the US Dollar). Examples include the United Arab Emirates Dirham (AED pegged at ~3.6725 USD) and the Saudi Riyal (SAR pegged at 3.75 USD). Central banks defend these pegs by buying and selling foreign exchange reserves.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MID-MARKET RATE VS SPREAD */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Understanding the Mid-Market Rate vs. Retail Bank Markups
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs font-medium">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            The Hidden Cost of Currency Conversion
          </h3>
          <p className="text-black dark:text-slate-100">
            The <strong>Mid-Market Rate</strong> (also called the <em>interbank rate</em> or <em>spot rate</em>) represents the exact midpoint between global buy (bid) and sell (ask) orders traded between multinational financial institutions. It is the only true, unbiased exchange rate.
          </p>
          <p className="text-black dark:text-slate-100">
            When consumers exchange money through retail commercial banks, wire transfer services, or airport booths, providers rarely charge just a transparent flat transaction fee. Instead, they embed a <strong>hidden markup spread</strong>—typically inflating the exchange rate by <strong>2.5% to 4.0% at banks</strong> and up to <strong>8.0% to 15.0% at airport kiosks</strong>—pocketing the difference as silent profit.
          </p>
        </div>
      </section>

      {/* 4. MACROECONOMIC DRIVERS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Five Macroeconomic Drivers of Currency Valuation
        </h2>
        <div className="space-y-2.5 text-xs font-medium">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">1. Central Bank Interest Rate Differentials</h3>
            <p className="text-black dark:text-slate-100">Higher benchmark interest rates offer international investors superior returns on sovereign debt and fixed-income assets, drawing global capital inflows and appreciating the domestic currency.</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">2. Relative Inflation Rates</h3>
            <p className="text-black dark:text-slate-100">Under Purchasing Power Parity (PPP) economic theory, economies experiencing persistently higher inflation see their currency depreciate over time against low-inflation trading partners.</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">3. Current Account &amp; Terms of Trade</h3>
            <p className="text-black dark:text-slate-100">A nation with a strong trade surplus (exports exceeding imports) experiences consistent foreign buying pressure on its domestic currency to settle purchase contracts.</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">4. Sovereign Debt-to-GDP Ratios</h3>
            <p className="text-black dark:text-slate-100">Excessive public debt levels increase investor perception of sovereign credit risk and inflation monetization, driving foreign capital flight.</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">5. Geopolitical Stability &amp; Safe-Haven Status</h3>
            <p className="text-black dark:text-slate-100">During periods of international military conflict or global market turmoil, capital flows into recognized safe-haven currencies (US Dollar, Swiss Franc, Japanese Yen, Gold).</p>
          </div>
        </div>
      </section>

      {/* 5. BEST PRACTICES FOR OVERSEAS CONVERSION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Best Practices for Exchanging Money While Traveling Abroad
        </h2>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-black dark:text-slate-100">
          <li><strong>Always Pay in Local Currency (Decline DCC):</strong> When paying with a credit card abroad or withdrawing cash at an ATM, always select to be charged in the <em>local currency</em> rather than your home currency. This forces your card network (Visa/Mastercard) to perform the conversion at wholesale interbank rates (~0.3% spread) rather than accepting the merchant's exploitative 5%–10% Dynamic Currency Conversion markup.</li>
          <li><strong>Use No-Foreign-Transaction-Fee Credit Cards:</strong> Utilize travel cards that waive the standard 3% foreign transaction fee on international purchases.</li>
          <li><strong>Avoid Airport and Hotel Exchange Desks:</strong> Physical retail booths at transit hubs carry the highest fixed overhead and charge the widest bid-ask spread markups in the industry.</li>
          <li><strong>Withdraw Local Cash via Bank ATMs:</strong> Withdraw local currency using official in-branch bank ATMs rather than standalone third-party tourist ATMs (such as Euronet).</li>
        </ul>
      </section>

      {/* 6. FAQS (12 FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. What is the mid-market exchange rate?
            </h3>
            <p className="text-black dark:text-slate-100">
              The mid-market rate is the real-time midpoint between global wholesale buy (bid) and sell (ask) prices traded by institutional banks in the interbank Forex market. It represents the fair, un-manipulated exchange rate before commercial retail markups are added.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Why do currency exchange rates fluctuate continuously?
            </h3>
            <p className="text-black dark:text-slate-100">
              Exchange rates fluctuate 24 hours a day due to constant changes in international commercial trade, cross-border corporate investments, central bank interest rate announcements, inflation reports, geopolitical events, and speculative Forex trading volume.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. What is the cheapest way to convert money when traveling abroad?
            </h3>
            <p className="text-black dark:text-slate-100">
              The most cost-effective method is using a credit card with 0% foreign transaction fees for all card purchases and withdrawing physical local cash from reputable in-branch bank ATMs while always declining Dynamic Currency Conversion.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. What is Dynamic Currency Conversion (DCC) and why should I decline it?
            </h3>
            <p className="text-black dark:text-slate-100">
              DCC occurs when an overseas card terminal or ATM asks if you want to be billed in your home currency. Choosing your home currency allows the merchant's payment processor to apply an inflated exchange rate with a 5%–10% markup. Always choose to be charged in the local destination currency.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. How do commercial banks and credit cards make money on currency exchange?
            </h3>
            <p className="text-black dark:text-slate-100">
              Banks generate profit through two channels: explicit fees (wire transfer fees, foreign transaction fees) and hidden spread markups (selling foreign currency at a worse exchange rate than the wholesale mid-market rate).
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. What is the difference between a fixed (pegged) and floating exchange rate?
            </h3>
            <p className="text-black dark:text-slate-100">
              A floating exchange rate moves freely based on market supply and demand dynamics (e.g. EUR/USD), while a fixed/pegged currency is kept constant by a central bank against another currency (e.g. AED pegged to USD).
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. What are ISO 4217 standard currency codes?
            </h3>
            <p className="text-black dark:text-slate-100">
              ISO 4217 is the international three-letter standard established to eliminate ambiguity in cross-border commerce (e.g. USD for US Dollar, EUR for Euro, GBP for British Pound, JPY for Japanese Yen).
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How do central bank interest rates influence foreign currency value?
            </h3>
            <p className="text-black dark:text-slate-100">
              When a central bank raises benchmark interest rates, it attracts global capital seeking higher asset yields. This increases demand for the domestic currency, causing its exchange rate to strengthen.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. Are cryptocurrency pairs like Bitcoin included in foreign exchange calculations?
            </h3>
            <p className="text-black dark:text-slate-100">
              While cryptocurrencies are digital decentralized bearer assets rather than sovereign fiat, major pairs (BTC/USD, ETH/USD) are commonly referenced alongside traditional currency conversion matrices.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. What is the difference between the bid price and ask price in forex?
            </h3>
            <p className="text-black dark:text-slate-100">
              The bid price is the highest price a buyer is willing to pay for a currency, while the ask price (or offer) is the lowest price a seller is willing to accept. The difference between the two is the bid-ask spread.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. Why are airport currency exchange kiosks so expensive?
            </h3>
            <p className="text-black dark:text-slate-100">
              Airport kiosks pay steep concession rents and cater to travelers in immediate need of cash. To maximize revenue, they impose wide 10%–15% spread markups above the interbank rate.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How can I protect against exchange rate volatility when making international wire transfers?
            </h3>
            <p className="text-black dark:text-slate-100">
              Individuals and businesses can use forward exchange contracts, limit orders, or specialized fintech remittance providers (like Wise or OFX) that offer rate-lock guarantees for 24 to 48 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CurrencyContent;
