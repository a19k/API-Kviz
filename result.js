

const scoreDisplay = document.querySelector(".score");

let i = 0;
const intervalID = setInterval(()=>{
    if(i>=localStorage.score)clearInterval(intervalID);
    scoreDisplay.textContent = i;
    i++;
},200)

const backButton = document.addEventListener("click",()=>{
    window.location = "./index.html"
})