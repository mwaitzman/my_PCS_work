const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

let posts, users;


app.use(require('cors')({
	origin: 'http://localhost:3000',
	credentials: true
}));

app.use(session({
	secret: ["b9465u360uj4h64b645kjb{()J$)(B%BMONeeeSgiTa", "U$()%B^JW%BKOPBNOTirbej6iejeibTJOeinvt$B"],
	/*cookie: {
	  maxAge: 20000
	}*/
	resave: false,
	saveUninitialized: false
  }));

app.use(async (req, res, next) => {
	await client.connect();
	let blog_db = client.db("blog");
	posts = blog_db.collection('posts');
	users = blog_db.collection('users');
	next();
});


app.post("/register", (req, res, next) => {
	console.table(users.find());
	if (! req.body.username || ! req.body.password) {
		res.status(400).end(new Error('username and password are required'));
	}

	bcrypt.hash(req.body.password, 10,	(err, hash) => {
		if (err) {
			return next(err);
		}

		const user = {username: req.body.username, password_hash: hash};

		users.findOne({username: req.body.username}).then(result => {
			if (result) {
				res.status(409).end("Username already taken. Please pick another.");
				return;
			}
			users.insertOne(user).then(result => {
				if (!result.acknowledged) {
					res.status(500).end("something went wrong inserting the user");
					return;
				}
				req.session.user = req.body.username;
				res.status(201).end();
			});
		});
	});
});

app.post('/login', (req, res, next) => {
	if (! req.body.username || ! req.body.password) {
		res.status(400).end("username and password are required");
		return;
	}

	users.findOne({username: req.body.username}).then(user => {
		if (user == null) {
			res.status(404).end("User doesn't exist");
			return;
		}
		console.log(user);
		bcrypt.compare(
			req.body.password,
			user.password_hash,
			(err, same) => {
				if (err) {
					console.log(err);
					next(err);
					return;
				}
				if (same) {
					req.session.user = req.body.username;
					res.status(200).end();
				} else {
					res.status(401).end("Incorrect password");
				}
		});
	});
});

app.get('/logout', (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
});


app.use

app.route('/posts')
	.get(async (req, res, next) => {
		const thePosts = await posts.find().toArray();
		res.send(thePosts);
	})

app.use("/posts", (req, res, next) => {
	if (req.session.user) {
	  next();
	} else {
	  res.redirect(401, "/login");
	}
});
app.post("/posts", async (req, res, next) => {
	req.body.author = req.session.user;
	req.body.date = new Date();
	const result = await posts.insertOne(req.body);
	console.log(result);
	if (!result.insertedId) {
		return next('oops, couldnt insert post');
	}

	req.body.id = result.insertedId;
	res.status(201)
		//.location(...)
		.send(req.body);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const error = new Error('No such endpoint');
	error.statusCode = 404;
	next(error);
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.statusCode || 500)
		.send(err.message);
});

app.listen(8080);
