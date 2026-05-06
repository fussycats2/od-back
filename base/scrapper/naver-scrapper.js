import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeQuotes() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(".quote");

  const results = await page.evaluate(() => {
    return [...document.querySelectorAll(".quote")]
      .map((quote) => {
        const text = quote.querySelector(".text")?.innerText;
        const author = quote.querySelector(".author")?.innerText;
        return `${author}: ${text}`;
      })
      .filter(Boolean);
  });

  console.log(results);

  fs.writeFileSync("quotes.txt", results.join("\n\n"), "utf-8");

  console.log("quotes.txt 저장 완료");

  await browser.close();
}

scrapeQuotes();
