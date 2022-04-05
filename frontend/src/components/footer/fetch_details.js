const url = "http://localhost:5000/publication?"; //dont forget vpn

export async function fetchDetails(params) {
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

  console.log(json);

  return json;
}
