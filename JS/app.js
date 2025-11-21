const Btn = document.querySelector(".startBtn")
const roundCount = document.querySelector(".text")
const timer = document.querySelector(".time-progress")

Btn.addEventListener('click', ()=> {
    roundCount.innerHTML = "1"
    setInterval(function(){
        console.log("Hi")
    }, 1000);
})