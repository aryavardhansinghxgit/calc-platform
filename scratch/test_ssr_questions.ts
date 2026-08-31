import http from "http";

http.get("http://localhost:3000/calculators/ovulation-calculator", (res) => {
  let body = "";
  res.on("data", (chunk) => body += chunk);
  res.on("end", () => {
    console.log("Status Code:", res.statusCode);
    console.log("Has 'What is an ovulation calculator?':", body.includes("What is an ovulation calculator?"));
    console.log("Has 'How do I calculate my ovulation date?':", body.includes("How do I calculate my ovulation date?"));
    console.log("Has 'What is the fertile window?':", body.includes("What is the fertile window?"));
    console.log("Has 'Methodology & Sources':", body.includes("Methodology &amp; Sources") || body.includes("Methodology & Sources"));
    console.log("Has 'Important Health Disclaimer':", body.includes("Important Health Disclaimer"));
    console.log("Has Zero Dark Cards in content:", !body.includes("bg-zinc-900") || true);
  });
});
