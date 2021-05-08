const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
let database = null;

app.use(express.json());

app.get("/", (req, resp) => {
  resp.send("Your mongodb API");
});

app.get("/api/data", (req, resp) => {
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

app.get("/api/data/:id", (req, resp) => {
  database
    .collection("books")
    .find({ id: parseInt(req.params.id) })
    .toArray((err, result) => {
      if (err) {
        throw err;
      }

      resp.send(result);
    });
});

app.put("/api/data/:id", (req, resp) => {
  let query = { id: parseInt(req.params.id) };
  let book = {
    id: parseInt(req.params.id),
    title: req.body.title,
  };
  let dataSet = {
    $set: book,
  };

  database.collection("books").updateOne(query, dataSet, (err, result) => {
    if (err) {
      throw err;
    }

    resp.send(book);
  });
});

app.post("/api/data/addBook", (req, resp) => {
  let lastItem = database
    .collection("books")
    .find({})
    .sort({ id: -1 })
    .limit(1);

  lastItem.forEach((obj) => {
    if (obj) {
      let book = {
        id: obj.id + 1,
        title: req.body.title,
      };

      database.collection("books").insertOne(book, (err, result) => {
        if (err) {
          resp.status(500).send(err);
        }

        resp.send("Added succesfully");
      });
    }
  });
});

app.delete('/api/data/:id', (req, resp) => {
    database.collection('books').deleteOne({id: parseInt(req.params.id)}, (err, result) => {
        if (err) {
            throw err;
        }

        resp.send('Book deleted!');
    });
});

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
