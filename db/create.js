const getDb = require('./index').getDb;
const tables = require('../config').DB.TABLES;

function createCollections() {
    const db = getDb(); 
    db.createCollection(tables.articles, {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title", "url", "time", "date", "interactions"],
                properties: {
                    title: {
                        bsonType: "string",
                        description: "Article title - String, required"
                    },
                    image: {
                        bsonType: "string",
                        description: "Image url - String, optional"
                    },
                    url: {
                        bsonType: "string",
                        description: "Article url - String, required"
                    },
                    network: {
                        bsonType: "string",
                        description: "Article news network - String, optional"
                    },
                    time: {
                        bsonType: "timestamp",
                        description: "Article creation hour - Timestamp, required",
                    },
                    date: {
                        bsonType: "date",
                        description: "Article creation date - Date, required"
                    },
                    interactions: {
                        bsonType: "object",
                        description: "Article interactions - Object, required",
                        required: ["likes, dislikes"],
                        properties: {
                            likes: {
                                bsonType: "int",
                                minimum: 0,
                                description: "Article likes - Integer, required"
                            },
                            dislikes: {
                                bsonType: "int",
                                minimum: 0,
                                description: "Article dislikes - Integer, required"
                            }
                        }
                    }
                }
            }
        }
    });
}


module.exports = createCollections;