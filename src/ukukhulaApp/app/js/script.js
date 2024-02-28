document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetch-button");
  fetchButton.addEventListener("click", function () {
    const hodName = document.getElementById("hodName").value;
    fetchDataByHodName(hodName);
  });

  fetchAllStudentApplicationData();
  const applicationId = document.getElementById("applicationId").value;
  editStudentApplication(applicationId);
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
  form.style.display = "none";
  table.style.display = "flex";
  try {
    const response = await fetch(
      `http://localhost:8080/student-application/${applicationId}`
    );
    const data = await response.json();
    console.log(data[0].genderIdentity);
    document.getElementById("first-name").value = data[0].firstName;
    document.getElementById("last-name").value = data[0].lastName;
    document.getElementById("id-number").value = data[0].idnumber;
    document.getElementById("sex").value = data[0].genderIdentity;
    document.getElementById("ethnicity").value = data[0].ethnicity;
    document.getElementById("phone").value = data[0].phoneNumber;
    document.getElementById("student-email").value = data[0].email;
    document.getElementById("student-study-course").value =
      data[0].courseOfStudy;
    document.getElementById("bursary-amount").value = data[0].bursaryAmount;
    document.getElementById("university").value = data[0].universityName;
    document.getElementById("department").value = data[0].department;
    document.getElementById("year-of-application").value = data[0].fundingYear;
    document.getElementById("head-of-department").value = data[0].hodName;
    document.getElementById("Motivation").value = data[0].motivation;

    submitButton.addEventListener("click", () => {
      // const table = document.querySelector(".hide-table")
      table.style.display = "flex";
      form.style.display = "none";
    });
    table.style.display = "none";
    form.style.display = "flex";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

editStudentApplication("applicationId");
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
