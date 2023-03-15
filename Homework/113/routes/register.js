const express = require('express');
const router = express.Router();


router
	.get('/', function(_req, resp) {
	resp.render("register");
	})
	.post("/", (req, resp) => {
		const name = req.body.name;
		resp.cookie("name", name);
		resp.redirect("/me");
	})
;

module.exports = router;
