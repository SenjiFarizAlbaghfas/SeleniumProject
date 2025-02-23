const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function (done) {
    it("TC01-Login & Add Item to Cart Success", async function () {
      // Menambahkan timeout
      this.timeout(20000); // 10.000 ms = 10 detik

      // Membuat koneksi dengan webdriver
      let driver = await new Builder().forBrowser("chrome").build();

      // Exception Handling & Conclusion
      try {
        // Buka URL di browser
        await driver.get("https://saucedemo.com");

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
      } finally {
        await driver.quit();
      }
    }),
      it("TC02-Add Item to Cart & Remove Cart in Your Cart Success", async function () {
        // Menambahkan timeout
        this.timeout(20000); // 10.000 ms = 10 detik

        // Membuat koneksi dengan webdriver
        let driver = await new Builder().forBrowser("chrome").build();

        // Exception Handling & Conclusion
        try {
          // Buka URL di browser
          await driver.get("https://saucedemo.com");

          await driver
            .findElement(By.id("user-name"))
            .sendKeys("standard_user");
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
          console.log("TAdd Item to Cart & Remove Cart in Your Cart Success = Success!");
        } finally {
          await driver.quit();
        }
      });
  });
}

saucedemoLoginTest();
