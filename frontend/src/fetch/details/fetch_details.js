import { store } from "../../store.js";
import { response_test_details } from "./response_test_details.js";

const url = store.baseUrl + "/publication?"; //dont forget vpn

export async function fetchDetails(params) {
  if (store.testMode) return response_test_details;

  let response = await fetch(
    url +
      new URLSearchParams({
        publicationId: params.publicationId,
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
