const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const progressElement = document.getElementById('progress');
const feedbackElement = document.getElementById('feedback');
const submitBtn = document.getElementById('submitBtn');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');


let currentQuestionIndex = 0;
let score = 0;


const questions = [{
        question: "What is the capital of France?",
        choices: ["Paris", "Berlin", "London", "Madrid"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        choices: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: 1
    },
    {
        question: "Which Country has Moon in Flag'?",
        choices: ["Pakistan", "London", "India", "Australia"],
        correctAnswer: 0
    }

];

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = "";

    question.choices.forEach((choice, index) => {
        const li = document.createElement("li");
        li.textContent = choice
        li.addEventListener("click", () => checkAnswer(index))
        choicesElement.appendChild(li);
    });
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    feedbackElement.textContent = '';
};

function checkAnswer(selectedindex) {
    const question = questions[currentQuestionIndex];
    // if (selectedIndex === null) {
    //     displayFeedback(null);
    //     return; // Exit early if no answer selected
    // }
    if (selectedindex === question.correctAnswer) {
        score++;
        displayFeedback(true);
    } else {
        displayFeedback(false);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayResults();
    }
};

function displayFeedback(isCorrect) {
    if (isCorrect === null) {
        feedbackElement.textContent = "Please choose any answer.";
        feedbackElement.style.color = "red";
    } else if (isCorrect) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Incorrect.";
        feedbackElement.style.color = "red";
    }
}

function displayResults() {
    questionElement.textContent = '';
    choicesElement.innerHTML = '';
    progressElement.textContent = '';
    submitBtn.style.display = 'none';
    resultsElement.style.display = 'block';
    scoreElement.textContent = `You scored ${score} out of ${questions.length}.`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    submitBtn.style.display = 'block';
    resultsElement.style.display = 'none';
    displayQuestion();
}

submitBtn.addEventListener('click', () => checkAnswer(null));
restartBtn.addEventListener('click', restartQuiz);

displayQuestion();