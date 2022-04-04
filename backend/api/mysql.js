import mysql from "mysql2/promise"

const credentials = {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
}

// create the connection
export const connection = mysql.createPool(credentials)