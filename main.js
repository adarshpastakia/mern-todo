// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software

// imports
const path = require('path');
const http = require('http');
const https = require('https');

// create express instance
const express = require('express');
const app = express();
app.set('host', 'localhost');
app.set('port', 8080);
app.set('ports', 8443);

// enable cors
const cors = require('cors');
app.use(cors({'origin': '*', 'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE', 'preflightContinue': false, 'optionsSuccessStatus': 204}));

// add middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

// add the routes
app.use('/api', require('./api/routes'));

// inject swagger
require('./api/swagger')(app);

// add error handler after all routes
const isDev = true;
app.use((err, req, res) => {
  console.info("app")
  console.warn(err)
  res.status(500).json({
    error: 500,
    message: 'Internal Server Error!',
    stack: isDev
      ? err.stack
      : null
  })
});

// add spa last to handle any unknown route to redirect to public/index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// start the api server
// openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
// openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
const fs = require('fs');
const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};
https.createServer(options, app).listen(app.get('ports'), () => {
  console.info('Express server listening on port https//localhost:' + app.get('ports'));
});

// Redirect from http port 80 to https
http.createServer(function(req, res) {
  const secureUrl = req.headers['host'].replace(/:\d+/, ':8443');
  res.writeHead(301, {"Location": `https://${secureUrl}${req.url}`});
  res.end();
}).listen(app.get('port'), () => {
  console.info('Express server listening on port http//localhost:' + app.get('port'));
});
