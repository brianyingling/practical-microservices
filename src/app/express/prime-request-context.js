const { v4: uuid } = require('uuid');

// This is to set up variables for every request.
// Here we are creating a traceId for every request, so that
// we can use these in logs
function primeRequestContext (req, res, next) {
	req.context = {
		traceId: uuid()
	}
	next();
}

module.exports = primeRequestContext;
