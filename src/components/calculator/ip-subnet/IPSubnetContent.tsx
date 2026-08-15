"use client";

import React from "react";
import { BookOpen, AlertTriangle, Network, CheckCircle } from "lucide-react";

export function IPSubnetContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mt-10  dark:border-zinc-800 pt-8">
      <header>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          The Network Engineering Reference to IP Subnetting, CIDR, and Route Summarization
        </h2>
        <p className="text-slate-900 dark:text-slate-100 text-xs">
          An authoritative educational handbook on address structures, subnet splits, route aggregations, and IPv6 address compression.
        </p>
      </header>

      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>1.</span> Introduction to IP Subnetting
        </h3>
        <p>
          An **IP Subnet Calculator** is an indispensable utility in computer networking, used to partition a physical IP address space into smaller logical subnetworks (subnets). Georg Ohm discovered the fundamental equations of electric circuits, while early internet engineers established the Internet Protocol (IP) to govern packet routing. Subnetting enables efficient network traffic routing, isolation, security boundaries, and minimizes wastage of scarce public IP addresses.
        </p>
        <p>
          This calculator suite supports both **IPv4 (32-bit)** and **IPv6 (128-bit)** calculations. By providing prefix calculations, binary visualizations, route aggregations, and required-host planning algorithms, this tool helps network engineers structure clean local area networks (LANs) and wide area supernets (WANs).
        </p>
      </section>

      {/* SECTION 2: WHAT IS AN IP ADDRESS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>2.</span> What is an IP Address?
        </h3>
        <p>
          An Internet Protocol address is a numerical label assigned to each device connected to a computer network. IP addresses perform two major functions: host or network interface identification, and location addressing.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>IPv4 Address Structure:</strong> IPv4 uses a 32-bit address space, allowing for 2^32 (approx. 4.29 billion) unique addresses. These addresses are divided into four 8-bit octets separated by dots, written in dotted-decimal format (e.g. 192.168.1.1).
          </li>
          <li>
            <strong>IPv6 Address Structure:</strong> IPv6 was introduced to overcome IPv4 exhaustion. It uses a 128-bit address space, allowing for 2^128 (approx. 3.4 x 10^38) unique addresses. IPv6 addresses are written as eight groups of four hexadecimal digits separated by colons (e.g., 2001:db8:0000:0000:0000:ff00:0042:8329).
          </li>
        </ul>
      </section>

      {/* SECTION 3: WHAT IS SUB-NETTING */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>3.</span> What is a Subnet and Why Do We Subnet?
        </h3>
        <p>
          A subnet is a logical subdivision of an IP network. Dividing a large network into multiple smaller networks achieves:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Reduced Broadcast Traffic:</strong> Devices on a local network communicate via broadcast packets (e.g., ARP requests in IPv4). Subnetting restricts broadcasts to a single subnet, preventing performance degradation in large physical networks.
          </li>
          <li>
            <strong>Security Compartmentalization:</strong> By separating departments (e.g., Finance, Engineering, and Guest Wi-Fi) into different subnets, network administrators can apply access control lists (ACLs) on routers to block unauthorized access between branches.
          </li>
          <li>
            <strong>Geographic Allocation:</strong> Subnets represent physical branches (e.g., Chicago office vs London office), simplifying routing table pathways.
          </li>
        </ul>
      </section>

      {/* SECTION 4: CIDR NOTATION */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>4.</span> Understanding Classless Inter-Domain Routing (CIDR)
        </h3>
        <p>
          Historically, IPv4 networks were divided into strict classes: Class A (/8), Class B (/16), and Class C (/24). This Classful system resulted in immense address wastage. If a company needed 300 hosts, they were forced to request a Class B block (/16, containing 65,536 addresses), wasting 65,236 IPs.
        </p>
        <p>
          **CIDR** replaced classful networking in 1993. It uses a slash followed by a prefix length (e.g., `/26`) indicating the exact number of bits allocated to the network portion of the address. The remaining bits are allocated to the host portion:
        </p>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-xl font-sans tabular-nums text-xs">
          Prefix: 192.168.1.0/26 {"\u2192"} Network Bits = 26 | Host Bits = 6 (32 - 26)
          Total Addresses = 2^6 = 64 | Usable Host IPs = 64 - 2 = 62
        </div>
      </section>

      {/* SECTION 5: HOW THE CALCULATION WORKS */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>5.</span> How the Calculations Work (Bitwise Operations)
        </h3>
        <p>
          Subnet boundaries are derived using binary bitwise operations:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Convert IP and Mask to Binary:</strong> The IP address and subnet mask CIDR are expanded to 32-bit integers.
          </li>
          <li>
            <strong>Calculate Network ID:</strong> A bitwise `AND` operation is performed between the IP address and the Subnet Mask.
            <br />
            <code className="text-xs">Network ID = IP AND Mask</code>
          </li>
          <li>
            <strong>Calculate Wildcard Mask:</strong> The wildcard mask is the bitwise negation of the subnet mask.
            <br />
            <code className="text-xs">Wildcard = NOT Mask</code>
          </li>
          <li>
            <strong>Calculate Broadcast ID:</strong> A bitwise `OR` operation is performed between the Network ID and the Wildcard mask.
            <br />
            <code className="text-xs">Broadcast = Network OR Wildcard</code>
          </li>
          <li>
            <strong>Define Usable Host Range:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>First Usable Host = Network ID + 1</li>
              <li>Last Usable Host = Broadcast ID - 1</li>
            </ul>
          </li>
        </ol>
      </section>

      {/* SECTION 6: WORKED EXAMPLES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>6.</span> Worked Subnetting Examples
        </h3>
        <div className="space-y-4">
          
          {/* Example 1 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-blue-600" />
              Example A: Standard Classless Division (/26 Subnet)
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 mt-1">
              Calculate boundaries for 192.168.1.70/26.
            </p>
            <div className="mt-2 text-xs font-sans tabular-nums bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Prefix /26 Subnet Mask:</strong> 255.255.255.192</div>
              <div><strong>2. Binary Address:</strong> 11000000.10101000.00000001.01|000110 (IP value = 70)</div>
              <div><strong>3. Network IP:</strong> 11000000.10101000.00000001.01|000000 {"\u2192"} 192.168.1.64</div>
              <div><strong>4. Broadcast IP:</strong> 11000000.10101000.00000001.01|111111 {"\u2192"} 192.168.1.127</div>
              <div><strong>5. Usable Host Range:</strong> 192.168.1.65 – 192.168.1.126 (62 usable host addresses)</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-blue-600" />
              Example B: Subnet Splitter
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 mt-1">
              Divide network 192.168.10.0/24 into smaller subnets with a /26 prefix.
            </p>
            <div className="mt-2 text-xs font-sans tabular-nums bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Calculate Borrowed bits:</strong> 26 - 24 = 2 bits</div>
              <div><strong>2. Calculate Subnets count:</strong> 2² = 4 subnets</div>
              <div><strong>3. Enumerate Subnets:</strong></div>
              <div>- Subnet 1: 192.168.10.0/26 (Hosts: .1 to .62)</div>
              <div>- Subnet 2: 192.168.10.64/26 (Hosts: .65 to .126)</div>
              <div>- Subnet 3: 192.168.10.128/26 (Hosts: .129 to .190)</div>
              <div>- Subnet 4: 192.168.10.192/26 (Hosts: .193 to .254)</div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-xs flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-blue-600" />
              Example C: IPv6 Compression and Address Spaces
            </h4>
            <p className="text-xs text-slate-900 dark:text-slate-100 mt-1">
              Expand and compress the IPv6 loopback address.
            </p>
            <div className="mt-2 text-xs font-sans tabular-nums bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border dark:border-zinc-800 space-y-1.5">
              <div><strong>1. Input IPv6:</strong> ::1</div>
              <div><strong>2. Fully Expanded:</strong> 0000:0000:0000:0000:0000:0000:0000:0001</div>
              <div><strong>3. Compressed Canonical form:</strong> ::1</div>
              <div><strong>4. Address count for prefix /64:</strong> 2^(128-64) = 2^64 = 18,446,744,073,709,551,616 addresses</div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <span>7.</span> Common Subnetting Mistakes
        </h3>
        <div className="p-4 border border-amber-200 dark:border-amber-900/60 bg-blue-50/50 dark:bg-blue-50/20 rounded-2xl space-y-2">
          <p className="flex items-center gap-1 text-amber-800 dark:text-blue-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" /> Avoid these common network configuration mistakes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Confusing Host Capacity with Total Addresses:</strong> Remember that in traditional IPv4 subnets, the first address (Network ID) and the last address (Broadcast ID) cannot be assigned to host devices. Thus, usable host capacity is always total addresses minus two (2^(32-P) - 2).
            </li>
            <li>
              <strong>Applying IPv4 Broadcast Assumptions to IPv6:</strong> IPv6 does not use broadcast addresses. Instead, it utilizes multicast groups (like link-local multicast) for neighbor discovery, preventing broadcast storm overloads.
            </li>
            <li>
              <strong>Overlapping IP Ranges in Subnet Allocation:</strong> When allocating multiple subnets to different physical areas, ensure their ranges do not overlap. For example, allocating 192.168.1.0/25 and 192.168.1.64/26 will cause routing conflicts because the second subnet overlaps with the upper half of the first.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 8: ENGINEERING DISCLAIMER */}
      <section className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Technical Disclaimer
        </h3>
        <p className="text-xs mt-1">
          This IP Subnet calculator performs logical network calculations. While it handles standard RFC exceptions (such as /31 point-to-point subnets under RFC 3021), physical network interface configurations depend on your operating system, hypervisor, or cloud provider routing policies. Always check router configuration policies before deploying production subnets.
        </p>
      </section>
    </article>
  );
}

export default IPSubnetContent;
