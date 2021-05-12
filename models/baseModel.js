const getDb = require('../db').getDb;

class Model {
    constructor() {
        this._db = getDb()
    }
}

module.exports = Model;