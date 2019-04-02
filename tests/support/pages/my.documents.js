const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)
    await page.open(base + '/my-documents.html')
    await page.wait(1000)

    page.select = async function(id) {
        await page.click('#select-'+id)
    }
    page.archive = async function() {
        await page.click('#archive-button')
        await page.click('#yes-archive')
    }
    page.download = async function() {
        await page.click('#download-button')
        await page.wait(3000)
    }

    return page
}
