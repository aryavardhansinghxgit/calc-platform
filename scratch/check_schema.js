async function checkSchema() {
  const url = process.argv[2] || 'http://localhost:3000/calculators/matrix-calculator';
  const res = await fetch(url);
  const html = await res.text();
  const scripts = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  console.log('JSON-LD scripts found:', scripts ? scripts.length : 0);
  if (scripts) {
    scripts.forEach((s, idx) => {
      const raw = s.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
      try {
        const parsed = JSON.parse(raw);
        console.log(`Schema [${idx}] @type:`, parsed['@type']);
        if (parsed['@type'] === 'BreadcrumbList') {
          console.log('Breadcrumbs:', parsed.itemListElement.map(x => x.name));
        }
        if (parsed['@type'] === 'WebApplication' || parsed['@type'] === 'SoftwareApplication') {
          console.log('Application Name:', parsed.name);
        }
      } catch (e) {
        console.log(`Schema [${idx}] parse error:`, e.message);
      }
    });
  }
}
checkSchema().catch(console.error);
