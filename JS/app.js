const Btn = document.querySelector(".startBtn")
const roundCount = document.querySelector(".text")
const timeBar = document.querySelector(".time-progress")
const timeLeft = document.querySelector(".time-left")

Btn.addEventListener('click', ()=> {
    let interval = 10

    let countDown = setInterval(function(){
        interval--;
        let barWidth = interval * 10
        if(interval >= 0){
            timeBar.style.width = barWidth + '%'
            //console.log(typeof interval + '%')
            timeLeft.innerHTML = interval
        } else{
            clearInterval(countDown)
            timeBar.style.width = "0%"
            timeBar.innerHTML = 'Game Over'
            return;
        }
    }, 1000)
    Btn.remove();
});
