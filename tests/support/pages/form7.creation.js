const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)
    await page.open(base + '/form.7.html')

    page.confirm = async (check)=>{
        await page.click(check)
    }
    page.continueToNoticeOfAppeal = async ()=>{
        await page.click('#goto-notice-of-appeal')
    }
    page.search = async (file)=>{
        await page.input('#court-file-no', file)
        await page.click('#find-button')
        await page.wait(1000)
    }
    page.appealOrder = async (n)=>{
        await page.click('#appeal-this-order-' + n)
        await page.wait(1000)
    }
    return page
}
