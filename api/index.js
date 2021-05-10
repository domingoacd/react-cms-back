const router = require('express').Router; 
const news = require('./routes/news');

module.exports = () => {
    const app = router();
    news(app);

    return app;
}