//
//CACHE
//

const Btn = document.querySelector(".startBtn")
const clickBtn = document.querySelector(".clicker")
const roundCount = document.querySelector(".text")
const timeBar = document.querySelector(".time-progress")
const timeBarBackground = document.querySelector(".time-bar")
const timeLeft = document.querySelector(".time-left")
const keys = document.querySelectorAll(".key")
const keys1 = document.querySelectorAll(".key1")
const keys2 = document.querySelectorAll(".key2")
const bottom1 = document.querySelector(".bottom-console-round1")
const bottom2 = document.querySelector(".bottom-console-round2")
const bottom3 = document.querySelector(".bottom-console-round3")

//
//VARIABLES
//

let compArray = ["a", "b", "c", "d", "e", "f", "g"]
// const answers = []
let level = 1;
let interval;
let counter = 0;
let currentExpectedKey = compArray[counter];
let isGameOver = false;
let element;
let userEntry;

//
//VARIABLE HELPERS
//

let currentRoundKeys = () => {
    if (level === 1) {
        return keys
    } else if (level === 2 ){
        return keys1
    } else if (level === 3){
        return keys2
    } else {
        return console.log("ERROR");
    }
}

//
//FUNCTION HELPERS
//

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

//
//ARRAYS
//

// const fishes = [
//   // Easy
//   { name: "Coral Snapper", difficulty: 1 },
//   { name: "Blue Minnow", difficulty: 1 },
//   { name: "Silver Darter", difficulty: 1 },
//   { name: "Golden Pike", difficulty: 2 },
//   { name: "Shadow Trout", difficulty: 2 },
//   { name: "Spotted Barrin", difficulty: 2 },
//   { name: "Crimson Fangfish", difficulty: 3 },
//   { name: "Titan Grouper", difficulty: 3 },
//   { name: "Abyss Serpentfin", difficulty: 3 },
// ];




// let countBar;

// let currentRoundEntries = () => {

//     if (level === 2){
//         setTimeout(() => {
//             bottom1.style.display = "none"
//         }, 1000)

//         setTimeout(() => {
//             bottom2.style.display = "block"
//         }, 1200)
//     } else if (level === 3){
//         setTimeout(() => {
//             bottom2.style.display = "none"
//         }, 1000)

//         setTimeout(() => {
//             bottom3.style.display = "block"
//         }, 1200)
//     }
// }




// let interval;
// let level = 1





// let randomFishIndex = Math.floor(Math.random() * fishes.length);
// let shuffleFish = fishes[randomFishIndex];

let countBar;

function fishStrengthMeter() {
    interval = 10
    countBar = setInterval(function () {
        interval--;
        let barWidth = interval * 10;
        
        if (interval >= 0) {
            timeBar.style.width = barWidth + '%';
            // console.log(barWidth)
            //timeLeft.innerHTML = interval.toFixed(0);
        } else {
            clearInterval(countBar);
            timeBar.style.width = "0%";
            // timeLeft.innerHTML = "0";
        }
    }, 1000);
}


function keyDisplay() {
        console.log("current lvl: " + level)
     
        setTimeout(()=>{
            currentRoundKeys().forEach((k, index) => {
                k.textContent = compArray[index]
                k.style.display = "block"    
            }); 
        }, 2000)
        
        setTimeout(()=>{
            currentRoundKeys().forEach(k => {
                k.style.display = "none"
            }); 
            document.addEventListener('keypress',handleKeyDown)
        },3000)
}

function handleKeyDown(event) { 
    if (isGameOver) return; // Stop if game is over

    userEntry = event.key;
    element = currentRoundKeys()[counter];
    currentExpectedKey = compArray[counter];
    console.log(currentExpectedKey)
    if (userEntry === currentExpectedKey) { 
        // console.log(compArray)
        checkFishHooked(); // correct key
        counter++;
        currentExpectedKey = compArray[counter];
        // console.log(currentExpectedKey)
        if (counter === currentRoundKeys().length) {
            console.log("All keys correct: round complete!");
            // Add additional round-complete logic here
        }
    } else {
        checkNotHooked(); // wrong key
    }
}

function checkFishHooked() {
    element.textContent = userEntry;
    element.style.backgroundColor = "green";
    element.style.display = "block";
    // setTimeout(()=>{
    //     bottom1.style.display = "none"
    // }, 2000)
    checkAllKeys()
    console.log("You hooked the fish");
}

function checkNotHooked() {
    element.style.backgroundColor = "red";
    element.style.display = "block";
    isGameOver = true;
    console.log("Defeat!");
    setTimeout(()=>{
        bottom1.style.display = "none"
    }, 2000)
}


// // function nextRound() {
// //     level += 1
// //     shuffle(compArray)
// //     keyDisplay()
// //     counter = 0
// //     currentExpectedKey = compArray[counter]
// //     isGameOver = false;
// //     currentRoundEntries()
// // }
   
function hookFish() {
    if (level ===1) {
        setTimeout(()=>{
            bottom1.style.display = "block"
            keyDisplay()
        }, 1000)
    }
}

function displayFishStrengthMeter() {
    timeBar.style.display = "block"
    timeBarBackground.style.display = "block"
    clickBtn.style.display = "block"

        interval = 10
    countBar = setInterval(function () {
        interval--;
        let barWidth = interval * 10;
        
        if (interval >= 0) {
            timeBar.style.width = barWidth + '%';
            // console.log(barWidth)
            //timeLeft.innerHTML = interval.toFixed(0);
        } else {
            clearInterval(countBar);
            timeBar.style.width = "0%";
            // timeLeft.innerHTML = "0";
        }
    }, 1000);
}


function checkAllKeys() {
let countFinal = 0
            currentRoundKeys().forEach((k) => {
                if(k.style.backgroundColor === 'green'){
                    countFinal++
                    console.log(countFinal)
                    if(countFinal === 3){
                        // console.log('fadhel')
                        setTimeout(()=>{
                            bottom1.style.display = "none"
                            displayFishStrengthMeter()
                        }, 2000)
                        countFinal = 0
                    }
                }
            });
}

            function startGame() {
                Btn.remove()
                hookFish()
            }
            Btn.addEventListener('click', startGame)