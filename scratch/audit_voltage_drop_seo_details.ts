export {};

async function testSeo() {
  const res = await fetch("http://localhost:3000/calculators/voltage-drop-calculator");
  const html = await res.text();
  console.log("Has ohms-law link in body:", html.includes("/calculators/ohms-law-calculator"));
  console.log("Has electricity-calculator link in body:", html.includes("/calculators/electricity-calculator"));
  console.log("Has conversion-calculator link in body:", html.includes("/calculators/conversion-calculator"));

  // Check 18 FAQs by question text
  const questions = [
    "What is voltage drop?",
    "What is the basic voltage-drop formula?",
    "How do I calculate voltage drop percentage?",
    "How does wire size affect voltage drop?",
    "What is the difference between voltage drop and ampacity?",
    "Does wire length affect voltage drop?",
    "Does current affect voltage drop?",
    "How is AC single-phase voltage drop different from DC voltage drop?",
    "What is the three-phase voltage-drop formula?",
    "Does power factor affect voltage drop?",
    "What is an acceptable voltage drop?",
    "Is 3% voltage drop required by the NEC?",
    "Is copper better than aluminum for voltage drop?",
    "Does conduit material affect voltage drop?",
    "Does a longer cable always have more voltage drop?",
    "What happens if I use two parallel conductors?",
    "What happens when current is zero?",
    "Can voltage drop be zero?"
  ];
  let faqFound = 0;
  for (const q of questions) {
    if (html.includes(q)) faqFound++;
  }
  console.log("FAQs found in SSR:", faqFound, "/", questions.length);

  // Check sections
  let sectionsFound = 0;
  for (let i = 1; i <= 30; i++) {
    if (html.includes(`${i}. `)) sectionsFound++;
  }
  console.log("Sections found in SSR:", sectionsFound, "/ 30");

  // Check for any dark/black background classes in article
  const hasBlackCard = html.includes("bg-black");
  console.log("Has bg-black:", hasBlackCard);
}

testSeo();
