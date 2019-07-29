const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)

    page.confirm = async ()=>{
        await page.click('#payment-confirmed')
        await page.wait(3000)
    }

    return page
}
