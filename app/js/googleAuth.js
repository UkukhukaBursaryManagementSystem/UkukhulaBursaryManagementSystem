const btn = document.getElementById("login");
const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
 
document.getElementById("login").setAttribute("method", "GET");
document.getElementById("logInForm").setAttribute("action", oauth2Endpoint);
const YOUR_CLIENT_ID ="317769497433-kqndhkaa7avfhppooe24l3m8hkk9am6g.apps.googleusercontent.com";
const YOUR_REDIRECT_URI = "https://ukukhulawebapp.azurewebsites.net/";
let fragmentString = location.hash.substring(1);
let email = "";
let params = {};
let regex = /([^&=]+)=([^&]*)/g,
  m;
 
while ((m = regex.exec(fragmentString))) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
 
if (Object.keys(params).length > 0) {
  localStorage.setItem("authInfo", JSON.stringify(params));
  if (params["state"] && params["state"] == "try_sample_request") {
    TokenHandler();
  }
}
 
function TokenHandler() {
  let params = JSON.parse(localStorage.getItem("authInfo"));
  if (params && params["access_token"]) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://www.googleapis.com/oauth2/v3/userinfo?" +
        "access_token=" +
        params["access_token"]
    );
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        email = JSON.parse(xhr.response)["email"];
        verifyRole();
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}
