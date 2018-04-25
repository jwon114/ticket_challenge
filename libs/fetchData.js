const fetch = require('node-fetch');
const username = 'jthgwong@gmail.com' + '/token';
const password = 'bWZ7jgNslo3rZOb5gEd0Pk0doL5tKLZ04VNB5UvU';

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

module.exports = fetchData;