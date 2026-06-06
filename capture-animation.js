const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 826 });

  try {
    console.log('Navigating to http://localhost:3000/');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for the preloader to disappear (assuming it takes ~5s)
    console.log('Waiting for preloader to finish...');
    await page.waitForTimeout(6000);

    console.log('Taking screenshot at top');
    await page.screenshot({ path: 'artifacts/screenshot_top.png' });

    // Scroll down slowly to trigger GSAP
    console.log('Scrolling down 500px...');
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'artifacts/screenshot_500.png' });

    console.log('Scrolling down another 500px...');
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'artifacts/screenshot_1000.png' });

    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
