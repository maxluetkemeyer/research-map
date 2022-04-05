import { createHierachie } from "./create_hierachie.js";
//import { fetchData } from "./fetch_data.js";
import { store } from "../../store.js";
import { custom_response } from "./response.js";

export async function build() {
  /*let rows = await fetchData({
    years: [2020, 2022],
    bwl: true,
    vwl: true,
    wi: true,
    sonstige: true,
  });*/
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
