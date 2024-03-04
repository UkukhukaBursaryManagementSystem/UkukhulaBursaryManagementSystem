const msalConfig = {
    auth: {
        clientId: "3de2be63-d983-47bf-bd2f-92e7693477fa",
        authority: "https://login.microsoftonline.com/common",
        postLogoutRedirectUri: "https://ukukhulawebapp.azurewebsites.net/"
    },
    cache: {
        cacheLocation: "sessionStorage",
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
                }	
            }	
        }	
    }
};

const loginRequest = {
    scopes: ["User.Read"]
};

const tokenRequest = {
    scopes: ["User.Read"],
    forceRefresh: false
};
