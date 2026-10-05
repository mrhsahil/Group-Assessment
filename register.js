const registerForm = document.querySelector("#register-form");
const fullName = document.querySelector("#full-name");
const studentId = document.querySelector("#student_id");
const feedback = document.querySelector("#register-feedback");

registerForm.addEventListener("submit", function (event) {

    if (fullName.value.trim() === "") {
        event.preventDefault();
        feedback.textContent = "Please enter your name, not only spaces.";
        fullName.focus();
        return;
    }

    if (studentId.value.trim() === "") {
        event.preventDefault();
        feedback.textContent =
            "Please enter your Student ID, not only spaces.";
        studentId.focus();
        return;
    }
});

registerForm.addEventListener("input", function () {
    feedback.textContent = "";
});