import { connection, getCacheId } from './mysql.js'
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
	const filteredRows = []
	for(let row of rows){
		const orgaId = row.orga_unit_id;
		if(bwl && units_bwl.includes(orgaId)){
			filteredRows.push(row)
			continue;
		}
		if(vwl && units_vwl.includes(orgaId)){
			filteredRows.push(row)
			continue;
		}
		if(wi && units_wi.includes(orgaId)){
			filteredRows.push(row)
			continue;
		}
		if(sonstige){
			const notInBwl = !bwl && !units_bwl.includes(orgaId)
			const notInVwl = !vwl && !units_vwl.includes(orgaId)
			const notInWi = !wi && !units_wi.includes(orgaId)

			if(notInBwl && notInVwl && notInWi){
				filteredRows.push(row);
				continue;
			}
		}
	}

	console.log(filteredRows[0])
	
	res.send(filteredRows)
}



const together = async (yearMax, yearMin) => {
	const cacheId = await getCacheId();
	const table_prefix = "wwu_cache"+cacheId;

	try {
		const query = `
			SELECT 
				PUBLICATIONS.id AS publication_id, 
				PUBLICATIONS.title AS publication_title,
				PUBLICATIONS.publication_year AS publication_year,
				PUBLICATIONS.publication_type AS publication_type,
				PUBLICATIONS.publication_type_key AS publication_type_key,
				ORGAUNITS.id AS orga_unit_id, 
				ORGAUNITS.name_searchable AS orga_unit_name 
			# All Publications
			FROM	(
				SELECT *
				FROM ${table_prefix}_publication 
				WHERE ${table_prefix}_publication.publication_year BETWEEN ${yearMin} AND ${yearMax}
			) PUBLICATIONS
			# Publication Card Infos
			LEFT JOIN	(
				SELECT * 
				FROM ${table_prefix}_publication_card 
			) PUBLICATIONCARDS
			ON PUBLICATIONS.id = PUBLICATIONCARDS.publication_id 
			# Card
			LEFT JOIN	(
				SELECT * 
				FROM ${table_prefix}_card
			) CARDS
			ON PUBLICATIONCARDS.card_id = CARDS.id 
			# OrgaUnit
			LEFT JOIN	(
				SELECT * 
				FROM ${table_prefix}_orga_unit
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