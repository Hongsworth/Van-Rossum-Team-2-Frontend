// Attempt to get the user profile from sessionStorage.
// If it does not exist, we will create one
let userProfileStr = sessionStorage.getItem("userProfile");
if (userProfileStr === null) {
    console.log("We ain't got jack!");
    userProfileStr = `{"name": "", "isLoggedIn": false}`;
    sessionStorage.setItem("userProfile", userProfileStr);
}
const userProfile = JSON.parse(userProfileStr);
