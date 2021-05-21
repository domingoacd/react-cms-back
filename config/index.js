module.exports = Object.freeze({
    PORT: 8080,
    API: {
        PREFIX: '/api'
    },
    DB: {
        NAME: 'newsAppDb',
        URL: 'mongodb://localhost:27017',
        TABLES: {
            articles: 'articles'
        }
    }
});