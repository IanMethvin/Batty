function Obstacle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;
}

Obstacle.prototype.move = function() {
    this.x = this.x - 2;
}

