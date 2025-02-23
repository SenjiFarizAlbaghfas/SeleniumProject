const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";

    beforeEach(async function () {
      // Menambahkan timeout
      this.timeout(30000); // 10.000 ms = 10 detik

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      await driver.get("https://saucedemo.com");
      //simpan cookie
      cookies = await driver.manage().getCookies();
    });

    it("TC01-Login & Add Item to Cart Success", async function () {
      //panggil cookie

      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");
      await driver.findElement(By.name("login-button")).click();

      // Menambahkan Item ke Cart
    await driver.findElement(By.xpath("//div[.='Sauce Labs Backpack']")).click();
    await driver.findElement(By.id("add-to-cart")).click();
    await driver.findElement(By.css(".shopping_cart_link")).click();

      //assertion
      let titleText = await driver.findElement(By.css(".title")).getText();
      assert.strictEqual(
        titleText.includes("Your Cart"),
        true,
        'Title does not include "Your Cart"'
      );
      console.log("Testing Login & Add Item to Cart Success!");
    }),
      it("TC02-Add Item to Cart & Remove Cart in Your Cart Success", async function () {
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver
          .findElement(By.xpath("//input[@id='password']"))
          .sendKeys("secret_sauce");
        await driver.findElement(By.name("login-button")).click();

        // Menambahkan Item ke Cart & Remove Cart
        await driver.findElement(By.xpath("//div[.='Sauce Labs Backpack']")).click();
        await driver.findElement(By.id("add-to-cart")).click();
        await driver.findElement(By.css(".shopping_cart_link")).click();
        await driver.findElement(By.css("#remove-sauce-labs-backpack")).click();

        //assertion
        let titleText = await driver.findElement(By.css(".title")).getText();
      assert.strictEqual(
        titleText.includes("Your Cart"),
        true,
        'Title does not include "Your Cart"'
      );
      console.log("Testing Add Item to Cart & Remove Cart Success!");
      });
    afterEach(async function () {
      await driver.quit();
    });
  });
}

saucedemoLoginTest();
