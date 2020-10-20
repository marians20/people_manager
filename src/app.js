var express = require('express');
var bodyParser = require('body-parser');
var swg = require('./swagger_config');
var config = require('./config/config.json');
var peopleRouting = require('./routings/people_routing');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
swg(app);
app.use('/people', peopleRouting);

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`);
});