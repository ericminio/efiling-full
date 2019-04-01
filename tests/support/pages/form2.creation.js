const { base } = require('./commons')
const { Page } = require('./page')

module.exports = (driver)=>{
    var page = new Page(driver)
    page.open(base + '/form.2.html')

    page.search = async (file)=>{
        await page.input('#file-no', file)
        await page.click('#find-button')
        await page.wait(1000)
    }
    page.setPhone = async (value)=>{
        await page.input('#phone', value)
    }
    page.save = async ()=>{
        await page.click('#draft')
    }

    return page
}
