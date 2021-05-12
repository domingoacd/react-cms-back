const Model = require('./baseModel');

class ArticlesModel extends Model{

    constructor() {
        super();
        this._collectionName = 'articles';
        this.collectionInstance = this._db.collection(this._collectionName);
    }

    fetchAllArticles() {
        const allArticles = this.collectionInstance.find({}).toArray();
        return allArticles;
    }

     
}

module.exports = ArticlesModel;