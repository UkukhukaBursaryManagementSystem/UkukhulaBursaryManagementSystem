const account = selectAccount(msalInstance);

const accessTokenRequest = {
  scopes: ["user.read"],
  account: account,
};

const accessToken = aquireAccessTokenSilent(msalInstance, accessTokenRequest);
// console.log(accessToken);

async function fetchData(url) {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  });
  return result.json();
}


export {fetchData}