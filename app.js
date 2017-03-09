var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var app = express(),db;

if (process.env.ENV === 'Test') {
    console.log('test');
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    console.log('normal');
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extendted: true }));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);


app.get('/', function(req, res) {
    res.send('Welcome to my api');
});

app.listen(port, function() {
    console.log('Running on new port: ' + port);
});

module.exports = app;
