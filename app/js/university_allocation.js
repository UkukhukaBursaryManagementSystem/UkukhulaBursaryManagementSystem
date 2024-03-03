
  document.addEventListener("DOMContentLoaded", async function (event) {
    event.preventDefault();
    let data = [];
  
    const addAllocationButton = document.querySelector("#add-allocation-button");
    const addNewUniversityButton = document.querySelector(
      "#add-university-button"
    );
    const cancelIconButton = document.querySelector("#cancel-icon");
    const allocationButton = document.querySelector("#allocate-button");
    const submitUniversityButton = document.querySelector("#university-button");
    const addNewAllocationForm = document.querySelector("#add-new-allocation");
    const addNewUniversityForm = document.querySelector("#university-form");
    const allocationSection = document.querySelector("#add-new-allocation");
    const filterUniversityAllocationSection = document.querySelector(
      "#filter-university-allocation"
    );
    const filterUniversityApplication = document.querySelector(
      "#filter-university-application"
    );
  
    const allocateEvenlyButton = document.querySelector("#allocate-evenly");
    const universityAllocationsTableSection = document.querySelector(
      "#university-allocations-table"
    );

  
    cancelIconButton.addEventListener("click", function () {
      console.log("clicked2");
      addNewAllocationForm.style.display = "none";
      filterUniversityAllocationSection.style.display = "flex";
      universityAllocationsTableSection.style.display = "flex";
      addNewUniversityForm.style.display = "none";
      filterUniversityApplication.style.display = "flex";
    });
  
    // addNewAllocationForm.style.display = "none";
    addAllocationButton.addEventListener("click", function () {
      addNewAllocationForm.style.display = "flex";
      filterUniversityAllocationSection.style.display = "none";
      universityAllocationsTableSection.style.display = "none";
    });
  
    allocationButton.addEventListener("click", function () {
      allocationSection.style.display = "none";
      filterUniversityAllocationSection.style.display = "flex";
      universityAllocationsTableSection.style.display = "flex";
    });
  

  });
  
  