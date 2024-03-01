function addOptionValues(data, selectParent, selectedOption) {
  const addedValues = new Set();
  for (const entry of Object.values(data)) {
    const value = entry[selectedOption];
    if (!addedValues.has(value)) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      selectParent.appendChild(option);
      addedValues.add(value);
    }
  }
}
