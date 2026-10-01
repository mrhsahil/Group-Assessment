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