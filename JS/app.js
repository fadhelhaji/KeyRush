const Btn = document.querySelector(".startBtn")
const roundCount = document.querySelector(".text")
const timeBar = document.querySelector(".time-progress")
const timeLeft = document.querySelector(".time-left")
const key = document.querySelector(".key1")

let compArray = ["a", "b", "c"]
let userArray = []
let generateNum = Math.floor(Math.random() * compArray.length);
let randomValue = compArray[generateNum]


function startCountDown() {
        let interval = 10
            let countBar = setInterval(function () {
                interval--;
                let barWidth = interval * 10
                if (interval >= 0) {
                    timeBar.style.width = barWidth + '%'
                    timeLeft.innerHTML = interval
                } else {
                    clearInterval(countBar)
                    timeBar.style.width = "0%"
                    timeBar.innerHTML = "Game Over"
                }
            }, 1000)
        Btn.remove()
}

function keyDisplay() {
        setTimeout(()=>{
            key.innerHTML = randomValue
            key.style.display = "block"
        }, 5000)
        
        setTimeout(()=>{
            key.style.display = "none"
            document.addEventListener('keydown',handleKeyDown)

        },6000)
}

function handleKeyDown(event){
            userArray.push(event.key)
            //console.log(userArray);
        if(event.key === randomValue){
            Btn.innerHTML = event.key.innerHTML
            key.style.display = "block"
            key.style.backgroundColor = "green"
        } else {
            key.style.display = "block"
            key.style.backgroundColor = "red"
        }
    }

function startGame() {
   startCountDown()
   keyDisplay()
   userInput()
}

Btn.addEventListener('click', startGame)

  
