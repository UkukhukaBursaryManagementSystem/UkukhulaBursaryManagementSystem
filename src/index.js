async function getStuff(url) {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  }

  
  async function post(url, body) {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return JSON.stringify(result);
  
  }
  
  function createTableRows(data){

    data.forEach(row)

  }