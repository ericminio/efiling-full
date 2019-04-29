const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { cleanDatabase } = require('../support/data/clean.database')
const { HomePage, Form7CreationPage, caseListSize } = require('../support/pages')

describe.only('Form7 creation', function() {

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

        page = await Form7CreationPage(driver)
        await page.confirm('#no-outside-time-limit')
        await page.confirm('#no-asking-for-fees-waived')
        await page.confirm('#no-appealing-order-of-supreme-court-master')
        await page.confirm('#no-appealing-province-court-order')
        await page.confirm('#yes-representing-yourself')

        await page.continueToNoticeOfAppeal()
        await page.search('20181126')

        await page.appealOrder(1)
    })
})
