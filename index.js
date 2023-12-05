import puppeteer from "puppeteer";
import "dotenv/config";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-fullscreen"],
  });
  const page = await browser.newPage();
  await page.goto("https://our.independa.com");

  await page.locator("#id_username").fill(process.env.LOGIN_USERNAME);
  await page.locator("#id_password").fill(process.env.LOGIN_PASSWORD);

  await page.locator(".button.button_green").click();

  await page.waitForNavigation();

  await page
    .locator("#menu_items > li:nth-child(3) > a > div.menu_text > p")
    .click();

  await page
    .locator("#menu_items > li:nth-child(3) > ul > li:nth-child(4) > a > p")
    .click();

  // pencil icon
  await page.locator("#venues > tbody > tr > td.edit > a > div").click();
  // next
  await page.waitForTimeout(2000);
  await page
    .locator(
      "#manage_dining > form > div.content_header > a.button.button_green"
    )
    .click();

  await page
    .locator(
      "#manage_dining > form > div:nth-child(3) > div.menus > div:nth-child(1) > div.box_header > a:nth-child(2)"
    )
    .click();

  await page.locator("#copy_datepicker > img").click();

  const today = await page.$eval(
    "#ui-datepicker-div > table > tbody > tr:nth-child(2) > td.ui-datepicker-today > a",
    today => today.innerText
  );

  await page.waitForTimeout(2000);

  console.log(today, "yup");

  //   const allImages = await page.$$eval("div.product-card-container", images => {
  //     return images.map(image => {
  //       const imageUrl = image.querySelector(
  //         ".product-card-container__product-image"
  //       );
  //       const name = image.querySelector(".product-title__name");
  //       const price = image.querySelector(".product-price__saleprice");

  //       const text = price.innerText;
  //       // const source = productImage.src;
  //       const formatPrice = text.match(/\d+.\d+/)[0];
  //       // return `${format} / each - ${txt} ${source}`;
  //       return {
  //         item: name.innerText,
  //         price: formatPrice,
  //         imageUrl: imageUrl.src,
  //       };
  //     });
  //   });

  await page.screenshot({ path: "./test.jpeg" });
  await browser.close();
})();
