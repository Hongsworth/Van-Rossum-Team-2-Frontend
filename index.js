import { getMenu } from "./menu.js";
import { loadUserProfile } from "./userProfile.js";

const userProfile = loadUserProfile();
const navBar = document.querySelector("#navbar");
navBar.innerHTML = getMenu();