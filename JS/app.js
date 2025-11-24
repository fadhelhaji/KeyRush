const Btn = document.querySelector(".startBtn")
const roundCount = document.querySelector(".text")
const timeBar = document.querySelector(".time-progress")
const timeLeft = document.querySelector(".time-left")
const key = document.querySelectorAll(".key")
const answers = []
let compArray = ["a", "b", "c"]
//let generateNum = Math.floor(Math.random() * compArray.length);
let randomValue //= compArray[generateNum]
//console.log(randomValue);
let interval;

function startCountDown() {
            interval = 10;
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

function startGame() {
   startCountDown()
   keyDisplay()
}

Btn.addEventListener('click', startGame)