import { createHierachie } from './create_hierachie.js'
import { connection } from './mysql.js'

export const publicationDetails = async (req, res) => {
	console.log("Anfrage!")

	//console.log(req.query)
	const publicationId = req.query.publicationId

    const [rows, fields] = await together(publicationId)

	console.log(rows[0])

	
	res.send(rows)
}


const together = async (publicationId) => {
	try {
		const query = `
		SELECT * 
		FROM wwu_cache1_publication
		AS PUBLICATIONS
		# Publication Card Infos
		LEFT JOIN	(
			SELECT * 
			FROM wwu_cache2_publication_card 
		) PUBLICATIONCARDS
		ON PUBLICATIONS.id = PUBLICATIONCARDS.publication_id 
		# Card
		LEFT JOIN	(
			SELECT * 
			FROM wwu_cache2_card
		) CARDS
		ON PUBLICATIONCARDS.card_id = CARDS.id 
		# OrgaUnit
		LEFT JOIN	(
			SELECT * 
			FROM wwu_cache2_orga_unit
		) ORGAUNITS
		ON CARDS.orga_unit_id = ORGAUNITS.id 
		WHERE PUBLICATIONS.id=${publicationId}
		`

		
		const [rows, fields] = await connection.query(query)


		return [rows, fields]
	} catch (e) {
		console.log(e)
		return []
	}
}