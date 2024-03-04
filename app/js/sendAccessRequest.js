document.addEventListener("DOMContentLoaded", async function () {
  let data;

  const departmentDataDropdown = document.getElementById(
    "departmentDataDropdown"
  );
  const universitiesDataDropdown = document.getElementById(
    "universityDataDropdown"
  );

  data = await fetchData(
    "https://ukukhulaapi.azurewebsites.net/universities/applications/2"
  );
  data.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.name;
    optionElement.textContent = option.name;
    universitiesDataDropdown.appendChild(optionElement);
  });

  data = await fetchData("https://ukukhulaapi.azurewebsites.net/department");
  data.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.name;
    optionElement.textContent = option.name;
    departmentDataDropdown.appendChild(optionElement);
  });
});

function showRequestAccessForm() {
  const requstAccessForm = document.getElementById("requestAccess");

  requstAccessForm.style.display = "flex";
  requstAccessForm.style.flexDirection = "column";
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("submitRequestForm")
    .addEventListener("click", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const email = document.getElementById("email").value;
      const department = document.getElementById(
        "departmentDataDropdown"
      ).value;
      const universityName = document.getElementById(
        "universityDataDropdown"
      ).value;

      const requestBody = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        department: department,
        universityName: universityName,
      };
      console.log(requestBody);
      fetch("https://ukukhulaapi.azurewebsites.net/requestAccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then(function (response) {
          if (response.ok) {
            alert("Request submitted successfuly")
          } else {
            alert("Error submitting request. Status:", response.status);
          }
        })
        .catch(function (error) {
          console.error("Error submitting request:", error);
        });
    });
});
