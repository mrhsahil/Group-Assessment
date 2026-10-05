let editingAnnouncementId = null;

// Load announcements
fetch("announcement.php")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.querySelector("#announcement-count").textContent = data.length;

        const list = document.querySelector("#admin-announcement-list");
        list.replaceChildren();

        for (const announcement of data) {
            const card = document.createElement("article");
            card.className = "announcement-card";

            const title = document.createElement("h4");
            title.textContent = announcement.title;

            const category = document.createElement("p");
            category.textContent = "Category: " + announcement.category;

            const description = document.createElement("p");
            description.textContent = announcement.des;

            // Edit button
            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.textContent = "Edit";

            editButton.addEventListener("click", function() {
                editingAnnouncementId = announcement.a_id;

                document.querySelector("#announcement-title").value =
                    announcement.title;

                document.querySelector("#announcement-category").value =
                    announcement.category;

                document.querySelector("#announcement-content").value =
                    announcement.des;
            });

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function() {
                const confirmDelete = confirm(
                    "Are you sure you want to delete this announcement?"
                );

                if (!confirmDelete) {
                    return;
                }

                fetch("announcement.php?id=" + announcement.a_id, {
                    method: "DELETE"
                })
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error("Could not delete announcement.");
                        }

                        return response.text();
                    })
                    .then(function() {
                        card.remove();

                        const count =
                            document.querySelector("#announcement-count");

                        count.textContent = Number(count.textContent) - 1;
                    })
                    .catch(function(error) {
                        console.error(error);
                        alert("Could not delete the announcement.");
                    });
            });

            card.append(
                title,
                category,
                description,
                editButton,
                deleteButton
            );

            list.append(card);
        }
    })
    .catch(function(error) {
        console.error("Could not load announcements:", error);
    });


// Edit announcement
const announcementForm = document.querySelector("#announcement-form");

announcementForm.addEventListener("submit", function(event) {
    // Allow normal publishing if we are not editing
    if (editingAnnouncementId === null) {
        return;
    }

    event.preventDefault();

    const formData = new URLSearchParams(
        new FormData(announcementForm)
    );

    fetch("announcement.php?id=" + editingAnnouncementId, {
        method: "PUT",
        body: formData
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Could not update announcement.");
            }

            return response.text();
        })
        .then(function() {
            window.location.reload();
        })
        .catch(function(error) {
            console.error(error);
            alert("Could not update the announcement.");
        });
});


// Load registered students
fetch("members.php")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Could not load members.");
        }

        return response.json();
    })
    .then(function(members) {
        document.querySelector("#member-count").textContent = members.length;

        const memberList = document.querySelector("#member-list");
        memberList.replaceChildren();

        if (members.length === 0) {
            memberList.textContent = "No registered members.";
            return;
        }

        for (const member of members) {
            const card = document.createElement("article");
            card.className = "announcement-card";

            const name = document.createElement("h4");
            name.textContent = member.name;

            const studentId = document.createElement("p");
            studentId.textContent = "Student ID: " + member.student_id;

            const email = document.createElement("p");
            email.textContent = "Email: " + member.email;

            card.append(name, studentId, email);
            memberList.append(card);
        }
    })
    .catch(function(error) {
        console.error("Could not load members:", error);
    });


// Members dropdown
const toggleMembersButton = document.querySelector("#toggle-members");
const memberList = document.querySelector("#member-list");

toggleMembersButton.addEventListener("click", function() {
    if (memberList.hidden) {
        memberList.hidden = false;

        toggleMembersButton.innerHTML =
            '<strong id="member-count">' +
            memberList.children.length +
            '</strong> registered members ▲';
    } else {
        memberList.hidden = true;

        toggleMembersButton.innerHTML =
            '<strong id="member-count">' +
            memberList.children.length +
            '</strong> registered members ▼';
    }
});


// Load pending announcement requests
fetch("a_request.php")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Could not load announcement requests.");
        }

        return response.json();
    })
    .then(function(requests) {
        const requestList = document.querySelector("#request-list");
        requestList.replaceChildren();

        if (requests.length === 0) {
            requestList.textContent = "No pending announcement requests.";
            return;
        }

        for (const request of requests) {
            const card = document.createElement("article");
            card.className = "announcement-card";

            const title = document.createElement("h3");
            title.textContent = request.title;

            const student = document.createElement("p");
            student.textContent = "Student ID: " + request.student_id;

            const category = document.createElement("p");
            category.textContent = "Category: " + request.category;

            const description = document.createElement("p");
            description.textContent = request.des;

            const status = document.createElement("p");
            status.textContent = "Status: " + request.status;

            // Approve button
            const approveButton = document.createElement("button");
            approveButton.type = "button";
            approveButton.textContent = "Approve";

            approveButton.addEventListener("click", function() {
                const confirmApprove = confirm(
                    "Approve this announcement request?"
                );

                if (!confirmApprove) {
                    return;
                }

                const formData = new URLSearchParams();
                formData.append("r_id", request.r_id);
                formData.append("action", "approve");

                fetch("a_request.php", {
                    method: "POST",
                    body: formData
                })
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error("Could not approve request.");
                        }

                        return response.text();
                    })
                    .then(function() {
                        alert("Announcement approved and published.");
                        window.location.reload();
                    })
                    .catch(function(error) {
                        console.error(error);
                        alert("Could not approve the request.");
                    });
            });

            // Reject button
            const rejectButton = document.createElement("button");
            rejectButton.type = "button";
            rejectButton.textContent = "Reject";

            rejectButton.addEventListener("click", function() {
                const confirmReject = confirm(
                    "Reject this announcement request?"
                );

                if (!confirmReject) {
                    return;
                }

                const formData = new URLSearchParams();
                formData.append("r_id", request.r_id);
                formData.append("action", "reject");

                fetch("a_request.php", {
                    method: "POST",
                    body: formData
                })
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error("Could not reject request.");
                        }

                        return response.text();
                    })
                    .then(function() {
                        card.remove();
                        alert("Announcement request rejected.");

                        if (requestList.children.length === 0) {
                            requestList.textContent =
                                "No pending announcement requests.";
                        }
                    })
                    .catch(function(error) {
                        console.error(error);
                        alert("Could not reject the request.");
                    });
            });

            card.append(
                title,
                student,
                category,
                description,
                status,
                approveButton,
                rejectButton
            );

            requestList.append(card);
        }
    })
    .catch(function(error) {
        console.error(error);

        document.querySelector("#request-list").textContent =
            "Could not load announcement requests.";
    });