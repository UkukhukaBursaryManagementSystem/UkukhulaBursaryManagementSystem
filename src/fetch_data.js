async function fetchData(url) {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
}

const selectElement = document.getElementById('sex');

fetch(`http://localhost:8080/universities`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch options');
  }
  return response.json();
}).then(data => {
  data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectElement.appendChild(optionElement);
  });
})
