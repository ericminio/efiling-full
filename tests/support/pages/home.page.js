const { By } = require('selenium-webdriver')

var HomePage = function(driver, url) {
    this.driver = driver
    this.base = url
    this.refresh()
}
HomePage.prototype.refresh = async function() {
    await this.driver.get(this.base)
}
HomePage.prototype.casesSize = async function() {
    await this.driver.sleep(1000)
    let cases = await this.driver.findElements(By.css('table#my-cases tbody tr'))
    return cases.length
}

module.exports = HomePage
