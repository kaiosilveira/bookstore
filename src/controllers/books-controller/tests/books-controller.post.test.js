process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../../../server'),
    mongoose = require('mongoose'),
    Books = mongoose.model('books'),
    should = chai.should();

const serviceBasePath = `${process.env.BASE_PATH}/books`;

chai.use(chaiHttp);

describe('/POST books', () => {

    let instance; 

    beforeEach(() => instance = chai.request(server))

    it('should return 400 if body is empty at /POST', done => {

        instance
        .post(serviceBasePath)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.msg.should.be.a('string');
            res.body.msg.should.be.eql('Bad request, body empty');
            done();
        });

    });

    it('should create a book on /POST', done => {

        instance
        .post(serviceBasePath)
        .send({
            title: 'Hobbit',
            author: 'J R R Tokien',
            pages: 377,
            year: 1900
        })
        .end((err, res) => {
            res.should.have.status(201);
            res.body._id.should.be.a('string');
            done();
        });

    });

});
