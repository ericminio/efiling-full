const fs = require('fs')
const path = require('path')
const process = require('process')
const { unzip } = require('./unzip')

module.exports = {
    unzip:unzip,
    fs:fs,
    path:path,
    root:process.cwd()
}
