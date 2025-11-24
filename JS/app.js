const Btn = document.querySelector(".startBtn")
const clickBtn = document.querySelector(".clicker")
const roundCount = document.querySelector(".text")
const timeBar = document.querySelector(".time-progress")
const timeLeft = document.querySelector(".time-left")
const key = document.querySelectorAll(".key")

const answers = []
let compArray = ["a", "b", "c"]
let interval;

function startCountDown() {
            interval = 10;
            let countBar = setInterval(function () {
                interval--;
                let barWidth = interval * 10
                if (interval >= 0) {
                    timeBar.style.width = barWidth + '%'
                    timeLeft.innerHTML = interval.toFixed(0)
                } else {
                    clearInterval(countBar)
                    timeBar.style.width = "0%"
                    timeBar.innerHTML = "Game Over"
                }
            }, 1000)
        Btn.remove()
        clickBtn.style.display = "block"
        
}

function keyDisplay() {
    let generateNum = Math.floor(Math.random() * compArray.length);
    randomValue = compArray[generateNum]
    //console.log(randomValue);
    
        setTimeout(()=>{
            key.forEach((k, index) => {
                k.innerHTML = compArray[index]
                k.style.display = "block"    
            }); 
        }, 2000)
        
        setTimeout(()=>{
            key.forEach(k => {
                k.style.display = "none"
            }); 
            document.addEventListener('keypress',handleKeyDown)
        },3000)
    }

    function handleKeyDown(event) {
        console.log('KEYDOWN SALMAN')
        if(answers.length === 0){
            console.log('Salman first letter')
                key[0].style.display = "block"

            if(event.key === compArray[0]){
                key[0].style.backgroundColor = "green"
                answers.push(event.key)
                console.log(answers)

            }
            else {
            key[0].style.backgroundColor = "red"
                answers.push(event.key)
                wrongAns()
            }
        }

        else if(answers.length === 1){
            console.log('Salman second letter')
                key[1].style.display = "block"

            if(event.key === compArray[1]){
                key[1].style.display = "block"
                key[1].style.backgroundColor = "green"
                answers.push(event.key)
            }
            else {
            key[1].style.backgroundColor = "red"
                answers.push(event.key)
                wrongAns()
            }
        }
        else if(answers.length === 2){
            console.log('Salman third letter')
            key[2].style.display = "block"

            if(event.key === compArray[2]){
                key[2].style.display = "block"
                key[2].style.backgroundColor = "green"
                answers.push(event.key)
            }
            else {
            key[2].style.backgroundColor = "red"
            wrongAns()
            }
        }
            console.log(answers)
}

function wrongAns() {
    interval -= 1
}

function addTime() {
    clickBtn.addEventListener('click', ()=>{
        if(interval < 10) {
            interval += 0.25
            
            let barWidth = interval * 10
            timeBar.style.width = barWidth + '%'
            timeLeft.innerHTML = interval.toFixed(0)
        }
    })
}

function startGame() {
   startCountDown()
   keyDisplay()
   addTime()
}

Btn.addEventListener('click', startGame)