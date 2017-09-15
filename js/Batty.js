var canvasObj = {};
var cState = {};

// Initialize the game board on page load.
function initializeCave () {
    canvasObj = $('#battyCanvas');
    cState = new CanvasState(canvasObj[0]);

    restartGame();
}

// Clears the game and reset the game state.
function restartGame() {
    cState.ctx.clearRect(0, 0, cState.width, cState.height);
    cState.draw();
}