document.addEventListener("DOMContentLoaded", () => {
  //   document.querySelector("#add-admin-section").classList.add("hide");
  document.getElementById("add-admin-section").style.display = "none";
  document.getElementById("add-admin-button").addEventListener("click",()=>{
    document.getElementById("add-admin-section").style.display = "block"
  })
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
              <td><button onclick="handleAdd()">ADD</button></td>
          `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
