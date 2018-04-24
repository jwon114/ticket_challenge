var express = require('express');
var app = express();
const PORT = 8080;

// node settings and static content
app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});