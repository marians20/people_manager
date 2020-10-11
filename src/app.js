var express = require('express');
var bodyParser = require('body-parser');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

var config = require('./config/config.json');
var routing = require('./routing');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
routing.config(app);

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "People Manager",
        version: "0.1.0",
        description:
          "People Manager",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        }
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: ["routing.js"],
    explorer: true,
    swaggerOptions: {
        urls: [
          {
            url: 'http://petstore.swagger.io/v2/swagger.json',
            name: 'Spec1'
          },
          {
            url: 'http://petstore.swagger.io/v2/swagger.json',
            name: 'Spec2'
          }
        ]
      },
  };
  
  const specs = swaggerJsdoc(options);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/api-docs', function(req, res, next){
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`);
});