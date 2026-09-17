const mysql = require("mysql2");//module for connecting to Database
//Environment variables
const USER = process.env.MARIADB_USER;
const PASSWORD = process.env.MARIADB_PASSWORD;
const DATABASE = process.env.MARIADB_DATABASE;
const HOST = process.env.MARIADB_HOSTNAME;

//
const connection = mysql.createConnection({
	host     : HOST,
	user     : USER,
	password : PASSWORD,
	database : DATABASE
});
module.exports = connection;