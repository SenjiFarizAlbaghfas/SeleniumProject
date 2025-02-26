const { By } = require("selenium-webdriver");

class ProductsPage {
  constructor(driver) {
    this.driver = driver;
    this.ItemList = By.className("item_list");
    this.appLogo = By.css(".app_logo");
  }  
  async getTitleText() {
    return await this.driver.findElement(this.appLogo).getText();
  }  
}
module.exports = ProductsPage;
