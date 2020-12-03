//declairing variables.
var sword, swordimage, swordimage2;
var score = 0;
var fruitgroup, enemygroup, fruit, enemy;
var play = 1;
var end = 0;
var gamestate = play;
var fruit, fruit1, fruit2, fruit3, fruit4;
var alien1, alien2, monster;
var cuttingsound, gameoversound, direction;

//loading all images and sound.
function preload()
{
  swordimage = loadImage("sword.png");
  swordimage2 = loadImage("gameover.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  cuttingsound = loadSound("knifeSwooshSound.mp3");
  gameoversound = loadSound("gameover.mp3");
}


function setup()
{
  //for creating the gaming area.
  createCanvas(400,400);
  
  //creating  the groups.
  fruitgroup = createGroup();
  enemygroup = createGroup();
  
  //creating the sword.
  sword = createSprite(40,200,20,20);
  
}

  
function draw()
{
  //drawing the background.
  background(0,100,150);
  
  //if gamestate is play then specific tasks will be executed.
  if(gamestate===play)
  {
    //adding image to the sword and resizing it.
    sword.addImage(swordimage);
    sword.scale = 0.8;
    
    //setting sword's x and y axis as mouse's x and y so that it moves with it.
    sword.x = mouseX;
    sword.y = mouseY;
    
    //declairing functions for the fruits and enemies.
    fruits();
    enemy();
    
    //if fruits are touching the sword, then the fruit will be destroyed and score will increase and sound will come.
    if(fruitgroup.isTouching(sword))
    {
      fruitgroup.destroyEach();
      cuttingsound.play();
      score = score+1;
    }
    
    if(score==10)
    {
      monster.velocityX = -20;
    }
    
    //if enemies are touching the sword, then the gamestate will be changed to           end and sound will come.
    if(enemygroup.isTouching(sword))
    {
      gamestate = end;
      gameoversound.play();
    }
  }
  
  //if gamestate will be end, then specific functions will be executed.
  if(gamestate===end )
  {
    //the fruits will e destroyed.
    fruitgroup.destroyEach();
    enemygroup.destroyEach();
    
    //fruits will not move.
    fruit.velocityX = 0;
    enemy.velocityX = 0;
    
    //sword eill come to midpoint of the canvas.
    sword.x = 200;
    sword.y = 200;
    
    //sword's image will turn to gameover image
    sword.addImage(swordimage2);
  }
  
  //displaying the score in text form.
  fill("black");
  textSize(20);
  text("SCORE = "+score,250,25);
  
  //drawing the sprites.
  drawSprites(); 
}


function fruits()
{
  //fruits will be created after 80 frames.
  if(frameCount%80===0)
  {
    fruit = createSprite(400,200,20,20);
    
    direction = Math.round(random(1,2));
    
    if(direction==1)
    {
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }
    
    else if(direction==2)
    {
      fruit.x = 0;
      fruit.velocityX = (7+(score/4));
    }
    
    //this is to add random fruits.
    var num = Math.round(random(1,4));
    
    if(num == 1)
    {

      fruit.addImage(fruit1);

    }

    else if(num == 2)
    {

      fruit.addImage(fruit2);

    }

    else if(num == 3)
    {

      fruit.addImage(fruit3);

    }

    else
    {

      fruit.addImage(fruit4);

    }
    //to create fruits at random y positions.
    fruit.y = Math.round(random(50,340));
    //resizing the fruits.
    fruit.scale = 0.2;
    //adding lifetime to avoid memory leak.
    fruit.lifetime = 100;
    
    //adding fruit to fruit group.
    fruitgroup.add(fruit);
  
  }  
}

function enemy()
{
  //monsters will be created after 200 frames.
  if(frameCount%200===0)
  {
     
    monster = createSprite(450,200,20,20);
    //to give random image to the monsters.
    var n = Math.round(random(1,2));
    
    if(n==1)
    {
      monster.addImage(alien1);
    }
    
    if(n==2)
    {
      monster.addImage(alien1);
    }
    //adding velocity and lifetime to the monster.
    monster.velocityX=-(10+score/10);
    monster.lifetime = 150;
    
    //adding monster to enemy group.
    enemygroup.add(monster);
    
  }

}








