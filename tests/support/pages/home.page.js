const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)
    await page.open(base)

    page.caseListSize = async ()=>{
        await page.wait(1000)
        return (await page.list('table#my-cases tbody tr')).length
    }

    return page
}
