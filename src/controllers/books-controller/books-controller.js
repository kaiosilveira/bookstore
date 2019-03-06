const Books = require('../../models/Books');

class BooksController {

    async list(req, res) {
        try {
            const books = await Books.find();
            res.json(books);
        } catch (ex) {
            console.log('EXECUTION ERROR', ex);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }

    async create(req, res) {
        
        const book = req.body;
        const isValid = Object.keys(book).length > 0;

        if (!isValid) {
            res.status(400).json({ msg: 'Bad request, body empty' });
            return;
        }

        try {
            const createdBook = await Books.create(book);
            res.status(201).json(createdBook);
        } catch (ex) {
            console.log('EXECUTION ERROR', ex);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }

    async get(req, res) {

        try {

            const id = req.params.id;

            if (!id || id === '0') {
                res.status(400).json({ msg: 'Invalid identifier' });
                return;
            }
    
            const book = await Books.findOne({ _id: id });

            if (!book) {
                res.status(404).json({ msg: 'Book not found' });
                return;
            }

            res.json(book);

        } catch (ex) {
            console.log('EXECUTION ERROR', ex);
            res.status(500).json({ msg: 'Internal Server Error' });
        }

    }

    async update(req, res) {

        try {
            const id = req.params.id;
            const obj = req.body;
            const objectIsvalid = Object.keys(obj).length > 0;

            if (!objectIsvalid) {
                res.status(400).json({ msg: 'Body was empty.' });
                return;
            }

            if (id !== obj._id) {
                res.status(400).json({ msg: 'Provided id and obj id isnt the same' });
                return;
            }

        } catch (ex) {
            console.log(ex);
            res.status(500).json({ msg: 'Internal Server Error'});
        }
    }

    async delete(req, res) {

        try {
            const id = req.params.id;
            const obj = await Books.findOne({ _id: id });
            
            if (!obj) {
                res.status(404).json({ msg: 'Book not found' });
                return;
            }

            await Books.deleteOne({ _id: id });
            res.end();

        } catch (ex) {
            console.log(ex);
            res.status(500).json({ msg: 'Internal server Error'});
        }

    }

}

module.exports = BooksController