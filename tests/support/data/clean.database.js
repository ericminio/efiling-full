const { expect } = require('chai')
const { execute } = require('yop-postgresql')

cleanDatabase = function(done) {
    var statements = [
        'TRUNCATE TABLE forms;',
        'alter sequence forms_id_seq restart'
    ]
    execute(statements, (rows, error)=> {
        expect(error).to.equal(undefined)
        done()
    })
}

module.exports = {
    cleanDatabase:cleanDatabase
}
