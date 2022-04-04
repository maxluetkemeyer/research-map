export const createHierachie = (rows, fields) => {
    const hierachie = {};

	for(const row of rows){
		const publication_id = row["publication_id"]
		const publication_title = row["publication_title"]
		const orga_unit_id = row["orga_unit_id"]
		const orga_unit_name = row["orga_unit_name"]

		if(hierachie[orga_unit_id] === undefined){
			hierachie[orga_unit_id] = {
				"name": orga_unit_name,
				"publications": [
					{
						"id": publication_id,
						"title": publication_title
					}
				]
			}
		}else {
            let found = false
			for(let publication of hierachie[orga_unit_id].publications){
				if(publication_id === publication.id){
                    found = true
                    break
                }
			}
			if(!found){
				hierachie[orga_unit_id].publications.push(
					{
						"id": publication_id,
						"title": publication_title
                    }
				)
			}
        }
	}

    return hierachie
}




/*
for(let row of rows){
		if(publications[row["publication_id"]] === undefined){
			publications[row["publication_id"]] = {
				"title": row["publication_title"],
				"orga_units": [
					{
						"id": row["orga_unit_id"],
						"name": row["orga_unit_name"]
					}
				]
				
			}
		}else {
			let found = false;
			for(let orga_unit of publications[row["publication_id"]].orga_units){
				if(orga_unit.id === row["orga_unit_id"]){
					found = true;
					break;
				}
			}
			if(!found){
				publications[row["publication_id"]].orga_units.push(
					{
						"id": row["orga_unit_id"],
						"name": row["orga_unit_name"]
					}
				)
			}
		}	
	}
*/