var monkeyImage, monkey ;
var banana, bananaImage, jungle, jungleImage;
var stone, stoneImage, count = 0;
var invisibleGround;
var over, gameOverImage
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png",     "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  jungleImage = loadAnimation("jungle.jpg");
  
  bananaImage = loadAnimation("banana.png");
  stoneImage = loadAnimation("stone.png");
  
  gameOverImage = loadAnimation("game over.jpg");
}



function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(200,200,400,400)
  jungle.addAnimation("moving", jungleImage);
  jungle.scale = 0.56
  jungle.velocityX = -4;
  
  monkey = createSprite(80,320,10,10);
  monkey.addAnimation("Running", monkeyImage);
  monkey.scale = 0.1
  
  invisibleGround = createSprite(200,360,400,20);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  over = createSprite(200,200,400,400);
  over.visible = false
  over.addAnimation("over", gameOverImage);
}

function draw() 
{
  background(220);
  
  if(gameState === PLAY)
  {
  monkey.collide(invisibleGround);
    
  if (jungle.x<200)
  {
    jungle.x = jungle.width/4;
  }
    
  monkey.velocityY = monkey.velocityY+0.8;
  spawnBanana();
  spawnStone();
  
  if (keyDown("space") && monkey.y>285)
  {
    monkey.velocityY = -12;
  }
  
  if (bananaGroup.isTouching(monkey))
  {
    count = count+10; 
    bananaGroup.destroyEach();
  } 
 
 switch(count)
  {
    case 10 : monkey.scale = 0.12;
              break;
    case 20 : monkey.scale = 0.14;
              break;    
    case 30 : monkey.scale = 0.16;
              break;  
    case 40 : monkey.scale = 0.18;
              break;    
              default : break;   
  }            
  if (stoneGroup.isTouching(monkey) && monkey.scale<0.11)
  {
    monkey.scale = 0.1
    count = 0;
    stoneGroup.destroyEach();
    gameState  = END;
  }
    
   if (stoneGroup.isTouching(monkey))
   {
     monkey.scale = 0.1
     count = 0;
     stoneGroup.destroyEach();
   }
  
  }  
  
  else if (gameState === END)
  {
    
  monkey.destroy();
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    jungle.destroy();
    over.visible = true;
  }

  drawSprites();

  if (gameState===PLAY)
  {
  fill("brown");
  textSize(18);
  text("Score: " + count, 300,100);
  }
}  
  
 function spawnBanana()
{
  if(frameCount % 60 === 0) {
  banana = createSprite(400,random(170,240));
  banana.addAnimation("flying", bananaImage);
  banana.velocityX = -6
    
     //assign scale and lifetime to the obstacle           
    banana.scale = 0.05;
    banana.lifetime = 300;
    //add each obstacle to the group
    bananaGroup.add(banana);

    
  }
}

function spawnStone()
{
  if(frameCount % 80 === 0) {
  stone = createSprite(400,340);
 stone.addAnimation("banana", stoneImage);
  stone.velocityX = -6
    
     //assign scale and lifetime to the obstacle           
    stone.scale = 0.09;
    stone.lifetime = 300;
    //add each obstacle to the group
    stoneGroup.add(stone);
    
  }
}










  