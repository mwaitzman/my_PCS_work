const app = require("connect")();

app.use((req, res, next) => {
	res.setHeader("Content-Type", "text/html");
	next();
});

app.use(require("./auth_mware"));

app.use("/about", (_, res) => {
	res.end("connect app HW");
});

app.use("/home", (_, res) => {
	res.end("home sweet home");
});

app.use("/~", (_, res) => {
	res.end("There's no place like $HOME");
});

app.use((req, res) => {
	res.statusCode = 404;
	res.end(req.url.split('?')[0].concat(" not recognized"));
});

app.listen(8085);