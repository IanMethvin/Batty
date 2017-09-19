var canvasObj = {};
var cState = {};

// Initialize the game board on page load.
function initializeCave () {
    canvasObj = $('#battyCanvas');
    cState = new CanvasState(canvasObj[0]);

    initGame();
}

// Draw inital game image.
function initGame() {
    cState.clear();
    cState.draw();
}

// Generate a random move within the canvas board.
function getRandomY() {   
    return randomIntFromInterval(0, cState.height);
}

// Generate a random number between the min and max.
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}