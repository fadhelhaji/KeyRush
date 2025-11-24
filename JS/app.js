const Btn = document.querySelector(".startBtn")
const roundCount = document.querySelector(".text")
const timeBar = document.querySelector(".time-progress")
const timeLeft = document.querySelector(".time-left")
const key = document.querySelectorAll(".key")

let compArray = ["a", "b", "c"]
let userArray = []
//let generateNum = Math.floor(Math.random() * compArray.length);
let randomValue //= compArray[generateNum]
//console.log(randomValue);



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
    let generateNum = Math.floor(Math.random() * compArray.length);
    randomValue = compArray[generateNum]
        setTimeout(()=>{
            key.forEach(k => {
                k.innerHTML = randomValue
                k.style.display = "block"    
            }); 
        }, 5000)
        
        setTimeout(()=>{
            key.forEach(k => {
                k.style.display = "none"
                document.addEventListener('keydown',handleKeyDown)
            }); 

        },6000)
}

function handleKeyDown(event){
            userArray.push(event.key)
            //console.log(userArray);
        if(event.key === randomValue){
            key.forEach(k => {
                //Btn.innerHTML = event.key
                k.style.display = "block"
                k.style.backgroundColor = "green"
                //document.removeEventListener('keydown',handleKeyDown)  
            }); 
        } else {
            key.forEach(k => {
                k.style.display = "block"
                k.style.backgroundColor = "red"
                //document.removeEventListener('keydown',handleKeyDown)
            }); 
        }
        document.removeEventListener('keydown',handleKeyDown)
    }

function startGame() {
   startCountDown()
   keyDisplay()
   //handleKeyDown()
}

Btn.addEventListener('click', startGame)