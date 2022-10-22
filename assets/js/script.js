// Challenge Code

// Declared Variables
const question = document.getElementById("question");
const choices = document.getElementById("choices");
var result = document.getElementById("result");
var currentTime = document.getElementById("secondsLeft");
var challengeContainer = document.getElementById("challenge");
var finalContainer = document.getElementById("final-result");
var finalResult = document.getElementById("finalScore");
var formInitial = document.getElementById("initial-form")
var inputInitial = document.getElementById("initial-input");
var questionIndex = 0;
var secondsLeft = 75;
var timeInterval = 0;
var finalScore = 0;

// Created Array of Objects
var questions = [
    {
        question: "Which of the following is used to return the DOM element with id in JavaScript?",
        choices: ["window.getElementbyID(...)", "document.getElementbyId(...)", "addEventListener(...)", "None of the Above"],
        answer: "document.getElementbyId(...)"
    },
    {
        question: "How to write an IF statement for executing a code if 'i' is NOT equal to 5?",
        choices: ["if (i != 5)", "if i <> 5", "if i =! 5 then", "while i = 1 to 10"],
        answer: "if (i != 5)"
    },
    {
        question: "How to round the number 9.25 to the nearest integer",
        choices: ["Math.rnd(9.25)", "round[9.25]", "Math.round(9.25)", "rnd(9.25)"],
        answer: "Math.round(9.25)"
    },
    {
        question: "Which statement cannot be used to declare a variable in JavaScript?",
        choices: ["let", "var", "int", "const"],
        answer: "int"
    },
    {
        question: "Which operator is used to assign a value to a variable",
        choices: ["*", "-", "%", "="],
        answer: "="
    },
]
// This function renders questions in challenge html
function renderQuestion(index = 0) {
    question.innerHTML = "";
    choices.innerHTML = "";
    currentTime.textContent = secondsLeft;
    const userQuestion = questions[index];
    question.textContent = userQuestion.question;
    userQuestion.choices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        choices.appendChild(listItem);
        listItem.addEventListener("click", (compareAnswer))

    })
}
// This function compares answers and returns Correct or Wrong Answers
function compareAnswer(e) {
    const element = e.target;
    if (element.textContent == questions[questionIndex].answer) {
        console.log(element);
        result.textContent = "Correct";
    }
    else {
        secondsLeft = secondsLeft - 10;
        result.textContent = "Wrong"
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        result.textContent = "End of Challenge"

        completedChallenge();
    }
    else {
        renderQuestion(questionIndex);
    }

}
// This function initiates the timer and calculates remaining seconds
function timer() {
    if (timeInterval === 0);
    timeInterval = setInterval(function () {
        secondsLeft--
        currentTime.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timeInterval);
        }
    },
        1000
    )
}
// This function finalizes the score on challenge html
function completedChallenge() {
    question.innerHTML = "";
    choices.innerHTML = "";
    challengeContainer.style.display = "none";
    finalContainer.style.display = "block";
    finalScore = secondsLeft;
    finalResult.textContent = finalScore;
    clearInterval(timeInterval);
    formInitial.addEventListener("submit", function (e) {
        e.preventDefault()
        const initials = inputInitial.value;
        if (initials == null) {
            console.log("No initials entered")
        }
        else {
            const singleScore = {
                initials: initials,
                score: finalScore
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = []
            }
            else {
                allScores = JSON.parse(allScores)
            }
            allScores.push(singleScore);
            localStorage.setItem("allScores", JSON.stringify(allScores));
            window.location.replace("./score.html");
        }

    })
}

timer();
renderQuestion();
