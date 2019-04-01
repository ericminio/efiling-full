const { By } = require('selenium-webdriver')
const { base } = require('./commons')
const { Page } = require('./page')

var HomePage = function(driver) {
    this.driver = driver
    this.page = new Page(driver)
    this.page.open(base)
}
HomePage.prototype.casesSize = async function() {
    await this.driver.sleep(1000)
    return (await this.page.list('table#my-cases tbody tr')).length
}

module.exports = HomePage
