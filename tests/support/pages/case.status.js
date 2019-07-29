module.exports = {
    caseStatus: async(page)=>{
        var element = await page.element('table#my-cases tbody tr:nth-child(1) td:nth-child(4)')
        return await element.getText()
    }
}
