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
    },



    


}

function randomQuesNumber () {
    return Math.floor((Math.random() * 6) + 1);
}
function chooseRanAnsSelctor () {
    return $("#answer-" + Math.floor((Math.random() * 4) + 1));
}

function questionTimer () {
    let timer = setTimeout(function (){/*TODO choose what happens when you run of out time.*/}, 30000);
}

function getRandomQuestion (randomNum) {
    return gameQuestions["question" + randomNum];
}

function pickAndDisplayQuestion () {
    // Assign a random question object.
    let currentQuestion = getRandomQuestion(randomQuesNumber());

    // Get the selector of a random list item to display the answer.
    let rightAnswerSelctor = chooseRanAnsSelctor();

    // Display the current question.
    $("#question").text(currentQuestion.question);

    // Display the correct answer.
    rightAnswerSelctor.text(currentQuestion.answer);

    // Loop through the wrong answers array.
    for (i = 0; i < currentQuestion.wrongAnswers.length; i++) {
        // Assign random answer selector to the currentWrongAnswer.
        let currentWrongAnswer = chooseRanAnsSelctor();
        /* Continue to reassign the random selector until it chooses an empty
            answer div. */
        while (!currentWrongAnswer.is(':empty')) {
            currentWrongAnswer = chooseRanAnsSelctor();
        }
        currentWrongAnswer.text(currentQuestion.wrongAnswers[i]);
    }
}


anime({
    targets: '.main-container',
    translateY: {
        value: -940,
        duration: 2000,
        endDelay: 1000
    },
});

anime({
    targets: 'h1#header',
    translateX: -3000,
    translateY: -1000,
    duration: 2000,
    delay: 500
});

$(document).ready(function () {
    $("#start-button").show();
    $("li").hide();
})


$("#start-button").on('click', function() {
    $("#start-button").hide();
    $("li").show();
    pickAndDisplayQuestion();


});