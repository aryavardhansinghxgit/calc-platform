import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const bandwidth_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "Why is my actual download speed slower than the speed advertised by my ISP?",
    answer: "Advertised ISP speeds represent maximum physical line sync rates measured in Megabits per second (Mbps). Actual throughput is lower due to protocol overhead (TCP/IP header loss ~5%–10%), Wi-Fi interference (~15%), network congestion during peak hours, and host server rate-limiting. Furthermore, operating systems measure file downloads in Megabytes per second (MB/s), which are 8 times smaller than Megabit numbers."
  },
  {
    question: "What is the difference between Megabits per second (Mbps) and Megabytes per second (MB/s)?",
    answer: "A bit (b) is the smallest binary data unit, while a Byte (B) contains 8 bits (1 Byte = 8 bits). Internet Service Providers advertise link speeds in Megabits per second (Mbps), while operating systems and file downloaders display speeds in Megabytes per second (MB/s). To convert Mbps to MB/s, divide the bitrate by 8 (e.g., 100 Mbps / 8 = 12.5 MB/s)."
  },
  {
    question: "How much protocol overhead loss should I factor into transfer calculations?",
    answer: "On standard wired Ethernet and fiber connections, TCP/IP header encapsulation, preamble framing, and TCP acknowledgements (ACKs) account for 5% to 10% overhead. On wireless networks (Wi-Fi 5/6), packet retransmissions and RF interference increase overhead to 15%–20%. Mobile cellular networks (4G LTE and 5G) experience volatility loss ranging from 15% to 25%."
  },
  {
    question: "How much bandwidth does a household or office need for 4K streaming and remote work?",
    answer: "A single 4K UHD video stream requires ~25 Mbps of sustained bandwidth. HD 1080p video streams require ~5 Mbps, Zoom video calls require ~3.5 Mbps per user, and online gaming requires ~4 Mbps with low latency. Households or small offices with multiple simultaneous users should select an internet plan with 20% to 30% safety headroom above their total peak concurrent bitrate (e.g., 300 Mbps to 500 Mbps for a 4-person household)."
  },
  {
    question: "What is the difference between asymmetric and symmetric internet connections?",
    answer: "Asymmetric connections (such as cable broadband and ADSL) offer high download speeds but significantly lower upload speeds (e.g., 300 Mbps down / 10 Mbps up). Symmetric connections (such as fiber-optic internet) deliver identical download and upload speeds. Upload bandwidth is critical for video conferencing, cloud storage backups, live broadcasting, and server hosting."
  },
  {
    question: "How do I calculate web server hosting bandwidth requirements for a website?",
    answer: "Web hosting bandwidth is calculated using the formula: Monthly Bandwidth (GB) = Monthly Page Views × Average Page Size (MB) × (1 + Bot Overhead %) / 1000. To determine the required server port capacity in Mbps, convert monthly bytes to bits, divide by average seconds in a month (approx. 2,629,800), and apply a peak traffic surge multiplier (2.0x to 5.0x) to accommodate traffic spikes."
  },
  {
    question: "Why does a 100 Mbps internet connection take longer than 80 seconds to download a 1 GB file?",
    answer: "A 1 GB file equals 8 Gigabits (8,000 Megabits). At a theoretical speed of 100 Mbps, 8,000 / 100 = 80 seconds. However, real-world factors such as 10% TCP/IP protocol overhead, ISP line efficiency (~90%), TCP slow-start algorithms, and server upload limits increase the realistic transfer duration to approximately 98–105 seconds."
  },
  {
    question: "How does network latency (ping) affect file transfer speeds?",
    answer: "While bandwidth dictates the maximum volume of data transmitted per second, latency (round-trip time in ms) dictates how fast requests and TCP ACKs travel between client and server. High latency delays TCP window scaling, reducing single-TCP-stream throughput over long geographical distances—a phenomenon known as the Bandwidth-Delay Product (BDP) constraint."
  },
  {
    question: "How long does it take to exhaust a 1.2 TB monthly ISP data cap?",
    answer: "Exhaustion time depends on continuous download speed. At 100 Mbps (12.5 MB/s), downloading continuously will exhaust a 1.2 TB (1,200,000 MB) data cap in approximately 26 hours and 40 minutes. At 1 Gbps (1000 Mbps), a 1.2 TB cap can be depleted in just 2 hours and 40 minutes of uninterrupted downloading."
  },
  {
    question: "What is the difference between SI Base-1000 and IEC Base-1024 data units?",
    answer: "SI decimal metric standards (used by ISPs, networking hardware, and storage manufacturers) define units in powers of 10 (1 Gigabyte (GB) = 1,000 Megabytes (MB) = 10^9 Bytes). IEC binary standards (historically used by Windows operating systems) define units in powers of 2 (1 Gibibyte (GiB) = 1,024 Mebibytes (MiB) = 2^30 Bytes). This mathematical difference explains why a 1 TB drive displays as approximately 931 GiB in Windows."
  }
];
