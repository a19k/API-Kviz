import getData from "./query.js";

const slider = document.querySelector("#slider");
const sliderDisplay = document.querySelector("#sliderDisplay");

slider.max = 50;
slider.min = 3;
slider.value = 3;
sliderDisplay.textContent = slider.value

slider.addEventListener("input",()=>{
    sliderDisplay.textContent = slider.value;
})


let url = "https://the-trivia-api.com/v2/questions";
let category = "music";
let difficulty = "easy";
let limit = "5";

url += "?limit=" + limit + "&categories=" + category + "&difficulties=" + difficulty;

getData(url);