process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../../../server'),
    mongoose = require('mongoose'),
    Books = mongoose.model('books'),
    should = chai.should();

const serviceBasePath = `${process.env.BASE_PATH}/books`;

chai.use(chaiHttp);

describe('/GET BooksController', () => {

    beforeEach(async () => await Books.remove({}));

    it('should list all the books on /GET', done => {

        chai.request(server)
        .get(serviceBasePath)
        .end((err, res) => {

            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);

            done();
        })

    });

});