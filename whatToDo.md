---
layout: default
title: So you're feeling executive dysfuntion...
dependencies:
    - p5
---

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Rest a Bit</title>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.js"></script>
  </head>
  <body>
    <p>What to do?</p>
    <div id="scatter">
      <script type="text/javascript" src="eDys.js"></script>
    </div>
    <script>
let font,
  fontsize =16;

function preload() {
  // is loaded before setup() and draw() are called
  font = loadFont('assets/SourceSansPro-Regular.otf');
}

class Desk {
  constructor(){
    this.message = wisdom[getRandomInt(len)];
  }
  createDesk() {
    let c2 = color('hsl(300, 100%, 90%)');
    noStroke();
    fill(c2);
    let rectW = (3*width)/4;
    let rectH = (height/2);
    rect(0, 0, rectW, rectH);
    let ctext = color(60);
    fill(ctext);
    text(this.message, 0, 0);
  }
}

class Particle {
  constructor(){
//    this.x = (getRandomInt(rectW)-(rectW/2));
//    this.y = (getRandomInt(rectH)-(rectH/2));
    this.x = (random(-135, 135));
    this.y = (random(-90, 90));
    this.w = random(8,32);
    this.h = random(8,32);
    this.xSpeed = (0,0);
    this.ySpeed = (0,0);
    this.r = random(100, 255);
    this.g = random(100, 255);
    this.b = random(100, 255);
  }
  createParticle() {
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
  }
  moveParticle() {
    let mouseXadj = mouseX - 180;
    let mouseYadj = mouseY - 180;
    let dis = dist(this.x, this.y, mouseXadj, mouseYadj);
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

let particles = [];
let desks = [];

function setup() {
  createCanvas(360, 360, WEBGL);
  frameRate(5);
  rectMode(CENTER);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  desks.push(new Desk())
  for(let i = 0; i<300; i++){
    particles.push(new Particle())
  }
}

let wisdom = [
  "Clean your room",
  "Drink some water",
  "Go outside",
  "Stretch",
  "Do that thing you've been putting off"
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let len = wisdom.length;

function draw() {
  let c1 = color('hsl(180, 80%, 80%)');
  let c2 = color('hsl(300, 100%, 90%)');
  let c3 = color('hsl(240, 90%, 80%)');
  background(c1);
  desks[0].createDesk();

  for (let i=0; i<particles.length; i++){
    particles[i].createParticle();
    particles[i].moveParticle();
  }
}

// shortcut to stop animations on click
function mousePressed() {
  noLoop();
}

    </script>
    <p>Hmm.</p>
  </body>

