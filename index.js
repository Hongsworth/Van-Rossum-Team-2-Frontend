import { getMenu } from "./menu.js";
import { loadUserProfile } from "./userProfile.js";

// Attempt to get the user profile from sessionStorage.
// If it does not exist, we will create one
// let userProfileStr = sessionStorage.getItem("userProfile");
// if (userProfileStr === null) {
//     userProfileStr = `{"name": "", "isLoggedIn": false}`;
//     sessionStorage.setItem("userProfile", userProfileStr);
// }
const userProfile = loadUserProfile();
const navBar = document.querySelector("#navbar");
navBar.innerHTML = getMenu();