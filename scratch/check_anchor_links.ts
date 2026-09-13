async function checkAnchorSelfLinks() {
  const res = await fetch("http://localhost:3000/calculators/molecular-weight-calculator");
  const html = await res.text();

  // Find all <a> tags
  const aTags = html.match(/<a\s+[^>]*href=["'][^"']*molecular-weight-calculator[^"']*["'][^>]*>[\s\S]*?<\/a>/gi) || [];
  console.log("Anchor self-links found:", aTags.length);
  for (const a of aTags) {
    console.log("Anchor tag:", a);
  }

  // Check Related Calculators links
  const relatedSections = html.match(/RELATED CALCULATORS:[\s\S]*?<\/div>/gi) || [];
  console.log("Related Calculator sections found:", relatedSections.length);
  for (let i = 0; i < relatedSections.length; i++) {
    const hasSelfInRelated = relatedSections[i].includes("molecular-weight-calculator");
    console.log(`Related Section ${i + 1} has self-link:`, hasSelfInRelated);
  }
}

checkAnchorSelfLinks();
