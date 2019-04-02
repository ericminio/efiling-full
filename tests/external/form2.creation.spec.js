const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { cleanDatabase } = require('../support/data/clean.database')
const { HomePage, Form2CreationPage, caseListSize } = require('../support/pages')

describe('Form2 creation', function() {

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
        page = await HomePage(driver)
        expect(await caseListSize(page)).to.equal(0)

        page = await Form2CreationPage(driver)
        await page.search('CA12345')
        await page.setPhone('7783501234')
        await page.save()

        page = await HomePage(driver)
        expect(await caseListSize(page)).to.equal(1)
    })
})
