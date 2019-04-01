const { By } = require('selenium-webdriver')
const { base } = require('./commons')

var Form2CreationPage = function(driver) {
    this.driver = driver
    this.refresh()
}
Form2CreationPage.prototype.refresh = async function() {
    await this.driver.get(base + '/form.2.html')
}
Form2CreationPage.prototype.search = async function(file) {
    let toto = await this.driver.findElement(By.id('file-no'))
    await toto.sendKeys('CA12345')
    let find = await this.driver.findElement(By.id('find-button'))
    await find.click()
    await this.driver.sleep(1500)
}
Form2CreationPage.prototype.appelants = async function() {
    let appelants = await this.driver.findElement(By.id('appellant-name'))
    let value = await appelants.getText()
    return value
}
Form2CreationPage.prototype.setPhone = async function(value) {
    let phone = await this.driver.findElement(By.id('phone'))
    await phone.sendKeys(value)
}
Form2CreationPage.prototype.save = async function() {
    let save = await this.driver.findElement(By.id('draft'))
    await save.click()
}

module.exports = Form2CreationPage
