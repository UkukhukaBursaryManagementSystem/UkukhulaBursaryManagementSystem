const msalConfig = {
    auth: {
        clientId: '63a971df-2a0c-45a7-a5cd-36a53c39a99d', 
        authority: 'https://login.microsoftonline.com/common', 
        redirectUri: 'http://localhost:5500/src/pages/admin.html', 
        postLogoutRedirectUri: 'http://localhost:5500/index.html',
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false, 
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);


const loginRequest = {
    scopes: ["User.Read"]
};

function signIn() {

    addMsalEventCallback(msalInstance);
    handleMsalRedirectPromise(msalInstance);
    msalInstance.loginRedirect(loginRequest);
}