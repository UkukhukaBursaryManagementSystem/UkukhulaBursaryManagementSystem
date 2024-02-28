function updateLoginUI(userName)
{

    const welcomeMessageContainer = document.getElementById("welcome-screen");
    const welcomeMessage = document.getElementById("username");
    const signInButton = document.getElementById("login")

    welcomeMessage.textContent = `Welcome ${userName}, How can we help you today?`;
    welcomeMessageContainer.classList.add(".loginUpdate");
    welcomeMessage.classList.add("loginUpdateHeading");
    signInButton.classList.add(".hideElements")

}
