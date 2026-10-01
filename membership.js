const form = document.querySelector("#membership-form");
const nameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const displayName = document.querySelector("#display-name");
const displayEmail = document.querySelector("#display-email");
const feedback = document.querySelector("#membership-feedback");
const cancelButton = document.querySelector("#cancel-edit");

nameInput.addEventListener("input", function () {
    nameInput.setCustomValidity("");
    feedback.textContent = "";
});

emailInput.addEventListener("input", function () {
    feedback.textContent = "";
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = nameInput.value.trim();

    if (fullName === "") {
        nameInput.setCustomValidity("Enter a name, not only spaces.");
        nameInput.reportValidity();
        return;
    }

    nameInput.value = fullName;
    emailInput.value = emailInput.value.trim();

    displayName.textContent = fullName;
    displayEmail.textContent = emailInput.value;

    feedback.textContent =
        "Preview updated. These changes are not saved to an account.";
});

cancelButton.addEventListener("click", function () {
    nameInput.value = displayName.textContent;
    emailInput.value = displayEmail.textContent;
    nameInput.setCustomValidity("");

    feedback.textContent =
        "Unsaved edits cancelled. The fields match the current preview.";
});

