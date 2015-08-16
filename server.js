var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var api = require('./server/routes/rsvps');

// Database setup
var uri = 'mongodb://localhost:27017/ChellieWedding';

var db = mongoose.connect(uri, {}, function(err) {
    if (err) {
        console.error('Could not connect to MongoDB!');
        console.log(err);
    }
});

mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        console.error('Exiting');
        process.exit(-1);
    }
);

// Express setup
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/api', api);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");
