// Constructor for the current state of the canvas
function CanvasState(canvas) {
    
    // Initialize canvas properties
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    // Initialize Batty 
    this.batty = new Batty(this.width * .20, this.height * .25);

    //Initialize game properties
    this.gameRunning = false;
    this.drawInterval = 5;

    var cState = this;

    // Listener to track mouse click events
    canvas.addEventListener('mousedown', function(e) {
        //start game if it isnt running
        if (!cState.gameRunning) 
        { 
            cState.startGame(cState); 
            cState.gameRunning = true;
            return;
        }

        //going to need to call batty.up or flap or something here
        cState.batty.flap();
    }, true);

    
    //setInterval( function() { cState.draw(); }, cState.drawInterval )
}

CanvasState.prototype.startGame = function() {
    var cState = this;
    setInterval( function() { cState.draw(); }, cState.drawInterval );
}

CanvasState.prototype.draw = function () {
    var ctx = this.ctx;
    var w = this.width;
    var h = this.height;
    this.clear();

    //fill in cave dark grey
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, w, h);

    //draw batty
    var batty = this.batty;
    batty.fly();
    ctx.drawImage(batty.img, batty.x, batty.y, batty.width, batty.height);

    //if off screen, game over
    // if (batty.y > h || batty.y <= 0)
    //     cState.gameRunning = false;
}

CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }