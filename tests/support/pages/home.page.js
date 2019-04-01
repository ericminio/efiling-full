const { base } = require('./commons')
const { Page } = require('./page')

module.exports = (driver)=>{
    var page = new Page(driver)
    page.open(base)

    page.casesSize = async ()=>{
        await driver.sleep(1000)
        return (await page.list('table#my-cases tbody tr')).length
    }

    return page
}
