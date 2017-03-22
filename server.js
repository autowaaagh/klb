var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');

var port = 3000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client/src')));
app.use('/node_modules', express.static(path.join(__dirname, 'client/node_modules')));
app.use('/bower_components', express.static(path.join(__dirname, 'client/bower_components')));
app.use('/data', express.static(path.join(__dirname, 'client/data')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);

app.post('/:id', function (req, res) {
    var id = req.params.id;
    var json = JSON.stringify(req.body);

    fs.writeFile('client/data/' + id, json, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('/data/' + id + ' was POSTed successfully');
        }

        res.send('post complete');
    });
});

app.delete('/:id', function (req, res) {
    var id = req.params.id;

    fs.unlink('client/data/' + id, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('/data/' + id + ' was DELETEd successully');
        }

        res.send('delete complete');
    });
})

app.listen(port, function () {
    console.log("Running on port " + port);
});