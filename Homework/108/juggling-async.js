const http = require("http");

let urls = process.argv.slice(2, 5);
const m = new Map(urls.map(url => [url, ""]));
let done = 0;
urls.forEach(url => {
	http.get(
		url,
		resp => {
			if (resp.statusCode !== 200) {
				console.error(resp);
				process.exit(1);
			}

			resp.setEncoding("UTF-8");

			resp.on("data", data => m.set(url, m.get(url) + data));

			resp.on("error", e => {
				console.error(e);
				process.exit(1);
			});

			resp.on("end", () => {
				if (++done === m.size) {
					//// Iterator.forEach is evidently not implemented for m.values. sad
					for (let v of m.values()) {
						console.log(v);
					}
				}
			});
		}
	);
});