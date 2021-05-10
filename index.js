const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const CONFIG = require('./config');
const app = express();
const cors = require('cors');
const routes = require('./api');

app.use(CONFIG.API.PREFIX, routes());
app.use(cors());
app.use(express.json());
let database = null;

app.listen(8080, () => {
  MongoClient.connect(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true },
    (error, result) => {
      if (error) {
        throw error;
      }

      database = result.db("mydatabase");

      console.log("Connection successful");
    }
  );
});
