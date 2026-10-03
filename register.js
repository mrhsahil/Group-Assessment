const registerForm = document.querySelector("#register-form");
const fullName = document.querySelector("#full-name");
const studentId = document.querySelector("#student_id");
const password = document.querySelector("#password");
const feedback = document.querySelector("#register-feedback");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (fullName.value.trim() === "") {
        feedback.textContent = "Please enter your name, not only spaces.";
        fullName.focus();
        return;
    }

    if (studentId.value.trim() === "") {
        feedback.textContent =
            "Please enter your Student ID, not only spaces.";
        studentId.focus();
        return;
    }

    feedback.textContent =
        "Form checks passed. This preview has not created an account.";

    password.value = "";
});

registerForm.addEventListener("input", function () {
    feedback.textContent = "";
});