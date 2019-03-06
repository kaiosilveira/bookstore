process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../../../server'),
    mongoose = require('mongoose'),
    Books = require('../../../models/Books'),
    should = chai.should();

const serviceBasePath = `${process.env.BASE_PATH}/books`;

chai.use(chaiHttp);

describe('/PUT books', () => {

    let book;

    beforeEach(() => {
        return new Promise(async (resolve, reject) => {
            book = await Books.create({
                title: 'Hobbit',
                author: 'J R R Tokien',
                pages: 377,
                year: 1900
            });
            resolve();
        });
    });

    it('should return 400 if body was empty', done => {
        
        const id = new mongoose.Types.ObjectId();

        chai.request(server)
        .put(`${serviceBasePath}/${id}`)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.msg.should.be.eql('Body was empty.');

            done();
        });

    });

    it('should return 400 if id and book.id was different', done => {

        const otherId = new mongoose.Types.ObjectId();
        chai.request(server)
        .put(`${serviceBasePath}/${otherId}`)
        .send(book)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.msg.should.be.eql('Provided id and obj id isnt the same');

            done();
        });

    });

});