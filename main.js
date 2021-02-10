const {Builder, By, Key, until, Actions, Browser} = require('selenium-webdriver'),
      chrome = require('selenium-webdriver/chrome'),
      screen = {
        width: 1600,
        height: 900
      }

let driver = new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(new chrome.Options().headless().windowSize(screen).addArguments('--remote-debugging-port=9222'))//.addArguments('--disable-web-security'))
                    .build(),
    notifCloseButton = 0,
    loginButton = 0,
    progressTextBox = 0,
    data = 0,
    homeOkBtn = 0,
    actions = driver.actions({async: false});

module.exports = {

init: async function(username, password, unitNum) {
  await driver.get('https://ed.engdis.com/iighighschools#/home');
  loginButton = await driver.findElement(By.id('submit1'))
  await driver.wait(until.elementIsVisible(loginButton));
  await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);
  await driver.findElement(By.name('userName')).sendKeys(username, Key.RETURN);

  await driver.wait(until.elementLocated(By.xpath('/html/body/div/app-root/notifications-center-carousel/div/div/div[1]')));
  notifCloseButton = await driver.findElement(By.xpath("/html/body/div/app-root/notifications-center-carousel/div/div/div[1]"));
  await driver.wait(until.elementIsVisible(notifCloseButton));

  //selenium will do the scraping because anyorigin cant be used for dynamic content, bummer.
  await driver.get('https://ed.engdis.com/WebApi/Progress/GetDefaultCourseProgress');

  progressTextBox = await driver.findElement(By.xpath('/html/body/pre'));
  await progressTextBox.getText().then (function(text) {
    data = JSON.parse(text)
    console.log('\x1b[33m%s\x1b[0m', `${data.CourseProgressTree.Name} \n-----------------`)

    for (var i = 0; i < data.CourseProgressTree.Children.length; i++) {
      console.log('\x1b[33m%s\x1b[0m', `${data.CourseProgressTree.Children[i].Name} (progress:  ${data.CourseProgressTree.Children[i].Progress}%, lessons in unit: ${data.CourseProgressTree.Children[i].Children.length})`)
    }   
  })

  await driver.get('https://ed.engdis.com/iighighschools#/home');

  homeOkBtn = await driver.findElements(By.name('btnOk'));
  if (homeOkBtn.length == 1) {
    await actions.click(homeOkBtn[0]).perform();
  }

  completeUnit(unitNum)

}
};

async function completeUnit(unitNum) {
  let unitName = data.CourseProgressTree.Children[unitNum - 1].Name;
  
  await driver.findElement

  for (var i = 0; i < data.CourseProgressTree.Children[unitNum - 1].Children.length; i++) {
      console.log(data.CourseProgressTree.Children[unitNum - 1].Children[i].Metadata.Code)
  }
}

console.log('running')
require('make-runnable');
