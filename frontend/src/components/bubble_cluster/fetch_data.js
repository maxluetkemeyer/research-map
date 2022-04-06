import { store } from "../../store.js";

const url = store.baseUrl + "/publications?"; //dont forget vpn

export async function fetchData(params) {
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

  console.log(json);

  return json;
}
