// Admin login checker
fetch("session.php")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        const adminLink = document.querySelector("#admin-link");

        // Show Admin link only for admins
        if (adminLink && data.loggedIn && data.role == 1) {
            adminLink.hidden = false;
        }
    })
    .catch(function(error) {
        console.error("Could not check user role:", error);
    });