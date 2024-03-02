document.addEventListener("DOMContentLoaded", async function () {
  let data = [];
  data = await fetchAllStudentApplicationData();
  populateTableForAdmin(data);

  const editButtons = document.querySelector(".edit-button");
  const studentApplicationForm = document.querySelector(".hidden");
  const table = document.querySelector(".hide-table");
  const deleteButton = document.querySelector(".delete-button");

  editButtons.addEventListener("click", function () {
    table.style.display = "none";
    studentApplicationForm.style.display = "flex";
  });

  deleteButton.addEventListener("click", function () {
    const applicationId = document.querySelector(
      ".student-applicationID"
    ).textContent;
    removeStudentApplication(applicationId);
  });

  editButtons.addEventListener("click", function () {
    const applicationId = document.querySelector(
      ".student-applicationID"
    ).textContent;
    console.log(applicationId);
    populateStudentApplicationEditForm(applicationId);
  });
  const submitButton = document.querySelector(".submit-button");

  submitButton.addEventListener("click", function (event) {
    const applicationId = document.querySelector(
      ".student-applicationID"
    ).textContent;
    event.preventDefault();
    console.log("clicked");
    updateStudentApplication(applicationId);
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

async function populateStudentApplicationEditForm(applicationId) {
  const table = document.querySelector(".hide-table");
  const form = document.querySelector(".hidden");

  try {
    const response = await fetch(
      `http://localhost:8080/student-application/${applicationId}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    const fieldMappings = {
      "first-name": "firstName",
      "last-name": "lastName",
      idNumber: "idnumber",
      gender: "genderIdentity",
      ethnicity: "ethnicity",
      phone: "phoneNumber",
      "student-email": "email",
      "student-study-course": "courseOfStudy",
      "bursary-amount": "bursaryAmount",
      university: "universityName",
      department: "departmentName",
      "year-of-application": "fundingYear",
      "head-of-department": "hodname",
      motivation: "motivation",
    };

    for (const fieldId in fieldMappings) {
      const dataProperty = fieldMappings[fieldId];
      const fieldValue = data[dataProperty];
      document.getElementById(fieldId).value = fieldValue;
    }

    form.style.display = "flex";
    table.style.display = "none";
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function removeStudentApplication(applicationId) {
  try {
    const response = await fetch(
      `http://localhost:8080/student/${applicationId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
}

async function updateStudentApplication() {
  try {
    const form = document.getElementById("studentApplicationForm");
    const formData = new FormData(form);
    const applicationId = document.querySelector(
      ".student-applicationID"
    ).textContent;

    const applicationData = {
      applicationId: parseInt(applicationId),
      firstName: "",
      lastName: "",
      idNumber: "",
      gender: "",
      phoneNumber: "",
      email: "",
      ethnicity: "",
      courseOfStudy: "",
      departmentName: "",
      reviewerComment: "",
      motivation: "",
      universityName: "",
      requestedAmount: 0,
      fundingYear: 0,
      applicationStatus: "",
    };

    const numericFields = ["bursaryAmount", "fundingYear"];
    formData.forEach((value, key) => {
      console.log(value, key);
      if (numericFields.includes(key)) {
        applicationData[key] = parseFloat(value);
      } else {
        applicationData[key] = value;
      }
    });
    console.log(applicationData["idNumber"]);

    const response = await fetch("http://localhost:8080/student-application", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });
    const data = await response.json();
    console.log(response.json());
    if (response.ok) {
      const data = await response.json();
      console.log("Student application updated successfully:", data);
    } else {
      console.error(
        "Error updating student application. Status:",
        response.status
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error updating student application:", error);
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

function viewStudentApplication(student) {
  let pop = document.querySelector(".pop-up-content");

  pop.classList.toggle("active");
  student.applicationID;
  document.querySelector(
    ".student-name"
  ).textContent = `${student.firstName} ${student.lastName}`;
  document.querySelector(".student-idnumber").textContent = student.idnumber;
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
