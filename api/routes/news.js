const express = require('express');
const ArticlesModel = require('../../models/articlesModel');
const route = express.Router();

module.exports = (app) => {
    app.use('/data', route);
    route.get("/", async (req, resp) => {
        const articleModel = new ArticlesModel;
        const allArticles = await articleModel.fetchAllArticles();
        
        resp.send(allArticles);
    });
}