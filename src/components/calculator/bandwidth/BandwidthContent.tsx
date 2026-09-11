"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, BookOpen, ShieldAlert, Network, HelpCircle, ExternalLink } from "lucide-react";

export function BandwidthContent() {
  // All 20 FAQs unfolded by default for immediate accessibility and SEO indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 20 }, (_, i) => i))
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

  const faqs = [
    {
      q: "How do I calculate download time from Mbps?",
      a: "Convert the file size to bytes, multiply by 8 to obtain bits, then divide by the connection speed in bits per second: Time = File Size in Bytes × 8 / Bandwidth in bps. For a realistic estimate, additional loss or efficiency assumptions can be applied.",
    },
    {
      q: "How many MB/s is 100 Mbps?",
      a: "Using the standard 8-bit byte relationship: 100 Mbps ÷ 8 = 12.5 MB/s. This is a unit conversion. Actual application throughput may be lower.",
    },
    {
      q: "How long does a 10 GB file take to download at 100 Mbps?",
      a: "The ideal theoretical duration is 13 minutes 20 seconds. The calculator's reference realistic model with 10% overhead and 90% ISP efficiency produces approximately 16 minutes 28 seconds. The difference comes from the assumptions applied to the effective rate.",
    },
    {
      q: "Why is my real download speed lower than my ISP's advertised speed?",
      a: "Advertised bandwidth represents the provisioned or nominal access rate. Actual end-to-end throughput can be affected by protocol overhead, congestion, Wi-Fi conditions, latency, server limitations, packet loss and endpoint limitations. IETF throughput-testing guidance explicitly treats bandwidth and measured TCP throughput as related but distinct quantities.",
    },
    {
      q: "What is the difference between Mbps and MB/s?",
      a: "Mbps means megabits per second. MB/s means megabytes per second. Because 1 byte = 8 bits, you divide Mbps by 8 to obtain MB/s.",
    },
    {
      q: "What is the difference between GB and GiB?",
      a: "A gigabyte is a decimal unit: 1 GB = 10⁹ bytes. A gibibyte is a binary unit: 1 GiB = 2³⁰ bytes. NIST distinguishes SI decimal prefixes from the IEC binary prefixes specifically to avoid this ambiguity.",
    },
    {
      q: "How much bandwidth does a website need?",
      a: "It depends on traffic volume and average payload size. A first-order estimate is: Monthly Data = Page Views × Average Payload × (1 + Overhead). The calculator then converts that total to average and peak network requirements.",
    },
    {
      q: "How much bandwidth should I allow for peak website traffic?",
      a: "Use the average bandwidth as the baseline and apply an appropriate surge multiplier. For example: 8.75 Mbps × 2 = 17.5 Mbps. The correct multiplier depends on the site's actual traffic pattern rather than a universal standard.",
    },
    {
      q: "How much bandwidth does a 4K video stream use?",
      a: "There is no single universal number because it depends on the codec, resolution, frame rate, compression and service. The calculator uses a configurable activity profile rather than claiming one fixed bandwidth requirement applies to every 4K stream.",
    },
    {
      q: "How do I calculate bandwidth for multiple users?",
      a: "Estimate the simultaneous activities and their per-activity rates: Aggregate = Σ(Count × Rate). Then add headroom: Recommended = Aggregate × (1 + Headroom/100). This approach is used directly by the concurrency-planning module and is verified by the calculator's production tests.",
    },
    {
      q: "What is bandwidth headroom?",
      a: "Bandwidth headroom is additional capacity reserved above the calculated baseline. It helps accommodate demand spikes and normal variability without immediately saturating the link. The calculator allows the headroom percentage to be adjusted rather than assuming one fixed value.",
    },
    {
      q: "Does latency affect download speed?",
      a: "Latency does not simply change the nominal bandwidth of the physical link, but it can influence application throughput, particularly for protocols such as TCP where round-trip timing and available window sizes matter. IETF TCP-throughput guidance explicitly considers round-trip time, bottleneck bandwidth and socket buffers when evaluating achievable throughput.",
    },
    {
      q: "What is the bandwidth-delay product?",
      a: "The bandwidth-delay product is approximately: BDP = Bandwidth × RTT. It describes the quantity of data that corresponds to the bandwidth available during one round-trip interval. It is useful when reasoning about high-bandwidth, high-latency paths.",
    },
    {
      q: "How quickly will a 1.2 TB data cap be exhausted at 100 Mbps?",
      a: "Under the calculator's decimal-unit continuous-transfer model: 1.2 TB = 9.6 × 10¹² bits. At 100,000,000 bits/s, the theoretical continuous duration is 96,000 seconds = 1 day 2 hours 40 minutes. The actual time in a household or office will normally be much longer because usage is intermittent.",
    },
    {
      q: "Does 1 Gbps mean I can download at 1 GB/s?",
      a: "No. A 1 Gbps connection corresponds to: 1,000 Mbps ÷ 8 = 125 MB/s before considering real-world efficiency and overhead.",
    },
    {
      q: "Is bandwidth the same as throughput?",
      a: "No. Bandwidth refers to the capacity of a communication channel, while throughput refers to the actual rate of successfully delivered data. They can differ because of congestion, protocol behavior, packet loss, network conditions and endpoint limitations.",
    },
    {
      q: "What is the difference between upload and download bandwidth?",
      a: "Download bandwidth describes data moving toward the user or endpoint. Upload bandwidth describes data moving away from the endpoint. Some access networks are asymmetric, meaning the download capacity is substantially higher than the upload capacity. The practical impact becomes important for cloud backups, live broadcasting, remote file sharing and other upload-heavy applications.",
    },
    {
      q: "Does protocol overhead always equal 10%?",
      a: "No. Ten percent is an explicit assumption used by the calculator's reference scenario, not a universal networking constant. Actual overhead depends on the protocol stack, packetization, framing, retransmissions and other conditions. The calculator therefore exposes overhead as an input rather than pretending one value applies universally.",
    },
    {
      q: "Can a bandwidth calculator predict my exact real download time?",
      a: "No calculator can guarantee an exact future Internet transfer duration from link speed alone. It can produce a mathematical estimate using explicit assumptions. Actual performance can change because of congestion, network path characteristics, server capacity, Wi-Fi conditions, latency, packet loss and other variables. IETF guidance similarly distinguishes provisioned bandwidth from measured end-to-end TCP throughput.",
    },
    {
      q: "Why do websites need more bandwidth during traffic spikes?",
      a: "Monthly or daily averages hide short periods of high demand. If many users request pages or media simultaneously, the instantaneous traffic rate can be several times higher than the average. That is why the hosting module includes a configurable peak-surge multiplier rather than sizing only from average monthly traffic.",
    },
  ];

  return (
    <div className="space-y-8 mt-6">
      {/* ========================================================================= */}
      {/* 1. RELATED CALCULATORS — ABOVE ARTICLE (RESTRAINED & HORIZONTAL) */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 no-print">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          RELATED CALCULATORS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculators/ip-subnet-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>IP Subnet Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate IPv4/IPv6 CIDR prefixes, network masks, usable host capacities, and aggregate routing boundaries.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/conversion-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Conversion Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Convert units of data storage, electrical power, frequency, velocity, and metric scientific quantities.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL ARTICLE — CLEAN 401(K) STYLE (NO DARK CARDS) */}
      {/* ========================================================================= */}
      <article className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
        <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              1. What a Bandwidth Calculator Actually Measures
            </h2>
            <p>
              A bandwidth calculator helps translate network speed and data volume into practical quantities such as transfer time, effective throughput, monthly traffic, and required capacity for concurrent activities.
            </p>
            <p>
              The key relationship is straightforward: transferring more data takes more time, while transferring the same amount of data over a faster connection takes less time. Real-world transfers, however, are not determined solely by the advertised link rate. Protocol overhead, measured connection efficiency, latency, congestion, Wi-Fi conditions, server performance and other characteristics can affect the throughput an application actually achieves.
            </p>
            <p>
              That distinction matters because network equipment and internet providers commonly express connection capacity in bits per second, such as Mbps or Gbps, while files and storage are commonly expressed in bytes, such as MB, GB or TB.
            </p>
            <p>
              This calculator brings those related calculations together. It can estimate theoretical and adjusted transfer time, convert bandwidth units, estimate website hosting requirements, model simultaneous activities, and estimate how quickly a continuous transfer would consume a monthly data allowance.
            </p>
            <p>
              The underlying calculator has been independently tested across transfer-time calculations, unit conversions, hosting estimates, concurrency calculations, validation, exports and visualization states.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              2. Bits and Bytes: The Most Important Conversion
            </h2>
            <p>
              A bit is represented by a lowercase <strong>b</strong>. A byte is represented by an uppercase <strong>B</strong>.
            </p>
            <p>
              Eight bits make one byte:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              1 B = 8 b
            </div>
            <p>
              Therefore:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-slate-800 dark:text-slate-200">
              100 Mbps ÷ 8 = 12.5 MB/s
            </div>
            <p>
              This is why a connection advertised as 100 Mbps does not mean a download utility should display 100 MB/s.
            </p>
            <p>
              The calculator keeps the two quantities separate so that bandwidth conversion does not accidentally mix transmission rate and file-storage units. Its verified reference conversion is:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
              <li>100 Mbps</li>
              <li>= 100,000,000 bits/s</li>
              <li>= 12.50 MB/s</li>
              <li>= 0.1000 Gbps</li>
            </ul>
            <p>
              This conversion is also important when estimating download durations because file sizes are usually entered in bytes while network rates are normally specified in bits per second.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              3. Download Time Formula
            </h2>
            <p>
              For an idealized transfer, the theoretical duration is:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              T = (D × 8) / S
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              where: <strong>T</strong> = time in seconds, <strong>D</strong> = data size in bytes, <strong>S</strong> = transfer rate in bits per second.
            </p>
            <p>
              Suppose a file is 10 GB and the connection rate is 100 Mbps. Using decimal SI units:
            </p>
            <div className="font-mono text-xs space-y-1 pl-3 border-l-2 border-slate-300 dark:border-slate-700">
              <div>10 GB = 10,000,000,000 bytes</div>
              <div>10,000,000,000 × 8 = 80,000,000,000 bits</div>
              <div>At 100,000,000 bits/s:</div>
              <div>80,000,000,000 / 100,000,000 = 800 seconds</div>
              <div>or <strong>13 minutes 20 seconds</strong></div>
            </div>
            <p>
              That is the ideal mathematical transfer time before additional losses and inefficiencies are considered.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              4. Why Real Download Time Is Usually Longer
            </h2>
            <p>
              The theoretical result assumes that the full nominal link capacity is available to the transfer. In practice, usable application throughput can be lower.
            </p>
            <p>
              This calculator models two explicit factors: <strong>Protocol/overhead loss</strong> and <strong>measured ISP efficiency</strong>.
            </p>
            <p>
              Its realistic effective-rate calculation is:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              Effective Rate = Nominal Rate × (1 − Overhead) × Efficiency
            </div>
            <p>
              For 100 Mbps with 10% overhead and 90% ISP efficiency:
            </p>
            <div className="font-mono text-xs space-y-1 pl-3 border-l-2 border-slate-300 dark:border-slate-700">
              <div>100 × 0.90 × 0.90 = 81 Mbps (10.125 MB/s)</div>
              <div>The resulting 10 GB transfer is approximately:</div>
              <div>80,000,000,000 / 81,000,000 ≈ 987.654 seconds</div>
              <div>which is approximately <strong>16 minutes 28 seconds</strong></div>
            </div>
            <p>
              The calculator&apos;s production test suite independently verifies this result rather than simply relying on the example in the reference PDF. This model is an estimate, not a promise of actual Internet performance. Real-world performance can vary over time and by network path.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              5. What Is Network Bandwidth?
            </h2>
            <p>
              Bandwidth describes the capacity of a communication channel. Common units include bps, Kbps, Mbps, and Gbps.
            </p>
            <p>
              A 1 Gbps link has a nominal rate of 1,000 Mbps under decimal SI units. Bandwidth is therefore a rate of possible data transmission, not a measure of how much data has already been transferred.
            </p>
            <p>
              For example, <strong>100 Mbps</strong> describes rate, whereas <strong>10 GB</strong> describes quantity of data. The calculator connects those two dimensions to answer practical questions such as how long a 10 GB file will take to transfer over a 100 Mbps connection.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              6. Bandwidth, Throughput and Latency Are Different
            </h2>
            <p>
              These three networking concepts are related but should not be treated as synonyms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Bandwidth:</strong> The available or theoretical capacity of the link.</li>
              <li><strong>Throughput:</strong> The actual rate of useful data delivered over the connection.</li>
              <li><strong>Latency:</strong> The time delay associated with communication across the path.</li>
            </ul>
            <p>
              A connection can have substantial bandwidth but still provide poor application performance when latency, packet loss, congestion or other constraints become significant.
            </p>
            <p>
              The supplied reference material deliberately separates these concepts, and the calculator&apos;s educational content preserves that distinction. For practical TCP performance, IETF guidance also emphasizes that throughput testing depends on factors such as bottleneck bandwidth, round-trip time, socket-buffer sizes, path MTU and packet loss—not just the access-link headline rate.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              7. Mbps to MB/s Conversion
            </h2>
            <p>
              The basic conversion is:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              MB/s = Mbps ÷ 8
            </div>
            <p>
              Standard conversion milestones include:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <th className="p-2 border border-slate-200 dark:border-slate-700">Internet Bitrate (Mbps)</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">File Download Speed (MB/s)</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700">Theoretical 1 GB Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800">10 Mbps</td><td className="p-2 border border-slate-200 dark:border-slate-800">1.25 MB/s</td><td className="p-2 border border-slate-200 dark:border-slate-800">13m 20s</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800">25 Mbps</td><td className="p-2 border border-slate-200 dark:border-slate-800">3.125 MB/s</td><td className="p-2 border border-slate-200 dark:border-slate-800">5m 20s</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800">50 Mbps</td><td className="p-2 border border-slate-200 dark:border-slate-800">6.25 MB/s</td><td className="p-2 border border-slate-200 dark:border-slate-800">2m 40s</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800">100 Mbps</td><td className="p-2 border border-slate-200 dark:border-slate-800">12.50 MB/s</td><td className="p-2 border border-slate-200 dark:border-slate-800">1m 20s</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800">500 Mbps</td><td className="p-2 border border-slate-200 dark:border-slate-800">62.50 MB/s</td><td className="p-2 border border-slate-200 dark:border-slate-800">16 seconds</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800">1 Gbps (1,000 Mbps)</td><td className="p-2 border border-slate-200 dark:border-slate-800">125.00 MB/s</td><td className="p-2 border border-slate-200 dark:border-slate-800">8 seconds</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              These figures represent unit conversion, not a guarantee of application throughput. If protocol overhead, congestion or other performance losses are considered, the effective transfer rate can be lower. For broader unit conversion outside networking rates, see the <Link href="/calculators/conversion-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Conversion Calculator</Link>.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              8. SI Decimal Units Versus IEC Binary Units
            </h2>
            <p>
              Data units are a frequent source of confusion because decimal SI prefixes and binary IEC prefixes are different.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">SI Metric (Base-1000):</span>
                <div className="font-mono space-y-0.5 text-slate-600 dark:text-slate-400">
                  <div>1 kB = 1,000 bytes</div>
                  <div>1 MB = 1,000,000 bytes (10⁶)</div>
                  <div>1 GB = 1,000,000,000 bytes (10⁹)</div>
                  <div>1 TB = 1,000,000,000,000 bytes (10¹²)</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">IEC Binary (Base-1024):</span>
                <div className="font-mono space-y-0.5 text-slate-600 dark:text-slate-400">
                  <div>1 KiB = 1,024 bytes</div>
                  <div>1 MiB = 1,048,576 bytes (2²⁰)</div>
                  <div>1 GiB = 1,073,741,824 bytes (2³⁰)</div>
                  <div>1 TiB = 1,099,511,627,776 bytes (2⁴⁰)</div>
                </div>
              </div>
            </div>
            <p>
              NIST explicitly distinguishes SI decimal prefixes from the IEC binary prefixes such as Ki, Mi, Gi and Ti. This distinction is important when estimating download times and data-cap consumption. For example, a quoted 1 TB allowance and a software display using 1 TiB do not represent exactly the same number of bytes. The calculator explicitly retains the distinction between decimal and binary data conventions.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              9. Worked Example: 10 GB Over 100 Mbps
            </h2>
            <p>
              Consider: File = 10 GB, Bandwidth = 100 Mbps, Protocol overhead = 10%, ISP efficiency = 90%.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 text-xs font-mono">
                <tbody>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-bold">Theoretical rate</td><td className="p-2 border border-slate-200 dark:border-slate-800">100 Mbps</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-bold">Effective rate</td><td className="p-2 border border-slate-200 dark:border-slate-800">100 × 0.90 × 0.90 = 81 Mbps</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-bold">Effective byte rate</td><td className="p-2 border border-slate-200 dark:border-slate-800">81 ÷ 8 = 10.125 MB/s</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-bold">Theoretical duration</td><td className="p-2 border border-slate-200 dark:border-slate-800">800 seconds = 13m 20s</td></tr>
                  <tr><td className="p-2 border border-slate-200 dark:border-slate-800 font-sans font-bold">Adjusted duration</td><td className="p-2 border border-slate-200 dark:border-slate-800">≈ 987.654 seconds = 16m 28s</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              The calculator reports these values with the full internal precision retained until final presentation.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              10. Website Bandwidth Calculator for Hosting
            </h2>
            <p>
              Website capacity planning is a different bandwidth problem from downloading one file. A useful first-order estimate begins with:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              Monthly Data = Page Views × Average Payload × (1 + Overhead)
            </div>
            <p>
              For example: 1,000,000 page views, 2.5 MB average payload, 15% crawler/bot overhead gives:
            </p>
            <div className="font-mono text-xs pl-3 border-l-2 border-slate-300 dark:border-slate-700">
              1,000,000 × 2.5 MB × 1.15 = 2.875 TB/month
            </div>
            <p>
              The calculator then converts that monthly transfer volume into an average network rate and applies a peak-surge multiplier when estimating the server-port requirement. Its verified reference case produces:
            </p>
            <ul className="list-disc pl-5 text-xs font-mono space-y-1">
              <li>2.875 TB/month</li>
              <li>≈ 8.75 Mbps average</li>
              <li>≈ 17.50 Mbps peak at 2× surge</li>
              <li>Recommended Tier: 100 Mbps Shared or Dedicated Port</li>
            </ul>
            <p>
              This is a capacity estimate. Actual infrastructure planning may also need to account for caching, CDNs, asset types, compression, API traffic, uploads, database traffic and traffic patterns by hour.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              11. Peak Traffic Matters More Than the Monthly Average Alone
            </h2>
            <p>
              Averages can hide important short-term spikes. Suppose a site requires 8.75 Mbps on average but experiences a 2× surge:
            </p>
            <div className="font-mono text-xs pl-3 border-l-2 border-slate-300 dark:border-slate-700">
              8.75 × 2 = 17.5 Mbps
            </div>
            <p>
              The same principle applies to websites, software distribution, cloud backups and large-scale content delivery. A network sized only around average traffic can become congested when a short burst of simultaneous traffic arrives.
            </p>
            <p>
              The calculator therefore exposes the surge multiplier rather than assuming that the monthly average is sufficient. Its production tests verify linear behavior across the supported surge range.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              12. How Much Bandwidth Does a Household or Office Need?
            </h2>
            <p>
              The correct answer depends on what users are doing simultaneously rather than simply how many people are present.
            </p>
            <p>
              For example, a network supporting multiple high-resolution video streams, video conferencing, cloud synchronization, online gaming, remote desktops, and IoT devices may require substantially more capacity than a network used mostly for browsing and email.
            </p>
            <p>
              The calculator&apos;s concurrency planner models this explicitly using:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              Aggregate Demand = Σ(Count × Per-Activity Rate)
            </div>
            <p>
              and then applies a configurable headroom percentage. This is more useful than simply adding arbitrary &quot;users&quot; together because different activities consume different amounts of bandwidth. For network addressing and subnet capacity, the <Link href="/calculators/ip-subnet-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">IP Subnet Calculator</Link> can be used alongside bandwidth planning.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              13. Concurrent Activity Example
            </h2>
            <p>
              The calculator&apos;s verified reference scenario contains:
            </p>
            <ul className="list-disc pl-5 text-xs font-mono space-y-1">
              <li>3 × 4K streams (25 Mbps each)</li>
              <li>8 × video calls (3.5 Mbps each)</li>
              <li>2 × cloud backups (15 Mbps each)</li>
              <li>5 × gaming sessions (4 Mbps each)</li>
            </ul>
            <p>
              The activity subtotals are:
            </p>
            <div className="font-mono text-xs space-y-1 pl-3 border-l-2 border-slate-300 dark:border-slate-700">
              <div>3 × 25 = 75 Mbps</div>
              <div>8 × 3.5 = 28 Mbps</div>
              <div>2 × 15 = 30 Mbps</div>
              <div>5 × 4 = 20 Mbps</div>
              <div>Raw aggregate: 75 + 28 + 30 + 20 = 153 Mbps</div>
              <div>With 25% headroom: 153 × 1.25 = <strong>191.25 Mbps</strong></div>
            </div>
            <p>
              The calculator maps that value to its configured <strong>300 Mbps High Speed Plan</strong> recommendation. This example demonstrates why activity counts and per-stream rates must be kept separate.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              14. What Is Headroom in Bandwidth Planning?
            </h2>
            <p>
              Headroom is spare capacity above the calculated baseline requirement. Without headroom, a network can operate close to saturation whenever actual demand rises slightly above the estimate.
            </p>
            <p>
              For a baseline requirement B and headroom percentage H:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              Recommended Capacity = B × (1 + H/100)
            </div>
            <p>
              Headroom is not a universal engineering constant. The appropriate margin depends on the application, traffic variability, service requirements and acceptable congestion. The calculator therefore lets the planner change the headroom rather than pretending there is one correct percentage for every network.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              15. What Is the Bandwidth-Delay Product?
            </h2>
            <p>
              The Bandwidth-Delay Product (BDP) describes how much data can be &quot;in flight&quot; on a network path at a given time:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              BDP = Bandwidth × Round-Trip Time
            </div>
            <p>
              For example: 100 Mbps × 0.100 s = 10,000,000 bits = 1.25 MB. BDP is particularly relevant when understanding high-bandwidth, high-latency paths. IETF TCP-throughput guidance explicitly discusses round-trip time and socket-buffer sizing in relation to achievable TCP throughput.
            </p>
            <p>
              BDP should therefore not be confused with the simple file-transfer equation. It describes an amount of data associated with the path&apos;s bandwidth-delay characteristics.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              16. Why a Fast Internet Connection May Still Feel Slow
            </h2>
            <p>
              A high advertised bandwidth does not guarantee that every application will achieve that rate. Possible constraints include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Wi-Fi conditions:</strong> Wireless interference, signal quality and channel utilization can limit throughput.</li>
              <li><strong>Server-side limitations:</strong> A remote server may be unable to deliver data at the full rate available to the client.</li>
              <li><strong>Congestion:</strong> Traffic elsewhere on the path can reduce actual throughput.</li>
              <li><strong>Protocol overhead:</strong> Headers, acknowledgements and framing consume part of the available capacity.</li>
              <li><strong>Latency:</strong> Long round-trip times can influence the throughput achieved by individual TCP connections.</li>
              <li><strong>Device limitations:</strong> CPU, storage performance, network adapters and other hardware can become bottlenecks.</li>
            </ul>
            <p>
              The IETF&apos;s TCP throughput methodology specifically notes that practical throughput depends on multiple path and endpoint variables and cannot be inferred from access bandwidth alone.
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              17. How Long Does 1 GB Take at 100 Mbps?
            </h2>
            <p>
              Using decimal units:
            </p>
            <div className="font-mono text-xs space-y-1 pl-3 border-l-2 border-slate-300 dark:border-slate-700">
              <div>1 GB = 1,000,000,000 bytes</div>
              <div>1 GB × 8 = 8,000,000,000 bits</div>
              <div>At 100 Mbps = 100,000,000 bits/s:</div>
              <div>8,000,000,000 / 100,000,000 = 80 seconds</div>
              <div>Ideal answer: <strong>1 GB ≈ 1 minute 20 seconds</strong></div>
            </div>
            <p>
              This illustrates why a 100 Mbps connection does not download a 100 MB file in one second: the rate is expressed in bits, not bytes.
            </p>
          </section>

          {/* Section 18 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              18. Monthly Data-Cap Planning
            </h2>
            <p>
              The calculator can estimate how quickly a continuous transfer consumes a monthly data allowance.
            </p>
            <p>
              For a 1.2 TB decimal data cap and 100 Mbps continuous transfer:
            </p>
            <div className="font-mono text-xs space-y-1 pl-3 border-l-2 border-slate-300 dark:border-slate-700">
              <div>1.2 TB = 1.2 × 10¹² bytes = 9.6 × 10¹² bits</div>
              <div>9.6 × 10¹² / 100,000,000 = 96,000 seconds</div>
              <div>= <strong>1 day 2 hours 40 minutes</strong></div>
            </div>
            <p>
              The calculator&apos;s reference case verifies this result and estimates a continuous-download daily budget from an average 30.4375-day month (39.4 GB/day). This is a deliberately simplified continuous-transfer model; real household traffic is intermittent rather than a constant transfer at maximum rate.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              19. Bandwidth Versus Storage Capacity
            </h2>
            <p>
              Bandwidth and storage answer different questions. Storage asks: <em>How much information can be stored?</em> Bandwidth asks: <em>How quickly can information be transmitted?</em>
            </p>
            <p>
              For example, 2 TB storage does not imply 2 TB/s network speed. Likewise, a 1 Gbps network does not describe how much storage exists on the endpoint. Keeping the units and quantities separate avoids one of the most common mistakes in transfer-time calculations.
            </p>
          </section>

          {/* Section 20 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              20. Practical Uses of a Bandwidth Calculator
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Large File Transfers</span>
                <p className="text-slate-600 dark:text-slate-400">Estimate how long backups, disk images, datasets or software packages take to transfer.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Website Infrastructure</span>
                <p className="text-slate-600 dark:text-slate-400">Estimate average and peak network port requirements from traffic volume and page payload.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Remote Work</span>
                <p className="text-slate-600 dark:text-slate-400">Estimate whether concurrent video meetings, cloud applications and remote desktops fit within capacity.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Data-Cap Planning</span>
                <p className="text-slate-600 dark:text-slate-400">Estimate how quickly continuous usage consumes a provider&apos;s monthly allowance.</p>
              </div>
            </div>
          </section>

          {/* Section 21 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              21. Common Bandwidth Calculation Mistakes
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <strong>Mistake 1: Confusing Mbps and MB/s</strong> — Remember 1 byte = 8 bits, so 100 Mbps = 12.5 MB/s under decimal units.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <strong>Mistake 2: Ignoring protocol overhead</strong> — The nominal link rate is not the same as the effective application rate.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <strong>Mistake 3: Using only average web traffic</strong> — A monthly average hides critical short-lived peak bursts.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <strong>Mistake 4: Treating every user as identical</strong> — A 4K video viewer requires significantly more capacity than someone reading text.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <strong>Mistake 5: Mixing GB and GiB</strong> — Decimal and binary units are distinct; NIST explicitly recommends distinct binary prefixes.
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700">
                <strong>Mistake 6: Assuming advertised bandwidth equals application throughput</strong> — Real performance depends on end-to-end network variables.
              </div>
            </div>
          </section>

          {/* Section 22 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              22. How to Use This Bandwidth Calculator
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 block">Download or Upload Time</span>
                <p className="text-slate-600 dark:text-slate-400">Enter file size, connection speed, protocol overhead, and ISP efficiency to review theoretical vs. realistic duration and effective rate.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 block">Bandwidth Conversion</span>
                <p className="text-slate-600 dark:text-slate-400">Enter any bitrate or transfer rate (such as 100 Mbps) to inspect instant conversions across SI decimal and IEC binary units.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 block">Website Hosting</span>
                <p className="text-slate-600 dark:text-slate-400">Enter monthly page views, payload size, crawler overhead, and surge multiplier to size server port tiers.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 block">Concurrency Planning</span>
                <p className="text-slate-600 dark:text-slate-400">Adjust concurrent streams, calls, backups, and gaming sessions with safety headroom to select the ideal broadband tier.</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The calculator recalculates these states reactively and the production test suite verifies that all four major modules remain isolated from one another.
            </p>
          </section>

          {/* Section 23 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              23. Why This Calculator Uses Explicit Assumptions
            </h2>
            <p>
              A useful bandwidth estimate must state its assumptions. For example, a result based on 100 Mbps nominal speed, 10% protocol loss, and 90% measured ISP efficiency is different from a result based solely on nominal speed.
            </p>
            <p>
              Likewise, a website estimate depends on its payload assumptions and a concurrency estimate depends on the per-activity bandwidth model. The calculator therefore exposes these assumptions instead of presenting a single number without context.
            </p>
            <p>
              This is especially important because network-performance testing is inherently dependent on the network path and testing conditions. The IETF&apos;s TCP-throughput framework distinguishes provisioned bandwidth from measured end-to-end throughput and identifies several factors that affect the latter.
            </p>
          </section>
        </div>
      </article>

      {/* ========================================================================= */}
      {/* 3. FREQUENTLY ASKED QUESTIONS — FULLY UNFOLDED BY DEFAULT */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Frequently Asked Questions</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Authoritative answers to common network bandwidth, throughput, and data capacity inquiries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (openFaqIndices.size === faqs.length) {
                setOpenFaqIndices(new Set());
              } else {
                setOpenFaqIndices(new Set(Array.from({ length: faqs.length }, (_, i) => i)));
              }
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer no-print"
          >
            {openFaqIndices.size === faqs.length ? "Collapse All" : "Unfold All"}
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TECHNICAL NOTES AND LIMITATIONS */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-500" /> Technical Notes and Limitations
        </h3>
        <p>
          This calculator provides mathematical estimates for bandwidth, transfer duration and network-capacity planning. Results should not be interpreted as guarantees of actual ISP or application performance.
        </p>
        <p>
          Particularly important assumptions include bits versus bytes, decimal versus binary data units, protocol overhead, connection efficiency, peak traffic multipliers, per-activity bandwidth assumptions, and headroom.
        </p>
        <p>
          For managed network environments, practical throughput testing should consider factors such as bottleneck bandwidth, RTT, packet loss, path MTU and TCP behavior rather than relying solely on a nominal access speed.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 5. REFERENCES */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-blue-500" /> References
        </h3>
        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
          <li className="flex items-start gap-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-200">NIST:</span>
            <span>Guide to the SI and SI Prefixes — Defines decimal SI prefixes and distinguishes them from binary prefixes.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-200">NIST:</span>
            <span>Binary Prefixes — Documents Ki, Mi, Gi and related binary prefixes and their exact powers of two.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-200">IETF RFC 6349:</span>
            <span>Framework for TCP Throughput Testing — Provides methodology and context for practical TCP throughput testing, including bandwidth, RTT, path characteristics and endpoint factors.</span>
          </li>
        </ul>
      </section>

      {/* ========================================================================= */}
      {/* 6. RELATED CALCULATORS — BELOW ARTICLE & FAQ (PRECISELY 1 BOTTOM BLOCK) */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 no-print">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          RELATED CALCULATORS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculators/ip-subnet-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>IP Subnet Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate IPv4/IPv6 CIDR prefixes, network masks, usable host capacities, and aggregate routing boundaries.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/conversion-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Conversion Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Convert units of data storage, electrical power, frequency, velocity, and metric scientific quantities.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BandwidthContent;
