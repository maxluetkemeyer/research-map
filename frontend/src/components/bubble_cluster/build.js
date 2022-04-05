import { createHierachie } from "./create_hierachie.js";
// eslint-disable-next-line no-unused-vars
import { fetchData } from "./fetch_data.js";
import { store } from "../../store.js";
import { custom_response } from "./response.js";

export async function build() {
  //let rows = await fetchData(store.query);
  let rows = custom_response;

  const fields = ["orga_unit_id", "publication_year", "publication_id"];
  const fieldsName = [
    "orga_unit_name",
    "publication_year",
    "publication_title",
  ];

  const map = createHierachie(rows, fields, fieldsName);

  store.hasData = true;
  store.data = map;
}
