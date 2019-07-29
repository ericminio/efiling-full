const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)

    page.proceed = async ()=>{
        await page.click('#proceed')
    }

    return page
}
