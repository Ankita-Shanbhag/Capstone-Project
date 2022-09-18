var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

app.use(express.static('public'));
app.use(cors());

//create account
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.create(req.params.name, req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

//all accounts
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

//log in
app.get('/account/login/:email/:password', function (req, res) {
    dal.findOne(req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

//deposit amount
app.get('/account/deposit/:email/:amount', function (req, res) {
    dal.update(req.params.email, req.params.amount).
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

//withdraw amount
app.get('/account/withdraw/:email/:amount', function (req, res) {
    dal.update(req.params.email, -1 * req.params.amount).
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);