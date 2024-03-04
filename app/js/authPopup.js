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
        sessionStorage.setItem("microsoftAccessToken", response.accessToken);

        const role = document.getElementById("role").value.toUpperCase();
        
        try
        {
            fetch("https://ukukhulaapi.azurewebsites.net/auth/login", {
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


            fetch(`https://ukukhulaapi.azurewebsites.net/user/${username.toLocaleLowerCase()}`, {
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
                sessionStorage.setItem("userId", data.userId)
                sessionStorage.setItem("userRole", data.role); 
                sessionStorage.setItem("firstName", data.firstName);
                sessionStorage.setItem("lastName", data.lastName);
            }).catch(error => {
                return { error: `An error occured: ${error}` };
                });


            fetch("https://ukukhulaapi.azurewebsites.net/user/log", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: `${sessionStorage.getItem("userId")}`,
                    userName: `${username}`,
                    userAccessToken: `${microsoftAccessToken}`
                })
                }).then(response => {
                    if (!response.ok)
                    {
                        return { error: `An error occured: ${response}` };
                    }
                    return response.json();
                }).then(data => { 
                    console.log(data);
                    return data; 
                }).catch(error => { 
                    return { error: `An error occured: ${error}` }; 
                });
            

            if (sessionStorage.getItem("userFromDataBase").toLocaleLowerCase() === username.toLocaleLowerCase() && role.toLowerCase() === "admin") 
            {
                window.location.href = "https://ukukhulawebapp.azurewebsites.net/pages/admin-dashboard.html"; 

            } else if (sessionStorage.getItem("userFromDataBase").toLocaleLowerCase() == username.toLocaleLowerCase() && role.toLowerCase() === "hod")
            {
                window.location.href = "https://ukukhulawebapp.azurewebsites.net/pages/hod.html"; 
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
    window.location.assign("https://ukukhulawebapp.azurewebsites.net/");
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
