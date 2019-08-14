module.exports = {
    packageNumber: async(page)=>{
        var element = await page.element('#package-number')
        return await element.getText()
    }
}
