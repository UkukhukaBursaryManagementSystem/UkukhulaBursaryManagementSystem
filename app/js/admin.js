function populateTableForAdmin(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    const popUpCard = document.querySelector(".pop-up-card");
    data.forEach((student) => {
      const row = document.createElement("tr");
      row.setAttribute('class', 'table-row');
  
  
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
      if(student.status.toLowerCase() == 'approved')    statusCell.setAttribute("class", "status approved");
      if(student.status.toLowerCase()  == 'rejected')    statusCell.setAttribute("class", "status rejected");
      row.appendChild(statusCell);
  
      const buttonCell = document.createElement("td");
      const viewButton = document.createElement("button");
      const cancelButton = document.querySelector(".cancel");
      viewButton.setAttribute("class", 'view-app-button');
      viewButton.setAttribute("data-applicationID", student.applicationID);
      viewButton.textContent = "View";
      buttonCell.appendChild(viewButton);

      viewButton.addEventListener("click", function(event) {
        event.preventDefault();
        popUpCard.style.display = "block";
        popUpCard.style.zIndex = "9999";
        viewStudentApplication(student);
      });

      cancelButton.addEventListener("click", function (event) {
        event.preventDefault();
        popUpCard.style.zIndex = "0";
        popUpCard.style.display = "none";
      });
  
      row.appendChild(buttonCell);
  
      tableBody.appendChild(row);
  
    });
  }


function viewStudentApplication(student){

      document.querySelector('.student-name').textContent =`${student.firstName} ${student.lastName}`;
      document.querySelector('.student-id-number').textContent = student.idnumber;
      document.querySelector('.student-sex').textContent = student.genderIdentity;
      document.querySelector('.student-ethnicity').textContent = student.ethnicity;
      document.querySelector('.student-email').textContent = student.email;
      document.querySelector('.student-phone-number').textContent = student.phoneNumber;
      document.querySelector('.student-university').textContent = student.universityName;
      document.querySelector('.student-department').textContent = student.department;
      document.querySelector('.student-study').textContent = student.courseOfStudy;
      document.querySelector('.student-amount').textContent = student.bursaryAmount;
      document.querySelector('.hod-name').textContent = student.hodname;
      document.querySelector('.student-motivation').textContent = student.motivation;      
      document.querySelector('.comment').textContent = student.reviewerComment;

      document.querySelector('.approve-button').addEventListener('click', function(event) {
        event.preventDefault();
        approveApplication(student)} )
      document.querySelector('.reject-button').addEventListener('click', function(event) {
        event.preventDefault();
        rejectApplication(student)} )
 
}


function submitAdminForm(student) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form data
  const formData = {
      "firstName": document.getElementById('admin-firstname').value,
      "lastName": document.getElementById('admin-lastname').value,
      "phoneNumber": document.getElementById('admin-number').value,
      "email": document.getElementById('admin-email').value,
  };

  console.log(JSON.stringify(formData));

  // Send the form data to the endpoint using fetch API
  fetch('https://ukukhulaapi.azurewebsites.net/user/insert-admin', {
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
      alert(data.message)
      window.location.assign('https://ukukhulawebapp.azurewebsites.net/pages/admin-dashboard.html');
  })
  .catch(error => {
      alert('There was a problem submitting the form data:', error.message);

  });
  
}

function approveApplication(student){
  formData = {
    'applicationID' : student.applicationID,
    'statusID' : 2, //Status Id for approved
    'reviewerComment' : document.querySelector(".review-comment").value
  } 

    fetch('https://ukukhulaapi.azurewebsites.net/student/review-student', {
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
      alert(data.message)
      window.location.assign('https://ukukhulawebapp.azurewebsites.net/pages/admin-dashboard.html');
  })
  .catch(error => {
      alert('There was a problem submitting the form data:', error.message);
  });


}


function rejectApplication(student){

  formData = {
    'applicationID' : student.applicationID,
    'statusID' : 3, //Status Id for approved
    'reviewerComment' : document.querySelector(".review-comment").value
  } 

    fetch('https://ukukhulaapi.azurewebsites.net/student/review-student', {
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
      alert(data.message)
      window.location.assign('https://ukukhulawebapp.azurewebsites.net/pages/admin-dashboard.html');
  })
  .catch(error => {
      alert('There was a problem submitting the form data:', error.message);
  });


}


document.addEventListener('DOMContentLoaded', async function(){
  let data = [];
  data = await fetchAllStudentApplicationData();
  populateTableForAdmin(data);

    // Add an event listener to the form for form submission
  document.querySelector('.add-admin-form').addEventListener('submit', submitAdminForm);
  //Handle reject  and approve


});



