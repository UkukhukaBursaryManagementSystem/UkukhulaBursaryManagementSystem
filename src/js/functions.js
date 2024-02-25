let username = '';


// What to do during authentication, be login or token aquiring
function addMsalEventCallback(msalObject) {
        msalObject.addEventCallback((event) => {
        if (
            (event.eventType === msal.EventType.LOGIN_SUCCESS ||
             event.eventType === msal.EventType.ACQUIRE_TOKEN_SUCCESS) &&
             event.payload.account
        ) {
            const account = event.payload.account;
            msalObject.setActiveAccount(account);
        }

        if (event.eventType === msal.EventType.LOGOUT_SUCCESS) {
            if (msalObject.getAllAccounts().length > 0) {
                msalObject.setActiveAccount(msalObject.getAllAccounts()[0]);
            }
        }
    });
}


function handleMsalRedirectPromise(msalObject) {
    msalObject
    .handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });
}


function selectAccount(msalObject) {
    
    const currentAccounts = msalObject.getAllAccounts();

    if (!currentAccounts) {
        return;
    } else if (currentAccounts.length >= 1) {
        username = msalObject.getActiveAccount().username;
        showWelcomeMessage(username, currentAccounts);
    }
}


async function addAnotherAccount(event, msalObject) {
    if (event.target.innerHTML.includes("@")) {
        const username = event.target.innerHTML;
        const account = msalObject.getAllAccounts().find((account) => account.username === username);
        const activeAccount = msalObject.getActiveAccount();
        if (account && activeAccount.homeAccountId != account.homeAccountId) {
            try {
                msalObject.setActiveAccount(account);
                let res = await msalObject.ssoSilent({
                    ...loginRequest,
                    account: account,
                });
                handleResponse(res);
                closeModal();
                window.location.reload();
            } catch (error) {
                if (error instanceof msal.InteractionRequiredAuthError) {
                    await msalObject.loginRedirect({
                        ...loginRequest,
                        prompt: 'login',
                    });
                }
            }
        } else {
            closeModal();
        }
    } else {
        try {
            msalObject.setActiveAccount(null);
            await msalObject.loginRedirect({
                ...loginRequest,
                prompt: 'login',
            });
        } catch (error) {
            console.log(error);
        }
    }
}


function handleResponse(response, msalObject) {
    if (response !== null) {
        const accounts = msalObject.getAllAccounts();
        username = response.account.username;
        const email = response.account.email;
        console.alert(`Username: ${username}\nEmail: ${email}`);
    } else {
        selectAccount();
    }
}


function signOut(msalObject) {

    const account = msalObject.getAccountByUsername(username);
    const logoutRequest = {
        account: account,
        loginHint: account.idTokenClaims.login_hint,
    };

    clearStorage(account);
    msalObject.logoutRedirect(logoutRequest);
}

