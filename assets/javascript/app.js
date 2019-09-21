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
        image: '<img src="assets/images/trad.jpg" alt="A person placing climbing protection into a wall.">'
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
        funFact: 'Although a toy called the Snurfer had already existed, Jake Burton was the first person to add rigid bindings and a laminate core to a board and hence is credited as making the first snowboard!',
        image: '<img src="assets/images/burton.png" alt="Jake Burton with a snowboard on his back.">'
    },
    question6: {
        question: 'What would you use a cam for?',
        answer: 'Protecting yourself from a fall while rock climbing.',
        wrongAnswers: ['To tighten your ski boots.', 'To ascend a rope.', 'To tie your shoe.'],
        funFact: 'A cam, or spring-loaded camming device, is a piece of rock climbing protection that can be placed into a crack to secure the rope.  Unlike a piton, these devices can be easily removed after use.  They distribute roughly twice as much force outward and is exerted on them by a fallen climber and thus stop the fall!',
        image: '<img src="assets/images/cam.png" alt="A spring-loaded camming device placed in a crack.">'
    },
}

// Variables

let usedQuestions = [],
    totalQuestions = 0,
    correctAnswers = 0,
    incorrectAnswers = 0,
    unanswered = 0;


// FUNCTIONS

function randomQuesNumber () {
    return Math.floor((Math.random() * 6) + 1);
}

function chooseRanAnsSelctor () {
    return $('#answer-' + Math.floor((Math.random() * 4) + 1));
}

function questionTimer () {
    let timer = setTimeout(function (){/*TODO choose what happens when you run of out time.*/}, 30000);
}

function getRandomQuestion (randomNum, obj) {
    return obj['question' + randomNum];
}

function pickAndPlayQuestion () {
    totalQuestions++;
    if (totalQuestions === 7) {
        return;
    }
    $("li").show();
    // Remove existing text from the .choices divs.
    $('.choices').text('');
    // Remove existing text from the #question div.
    $('#question').text('');
    // Assign a random question object.
    let currentQuestion = getRandomQuestion(randomQuesNumber(), gameQuestions);
    // Reassign a random question until a new question is chosen.
    while (usedQuestions.includes(currentQuestion.question)) {
        currentQuestion = getRandomQuestion(randomQuesNumber(), gameQuestions);
    }
    // Assign to usedQuestions so the same Q isn't used twice.
    usedQuestions.push(currentQuestion.question);
    // Get the selector of a random list item to display the answer.
    let rightAnswerSelctor = chooseRanAnsSelctor();
    // Display the current question.
    $('#question').show();
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

    // Animate the choices into the viewframe.
    choicesAnime.play();

    $(".choices").on('click', function() {
        if ($(this).text() === currentQuestion.answer) {
            $('li').hide();
            $('#question').hide();
            $('#result').show().text('That\'s right!');
            $('#fun-fact').show().text(currentQuestion.funFact)
            $('#image').show().append(currentQuestion.image);
            $('#next-button').show();
        } else {
            $('li').hide();
            $('#question').hide();
            $('#result').show().text('Nope, wrong answer!');
            $('#fun-fact').show().text(currentQuestion.funFact);
            $('#image').show().append(currentQuestion.image);
            $('#next-button').show();
        }
    })
}


// ANIMATIONS


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


$(document).ready(function () {
    $('li').hide();
    $('#result').hide();
    $('#next-button').hide();
    $('#image').append('<img src="assets/images/opening-page.png" alt="Mt Shucksan" style="position: relative; top: -60px">');
})


$('#start-button').on('click', function() {
    $('#start-button').hide();
    $('#image').hide().text('');
    pickAndPlayQuestion();
});
$('#next-button').on('click', function() {
    $('#result').hide();
    $('#fun-fact').hide();
    $('#next-button').hide();
    $('#image').hide().text('');
    pickAndPlayQuestion();
});



