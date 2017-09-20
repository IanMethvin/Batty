// Object to represent batty object on canvas.
function Batty(x, y) {
    //Drawing properties
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.img = $("#battyUp")[0];
    this.startingX = x;
    this.startingy = y;

    //Flying properties
    this.flapping = false;
    this.flapInterval = 50; 
    this.flapTimmer = this.flapInterval; 
}

// Determine direction and move batty.
Batty.prototype.fly = function() {
    if (this.flapping) {
        this.y = this.y - 2;
        this.flapTimmer = this.flapTimmer - 1;

        if (this.flapTimmer <= 0) {
            this.flapping = false;
        }
    }
    // Batty will fall by default
    else {
        this.y = this.y + 2;
    }
}

// Initalize upward movement.
Batty.prototype.flap = function() {
    this.flapping = true;
    this.flapTimmer = this.flapInterval;
}
