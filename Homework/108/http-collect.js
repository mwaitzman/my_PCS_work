const http = require("http");

let b = "";
http.get(
	process.argv[2],
	resp => {
		if (resp.statusCode !== 200) {
			console.error(resp);
			process.exit(1);
		}
		resp.setEncoding("UTF-8");

		resp.on("data", d => b += d);
		resp.on("error", e => {
			console.error(e);
			process.exit(1);
			}
		);
		resp.on("end", () => {
			console.log(`${b.length}\n${b}`);
		});
	}
);