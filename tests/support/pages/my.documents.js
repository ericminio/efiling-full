const { By } = require('selenium-webdriver')

var MyDocumentsPage = function(driver, url) {
    this.driver = driver
    this.base = url
    this.refresh()
}
MyDocumentsPage.prototype.refresh = async function() {
    await this.driver.get(this.base + '/my-documents.html')
}
MyDocumentsPage.prototype.select = async function(id) {
    let check = await this.driver.findElement(By.id('select-'+id))
    await check.click()
}
MyDocumentsPage.prototype.archive = async function() {
    let archive = await this.driver.findElement(By.id('archive-button'))
    await archive.click()
    let yesarchive = await this.driver.findElement(By.id('yes-archive'))
    await yesarchive.click()
}
MyDocumentsPage.prototype.casesSize = async function() {
    await this.driver.sleep(1000)
    let cases = await this.driver.findElements(By.css('table#my-cases tbody tr'))
    return cases.length
}

module.exports = MyDocumentsPage
