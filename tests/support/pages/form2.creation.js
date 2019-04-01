const { By } = require('selenium-webdriver')
const { base } = require('./commons')
const { Page } = require('./page')

var Form2CreationPage = function(driver) {
    this.page = new Page(driver)
    this.page.open(base + '/form.2.html')
}
Form2CreationPage.prototype.search = async function(file) {
    await this.page.input('#file-no', 'CA12345')
    await this.page.click('#find-button')
}
Form2CreationPage.prototype.setPhone = async function(value) {
    await this.page.input('#phone', value)
}
Form2CreationPage.prototype.save = async function() {
    await this.page.click('#draft')
}

module.exports = Form2CreationPage
