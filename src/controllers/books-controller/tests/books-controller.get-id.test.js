process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../../../server'),
    mongoose = require('mongoose'),
    Books = mongoose.model('books'),
    should = chai.should();

const serviceBasePath = `${process.env.BASE_PATH}/books`;

chai.use(chaiHttp);

describe('/GET/:id books', () => {

    let instance;

    beforeEach(async () => {
        await Books.remove({});
        instance = chai.request(server);
    });

    it('should get status 400 if invalid id was provided', done => {
        instance
        .get(`${serviceBasePath}/0`)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.msg.should.be.eql('Invalid identifier');
            done();
        });
    });

    it('should return 404 if book was not found', done => {

        instance
        .get(`${serviceBasePath}/${new mongoose.Types.ObjectId()}`)
        .end((err, res) => {
            res.status.should.be.eql(404);
            res.body.msg.should.be.eql('Book not found');
            done();
        });

    });

    it('should get a book by id', done => {
        
        chai.request(server)
        .post(`${serviceBasePath}`)
        .send({
            title: 'Hobbit',
            author: 'J R R Tokien',
            pages: 377,
            year: 1900
        })
        .end((err, res) => {
            const book = res.body;

            chai.request(server)
            .get(`${serviceBasePath}/${book._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body._id.should.be.eql(book._id);
                done();
            });
        });

    });

});