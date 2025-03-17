
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

//amount of questions
const length = quiz.length;

//predefines data so listeners can use it
let question;
let correctAnswer;
let answers
let score = 0;
let timerID;

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
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

//EVENT LISTENERS FOR ABCD RADIO BUTTONS
//marks green for correct, pink for incorrect
//then stops the timer, waits for a second and starts from next question
//sometimes skips question, idk why, maybe
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
    i += 20 - (i % 20)
    play();
})

//same as A
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
    i += 20 - (i % 20)
    play();
})

//same as A
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
    i += 20 - (i % 20)
    play();
})

//same as A
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
    i += 20 - (i % 20)
    play();
})

//
const nextQuestion = () => {
    
    //if time elapsed end quiz, go to result page, result.html
    if (i / 20 >= length) {
        clearInterval(timerID);
        timerField.textContent = 0;
        localStorage.score = score;
        
        window.location = "./result.html";
    }

    //every 20 seconds , reset html elements, display new question and answers
    if (i % 20 === 0) {
        radioA.checked = false;
        radioB.checked = false;
        radioC.checked = false;
        radioD.checked = false;
        answerFieldA.style.backgroundColor = "transparent"
        answerFieldB.style.backgroundColor = "transparent"
        answerFieldC.style.backgroundColor = "transparent"
        answerFieldD.style.backgroundColor = "transparent"

        question = quiz[i / 20].question.text;
        correctAnswer = quiz[i / 20].correctAnswer;
        answers = quiz[i / 20].incorrectAnswers;
        answers.push(correctAnswer);
        randomSort(answers);

        questionField.textContent = (Math.ceil(i/20)+1)+". "+question;
        answerFieldA.textContent = answers.pop();
        answerFieldB.textContent = answers.pop();
        answerFieldC.textContent = answers.pop();
        answerFieldD.textContent = answers.pop();
    }

    //update timer and iterate
    timerField.textContent = 20 - (i % 20);
    i++;
}

//i is time counter, displays first question before timer makes it wait 20 seconds
let i = 0;
nextQuestion();

//activates timer which activates next question every 20 seconds
const play = () => {
    timerID = setInterval(nextQuestion, 1000);
}

play();