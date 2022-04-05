import { createHierachie } from './create_hierachie.js'
import { connection } from './mysql.js'

export const allPublications = async (req, res) => {
	console.log("Anfrage!")

	//console.log(req.query)
	const yearMax = req.query.yearMax
	const yearMin = req.query.yearMin

    const [rows, fields] = await together(yearMax, yearMin)

	console.log(rows[0])

	

	const hierachie = createHierachie(rows, fields)
	
	res.send(rows)
}


const together = async (yearMax, yearMin) => {
	try {
		const query = `
			SELECT 
				PUBLICATIONS.id AS publication_id, 
				PUBLICATIONS.title AS publication_title,
				PUBLICATIONS.publication_year AS publication_year,
				ORGAUNITS.id AS orga_unit_id, 
				ORGAUNITS.name_searchable AS orga_unit_name 
			# All Publications
			FROM	(
				SELECT *
				FROM wwu_cache2_publication 
				WHERE wwu_cache2_publication.publication_year BETWEEN ${yearMin} AND ${yearMax}
			) PUBLICATIONS
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
		`

		
		const [rows, fields] = await connection.query(query)


		return [rows, fields]
	} catch (e) {
		console.log(e)
		return []
	}
}