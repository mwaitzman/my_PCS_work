const express = require('express');
const router = express.Router();


router
	.get('/', function(req, resp) {
	resp.render("me", {name: req.cookies.name});
	})
;

module.exports = router;
