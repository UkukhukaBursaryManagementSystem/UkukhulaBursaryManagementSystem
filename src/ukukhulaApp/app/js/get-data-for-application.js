import { fetchData } from "./fetch_data.js";
let data;

const selectSexElement = document.getElementById("sex");
data = await fetchData(`http://localhost:8080/biological-sex`);
data.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option.id;
  optionElement.textContent = option.name;
  selectSexElement.appendChild(optionElement);
});

const selectEthnicityElement = document.getElementById("ethnicity");
data = await fetchData(`http://localhost:8080/ethnicity`);
data.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option.id;
  optionElement.textContent = option.name;
  selectEthnicityElement.appendChild(optionElement);
});

const selectDepartmentElement = document.getElementById("department");
data = await fetchData(`http://localhost:8080/department`);
data.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option.id;
  optionElement.textContent = option.name;
  selectDepartmentElement.appendChild(optionElement);
});

const selectHeadOfDepartmentElement =
  document.getElementById("head-of-department");
data = await fetchData(`http://localhost:8080/hod`);
data.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option.id;
  optionElement.textContent = option.name;
  selectHeadOfDepartmentElement.appendChild(optionElement);
});

const selectUniverisytElement = document.getElementById("university");
data = await fetchData(`http://localhost:8080/universities`);
data.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option.id;
  optionElement.textContent = option.name;
  selectUniverisytElement.appendChild(optionElement);
});

function submitFormData(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form data
  const formData = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    idNumber: document.getElementById("id-number").value,
    phoneNumber: document.getElementById("id-number").value,
    email: document.getElementById("student-email").value,
    courseOfStudy: document.getElementById("student-study-course").value,
    genderID: parseInt(document.getElementById("sex").value),
    ethnicityID: parseInt(document.getElementById("ethnicity").value),
    departmentID: parseInt(document.getElementById("department").value),
    universityID: parseInt(document.getElementById("university").value),
    applicationMotivation: document.getElementById("Motivation").value,
    bursaryAmount: parseFloat(document.getElementById("bursary-amount").value),
    headOfDepartmentID: parseInt(
      document.getElementById("head-of-department").value
    ),
    fundingYear: parseInt(document.getElementById("year-of-application").value),
  };

  console.log(JSON.stringify(formData));

  // Send the form data to the endpoint using fetch API
  fetch("http://localhost:8080/student-application", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Form data submitted successfully:", data);
      // Optionally, you can show a success message or redirect the user
    })
    .catch((error) => {
      console.error(
        "There was a problem submitting the form data:",
        error.message
      );
      // Optionally, you can show an error message to the user
    });
}

// Add an event listener to the form for form submission
document
  .querySelector(".student-application-form")
  .addEventListener("submit", submitFormData);
