// Constructor for the current state of the canvas
function CanvasState(canvas) {
    
    // Initialize canvas properties
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.batty = new Batty();
}

CanvasState.prototype.initialDraw = function () {
    var ctx = this.ctx;
    var w = this.width;
    var h = this.height;

    //fill in cave dark grey and palce batty
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, w, h);

    var batty = this.batty;
    cState.ctx.drawImage(batty.img, w * .20, h * .25, batty.width, batty.height);
}