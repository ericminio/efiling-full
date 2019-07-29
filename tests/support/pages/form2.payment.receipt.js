const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)

    page.done = async ()=>{
        await page.click('#done')
    }

    return page
}
