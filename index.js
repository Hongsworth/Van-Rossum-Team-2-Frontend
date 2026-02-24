import { getMenu } from "./menu.js";
import { loadUserProfile } from "./utils/userProfile.js";

const userProfile = loadUserProfile();
const navBar = document.querySelector("#navbar");
navBar.innerHTML = getMenu();