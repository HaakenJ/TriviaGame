let gameQuestions = {
    question1: {
        question: 'What is the most prominent mountain in the lower 48 states of the USA?',
        answer: 'Mount Rainier',
        wrongAnswers: ['Denali','Mount Whitney','Mount Shasta'],
        funFact: 'In topography, prominence measures the height of a mountain\'s summit relative to the lowest contour line encircling it but containing no higher summit within it. This honor belongs to the PNW\'s own Mt. Rainier!',
        image: '<img src="assets/images/rainier.png" alt="Mt Rainier from the Puget Sound.">'
    },
    question2: {
        question: 'Who was the first person to free climb The Nose route of El Capitan?',
        answer: 'Lynn Hill',
        wrongAnswers: ['Warren Harding', 'Alex Honnold', 'Royal Robbins'],
        funFact: 'In 1994 Lynn Hill was the first person to climb The Nose without aid equipment. One year later, she then became the first person to climb it in a day!',
        image: '<img src="assets/images/lynn.png" alt="Lynn Hill rock climbing in the 1990\'s">'
    },
    question3: {
        question: 'What is the difference between Sport and Traditional rock climbing?',
        answer: 'In traditional climbing all fall protection is placed by the climber.',
        wrongAnswers: ['Unlike traditional, Sport climbing is done just for fun.','Traditional climbing is done only with hemp ropes and pitons.', 'Traditional climbing is just so pure and in touch with nature, man'],
        funFact: 'In traditional or \'trad\' climbing, a climber must put their own fall protection into cracks in a wall so that if they fall the rope will catch them.  In sport climbing there are bolts in the walls, this isn\'t allowed at many climbing areas.',
        image: '<img src="assets/images/trad.png" alt="A person placing climbing protection into a wall.">'
    },
    question4: {
        question: 'In what country did skiing originate?',
        answer: 'Norway',
        wrongAnswers: ['Germany', 'Switzerland', 'Zimbabwe'],
        funFact: 'An image of a skier holding a single pole or an ax with both hands, is found in Rødøy in the Nordland region of Norway.  Carvings like this tell us that people have been skiing in the area since at least 3000 or 4000 BCE!',
        image: '<img src="assets/images/ski-carving.png" alt="A Norwegian carving of a skier.">'
    },
    question5: {
        question: 'Who is largely credited for inventing snowboarding?',
        answer: 'Jake Burton',
        wrongAnswers: ['Terje Haakonsen', 'Steve Jobs', 'Sherman Poppen'],
        funFact: 'Although a toy called the Snurfer had already existed, Jake Burton was the first person to add rigid bindings and a laminate core to a board and hence is credited for making the first snowboard!',
        image: '<img src="assets/images/burton.png" alt="Jake Burton with a snowboard on his back.">'
    },
    question6: {
        question: 'What would you use a cam for?',
        answer: 'Protecting yourself from a fall while rock climbing.',
        wrongAnswers: ['To tighten your ski boots.', 'To ascend a rope.', 'To tie your shoe.'],
        funFact: 'A cam, or spring-loaded camming device, is a piece of rock climbing protection that can be placed into a crack to secure the rope.  Unlike a piton, these devices can be easily removed after use.  They distribute roughly twice as much force outward and is exerted down on them by a fallen climber and thus stop the fall!',
        image: '<img src="assets/images/cam.png" alt="A spring-loaded camming device placed in a crack.">'
    },
}

// Variables

let usedQuestions = [],
    currentQuestion = '',
    totalQuestions = 0,
    correctAnswers = 0,
    incorrectAnswers = 0,
    unanswered = 0,
    timerId,
    displayTimerId,
    time = 15;


// FUNCTIONS

// Picks a random number between 1-6 to use as a question index.
function randomQuesNumber () {
    return Math.floor((Math.random() * 6) + 1);
}

// Returns a question when provided a random index number.
function getRandomQuestion (randomNum, obj) {
    return obj['question' + randomNum];
}

/* Returns a selector for one of the four answer list items so that the right
    and wrong answers are in random locations. */
function chooseRanAnsSelctor () {
    return $('#answer-' + Math.floor((Math.random() * 4) + 1));
}

// The actual timer for each question that will end the question.
function timerForEachQuestion () {
    timerId = setTimeout(() => {
        showResultPage();
        $('#result').text('You ran out of time!');
        $('#fun-fact').text(currentQuestion.funFact);
        $('#image').empty().append(currentQuestion.image);
        unanswered++;
        clearInterval(displayTimerId);
        setTimeout(nextQuestion, 10 * 1000);
    }, 15 * 1000)
}

// Displays how many seconds are left on each question.
function displayTimer () {
    $('#time-span').show();
    displayTimerId = setInterval (() => {
        time--;
        $('#timer').text(time);
    }, 1000);
}

// Hides divs and images, resets time, and starts a new question.
function nextQuestion () {
    $('#result, #fun-fact, #image').hide();
    $('#image').empty();
    time = 15;
    pickAndPlayQuestion();
}

// Hide and show proper divs for the result screen.
function showResultPage () {
    $('li, #time-span, #question').hide();
    $('#result, #fun-fact, #image').show();
}

/* The function that will pick questions, start timers, hide and show the 
    proper divs, display the answers randomly, and end the game when the
    maximum amount of questions have been reached. */
function pickAndPlayQuestion () {
    totalQuestions++;
    $('#timer').text('15');

    // End the game and display the final screen and restart button.
    if (totalQuestions === 7) {
        $('li, #fun-fact, #image, #time-span').hide();
        $('#result, #scores, #restart-button').show();
        $('#result').text('All done, here\s how you did!');

        $('#scores').empty();
        $('#scores').append('Correct Answers: ', correctAnswers, '<br>');
        $('#scores').append('Incorrect Answers: ', incorrectAnswers, '<br>');
        $('#scores').append('Unanswered: ', unanswered);
        return;
    }

    // Start the timers.
    timerForEachQuestion();
    displayTimer();
    
    // Show and empty proper divs.
    $("li, #question").show();
    $('.choices, #question').empty();

    // Choose and assign a random question object to use this round.
    currentQuestion = getRandomQuestion(randomQuesNumber(), gameQuestions);
    // Reassign the random question until an unused question is chosen.
    while (usedQuestions.includes(currentQuestion.question)) {
        currentQuestion = getRandomQuestion(randomQuesNumber(), gameQuestions);
    }
    // Push currentQuestion to usedQuestions so the same Q isn't used twice.
    usedQuestions.push(currentQuestion.question);
    // Display the current question.
    $("#question").text(currentQuestion.question);

    // Assign the selector of a random answer line for the correct answer.
    let rightAnswerSelctor = chooseRanAnsSelctor();
    // Display the correct answer.
    rightAnswerSelctor.text(currentQuestion.answer);
    
    /* Loop through the wrong answers array and continue to reassign random
        selectors until each empty line is filled. */
    for (i = 0; i < currentQuestion.wrongAnswers.length; i++) {
        let currentWrongAnswer = chooseRanAnsSelctor();
        while (!currentWrongAnswer.is(':empty')) {
            currentWrongAnswer = chooseRanAnsSelctor();
        }
        currentWrongAnswer.text(currentQuestion.wrongAnswers[i]);
    }

    // Animate the choices into the viewframe.
    choicesAnime.play(); 
}



/* When an answer is clicked, stop the timers, check if the answer is correct
    or not, and display the results screen. */
$(".choices").on('click', function() {
    clearTimeout(timerId);
    clearInterval(displayTimerId);
    if ($(this).text() === currentQuestion.answer) {
        showResultPage();
        $('#result').text('That\'s right!');
        $('#fun-fact').text(currentQuestion.funFact);
        $('#image').empty().append(currentQuestion.image);
        correctAnswers++;
        setTimeout(nextQuestion, 10 * 1000);
    } else {
        showResultPage();
        $('#result').text('Nope, wrong answer!');
        $('#fun-fact').text(currentQuestion.funFact);
        $('#image').empty().append(currentQuestion.image);
        incorrectAnswers++;
        setTimeout(nextQuestion, 10 * 1000);
    }
});


// ANIMATIONS - Uses anime.js library.

anime({
    targets: '.main-container',
    translateY: {
        value: -940,
        duration: 2000,
        endDelay: 1000
    },
});

anime({
    targets: '#header',
    translateX: -3000,
    translateY: -1000,
    duration: 2000,
    delay: 500
});

let choicesAnime = anime({
    targets: ".choices",
    translateX: {
        value: 1000,
        duration: 800
    },
    opacity: '1',
    delay: function (element, iter, totTargets) {
        return iter * 400
    },
    autoplay: false
})


// GAMEPLAY

// Hide proper divs when the game first loads and display the opening image.
$(document).ready(function () {
    $('li, #result, #time-span, #restart-button, #scores').hide();
    $('#image').append('<img id="start-image" src="assets/images/opening-page.png" alt="Mt Shucksan" style="position: relative; top: -120px; height: auto; width: 100%">');
})

// Start game and hide the start button when it is first clicked.
$('#start-button').on('click', function() {
    $('#start-button, #image').hide();
    $('#image').empty();
    pickAndPlayQuestion();
});

// Reset variables and hide proper divs to restart the game.
$('#restart-button').on('click', function() {
    $('#result, #restart-button, #scores, .choices').hide();
    usedQuestions = [];
    currentQuestion = '';
    totalQuestions = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
    time = 15;
    pickAndPlayQuestion();
});




