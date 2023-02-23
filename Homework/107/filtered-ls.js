const fs = require("fs");

const target_dir = process.argv[2];
const target_ext = process.argv[3];

fs.readdir(
	target_dir,
	(e, d) => {
		if (e) throw e;
		d.filter(str => str.endsWith("." + target_ext))
		.forEach(str => console.log(str.toString()));
	}
);