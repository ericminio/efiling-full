const { By } = require('selenium-webdriver')
const { base } = require('./commons')
const { Page } = require('./page')

var MyDocumentsPage = function(driver) {
    this.driver = driver
    this.page = new Page(driver)
    this.page.open(base + '/my-documents.html')
}
MyDocumentsPage.prototype.select = async function(id) {
    await this.page.click('#select-'+id)
}
MyDocumentsPage.prototype.archive = async function() {
    await this.page.click('#archive-button')
    await this.page.click('#yes-archive')
}
MyDocumentsPage.prototype.casesSize = async function() {
    await this.driver.sleep(1000)
    return (await this.page.list('table#my-cases tbody tr')).length
}

module.exports = MyDocumentsPage
