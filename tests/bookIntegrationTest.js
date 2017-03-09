var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);


describe('Book crud test', function () {
    it("Should allow a book to be posted and return read and _id", function(done) {
          var bookPost = {
             title: "new book",
             author: "jon",
             genre: "fiction"
          };

          agent.post('/api/books')
                .send(bookPost)
                .expect(200)
                .end(function(err, results) {
                    console.log(results);
                    results.body.read.should.equal(false);
                    results.body.should.have.property('_id');
                    done();
                });

         afterEach(function(done) {
            Book.remove().exec();
            done();
         });
    });
})