const { expect } = require('chai')
const { execute } = require('yop-postgresql')
const { Builder } = require('selenium-webdriver')
const { Form2CreationPage, MyDocumentsPage } = require('../support/pages')

describe('Form2 archiving', function() {

    var base = 'http://localhost:3000'
    var driver
    var page

    before((done)=> {
        driver = new Builder().forBrowser('firefox').build()
        var clean = [
            'TRUNCATE TABLE forms;',
            'alter sequence forms_id_seq restart'
        ]
        execute(clean, (rows, error)=> {
            expect(error).to.equal(undefined)
            done();
        });
    })

    after(async ()=> {
        await driver.quit()
    })

    it('works', async ()=> {
        page = new Form2CreationPage(driver, base)
        await page.search('CA12345')
        await page.setPhone('7783501234')
        await page.save()

        page = new MyDocumentsPage(driver, base)
        expect(await page.casesSize()).to.equal(1)

        await page.select(1)
        await page.archive()
        expect(await page.casesSize()).to.equal(0)
    })
})