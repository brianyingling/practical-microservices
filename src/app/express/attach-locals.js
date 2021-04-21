
// We're rendering all of the UI on the server.
// This ensures that the context we set up is 
// available when rendering the UI.
function attachLocals(req, res, next) {
	res.locals.context = req.context;
	next();
}

module.exports = attachLocals;