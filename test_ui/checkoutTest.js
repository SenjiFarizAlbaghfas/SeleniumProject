const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/loginPage");
const ProductsPage = require("../pages/productsPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/checkoutPage");
const testData = require("../fixtures/testData.json");
const dataTest = require("../fixtures/dataTest.json");
const fs = require("fs");
const path = require("path");


async function saucedemoLoginTest() {
  describe("CheckOut Item!", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let productsPage;
    let cartPage;
    let checkoutPage;
  
    beforeEach(async function () {
      // Menambahkan timeout
      this.timeout(40000); // 10.000 ms = 10 detik

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      loginPage = new LoginPage(driver);
      productsPage = new ProductsPage(driver);
      cartPage = new CartPage(driver);
      checkoutPage = new CheckoutPage(driver);

      // Open url
      await loginPage.open(testData.baseUrl);
    });

    it("TC01-CheckOut Success", async function () {
      await loginPage.login(
        testData.validUser.username,
        testData.validUser.password,);

      await cartPage.addItemToCart();
      await checkoutPage.finishCheckout(dataTest.information.firstname, 
        dataTest.information.lastname, 
        dataTest.information.postalcode);
        
      

      //assertion
      const titleText = await productsPage.getTitleText();

      assert.strictEqual(
        titleText.includes(testData.assertTitle),
        true,
        testData.titleError
      );

      console.log(testData.log.CheckOutSuccess);
    }),

    afterEach(async function () {
      const screenshotDir = path.join(__dirname, "../screenshots");
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      // Gunakan nama test case untuk screenshot
      const testCaseName = this.currentTest.title.replace(/\s+/g, "_"); // Ganti spasi dengan underscore

      // Simpan screenshot baru dengan nama test case
      const image = await driver.takeScreenshot();
      fs.writeFileSync(
        path.join(screenshotDir, `${testCaseName}_new.png`),
        image,
        "base64"
      );
      await driver.quit();
    });
  });
}

saucedemoLoginTest();
