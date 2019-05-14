const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge){
      return true
  } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge){
      return true
  } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge){
      return true
  } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;
  rock.style.top = top;
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;
     
     if (checkCollision(rock)) {
      endGame();
     
     } else if (top >= GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);
     } else {
       rock.remove
     }
  }
  window.requestAnimationFrame(moveRock);   
  ROCKS.push(rock)   
  return rock
}


function endGame() {
  window.clearInterval(gameInterval);
  document.removeEventListener('keydown', moveDodger);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!");
}

function moveDodger(e) {
    const code = e.which
    if (e.which === LEFT_ARROW) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerLeft();
       
     } else if (e.which === RIGHT_ARROW) {
         e.preventDefault();
         moveDodgerRight();
     }
}

var leftNumbers = dodger.style.left.replace('px', '');
var  left = parseInt(leftNumbers, 10);


function moveDodgerLeft(DODGER) {
    var leftNumbers = dodger.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10);

    function goLeft() {
      dodger.style.left = `${left - 4}px`;

     if (left > 0) {
        window.requestAnimationFrame(goLeft);
     }
   }
  window.requestAnimationFrame(goLeft);
}


function moveDodgerRight(DODGER) {
    var leftNumbers = dodger.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10);

    function goRight() {
     dodger.style.left = `${left + 4}px`;

     if (left < 360) {
       window.requestAnimationFrame(goRight);
    }
  }
  window.requestAnimationFrame(goRight);
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
