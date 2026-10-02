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

    if (question.includes("hello") || question.includes("hey")) {
        return "Hi! How can I help you with the university club?";
    }

    if (question.includes("join") || question.includes("membership")) {
        return "Membership registration is coming soon. Please check back for updates.";
    }

    if (question.includes("announcement") || question.includes("news")) {
        return "There are no announcements yet. Please check back for club updates.";
    }

    if (question.includes("club") && question.includes("do")) {
        return "The university club helps students connect and stay informed.";
    }

    if (question.includes("thank")) {
        return "You're welcome!";
    }

    return "Sorry, I don't understand that question. You can ask me about membership or announcements.";
}

function quickQuestion(question) {
    input.value = question;
    sendMessage();
}