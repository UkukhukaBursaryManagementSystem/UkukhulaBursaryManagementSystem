async function fetchData(url) {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${accessTokenAquired}`
    },
  });
  return result.json();
}

