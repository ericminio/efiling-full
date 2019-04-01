const { expect } = require('chai')
const { execute } = require('yop-postgresql')
const { Builder } = require('selenium-webdriver')
const { HomePage, Form2CreationPage } = require('../support/pages')

describe('Form2 creation', function() {

    var base = 'http://localhost:3000'
    var driver
    var page

    before((done)=> {
        driver = new Builder().forBrowser('firefox').build()
        execute('TRUNCATE TABLE forms;', function(rows, error) {
            expect(error).to.equal(undefined)
            done();
        });
    })

    after(async ()=> {
        await driver.quit()
    })

    it('works', async ()=> {
        page = new HomePage(driver, base)
        expect(await page.casesSize()).to.equal(0)

        page = new Form2CreationPage(driver, base)
        await page.search('CA12345')
        await page.setPhone('7783501234')
        await page.save()

        page = new HomePage(driver, base)
        expect(await page.casesSize()).to.equal(1)
    })
})
