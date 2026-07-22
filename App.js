let gameSeq = []; 
let userSeq = []; 
let btns = ["yellow", "red", "purple","green"]; 
let started = false; 
let level = 0; 
let h2 = document.querySelector("h2"); 

// ============================================================================
// START: ADD THIS VARIABLE CODE AT THE TOP OF YOUR SCRIPT
// ============================================================================
let higestScore = 0; 
let highScoreHeading = null; 
// ============================================================================
// END: ADD THIS VARIABLE CODE AT THE TOP OF YOUR SCRIPT
// ============================================================================

document.addEventListener("keypress",function(){ 
    if(started == false){ 
        started = true; 
        levelUp(); 
    } 
}); 

function gameFlash(btn){ 
    btn.classList.add("flash"); 
    setTimeout(function(){ 
        btn.classList.remove("flash"); 
    },250); 
} 

function userFlash(btn){ 
    btn.classList.add("userflash"); 
    setTimeout(function(){ 
        btn.classList.remove("userflash"); 
    },250); 
} 

function levelUp(){ 
    userSeq = []; 
    level++; 
    h2.innerText = `Level ${level}`; 
    let randIdx = Math.floor(Math.random()*4); 
    let randColor = btns[randIdx]; 
    let randbtn = document.querySelector(`.${randColor}`); 
    gameSeq.push(randColor); 
    gameFlash(randbtn); 
} 

function checkAns(idx){ 
    if(userSeq[idx] === gameSeq[idx]){ 
        if(userSeq.length == gameSeq.length){ 
            setTimeout(levelUp, 1000); 
        } 
    }else{ 
        h2.innerHTML = `Game Over! Your score was <b> ${level}</b> <br> Press any key to start`; 
        document.querySelector("body").style.backgroundColor = "red"; 
        setTimeout(function(){ 
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 150); 

        // ====================================================================
        // START: ADD THIS LOGIC INSIDE YOUR ELSE STATEMENT (BEFORE reset())
        // ====================================================================
        if(level > higestScore){ 
            higestScore = level; 
        } 

        if (higestScore > 0) {
            if (!highScoreHeading) {
                highScoreHeading = document.createElement("h2"); 
                h2.insertAdjacentElement("afterend", highScoreHeading);
            }
            highScoreHeading.textContent = `Your highest score was ${higestScore}`; 
        }
        // ====================================================================
        // END: ADD THIS LOGIC INSIDE YOUR ELSE STATEMENT (BEFORE reset())
        // ====================================================================

        reset(); 
    } 
} 

function btnPress() { 
    let btn = this; 
    userFlash(btn); 
    userColor = btn.getAttribute("id"); 
    userSeq.push(userColor); 
    checkAns(userSeq.length-1); 
} 

let allBtns = document.querySelectorAll(".btn"); 
for(btn of allBtns){ 
    btn.addEventListener("click", btnPress); 
} 

function reset(){ 
    started = false; 
    gameSeq = []; 
    userSeq = []; 
    level = 0; 
}
