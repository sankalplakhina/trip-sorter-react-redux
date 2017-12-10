// Root directory(NODE_PATH) for this server is defined in package.json
// "NODE_PATH": "./" from root folder
require('server.babel'); // babel registration (runtime transpilation for node)
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const dummyApiRouter = require('api/dummy');

const { apiPort } = require('config/env');

const app = express();

app.use(morgan('dev', {}));
app.use(compression());
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', dummyApiRouter);

app.listen(apiPort, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`API is up on port ${apiPort}`);
	}
});
