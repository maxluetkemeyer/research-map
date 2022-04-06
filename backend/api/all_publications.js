import { connection } from './mysql.js'
import { units_bwl, units_vwl, units_wi } from "../misc/orga_units.js";

export const allPublications = async (req, res) => {
	// Query
	console.log(req.query)
	const yearMax = req.query.yearMax
	const yearMin = req.query.yearMin
	const bwl = (req.query.bwl === "true");
	const vwl = (req.query.vwl === "true");
	const wi = (req.query.wi === "true");
	const sonstige = (req.query.sonstige === "true");

	// SQL Query
    const [rows, fields] = await together(yearMax, yearMin)

	// Filter
	const filteredRows = rows.filter(entry => {
		const id = entry.orga_unit_id;

		if(bwl  && units_bwl.includes(id)) return true;
		if (vwl  && units_vwl.includes(id)) return true;
		if (wi  && units_wi.includes(id)) return true;
		if (sonstige) {
			if(units_bwl.includes(id) || units_vwl.includes(id) || units_wi.includes(id)){
				return false;
			}
			return true;
		}
		return false;
	});

	console.log(filteredRows[0])
	
	res.send(filteredRows)
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