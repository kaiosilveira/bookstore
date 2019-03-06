const express = require('express'),
    router = express.Router(),
    BooksController = require('../controllers/books-controller/books-controller');

const controller = new BooksController();

router.route('/books')
    .get(controller.list)
    .post(controller.create);

router.route('/books/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete);
    
module.exports = router;