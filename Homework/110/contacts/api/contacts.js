const express = require('express');
const router = express.Router();
router.get('/', function (_, res, _) {
	const contacts = [
		{ id: 1, first: 'George', last: 'Washington', email: 'gwashington@whitehouse.gov', phone: '4678358344' },
		{ id: 2, first: 'Abraham', last: 'Lincoln', email: 'alincoln@whitehouse.gov', phone: '3678902357' }
	  ];
	res.set("Content-Type", "application/json")
	res.send(contacts);
	console.log(contacts);
	res.end();
});

module.exports = router;