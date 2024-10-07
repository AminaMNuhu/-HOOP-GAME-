// current screen's variable 
var screen = 0;

// backgorund images' variable 
var bg;

// variable for the basketball's y coordinate 
var y = -50;

// variable for the basketball's x coordinate 
var x = 120;

// the basketball's vertical/y axis falling speed
var speed = 2;

// a variable to keep up with the player's score 
var score = 0;

// a variable to store/ keep up with the player's level; as the level increases the game simultaneously gets faster and more difficult 
var level = 1;

// a variable to store/ keep up with whenever the player misses a shot 
var misses = 0;

// a variable to store/ keep up with the max no. of player's missed shots before it is GAME OVER; if the player misses up to 3 shots the game ends
var maxMisses = 3;

// a variable for the gameplay's background music;

// a function to preload all the game's image assets 
function preload() {

  // loading the backboard image 
  img1 = loadImage("pixelbackboard.png");

  // loading the basketball image 
  img2 = loadImage("pixelbasketball.png");

  // loading the title ('SHOOT') image for the start screen
  img3 = loadImage("pixelshoot.png");

  // loading the title ('GAME OVER') image for the end screen 
  img4 = loadImage("pixelgameover.png");

  // loading the skyscraper image for the start screen/gameplay background 
  img5 = loadImage('skyscraper.png');

  // loading the apartments image for the start screen/gameplay background
  img6 = loadImage('apartments.png');

  // loading the redbrick apartments image for the start screen/gameplay background 
  img7 = loadImage('redbrick.png');
}

// a setup function to run the game as soon as the player begins 
function setup() {
  // creating/loading a 600 by 600 canvas for the game 
  createCanvas(600, 600);

  // creating the rbg for a sky blue background 
  background(135, 206, 235);

  // displaying the start screen prior to the gameplay
  startScreen();

  // loading the background music's mp3 file path for the gameplay
  bgMusic = new Audio("atmosphere.mp3");
  // looping the background music to play over the totality of the gameplay
  bgMusic.loop = true;
}

// a draw function to handle the game loops and conditionals for each screen 
function draw() {
  // checking the current screen 
  if (screen == 0) {
    // calling the start screen function in the case that the screen is set to 0
    startScreen();
  } else if (screen == 1) {
    // calling the gameOn function in the case that the creen is set to 1, meaning the game has begun
    gameOn();
  } else if (screen == 2) {
    // calling the end screen function in the case that the  screen is set to 2, meaning the game has ended 
    demoScreen();
  } else if (screen == 3) {
    endScreen();
  }
}

// a start screen function for the start screen's display 
function startScreen() {
  // setting the background colour to a light sky blue rbg
  background(135, 206, 235);

  // displaying the redbrick apartments' image for the start screen's background 
  image(img7, -325, 0, 800, 500);

  // displaying the skyscraper building's image for the start screen's background
  image(img5, 200, 0, 800, 400);

  // displaying the apartments' image for the start screen's background 
  image(img6, 0, 150, 800, 500);

  // displaying the 'click to start' basketball hoop/backboard's image on the start screen 
  image(img1, 150, 305, 300, 300);

  // displaying the tile's ('SHOOT') image on the start screen 
  image(img3, 0, 100, 700, 500);

  // displaying directional prompt's for the player on the start screen 
  textSize(20);
  fill(20);
  textAlign(CENTER);
  text("CLICK TO BEGIN", width / 2, 380);
  textSize(35)
  fill(225)
  text("Welcome to the Game of...", width / 2, 50);
}

// a demo screen function to display directional text to aid the player's gameplay
function demoScreen() {
   // setting the background colour to a light sky blue rbg again
   background(135, 206, 235);

   // directional text for the player - TITLE
   textSize(50)
   fill(0) //BLACK TEXT
   text("THE AIM OF THE GAME", width / 2, 100);

   // directional text for the player - SUBTEXT
   textSize(25)
   fill(225) //WHITE TEXT 
   textAlign(CENTER)
   text("Move your mouse from side to side across the ", width / 2, 200);
   textSize(25)
   fill(225)
   textAlign(CENTER)
   text("bottom of the screen to catch the ball in the hoop", width / 2, 250);
   textSize(25)
   fill(225)
   textAlign(CENTER)
   text("Each catch is equivalent to 3 points", width / 2, 350);
   textSize(25)
   fill(225)
   textAlign(CENTER)
   text("A score of 9 points is equivalent to 1 level up", width / 2, 400);

   //directional text for the player - text for 'click to start'
   textSize(50)
   fill(225, 165, 0) //ORANGE TEXT
   textAlign(CENTER)
   text("CLICK TO PLAY", width / 2, 500);
}

// a game on function to handle the display and mechanics of the gameplay 
function gameOn() {
  // setting the background colour to a light sky blue rbg again
  background(135, 206, 235);

  // displaying the redbrick apartments' image for the gameplay's background 
  image(img7, -325, 0, 800, 500);

  // displaying the skyscraper building's image for the gameplay's background
  image(img5, 200, 0, 800, 400);

  // displaying the apartments' image for the gameplay's background 
  image(img6, 0, 150, 800, 500);

  // displaying the basketball's image on the gameplay at current x, y coordinates 
  image(img2, x, y, 80, 80);

  // text for a live display of the player's score on the gameplay canvas 
  textSize(35);
  fill(225);
  text("SCORE: " + score, 100, 50);

  // text for a live display of the player's level on the gameplay canvas 
  textSize(35)
  fill(225)
  text("LEVEL: " + level, 500, 50);

  // displaying the basketball hoop/backboard's image on the gameplay canvas; the image is fixed on the y axis and moveable on the x axis in accordance with the mouse 
  image(img1, mouseX, height - 150, 170, 170);

  // an update for the basketball image's vertical position 
  y += speed;

  // checking whether or not the basketball has fallen out of the canvas' bounds without being caught by the player
  if (y > height) {
    // misses
    misses++;
    
    // checking if the player has missed more than what is stated in the max misses (3)
    if (misses >= maxMisses) {
      // if the current misses are over the max (3), the end screen is displayed and the game is over 
      screen = 3;

    } else {
      // if else (if the misses have not passed the limit) reset the basketball to its initial position in the gameplay
      resetBall();
    }
  }

  // checking whether the basketball is parallel with the hoop/backboard so the player can score point's/ gain levels 
  if (y > height - 120 && x > mouseX - 120 && x < mouseX + 120) {
    // resettinf the ball to its initial position 
    y = -120;

    // increasing the speed of the basketball to make the game progressively more difficult 
    speed += 0.5;

    // increasing the player's score by 3 points everytime they catch the basketball
    score += 3;

    // checking if the score passes the criteria to increase the game level; if they score 9 points (3 catches) they gain a level 
    if (score % 9 == 0) {
      // increase the game level for every 9 points scored (3 catches)
      levelUp();
    }
  }

  // picking a new random x coordinate for the basketball when it resets
  if (y == -20) {
    // randomly assigned 
    pickRandom(); 
  }
}

// a pick random function for randomly assigning a new x coordinate for the basketball each time it rese
function pickRandom() {
  // setting a random x value between 50 and the canvas width as -20
  x = random(50, width - 20);
}

// an end screen function to display the end screen after the player loses and game over is declared 
function endScreen() {
  // setting the background colour to black
  background(0);
 
  // displaying the title's ('GAME OVER') image on the end screen 
  image(img4, 50, 100, 700, 500);

  // Setting the text rbg color to red
  fill(255, 0, 0);

  // Displaying a large "GAME OVER" text on the end screen
  textSize(100);
  textAlign(CENTER);
  

  // text to display the player's final score on the end screen 
  textSize(40);
  fill(150, 150, 150);
  text("FINAL SCORE = " + score, width / 2, height / 2 + 5);

  // directional text for the 'click to play again' prompt; so the player can replay the game 
  fill(95, 150, 250);
  textSize(25);
  text("CLICK TO PLAY AGAIN", width / 2, height / 2 + 220);
}

// a reset ball function for resetting the basketball's position after the player misses or scores 
function resetBall() {
  // resetting the basketball to restart out of the canvas' bounds (invisible to the player, so they only see the ball as 'falling vertically from the sky)
  y = -50;

  // choosing a new random x coordinate for the basketball
  // randomly assigned 
  pickRandom();
}

// a mouse pressed function for the clickability elements on the start screen, gameplay screen and the end screen 
function mousePressed() {
  // if the current screen is the start screen the game begins the game by changing the screen variable to screen 1 (GameOn function)
  if (screen == 0) {
    screen = 2;
  }
  // changing from the demo screen to game on 
  else if (screen == 2) {
    screen = 1;

    // if the gameOn function is called the background music should begin playing over the gameplay
    bgMusic.play();
  }
  // or else if the current screen is the end screen the game restarts by resetting the screen variable (calling the resretGame function below) to screen 0 (startScreen function)
  else if (screen == 3) {
    resetGame();
    screen = 0;
  }
}

// a reset game fuction to reset the game mechanics after it ends (GAME OVER/ end screen)
function resetGame() {
  // resetting the player's score to zero
  score = 0;

  // resetting the number of misses to zero
  misses = 0;

  // resetting the speed of the basketball (y speed)
  speed = 2;

  // resetting the player's level to zero
  level = 1;

  // resetting the basketball's image to start its fall outside of the canvas' bounds (slightly above the canvas so it's invisible to the player)
  y = -50;
}

// a level up function to increase the player's everytime they pass the level up criteria (9 points/ 3 catches)
function levelUp() {
  // changing/increasing the player's level 
  level++;

  // increasing the speed of the basketball in accordance with the level for increased difficulty (the higher the level the faster the falling speed of the basketball)
  speed += 0.5;
}


