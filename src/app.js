var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config.json');
var routing = require('./routing');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
routing.config(app);

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`);
});