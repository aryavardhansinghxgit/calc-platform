const http = require('http');

http.get('http://localhost:3000/calculators/gas-mileage-calculator', res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('Fuel Cost Calculator link:', b.includes('href="/calculators/fuel-cost-calculator"'));
    console.log('Mileage Calculator link:', b.includes('href="/calculators/mileage-calculator"'));
    console.log('Conversion Calculator link:', b.includes('href="/calculators/conversion-calculator"'));
  });
});
