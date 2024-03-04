document.addEventListener("DOMContentLoaded", async function () {
  async function fetchDataByHodName(hodName) {
    hodName = hodName.split(" ");
    try {
      const response = await fetch(
        `http://localhost:8080/student-applications-by-hod?hodName=${hodName[0]}%20${hodName[1]}`
      );
      const data = await response.json();
      populateTableForAdmin(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function populateTableForAdmin(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    const popUpCard = document.querySelector(".pop-up-card");
    data.forEach((student) => {
      const row = document.createElement("tr");
      row.setAttribute("class", "table-row");

      const FullName = `${student.firstName} ${student.lastName}`;

      const applicationNameCell = document.createElement("td");
      applicationNameCell.textContent = FullName;
      row.appendChild(applicationNameCell);

      const universityNameCell = document.createElement("td");
      universityNameCell.textContent = student.universityName;
      universityNameCell.setAttribute("class", "hide-mobile");
      row.appendChild(universityNameCell);

      const applicationAmountCell = document.createElement("td");
      applicationAmountCell.textContent = student.bursaryAmount;
      applicationAmountCell.setAttribute("class", "hide-mobile");
      row.appendChild(applicationAmountCell);

      const statusCell = document.createElement("td");
      statusCell.textContent = student.status;

      statusCell.setAttribute("class", "status review");
      if (student.status == "approved")
        statusCell.setAttribute("class", "status approved");
      if (student.status == "rejected")
        statusCell.setAttribute("class", "status rejected");
      row.appendChild(statusCell);

      const buttonCell = document.createElement("td");
      const viewButton = document.createElement("button");
      const cancelButton = document.querySelector(".cancel");
      viewButton.setAttribute("class", "view-app-button");
      viewButton.setAttribute("data-applicationID", student.applicationID);
      viewButton.textContent = "View";
      buttonCell.appendChild(viewButton);

      viewButton.addEventListener("click", function (event) {
        event.preventDefault();
        popUpCard.style.display = "block";
        popUpCard.style.zIndex = "999";
        viewStudentApplication(student);
      });

      cancelButton.addEventListener("click", function (event) {
        event.preventDefault();
        popUpCard.style.zIndex = "0";
        popUpCard.style.display = "none";
      });

      row.appendChild(buttonCell);
      console.log(row);
      tableBody.appendChild(row);
    });
  }

  const FetchByHodNameButton = document.querySelector("#fetch-button");

  FetchByHodNameButton.addEventListener("click", function () {
    const hodName = document.querySelector("#hodName").value;
    fetchDataByHodName(hodName);
  });
});
