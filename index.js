
import getData from "./query.js";
//common url
let url = "https://the-trivia-api.com/v2/questions";

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

            //modify url to user's settings
            url += "?limit=" + slider.value + "&categories=" + categorySelect.value + "&difficulties=" + difficultySelect.value;

            //getData fetches data from trivia API
            await getData(url);

            //if no error, change page to game.html
            if (localStorage.quiz === -1) {
                alert("Error : API query failed.");
            }
            else {
                window.location = "./game.html"
            }
        }
        else alert("Please choose a difficulty.");
    }
    else alert("Please choose a category.");
});





