const { By } = require('selenium-webdriver')
const { base } = require('./commons')

var HomePage = function(driver) {
    this.driver = driver
    this.refresh()
}
HomePage.prototype.refresh = async function() {
    await this.driver.get(base)
}
HomePage.prototype.casesSize = async function() {
    await this.driver.sleep(1000)
    let cases = await this.driver.findElements(By.css('table#my-cases tbody tr'))
    return cases.length
}

module.exports = HomePage
