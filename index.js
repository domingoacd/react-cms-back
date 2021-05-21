const express = require("express");
const CONFIG = require('./config');
const cors = require('cors');
const routes = require('./api');
const initDb = require('./db').initDb;

const app = express();

app.use(cors());
app.use(express.json());
app.use(CONFIG.API.PREFIX, routes());

app.listen(CONFIG.PORT, initDb);
