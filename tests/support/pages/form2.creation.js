const { base } = require('./commons')
const { Page } = require('./page')

module.exports = async (driver)=>{
    var page = new Page(driver)
    await page.open(base + '/start')

    page.search = async (file)=>{
        await page.input('#file-no', file)
        await page.click('#find-button')
        await page.wait(1000)
    }
    page.continueToForm = async ()=>{
        await page.click('#continue-to-form')
    }
    page.setPhone = async (value)=>{
        await page.input('#phone', value)
    }
    page.save = async ()=>{
        await page.click('#save-as-draft')
    }
    page.continueToPreview = async ()=>{
        await page.click('#continue')
    }

    return page
}
