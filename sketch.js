//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;

function preload()
{
  
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup()
{
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,350,5,5);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw()
{  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  
  /*if(keyWentUp(UP_ARROW))
  {
    dog.addImage(dogImg);
  }*/

  drawSprites();
  //add styles here
  fill("white");
  textSize(15);
  text("Note:Press the UP_ARROW to feed Drago Milk", 100,50);

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=0
  }
  else
  {
    x=x-1;
  }
  database.ref('/').update(
  {
      food:x
  })
}

