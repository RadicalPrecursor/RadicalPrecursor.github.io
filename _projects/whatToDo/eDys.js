var font,
  fontsize =16;

function preload() {
  font = loadFont('assets/SourceSansPro-Regular.otf');
}

class Desk {
  constructor(){
    this.message = wisdom[getRandomInt(len)];
  }
  createDesk() {
    var c2 = color('hsl(300, 100%, 90%)');
    noStroke();
    fill(c2);
    var rectW = (3*width)/4;
    var rectH = (height/2);
    rect(0, 0, rectW, rectH);
    var ctext = color(60);
    fill(ctext);
    text(this.message, 0, 0);
  }
}

class Particle {
  constructor(){
    this.x = (random(-135, 135));
    this.y = (random(-90, 90));
    this.w = random(8,32);
    this.h = random(8,32);
    this.xSpeed = (0,0);
    this.ySpeed = (0,0);
    this.r = random(100, 255);
    this.g = random(100, 255);
    this.b = random((Math.floor(this.g)-30), 255);
  }
  createParticle() {
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
  }
  moveParticle() {
    var mouseXadj = mouseX - 180;
    var mouseYadj = mouseY - 180;
    var dis = dist(this.x, this.y, mouseXadj, mouseYadj);
    if(dis < 20){
      this.xSpeed = this.x - mouseXadj;
      this.ySpeed = this.y - mouseYadj;
    }
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    this.xSpeed *= 0.8;
    this.ySpeed *= 0.8;
  }
}

var particles = [];
var desks = [];

function setup() {
  // edit canvas size here
  canvas = createCanvas(360, 360, WEBGL);
  canvas.parent('scatter');
  frameRate(5);
  rectMode(CENTER);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  desks.push(new Desk())
  for(var i = 0; i<300; i++){
    particles.push(new Particle())
  }
}

var wisdom = [
  "Clean your room",
  "Drink some water",
  "Go outside",
  "Stretch",
  "Do that thing you've been putting off"
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var len = wisdom.length;

function draw() {
  var c1 = color('#b5d1cc');
  background(c1);
  desks[0].createDesk();

  for (var i=0; i<particles.length; i++){
    particles[i].createParticle();
    particles[i].moveParticle();
  }
}

// shortcut to stop animations on click
//function mousePressed() {
//  noLoop();
//}
