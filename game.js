//Part 1
/*var canvas = null,
ctx = null;
var x = 50,
    y = 50;
    
function paint(ctx) {
ctx.fillStyle = '#0f0';
ctx.fillRect(50, 50, 100, 60);
}
function init() {
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
paint(ctx);
}
window.addEventListener('load', init, false);*/

//Part 2
/*var canvas = null,
ctx = null,
x = 50,
y = 50;

window.requestAnimationFrame = (function () {
return window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||

function (callback) {
window.setTimeout(callback, 17);
};
}());

function paint(ctx) {
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#0f0';
ctx.fillRect(x, y, 10, 10);
}

function act() {
x += 2;
if (x > canvas.width) {
x = 0;
}
}

function run() {
window.requestAnimationFrame(run);
act();
paint(ctx);
}

function init() {
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
run();
}
window.addEventListener('load', init, false);*/

//Part3

/*var KEY_ENTER = 13,
KEY_LEFT = 37,
KEY_UP = 38,
KEY_RIGHT = 39,
KEY_DOWN = 40,
canvas = null,
ctx = null,
lastPress = null,
pause = true,
x = 50,
y = 50,
dir = 0;
window.requestAnimationFrame = (function () {
return window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
function (callback) {
window.setTimeout(callback, 17);
};
}());
document.addEventListener('keydown', function (evt) {
lastPress = evt.which;
}, false);
function paint(ctx) {
// Clean canvas
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Draw square
ctx.fillStyle = '#0f0';
ctx.fillRect(x, y, 10, 10);
// Debug last key pressed
ctx.fillStyle = '#fff';
//ctx.fillText('Last Press: ' + lastPress, 0, 20);
// Draw pause
if (pause) {
ctx.textAlign = 'center';
ctx.fillText('PAUSE', 150, 75);
ctx.textAlign = 'left';
}
}
function act() {
if (!pause) {
// Change Direction
if (lastPress == KEY_UP) {
dir = 0;
}
if (lastPress == KEY_RIGHT) {
dir = 1;
}
if (lastPress == KEY_DOWN) {
dir = 2;
}
if (lastPress == KEY_LEFT) {
dir = 3;
}
// Move Rect
if (dir == 0) {
y -= 10;
}
if (dir == 1) {
x += 10;
}
if (dir == 2) {
y += 10;
}
if (dir == 3) {
x -= 10;
}
// Out Screen
if (x > canvas.width) {
x = 0;
}
if (y > canvas.height) {
y = 0;
}
if (x < 0) {
x = canvas.width;
}
if (y < 0) {
y = canvas.height;
}
}
// Pause/Unpause
if (lastPress == KEY_ENTER) {
pause = !pause;
lastPress = null;
}
}
function repaint() {
window.requestAnimationFrame(repaint);
paint(ctx);
}
function run() {
setTimeout(run, 50);
act();
}
function init() {
// Get canvas and context
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
// Start game
run();
repaint();
}
window.addEventListener('load', init, false);*/

//Part 4
/*var KEY_ENTER = 13,
KEY_LEFT = 37,
KEY_UP = 38,
KEY_RIGHT = 39,
KEY_DOWN = 40,
canvas = null,
ctx = null,
lastPress = null,
pause = true,
dir = 0,
score = 0,
player = null,
food = null;
window.requestAnimationFrame = (function () {
return window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
function (callback) {
window.setTimeout(callback, 17);
};
}());
document.addEventListener('keydown', function (evt) {
lastPress = evt.which;
}, false);
function Rectangle(x, y, width, height) {
this.x = (x == null) ? 0 : x;
this.y = (y == null) ? 0 : y;
this.width = (width == null) ? 0 : width;
this.height = (height == null) ? this.width : height;
this.intersects = function (rect) {
if (rect == null) {
window.console.warn('Missing parameters on function intersects');
} else {
return (this.x < rect.x + rect.width &&
this.x + this.width > rect.x &&
this.y < rect.y + rect.height &&
this.y + this.height > rect.y);
}
};
this.fill = function (ctx) {
if (ctx == null) {
window.console.warn('Missing parameters on function fill');
} else {
ctx.fillRect(this.x, this.y, this.width, this.height);
}
};
}
function random(max) {
return Math.floor(Math.random() * max);
}
function paint(ctx) {
// Clean canvas
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Draw player
ctx.fillStyle = '#0f0';
player.fill(ctx);
// Draw food
ctx.fillStyle = '#f00';
food.fill(ctx);
// Debug last key pressed
ctx.fillStyle = '#fff';
//ctx.fillText('Last Press: '+lastPress,0,20);
// Draw score
ctx.fillText('Score: ' + score, 0, 10);
// Draw pause
if (pause) {
ctx.textAlign = 'center';
ctx.fillText('PAUSE', 150, 75);
ctx.textAlign = 'left';
}
}
function act() {
if (!pause) {
// Change Direction
if (lastPress == KEY_UP) {
dir = 0;
}
if (lastPress == KEY_RIGHT) {
dir = 1;
}
if (lastPress == KEY_DOWN) {
dir = 2;
}
if (lastPress == KEY_LEFT) {
dir = 3;
}
// Move Rect
if (dir == 0) {
player.y -= 10;
}
if (dir == 1) {
player.x += 10;
}
if (dir == 2) {
player.y += 10;
}
if (dir == 3) {
player.x -= 10;
}
// Out Screen
if (player.x > canvas.width) {
player.x = 0;
}
if (player.y > canvas.height) {
player.y = 0;
}
if (player.x < 0) {
player.x = canvas.width;
}
if (player.y < 0) {
player.y = canvas.height;
}
// Food Intersects
if (player.intersects(food)) {
score += 1;
food.x = random(canvas.width / 10 - 1) * 10;
food.y = random(canvas.height / 10 - 1) * 10;
}
}
// Pause/Unpause
if (lastPress == KEY_ENTER) {
pause = !pause;
lastPress = null;
}
}
function repaint() {
window.requestAnimationFrame(repaint);
paint(ctx);
}
function run() {
setTimeout(run, 50);
act();
}
function init() {
// Get canvas and context
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
// Create player and food
player = new Rectangle(40, 40, 10, 10);
food = new Rectangle(80, 80, 10, 10);
// Start game
run();
repaint();
}
window.addEventListener('load', init, false);*/

//Part 5

/* fetch("https://jsonplaceholder.typicode.com/?score="+score)
.then(function (response) {
    console.log("Score sent successfully");
  })
  .catch(function (error) {
    console.log(
      "Error trying to send the score"
    );
  });*/

  //Jump to last part (1.14)

  /*jslint bitwise:true, es5: true */
(function (window, undefined) {
    "use strict";
    var KEY_ENTER = 13,
      KEY_LEFT = 37,
      KEY_UP = 38,
      KEY_RIGHT = 39,
      KEY_DOWN = 40,
      canvas = null,
      ctx = null,
      lastPress = null,
      pause = false,
      gameover = false,
      currentScene = 0,
      scenes = [],
      mainScene = null,
      gameScene = null,
      highscoresScene = null,
      body = [],
      food = null,
      //var wall = [],
      highscores = [],
      posHighscore = 10,
      dir = 0,
      score = 0,
      iBody = new Image(),
      iFood = new Image(),
      aEat = new Audio(),
      aDie = new Audio();
    window.requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 17);
        }
      );
    })();
    document.addEventListener(
      "keydown",
      function (evt) {
        if (evt.which >= 37 && evt.which <= 40) {
          evt.preventDefault();
        }
        lastPress = evt.which;
      },
      false
    );
    function Rectangle(x, y, width, height) {
      this.x = x === undefined ? 0 : x;
      this.y = y === undefined ? 0 : y;
      this.width = width === undefined ? 0 : width;
      this.height = height === undefined ? this.width : height;
    }
    Rectangle.prototype = {
      constructor: Rectangle,
      intersects: function (rect) {
        if (rect === undefined) {
          window.console.warn("Missing parameters on function intersects");
        } else {
          return (
            this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y
          );
        }
      },
      fill: function (ctx) {
        if (ctx === undefined) {
          window.console.warn("Missing parameters on function fill");
        } else {
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      },
      drawImage: function (ctx, img) {
        if (img === undefined) {
          window.console.warn("Missing parameters on function drawImage");
        } else {
          if (img.width) {
            ctx.drawImage(img, this.x, this.y);
          } else {
            ctx.strokeRect(this.x, this.y, this.width, this.height);
          }
        }
      },
    };
    function Scene() {
      this.id = scenes.length;
      scenes.push(this);
    }
    Scene.prototype = {
      constructor: Scene,
      load: function () {},
      paint: function (ctx) {},
      act: function () {},
    };
    function loadScene(scene) {
      currentScene = scene.id;
      scenes[currentScene].load();
    }
    function random(max) {
      return ~~(Math.random() * max);
    }
    function addHighscore(score) {
      posHighscore = 0;
      while (
        highscores[posHighscore] > score &&
        posHighscore < highscores.length
      ) {
        posHighscore += 1;
      }
      highscores.splice(posHighscore, 0, score);
      if (highscores.length > 10) {
        highscores.length = 10;
      }
      localStorage.highscores = highscores.join(",");
    }
    function repaint() {
      window.requestAnimationFrame(repaint);
      if (scenes.length) {
        scenes[currentScene].paint(ctx);
      }
    }
    function run() {
      setTimeout(run, 50);
      if (scenes.length) {
        scenes[currentScene].act();
      }
    }
    function init() {
      // Get canvas and context
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      // Load assets
      iBody.src = "assets/body.png";
      iFood.src = "assets/fruit.png";
      aEat.src = "assets/chomp.oga";
      aDie.src = "assets/dies.oga";
      // Create food
      food = new Rectangle(80, 80, 10, 10);
      // Create walls
      //wall.push(new Rectangle(50, 50, 10, 10));
      //wall.push(new Rectangle(50, 100, 10, 10));
  
      //wall.push(new Rectangle(100, 50, 10, 10));
      //wall.push(new Rectangle(100, 100, 10, 10));
      // Load saved highscores
      if (localStorage.highscores) {
        highscores = localStorage.highscores.split(",");
      }
      // Start game
      run();
      repaint();
    }
    // Main Scene
    mainScene = new Scene();
    mainScene.paint = function (ctx) {
      // Clean canvas
      ctx.fillStyle = "#030";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw title
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("SNAKE", 150, 60);
      ctx.fillText("Press Enter", 150, 90);
    };
    mainScene.act = function () {
      // Load next scene
      if (lastPress === KEY_ENTER) {
        loadScene(highscoresScene);
        lastPress = null;
      }
    };
    // Game Scene
    gameScene = new Scene();
    gameScene.load = function () {
      score = 0;
      dir = 1;
      body.length = 0;
      body.push(new Rectangle(40, 40, 10, 10));
      body.push(new Rectangle(0, 0, 10, 10));
      body.push(new Rectangle(0, 0, 10, 10));
      food.x = random(canvas.width / 10 - 1) * 10;
      food.y = random(canvas.height / 10 - 1) * 10;
  
      gameover = false;
    };
    gameScene.paint = function (ctx) {
      var i = 0,
        l = 0;
      // Clean canvas
      ctx.fillStyle = "#030";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw player
      ctx.strokeStyle = "#0f0";
      for (i = 0, l = body.length; i < l; i += 1) {
        body[i].drawImage(ctx, iBody);
      }
      // Draw walls
      //ctx.fillStyle = '#999';
      //for (i = 0, l = wall.length; i < l; i += 1) {
      // wall[i].fill(ctx);
      //}
      // Draw food
  
      ctx.strokeStyle = "#f00";
      food.drawImage(ctx, iFood);
    
  
  
      // Draw score
      ctx.fillStyle = "#fff";
      ctx.textAlign = "left";
      ctx.fillText("Score: " + score, 0, 10);
      // Debug last key pressed
      //ctx.fillText('Last Press: '+lastPress,0,20);
      // Draw pause
      if (pause) {
        ctx.textAlign = "center";
        if (gameover) {
          ctx.fillText("GAME OVER", 150, 75);
        } else {
          ctx.fillText("PAUSE", 150, 75);
        }
      }
    };
    gameScene.act = function () {
      var i = 0,
        l = 0;
      if (!pause) {
        // GameOver Reset
        if (gameover) {
          loadScene(highscoresScene);
        }
        // Move Body
        for (i = body.length - 1; i > 0; i -= 1) {
          body[i].x = body[i - 1].x;
          body[i].y = body[i - 1].y;
        }
        // Change Direction
        if (lastPress === KEY_UP && dir !== 2) {
          dir = 0;
        }
        if (lastPress === KEY_RIGHT && dir !== 3) {
          dir = 1;
        }
        if (lastPress === KEY_DOWN && dir !== 0) {
          dir = 2;
        }
        if (lastPress === KEY_LEFT && dir !== 1) {
          dir = 3;
        }
        // Move Head
        if (dir === 0) {
          body[0].y -= 10;
        }
        if (dir === 1) {
          body[0].x += 10;
        }
        if (dir === 2) {
          body[0].y += 10;
        }
        if (dir === 3) {
          body[0].x -= 10;
        }
        // Out Screen
        if (body[0].x > canvas.width - body[0].width) {
          body[0].x = 0;
        }
        if (body[0].y > canvas.height - body[0].height) {
          body[0].y = 0;
        }
        if (body[0].x < 0) {
          body[0].x = canvas.width - body[0].width;
        }
        if (body[0].y < 0) {
          body[0].y = canvas.height - body[0].height;
        }
  
        // Food Intersects
        if (body[0].intersects(food)) {
          body.push(new Rectangle(0, 0, 10, 10));
          score += 1;
          food.x = random(canvas.width / 10 - 1) * 10;
          food.y = random(canvas.height / 10 - 1) * 10;
          aEat.play();
          
          fetch("https://jsonplaceholder.typicode.com/?score="+score)
            .then(function (response) {
            console.log("Score sent successfully");
            })
            .catch(function (error) {
                console.log(
                "Error trying to send the score"
            );
            });
        
        }
  
        
        // Wall Intersects
        //for (i = 0, l = wall.length; i < l; i += 1) {
        // if (food.intersects(wall[i])) {
        // food.x = random(canvas.width / 10 - 1) * 10;
        // food.y = random(canvas.height / 10 - 1) * 10;
        // }
        //
        // if (body[0].intersects(wall[i])) {
        // gameover = true;
        // pause = true;
        // }
        //}
        // Body Intersects
        for (i = 2, l = body.length; i < l; i += 1) {
          if (body[0].intersects(body[i])) {
            gameover = true;
            pause = true;
            aDie.play();
            addHighscore(score);
          }
        }
      }
      // Pause/Unpause
      if (lastPress === KEY_ENTER) {
        pause = !pause;
        lastPress = null;
      }
    };
    // Highscore Scene
    highscoresScene = new Scene();
    highscoresScene.paint = function (ctx) {
      var i = 0,
        l = 0;
      // Clean canvas
      ctx.fillStyle = "#030";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw title
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("HIGH SCORES", 150, 30);
      // Draw high scores
      ctx.textAlign = "right";
      for (i = 0, l = highscores.length; i < l; i += 1) {
        if (i === posHighscore) {
          ctx.fillText("*" + highscores[i], 180, 40 + i * 10);
        } else {
          ctx.fillText(highscores[i], 180, 40 + i * 10);
        }
      }
    };
    highscoresScene.act = function () {
      // Load next scene
      if (lastPress === KEY_ENTER) {
        loadScene(gameScene);
        lastPress = null;
      }
    };
    window.addEventListener("load", init, false);
  })(window);
