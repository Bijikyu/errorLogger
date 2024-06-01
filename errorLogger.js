const util = require('util');


function errorLogger(error, context, res, next) {
	console.log(`errorLogger is running with simple context: ${context}`); // Simple context log
	//console.log(`errorLogger is running with detailed context: ${util.inspect(context)}`); // Inspect for detailed object logging
	const timestamp = new Date().toISOString();
	const {
		message = 'An error occurred', // Default message
		statusCode = 500, // Default HTTP status code
		isOperational = true, // Flag if error is operational or programmer error
	} = error;
	const errorLog = {
		timestamp,
		message,
		statusCode,
		isOperational,
		context,
		stack: error.stack // Capture the stack trace
	};
	console.error(JSON.stringify({
		...errorLog,
		stack: errorLog.stack.split('\n') // Split stack trace into an array
	}, null, 2)); // Pretty print the error log
	console.log(`errorLogger has run`); // Logging completion

	if (res && !res.headersSent) {res.status(statusCode).render('error', {error: errorLog})};
	if (next) {next(error);}; // Pass the error to the next middleware
}


module.exports = errorLogger;