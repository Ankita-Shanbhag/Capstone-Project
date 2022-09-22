var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
var axios = require("axios").default;
const { auth } = require('express-openid-connect');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_LOCAL_PORT,
    MONGO_DB,
    SECRET
  } = process.env;

app.use(express.static('public'));
app.use(cors());

// var options = {
//     method: 'PATCH',
//     url: 'https://capstoneproject-app.us.auth0.com/api/v2/clients/oZXqFupwrzJAacuXyQwOT3joRQQ9FQGi',
//     headers: {
//         'content-type': 'application/json',
//         authorization: 'Bearer API2_ACCESS_TOKEN',
//         'cache-control': 'no-cache'
//     },
//     data: {initiate_login_uri: 'localhost:27017'}
// };

// axios.request(options).then(function (response) {
//     console.log(response.data);
//     }).catch(function (error) {
//     console.error(error);
// });

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: `${SECRET}`,
//     baseURL: `${MONGO_HOSTNAME}:3000`,
//     clientID: 'oZXqFupwrzJAacuXyQwOT3joRQQ9FQGi',
//     issuerBaseURL: 'https://capstoneproject-app.us.auth0.com'
// };
  
// // auth router attaches /login, /logout, and /callback routnode es to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
// res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile', auth(), (req, res) => {
// res.send(JSON.stringify(req.oidc.user));
// });

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

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);