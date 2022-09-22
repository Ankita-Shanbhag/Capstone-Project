const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_LOCAL_PORT,
    MONGO_DB
  } = process.env;
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_LOCAL_PORT}`;
console.log(url);
const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true
  };
let db = null;

// connect to mongo
MongoClient.connect(url, options, function (err, client) {
    console.log("Connected successfully to db server");
    // connect to database
    db = client.db(MONGO_DB);
});

// create user account using the collection.insertOne function
function create(name, email, password) {
    console.log("Creating new user account");
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('customers');
        const doc = {name, email, password, balance: 0};
        customers.insertOne(doc, {w: 1}, function (err, docs) {
                    err ? reject(err) : resolve(docs);
                }
            );
    });}

// find user account 
function find(email) {
    console.log("Finding user account by email");
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('customers')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    console.log("Finding one user account by email");
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('customers')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    console.log("Updating user account by email");
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('customers')
            .findOneAndUpdate(
                { email: email },
                { $inc: 
                    { balance: Number(amount)} 
                },
                { returnOriginal: false },
                { new: true },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// return all users by using the collection.find method
function all() {
    console.log("Returning all user accounts");
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('customers')
            .find({})
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })}


module.exports = { create, findOne, find, update, all };