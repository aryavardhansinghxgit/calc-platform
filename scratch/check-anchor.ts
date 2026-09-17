import http from "http";

http.get("http://localhost:3000/es/calculators/mortgage-calculator", (res) => {
  let data = "";
  res.on("data", (c) => (data += c));
  res.on("end", () => {
    const anchors = [...data.matchAll(/<a[^>]+href=["'][^"']*mortgage-calculator[^"']*["'][^>]*>[\s\S]*?<\/a>/gi)];
    anchors.forEach((a, i) => {
      console.log(`Anchor ${i + 1}:`, a[0]);
    });
  });
});
