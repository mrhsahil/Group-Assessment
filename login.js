const loginForm = document.querySelector("#login-form");
const loginFeedback = document.querySelector("#login-feedback");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    loginFeedback.textContent =
        "Form checks passed. Real login will be connected later.";

    document.querySelector("#password").value = "";
});

loginForm.addEventListener("input", function () {
    loginFeedback.textContent = "";
});