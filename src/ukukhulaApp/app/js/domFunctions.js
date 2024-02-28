function updateLoginUI(userName)
{

    const welcomeMessageContainer = document.getElementById("welcome-screen");
    const welcomeMessage = document.getElementById("username");
    const signInSection = document.getElementById("signIn-section")

    welcomeMessage.textContent = `Welcome ${userName}, How can we help you today?`;
    welcomeMessageContainer.classList.add("loginUpdate");
    welcomeMessage.classList.add("loginUpdateHeading");
    signInSection.classList.add("hideElements")

}
