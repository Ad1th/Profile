const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');
  
  // scroll down until end of the page
  await page.evaluate(() => {
    window.scrollTo(0, 4000); // 100svh + 2000 + some extra
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: '/Users/adith/Documents/Dev/Projects/Profile/empty_gap.png', fullPage: true });
  await browser.close();
})();
