import http from "http";

async function checkObject() {
  const html = await new Promise<string>((resolve) => {
    http.get("http://localhost:3000/calculators/molarity-calculator", (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    });
  });

  // Strip script and style tags
  const bodyText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                       .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  const hasObj = bodyText.includes("[object Object]");
  console.log("Visible body text contains [object Object]:", hasObj);
  const hasNaN = bodyText.includes("NaN");
  console.log("Visible body text contains NaN:", hasNaN);
  const hasUndefined = bodyText.includes("undefined");
  console.log("Visible body text contains undefined:", hasUndefined);
}
checkObject();
