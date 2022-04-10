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

export const getCacheId = async () => {
    try {
		const query = `SELECT * FROM wwu_cache.wwu_cache_info ORDER BY id DESC LIMIT 1;`
    
		const [rows, fields] = await connection.query(query)

        const cacheId = rows[0].reading_source ?? 1;
		return cacheId
	} catch (e) {
		return 1;
	}
}