const mysql2 = require("mysql2");
const pool = mysql2.createPool({
	socketPath: "/var/run/mysqld/mysqld.sock",
	user: process.env.recipes_db_username || "root",
	password: process.env.recipes_password || "root testing",
	database: "recipes_db"
});

module.exports = pool;