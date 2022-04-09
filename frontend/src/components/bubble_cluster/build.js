import { createHierachie } from "./create_hierachie.js";
import { store } from "../../store.js";

export function build(rows) {
  const fields = ["orga_unit_id", "publication_year", "publication_id"];
  const fieldsName = [
    "orga_unit_name",
    "publication_year",
    "publication_title",
  ];

  const map = createHierachie(rows, fields, fieldsName);

  store.hasData = true;
  return map;
}
