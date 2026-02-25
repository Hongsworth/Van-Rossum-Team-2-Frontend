import { loadUserProfile } from "./user-profile-utils.js";
const LAPTOP_MONITOR_WINDOW_SIZE = 1081;
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu__item");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".hamburger__close-icon");
const menuIcon = document.querySelector(".hamburger__menu-icon");

const setMenuItemEventListener = (menuItem) => {
    menuItem.removeEventListener("click", toggleMenu);
    if (window.innerWidth < LAPTOP_MONITOR_WINDOW_SIZE)
        menuItem.addEventListener("click", toggleMenu);
};

const toggleMenu = () => {
    if (menu.classList.contains("menu--show")) {
        menu.classList.remove("menu--show");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    } else {
        menu.classList.add("menu--show");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    }
}

const userProfile = loadUserProfile();

menuItems.forEach(menuItem => {
    if (userProfile.isLoggedIn) {
        if (menuItem.classList.contains("menu__item--loggedIn"))
            menuItem.style.display = "block";
        if (menuItem.classList.contains("menu__item--loggedOut"))
            menuItem.style.display = "none";
    } else {
        if (menuItem.classList.contains("menu__item--loggedIn"))
            menuItem.style.display = "none";
        if (menuItem.classList.contains("menu__item--loggedOut"))
            menuItem.style.display = "block";
    }

    setMenuItemEventListener(menuItem);
});

window.onresize = () => {
    menuItems.forEach(menuItem => {
        setMenuItemEventListener(menuItem);
    });
}

hamburger.addEventListener("click", toggleMenu);