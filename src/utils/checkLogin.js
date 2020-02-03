import fetch from "isomorphic-unfetch";
import apiLogin from "../api/urlLogin";

function getToken(username, password) {
  let resStatus = 0;
  fetch(apiLogin.rootApiLogin, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: `username=${username}&password=${password}`
  })
    .then(response => {
      resStatus = response.status;
      return response.json();
    })
    .then(result => {
      if (resStatus !== 200) {
        // thisObj.setState({
        //   validateStatus: "error",
        //   message: "Please doulbe check your information."
        // });
        console.log(result.status);
      } else {
        let userToken = { token: result, timestamp: new Date().getTime() };
        let userAccessToken = {
          accessToken: result.accessToken,
          timestamp: new Date().getTime()
        };
        localStorage.setItem("tokenCms", JSON.stringify(userToken));
        localStorage.setItem("accessTokenCms", JSON.stringify(userAccessToken));
        return result;
      }
    })
    .catch(error => {
      console.log("Request failed", error);
    });
}
function getDuoIndex(userName) {
  const token = fetch(apiLogin.getSig + userName, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log("Request failed", error);
    });
  return token;
}
function chekDuo(sigValue) {
  fetch(apiLogin.checkLoginFinal, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: `sig_response=${sigValue}`
  });
}
export { getToken, getDuoIndex, chekDuo };