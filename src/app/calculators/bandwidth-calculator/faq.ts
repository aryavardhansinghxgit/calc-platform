import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const bandwidth_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate download time from Mbps?",
    answer: "Convert the file size to bytes, multiply by 8 to obtain bits, then divide by the connection speed in bits per second: Time = File Size in Bytes × 8 / Bandwidth in bps. For a realistic estimate, additional loss or efficiency assumptions can be applied."
  },
  {
    question: "How many MB/s is 100 Mbps?",
    answer: "Using the standard 8-bit byte relationship: 100 Mbps ÷ 8 = 12.5 MB/s. This is a unit conversion. Actual application throughput may be lower."
  },
  {
    question: "How long does a 10 GB file take to download at 100 Mbps?",
    answer: "The ideal theoretical duration is 13 minutes 20 seconds. The calculator's reference realistic model with 10% overhead and 90% ISP efficiency produces approximately 16 minutes 28 seconds. The difference comes from the assumptions applied to the effective rate."
  },
  {
    question: "Why is my real download speed lower than my ISP's advertised speed?",
    answer: "Advertised bandwidth represents the provisioned or nominal access rate. Actual end-to-end throughput can be affected by protocol overhead, congestion, Wi-Fi conditions, latency, server limitations, packet loss and endpoint limitations. IETF throughput-testing guidance explicitly treats bandwidth and measured TCP throughput as related but distinct quantities."
  },
  {
    question: "What is the difference between Mbps and MB/s?",
    answer: "Mbps means megabits per second. MB/s means megabytes per second. Because 1 byte = 8 bits, you divide Mbps by 8 to obtain MB/s."
  },
  {
    question: "What is the difference between GB and GiB?",
    answer: "A gigabyte is a decimal unit: 1 GB = 10⁹ bytes. A gibibyte is a binary unit: 1 GiB = 2³⁰ bytes. NIST distinguishes SI decimal prefixes from the IEC binary prefixes specifically to avoid this ambiguity."
  },
  {
    question: "How much bandwidth does a website need?",
    answer: "It depends on traffic volume and average payload size. A first-order estimate is: Monthly Data = Page Views × Average Payload × (1 + Overhead). The calculator then converts that total to average and peak network requirements."
  },
  {
    question: "How much bandwidth should I allow for peak website traffic?",
    answer: "Use the average bandwidth as the baseline and apply an appropriate surge multiplier. For example: 8.75 Mbps × 2 = 17.5 Mbps. The correct multiplier depends on the site's actual traffic pattern rather than a universal standard."
  },
  {
    question: "How much bandwidth does a 4K video stream use?",
    answer: "There is no single universal number because it depends on the codec, resolution, frame rate, compression and service. The calculator uses a configurable activity profile rather than claiming one fixed bandwidth requirement applies to every 4K stream."
  },
  {
    question: "How do I calculate bandwidth for multiple users?",
    answer: "Estimate the simultaneous activities and their per-activity rates: Aggregate = Σ(Count × Rate). Then add headroom: Recommended = Aggregate × (1 + Headroom/100). This approach is used directly by the concurrency-planning module and is verified by the calculator's production tests."
  },
  {
    question: "What is bandwidth headroom?",
    answer: "Bandwidth headroom is additional capacity reserved above the calculated baseline. It helps accommodate demand spikes and normal variability without immediately saturating the link. The calculator allows the headroom percentage to be adjusted rather than assuming one fixed value."
  },
  {
    question: "Does latency affect download speed?",
    answer: "Latency does not simply change the nominal bandwidth of the physical link, but it can influence application throughput, particularly for protocols such as TCP where round-trip timing and available window sizes matter. IETF TCP-throughput guidance explicitly considers round-trip time, bottleneck bandwidth and socket buffers when evaluating achievable throughput."
  },
  {
    question: "What is the bandwidth-delay product?",
    answer: "The bandwidth-delay product is approximately: BDP = Bandwidth × RTT. It describes the quantity of data that corresponds to the bandwidth available during one round-trip interval. It is useful when reasoning about high-bandwidth, high-latency paths."
  },
  {
    question: "How quickly will a 1.2 TB data cap be exhausted at 100 Mbps?",
    answer: "Under the calculator's decimal-unit continuous-transfer model: 1.2 TB = 9.6 × 10¹² bits. At 100,000,000 bits/s, the theoretical continuous duration is 96,000 seconds = 1 day 2 hours 40 minutes. The actual time in a household or office will normally be much longer because usage is intermittent."
  },
  {
    question: "Does 1 Gbps mean I can download at 1 GB/s?",
    answer: "No. A 1 Gbps connection corresponds to: 1,000 Mbps ÷ 8 = 125 MB/s before considering real-world efficiency and overhead."
  },
  {
    question: "Is bandwidth the same as throughput?",
    answer: "No. Bandwidth refers to the capacity of a communication channel, while throughput refers to the actual rate of successfully delivered data. They can differ because of congestion, protocol behavior, packet loss, network conditions and endpoint limitations."
  },
  {
    question: "What is the difference between upload and download bandwidth?",
    answer: "Download bandwidth describes data moving toward the user or endpoint. Upload bandwidth describes data moving away from the endpoint. Some access networks are asymmetric, meaning the download capacity is substantially higher than the upload capacity. The practical impact becomes important for cloud backups, live broadcasting, remote file sharing and other upload-heavy applications."
  },
  {
    question: "Does protocol overhead always equal 10%?",
    answer: "No. Ten percent is an explicit assumption used by the calculator's reference scenario, not a universal networking constant. Actual overhead depends on the protocol stack, packetization, framing, retransmissions and other conditions. The calculator therefore exposes overhead as an input rather than pretending one value applies universally."
  },
  {
    question: "Can a bandwidth calculator predict my exact real download time?",
    answer: "No calculator can guarantee an exact future Internet transfer duration from link speed alone. It can produce a mathematical estimate using explicit assumptions. Actual performance can change because of congestion, network path characteristics, server capacity, Wi-Fi conditions, latency, packet loss and other variables. IETF guidance similarly distinguishes provisioned bandwidth from measured end-to-end TCP throughput."
  },
  {
    question: "Why do websites need more bandwidth during traffic spikes?",
    answer: "Monthly or daily averages hide short periods of high demand. If many users request pages or media simultaneously, the instantaneous traffic rate can be several times higher than the average. That is why the hosting module includes a configurable peak-surge multiplier rather than sizing only from average monthly traffic."
  }
];
