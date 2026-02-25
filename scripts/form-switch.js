const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

document
    .getElementById("show-register")
    .addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });

document.getElementById("show-login").addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});
