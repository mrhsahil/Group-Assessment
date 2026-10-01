const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");

const chatContainer = document.getElementById("chatContainer");
const chatButton = document.getElementById("chatButton");


sendBtn.onclick = sendMessage;


// Send using Enter key
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// Open chatbot
function openChat() {

    chatContainer.style.display = "flex";
    chatButton.style.display = "none";
}


// Close chatbot
function closeChat() {

    chatContainer.style.display = "none";
    chatButton.style.display = "block";
}


// Send message
function sendMessage() {

    let question = input.value.trim();

    if (question === "") {
        return;
    }


    let userMsg = document.createElement("div");

    userMsg.className = "user-message";
    userMsg.innerText = question;

    chatBox.appendChild(userMsg);

    input.value = "";


    let answer = getAnswer(question);


    setTimeout(function() {

        let botMsg = document.createElement("div");

        botMsg.className = "bot-message";
        botMsg.innerText = answer;

        chatBox.appendChild(botMsg);

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 400);
}


// Find an answer
function getAnswer(question) {

    question = question.toLowerCase();


    // Greeting
    if (
        question.includes("hello") ||
        question.includes("hi") ||
        question.includes("hey")
    ) {

        return "Hi! How can I help you with the university club?";
    }


    // Membership cost
    else if (
        question.includes("membership") &&
        (
            question.includes("free") ||
            question.includes("fee") ||
            question.includes("cost")
        )
    ) {

        return "Please check the membership information to see if there are any membership fees.";
    }


    // Joining
    else if (
        question.includes("join") ||
        question.includes("member") ||
        question.includes("membership")
    ) {

        return "You can join the club by filling out the membership form.";
    }


    // Announcements
    else if (
        question.includes("announcement") ||
        question.includes("news") ||
        question.includes("update")
    ) {

        return "You can check the Announcements page for the latest club updates.";
    }


    // Events
    else if (
        question.includes("event") ||
        question.includes("activity") ||
        question.includes("activities")
    ) {

        return "You can check the Events page to see upcoming club events and activities.";
    }


    // Password
    else if (
        question.includes("password") ||
        question.includes("forgot")
    ) {

        return "If you forgot your password, you can reset it from the login page.";
    }


    // Login
    else if (
        question.includes("login") ||
        question.includes("log in") ||
        question.includes("sign in")
    ) {

        return "You can log in using your registered email and password.";
    }


    // Contact
    else if (
        question.includes("contact") ||
        question.includes("email")
    ) {

        return "You can contact the club using the Contact page.";
    }


    // Club information
    else if (
        question.includes("club") &&
        (
            question.includes("what") ||
            question.includes("about") ||
            question.includes("do")
        )
    ) {

        return "The university club helps students connect, join activities, attend events and receive club announcements.";
    }


    // General club question
    else if (question.includes("club")) {

        return "Our university club helps students connect and take part in club activities.";
    }


    // Thanks
    else if (
        question.includes("thank") ||
        question.includes("thanks")
    ) {

        return "You're welcome!";
    }


    // No matching answer
    else {

        return "Sorry, I don't understand that question. You can ask me about membership, announcements, events, login or contacting the club.";
    }
}


// Suggested question buttons
function quickQuestion(question) {

    input.value = question;
    sendMessage();
}