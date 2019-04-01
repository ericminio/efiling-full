const { Builder } = require('selenium-webdriver')

module.exports = {
    base: 'http://localhost:3000',
    firefox: ()=> { return new Builder().forBrowser('firefox').build() }
}
