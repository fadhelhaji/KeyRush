const Btn = document.querySelector(".startBtn")
const clickBtn = document.querySelector(".clicker")
const roundCount = document.querySelector(".text")
const timeBar = document.querySelector(".time-progress")
const timeLeft = document.querySelector(".time-left")
const keys = document.querySelectorAll(".key")
// console.log(keys)
const bottom1 = document.querySelector(".bottom-console-round1")
const bottom2 = document.querySelector(".bottom-console-round2")
const bottom3 = document.querySelector(".bottom-console-round3")


const answers = []
let compArray = ["a", "b", "c", "d", "e"]

let interval;
let level = 1

const fishEasy = [
  { name: "Coral Snapper", difficulty: 1 },
  { name: "Blue Minnow", difficulty: 1 },
  { name: "Silver Darter", difficulty: 1 },
];

const fishMedium = [
  { name: "Golden Pike", difficulty: 2 },
  { name: "Shadow Trout", difficulty: 2 },
  { name: "Spotted Barrin", difficulty: 2 },
];
const fishHard = [
  { name: "Crimson Fangfish", difficulty: 3 },
  { name: "Titan Grouper", difficulty: 3 },
  { name: "Abyss Serpentfin", difficulty: 3 }
];

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

shuffle(compArray)
console.log(compArray)


function startCountDown() {
            roundCount.innerHTML = "LEVEL.1"
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
    
        setTimeout(()=>{
            keys.forEach((k, index) => {
                k.innerHTML = compArray[index]
                k.style.display = "block"    
            }); 
        }, 2000)
        
        setTimeout(()=>{
            keys.forEach(k => {
                k.style.display = "none"
            }); 
            document.addEventListener('keypress',handleKeyDown)
        },3000)
    }

    let counter = 0

    let currentExpectedKey = compArray[counter]
    let isGameOver = false;

function handleKeyDown(event) { 
    let userEntry = event.key
    let element = keys[counter];
    if(userEntry === currentExpectedKey && !isGameOver) {
        element.textContent = event.key
        element.style.backgroundColor = "green"
        element.style.display = "block"
        currentExpectedKey = compArray[counter+1]
        counter++;
    } 
    else {
        element.style.backgroundColor = "red"
        element.style.display = "block"
        isGameOver = true
        
         setTimeout(()=>{
                    bottom1.style.display = "none"
                    nextRound()
        },2000)
    }

}

function nextRound() {
    shuffle(compArray) //Array is shuffed again
    interval = 10
    //Do the shit where you call the randomized array to be diplsyaed to the user
    bottom2.style.display = "block"
    handleKeyDown()
    //call the previous function which is the handleKeyDown
    //Note that you should handle the rounds depending on the current round eg. if at round 1 atm, on game over, end round 1 and start 2 etc......
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
        caught()
    })
}


// function bottom(){
    //     bottom1.style.display = "none"
    // }
    
    function proceedNext(){
        if (compArray.length !== answers.length) {
            console.log(answers.length)
            return false;
        } else {
            console.log('salman')
            compArray.every((value, index) => value === answers[index])
            roundCount.innerHTML = "Level.2"
        }
        bottom1.style.display = "none"
    }
    
    function difficulty(){
        let fish = Math.floor(Math.random() * fishEasy.length);
        console.log(fish);
        if (roundCount.innerHTML === 'LEVEL.1') {
            // console.log("ush");
            if (fish === 0) {
                console.log(fishEasy[0])
            }
            else if (fish === 1) {
                console.log(fishEasy[1])
            }
            else {
                console.log(fishEasy[2]);
            }
        }
    }
    
    function caught() {
        let barIsFull = false;
        bar = parseInt(timeBar.style.width)
        if (bar === 100 && !barIsFull) {
            console.log("You caught a fish!");
            barIsFull = true;
        }
    }
    
    function startGame() {
       startCountDown()
       keyDisplay()
       addTime()
       //bottom()
       difficulty()
       proceedNext()
    }
    
    
    Btn.addEventListener('click', startGame)
    