'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');

const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

//Cross Origin resource sharing. REST API is on localhost:5000, React on 3000, this allows communication between the two
const cors = require('cors');

// create the Express app
const app = express();

//middleware that allows access to the body
app.use(express.json());


// setup morgan which gives us http request logging
app.use(morgan('dev'));

app.use(cors());


//Instantiate and configure the Sequelize class
(async () => {
  try {
  console.log('Connection to the database successful!');
  await sequelize.authenticate();
  } catch(error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      const err = new Error();
      err.status = 500;
      console.log('Sorry the server encountered an issue, code: ' + err.status);
    }
  }
})();

// api routes here
app.use('/api', routes);
//a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});
/** */
// (function() {
//   var cors_api_host = 'cors-anywhere.herokuapp.com';
//   var cors_api_url = 'https://' + cors_api_host + '/';
//   var slice = [].slice;
//   var origin = window.location.protocol + '//' + window.location.host;
//   var open = XMLHttpRequest.prototype.open;
//   XMLHttpRequest.prototype.open = function() {
//       var args = slice.call(arguments);
//       var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
//       if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
//           targetOrigin[1] !== cors_api_host) {
//           args[1] = cors_api_url + args[1];
//       }
//       return open.apply(this, args);
//   };
// })();
/** */
// set our port
app.set('port', process.env.PORT || 5000);



// // start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

