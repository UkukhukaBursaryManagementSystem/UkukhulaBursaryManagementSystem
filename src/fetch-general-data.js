import  {fetchData} from  '../src/fetch_data.js'
let data;


const selectSexElement = document.getElementById('sex');
data = await fetchData(`http://localhost:8080/biological-sex`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectSexElement.appendChild(optionElement);
});

const selectEthnicityElement = document.getElementById('ethnicity');
data = await fetchData(`http://localhost:8080/ethnicity`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectEthnicityElement.appendChild(optionElement);
});


const selectDepartmentElement = document.getElementById('department');
data = await fetchData(`http://localhost:8080/department`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectDepartmentElement.appendChild(optionElement);
});

const selectHeadOfDepartmentElement = document.getElementById('head-of-department');
data = await fetchData(`http://localhost:8080/hod`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectHeadOfDepartmentElement.appendChild(optionElement);
});








const selectUniverisytElement = document.getElementById('university');
data = await fetchData(`http://localhost:8080/universities`);
data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectUniverisytElement.appendChild(optionElement);
});