document.addEventListener("DOMContentLoaded", async function() {

  let data;

  const departmentDataDropdown = document.getElementById('departmentDataDropdown');
  const universitiesDataDropdown = document.getElementById('universityDataDropdown');

  data = await fetchData("https://ukukhulaapi.azurewebsites.net/universities/applications/2");
  data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    universitiesDataDropdown.appendChild(optionElement);
  });

  data = await fetchData("https://ukukhulaapi.azurewebsites.net/department");
  data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    departmentDataDropdown.appendChild(optionElement);
  });
});


function showRequestAccessForm()
{    
  const requstAccessForm = document.getElementById("requestAccess");

  requstAccessForm.style.display = "flex";
  requstAccessForm.style.flexDirection = "column";
}


function submitFormData(event) {
  event.preventDefault();

  const formData = {

    firstName : document.getElementById("firstName").value,
    lastName : document.getElementById("lastName").value,
    phoneNumber : document.getElementById("phoneNumber").value,
    email : document.getElementById("email").value,
    department : document.getElementById("departmentDataDropdown").value,
    university : document.getElementById("universityDataDropdown").value
    
  };

  fetch('https://ukukhulaapi.azurewebsites.net/requestAccess', {
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
      window.location.assign('https://ukukhulawebapp.azurewebsites.net/');
  })
  .catch(error => {
      alert('There was a problem submitting the form data:', error.message);
  });
  
}

document.getElementById("submitRequestForm").addEventListener("click", submitFormData);
