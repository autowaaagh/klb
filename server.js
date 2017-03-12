var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var port = 3000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client/src')));
app.use('/node_modules', express.static(path.join(__dirname, 'client/node_modules')));
app.use('/bower_components', express.static(path.join(__dirname, 'client/bower_components')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);

app.listen(port, function () {
    console.log("Running on port " + port);
});