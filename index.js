const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

const books = [
    {title: 'Book 1', id: 1},
    {title: 'Book 2', id: 2},
    {title: 'Book 3', id: 3}
];

app.get('/', (req, res) => {
    res.send('Welcome to your API!');
});

app.get('/api/data', (req, res) => {
    res.send(books);
});

app.get('/api/data/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));

    if (!book) {
        res.status(404).send('Book not found');
    }

    res.send(book);
});

app.post('/api/data/addBook', (req, res) => {
    const book = {
        title: req.body.title,
        id: books.length + 1,
    };

    books.push(book);
    res.send(books);
});

app.put('/api/data/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));

    if (!book) {
        res.status(404).send('book not found');
    }

    book.title = req.body.title;

    res.send(books);
});

app.delete('/api/data/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('book not found');
    }

    const index = books.indexOf(book);

    books.splice(index, 1);

    res.send(books);
});
app.listen(8080);
