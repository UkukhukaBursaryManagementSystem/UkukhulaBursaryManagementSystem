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


function handleResponse(response) {

    if (response !== null) {

        const username = response.account.username;
        const microsoftAccessToken = response.accessToken;

        sessionStorage.setItem("username", username);

        const role = document.getElementById("role").value.toUpperCase();
        
        try
        {
            fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                role: `${role}`,
                email: `${username}`,
                microsoftAccessToken: `${microsoftAccessToken}`
            })
            }).then(response => {
                if (!response.ok)
                {
                    return { error: `An error occured: ${response}` };
                }
                return response.json();
            }).then(data => { 
                sessionStorage.setItem("accessToken",data.accessToken); 
            }).catch(error => { 
                return { error: `An error occured: ${error}` }; 
            });

            fetch(`http://localhost:8080/user/${username.toLocaleLowerCase()}`, {
                method: "GET", 
                headers: { 
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                if(!response.ok)
                {
                    return { error: `An error occured: ${response}` };
                }
                return response.json();
            }).then(data => {
                console.log(data);
                sessionStorage.setItem("userFromDataBase", data.email)
                sessionStorage.setItem("userId", data.userId); 
            }).catch(error => {
                return { error: `An error occured: ${error}` };
                });
            

            if (sessionStorage.getItem("userFromDataBase").toLocaleLowerCase() === username.toLocaleLowerCase() && role.toLowerCase() === "admin") 
            {
                window.location.href = "../pages/admin-dashboard.html"; 

            } else if (sessionStorage.getItem("userFromDataBase").toLocaleLowerCase() == username.toLocaleLowerCase() && role.toLowerCase() === "hod")
            {
                window.location.href = "../pages/hod.html"; 
            }
         
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
