// authService.js

export function setAuthToken(token) {
  localStorage.setItem("authToken", token);
}

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function removeAuthToken(){
  return localStorage.removeItem("authToken");
}

// export function isAuthenticated(status) {

//   // const token = getAuthToken();

//   if (status) {
//     return true
//   } else {
//     return false
//   }

// }
