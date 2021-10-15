var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var shield, shield1, shieldImg;
var PLAY=1;
var END=0;
var gameState=1;
var a = 10, b = -10;
var rightedge, leftedge;
var shieldSound, cashSound, diamondSound, jwellerySound, toingSound, swordSound;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  shieldImg = loadImage("shield.png");
  shieldSound = loadSound("shield.mp3");
  cashSound = loadSound("cash.mp3");
  diamondSound = loadSound("diamond.mp3");
  jwellerySound = loadSound("jwellery.mp3");
  toingSound = loadSound("toing.mp3");
  swordSound = loadSound("sword.mp3");
}

function setup(){
  
//create the canvas and adjust the window sizes to suit the device 
createCanvas(windowWidth,windowHeight)

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-105,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
shield = createSprite(width/2,boy.y,width/4,height/20);
shield.addImage(shieldImg);
shield.scale = 0.4;
shield.visible = false;

shield1 = createSprite(width-width/8,height/2-height/4);
shield1.addImage(shieldImg);
shield1.scale = 0.1;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

//rightedge = createSprite(width,height/2,10,height);
//leftedge = createSprite(width-width,height/2,10,height);


}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  shield.x = World.mouseX;
  
  if(keyWentDown("space") && treasureCollection >= 50)
  {
    createShield();
    treasureCollection = treasureCollection - 50;
    shieldSound.play();
  }

  if(keyWentUp("space"))
  {
    destroyShield();
  }
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
      cashSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      diamondSound.play();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      jwellerySound.play();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        swordSound.play();
    }
  }
  
  if(swordGroup.isTouching(shield) && shield.visible == true)
  {
    swordGroup.destroyEach();
    shield.visible = false;
  }

  if(cashG.isTouching(shield) && shield.visible == true)
  {
    cashG.destroyEach();
    shield.visible = false;
    toingSound.play();
  }

  if(diamondsG.isTouching(shield) && shield.visible == true)
  {
    diamondsG.destroyEach();
    shield.visible = false;
    toingSound.play();
  }

  if(jwelleryG.isTouching(shield) && shield.visible == true)
  {
    jwelleryG.destroyEach();
    shield.visible = false;
    toingSound.play();
  }

  drawSprites();
  textSize(20);
  fill("white");
  text("Treasure: "+ treasureCollection,width-150,30);
  fill("limegreen");
  text("Collect Treasure,",width-width+50,height/2);
  text("buy SHIELD and",width-width+50,height/2 + 25);
  text("'HOLD' SPACE to",width-width+50,height/2 + 50);
  text("activate it.",width-width+50,height/2 + 75);
  fill("red");
  text("DON'T TOUCH THE",width-width+50,height/2 + 100);
  text("SWORDS.",width-width+50,height/2 + 125);
  fill("black");
  text("SHIELD as well as",width-width+50,height/2 + 150);
  text("things it touches",width-width+50,height/2 + 175);
  text("will be destroyed!",width-width+50,height/2 + 200);
  //text("",width-width+50,height/2 + 225);
  fill("skyblue");
  text("SHIELD = 50",shield1.x + 30, shield1.y + 7);
  }

}

function createCash() {
  if (World.frameCount % 210 == 0) {
   // Modify the positions of cash 
    var cash = createSprite(Math.round(random(width-width+50, width-50),40, 10, 10));
    cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 350 == 0) {
       // Modify the positions of diamonds 

    var diamonds = createSprite(Math.round(random(width-width+50, width-50),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 400 == 0) {
    //   Modify the positions of jwellery to make them spawn throughout the available screen size.

    var jwellery = createSprite(Math.round(random(width-width+50, width-50),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
    //   Modify the positions of sword to make them spawn throughout the available screen size.

    var sword = createSprite(Math.round(random(width-width+50, width-50),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 5;
  //sword.velocityX = Math.round(random(a,b));
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}

function createShield()
{
  shield.visible = true;
}

function destroyShield()
{
  shield.visible = false;
}