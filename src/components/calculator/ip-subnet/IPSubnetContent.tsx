"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, BookOpen, ShieldAlert, Network, HelpCircle, ExternalLink } from "lucide-react";

export function IPSubnetContent() {
  // All 16 FAQs unfolded by default for immediate accessibility and SEO indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 16 }, (_, i) => i))
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
      q: "What is an IP subnet?",
      a: "An IP subnet is a logical subdivision of an IP network. Subnetting uses a prefix length or subnet mask to determine which addresses belong to the same network and which bits identify hosts or interfaces."
    },
    {
      q: "What is a subnet mask?",
      a: "An IPv4 subnet mask is a 32-bit value that identifies the network portion of an IPv4 address. For example, 255.255.255.0 corresponds to /24."
    },
    {
      q: "What is CIDR notation?",
      a: "CIDR stands for Classless Inter-Domain Routing. CIDR notation writes an IP address followed by a slash and prefix length, such as 192.168.1.0/24. The /24 means that the first 24 bits form the network prefix. CIDR replaced rigid classful allocation as the modern basis for IPv4 prefix representation and aggregation."
    },
    {
      q: "How do I calculate a network address?",
      a: "For IPv4, perform a bitwise AND between the binary IP address and the subnet mask. For example, 192.168.1.25 AND 255.255.255.0 yields 192.168.1.0."
    },
    {
      q: "How do I calculate a broadcast address?",
      a: "For traditional IPv4 subnetting, the broadcast address is formed by setting all host bits to 1. This is mathematically achieved by performing a bitwise OR between the network address and the bitwise-inverted subnet mask (wildcard mask). For 192.168.1.0/24, the broadcast address is 192.168.1.255."
    },
    {
      q: "What is a wildcard mask?",
      a: "A wildcard mask is the bitwise inverse of the IPv4 subnet mask (obtained via NOT Subnet Mask). For 255.255.255.0, the wildcard is 0.0.0.255. Wildcard masks are commonly encountered in routing protocols (like OSPF) and Access Control Lists (ACLs)."
    },
    {
      q: "How many usable hosts are in a /24 subnet?",
      a: "A traditional IPv4 /24 has 2^8 = 256 total addresses. Subtracting the network address and directed broadcast address gives 254 traditional usable hosts. Special cases such as /31 point-to-point links must not be calculated with this generic subtraction rule."
    },
    {
      q: "How many usable hosts are in a /26 subnet?",
      a: "A /26 prefix leaves 32 − 26 = 6 host bits, yielding 2^6 = 64 total addresses and traditionally 64 − 2 = 62 usable host addresses."
    },
    {
      q: "What is a /31 subnet used for?",
      a: "An IPv4 /31 contains two addresses. RFC 3021 specifies the use of 31-bit prefixes on point-to-point links where both addresses are treated as interface endpoints rather than reserving separate network and broadcast addresses."
    },
    {
      q: "What is a /32 subnet?",
      a: "A /32 represents a single IPv4 address (0 host bits). It is commonly used for host routes (loopback interfaces) or to specify one exact interface rather than a multi-host network block."
    },
    {
      q: "Which IPv4 addresses are private?",
      a: "RFC 1918 reserves three address blocks for private networks: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255), and 192.168.0.0/16. Not every 172.x.x.x address is private; for instance, 172.15.x.x and 172.32.x.x are public unicast."
    },
    {
      q: "What is IPv6?",
      a: "IPv6 (Internet Protocol version 6) is the next-generation internet protocol utilizing a 128-bit address space to succeed the exhausted 32-bit IPv4 system. RFC 4291 defines the IPv6 addressing architecture, supporting native security, auto-configuration, and unicast, anycast, and multicast address types."
    },
    {
      q: "What does /64 mean in IPv6?",
      a: "An IPv6 /64 prefix length is the standard subnet size for local networks. The first 64 bits identify the network routing prefix, and the remaining 128 − 64 = 64 bits identify the interface identifier, containing 2^64 = 18,446,744,073,709,551,616 addresses."
    },
    {
      q: "Does IPv6 have a broadcast address?",
      a: "No. IPv6 does not use an IPv4-style broadcast address. Instead, IPv6 uses multicast groups (such as link-local all-nodes multicast) for discovery and packet distribution, preventing broadcast storms."
    },
    {
      q: "How do I split a /24 network into /26 subnets?",
      a: "Calculate borrowed bits: 26 − 24 = 2 bits. The number of subnets created is 2^2 = 4 subnets. For 192.168.1.0/24, the four child networks are 192.168.1.0/26, 192.168.1.64/26, 192.168.1.128/26, and 192.168.1.192/26. Each contains 64 total addresses and 62 usable hosts."
    },
    {
      q: "What is route summarization?",
      a: "Route summarization (CIDR aggregation or supernetting) combines multiple contiguous, properly aligned subnet routes into a single aggregate prefix. For example, four contiguous /24 networks (10.0.0.0/24 through 10.0.3.0/24) can be summarized as 10.0.0.0/22, minimizing routing table overhead on WAN routers."
    }
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
            href="/calculators/bandwidth-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Bandwidth Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Estimate network data throughput, download transfer times, and bandwidth capacity requirements for local and WAN infrastructure.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/binary-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Advanced Binary Calculator &amp; Multi-Base Converter</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Perform bitwise AND, OR, XOR, NOT, bit shifts, and conversions between binary, octal, decimal, and hexadecimal notations.
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
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              1. Introduction to IP Subnetting
            </h2>
            <p>
              An IP Subnet Calculator helps divide an IP address space into logical networks and determine the addressing boundaries of each subnet. Instead of treating an address as an isolated number, subnetting separates the address into a network portion and a host portion, allowing routers and network administrators to determine which addresses belong to the same logical network.
            </p>
            <p>
              Modern IP networking uses CIDR, or Classless Inter-Domain Routing, rather than relying on the old Class A, Class B and Class C model for allocating subnet sizes. In CIDR notation, a slash followed by a prefix length identifies how many leading bits belong to the network prefix. For example, 192.168.1.0/24 has 24 network bits and 8 remaining host bits. CIDR was introduced to improve address allocation and reduce growth in global routing tables.
            </p>
            <p>
              This calculator is designed to work with both IPv4 and IPv6, and it also includes subnet splitting, host-capacity planning and route summarization. The underlying implementation has been independently tested for IPv4 arithmetic, IPv6 128-bit calculations, subnet enumeration and CIDR aggregation.
            </p>
            <p>
              For practical network design, subnetting is useful when a single address block needs to be separated into smaller logical segments such as office networks, server VLANs, guest Wi-Fi, branch networks or point-to-point links.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              2. What Is an IP Address?
            </h2>
            <p>
              An Internet Protocol address identifies an interface or endpoint within an IP networking system. The two address families handled by this calculator are:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>IPv4:</strong> 32 bits</li>
              <li><strong>IPv6:</strong> 128 bits</li>
            </ul>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pt-2">IPv4 Address Structure</h3>
            <p>
              An IPv4 address contains four 8-bit octets written in dotted-decimal notation. For example: <code>192.168.1.25</code>. Each octet can range from 0 through 255. The complete IPv4 address therefore contains:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
              4 × 8 = 32 bits
            </div>
            <p>
              A subnet prefix determines how many of those bits represent the network.
            </p>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pt-2">IPv6 Address Structure</h3>
            <p>
              IPv6 uses 128-bit addresses written as eight hexadecimal groups. Example: <code>2001:db8::1</code>. An IPv6 address can have a subnet prefix followed by an interface identifier. RFC 4291 defines IPv6 addresses as 128-bit identifiers and describes unicast, anycast and multicast address types.
            </p>
            <p>
              The calculator therefore treats IPv4 and IPv6 as fundamentally different address families rather than applying IPv4 rules to both.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              3. What Is a Subnet and Why Do We Subnet?
            </h2>
            <p>
              A subnet is a logical subdivision of an IP network. Subnetting allows a larger address block to be divided into smaller networks that can be routed and administered separately. Instead of using one large network for an entire organization, separate subnets can be created for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Employee workstations and departmental computers</li>
              <li>Production and internal application servers</li>
              <li>Printers and shared office peripherals</li>
              <li>Physical security cameras and access controls</li>
              <li>Guest wireless clients</li>
              <li>Out-of-band management interfaces</li>
            </ul>
            <p>
              Subnetting provides four major administrative and routing benefits:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Smaller broadcast domains:</strong> In traditional IPv4 Ethernet networks, broadcast traffic (such as ARP queries) is confined to the local subnet. Splitting an oversized network reduces the number of devices participating in the same broadcast domain, avoiding performance degradation.
              </li>
              <li>
                <strong>Better segmentation:</strong> Separate subnets make it easier to apply routing policies, Access Control Lists (ACLs), and firewall inspection boundaries between departments.
              </li>
              <li>
                <strong>More efficient address allocation:</strong> CIDR allows organizations to allocate address blocks closer to actual requirements instead of depending on fixed classful sizes.
              </li>
              <li>
                <strong>Easier route organization:</strong> Related networks can be aggregated into a summarized route, reducing the number of individual prefixes represented in global routing tables.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              4. Understanding CIDR Notation
            </h2>
            <p>
              CIDR notation combines an address with a prefix length. For example: <code>192.168.1.0/24</code>.
            </p>
            <p>
              The <code>/24</code> designates:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>24 network bits</strong></li>
              <li><strong>8 host bits</strong> (since 32 − 24 = 8)</li>
            </ul>
            <p>
              The total number of addresses is calculated as 2⁸ = 256. For the traditional IPv4 host-count model, two addresses are reserved:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The <strong>network address</strong> (all host bits 0)</li>
              <li>The <strong>directed broadcast address</strong> (all host bits 1)</li>
            </ul>
            <p>
              Therefore, the traditional usable-host count is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
              Usable Hosts = 256 − 2 = 254
            </div>
            <p>
              The important distinction is that total addresses and usable hosts are not the same quantity. For <code>192.168.1.0/24</code>:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Network:</strong> 192.168.1.0</li>
              <li><strong>First usable:</strong> 192.168.1.1</li>
              <li><strong>Last usable:</strong> 192.168.1.254</li>
              <li><strong>Broadcast:</strong> 192.168.1.255</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              5. How to Calculate a Network Address
            </h2>
            <p>
              The network address is found by applying a bitwise AND operation between the IP address and the subnet mask.
            </p>
            <p>
              Consider IP: <code>192.168.1.25</code> with prefix <code>/24</code>. The subnet mask is <code>255.255.255.0</code>.
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1 overflow-x-auto">
              <div>IP:   11000000.10101000.00000001.00011001 (192.168.1.25)</div>
              <div>Mask: 11111111.11111111.11111111.00000000 (255.255.255.0)</div>
              <div className="border-t border-slate-300 dark:border-slate-600 pt-1 font-bold">AND:  11000000.10101000.00000001.00000000 (192.168.1.0)</div>
            </div>
            <p>
              Therefore, <code>192.168.1.25/24</code> belongs to the network block <code>192.168.1.0/24</code>. The calculator exposes this logic in its calculation-engine steps and binary breakdown so the result can be independently checked.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              6. How to Calculate a Broadcast Address and Wildcard Mask
            </h2>
            <p>
              For traditional IPv4 subnetting, the broadcast address is the address obtained when all host bits are set to 1. Another way to derive it is using the wildcard mask.
            </p>
            <p>
              The wildcard mask is the bitwise inverse (NOT) of the subnet mask. For subnet mask <code>255.255.255.0</code>, the wildcard mask is <code>0.0.0.255</code>.
            </p>
            <p>
              The broadcast address can then be expressed as:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
              Broadcast = Network OR Wildcard
            </div>
            <p>
              For Network <code>192.168.1.0</code> and Wildcard <code>0.0.0.255</code>, performing bitwise OR results in <code>192.168.1.255</code>.
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
              <div>Network:   192.168.1.0</div>
              <div>Hosts:     192.168.1.1 – 192.168.1.254</div>
              <div>Broadcast: 192.168.1.255</div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              7. Worked IPv4 Example: 192.168.1.25/24
            </h2>
            <p>
              Suppose the input address is <code>192.168.1.25/24</code>. The subnet calculations proceed across six distinct stages:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li><strong>Determine the subnet mask:</strong> Prefix <code>/24</code> corresponds to dotted-decimal <code>255.255.255.0</code>.</li>
              <li><strong>Determine host bits:</strong> 32 − 24 = 8 host bits.</li>
              <li><strong>Determine total addresses:</strong> 2⁸ = 256 total IP addresses.</li>
              <li><strong>Determine network address:</strong> Bitwise AND between 192.168.1.25 and 255.255.255.0 yields <code>192.168.1.0</code>.</li>
              <li><strong>Determine broadcast address:</strong> Setting the 8 host bits to 1 yields <code>192.168.1.255</code>.</li>
              <li><strong>Determine traditional usable hosts:</strong> Range is <code>192.168.1.1</code> through <code>192.168.1.254</code> (254 usable host addresses).</li>
            </ol>
            <p>
              This reference IPv4 example verifies binary operations and numerical integrity against standard networking specifications.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              8. IPv4 Prefixes and Host Capacity
            </h2>
            <p>
              For an ordinary IPv4 subnet, the number of host bits is <code>H = 32 − prefix</code>, and the total number of addresses is <code>2ᴴ</code>. Under traditional subnetting rules:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
              Usable Hosts = 2ᴴ − 2
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans font-bold">
                    <th className="py-2 pr-3">CIDR</th>
                    <th className="py-2 pr-3">Subnet Mask</th>
                    <th className="py-2 pr-3">Host Bits</th>
                    <th className="py-2 pr-3">Total Addresses</th>
                    <th className="py-2">Traditional Usable Hosts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr><td className="py-1.5 font-bold text-blue-600">/24</td><td>255.255.255.0</td><td>8</td><td>256</td><td>254</td></tr>
                  <tr><td className="py-1.5 font-bold text-blue-600">/25</td><td>255.255.255.128</td><td>7</td><td>128</td><td>126</td></tr>
                  <tr><td className="py-1.5 font-bold text-blue-600">/26</td><td>255.255.255.192</td><td>6</td><td>64</td><td>62</td></tr>
                  <tr><td className="py-1.5 font-bold text-blue-600">/27</td><td>255.255.255.224</td><td>5</td><td>32</td><td>30</td></tr>
                  <tr><td className="py-1.5 font-bold text-blue-600">/28</td><td>255.255.255.240</td><td>4</td><td>16</td><td>14</td></tr>
                  <tr><td className="py-1.5 font-bold text-blue-600">/29</td><td>255.255.255.248</td><td>3</td><td>8</td><td>6</td></tr>
                  <tr><td className="py-1.5 font-bold text-blue-600">/30</td><td>255.255.255.252</td><td>2</td><td>4</td><td>2</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              The <code>/31</code> case requires special handling because the traditional network/broadcast subtraction rule does not apply. RFC 3021 defines the use of 31-bit prefixes on point-to-point IPv4 links where both addresses are treated as interface endpoints.
            </p>
            <p>
              A <code>/32</code> identifies a single IPv4 address (0 host bits) and is commonly used for loopback or host routes. The calculator explicitly handles <code>/31</code> and <code>/32</code> rather than applying the 2ᴴ − 2 rule indiscriminately.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              9. Private IPv4 Address Ranges
            </h2>
            <p>
              Three IPv4 address blocks are reserved for private internets under RFC 1918:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>10.0.0.0/8:</strong> 10.0.0.0 to 10.255.255.255 (16,777,216 addresses)</li>
              <li><strong>172.16.0.0/12:</strong> 172.16.0.0 to 172.31.255.255 (1,048,576 addresses)</li>
              <li><strong>192.168.0.0/16:</strong> 192.168.0.0 to 192.168.255.255 (65,536 addresses)</li>
            </ul>
            <p>
              These addresses are intended for private network use and are not globally routable on the public internet without Network Address Translation (NAT). Examples include <code>10.1.2.3</code>, <code>172.16.5.10</code>, and <code>192.168.1.25</code>.
            </p>
            <p>
              An important detail is that not every address beginning with 172 is private. For instance, <code>172.16.0.1</code> is private, whereas <code>172.15.255.255</code> and <code>172.32.0.0</code> are public unicast addresses. The calculator validates exact RFC 1918 boundaries.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              10. Classful Networking Versus CIDR
            </h2>
            <p>
              Older IPv4 networking terminology divided address space into rigid classes: Class A (/8), Class B (/16), and Class C (/24). The familiar historical examples include <code>10.0.0.0</code>, <code>172.16.0.0</code>, and <code>192.168.1.0</code>.
            </p>
            <p>
              The calculator includes legacy class shortcuts because they remain useful for training and recognizing common private-network examples. However, modern network engineering is based on CIDR prefix lengths, not rigid classful allocation. RFC 4632 describes CIDR as the classless architecture for IPv4 address assignment and route aggregation. Therefore, <code>192.168.1.0/26</code> is properly understood as a 26-bit prefix allocating a 64-address block, rather than merely &quot;a subnetted Class C.&quot;
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              11. Subnet Splitter: Dividing One Network Into Smaller Networks
            </h2>
            <p>
              The Subnet Splitter starts with a parent network and divides it into smaller child networks.
            </p>
            <p>
              Suppose the parent network is <code>192.168.1.0/24</code> and the target prefix is <code>/26</code>.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
              <div>Borrowed bits: 26 − 24 = 2 bits</div>
              <div>Child subnets generated: 2² = 4 subnets</div>
              <div>Subnet size: 2^(32 − 26) = 64 total addresses (62 usable hosts)</div>
            </div>
            <p>
              The four child networks are:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs font-mono">
              <li><strong>Subnet 1:</strong> 192.168.1.0/26 (Hosts: 192.168.1.1 – 192.168.1.62, Bcast: 192.168.1.63)</li>
              <li><strong>Subnet 2:</strong> 192.168.1.64/26 (Hosts: 192.168.1.65 – 192.168.1.126, Bcast: 192.168.1.127)</li>
              <li><strong>Subnet 3:</strong> 192.168.1.128/26 (Hosts: 192.168.1.129 – 192.168.1.190, Bcast: 192.168.1.191)</li>
              <li><strong>Subnet 4:</strong> 192.168.1.192/26 (Hosts: 192.168.1.193 – 192.168.1.254, Bcast: 192.168.1.255)</li>
            </ul>
            <p>
              Their ranges are perfectly contiguous and do not overlap. The calculator verifies that each subsequent subnet begins immediately after the preceding subnet&apos;s broadcast address.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              12. Subnet Planner: Designing a Network From a Host Requirement
            </h2>
            <p>
              The Subnet Planner solves a reverse sizing problem: instead of analyzing an existing prefix, it determines the smallest CIDR block that satisfies a required host count.
            </p>
            <p>
              For example, suppose a department requires capacity for <strong>50 hosts</strong>. Comparing nearby subnet sizes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><code>/27</code> yields 2⁵ − 2 = 30 traditional usable hosts (insufficient)</li>
              <li><code>/26</code> yields 2⁶ − 2 = 62 traditional usable hosts (sufficient)</li>
            </ul>
            <p>
              Since <code>/27</code> is too small and <code>/26</code> provides 62 slots, the smallest suitable subnet is <code>/26</code>. For a base allocation beginning at <code>192.168.1.0</code>, the planned block is <code>192.168.1.0/26</code> with 62 usable host slots. The calculator selects the minimal prefix and aligns the allocation to a valid network boundary.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              13. IPv6 Subnetting
            </h2>
            <p>
              IPv6 changes several fundamental assumptions from IPv4. IPv6 addresses contain 128 bits rather than 32. RFC 4291 defines the IPv6 addressing architecture and the 128-bit address model.
            </p>
            <p>
              For a prefix length P, the number of addresses represented by the prefix is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
              Addresses = 2^(128 − P)
            </div>
            <p>
              For a standard local subnet of <code>2001:db8::/64</code>, there are:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
              2^(128 − 64) = 2^64 = 18,446,744,073,709,551,616 addresses
            </div>
            <p>
              That quantity far exceeds JavaScript&apos;s 53-bit integer limit (<code>Number.MAX_SAFE_INTEGER</code>), so the calculator utilizes arbitrary-precision 128-bit BigInt logic for exact address calculations.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              14. IPv6 Compression and Canonical Representation
            </h2>
            <p>
              IPv6 addresses are commonly written in compressed form. For example, the fully expanded loopback address:
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs break-all">
              0000:0000:0000:0000:0000:0000:0000:0001
            </div>
            <p>is canonically compressed to <code>::1</code>.</p>
            <p>
              RFC 5952 establishes the standard canonical representation for IPv6 addresses: leading zeros within each 16-bit hexadecimal field must be suppressed, and the longest run of consecutive 16-bit zero fields must be replaced with <code>::</code> (used only once). The calculator supports bidirectional expansion and canonical compression.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              15. IPv6 Does Not Use IPv4 Broadcast Semantics
            </h2>
            <p>
              One of the most critical differences between IPv4 and IPv6 is the treatment of broadcast. In IPv4, directed broadcast addresses (such as <code>192.168.1.255</code>) send packets to all hosts on the subnet.
            </p>
            <p>
              IPv6 does not use broadcast addresses. Instead, IPv6 relies on multicast groups (such as all-nodes multicast <code>ff02::1</code>) and solicited-node multicast for Neighbor Discovery (NDP), replacing ARP. Therefore, an IPv6 subnet result should never report a broadcast address, and host capacity does not subtract 2 addresses.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              16. Route Summarization and CIDR Aggregation
            </h2>
            <p>
              Route summarization (CIDR aggregation or supernetting) consolidates multiple routing entries into a single broader prefix when the address blocks fit a continuous common power-of-two boundary.
            </p>
            <p>Consider four contiguous /24 networks:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-0.5">
              <div>10.0.0.0/24</div>
              <div>10.0.1.0/24</div>
              <div>10.0.2.0/24</div>
              <div>10.0.3.0/24</div>
            </div>
            <p>
              These can be summarized into a single route: <code>10.0.0.0/22</code>, which spans from <code>10.0.0.0</code> through <code>10.0.3.255</code> (1,024 addresses). This reduces routing table overhead on enterprise WAN edge routers.
            </p>
            <p>
              However, aggregation must be applied with care. For non-contiguous routes such as <code>10.0.0.0/24</code> and <code>10.0.2.0/24</code>, a single /23 cannot represent them without also inadvertently covering <code>10.0.1.0/24</code>. The calculator verifies contiguity and flags broad supernets.
            </p>
            <p>
              For traffic-capacity planning alongside subnet design, the{" "}
              <Link href="/calculators/bandwidth-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Bandwidth Calculator
              </Link>{" "}
              can help estimate required network throughput across aggregated links.
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              17. Network Bits Versus Host Bits
            </h2>
            <p>
              CIDR divides an IPv4 address into two conceptual parts:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Network bits:</strong> Identify the subnetwork pathway used by routers to forward packets.</li>
              <li><strong>Host bits:</strong> Identify individual device network interface cards (NICs) connected to that subnetwork segment.</li>
            </ul>
            <p>
              For <code>192.168.1.0/26</code>, there are 26 network bits and 6 host bits, yielding 2⁶ = 64 total addresses and 62 usable hosts. A longer prefix means more network bits and fewer host bits; a shorter prefix means fewer network bits and more host bits.
            </p>
          </section>

          {/* Section 18 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              18. Common Subnetting Mistakes
            </h2>
            <p>
              Subnet calculations frequently fail when engineering assumptions from one addressing model are improperly applied to another:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Confusing total addresses with usable hosts:</strong> A /26 contains 64 total addresses, but only 62 usable hosts under traditional IPv4 subtraction rules.
              </li>
              <li>
                <strong>Applying IPv4 broadcast assumptions to IPv6:</strong> IPv6 uses multicast groups rather than directed broadcast.
              </li>
              <li>
                <strong>Treating all 172.x.x.x addresses as private:</strong> Only <code>172.16.0.0/12</code> (172.16.0.0 to 172.31.255.255) is private under RFC 1918.
              </li>
              <li>
                <strong>Creating unaligned subnet boundaries:</strong> Subnet blocks must align with power-of-two boundaries (e.g. /26 must begin at .0, .64, .128, or .192).
              </li>
              <li>
                <strong>Treating /31 like an ordinary subnet:</strong> Point-to-point /31 behavior is a special IPv4 case defined by RFC 3021 allowing both endpoints to be utilized.
              </li>
              <li>
                <strong>Treating /32 as a multi-host subnet:</strong> A /32 specifies an individual single host route.
              </li>
              <li>
                <strong>Assuming every route set can be summarized:</strong> Non-contiguous routes produce lossy or broad supernets that cover unallocated space.
              </li>
              <li>
                <strong>Confusing IPv6 scale:</strong> IPv6 address spaces are vast (2⁶⁴ addresses per standard /64 subnet) and do not use traditional IPv4 host subtraction.
              </li>
            </ul>
          </section>

          {/* Section 19 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              19. How to Use the IP Subnet Calculator Efficiently
            </h2>
            <p>
              A reliable subnet engineering workflow follows these steps:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>For IPv4 calculation:</strong> Enter the IP address and CIDR prefix (or select from the bidirectional dotted mask list). Review the network ID, broadcast address, wildcard mask, usable host range, host counts, and binary breakdown.
              </li>
              <li>
                <strong>For IPv6 calculation:</strong> Enter the IPv6 address and prefix length. Review canonical compression, expanded representation, network block, and exact BigInt address counts.
              </li>
              <li>
                <strong>For subnet splitting:</strong> Enter base network, base CIDR, and target CIDR. Review generated subnet counts, aligned network boundaries, and host ranges.
              </li>
              <li>
                <strong>For host planning:</strong> Enter base network and required host count. The planner computes the smallest compatible CIDR prefix.
              </li>
              <li>
                <strong>For route summarization:</strong> Enter individual network prefixes to determine the common enclosing supernet.
              </li>
            </ul>
          </section>

          {/* Section 20 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              20. When to Use an IP Subnet Calculator
            </h2>
            <p>
              Subnet calculators are essential tools across network administration, security engineering, and cloud architecture:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Designing VLAN addressing architectures and IP allocation plans</li>
              <li>Sizing VPC and virtual network subnets in AWS, Azure, and Google Cloud</li>
              <li>Splitting private RFC 1918 allocations for multi-branch organizations</li>
              <li>Determining network and broadcast boundaries for firewall ACL configurations</li>
              <li>Configuring point-to-point /31 router interconnects</li>
              <li>Validating IPv6 local /64 assignments and global unicast blocks</li>
              <li>Preparing for networking certifications (CCNA, CCNP, Network+)</li>
            </ul>
            <p>
              For binary, hexadecimal, and other base-conversion tasks involved in network addressing, the{" "}
              <Link href="/calculators/conversion-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Conversion Calculator
              </Link>{" "}
              can be used alongside subnet calculations. For electrical or infrastructure calculations outside IP addressing, see the{" "}
              <Link href="/calculators/voltage-drop-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Voltage Drop Calculator
              </Link>.
            </p>
          </section>

          {/* Section 21 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              21. IPv4 and IPv6 Should Never Be Treated as the Same Calculation
            </h2>
            <p>
              Although IPv4 and IPv6 both use prefix lengths, their underlying architectures differ fundamentally:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>IPv4:</strong> 32 bits, dotted-decimal notation, directed broadcast, traditional host subtraction.</li>
              <li><strong>IPv6:</strong> 128 bits, hexadecimal groups, multicast neighbor discovery, no broadcast address, vast address spaces.</li>
            </ul>
            <p>
              IPv4 address counts fit within standard 32-bit integer arithmetic. In contrast, IPv6 address spaces (such as 2⁶⁴) exceed 53-bit precision and require arbitrary-precision 128-bit BigInt calculations to guarantee exact numerical outputs.
            </p>
          </section>

          {/* Section 22 */}
          <section className="space-y-3 pt-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              22. Engineering Perspective: Calculation Versus Deployment
            </h2>
            <p>
              A subnet calculator verifies mathematical and addressing logic. It does not replace operational verification against hardware capabilities, routing protocol convergence, and cloud security group constraints.
            </p>
            <p>
              Production deployments depend on router operating systems, DHCP scopes, hypervisor virtual switches, and cloud-provider reserved addresses (for instance, AWS reserves the first four and last IP address in every subnet). Always cross-reference logical calculations against your target deployment environment.
            </p>
          </section>

          {/* Section 23: Technical Disclaimer */}
          <section className="space-y-3 pt-6 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> 23. Technical Disclaimer
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              This IP Subnet Calculator performs logical IPv4 and IPv6 addressing calculations. Results describe address-space relationships and do not constitute a complete router, firewall, cloud-network or production-network configuration. Special network behaviors can depend on routing implementations, operating systems, cloud platforms and deployment policies. For production changes, verify calculated subnets against your routing design, address-allocation policy and equipment documentation. IPv4 /31 point-to-point behavior should be evaluated according to relevant implementation RFC 3021. IPv6 uses multicast rather than IPv4-style broadcast semantics.
            </p>
          </section>

          {/* References */}
          <section className="space-y-3 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Technical References
            </h2>
            <ul className="space-y-1.5 text-xs">
              <li>
                <strong>RFC 1918:</strong> <em>Address Allocation for Private Internets</em> — Defines the 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 private address ranges.
              </li>
              <li>
                <strong>RFC 3021:</strong> <em>Using 31-Bit Prefixes on IPv4 Point-to-Point Links</em> — Defines the allocation of 2-address subnets for point-to-point router links.
              </li>
              <li>
                <strong>RFC 4291:</strong> <em>IP Version 6 Addressing Architecture</em> — Defines IPv6 128-bit address formats, unicast, anycast, and multicast spaces.
              </li>
              <li>
                <strong>RFC 4632:</strong> <em>Classless Inter-domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan</em> — Replaced classful networking.
              </li>
              <li>
                <strong>RFC 5952:</strong> <em>A Recommendation for IPv6 Address Text Representation</em> — Canonical formatting, zero suppression, and compression rules.
              </li>
            </ul>
          </section>

        </div>
      </article>

      {/* ========================================================================= */}
      {/* 3. FREQUENTLY ASKED QUESTIONS — FULLY UNFOLDED BY DEFAULT */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-4 shadow-xs">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Engineering questions and answers on IPv4, IPv6, CIDR notation, and subnet allocation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{index + 1}. {faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
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
      {/* 4. RELATED CALCULATORS — BELOW ARTICLE & FAQ (PRECISELY 1 BOTTOM BLOCK) */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 no-print">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          RELATED CALCULATORS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculators/bandwidth-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Bandwidth Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Estimate network data throughput, download transfer times, and bandwidth capacity requirements for local and WAN infrastructure.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/binary-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Advanced Binary Calculator &amp; Multi-Base Converter</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Perform bitwise AND, OR, XOR, NOT, bit shifts, and conversions between binary, octal, decimal, and hexadecimal notations.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default IPSubnetContent;
