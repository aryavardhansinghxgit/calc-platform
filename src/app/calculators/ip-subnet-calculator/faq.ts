import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ip_subnet_calculatorFaqs: CalculatorFAQ[] = [
  {
    "question": "What is a subnet?",
    "answer": "A subnet (short for subnetwork) is a logical subdivision of an IP network. Subnetting divides a large, single physical network into multiple smaller logical segments, which improves routing efficiency, enhances local security controls, and isolates broadcast storm domains."
  },
  {
    "question": "What is a subnet mask?",
    "answer": "A subnet mask is a 32-bit dotted-decimal number that distinguishes the network portion from the host portion of an IPv4 address. Consecutive binary '1's designate the network bits, while consecutive '0's designate the host bits. For example, 255.255.255.0 identifies a 24-bit network prefix."
  },
  {
    "question": "What is CIDR notation?",
    "answer": "CIDR (Classless Inter-Domain Routing) notation represents an IP address and its associated routing prefix length using a slash followed by the number of network bits (e.g. 192.168.1.0/24). It replaced the legacy Classful (Class A, B, C) allocation system to reduce IP address wastage."
  },
  {
    "question": "How do you calculate a network address from an IP and mask?",
    "answer": "The network address (Subnet ID) is calculated by performing a bitwise logical 'AND' operation between the binary representation of the IP address and the subnet mask. For example, 192.168.1.25 AND 255.255.255.0 yields 192.168.1.0."
  },
  {
    "question": "How do you calculate a broadcast address?",
    "answer": "The broadcast address is calculated by taking the network address and setting all the host bits to binary '1'. This is mathematically achieved by performing a bitwise 'OR' between the network address and the bitwise-inverted subnet mask (the wildcard mask)."
  },
  {
    "question": "What is a wildcard mask?",
    "answer": "A wildcard mask is the exact bitwise inversion of a subnet mask (obtained by performing NOT Subnet Mask). It is primarily used in Access Control Lists (ACLs) and routing protocols (like OSPF) to specify which bits of an IP address must be matched."
  },
  {
    "question": "How many usable hosts are in a /24 subnet?",
    "answer": "A /24 subnet has 8 host bits, yielding 2^8 = 256 total addresses. Subtracting the network address and the broadcast address leaves 254 usable host IP addresses."
  },
  {
    "question": "How many usable hosts are in a /26 subnet?",
    "answer": "A /26 subnet has 6 host bits, yielding 2^6 = 64 total addresses. Subtracting the network address and the broadcast address leaves 62 usable host IP addresses."
  },
  {
    "question": "What is a /31 subnet and when is it used?",
    "answer": "A /31 subnet has only 2 total addresses. Under RFC 3021, it is used for point-to-point links (like link connections between two routers) where network and broadcast addresses are omitted, leaving both IPs usable for the interface endpoints."
  },
  {
    "question": "What is a /32 subnet?",
    "answer": "A /32 prefix denotes a subnet with a single IP address (host route). It has 0 host bits, meaning it specifies an individual specific host rather than a block of devices."
  },
  {
    "question": "What is the difference between private and public IP addresses?",
    "answer": "Private IP addresses (RFC 1918) are reserved for use within local private networks and are not routable on the public internet. Public IP addresses are globally unique and are assigned by internet registries for direct routing across the global WAN."
  },
  {
    "question": "What is IPv6?",
    "answer": "IPv6 (Internet Protocol version 6) is the next-generation internet protocol, utilizing a 128-bit address space to replace the exhausted 32-bit IPv4 system. It supports native security features, auto-configuration, and eliminates the need for Network Address Translation (NAT) in most setups."
  },
  {
    "question": "What does /64 mean in IPv6?",
    "answer": "A /64 prefix length is the standard subnet size for IPv6 local networks. The first 64 bits identify the network routing prefix, and the remaining 64 bits identify the interface identifier (host portion), containing 2^64 (approx. 18.4 quintillion) nodes."
  },
  {
    "question": "Does IPv6 have a broadcast address?",
    "answer": "No, IPv6 does not use broadcast addresses. Instead, it utilizes multicast groups (such as all-nodes multicast link-local addresses) to exchange packets, reducing network traffic load on neighboring interfaces."
  },
  {
    "question": "What is route summarization (CIDR aggregation)?",
    "answer": "Route summarization is the consolidation of multiple contiguous subnet routing pathways into a single aggregated supernet block (e.g. summarizing four contiguous /24 subnets into a single /22 block). This minimizes the size of routing tables on WAN routers."
  },
  {
    "question": "What is the difference between network bits and host bits?",
    "answer": "Network bits identify the specific subnetwork path that routers use to forward packets, while host bits identify the individual network interface cards (NICs) connected to that specific subnetwork segment."
  }
];

export default ip_subnet_calculatorFaqs;
