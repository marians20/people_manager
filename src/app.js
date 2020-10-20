var express = require('express');
var bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

var config = require('./config/config.json');

var peopleRouting = require('./routings/people_routing');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/people', peopleRouting);

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
    apis: ["./routings/people_routing.js"],
    explorer: true,
    swaggerOptions: {
        urls: [
          {
            url: `http://localhost:${config.port}/swagger.json`,
            name: 'Spec1'
          }
        ]
      },
  };
  
  const specs = swaggerJsdoc(options);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`);
});