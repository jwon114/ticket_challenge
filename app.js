var express = require('express');
var fetch = require('node-fetch');
var _ = require('lodash');
var app = express();

// globals
const PORT = 8080;
const ticketsPerPage = 25;
const baseURL = 'https://purpleduck.zendesk.com';
var pageId;

// functions for building API URL endpoints
const pageTickets = (pageId) => `${baseURL}/api/v2/tickets.json?page=${pageId}&per_page=${ticketsPerPage}`;
const showTicket = (id) => `${baseURL}/api/v2/tickets/${id}.json`;

// node settings and static content
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/node_modules/materialize-css/dist/'));

function fetchData(url) {
  return (
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
  )
}

function calculatePages(total, perPage) {
  if (totalTickets % ticketsPerPage === 0) {
    return _.range(1, (totalTickets / ticketsPerPage) + 1);
  } else { 
    return _.range(1, Math.floor(totalTickets / ticketsPerPage) + 2);
  }
}

function paginationIds(prevPage, nextPage, pageId) {
  var previousId = null;
  var nextId = null;
  if (prevPage !== null) previousId = parseInt(pageId) - 1;
  if (nextPage !== null) nextId = parseInt(pageId) + 1;
  return [previousId, nextId];
}

app.get('/tickets/:id', function(req, res) {
  fetchData(showTicket(req.params.id))
  .then(data => {
    res.render('pages/ticket', { ticketDetails: data.ticket, pageId })
  })
});

app.get('/tickets', function(req, res) {
  req.query.page ? pageId = req.query.page : pageId = 1;
  fetchData(pageTickets(pageId))
  .then(data => {
    if (data.tickets.length !== 0) {
      var totalTickets = data.count;
      var totalPages = calculatePages(totalTickets, ticketsPerPage);
      var [prevPageId, nextPageId] = paginationIds(data.previous_page, data.next_page, pageId);
      res.render('pages/index', { tickets: data.tickets, totalPages, pageId, prevPageId, nextPageId, totalTickets });
    } else {

    }
  })
});

// redirect root to the first page of search
app.get('/', function(req, res) {
  res.redirect('/tickets?page=1');
});

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});