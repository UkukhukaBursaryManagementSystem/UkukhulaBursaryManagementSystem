document.addEventListener("DOMContentLoaded", async function () {
  let data = [];
  data = await fetchAllStudentApplicationData();
  populateTableForAdmin(data);

  const editButtons = document.querySelector(".edit-button");
  const studentApplicationForm = document.querySelector(".hidden");
  const table = document.querySelector(".hide-table");
  editButtons.addEventListener("click", function () {
    table.style.display = "none";
    studentApplicationForm.style.display = "flex";
  });
});

async function fetchAllStudentApplicationData() {
  try {
    const response = await fetch(`http://localhost:8080/student-application`);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// async function fetchDataByHodName(hodName) {
//   hodName = hodName.split(" ");
//   try {
//     const response = await fetch(
//       `http://localhost:8080/student-applications-by-hod?hodName=${hodName[0]}%20${hodName[1]}`
//     );
//     const data = await response.json();
//     populateTable(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

async function editStudentApplication(applicationId) {
  const table = document.querySelector(".hide-table");
  const form = document.querySelector(".hidden");
  const submitButton = document.querySelector(".submit-button");

  try {
    const response = await fetch(
      `http://localhost:8080/student/${applicationId}`
    );
    const data = await response.json();
    const fieldMappings = {
      "first-name": "firstName",
      "last-name": "lastName",
      "id-number": "idnumber",
      sex: "genderIdentity",
      ethnicity: "ethnicity",
      phone: "phoneNumber",
      "student-email": "email",
      "student-study-course": "courseOfStudy",
      "bursary-amount": "bursaryAmount",
      university: "universityName",
      department: "department",
      "year-of-application": "fundingYear",
      "head-of-department": "hodName",
      Motivation: "motivation",
    };

    for (const fieldId in fieldMappings) {
      const dataProperty = fieldMappings[fieldId];
      const fieldValue = data[0][dataProperty];
      document.getElementById(fieldId).value = fieldValue;
    }

    submitButton.addEventListener("click", () => {
      table.style.display = "flex";
      form.style.display = "none";
    });

    form.style.display = "flex";
    table.style.display = "none";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function removeStudentApplication(applicationId) {
  try {
    const response = await fetch(
      `http://localhost:8080/student/${applicationId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function populateTable(data) {
//   const tableBody = document.getElementById("table-body");
//   tableBody.innerHTML = "";

//   data.forEach((student) => {
//     const row = document.createElement("tr");
//     const FullName = `${student.firstName} ${student.lastName}`;
//     row.innerHTML = `
//             <td id="applicationId">${student.applicationID}</td>
//             <td>${FullName}</td>
//             <td>${student.idnumber}</td>
//             <td>${student.genderIdentity}</td>
//             <td>${student.ethnicity}</td>
//             <td>${student.phoneNumber}</td>
//             <td>${student.email}</td>
//             <td>${student.universityName}</td>
//             <td>${student.department}</td>
//             <td>${student.courseOfStudy}</td>
//             <td>${student.reviewerComment}</td>
//             <td>${student.motivation}</td>
//             <td>${student.bursaryAmount}</td>
//             <td>${student.fundingYear}</td>
//             <td>${student.status}</td>
//              <td>${student.hodname}</td>
//              <td>
//              <button class="edit-button" data-id="${student.applicationID}" onclick ="editStudentApplication(${student.applicationID})">Edit</button>
//              <button class="delete-button" data-id="${student.applicationID}" onclick ="removeStudentApplication(${student.applicationID})">Delete</button>
//            </td>
//         `;
//     tableBody.appendChild(row);
//   });
// }

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
      viewStudentApplication(student);
    });

    cancelButton.addEventListener("click", function (event) {
      event.preventDefault();
      popUpCard.style.display = "none";
    });

    row.appendChild(buttonCell);

    tableBody.appendChild(row);
  });
}

function viewStudentApplication(student) {
  let pop = document.querySelector(".pop-up-content");

  pop.classList.toggle("active");

  document.querySelector(".student-applicationID").textContent =
    student.applicationID;
  document.querySelector(
    ".student-name"
  ).textContent = `${student.firstName} ${student.lastName}`;
  document.querySelector(".student-id-number").textContent = student.idnumber;
  document.querySelector(".student-sex").textContent = student.genderIdentity;
  document.querySelector(".student-ethnicity").textContent = student.ethnicity;
  document.querySelector(".student-email").textContent = student.email;
  document.querySelector(".student-phone-number").textContent =
    student.phoneNumber;
  document.querySelector(".student-university").textContent =
    student.universityName;
  document.querySelector(".student-department").textContent =
    student.department;
  document.querySelector(".student-study").textContent = student.courseOfStudy;
  document.querySelector(".student-amount").textContent = student.bursaryAmount;
  document.querySelector(".hod-name").textContent = student.hodname;
  document.querySelector(".student-motivation").textContent =
    student.motivation;
  document.querySelector(".comment").textContent = student.reviewerComment;
}
