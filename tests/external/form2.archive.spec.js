const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { cleanDatabase } = require('../support/data/clean.database')
const { Form2CreationPage, MyDocumentsPage } = require('../support/pages')

describe('Form2 archiving', function() {

    var driver
    var page

    before((done)=> {
        driver = firefox()
        cleanDatabase(done)
    })

    after(async ()=> {
        await driver.quit()
    })

    it('works', async ()=> {
        page = Form2CreationPage(driver)
        await page.search('CA12345')
        await page.setPhone('7783501234')
        await page.save()

        page = MyDocumentsPage(driver)
        expect(await page.casesSize()).to.equal(1)

        await page.select(1)
        await page.archive()
        expect(await page.casesSize()).to.equal(0)
    })
})
