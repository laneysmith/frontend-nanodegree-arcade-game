
 // Enemies our player must avoid: sets up Enemy object & initializes
 // variables for each instance of the object
 var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';  // Enemy bug sprite
    this.x = 0;                            // Initial x coord
    this.y = 63;                           // Initial y coord
    this.width = 101;                      // Set width of sprite
    this.height = 83;                      // Set height of sprite

    this.dt = getRandomArbitrary(2, 8);   // Random speed

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
};


 // Update the enemy's position, required method for game
 // Parameter: dt, a time delta between ticks
 Enemy.prototype.update = function(dt) {
     // If statement compares enemy position with canvas width to determine if
     // enemy traveled off canvas. If true, function resets enemy position.
     // If false, enemy continues to move along x-axis at the random
     // speed (dt) associated with the enemy instance.
    if (this.x > ctx.canvas.width) {
        this.x = -101;
    } else {
        this.x = this.x + this.dt;
    }

    // Checks to see if collisions occur between player & enemy.
    function checkCollisions() {
        // For loop iterates through enemy array for collisions with player.
        for (var n = 0; n < allEnemies.length; n++) {
            // First if statement checks to see if the x coordinate of player
            // matches the x coordinate of the enemy. If this is true, the second
            // if statement checks to see if the y coordinate of the player matches
            // the y coordinate of the enemy. If both are true, player is reset
            // to initial position, score is checked to see if there's a new high
            // score, & score is reset to 0.
            if (player.x + 30 > allEnemies[n].x && player.x < allEnemies[n].x + allEnemies[n].width - 30) {
                if (player.y < allEnemies[n].y + 20 && player.y > allEnemies[n].y - 20) {
                    // Reset player to initial coordinates.
                    Player.prototype.reset();
                    // If final score is greater than current high score, record
                    // new high score.
                    if (score > maxScore) {
                      maxScore = score;
                    }
                    // Reset score to 0.
                    score = 0;

                }
            }
        }
    }

    // Calls a function to check if collision occurs between player & enemy.
    checkCollisions();
};


// Draw the enemy on the screen using the drawImage function.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var playerInitialX = 202;
var playerInitialY = 400;

// Sets up Player object & initializes variables.
var Player = function() {
    this.sprite = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
    ];
    this.currentSpriteIndex = 0;      // Initiates the index value for the sprite array
    this.x = playerInitialX;          // Initiates the player's x coordinate
    this.y = playerInitialY;          // Initiates the player's y coordinate
    this.dt = 40;                     // Sets the speed factor.
    this.width = 101;                 // Sets the width of the sprite.
    this.height = 83;                 // Sets the height of the sprite.
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
};

// Draw the player on the screen using the drawImage function.
// Also displays the directions, scoreboard, & high score.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite[this.currentSpriteIndex]), this.x, this.y);
    directions();
    scoreBoard();
    highScore();
};


// Move player across canvas using up, down, left, & right arrow keys.
// Press space bar key to iterate through characters in Player.sprite array.
Player.prototype.handleInput = function(keyStroke) {
   if (keyStroke === 'left') {
        // If statement checks to see if player is currently at the furthest
        // left position on the canvas. If not, x coordinate is changed.
        if (this.x - 101 >= 0) {
            this.x = this.x - 101;
        }
    }
    if (keyStroke === 'right') {
        // If statement checks to see if player is currently at the furthest
        // right position on the canvas. If not, x coordinate is changed.
        if (this.x + 101 < ctx.canvas.width) {
            this.x = this.x + 101;
        }
    }
    if (keyStroke === 'up') {
        // If statement checks to see if player is currently at the furthest
        // top position on the canvas. If not, y coordinate is changed.
        // If true, player has successfully crossed to the water, player is
        // reset to inital position & score increases by 1 point.
        if (this.y > 83) {
            this.y = this.y - 83;
        } else {
            Player.prototype.reset();
            score = score + 1;
        }
    }
    if (keyStroke === 'down') {
      // If statement checks to see if player is currently at the furthest
      // bottom position on the canvas. If not, y coordinate is changed.
        if (this.y + 83 < ctx.canvas.height - 200) {
            this.y = this.y + 83;
        }
    }
    // If space bar key is pressed, currentSpriteIndex is changed to the next
    // character in the Player.sprite array.
    if (keyStroke === 'space') {
        if (this.currentSpriteIndex + 1 === this.sprite.length) {
            this.currentSpriteIndex = 0;
        } else {
            this.currentSpriteIndex = this.currentSpriteIndex + 1;
        }
    }
};


// Instantiate enemy objects
var allEnemies = [
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];

// Change y coordinates for 2nd & 3rd instances of Enemy
allEnemies[1].y = allEnemies[0].y + 83;
allEnemies[2].y = allEnemies[1].y + 83;


// Instantiate player object
var player = new Player();

Resources.load(player.sprite);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Reset player's position after collision or successful crossing.
// Called by checkCollisions & Player.handleInput
Player.prototype.reset = function() {
      player.x = playerInitialX;      //player's starting x coordinate
      player.y = playerInitialY;      //player's starting y coordinate
  }

//function resetPlayer() {
//    player.x = playerInitialX;      //player's starting x coordinate
//    player.y = playerInitialY;      //player's starting y coordinate
//}


var score = 0;                      // Initialize score
var maxScore = 0;                   // Initialize high score

function scoreBoard() {
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'yellow';
    ctx.fillText('Your Score: ' + score, 10, 80);
}

function highScore() {
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'white';
    ctx.fillText('High Score: ' + maxScore, 10, 115);
}

function directions() {
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('Use the arrow keys to dodge the beetles & move your character to the water.', 505/2, 562);
    ctx.fillText('Press the space bar key to choose a different character.', 505/2, 580);
}
