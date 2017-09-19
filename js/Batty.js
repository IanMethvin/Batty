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