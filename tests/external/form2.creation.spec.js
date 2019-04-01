const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { HomePage, Form2CreationPage } = require('../support/pages')

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
        page = HomePage(driver)
        expect(await page.casesSize()).to.equal(0)

        page = Form2CreationPage(driver)
        await page.search('CA12345')
        await page.setPhone('7783501234')
        await page.save()

        page = HomePage(driver)
        expect(await page.casesSize()).to.equal(1)
    })
})
