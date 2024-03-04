document.addEventListener("DOMContentLoaded", async function () {
  let data;
  data = await fetchAllStudentApplicationData();
  await getUniversityInfo();
  await getTotalBalance();
  await getTotalMoneySpent();
  populateTableForAdmin(data);

  const editButtons = document.querySelector(".edit-button");
  const studentApplicationForm = document.querySelector(".hidden");
  const table = document.querySelector(".hide-table");
  const deleteButton = document.querySelector(".delete-button");
  const statusSelect = document.querySelector('.select-status');
  const nameFromSession = document.querySelector('.username')

  nameFromSession.textContent = `${sessionStorage.getItem('firstName')}  ${sessionStorage.getItem('lastName')}!`


  statusSelect.addEventListener('change', function (){

        if(statusSelect.value === 'all'){
          populateTableForAdmin(data);
        }else{
          const result = data.filter((app) => app.status.toLowerCase() == statusSelect.value);
          populateTableForAdmin(result);
        }
  });

  editButtons.addEventListener("click", function () {
    table.style.display = "none";
    studentApplicationForm.style.display = "flex";
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
    const response = await fetch(`https://ukukhulaapi.azurewebsites.net/student-application`);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getUniversityInfo(){

    if(sessionStorage.getItem('userRole')){
      userID = sessionStorage.getItem('userId')

      fetch(`https://ukukhulaapi.azurewebsites.net/info/${parseInt(userID)}`, {
        method: "GET", 
        headers: { 
            "Content-Type" : "application/json"
        }
    }).then(response => {
        if(!response.ok)
        {
            return { error: `An error occured: ${response}` };
        }
        return response.json();
    }).then(data => {
        sessionStorage.setItem("headOfDepartmentID", data.headOfDepartmentID)
        sessionStorage.setItem("departmentID", data.departmentID)
        sessionStorage.setItem("universityID", data.universityID); 
        sessionStorage.setItem("universityName", data.universityName);
    }).catch(error => {
        return { error: `An error occured: ${error}` };
        });

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


async function getTotalMoneySpent(){
  if(sessionStorage.getItem('userRole').toLocaleLowerCase() === 'hod'){
    universityName = sessionStorage.getItem('universityName');

    fetch(`https://ukukhulaapi.azurewebsites.net/total-money-spent/${encodeURIComponent(universityName)}`, {
      method: "GET", 
      headers: { 
          "Content-Type" : "application/json"
      }
  }).then(response => {
      if(!response.ok)
      {
          return { error: `An error occured: ${response}` };
      }
      return response.json();
  }).then(data => {
      const spent = document.querySelector('.spent');
      spent.textContent = data;
      
  }).catch(error => {
      return { error: `An error occured: ${error}` };
      });

  }

}


async function getTotalBalance(){

  if(sessionStorage.getItem('userRole').toLocaleLowerCase() === 'hod'){
    universityName = sessionStorage.getItem('universityName');

    fetch(`https://ukukhulaapi.azurewebsites.net/balance/${encodeURIComponent(universityName)}`, {
      method: "GET", 
      headers: { 
          "Content-Type" : "application/json"
      }
  }).then(response => {
      if(!response.ok)
      {
          return { error: `An error occured: ${response}` };
      }
      return response.json();
  }).then(data => {
      const balance = document.querySelector('.allocated');
      balance.textContent = data;
  }).catch(error => {
      return { error: `An error occured: ${error}` };
      });

  }
  
}
async function populateStudentApplicationEditForm(applicationId) {
  const table = document.querySelector(".hide-table");
  const form = document.querySelector(".hidden");

  try {
    const response = await fetch(
      `https://ukukhulaapi.azurewebsites.net/student-application/${applicationId}`,
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
      `https://ukukhulaapi.azurewebsites.net/student/${applicationId}`,
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

    const response = await fetch("https://ukukhulaapi.azurewebsites.net/student-application", {
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
      popUpCard.style.zIndex = "999";
      viewStudentApplication(student);
    });

    cancelButton.addEventListener("click", function (event) {
      event.preventDefault();
      popUpCard.style.zIndex = "0";
      popUpCard.style.display = "none";
      document.querySelector('.link').style.display = 'block';
    });

    row.appendChild(buttonCell);
    console.log(row);
    tableBody.appendChild(row);
  });
}


function generateLink(applicationID){
      let formData = {
        applicationID : applicationID,
        baseURL : 'https://ukukhulawebapp.azurewebsites.net/pages/document_upload.html'
      }
    
        fetch('http://localhost:8080/generate-link', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const anchor = document.querySelector(`.gen-link-${applicationID}`);
          const linkParagraph = document.querySelector('.link').style.display = 'block';
          console.log(data.url)
          anchor.setAttribute('href', data.url);
          anchor.textContent= data.url;
      })
      .catch(error => {
          alert('There was a problem submitting the form data:', error.message);
         
      });
    

}
function viewStudentApplication(student) {
  let pop = document.querySelector(".pop-up-content");

  pop.classList.toggle("active");

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

  document.querySelector('.gen-link').setAttribute('class', `gen-link-${student.applicationID}`);
  document.querySelector('.generate-link-button').addEventListener('click', function(event) {
    event.preventDefault();
    generateLink(student.applicationID)} );


}



