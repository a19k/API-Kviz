
const scoreDisplay = document.querySelector(".score");

// slowdown for counting score
let i = 0;
const intervalID = setInterval(()=>{
    if(i>=localStorage.score)clearInterval(intervalID);
    scoreDisplay.textContent = i;
    i++;
},200)

//back to index.html
const backButton = document.querySelector(".back")
backButton.addEventListener("click",()=>{
    window.location = "./index.html"
})