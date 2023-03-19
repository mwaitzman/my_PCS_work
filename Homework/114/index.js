const express = require('express');
const http = require('http');
const io = require('socket.io');
const path = require('path');

const app = express();

const server = http.createServer(app);
const socketIo = io(server);

app.use(express.static(path.join(__dirname, 'public')));

let messages = [];

socketIo.on("connection", socket => {
	console.log("got a connection");

	socket.emit("msg", "This is a message from the server");

	socket.on("msg", msg => {
		console.log("Received a message from", msg);
		socketIo.emit("msg", msg);
	});
});

app.get("/", (_req, res, _next) => {
	res.end('hello world');
});

server.listen(process.env.PORT || 8080);
