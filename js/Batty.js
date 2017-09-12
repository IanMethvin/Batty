var canvasObj = {};
var cState = {};

// Initialize the game board on page load.
function initializeCave () {
    canvasObj = $('#battyCanvas');
    cState = new CanvasState(canvasObj[0]);

}