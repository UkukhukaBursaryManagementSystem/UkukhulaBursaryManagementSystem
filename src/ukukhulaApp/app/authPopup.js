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
        sessionStorage.setItem("username", response.account.username);
        sessionStorage.setItem("name", response.account.name)
        sessionStorage.setItem("token", response.accessToken)
        window.location.href = "http://localhost:3000/pages/admin.html"
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
loginButton.addEventListener("click", () => myMSALObj.loginPopup(loginRequest).then(handleResponse).catch(error));

selectAccount();
