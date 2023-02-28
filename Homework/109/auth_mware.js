module.exports = (req, res, next) => {
	const idx = req.url.indexOf('?');
	if (idx === -1) {
		res.end("You're fat, and you're ugly. Leave now")
		return;
	}
	if (
		req.url.substring(idx + 1)
		.split('&')
		.map(s => s.split('='))
		//// for some reason, `.some(e => e === ["magicWord", "please"])` fails. RIP ergonomics I guess
		.some(([k, v]) => k === "magicWord" && v ==="please")
	) {
		next();
	} else {
		res.statusCode = 403;
		res.end("No buffoons allowed. Yes, this means you. Scram");
	}
};