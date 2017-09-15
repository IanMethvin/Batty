function Batty(x, y) {
    //Drawing properties
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 67;
    this.img = $("#battyUp")[0];

    //Flying properties
    this.flapping = false;
    this.flapInterval = 50; 
    this.flapTimmer = this.flapInterval; 
}

Batty.prototype.fly = function() {
    if (this.flapping) {
        this.y = this.y - 2;
        this.flapTimmer = this.flapTimmer - 1;

        if (this.flapTimmer <= 0) {
            this.flapping = false;
        }
    }
    else {
        this.y = this.y + 2;
    }
}

Batty.prototype.flap = function() {
    this.flapping = true;
    this.flapTimmer = this.flapInterval;
}
