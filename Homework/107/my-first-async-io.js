const fs = require("fs");

fs.readFile(
	process.argv[2],
	"utf-8",
	(e, d) => {
		if (e) throw e;
		console.log(d.split('\n').length - 1);
	}
);