console.log("announcements.js is running");

let announcements = [];
let results = [];
let currentPage = 1;

const perPage = 2;

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const categoryInput = document.querySelector("#category");
const list = document.querySelector("#announcement-list");
const message = document.querySelector("#results-message");
const pageNumber = document.querySelector("#page-number");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");


// Get announcements from the database
fetch("announcement.php")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        announcements = data;
        results = announcements;

        showAnnouncements();
    })
    .catch(function (error) {
        console.error("Error loading announcements:", error);
        message.textContent = "Could not load announcements.";
    });


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

        // Database column is called "des"
        description.textContent = announcement.des;

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


// Search and category filter
searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const keyword = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryInput.value;

    results = announcements.filter(function (announcement) {

        const words =
            (announcement.title + " " + announcement.des).toLowerCase();

        const matchesSearch = words.includes(keyword);

        const matchesCategory =
            selectedCategory === "all" ||
            announcement.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    showAnnouncements();
});


// Previous page
previousButton.addEventListener("click", function () {

    currentPage--;
    showAnnouncements();
});


// Next page
nextButton.addEventListener("click", function () {

    currentPage++;
    showAnnouncements();
});


// Registration success message
const params = new URLSearchParams(window.location.search);

if (params.get("registered") === "success") {
    alert("Registration successful!");
}