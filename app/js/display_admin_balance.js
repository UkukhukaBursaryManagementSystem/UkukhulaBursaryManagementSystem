window.addEventListener("DOMContentLoaded", () => {
  fetch("https://ukukhulaapi.azurewebsites.net/allocations/adminbalance")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById(
        "admin-remaining-balance"
      ).innerText = `Admin Balance: R${data.balance}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("balance").innerText = "Failed to fetch balance";
    });

  fetch("https://ukukhulaapi.azurewebsites.net/allocations/admintotalspent")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById(
        "admin-total-spent"
      ).innerText = `Total Spent: R${data.totalSpent}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("admin-total-spent").innerText = "Failed to get total spent for admin";
    });
});
