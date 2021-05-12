const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const CONFIG = require('../config');

let _db;


const initDb = () => {
    
    if (_db) {
        console.warn('Database was already initialized!');
    }

    
    const connected = (err, result) => {
        if (err) {
            throw err;
        }

        console.log('Successfully connected to database ' + CONFIG.DB.NAME);

        _db = result.db(CONFIG.DB.NAME);
    }

    MongoClient.connect(
        CONFIG.DB.URL,
        connected
    );
}

const getDb = () => {
    assert.ok(_db, "Database has not been initialized.");
    return _db;
}

module.exports = {
    getDb,
    initDb
}