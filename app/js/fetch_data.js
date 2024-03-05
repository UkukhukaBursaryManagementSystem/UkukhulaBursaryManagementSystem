async function fetchData(url) {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
      "role": `${sessionStorage.getItem("userRole")}`
    }
  });
  return result.json();
}


async function fetchAllStudentApplicationData() {
  try {
    const response = await fetch(`https://ukukhulaapi.azurewebsites.net/student-application`);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}




