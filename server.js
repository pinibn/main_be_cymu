const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');

//internal imports
const config = require('./config/default');
const emailRoute = require('./lib/routes/email.route');

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// TLS 
const privateKey = fs.readFileSync('server.key');
const certification = fs.readFileSync('server.cert');

//Routes (APIs)
app.use('', emailRoute);

// Fire up the https server and connect to mongo DB
mongoose.connect(config.mongodb.url)
.then( () => {
    console.log('db connection established successfully');
    https.createServer({key: privateKey, cert: certification }, app)
    .listen(config.server.port, ()=> {
        console.log('Main BE running on port ' + config.server.port + ' (https)');
})
}).catch(err => {
    console.log('Error connecting DB, terminating. msg: ', err);
});