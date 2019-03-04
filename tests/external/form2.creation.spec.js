const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');
var { execute } = require('yop-postgresql');

describe('Form2 creation', function() {

    var server
    var driver

    before((done)=> {
        driver = new Builder().forBrowser('firefox').build()
        execute('TRUNCATE TABLE forms;', function(rows, error) {
            expect(error).to.equal(undefined)
            done();
        });
    })

    after(async ()=> {
        await driver.quit()
    })

    it('works', async ()=> {
        await driver.get('http://localhost:3000/form.2.html')
        let file = await driver.findElement(By.id('file-no'))
        await file.sendKeys('CA12345')
        let find = await driver.findElement(By.id('find-button'))
        await find.click()
        await driver.sleep(1500)
        let appelants = await driver.findElement(By.id('appellant-name'))
        let value = await appelants.getText()

        expect(value).to.equal('Max FREE, MAX SUPERFREE')

        let phone = await driver.findElement(By.id('phone'))
        await phone.sendKeys('7783501234')
        let save = await driver.findElement(By.id('draft'))
        await save.click()

        await driver.get('http://localhost:3000')
        await driver.sleep(1000)
        let cases = await driver.findElements(By.css('table#my-cases tbody tr'))

        expect(cases.length).to.equal(1)
    })
})
