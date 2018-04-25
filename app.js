var express = require('express');
var fetch = require('node-fetch');
var _ = require('lodash');
var app = express();
// import API fetch function
var fetchData = require('./libs/fetchData');

// globals
const PORT = 8080;
const ticketsPerPage = 25;
const baseURL = 'https://purpleduck.zendesk.com';
const username = 'jthgwong@gmail.com' + '/token';
const password = 'bWZ7jgNslo3rZOb5gEd0Pk0doL5tKLZ04VNB5UvU';
var pageId;

// functions for building API URL endpoints
const pageTickets = (pageId) => `${baseURL}/api/v2/tickets.json?page=${pageId}&per_page=${ticketsPerPage}`;
const showTicket = (id) => `${baseURL}/api/v2/tickets/${id}.json`;
const getUser = (id) => `${baseURL}/api/v2/users/${id}.json`;

// node settings and static content
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/node_modules/materialize-css/dist/'));

// calculates how many pages there should be
function calculatePages(total, perPage) {
  if (total % perPage === 0) {
    return _.range(1, (total / perPage) + 1);
  } else { 
    return _.range(1, Math.floor(total / perPage) + 2);
  }
}

// single ticket view
app.get('/tickets/:id', function(req, res) {
  var ticketDetails;
  fetchData(showTicket(req.params.id))
  .then(data => {
    // handle if there is an error returned
    if (data.error) {
      res.render('pages/error', { error: data.error.split(/(?=[A-Z])/).join(" ") })
    }

    ticketDetails = data.ticket;
    // get the requester details
    fetchData(getUser(data.ticket.requester_id))
    .then(data => {
      res.render('pages/ticket', { ticketDetails, pageId, requester: data.user.name })
    })
  })
  .catch(err => {
    // catch API fetch errors
    res.render('pages/error', { error: 'Something went wrong, ' + err.status + ' ' + err.statusText })
  })
});

// all tickets with pagination
app.get('/tickets', function(req, res) {
  req.query.page ? pageId = req.query.page : pageId = 1;
  fetchData(pageTickets(pageId))
  .then(data => {
    // handle if there is an error returned
    if (data.error) {
      res.render('pages/error', { error: data.error.split(/(?=[A-Z])/).join(" ") })
    }

    // if no tickets
    if (data.tickets.length === 0) {
      res.render('pages/error', { error: 'No Tickets Here' })
    }

    // if there are tickets to view
    var totalTickets = data.count;
    var totalPages = calculatePages(totalTickets, ticketsPerPage);
    res.render('pages/index', { tickets: data.tickets, totalPages, pageId, totalTickets, prevPageId: data.previous_page, nextPageId: data.next_page });
  })
  .catch(err => {
    // catch API fetch errors
    res.render('pages/error', { error: 'Something went wrong, ' + err.status + ' ' + err.statusText })
  })
});

// redirect root to the first page of search
app.get('/', function(req, res) {
  res.redirect('/tickets?page=1');
});

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});

module.exports = app;