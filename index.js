var button = document.querySelectorAll('.button');

// FOR LEVEL UPDATES
var level = document.querySelector('.level');   
var level_data = 1;

// FOR AUDIOS
var audio;

for(var i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function() {
        buttonPress(this.textContent);
    });
}

function buttonGlow(key) {
    document.querySelector('.btn-' + key).classList.add('glow');

    setTimeout(function() {
        document.querySelector('.btn-' + key).classList.remove('glow');
    }, 200)
}



// GAME MECHANICS
var start = document.querySelector('.game-start');

// DISABLE PLAYER INTERACTION
var block = document.querySelector('.block');

var simonPattern = [];


var clickIndex = 0;

// REFERENCE
var position = 0;

// FIRST START AND SIMON REVEAL
start.addEventListener('click', function() {
    document.getElementById('title').textContent = 'Simon Game';

    start.style.display = 'none';

    level.textContent = 'Level ' + level_data;
    addPattern();
    
    setTimeout(function() {
        revealPattern();
    }, 1000);
}); 

// ADD 1 PATTERN
function addPattern() {
    var temp = Math.floor(Math.random() * 4) + 1;
    simonPattern.push(temp);
}

// REVEAL PATTERN TO FOLLOW
function revealPattern() {
    var time = 600;

    for (let i = 0; i < simonPattern.length; i++) {
        setTimeout(function() {
            buttonPressDemo(simonPattern[i].toString());
        }, 600 * i); 
        time += 600;
    }

    setTimeout(function() {
        block.style.display = "none";
    }, time - 1200); 
}

function buttonPressDemo(index) {
    buttonGlow(index);

    index = parseInt(index);

    switch(index) {
        case 1:
           audio = new Audio('./sounds/blue.mp3');
           clickIndex = 1;
           audio.play();
        break;

        case 2:
           audio = new Audio('./sounds/red.mp3');
           clickIndex = 2;
           audio.play();
        break;

        case 3:
           audio = new Audio('./sounds/green.mp3');
           clickIndex = 3;
           audio.play();
        break;

        case 4:
           audio = new Audio('./sounds/yellow.mp3');
           clickIndex = 4;
           audio.play();
        break;
    }
}

function buttonPress(index) {
    buttonGlow(index);

    index = parseInt(index);

    switch(index) {
        case 1:
           audio = new Audio('./sounds/blue.mp3');
           clickIndex = 1;
           checkPress(clickIndex);
           audio.play();
        break;

        case 2:
           audio = new Audio('./sounds/red.mp3');
           clickIndex = 2;
           checkPress(clickIndex);
           audio.play();
        break;

        case 3:
           audio = new Audio('./sounds/green.mp3');
           clickIndex = 3;
           checkPress(clickIndex);
           audio.play();
        break;

        case 4:
           audio = new Audio('./sounds/yellow.mp3');
           clickIndex = 4;
           checkPress(clickIndex);
           audio.play();
        break;
    }
}

function checkPress(clickIndex) {
    if(simonPattern[position] === clickIndex) {
        console.log(simonPattern.length);
        console.log(position);

        if(simonPattern.length === (position + 1)) {
            // WINNER, NEXT ROUND
            block.style.display = "block";
            position = 0;
            nextRound();
        } else {
            position++;
        }
    } else {
        // WRONG! RESTART
        block.style.display = "block";
        console.log('false');
        audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = "#262626";
        }, 200);

        reset();
        
    }
}

function nextRound() {
    level_data++;
    level.textContent = 'Level ' + level_data;
    addPattern();
    
    setTimeout(function() {
        revealPattern();
    }, 1500)
}

function reset() {
    start.style.display = "block";
    simonPattern = [];
    position = 0;
    level_data = 0;
    level.textContent = 'Tap anywhere to start.';
    document.getElementById('title').textContent = 'Game Over!';
}
