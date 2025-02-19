const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  // Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser("chrome").build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://saucedemo.com");

    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");

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

  } finally {
    // await driver.quit();
  }
}

saucedemoLoginTest();

//div[@class='app_logo']
//div[@class='app_logo']
//div[@id='header_container']/div[@class='primary_header']//div[@class='app_logo']
