// Sample records. The database will supply these later.
const announcements = [
    {
        title: "Welcome to the club",
        category: "General",
        text: "Meet fellow students and get involved in club activities."
    },
    {
        title: "Club games afternoon",
        category: "Events",
        text: "Join members for an afternoon of board games."
    },
    {
        title: "Volunteers wanted",
        category: "General",
        text: "Help welcome new members and organise activities."
    },
    {
        title: "Study group meetup",
        category: "Events",
        text: "Bring your notes and study together."
    }
];

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const categoryInput = document.querySelector("#category");
const list = document.querySelector("#announcement-list");
const message = document.querySelector("#results-message");
const pageNumber = document.querySelector("#page-number");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

let results = announcements;
let currentPage = 1;
const perPage = 2;

function showAnnouncements() {
    list.replaceChildren();

    const totalPages = Math.max(1, Math.ceil(results.length / perPage));
    const start = (currentPage - 1) * perPage;
    const visibleItems = results.slice(start, start + perPage);

    for (const announcement of visibleItems) {
        const card = document.createElement("article");
        card.className = "announcement-card";

        const title = document.createElement("h2");
        title.textContent = announcement.title;

        const category = document.createElement("p");
        category.textContent = "Category: " + announcement.category;

        const description = document.createElement("p");
        description.textContent = announcement.text;

        card.append(title, category, description);
        list.append(card);
    }

    if (results.length === 0) {
        message.textContent = "No announcements found. Try another search.";
    } else {
        message.textContent = results.length + " announcements found.";
    }

    pageNumber.textContent = "Page " + currentPage + " of " + totalPages;
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryInput.value;

    results = announcements.filter(function (announcement) {
        const words =
            (announcement.title + " " + announcement.text).toLowerCase();

        const matchesSearch = words.includes(keyword);
        const matchesCategory =
            selectedCategory === "all" ||
            announcement.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    showAnnouncements();
});

previousButton.addEventListener("click", function () {
    currentPage--;
    showAnnouncements();
});

nextButton.addEventListener("click", function () {
    currentPage++;
    showAnnouncements();
});

showAnnouncements();