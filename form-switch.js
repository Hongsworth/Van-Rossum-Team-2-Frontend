const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

document
    .getElementById("show-register")
    .addEventListener("click", function (e) {
        console.log("Show register");
        console.log(registerForm);
        e.preventDefault();
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        console.log(registerForm.classList);
    });

document.getElementById("show-login").addEventListener("click", function (e) {
    console.log("Show login");
    console.log(loginForm);
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    console.log(loginForm.classList);
});
