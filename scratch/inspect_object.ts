async function inspectObjectObject() {
  const res = await fetch("http://localhost:3000/calculators/molecular-weight-calculator");
  const html = await res.text();
  const index = html.indexOf("[object Object]");
  if (index !== -1) {
    console.log("Context around [object Object]:");
    console.log(html.substring(Math.max(0, index - 200), index + 300));
  } else {
    console.log("No [object Object] found");
  }
}

inspectObjectObject();
