const { base } = require('./commons')
const { Page } = require('./page')

module.exports = (driver)=>{
    var page = new Page(driver)
    page.open(base + '/my-documents.html')

    page.select = async function(id) {
        await page.click('#select-'+id)
    }
    page.archive = async function() {
        await page.click('#archive-button')
        await page.click('#yes-archive')
    }
    page.casesSize = async function() {
        await page.wait(1000)
        return (await page.list('table#my-cases tbody tr')).length
    }

    return page
}
