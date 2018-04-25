var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../app');
var expect = chai.expect;

chai.use(chaiHTTP);

describe('Application Server', function() {
  it('main application server should load index page', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});