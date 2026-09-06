import React from "react";
import ReactDOMServer from "react-dom/server";
import { ConcreteCalculator } from "../src/components/calculator/concrete/ConcreteCalculator";

try {
  const html = ReactDOMServer.renderToString(React.createElement(ConcreteCalculator));
  console.log("RENDER SUCCESS, HTML length:", html.length);
  
  // Verify diagrams present
  console.log("Has SlabDiagram SVG:", html.includes("Slab 3D Diagram"));
  console.log("Has ColumnDiagram SVG:", html.includes("Column 3D Diagram"));
  console.log("Has TubeDiagram SVG:", html.includes("Tube 3D Diagram"));
  console.log("Has CurbDiagram SVG:", html.includes("Curb and Gutter 3D Diagram"));
  console.log("Has StairsDiagram SVG:", html.includes("Stairs 3D Diagram"));

  // Verify accessibility IDs
  const idMatches = html.match(/id="[^"]+"/g);
  console.log("Input IDs generated:", idMatches?.slice(0, 10));

  // Verify labels have for matching inputs
  const htmlForMatches = html.match(/for="[^"]+"/g);
  console.log("Label htmlFor attributes generated:", htmlForMatches?.slice(0, 10));

  // Verify print classes
  console.log("Has break-inside-avoid:", html.includes("break-inside-avoid"));
  console.log("Has no-print:", html.includes("no-print"));
  console.log("Has print:hidden on buttons:", html.includes("print:hidden"));

} catch (err) {
  console.error("RENDER ERROR:", err);
  process.exit(1);
}
