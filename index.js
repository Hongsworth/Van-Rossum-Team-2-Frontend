const userProfileStr = sessionStorage.getItem("userProfile") ?? `{username:"",isLoggedIn:}`;
const userProfile = JSON.parse(userProfileStr);

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu__item");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".hamburger__close-icon");
const menuIcon = document.querySelector(".hamburger__menu-icon");

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

menuItems.forEach(menuItem => menuItem.addEventListener("click", toggleMenu))

hamburger.addEventListener("click", toggleMenu);