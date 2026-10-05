// Check if the user is logged in
fetch("session.php")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const loginLink = document.querySelector("#login-link");

        if (data.loggedIn) {
            loginLink.textContent = "Logout";
            loginLink.href = "logout.php";
        }
    })
    .catch(function(error) {
        console.error("Could not check login status:", error);
    });