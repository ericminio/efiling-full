const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { cleanDatabase } = require('../support/data/clean.database')
const { Form2CreationPage, MyDocumentsPage } = require('../support/pages')
const { unzipPdfs, fs, path, root, extractFileNo } = require('../support/file')

describe('Form2 download', function() {

    var driver
    var page
    var zip = path.join(root, 'tests', 'download', 'forms.zip')

    before((done)=> {
        try{
            fs.unlinkSync(zip)
        }
        catch (ignored) {}

        driver = firefox()
        cleanDatabase(done)
    })

    after(async ()=> {
        await driver.quit()
    })

    it('works', async ()=> {
        page = await Form2CreationPage(driver)
        await page.search('CA11111')
        await page.continueToForm()
        await page.setPhone('7783501111')
        await page.save()
        page = await Form2CreationPage(driver)
        await page.search('CA22222')
        await page.continueToForm()
        await page.setPhone('7783502222')
        await page.save()

        page = await MyDocumentsPage(driver)
        await page.select(1)
        await page.select(2)
        await page.download()

        var files = await unzipPdfs(zip, extractFileNo)
        expect(files.length).to.equal(2)
        expect(files).to.deep.include({ path:'form2-1.pdf', data:{ fileno:'A11111' } })
        expect(files).to.deep.include({ path:'form2-2.pdf', data:{ fileno:'A22222' } })
    })
})
