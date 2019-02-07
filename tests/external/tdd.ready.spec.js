const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Selenium', function() {

    var server;

    beforeEach(function(done) {
        server = require('http').createServer(function(request, response) {
            var index =
            `
                <html>
                    <head><title>hello</title></head>
                    <body>
                        <div id="greetings" style="display:inline-block">welcome</div>
                    </body>
                </html>
            `;
            response.writeHead(200, { 'content-type':'text/html' });
            response.end(index);
        }).listen(5000, done);
    });

    afterEach(function() {
        server.close();
    });

    it('is ready', async function() {
        let driver = await new Builder().forBrowser('firefox').build();
        try {
            await driver.get('http://localhost:5000');
            let element = await driver.findElement(By.id('greetings'));
            let value = await element.getText()
            expect(value).to.equal('welcome');
        }
        catch (error) {
            expect(error).to.equal(undefined)
        }
        finally {
            await driver.quit();
        }
    });
});
