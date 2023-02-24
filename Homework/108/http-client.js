const http = require("http");

http.get(
	process.argv[2],
	resp => {
		// lazy garbage
		if (resp.statusCode !== 200) {
			console.error(resp);
			process.exit(1);
		}
		resp.setEncoding("UTF-8");
		resp.on(
			"data",
			console.log
		);
	}
);