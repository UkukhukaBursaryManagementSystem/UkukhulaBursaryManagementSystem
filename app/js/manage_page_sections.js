function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(function (section) {
      if (section.id === sectionId) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }
  
  window.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const sectionId = this.getAttribute("href").slice(1);
        showSection(sectionId);
      });
    });
  });