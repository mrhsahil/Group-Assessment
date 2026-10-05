// Load the logged-in student's details
fetch("membership.php")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Could not load membership.");
        }

        return response.json();
    })
    .then(function(member) {

        document.querySelector("#display-name").textContent =
            member.name;

        document.querySelector("#display-student-id").textContent =
            member.student_id;

        document.querySelector("#display-email").textContent =
            member.email;

        document.querySelector("#full-name").value =
            member.name;

        document.querySelector("#email").value =
            member.email;
    })
    .catch(function(error) {
        console.error("Could not load membership:", error);
    });


// Save membership changes
const membershipForm = document.querySelector("#membership-form");
const feedback = document.querySelector("#membership-feedback");

membershipForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const formData = new FormData(membershipForm);

    fetch("membership.php", {
        method: "POST",
        body: formData
    })
    .then(function(response) {

        if (!response.ok) {
            throw new Error("Could not save changes.");
        }

        return response.text();
    })
    .then(function() {

        const name = document.querySelector("#full-name").value;
        const email = document.querySelector("#email").value;

        document.querySelector("#display-name").textContent = name;
        document.querySelector("#display-email").textContent = email;

        feedback.textContent = "Membership updated successfully.";
    })
    .catch(function(error) {
        console.error(error);
        feedback.textContent = "Could not save changes.";
    });
});