// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software
const path = require('path');

module.exports = (app) => {
  // initialize swagger
  const swaggerJSDoc = require('swagger-jsdoc');
  // swagger definition
  const swaggerDefinition = {
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'ToDo API',
      description: 'API services for ToDo Application',
      license: {
        name: 'MIT',
        url: 'http://opensource.org/licenses/MIT'
      }
    },
    schemes: [
      'https', 'http'
    ],
    host: ``,
    basePath: '/api'
  };
  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./defs/swagger.yaml']
  };
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);
  const injectSwaggerSpec = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  };

  app.get('/swagger.json', injectSwaggerSpec);
  app.get('/swagger', (req, res) => res.sendFile(path.join(__dirname, '/public/swagger/index.html')));
}
