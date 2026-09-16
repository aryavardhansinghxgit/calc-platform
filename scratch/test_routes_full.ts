import { ALL_CALCULATORS } from "../src/calculators";

async function main() {
  console.log(`Starting audit of all ${ALL_CALCULATORS.length} calculators and category pages...`);
  
  const categories = ["other", "finance", "math", "health", "date", "converters", "construction"];
  const failed: { route: string; status?: number; error?: string }[] = [];
  const passed: string[] = [];

  // Check root
  try {
    const res = await fetch("http://localhost:3000/");
    if (res.status === 200) {
      console.log(`✓ / (200 OK)`);
      passed.push("/");
    } else {
      console.error(`✗ / returned ${res.status}`);
      failed.push({ route: "/", status: res.status });
    }
  } catch (e: any) {
    console.error(`✗ / fetch failed: ${e.message}`);
    failed.push({ route: "/", error: e.message });
  }

  // Check categories
  for (const cat of categories) {
    const route = `/category/${cat}`;
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      const text = await res.text();
      if (res.status === 200 && !text.includes("Runtime ReferenceError") && !text.includes("Application error")) {
        console.log(`✓ ${route} (200 OK)`);
        passed.push(route);
      } else {
        console.error(`✗ ${route} returned status ${res.status}`);
        failed.push({ route, status: res.status });
      }
    } catch (e: any) {
      console.error(`✗ ${route} error: ${e.message}`);
      failed.push({ route, error: e.message });
    }
  }

  // Check all calculators in batches of 5
  const batchSize = 5;
  for (let i = 0; i < ALL_CALCULATORS.length; i += batchSize) {
    const batch = ALL_CALCULATORS.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (calc) => {
        const route = `/calculators/${calc.slug}`;
        try {
          const res = await fetch(`http://localhost:3000${route}`);
          const text = await res.text();
          if (res.status === 200 && !text.includes("Runtime ReferenceError") && !text.includes("Application error")) {
            passed.push(route);
          } else {
            console.error(`✗ ${route} returned status ${res.status}`);
            failed.push({ route, status: res.status });
          }
        } catch (e: any) {
          console.error(`✗ ${route} error: ${e.message}`);
          failed.push({ route, error: e.message });
        }
      })
    );
    process.stdout.write(`Progress: ${Math.min(i + batchSize, ALL_CALCULATORS.length)}/${ALL_CALCULATORS.length}\r`);
  }

  console.log(`\n\n================ RESULT ================`);
  console.log(`Passed: ${passed.length}`);
  console.log(`Failed: ${failed.length}`);
  if (failed.length > 0) {
    console.log("Failed routes:", JSON.stringify(failed, null, 2));
    process.exit(1);
  } else {
    console.log("All routes and calculators are working flawlessly!");
    process.exit(0);
  }
}

main().catch(err => {
  console.error("Test script failure:", err);
  process.exit(1);
});
