var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../app');
var fetchData = require('../libs/fetchData');
var expect = chai.expect;

chai.use(chaiHTTP);

describe('Zendesk Ticket Server Requests', function() {
  const allTicketsURL = 'https://purpleduck.zendesk.com/api/v2/tickets.json';
  const showTicketURL = (id) => `https://purpleduck.zendesk.com/api/v2/tickets/${id}.json`

  it('should get all tickets on GET', function(done) {
    fetchData(allTicketsURL)
    .then(data => {
      expect(data.count).to.equal(100);
      done();
    });
  });

  it('should get a single ticket on GET', function(done) {
    fetchData(showTicketURL(2))
    .then(data => {
      expect(data.ticket).to.exist;
      done();
    });
  });

  it('should fail to get ticket with ID = 0 that does not exist', function(done) {
    fetchData(showTicketURL(0))
    .then(data => {
      expect(data.error).to.exist;
      done();
    });
  });
});

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