const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { cleanDatabase } = require('../support/data/clean.database')
const { HomePage, Form2CreationPage, MyDocumentsPage, caseListSize } = require('../support/pages')

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
        page = await Form2CreationPage(driver)
        await page.search('CA12345')
        await page.setPhone('7783501234')
        await page.save()

        page = await MyDocumentsPage(driver)
        expect(await caseListSize(page)).to.equal(1)
        await page.select(1)
        await page.archive()
        expect(await caseListSize(page)).to.equal(0)

        page = await HomePage(driver)
        expect(await caseListSize(page)).to.equal(0)
    })
})
