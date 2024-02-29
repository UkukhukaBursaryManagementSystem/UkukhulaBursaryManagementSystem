import { fetchAllStudentApplicationData } from "../js/fetch_data.js";




function populateTableForAdmin(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
  
    data.forEach((student) => {
      const row = document.createElement("tr");
  
      const applicationIdCell = document.createElement("td");
      applicationIdCell.textContent = student.applicationID;
      row.appendChild(applicationIdCell);
  
  
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
  
      const fundingYearCell = document.createElement("td");
      fundingYearCell.textContent = student.fundingYear;
      fundingYearCell.setAttribute("class", "hide-mobile");
      row.appendChild(fundingYearCell);
  
      const statusCell = document.createElement("td");
      statusCell.textContent = student.status;

      statusCell.setAttribute("class", "status review");
      if(student.status == 'approved')    statusCell.setAttribute("class", "status approved");
      if(student.status == 'rejected')    statusCell.setAttribute("class", "status rejected");
      row.appendChild(statusCell);
  
      const buttonCell = document.createElement("td");
      const viewButton = document.createElement("button");
      viewButton.setAttribute("class", `view-app-button-${student.applicationID}`);
      viewButton.setAttribute("data-applicationID", student.applicationID);
      viewButton.textContent = "View";
      buttonCell.appendChild(viewButton);

      viewButton.addEventListener("click", function() {
        viewStudentApplication(student);
      });
  
      row.appendChild(buttonCell);
  
      tableBody.appendChild(row);
  
    });
  }


function viewStudentApplication(student){

      let pop = document.querySelector('.pop-up-content');

      pop.classList.toggle('active');

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
 
}



let data = [];
data = await fetchAllStudentApplicationData();
populateTableForAdmin(data);

console.log(typeof(data));


