import { getMenu } from "./menu.js";
import { loadUserProfile } from "./user-profile-utils.js";

const userProfile = loadUserProfile();
const navBar = document.querySelector("#navbar");
navBar.innerHTML = getMenu();