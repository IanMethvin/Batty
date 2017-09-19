// Constructor for the current state of the canvas
function CanvasState(canvas) {
    
    // Initialize canvas properties
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    // Initialize Batty 
    this.batty = new Batty(this.width * .20, this.height * .25);

    // Initialize game properties
    this.gameScore = 0;
    this.gameRunning = false;
    this.gameOver = false;
    this.drawInterval = 5;
    this.scoreInterval = 100;
    this.obstacleInterval = 500;
    this.obstacles = [];

    var cState = this;

    // Listener to track mouse click events
    canvas.addEventListener('mousedown', function(e) {
        // Start game if it isnt running
        if (!cState.gameRunning && !cState.gameOver) 
        { 
            cState.startGame(cState); 
            return;
        }

        // If game is running, make Batty flap
        if (cState.gameRunning) {
            cState.batty.flap();
        }
        // If game is over, check for restart click
        else {
            var mouse = cState.getMousePosition(e);
            if (cState.isRestartClick(mouse)) {
                cState.restartGame();
            }
        }
    }, true);
}

// Start drawing and scoring intervals.
CanvasState.prototype.startGame = function() {
    var cState = this;
    cState.gameRunning = true;
    cState.cInterval = setInterval( function() { cState.draw(); }, cState.drawInterval );
    cState.sInterval = setInterval( function() { cState.incrementScore(); }, cState.scoreInterval )
    cState.oInterval = setInterval( function() { cState.addObstacle(); }, cState.obstacleInterval )
}

// Reset game state and redraw inital image.
CanvasState.prototype.restartGame = function() {
    this.gameScore = 0;
    this.gameRunning = false;
    this.gameOver = false;
    this.obstacles = [];

    var batty = this.batty;
    this.batty.x = batty.startingX;
    this.batty.y = batty.startingy;
    this.clear();
    this.draw();
}

// Increase game score
CanvasState.prototype.incrementScore = function() {
    this.gameScore++;
}

// Draw game and check for end game state.
CanvasState.prototype.draw = function () {
    var ctx = this.ctx;
    var w = this.width;
    var h = this.height;
    this.clear();

    // Fill in cave dark grey
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, w, h);

    // Draw Batty
    var batty = this.batty;
    batty.fly();
    ctx.drawImage(batty.img, batty.x, batty.y, batty.width, batty.height);

    // Draw Obstacles
    var os = this.obstacles
    for (i = 0; i < os.length; i++) {
        var o = os[i];
        o.move();

        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }

    // If Batty is off the screen, game over
    if (this.isGameOver()) {
        cState.endGame();
    }
    else {
        // Draw score
        ctx.font = "25px Impact MS";
        ctx.fillStyle = "red";
        ctx.fillText("Score: " + cState.gameScore, cState.width - 130, 30); 
    }
}

// 70% chance to add an obstacle to be drawn .
CanvasState.prototype.addObstacle = function() {
    var chance = randomIntFromInterval(0,10);
    if (chance > 7)
        cState.obstacles.push(new Obstacle(cState.width + 30, getRandomY()));
}

// Check game state to see if game should be over.
CanvasState.prototype.isGameOver = function() {
    var b = this.batty;
    if (b.y > this.height - (b.height / 2) || b.y < 0) {
        return true;
    }

    var os = this.obstacles;
    for (i = 0; i < os.length; i++) {
        var o = os[i];
        // If obstacle is offscreen, remove it
        if (o.x < 0) {
            this.obstacles.splice(i, 1);
            i--;
        }
        // Check it Batty has overlap with the object
        //this check isnt working
        if (b.x > o.x + o.radius && b.y > o.y + o.radius && b.y < o.y - o.radius) {
            return true;
        }
    }

    return false;
}

// Display game over message and offer restart.
CanvasState.prototype.endGame = function() {
    cState.gameRunning = false;
    cState.gameOver = true;
    clearInterval(cState.cInterval);
    clearInterval(cState.sInterval);
    clearInterval(cState.oInterval);

    // Draw game over
    var ctx = cState.ctx;
    ctx.font = "50px Impact MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", cState.width/2, cState.height/2 - 25); 

    // Draw score
    ctx.font = "25px Impact MS";
    ctx.fillText("Score: " + cState.gameScore, cState.width/2, cState.height/2 + 25); 

    // Draw restart
    ctx.font = "35px Impact MS";
    ctx.fillText("Restart?", cState.width/2, cState.height - 50); 
}

// Clear the canvas
CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

// Check if user has clicked "Restart" on end game screen.
CanvasState.prototype.isRestartClick = function(mouse) {
    var x = mouse.x;
    var y = mouse.y;
    if (x > this.width/2 - 100 && x < this.width/2 + 100
        && y > this.height - 200 && y < this.height - 50)
        return true;

    return false;
}

// Retrieve the user's current mouse position.
CanvasState.prototype.getMousePosition = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
    
    // Compute the total offset
    if (element.offsetParent !== undefined) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }
  
    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;
    
    // Return a simple javascript object (a hash) with x and y defined.
    return {x: mx, y: my};
}