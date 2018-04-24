var express = require('express');
var fetch = require('node-fetch');
var app = express();

const PORT = 8080;
const ticketsPerPage = 25;
const baseURL = 'https://purpleduck.zendesk.com';
const pageTickets = (pageId) => `${baseURL}/api/v2/tickets.json?page=${pageId}&per_page=${ticketsPerPage}`;
var pageId;

// node settings and static content
app.set('views', './views');
app.set('view engine', 'ejs');

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
    res.render('pages/index', { tickets: data.tickets });
  })
});

// redirect root to the first page of search
app.get('/', function(req, res) {
  res.redirect('/tickets?page=1');
});

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});