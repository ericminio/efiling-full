const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Welcome page', function() {

    var server
    var driver

    before(async ()=> {
        driver = await new Builder().forBrowser('firefox').build()
    })

    after(async ()=> {
        await driver.quit()
    })

    it('displays documents reminders', async ()=> {
        await driver.get('http://localhost:3000')
        let element = await driver.findElement(By.css('h3'))
        let value = await element.getText()

        expect(value).to.equal('Document Reminders')
    })

    it('welcomes the user', async ()=> {
        await driver.get('http://localhost:3000')
        let element = await driver.findElement(By.id('greetings'))
        let value = await element.getText()

        expect(value).to.equal('Welcome, John Doe')
    })
})
