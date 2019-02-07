const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Selenium', function() {

    var server;
    var driver;

    beforeEach(function(done) {
        driver = new Builder().forBrowser('firefox').build();
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
        driver.quit();
    });

    it('is ready', function(done) {
        driver.get('http://localhost:5000/').then(
            function() {
                var element = driver.findElement(By.id('greetings'));
                element.getText().then(
                    function(value) {
                        expect(value).to.equal('welcome');
                        done();
                    },
                    function(error) {
                        expect(JSON.stringify(error)).to.equal(undefined);
                        done();
                    }
                );
            },
            function(error) {
                expect(JSON.stringify(error)).to.equal(undefined);
                done();
            }
        );
    });
});
