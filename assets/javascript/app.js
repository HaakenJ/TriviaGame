let gameQuestions = {
    question1: {
        question: "What is the most prominent mountain in the lower 48 states of the USA?",
        answer: "Mount Rainier",
        wrongAnswers: ["Denali","Mount Whitney","Mount Shasta"]
    },
    question2: {
        question: "Who was the first person to free climb The Nose route of El Capitan?",
        answer: "Lynn Hill",
        wrongAnswers: ["Warren Harding", "Alex Honnold", "Royal Robbins"]
    },
    question3: {
        question: "What is the difference between Sport and Traditional rock climbing?",
        answer: "Sport climbing has fixed protection in the wall.",
        wrongAnswers: ["Sport climbing is done just for fun.","Traditional climbing is done only with hemp ropes and pitons.", "Traditional climbing is just so pure and in touch with nature, man"]
    },
    question4: {
        question: "In what country did skiing originate?",
        answer: "Norway",
        wrongAnswers: ["Swedan", "Switzerland", "Zimbabwe"]
    },
    question5: {
        question: "Who is largely credited for inventing snowboarding?",
        answer: "Jake Burton",
        wrongAnswers: ["Terje Haakonsen", "Steve Jobs", "Sherman Poppen"]
    },
    question6: {
        question: "What would you use a cam for?",
        answer: "Protecting yourself from a fall while rock climbing.",
        wrongAnswers: ["To tighten your ski boots.", "To ascend a rope.", "As a guy to toss you a brewski."]
    }
}

$(document).ready(function() {
    $("#start-button").show();
});