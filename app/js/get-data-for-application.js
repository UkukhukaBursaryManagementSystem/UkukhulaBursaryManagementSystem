
document.addEventListener("DOMContentLoaded", async function () {

    let data;




const selectDepartmentElement = document.getElementById('department');
data = await fetchData(`https://ukukhulaapi.azurewebsites.net/department`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectDepartmentElement.appendChild(optionElement);
});

const selectHeadOfDepartmentElement = document.getElementById('head-of-department');
data = await fetchData(`https://ukukhulaapi.azurewebsites.net/hod`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectHeadOfDepartmentElement.appendChild(optionElement);
});


const selectUniverisytElement = document.getElementById('university');
data = await fetchData(`https://ukukhulaapi.azurewebsites.net/universities`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectUniverisytElement.appendChild(optionElement);
});


function submitFormData(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const loadImage = document.querySelector('.load');
    loadImage.classList.toggle('show');
    // Get form data
    const formData = {
        "firstName": document.getElementById('first-name').value,
        "lastName": document.getElementById('last-name').value,
        "idNumber": document.getElementById('id-number').value,
        "phoneNumber": document.getElementById('phone').value,
        "email": document.getElementById('student-email').value,
        "courseOfStudy": document.getElementById('student-study-course').value,
        "genderID": parseInt(document.getElementById('sex').value),
        "ethnicityID": parseInt(document.getElementById('ethnicity').value),
        "departmentID": parseInt(document.getElementById('department').value),
        "universityID": parseInt(document.getElementById('university').value),
        "applicationMotivation": document.getElementById('Motivation').value,
        "bursaryAmount": parseFloat(document.getElementById('bursary-amount').value),
        "headOfDepartmentID": parseInt(document.getElementById('head-of-department').value),
        "fundingYear": parseInt(document.getElementById('year-of-application').value)
    };

    console.log(JSON.stringify(formData));

    // Send the form data to the endpoint using fetch API
    fetch('https://ukukhulaapi.azurewebsites.net/create-student-application', {
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
        window.location.assign('https://ukukhulawebapp.azurewebsites.net/pages/student_appplications.html');
    })
    .catch(error => {
        alert('There was a problem submitting the form data:', error.message);
        // Optionally, you can show an error message to the user
    });
    
}

// Add an event listener to the form for form submission
document.querySelector('.student-application-form').addEventListener('submit', submitFormData);

    
}
);



document.addEventListener("DOMContentLoaded", async function (event) {
    event.preventDefault();

    const form1Button = document.querySelector("#form1-button");
    const form2BackButton = document.querySelector("#form2-Back-button");
    const form2NextButton = document.querySelector("#form2-next-button");
    const form3BackButton = document.querySelector("#form3-Back-button");
    const form3SubmitButton = document.querySelector("#form3-submit-button");
    const form1 = document.querySelector("#form1");
    const form2 = document.querySelector("#form2");
    const form3 = document.querySelector("#form3");
  
  
  

  

  
    form2.style.display = "none";
    form3.style.display = "none";
  
    form1Button.addEventListener("click", function () {
      console.log();
      form1.style.display = "none";
      form2.style.display = "flex";
    });
  
    form2BackButton.addEventListener("click", function () {
      form2.style.display = "none";
      form1.style.display = "flex";
    });
  
    form2NextButton.addEventListener("click", function () {
      form2.style.display = "none";
      form3.style.display = "flex";
    });
  
    form3BackButton.addEventListener("click", function () {
      form3.style.display = "none";
      form2.style.display = "flex";
    });
  
    // data = await fetchAllStudentApplicationData();
    // populateTableForAdmin(data);
  });