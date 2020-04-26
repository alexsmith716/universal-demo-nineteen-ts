export default req => ({

	device: {
		userAgent: req.userAgent,
		isBot: req.isBot
	},

	counterPreloaded: {
		counterPreloadedState: req.counterPreloadedState,
	},

});
