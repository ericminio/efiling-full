const { expect } = require('chai')
const { firefox } = require('../support/pages/commons')
const { cleanDatabase } = require('../support/data/clean.database')
const { Form2CreationPage, MyDocumentsPage } = require('../support/pages')

var fs = require('fs')
var path = require('path')
var process = require('process')

describe('Form2 download', function() {

    var driver
    var page
    var file = path.join(process.cwd(), 'tests', 'download', 'forms.zip')

    before((done)=> {
        try{
            fs.unlinkSync(file)
        }
        catch (ignored) {}

        driver = firefox()
        cleanDatabase(done)
    })

    after(async ()=> {
        await driver.quit()
    })

    it('works', async ()=> {
        page = Form2CreationPage(driver)
        await page.search('CA12345')
        await page.setPhone('7783501234')
        await page.save()

        page = MyDocumentsPage(driver)
        await page.wait(1000)
        await page.select(1)
        await page.download()

        const PDFParser = require("pdf2json")
        const { Transform } = require('stream')
        var unzip = require('unzip-stream')
        const { Readable } = require('stream')

        var content = fs.readFileSync(file)
        var files = []
        const stream = new Readable();
        stream._read = () => {
            stream.push(content)
            stream.push(null)
        }
        var unzip = await new Promise((resolve, reject)=>{
            stream
                .pipe(unzip.Parse())
                .on('entry', function (entry) {
                    expect(entry.path).to.equal('form2-1.pdf')

                    var extractFileNo = function(page) {
                        var start = 52;
                        var fileNo = '';
                        for (var i=start; i<start+3; i++) {
                            fileNo += page.Texts[i].R[0].T;
                        }
                        return fileNo;
                    }
                    let json = new Transform();
                    json._writableState.objectMode = true;
                    json._transform = function(data) {
                        let page = data.formImage.Pages[0];

                        expect(extractFileNo(page)).to.equal('123');
                        resolve('ok')
                    };
                    entry.pipe(new PDFParser()).pipe(json);
                })
        })
        expect(unzip).to.equal('ok')
    })
})
