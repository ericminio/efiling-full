const fs = require('fs')
const PDFParser = require("pdf2json")
const unzipstream = require('unzip-stream')
const { Transform } = require('stream')

const extractFileNo = function(page) {
    let start = 51;
    let fileNo = '';
    for (let i=start; i<start+6; i++) {
        fileNo += page.Texts[i].R[0].T;
    }
    return fileNo;
}
const read = function(entry, resolve) {
    let json = new Transform()
    json._writableState.objectMode = true;
    json._transform = function(data) {
        let page = data.formImage.Pages[0]
        resolve({
            path:entry.path,
            fileno:extractFileNo(page)
        })
    }
    entry.pipe(new PDFParser()).pipe(json)
}
const unzip = function(file) {
    let promises = []
    let unzip = new Promise((resolve, reject)=>{
        fs.createReadStream(file)
            .pipe(unzipstream.Parse())
            .on('entry', async (entry)=> {
                let promise = new Promise((res, rej)=>{
                    read(entry, res)
                })
                promises.push(promise)
                await promise
            })
            .on('end', async ()=>{
                resolve(await Promise.all(promises))
            })
    })
    return unzip
}
module.exports = { unzip:unzip }
