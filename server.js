var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/web');
var apiRoutes = require('./routes/api');
var migrateRoutes = require('./routes/migrate');


var mongoose = require('mongoose');
mongoose.connect('mongodb://klb:klb@localhost/klb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to mongo KLB");
});

var port = 3000;
var app = express();

app.use(express.static(path.join(__dirname, 'client/src')));
app.use('/node_modules', express.static(path.join(__dirname, 'client/node_modules')));
app.use('/bower_components', express.static(path.join(__dirname, 'client/bower_components')));
app.use('/data', express.static(path.join(__dirname, 'client/data')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/', routes);
app.use('/api', apiRoutes);
app.use('/migrate', migrateRoutes);

app.listen(port, function () {
    console.log("Running on port " + port);
});