import { store } from "../../store.js";
import { response_test_publications } from "./response_test_publications.js";

const url = store.baseUrl + "/publications?"; //dont forget vpn

export async function fetchData(params) {
  if (store.testMode) return response_test_publications;

  let response = await fetch(
    url +
      new URLSearchParams({
        yearMax: params.yearMax,
        yearMin: params.yearMin,
        bwl: params.bwl,
        vwl: params.vwl,
        wi: params.wi,
        sonstige: params.sonstige,
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  let json = await response.json();

  return json;
}
