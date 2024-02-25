document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetch-button");
  fetchButton.addEventListener("click", function () {
    const hodName = document.getElementById("hodName").value;
    fetchDataByHodName(hodName);
  });
  fetchAllStudentApplicationData();
});

async function fetchAllStudentApplicationData() {
  try {
    const response = await fetch(`http://localhost:8080/student-applications`);
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateTable(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${student.applicationID}</td>                                       
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
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
        `;
    tableBody.appendChild(row);
  });
}
