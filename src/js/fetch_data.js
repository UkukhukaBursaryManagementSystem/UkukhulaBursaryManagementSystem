async function fetchData(url) {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
}
