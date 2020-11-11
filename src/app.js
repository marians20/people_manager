require('dotenv').config();
process.env["NODE_CONFIG_DIR"] = __dirname + "\\config";
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const swg = require('./swagger_config');
const config = require('config');
const peopleRouting = require('./routings/people_routing');
const login = require('./auth/login');
const refresh = require('./auth/refresh');

const app = express();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
swg(app);
app.post('/login', login)
app.post('/refrsh', refresh)
app.use('/people', peopleRouting);
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`);
});