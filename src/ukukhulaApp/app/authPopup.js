const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

function selectAccount() {

   
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
    }
}

debugger
async function handleResponse(response) {

    if (response !== null) {

        const username = response.account.username;
        sessionStorage.setItem("username", username);

        const role = document.getElementById("role").value;
        
        try
        {
            const resultToken = fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                role: `${role}`,
                email: `${sessionStorage.getItem("username")}`
            })
            }).then(response => {
                if (!response.ok)
                {
                    return { error: `An error occured: ${response}` };
                }
                response.json();
            }).then(data => { 
                return JSON.stringify(data) 
            }).catch(error => { 
                return { error: `An error occured: ${error}` }; 
            });

            const resultUser = fetch(`http://localhost:8080/john.doe@example`, {
                method: "GET", 
                headers: { "Content-Type" : "application/json" } 
            }).then(response => {
                if(!response.ok)
                {
                    return { error: `An error occured: ${response}` };
                }
                response.json();
            }).then(data => { 
                return JSON.stringify(data) 
            }).catch(error => {
                return { error: `An error occured: ${error}` };
                });

            

            if (resultUser.email === username && role.toLowerCase === "admin") 
            {
                window.location.href = "http://localhost:3000/pages/admin.html";
            } else if (resultUser.email === "john.doe@example.com" && role.toLowerCase === "hod")
            {
                window.location.href = "http://localhost:3000/pages/university_applications.html";
                
            } else
            {
                window.location.href = "http://localhost:3000/"
            }
         
            sessionStorage.setItem("usertoken", resultToken);

        } catch(error)
        {
            return { error: `An error occured: ${error}` };
        }

    } else {
        selectAccount();
    }
}


function signOut() {

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request) {

    request.account = myMSALObj.getAccountByUsername(username);
    
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof msal.InteractionRequiredAuthError) {
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
            } else {
                console.warn(error);   
            }
    });
}

const loginButton = document.querySelector("#login");
loginButton.addEventListener("click", () => myMSALObj
                                            .loginPopup(loginRequest)
                                            .then(handleResponse)
                                            .catch(error => {
                                                return;
                                            }));

selectAccount();
