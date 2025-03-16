import getData from "./query.js";

const slider = document.querySelector("#slider");
const sliderDisplay = document.querySelector("#sliderDisplay");
const categorySelect = document.querySelector("#categorySelect");
const difficultySelect = document.querySelector("#difficultySelect");
const playButton = document.querySelector(".circle");

slider.max = 50;
slider.min = 3;
slider.value = 3;
sliderDisplay.textContent = slider.value

slider.addEventListener("input",()=>{
    sliderDisplay.textContent = slider.value;
})

playButton.addEventListener("click",()=>{
    console.log(categorySelect.value,difficultySelect.value);

    if(categorySelect.value!=="Category"){
        if(difficultySelect.value!=="Difficulty"){
            localStorage.limit = slider.value;
            localStorage.category = categorySelect.value;
            localStorage.difficulty = difficultySelect.value;
            window.location="./game.html"
        }
        else alert("Please choose a difficulty.");
    }
    else alert("Please choose a category.");
});

let url = "https://the-trivia-api.com/v2/questions";

url += "?limit=" + localStorage.limit + "&categories=" + localStorage.category + "&difficulties=" + localStorage.difficulty;

getData(url);