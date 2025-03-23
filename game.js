
//parse questions to JSON from string in local storage
const quiz = JSON.parse(localStorage.quiz);

//html elements selector
// answerField corresponds to radio
const questionField = document.querySelector(".question-field");
const answerFieldA = document.querySelector("#Aanswer");
const answerFieldB = document.querySelector("#Banswer");
const answerFieldC = document.querySelector("#Canswer");
const answerFieldD = document.querySelector("#Danswer");
const radioA = document.querySelector("#A");
const radioB = document.querySelector("#B");
const radioC = document.querySelector("#C");
const radioD = document.querySelector("#D");
const timerField = document.querySelector(".timer");
const backButton = document.querySelector(".back")

//global
const length = +(localStorage.limit);
let question;
let correctAnswer;
let answers
let score = 0;
let timerID;
//question no.
let currentQuestion = 0;
//secondsLeft is time since current question started
let secondsLeft = 20;



//back to index.html
backButton.addEventListener("click", () => {
    window.location = "./index.html"
})


//EVENT LISTENERS FOR ABCD RADIO BUTTONS
//raises score if correct
//marks green for correct, pink for incorrect
//then skips timer to answer reveal
radioA.addEventListener("change", () => {
    if (answerFieldA.textContent === correctAnswer) score++;
    secondsLeft = 0;
    colorAnswers();
    disableRadio();
})

//same as A
radioB.addEventListener("change", () => {
    if (answerFieldB.textContent === correctAnswer) score++;
    secondsLeft = 0;
    colorAnswers();
    disableRadio();
})

//same as A
radioC.addEventListener("change", () => {
    if (answerFieldC.textContent === correctAnswer) score++;
    secondsLeft = 0;
    colorAnswers();
    disableRadio();
})

//same as A
radioD.addEventListener("change", () => {
    if (answerFieldD.textContent === correctAnswer) score++;
    secondsLeft = 0;
    colorAnswers();
    disableRadio();
})


//array elements shuffle, Fisher-Yates(Knuth) algoritm according to stackOverflow
//used to randomize correct answer distribution
const randomSort = (array) => {

    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

const colorAnswers = () => {
    //A
    if (answerFieldA.textContent === correctAnswer)
        answerFieldA.style.backgroundColor = "palegreen";
    else
        answerFieldA.style.backgroundColor = "pink";
    //B
    if (answerFieldB.textContent === correctAnswer)
        answerFieldB.style.backgroundColor = "palegreen";
    else
        answerFieldB.style.backgroundColor = "pink";
    //C
    if (answerFieldC.textContent === correctAnswer)
        answerFieldC.style.backgroundColor = "palegreen";
    else
        answerFieldC.style.backgroundColor = "pink";
    //D
    if (answerFieldD.textContent === correctAnswer)
        answerFieldD.style.backgroundColor = "palegreen";
    else
        answerFieldD.style.backgroundColor = "pink";
}

const clearInterface = () => {
    radioA.checked = false;
    radioB.checked = false;
    radioC.checked = false;
    radioD.checked = false;
    answerFieldA.style.backgroundColor = "transparent"
    answerFieldB.style.backgroundColor = "transparent"
    answerFieldC.style.backgroundColor = "transparent"
    answerFieldD.style.backgroundColor = "transparent"
}

const prepareQuestion = () => {

    question = quiz[currentQuestion].question.text;
    correctAnswer = quiz[currentQuestion].correctAnswer;
    answers = quiz[currentQuestion].incorrectAnswers;
    
    answers.push(correctAnswer);

    randomSort(answers);

    questionField.textContent = (currentQuestion + 1) + ". " + question;
    answerFieldA.textContent = answers.pop();
    answerFieldB.textContent = answers.pop();
    answerFieldC.textContent = answers.pop();
    answerFieldD.textContent = answers.pop();
}


const disableRadio = () => {
    radioA.disabled = true;
    radioB.disabled = true;
    radioC.disabled = true;
    radioD.disabled = true;
}

const enableRadio = () => {
    radioA.disabled = false;
    radioB.disabled = false;
    radioC.disabled = false;
    radioD.disabled = false;
}

const newQuestion = () => {

    //if time elapsed end quiz, go to result page, result.html
    if (currentQuestion >= length) {
        clearInterval(timerID);
        timerField.textContent = 0;
        localStorage.score = score;

        window.location = "./result.html";
    }

    //immediately display new question
    if (secondsLeft === 20) {
        clearInterface();
        enableRadio();
        prepareQuestion();
    }

    //after 20 seconds show correct answer
    if (secondsLeft === 0) {
        colorAnswers();
        disableRadio();
    }

    //update timer and iterate
    timerField.textContent = secondsLeft--;

    //wait a second and proceed to next question
    if (secondsLeft === -1) {
        secondsLeft = 20;
        currentQuestion++;
    }

}

//displays first question before timer makes it wait 20 seconds
newQuestion(true);

//activates timer which activates next question every 20 seconds
const play = () => {
    timerID = setInterval(newQuestion, 1000);
}

play();