const {Builder, By, Key, until} = require('selenium-webdriver'),
      chrome = require('selenium-webdriver/chrome'),
      screen = {
        width: 1600,
        height: 900
      }

module.exports = {

init: async function(username, password) {
  let driver = await new Builder()
                            .forBrowser('chrome')
                            .setChromeOptions(new chrome.Options().headless().windowSize(screen).addArguments('--remote-debugging-port=9222'))
                            .build()
  const notifCloseButton = driver.findElement(By.className('notificationsCenter_hideSlide')),
        browserTitle = driver.getTitle();

  let isNotifClosed = false;
   
  await driver.get('https://ed.engdis.com/iighighschools#/home');
  await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);
  await driver.findElement(By.name('userName')).sendKeys(username, Key.RETURN);
  //await driver.sleep(5000);
  //await driver.quit();
  while (isNotifClosed == false) {
    setInterval(2000, async function() {
        if ((await notifCloseButton).isDisplayed) {
          (await notifCloseButton).click();
          scrapeUserData();
          isNotifClosed = true;
        } else {
          scrapeUserData();
          isNotifClosed = true;
        }
    })
  }

  async function scrapeUserData() {
     let xmlReq = new XMLHttpRequest(), userDataJSON = 0;

     xmlReq.open('GET', "https://ed.engdis.com/WebApi/Progress/GetDefaultCourseProgress", false);

     xmlReq.onreadystatechange = function() {
      if(xmlReq.readyState == 4 && xmlReq.status == 200) {
        return xmlReq.responseText;
      }
     }

     xmlReq.send();
  }

},

completeUnit: async function() {
  console.log('tba');
}

};

//init()
require('make-runnable');
