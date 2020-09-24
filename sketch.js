// Declaring The Vars
var monkey , monkey_running,jumpSound;
var ground, invisibleGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  // Loading the Animations,Images & Sounds
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  groundImg = loadImage("ground.jpg") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jumpSound = loadSound("jump.mp3");
}

function setup(){
  // Creating the Canvas
  createCanvas(600,300);
  // Creating the groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 // Creating the monkey,ground & Invisible Ground
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
    
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  ground.addImage("ground", groundImg);
  
  invisibleGround = createSprite(300,278,600,7);
  invisibleGround.visible = false;
}

function draw(){
  // Giving Background And Text
  background("skyblue");
  text("Survival Time: "+score, 470, 20);
  text("Bananas: "+bananaScore,300,20);
  // Giving the Play state
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
  
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
      jumpSound.play();
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore= bananaScore + 1;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  // Giving the end state
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    textSize(30);
    text("Game Over!!!", 220, 170);
    textSize(15);
    text("Press R to restart", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  // Drawing the sprites
  drawSprites(); 
  // Colliding the Invisibke Ground
  monkey.collide(invisibleGround);
}
// Function to Create Bananas
function bananas(){
  if (frameCount%80 === 0){
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
}
  }
// Function to create Obstacles
function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("stone", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
}
  }