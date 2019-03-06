process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../../../server'),
    mongoose = require('mongoose'),
    Books = mongoose.model('books'),
    should = chai.should();

const serviceBasePath = `${process.env.BASE_PATH}/books`;

chai.use(chaiHttp);

describe('/DELETE books', () => {

    let id;

    beforeEach(() => {

        return new Promise(async (resolve, reject) => {

            const book = await Books.create({
                title: 'Hobbit',
                author: 'J R R Tokien',
                pages: 377,
                year: 1900
            });

            id = book._id;

            resolve();
        });

    });

    it('should throw 404 if corresponding object from given id was not found', done => {
        chai.request(server)
        .delete(`${serviceBasePath}/${new mongoose.Types.ObjectId()}`)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.msg.should.be.eql('Book not found');
            done();
        });
    });

    it('should delete a book by id', () => {
        chai.request(server)
        .delete(`${serviceBasePath}/${id}`)
        .end((err, res) => {
            res.should.have.status(200);
        });
    });

});