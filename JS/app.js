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
const roundOneConsole = document.querySelector(".bottom-console-round1")
const roundTwoConsole = document.querySelector(".bottom-console-round2")
const roundThreeConsole = document.querySelector(".bottom-console-round3")

//
//VARIABLES
//

let compArray = ["a", "b", "c", "d", "e", "f", "g"]
let level = 1;
let interval;
let counter = 0;
let currentExpectedKey = compArray[counter];
let isGameOver = false;
let element;
let userEntry;
let countBar;

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

const fishes = [
  { name: "Coral Snapper", difficulty: 1 },
  { name: "Blue Minnow", difficulty: 1 },
  { name: "Silver Darter", difficulty: 1 },
  { name: "Golden Pike", difficulty: 2 },
  { name: "Shadow Trout", difficulty: 2 },
  { name: "Spotted Barrin", difficulty: 2 },
  { name: "Crimson Fangfish", difficulty: 3 },
  { name: "Titan Grouper", difficulty: 3 },
  { name: "Abyss Serpentfin", difficulty: 3 },
];

    const randomIndex = Math.floor(Math.random() * fishes.length);
    let selectedFish = fishes[randomIndex];

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
    if (isGameOver){
        return;
    } 

    userEntry = event.key;
    element = currentRoundKeys()[counter];
    currentExpectedKey = compArray[counter];
    console.log(currentExpectedKey)
    if (userEntry === currentExpectedKey) { 
        // console.log(compArray)
        checkFishHooked(); 
        counter++;
        currentExpectedKey = compArray[counter];
        if (counter === currentRoundKeys().length) {
            console.log("All keys correct: round complete!");
        }
    } else {
        checkNotHooked(); 
    }
}

function checkFishHooked() {
    element.textContent = userEntry;
    element.style.backgroundColor = "green";
    element.style.display = "block";

    checkAllKeys()
    console.log("You hooked the fish");
}

function checkNotHooked() {
    element.style.backgroundColor = "red";
    element.style.display = "block";
    isGameOver = true;
    console.log("Defeat!");

    setTimeout(() => {
        if (level === 1) {
            roundOneConsole.style.display = "none";
        } else if (level === 2) {
            roundTwoConsole.style.display = "none";
        } else if (level === 3) {
            roundThreeConsole.style.display = "none";
        }
    }, 2000);
}


function hookFish() {
    if (level === 1) {
        roundOneConsole.style.display = "block";
        keyDisplay();
    } else if (level === 2) {
        roundTwoConsole.style.display = "block";
        keyDisplay();
    } else if (level === 3) {
        roundThreeConsole.style.display = "block";
        keyDisplay();
    }
}

function fishStrengthMeter() {
    timeBar.style.display = "block";
    timeBarBackground.style.display = "block";
    clickBtn.style.display = "block";

    if (selectedFish.difficulty === 1) {
        interval = 8; 
    } else if (selectedFish.difficulty === 2) {
        interval = 5; 
    } else {
        interval = 3; 
    }

    timeBar.style.width = (interval * 10) + "%";

    clearInterval(countBar);
    const decrement = loseTime();
    countBar = setInterval(function () {
        interval -= decrement;
        if (interval < 0) {
            interval = 0;
        }

        timeBar.style.width = (interval * 10) + "%";


        if (interval <= 0) {
            clearInterval(countBar);
            console.log("Bar empty!");
        }

        if (interval >= 10) {
            clearInterval(countBar);
            console.log("Bar full! Proceeding to next level in 2s...");

            timeBar.style.display = "none";
            timeBarBackground.style.display = "none";
            clickBtn.style.display = "none";

            setTimeout(() => {
                hookFish();
            }, 2000);
        }
    }, 1000);
}

function checkAllKeys() {
    const keys = currentRoundKeys();
    let allGreen = true;
    for (let index = 0; index < keys.length; index++) {
        if (keys[index].style.backgroundColor !== "green") {
            allGreen = false;
            break;
        }
    }

    if (allGreen) {
        setTimeout(() => {
            if (level === 1){
                roundOneConsole.style.display = "none";
            } 
            if (level === 2) {
                roundTwoConsole.style.display = "none";
            }

            level++;
            console.log("Next level:", level);

            counter = 0;
            currentExpectedKey = compArray[counter];
            shuffle(compArray);

            const randomIndex = Math.floor(Math.random() * fishes.length);
            selectedFish = fishes[randomIndex];
            console.log("Next round fish:", selectedFish);

            fishStrengthMeter();

        }, 500);
    }
}

function loseTime() {
    
        if (level === 1 && selectedFish.difficulty === 1) {
            return 1
        } else if (level === 2 && selectedFish.difficulty === 2) {
            return 2
        } else {
            return 3
        }
}

function addTime(selectedFish) {
    let increase;
    if (selectedFish.difficulty === 1) {
        increase = 1;
    } else if (selectedFish.difficulty === 2) {
        increase = 0.55;
    } else {
        increase = 0.35;
    }

    interval += increase;
    if (interval > 10){
        interval = 10;
    } 

    timeBar.style.width = (interval * 10) + "%";

    if (interval >= 10) {
        clearInterval(countBar);
        console.log("Bar full");

        timeBar.style.display = "none";
        timeBarBackground.style.display = "none";
        clickBtn.style.display = "none";

        setTimeout(() => {
            hookFish();
        }, 2000);
    }
}

function startGame() {
    Btn.remove()
    hookFish()
}

Btn.addEventListener('click', startGame)
clickBtn.addEventListener("click", () => addTime(selectedFish));
