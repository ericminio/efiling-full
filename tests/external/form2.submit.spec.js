const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { cleanDatabase } = require('../support/data/clean.database')
const {
    HomePage,
    Form2CreationPage,
    Form2PreviewPage,
    Form2ConfirmPayment,
    Form2PaymentReceipt,
    caseListSize,
    caseStatus
} = require('../support/pages')

describe('Form2 submission', function() {

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
        await page.continueToForm()
        await page.setPhone('7783501234')
        await page.continueToPreview()

        page = await Form2PreviewPage(driver)
        await page.proceed()

        page = await Form2ConfirmPayment(driver)
        await page.confirm()

        page = await Form2PaymentReceipt(driver)
        await page.done()

        expect(await caseListSize(page)).to.equal(1)
        expect(await caseStatus(page)).to.equal('Submitted')
    })
})
