
//calling Enemy
var Enemy = function (x_axis, y_axis, velocity) {
    // Variables applied to each of our instances go here,
    this.x = x_axis;
    this.y = y_axis;
    this.speed = velocity;
    //creating enemy charechter
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    // speed of game 
    this.x += this.speed * dt;
    // reset position of enemy to move across again
    if (this.x > 800) {
        this.x = -300;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }
    // attack of enemies
    if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
        player.x = 0;
        player.y = 700;
    }
};


// creation of enemies 
var allEnemies = [];
var enemy;
// array of enimies and postion configuration
var enemyPosition = [60, 140, 220, 300, 380];


enemyPosition.forEach(function (posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});


// draw enimies
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//calling Player
var Player = function (x_axis, y_axis, velocity) {
    this.x = x_axis;
    this.y = y_axis;
    this.speed = velocity;
    this.sprite = 'images/char-horn-girl.png';
};

var player = new Player(0, 700, 50);



Player.prototype.update = function () {
    // Prevent player from moving out of wall boundaries
    if (this.y > 700) {
        this.y = 700;
    }
    if (this.x > 800) {
        this.x = 800;
    }

    if (this.x < 0) {
        this.x = 0;
    }
    // win action
    if (this.y < 0) {
        this.x = 0;
        this.y = 700;
    }
};

// handle actions depend on user input
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed + 50;
    } else if (keyPress == 'up') {
        this.y -= this.speed + 30;
    } else if (keyPress == 'right') {
        this.x += this.speed + 50;
    } else if (keyPress == 'down') {
        this.y += this.speed + 30;
    }
};

// drawing Player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//game controls
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
