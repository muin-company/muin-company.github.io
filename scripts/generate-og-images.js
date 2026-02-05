/**
 * OG Image Generator for muin.company
 * Generates 1200x630px PNG images for social sharing
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Define all pages and their content
const pages = [
  {
    filename: 'og-image.png',
    title: 'MUIN',
    subtitle: 'The First AI-Run Company',
    description: 'Run by AI, for humans'
  },
  {
    filename: 'tools/og-image.png',
    title: 'Developer Tools',
    subtitle: 'Free Tools for Developers',
    description: 'No tracking, no BS'
  },
  {
    filename: 'tools/cron-explain/og-image.png',
    title: 'Cron Explain',
    subtitle: 'Cron Expression Converter',
    description: 'Convert cron to natural language and back'
  },
  {
    filename: 'tools/json-to-types/og-image.png',
    title: 'JSON to Types',
    subtitle: 'Convert JSON to TypeScript, Zod, Python',
    description: 'Generate types from JSON instantly'
  },
  {
    filename: 'tools/curl-to-code/og-image.png',
    title: 'curl to Code',
    subtitle: 'Convert curl to Production Code',
    description: 'Python, JavaScript, Go, PHP, Ruby'
  },
  {
    filename: 'tools/paste-checker/og-image.png',
    title: 'Paste Checker',
    subtitle: 'Detect Sensitive Data',
    description: 'Check before you paste - 100% client-side'
  },
  {
    filename: 'tools/readme-gen/og-image.png',
    title: 'README Generator',
    subtitle: 'Generate README from Package',
    description: 'Auto-generate README.md from package.json'
  },
  {
    filename: 'tools/depcheck-lite/og-image.png',
    title: 'Depcheck Lite',
    subtitle: 'Find Unused Dependencies',
    description: 'Lightweight dependency checker'
  },
  {
    filename: 'tools/lockcheck/og-image.png',
    title: 'Lockfile Checker',
    subtitle: 'Validate Package Lock Files',
    description: 'Detect lockfile drift and issues'
  },
  {
    filename: 'tools/bundlesize/og-image.png',
    title: 'Bundle Size',
    subtitle: 'Check Bundle Size Impact',
    description: 'See how packages affect your bundle'
  }
];

// Generate HTML template for OG image
function generateHTML(data) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: ${OG_WIDTH}px;
      height: ${OG_HEIGHT}px;
      background: #0a0a0a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 60px 80px;
      color: white;
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logo {
      font-size: 28px;
      font-weight: 700;
      color: #10b981;
      letter-spacing: -0.5px;
    }
    
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      margin-top: -40px;
    }
    
    .title {
      font-size: 72px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -2px;
      color: #ffffff;
    }
    
    .subtitle {
      font-size: 36px;
      font-weight: 500;
      color: #a0a0a0;
      letter-spacing: -0.5px;
    }
    
    .description {
      font-size: 28px;
      font-weight: 400;
      color: #707070;
      margin-top: 8px;
    }
    
    .accent {
      color: #10b981;
    }
    
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #222;
      padding-top: 24px;
    }
    
    .domain {
      font-size: 20px;
      color: #505050;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">MUIN</div>
  </div>
  
  <div class="content">
    <div class="title">${data.title}</div>
    <div class="subtitle">${data.subtitle}</div>
    <div class="description">${data.description}</div>
  </div>
  
  <div class="footer">
    <div class="domain">muin.company</div>
  </div>
</body>
</html>`;
}

async function generateOGImage(page, data, outputPath) {
  const html = generateHTML(data);
  
  await page.setContent(html);
  await page.setViewport({
    width: OG_WIDTH,
    height: OG_HEIGHT,
    deviceScaleFactor: 2 // 2x for better quality
  });
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await page.screenshot({
    path: outputPath,
    type: 'png',
    omitBackground: false
  });
  
  console.log(`✓ Generated: ${outputPath}`);
}

async function main() {
  console.log('Generating OG images for muin.company...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage();
  
  for (const pageData of pages) {
    const outputPath = path.join(__dirname, '..', 'images', 'og', pageData.filename);
    await generateOGImage(page, pageData, outputPath);
  }
  
  await browser.close();
  
  console.log('\n✓ All OG images generated successfully!');
  console.log(`\nGenerated ${pages.length} images in /images/og/`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
