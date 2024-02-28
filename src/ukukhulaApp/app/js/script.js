document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetch-button");
  fetchButton.addEventListener("click", function () {
    const hodName = document.getElementById("hodName").value;
    fetchDataByHodName(hodName);
  });

  fetchAllStudentApplicationData();
  const editButtons = document.getElementsByClassName(".edit-button");
  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const applicationId = button.getAttribute("data-application-id");
      editStudentApplication(applicationId);
    });
  });
});

async function fetchAllStudentApplicationData() {
  try {
    const response = await fetch(`http://localhost:8080/student-application`);
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchDataByHodName(hodName) {
  hodName = hodName.split(" ");
  try {
    const response = await fetch(
      `http://localhost:8080/student-applications-by-hod?hodName=${hodName[0]}%20${hodName[1]}`
    );
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function editStudentApplication(applicationId) {
  const table = document.querySelector(".hide-table");
  const form = document.querySelector(".hidden");
  const submitButton = document.querySelector(".submit-button");

  try {
    const response = await fetch(
      `http://localhost:8080/student-application/${applicationId}`
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

function populateTable(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach((student) => {
    const row = document.createElement("tr");
    const FullName = `${student.firstName} ${student.lastName}`;
    row.innerHTML = `
            <td id="applicationId">${student.applicationID}</td>                                       
            <td>${FullName}</td>
            <td>${student.idnumber}</td>
            <td>${student.genderIdentity}</td>
            <td>${student.ethnicity}</td>
            <td>${student.phoneNumber}</td>
            <td>${student.email}</td>
            <td>${student.universityName}</td>
            <td>${student.department}</td>
            <td>${student.courseOfStudy}</td>
            <td>${student.reviewerComment}</td>
            <td>${student.motivation}</td>
            <td>${student.bursaryAmount}</td>
            <td>${student.fundingYear}</td>
            <td>${student.status}</td>
             <td>${student.hodname}</td>
             <td>
             <button class="edit-button" data-id="${student.applicationID}" onclick ="editStudentApplication(${student.applicationID})">Edit</button>
             <button class="delete-button" data-id="${student.applicationID}" onclick ="removeStudentApplication(${student.applicationID})">Delete</button>
           </td>
        `;
    tableBody.appendChild(row);
  });
}
