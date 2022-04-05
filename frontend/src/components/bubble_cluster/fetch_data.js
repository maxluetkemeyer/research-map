const url = "http://localhost:5000/publications?"; //dont forget vpn

export async function fetchData(params) {
  let response = await fetch(
    url +
      new URLSearchParams({
        yearMax: 1987,
        yearMin: 1987,
        bwl: params.bwl,
        vwl: params.vwl,
        wi: params.wi,
        andere: params.andere,
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  console.log("hallo");

  console.log(response.body);
  console.log(response);

  let json = await response.json();

  console.log("moin");

  console.log(json);

  return json;
}
