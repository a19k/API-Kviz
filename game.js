
const quiz = JSON.parse(localStorage.quiz);
console.log(quiz);

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

const length = quiz.length;
let question;
let correctAnswer;
let answers

let score = 0;
let timerID;


const randomSort = (array) => {

    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

radioA.addEventListener("change", () => {
    if (answerFieldA.textContent === correctAnswer) {
        score++;
        answerFieldA.style.backgroundColor = "palegreen";
    }
    else {
        answerFieldA.style.backgroundColor = "pink";
    }
    clearInterval(timerID);
    setTimeout(() => { }, 1000);
    i += 5 - (i % 5)
    play();
})

radioB.addEventListener("change", () => {
    if (answerFieldB.textContent === correctAnswer) {
        score++;
        answerFieldB.style.backgroundColor = "palegreen";
    }
    else {
        answerFieldB.style.backgroundColor = "pink";
    }
    clearInterval(timerID);
    setTimeout(() => { }, 1000);
    i += 5 - (i % 5)
    play();
})

radioC.addEventListener("change", () => {
    if (answerFieldC.textContent === correctAnswer) {
        score++;
        answerFieldC.style.backgroundColor = "palegreen";
    }
    else {
        answerFieldC.style.backgroundColor = "pink";
    }
    clearInterval(timerID);
    setTimeout(() => { }, 1000);
    i += 5 - (i % 5)
    play();
})

radioD.addEventListener("change", () => {
    if (answerFieldD.textContent === correctAnswer) {
        score++;        
        answerFieldD.style.backgroundColor = "palegreen";
    }
    else {
        answerFieldD.style.backgroundColor = "pink";
    }
    clearInterval(timerID);
    setTimeout(() => { }, 1000);
    i += 5 - (i % 5)
    play();
})

const nextQuestion = () => {

    if (i / 5 >= length) {
        clearInterval(timerID);
        timerField.textContent = 0;
        localStorage.score = score;
        
        window.location = "./result.html";
    }

    if (i % 5 === 0) {
        radioA.checked = false;
        radioB.checked = false;
        radioC.checked = false;
        radioD.checked = false;
        answerFieldA.style.backgroundColor = "transparent"
        answerFieldB.style.backgroundColor = "transparent"
        answerFieldC.style.backgroundColor = "transparent"
        answerFieldD.style.backgroundColor = "transparent"

        question = quiz[i / 5].question.text;
        correctAnswer = quiz[i / 5].correctAnswer;
        answers = quiz[i / 5].incorrectAnswers;
        answers.push(correctAnswer);
        randomSort(answers);

        console.log(question, correctAnswer, answers);

        questionField.textContent = question;
        answerFieldA.textContent = answers.pop();
        answerFieldB.textContent = answers.pop();
        answerFieldC.textContent = answers.pop();
        answerFieldD.textContent = answers.pop();
    }

    timerField.textContent = 5 - (i % 5);
    i++;
}

let i = 0;
nextQuestion();

const play = () => {
    timerID = setInterval(nextQuestion, 1000);
}

play();