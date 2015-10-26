'use strict';
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = (Math.ceil(Math.random() * 4)) / 3;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var rightBoundary = 505;
    var leftStart = -101;
    this.x = this.x + this.speed * 5;
    if (this.x > rightBoundary)
        this.x = leftStart;
    this.checkCollision();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check collision with player to reset and update score
Enemy.prototype.checkCollision = function() {
    if (this.x < player.x + 75 && this.x + 75 > player.x && this.y < player.y + 42 && this.y + 42 > player.y) {
        player.score -= 3;
        if (player.score < 0)
            document.getElementById("points").style.color = "red";
        document.getElementById("points").innerHTML = player.score;
        player.reset();
    }
};

//Player
var Player = function() {
    this.x = 202;
    this.y = 405;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.score += 3;
        this.reset();
        if (this.score >= 0)
            document.getElementById("points").style.color = "black";
        document.getElementById("points").innerHTML = this.score;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset the player to his original position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
};

//Handle player's movements
Player.prototype.handleInput = function(key) {
    if (key === "left" && this.x > 100)
        this.x -= 100;
    if (key === "right" && this.x < 400)
        this.x += 100;
    if (key === "up" && this.y > 0)
        this.y -= 83;
    if (key === "down" && this.y < 400)
        this.y += 83;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var x, y;
    if (i < 1)
        allEnemies.push(new Enemy(x = 0, y = 62));
    else
        allEnemies.push(new Enemy(x += 101, y += 83));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});