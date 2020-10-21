
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const config = require('config');

module.exports = function AddSwagger(app) {
    
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
}