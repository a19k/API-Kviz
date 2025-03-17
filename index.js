
import getData from "./query.js";

let url = "https://the-trivia-api.com/v2/questions";

const slider = document.querySelector("#slider");
const sliderDisplay = document.querySelector("#sliderDisplay");
const categorySelect = document.querySelector("#categorySelect");
const difficultySelect = document.querySelector("#difficultySelect");
const playButton = document.querySelector(".circle");

slider.max = 50;
slider.min = 3;
slider.value = 3;
sliderDisplay.textContent = slider.value

slider.addEventListener("input", () => {
    sliderDisplay.textContent = slider.value;
})

playButton.addEventListener("click", async () => {
    console.log(categorySelect.value, difficultySelect.value);

    if (categorySelect.value !== "Category") {
        if (difficultySelect.value !== "Difficulty") {

            url += "?limit=" + slider.value + "&categories=" + categorySelect.value + "&difficulties=" + difficultySelect.value;

            await getData(url);

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





