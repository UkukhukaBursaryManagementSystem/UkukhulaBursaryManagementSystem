document.addEventListener("DOMContentLoaded", async function (event) {
  const fetchData = async function fetchData(url) {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  };

  let data;
  (async () => {
    data = await fetchData(
      "https://ukukhulaapi.azurewebsites.net/universities/applications"
    );
    const applicationsTableBody = document.getElementById(
      "applicationsTableBody"
    );

    const universitySelect = document.getElementById("select-university");

    data.forEach((application) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${application.id}</td>
                <td>${application.universityName}</td>
                <td>${application.motivation}</td>
                <td>${application.applicationStatus}</td>
                <td>${application.reviewerComment}</td>
              `;
      applicationsTableBody.appendChild(row);

      const option = document.createElement("option");
      option.value = application.universityName;
      option.textContent = application.universityName;
      universitySelect.appendChild(option);
    });

    universitySelect.addEventListener("change", async (event) => {
      const selectedUniversity = event.target.value;
      if (selectedUniversity === "all") {
        displayApplications(data);
      } else {
        const filteredData = data.filter(
          (application) => application.universityName === selectedUniversity
        );
        displayApplications(filteredData);
      }
    });

    function displayApplications(filteredData) {
      const applicationsTableBody = document.getElementById(
        "applicationsTableBody"
      );
      applicationsTableBody.innerHTML = "";

      filteredData.forEach((application) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${application.id}</td>
                  <td>${application.universityName}</td>
                  <td>${application.motivation}</td>
                  <td>${application.applicationStatus}</td>
                  <td>${application.reviewerComment}</td>
                `;
        applicationsTableBody.appendChild(row);
      });
    }
  })();

  const form = document.getElementById("universityForm");
  // const addButton = document.querySelector("#add-university-button");
  const userId = localStorage.getItem("userId");
  const cancelButton = document.querySelector("#cancel-icon");

  // const role = fetch(`http://localhost:8080/user-role/${userId}`);
  // console.log(role);
  // if (role.toLowerCase() != "admin") {
  //   addButton.classList.add("hide");
  // }
  // addButton.addEventListener("click", () => {
  //   addButton.classList.add("hide");
  //   form.classList.remove("hide");
  // });

  cancelButton.addEventListener("click", () => {
    form.classList.add("hide");
    addButton.classList.remove("hide");
  });

  document
    .getElementById("universityForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); 
      const universityName = document.getElementById("universityName").value;
      fetch(
        "https://ukukhulaapi.azurewebsites.net/university-by-admin?universityName=" +
          universityName,
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (response.ok) {
          }
        })
        .then((data) => {
          alert("University application added successfully!");
        })
        .catch((error) => {
          alert("Failed to add university application.",error);
        });
    });

  event.preventDefault();

  const addNewUniversityButton = document.querySelector(
    "#add-university-button"
  );
  const cancelIconButton = document.querySelector("#cancel-icon");
  const submitUniversityButton = document.querySelector("#university-button");
  const addNewUniversityForm = document.querySelector("#university-form");

  const filterUniversityApplication = document.querySelector(
    "#filter-university-application"
  );

  addNewUniversityButton.addEventListener("click", function () {
    filterUniversityApplication.style.display = "none";
    addNewUniversityForm.style.display = "flex";
  });

  submitUniversityButton.addEventListener("click", function () {
    addNewUniversityForm.style.display = "none";
    filterUniversityApplication.style.display = "flex";
  });

  cancelIconButton.addEventListener("click", function () {
    addNewUniversityForm.style.display = "none";
    filterUniversityApplication.style.display = "flex";
  });
});
