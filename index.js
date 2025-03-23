
import getData from "./query.js";
//common url
const baseURL = "https://the-trivia-api.com/v2/questions";

//interactive html elements
const slider = document.querySelector("#slider");
const sliderDisplay = document.querySelector("#sliderDisplay");
const categorySelect = document.querySelector("#categorySelect");
const difficultySelect = document.querySelector("#difficultySelect");
const playButton = document.querySelector(".circle");

//predefined values for slider and its value display
slider.max = 50;
slider.min = 3;
slider.value = 3;
sliderDisplay.textContent = slider.value

//update listener for slider value display
slider.addEventListener("input", () => {
    sliderDisplay.textContent = slider.value;
})

//click on play button
playButton.addEventListener("click", async () => {

    //check if category and difficulty selected
    if (categorySelect.value !== "Category") {
        if (difficultySelect.value !== "Difficulty") {

            //saving settings for verification
            localStorage.setItem("category", categorySelect.value);
            localStorage.setItem("difficulty", difficultySelect.value);
            localStorage.setItem("limit", slider.value);

            //modify url to user's settings
            let url = baseURL + "?limit=" + slider.value + "&categories=" + categorySelect.value + "&difficulties=" + difficultySelect.value;

            //getData fetches data from trivia API
            await getData(url);

            //if no error, change page to game.html
            const errorCode = verifyData();
            if (errorCode === 0) window.location = "./game.html";
            else displayWarning(errorCode);
        }
        else alert("Please choose a difficulty.");
    }
    else alert("Please choose a category.");
});


const verifyData = () => {
    const quiz = JSON.parse(localStorage.quiz);
    let errorCode = 0;

    //check for fetch error
    if (quiz === -1) {
        errorCode = 1;
        //log
        return errorCode;
    }

    //check for incorrect data format
    if (!Array.isArray(quiz)) {
        errorCode = 2;
        //log
        return errorCode;
    }

    //check for incorrect amount of questions
    if (quiz.length !== Number(localStorage.limit)) {
        errorCode = 3;
        //log
        return errorCode;
    }

    //check for incorrect category and difficulty of each question
    for(let i = 0; i < quiz.length ; i++){
        if (quiz[i].category !== localStorage.category) {
            errorCode = 4;
            return errorCode;
        }
        if (quiz[i].difficulty !== localStorage.difficulty) {
            errorCode = 5;
            return errorCode;
        }
    }

    return errorCode;
}

const displayWarning = (errorCode)=>{
    const warning = document.querySelector(".warning");
    const warningContent = document.querySelector(".warning-content");

    //show warning modal
    warning.style.display = "flex";
    warningContent.textContent = "An error occured while fetching questions" + " : " + errorCode;

    //reload page on click
    warning.addEventListener("click",()=>{
        window.location.reload();
    })
}