import 'dotenv/config'
import express from 'express'
import { allPublications } from './api/all_publications.js'
import { connection } from './api/mysql.js'

const app = express()
const port = 5000




app.get('/', (req, res) => {
	res.send('publication map')
})

app.use("/publicationmap/embedded", express.static("/srv/public/"))

app.get("/test", (req, res) => {
	res.send("hi")
})

app.get("/publicationsOLD", async (req, res) => {
	try {
		// query database
		const [rows, fields] = await connection.query("SELECT * FROM wwu_cache1_journal")

		res.send(rows)
	} catch (e) {
		console.log(e)
		res.send("error")
	}
})

app.get("/publications", allPublications)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
