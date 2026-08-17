"use client";

import React from "react";

export function BandwidthContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Introduction
        </h2>
        <p>
          The <strong>Next-Gen Bandwidth Calculator</strong> is a comprehensive mathematical tool engineered for network architects, system administrators, software engineers, digital content creators, and everyday internet users. In modern telecommunications and cloud computing, understanding data transfer dynamics is critical for infrastructure sizing, cost management, and user experience optimization.
        </p>
        <p>
          Whether you are estimating the download duration of a multi-gigabyte operating system image, sizing the web hosting port capacity for a high-traffic e-commerce portal, or planning the aggregate bandwidth requirements for a remote team executing concurrent 4K video calls and cloud backups, this tool delivers exact mathematical modeling. By accounting for theoretical link capacities alongside real-world protocol overheads (such as TCP/IP packet headers, Wi-Fi retransmissions, and ISP line degradation), this calculator bridges the gap between marketing speed claims and empirical network throughput.
        </p>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Mathematical Concept
        </h2>
        <p>
          At the core of data transfer calculations lie fundamental mathematical relationships between data volume, transmission rates, time, and structural network overhead.
        </p>
        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
          Bits (b) vs. Bytes (B)
        </h3>
        <p>
          The most prevalent source of confusion in network analysis is the distinction between a <em>bit</em> (lowercase <code>b</code>) and a <em>Byte</em> (uppercase <code>B</code>). A bit represents the fundamental binary unit of computing (0 or 1). A Byte consists of 8 bits:
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-xl font-sans tabular-nums text-xs border border-zinc-200 dark:border-zinc-700 text-center">
          1 Byte (B) = 8 bits (b)
        </div>
        <p>
          Telecommunications providers and Network Interface Cards (NICs) measure transmission speeds in <strong>bits per second (bps, Mbps, Gbps)</strong>, whereas operating systems, file managers, and cloud storage providers measure stored file sizes in <strong>Bytes (KB, MB, GB, TB)</strong>. Consequently, an advertised speed of 100 Mbps yields a theoretical maximum file transfer throughput of:
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl font-sans tabular-nums text-xs border border-zinc-200 dark:border-zinc-700 text-center">
          100 Mbps / 8 = 12.5 MB/s
        </div>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mt-4">
          SI Metric (Base-1000) vs. IEC Binary (Base-1024) Standards
        </h3>
        <p>
          Network measurement uses two competing numerical base systems:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>SI Metric System (Decimal Base 10³ = 1,000):</strong> Used by telecommunications standards, ISPs, and network protocols. Here, 1 Megabit (Mb) = 1,000 Kilobits (Kb) = 1,000,000 bits.
          </li>
          <li>
            <strong>IEC Binary System (Binary Base 2¹⁰ = 1,024):</strong> Historically used by operating systems (such as Windows) for memory and disk storage, formally denoted as Kibibytes (KiB), Mebibytes (MiB), and Gibibytes (GiB).
          </li>
        </ul>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mt-4">
          Bandwidth, Throughput, and Latency
        </h3>
        <p>
          It is essential to differentiate three distinct performance metrics:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Bandwidth:</strong> The maximum theoretical capacity of a communication channel (e.g., a 1 Gbps fiber link).</li>
          <li><strong>Throughput:</strong> The actual rate of successful data delivery over the channel after accounting for header overhead, packet loss, and signal attenuation.</li>
          <li><strong>Latency:</strong> The time delay required for a data packet to travel from sender to receiver, typically measured in milliseconds (ms). High latency limits single-stream TCP throughput via the Bandwidth-Delay Product (BDP).</li>
        </ul>
      </section>

      {/* SECTION 3: FORMULA SECTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Formula Section
        </h2>
        <p>
          The primary equations governing bandwidth calculations are defined below:
        </p>

        <div className="space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Formula 1: Theoretical Data Transfer Duration</h4>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400">
              {"T_theoretical = (D_Bytes * 8) / S_bps"}
            </div>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Where T is duration in seconds, D_Bytes is total file size in Bytes, and S_bps is connection speed in bits per second.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Formula 2: Realistic Effective Duration with Network Overhead</h4>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400">
              {"T_realistic = (D_Bytes * 8) / [S_bps * (1 - Loss_overhead/100) * (Efficiency_isp/100)]"}
            </div>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Where Loss_overhead is protocol header/interference loss percentage (0% to 50%) and Efficiency_isp is the measured ISP line efficiency percentage (50% to 100%).
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Formula 3: Web Hosting Required Transfer and Port Bandwidth</h4>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400">
              {"D_monthly_GB = [V_monthly * P_Bytes * (1 + Bot_overhead/100)] / 10^9"}
            </div>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 mt-1">
              {"S_peak_Mbps = [(D_monthly_Bytes * 8) / 2,629,800] * (Surge_factor / 10^6)"}
            </div>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Where V_monthly is monthly page views, P_Bytes is average page size, Bot_overhead is crawler overhead %, Surge_factor is peak surge multiplier, and 2,629,800 is the average number of seconds in a month (30.4375 days).
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Formula 4: Multi-Device Aggregate Concurrency Demand</h4>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400">
              {"S_aggregate_Mbps = [Sum(Count_i * Speed_i)] * (1 + Headroom/100)"}
            </div>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Where Count_i is active device count for activity profile i, Speed_i is bitrate per stream, and Headroom is safety growth cushion %.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW THE CALCULATION WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. How the Calculation Works
        </h2>
        <p>
          To ensure strict precision across non-standard units, our calculation engine follows a four-step processing pipeline:
        </p>

        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Step 1: Universal Bit Normalization:</strong> Input file sizes are converted to total bits. For example, a 5 GB file is converted via 5 × 1,000 × 1,000 × 1,000 × 8 = 40,000,000,000 bits.
          </li>
          <li>
            <strong>Step 2: Speed Normalization to Bits per Second:</strong> Connection speeds are normalized to bps. A 100 Mbps link becomes 100,000,000 bps.
          </li>
          <li>
            <strong>Step 3: Loss Multiplier Application:</strong> Overhead losses and line degradations are factored in. With 10% protocol overhead and 90% ISP efficiency, the net effective rate is 100,000,000 × 0.90 × 0.90 = 81,000,000 bps (10.125 MB/s).
          </li>
          <li>
            <strong>Step 4: Time Decomposition & Human Formatting:</strong> Raw seconds are decomposed into days, hours, minutes, and seconds for intuitive reporting.
          </li>
        </ol>
      </section>

      {/* SECTION 5: WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Worked Examples
        </h2>

        {/* Basic Example */}
        <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
          <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            Example 1: Basic — 10 GB Video Download over 100 Mbps Connection
          </h3>
          <p className="text-xs">
            <strong>Inputs:</strong> File Size = 10 GB, Speed = 100 Mbps, Protocol Loss = 10%, ISP Efficiency = 90%.
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1 font-sans tabular-nums text-zinc-700 dark:text-zinc-300">
            <li>Total Bits = 10 × 10⁹ × 8 = 80,000,000,000 bits</li>
            <li>Effective Speed = 100 × 10⁶ × 0.90 × 0.90 = 81,000,000 bps (10.125 MB/s)</li>
            <li>Realistic Duration = 80,000,000,000 / 81,000,000 ≈ 987.65 seconds</li>
            <li>Formatted Result = <strong>16 minutes 27 seconds</strong> (vs 13m 20s theoretical)</li>
          </ul>
        </div>

        {/* Intermediate Example */}
        <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
          <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            Example 2: Intermediate — Web Server Hosting Bandwidth Sizing
          </h3>
          <p className="text-xs">
            <strong>Inputs:</strong> 1,000,000 Monthly Page Views, 2.5 MB Average Page Size, 15% Bot Overhead, 2.0x Peak Surge Multiplier.
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1 font-sans tabular-nums text-zinc-700 dark:text-zinc-300">
            <li>Base Data = 1,000,000 × 2.5 MB = 2,500,000 MB = 2.5 TB</li>
            <li>With 15% Bot Traffic = 2.5 TB × 1.15 = 2.875 TB/month</li>
            <li>Average Bandwidth = (2.875 × 10¹² × 8) / 2,629,800 ≈ 8,745,912 bps ≈ 8.75 Mbps</li>
            <li>Peak Surge Port Capacity = 8.75 Mbps × 2.0 = 17.50 Mbps</li>
            <li>Recommended Server Tier = <strong>100 Mbps Shared or Dedicated Port</strong></li>
          </ul>
        </div>

        {/* Advanced Example */}
        <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
          <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            Example 3: Advanced — Remote Workforce Office Concurrency Simulation
          </h3>
          <p className="text-xs">
            <strong>Inputs:</strong> 3 x 4K Streams (75 Mbps), 8 x Zoom Video Calls (28 Mbps), 2 x Cloud Backups (30 Mbps), 5 x Online Gaming (20 Mbps), Headroom = 25%.
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1 font-sans tabular-nums text-zinc-700 dark:text-zinc-300">
            <li>Raw Aggregate Speed = 75 + 28 + 30 + 20 = 153 Mbps</li>
            <li>Recommended Speed with 25% Headroom = 153 × 1.25 = 191.25 Mbps</li>
            <li>Recommended Plan = <strong>300 Mbps High Speed Fiber Plan</strong></li>
          </ul>
        </div>
      </section>

      {/* SECTION 6: VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Visual Understanding & Reference Tables
        </h2>

        {/* Table 1: Connection Speeds */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Table 1: Benchmark Internet Connection Speeds
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Connection Standard</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Advertised Speed</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Theoretical Max MB/s</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Realistic MB/s (10% Loss)</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800 font-sans tabular-nums">
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">V.90 Dialup Modem</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">56 Kbps</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">0.007 MB/s</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">0.006 MB/s</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">ADSL2+ Broadband</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">24 Mbps</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">3.00 MB/s</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">2.70 MB/s</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Fast Ethernet (100BASE-TX)</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">100 Mbps</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">12.50 MB/s</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">11.25 MB/s</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">Gigabit Fiber (1000BASE-T)</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">1,000 Mbps (1 Gbps)</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">125.00 MB/s</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">112.50 MB/s</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">10 Gigabit Enterprise Link</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">10,000 Mbps (10 Gbps)</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">1,250.00 MB/s</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">1,125.00 MB/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Mobile Broadband */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Table 2: Mobile Broadband Connection Benchmarks
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Generation</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Standard</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Typical Downlink Speed</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Typical Uplink Speed</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800 font-sans tabular-nums">
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">3G</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">HSPA+</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">21 - 42 Mbps</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">5.8 Mbps</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">4G LTE</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">LTE-Advanced</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">100 - 300 Mbps</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">50 - 75 Mbps</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">5G Sub-6GHz</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">5G NR Mid-Band</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">300 - 700 Mbps</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">100 - 200 Mbps</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans">5G mmWave</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">5G High-Band</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">1,000 - 3,000 Mbps</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">300 - 500 Mbps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Common Mistakes & Misconceptions
        </h2>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl space-y-1">
            <h4 className="font-bold text-red-900 dark:text-red-300">1. Confusing Megabits (Mbps) with Megabytes (MB/s)</h4>
            <p className="text-zinc-700 dark:text-zinc-300">
              Users frequently expect a 100 Mbps connection to download a 100 MB file in 1 second. Because 8 bits equal 1 Byte, the theoretical minimum duration is actually 8 seconds.
            </p>
          </div>

          <div className="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl space-y-1">
            <h4 className="font-bold text-red-900 dark:text-red-300">2. Ignoring Protocol Overhead (TCP/IP & Framing)</h4>
            <p className="text-zinc-700 dark:text-zinc-300">
              Every Ethernet frame carries TCP/IP headers, preamble bits, and interpacket gaps. Furthermore, TCP requires periodic acknowledgement packets (ACKs). Accounting for protocol overhead (5% to 10%) is necessary for realistic planning.
            </p>
          </div>

          <div className="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl space-y-1">
            <h4 className="font-bold text-red-900 dark:text-red-300">3. Overlooking Asymmetric ISP Connections (ADSL & Cable)</h4>
            <p className="text-zinc-700 dark:text-zinc-300">
              Residential cable and DSL internet plans feature asymmetric speeds (e.g., 300 Mbps download but only 10 Mbps upload). Video calls, cloud backups, and file uploads depend on uplink bandwidth, not downlink speed.
            </p>
          </div>

          <div className="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl space-y-1">
            <h4 className="font-bold text-red-900 dark:text-red-300">4. Omitting Peak Traffic Surge Multipliers in Web Sizing</h4>
            <p className="text-zinc-700 dark:text-zinc-300">
              Calculating web server bandwidth based strictly on monthly average traffic guarantees downtime during marketing campaigns or viral events. Server ports must be sized for peak concurrent burst traffic (2.0x to 5.0x average).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: PRACTICAL APPLICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Practical Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Enterprise Cloud Backups</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Determining night-time backup windows for multi-terabyte virtual machine images over dedicated site-to-site VPN tunnels.
            </p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Live Video Broadcasting & CDN</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Calculating total outbound bitrates for streaming 4K live streams (25 Mbps per viewer) across edge CDN distribution nodes.
            </p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Remote Work Force Management</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Sizing corporate office internet connections to prevent choppy Zoom video calls when dozens of employees operate simultaneously.
            </p>
          </div>
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Web Infrastructure Budgeting</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Estimating monthly AWS/Azure egress bandwidth bills ($0.08 per GB) based on projected user traffic and average asset payload sizes.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Related Mathematical Concepts
        </h2>
        <div className="space-y-3 text-xs">
          <div>
            <h3 className="font-bold text-blue-600 dark:text-blue-400">The Shannon-Hartley Theorem</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Establishes the maximum theoretical channel capacity C in the presence of noise:
            </p>
            <div className="font-sans tabular-nums text-xs bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-center">
              {"C = B * log2(1 + S/N)"}
            </div>
            <p className="text-slate-900 dark:text-slate-100">
              Where B is channel bandwidth in Hertz (Hz) and S/N is the signal-to-noise ratio.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Bandwidth-Delay Product (BDP)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Measures the maximum volume of data in flight on a network link at any given instant:
            </p>
            <div className="font-sans tabular-nums text-xs bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-center">
              {"BDP (bits) = Bandwidth (bps) * Round Trip Time (seconds)"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: SUMMARY */}
      <section className="space-y-3  dark:border-zinc-800 pt-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Summary
        </h2>
        <p>
          Accurate bandwidth calculation requires looking beyond marketing speed figures to evaluate effective throughput, protocol overhead, line efficiency, and concurrency factors. By converting between bits and Bytes, applying empirical loss factors (5% to 20%), and planning for peak burst traffic, engineers and users can reliably estimate transfer durations and infrastructure capacity.
        </p>
      </section>
    </article>
  );
}
