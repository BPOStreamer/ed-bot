const {Builder, By, Key, until} = require('selenium-webdriver');

async function init() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://ed.engdis.com/iighighschools#/home');
    await driver.findElement(By.name('password')).sendKeys('12345', Key.RETURN);
    await driver.findElement(By.name('userName')).sendKeys('n05Anh10N1', Key.RETURN);
    await driver.sleep(5000);
  } finally {
    await driver.quit();
  }
};