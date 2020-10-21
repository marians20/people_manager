require('dotenv').config();
process.env["NODE_CONFIG_DIR"] = __dirname + "\\config";
var express = require('express');
var bodyParser = require('body-parser');
var swg = require('./swagger_config');
const config = require('config');
var peopleRouting = require('./routings/people_routing');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
swg(app);
app.use('/people', peopleRouting);
// var env = process.env.NODE_ENV || 'development'
// console.log(`Environment is ${env}`);
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`);
});