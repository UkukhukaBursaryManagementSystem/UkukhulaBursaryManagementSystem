document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-admin-section").style.display = "none";
  document.getElementById("hodForm").style.display = "none";

  document.getElementById("add-admin-button").addEventListener("click", () => {
    document.getElementById("add-admin-section").style.display = "block";
  });
  fetch("https://ukukhulaapi.azurewebsites.net/allrequests")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("requests-table-body");
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${item.firstName}</td>
              <td>${item.lastName}</td>
              <td>${item.phoneNumber}</td>
              <td>${item.email}</td>
              <td>${item.department}</td>
              <td>${item.universityName}</td>
              <td><button onclick="populateForm(this)">ADD</button></td>
          `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  document
    .getElementById("hodForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(document.getElementById("hodForm"));

      const jsonObject = {};
      formData.forEach(function (value, key) {
        jsonObject[key] = value;
      });

      fetch("http://localhost:8080/user/insert-hod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      })
        .then((response) => {
          if (response.ok) {
            alert("HOD added successfully!");
            document.getElementById("hodForm").reset();
          } else {
            throw new Error("Failed to add HOD");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to add HOD");
        });
    });
});

function showAddHodForm() {}
function populateForm(button) {
  document.getElementById("hodForm").style.display = "block";
  const row = button.parentNode.parentNode;
  const cells = row.getElementsByTagName("td");

  document.getElementById("firstName").value = cells[0].innerText;
  document.getElementById("lastName").value = cells[1].innerText;
  document.getElementById("phoneNumber").value = cells[2].innerText;
  document.getElementById("email").value = cells[3].innerText;
  document.getElementById("department").value = cells[4].innerText;
  document.getElementById("universityName").value = cells[5].innerText;
}
