const { By } = require('selenium-webdriver')

var Page = function(driver) {
    this.driver = driver
}
Page.prototype.open = async function(url) {
    await this.driver.get(url)
}
Page.prototype.input = async function(selector, value) {
    let field = await this.driver.findElement(By.css(selector))
    await field.sendKeys(value)
}
Page.prototype.click = async function(selector) {
    let element = await this.driver.findElement(By.css(selector))
    await element.click()
}
Page.prototype.list = async function(selector) {
    let elements = await this.driver.findElements(By.css(selector))
    return elements
}

module.exports = { Page:Page }