const express = require('express');
const getDb = require('../../db').getDb;
const ArticlesModel = require('../../models/articlesModel');
const route = express.Router();

module.exports = (app) => {
    app.use('/data', route);
    route.get("/", async (req, resp) => {
        const db = getDb();
        const articleModel = new ArticlesModel;
        const allArticles = await articleModel.fetchAllArticles();
        
        resp.send(allArticles);
    });
}