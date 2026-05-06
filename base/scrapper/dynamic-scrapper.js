import puppeteer from "puppeteer";
import fs from "fs";

const URL = "https://ezdegree.co.kr/";

async function crawl() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();
    await page.goto(URL);
    const content = await page.content();
    fs.writeFileSync("response.html", content);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

export { crawl };
