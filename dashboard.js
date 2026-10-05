// Load logged-in student's membership details
fetch("membership.php")
    .then(function(response) {

        if (!response.ok) {
            throw new Error("Could not load member details.");
        }

        return response.json();
    })
    .then(function(member) {

        document.querySelector("#dashboard-name").textContent =
            member.name;

        document.querySelector("#dashboard-student-id").textContent =
            member.student_id;
    })
    .catch(function(error) {

        console.error("Could not load member details:", error);

        document.querySelector("#dashboard-name").textContent =
            "Could not load";

        document.querySelector("#dashboard-student-id").textContent =
            "Could not load";
    });


// Load announcements from the database
fetch("announcement.php")
    .then(function(response) {

        if (!response.ok) {
            throw new Error("Could not load announcements.");
        }

        return response.json();
    })
    .then(function(announcements) {

        const list =
            document.querySelector("#dashboard-announcements");

        list.replaceChildren();

        // Show message if there are no announcements
        if (announcements.length === 0) {

            const message = document.createElement("p");
            message.textContent = "No announcements available.";

            list.append(message);

            return;
        }

        // Show latest 2 announcements
        const latestAnnouncements = announcements.slice(-2).reverse();

        for (const announcement of latestAnnouncements) {

            const article = document.createElement("article");

            const title = document.createElement("h3");
            title.textContent = announcement.title;

            const description = document.createElement("p");
            description.textContent = announcement.des;

            article.append(title, description);

            list.append(article);
        }
    })
    .catch(function(error) {

        console.error("Could not load announcements:", error);

        const list =
            document.querySelector("#dashboard-announcements");

        list.textContent = "Could not load announcements.";
    });