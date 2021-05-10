const express = require('express');
const route = express.Router();

module.exports = (app) => {
    app.use('/data', route);
    
    route.get("/", (req, resp) => {
        database
            .collection("books")
            .find({})
            .toArray((err, result) => {
            if (err) {
                throw err;
            }
            resp.send(result);
            });
    });
}