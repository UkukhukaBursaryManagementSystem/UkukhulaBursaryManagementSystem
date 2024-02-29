async function fetchData(url) {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${accessTokenAquired}`
    },
  });
  return result.json();
}

<<<<<<< HEAD

async function fetchAllStudentApplicationData() {
  try {
    const response = await fetch(`http://localhost:8080/student-application`);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export {fetchData, fetchAllStudentApplicationData}
=======
>>>>>>> main
