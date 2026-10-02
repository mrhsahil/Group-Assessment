const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");
const chatContainer = document.getElementById("chatContainer");
const chatButton = document.getElementById("chatButton");

sendBtn.onclick = sendMessage;

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function openChat() {
    chatContainer.style.display = "flex";
    chatButton.style.display = "none";
}

function closeChat() {
    chatContainer.style.display = "none";
    chatButton.style.display = "block";
}

function sendMessage() {
    let question = input.value.trim();

    if (question === "") return;

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

function getAnswer(question) {
    question = question.toLowerCase();

    if (question.includes("hello") || question.includes("hey") || question === "hi") {
        return "Hi! How can I help you with the university club?";
    }

    if (question.includes("join") || question.includes("membership")) {
        return "Membership registration is coming soon. Please check back for updates.";
    }

    if (question.includes("announcement") || question.includes("news") || question.includes("update")) {
        return "There are no announcements yet. Please check back for club updates.";
    }

    if (question.includes("event") || question.includes("activity")) {
        return "Club events and activities will be announced when they are available.";
    }

    if (question.includes("contact") || question.includes("email")) {
        return "Club contact information will be available on the website.";
    }

    if (question.includes("login") || question.includes("sign in")) {
        return "Members will be able to log in using their registered account.";
    }

    if (question.includes("password")) {
        return "Please use the password recovery option when it becomes available.";
    }

    if (question.includes("register") || question.includes("registration")) {
        return "Member registration is coming soon.";
    }

    if (question.includes("club") && 
       (question.includes("do") || question.includes("about"))) {
        return "The university club helps students connect, stay informed and take part in club activities.";
    }

    if (question.includes("who can join") || question.includes("eligible")) {
        return "University students can join the club when membership registration becomes available.";
    }

    if (question.includes("fee") || question.includes("cost") || question.includes("free")) {
        return "Membership fee information has not been provided yet.";
    }

    if (question.includes("help")) {
        return "I can help with membership, announcements, events, registration, login and general club questions.";
    }

    if (question.includes("thank")) {
        return "You're welcome!";
    }

    if (question.includes("bye")) {
        return "Goodbye! Have a great day.";
    }

    return "Sorry, I don't understand that question. Try asking about membership, announcements, events or registration.";
}
function quickQuestion(question) {
    input.value = question;
    sendMessage();
}