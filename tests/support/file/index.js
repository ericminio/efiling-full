const fs = require('fs')
const path = require('path')
const process = require('process')
const { unzipPdfs } = require('./unzip.pdfs')
const { extractFileNo } = require('./extract.file.number')

module.exports = {
    unzipPdfs:unzipPdfs,
    extractFileNo:extractFileNo,
    fs:fs,
    path:path,
    root:process.cwd()
}
