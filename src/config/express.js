const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    booksRouter = require('../routes/books');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use(`${process.env.BASE_PATH}`, booksRouter);

module.exports = app;