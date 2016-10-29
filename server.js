const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const routes = require('./routes/routes');
//const connection = require('./connection');
const methodOverride = require('method-override');

var app = express();

mongoose.connect("mongodb://localhost/MeanMapApp");
//connection.connect();

app.use(express.static(__dirname + 'public'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());



require('./routes/routes.js')(app);
//app.use('/routes', routes);
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});


var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port); //actual port listening on
});
