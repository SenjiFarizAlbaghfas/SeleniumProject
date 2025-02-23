const { Builder, By, Key, until, Browser } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  const browsers = ["chrome", "firefox", "MicrosoftEdge"];

  for (let browser of browsers) {
    // Membuat koneksi dengan webdriver
    let driver = await new Builder().forBrowser(browser).build();

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
      console.log("Testing Success! with browser " + browser);
    } finally {
      await driver.quit();
    }
  }
}

saucedemoLoginTest();
