module.exports = {
    caseListSize: async(page)=>{
        return (await page.list('table#my-cases tbody tr')).length
    }
}
