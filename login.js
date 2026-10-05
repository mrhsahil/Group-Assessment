const loginForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginFeedback = document.querySelector("#login-feedback");

loginForm.addEventListener("submit", function (event) {

    if (email.value.trim() === "") {
        event.preventDefault();
        loginFeedback.textContent = "Please enter your email address.";
        email.focus();
        return;
    }

    if (password.value === "") {
        event.preventDefault();
        loginFeedback.textContent = "Please enter your password.";
        password.focus();
        return;
    }
});

loginForm.addEventListener("input", function () {
    loginFeedback.textContent = "";
});