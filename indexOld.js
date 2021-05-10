const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const routes = require('./api');

app.use(routes);
app.use(cors());
app.use(express.json());
let database = null;
 

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080/",
        },
      ],
    },
    apis: ["./index.js"],
  };
  
const specs = swaggerJSDoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

  /**
   *  @swagger
   * /:
   *  get:
   *    summary: Root Get
   *    description: This Api is used to check if get method is working or not
   *    responses:
   *      200:
   *        description: To test Get Method
   * 
   */

app.get("/", (req, resp) => {
  resp.send("Your mongodb API");
});

/**
 * @swagger 
 *  components:
 *    schema:
 *      Book:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          id:
 *            type: integer
 *          title:
 *            type: string 
 */

/**
 * @swagger
 * /api/data:
 *  get:
 *    summary: To get all books from MongoDB
 *    description: This API fetchs all books data from mongodb
 *    responses:
 *      200:
 *        description: This API fetchs all books data from mongodb
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schema/Book' 
 */
/*app.get("/api/data", (req, resp) => {
  database
    .collection("books")
    .find({})
    .toArray((err, result) => {
      if (err) {
        throw err;
      }
      resp.send(result);
    });
});*/

/**
 * @swagger
 * /api/data/{id}:
 *  get:
 *    summary: To get all books from MongoDB
 *    description: This API fetchs all books data from mongodb
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: This API fetchs a specific book data from mongodb
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schema/Book' 
 */

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

/**
 * @swagger
 * /api/data/{id}:
 *  put:
 *    summary: To update a book data in mongodb
 *    description: Updates a book data
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schema/Book'
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Book updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schema/Book' 
 */

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

/**
 * @swagger
 * /api/data/{id}:
 *  delete:
 *    summary: Deletes an entry from mongodb
 *    description: Deletes a book entry
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Data is deleted
 */

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
