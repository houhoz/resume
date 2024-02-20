import { chromium } from "playwright";

const main = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

  await page.emulateMedia({ media: "screen" });

  await page.addStyleTag({
    content: `
      @font-face {
        font-family: 'Zhi Mang Xing';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url(https://cdn.jsdelivr.net/fontsource/fonts/zhi-mang-xing@latest/latin-400-normal.woff2) format('woff2'), url(https://cdn.jsdelivr.net/fontsource/fonts/zhi-mang-xing@latest/latin-400-normal.woff) format('woff');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
      }
      body {
        font-family: 'Zhi Mang Xing', cursive;
      }
    `,
  });

  await page.pdf({
    path: "public/resume.pdf",
    margin: { top: "50px", bottom: "80px" },
    printBackground: true,
  });

  return browser.close();
};

main();
