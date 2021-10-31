var skyWidth = 1200;
var skyHeight = 600;

class Star {
    constructor(id) {
      this.x = random(10, ((skyWidth)-10));
      this.y = random(10, (skyHeight-10));
      this.d = (random(0.2, 1.8)*random(0.2, 1.8))**random(0.3, 2);
      this.h = random(0, 240);
      this.s = random(80, 100);

      if (this.h < 60) {
        this.l = (Math.max
          (random(40, 100), (this.h + 25))
        );
        this.l = this.l + (
          (100 - this.l)*Math.sqrt(random(0,1)));
      }
      else if (this.h > 200) {
        this.l = (random(80, 100));
        this.l = this.l + ((100 - this.l)*(random(0,1)));
      }
      else {
        this.l = random(98,100);
      }

      this.id = id;
    }
    drawStar() {
      noStroke();
      colorMode(HSL);
      fill(this.h, this.s, this.l);
      circle(this.x, this.y, this.d);
    }
  }

  var stars = [];

  function setup() {
    canvas = createCanvas(skyWidth, skyHeight);
    canvas.parent('scatter');
    background(25);
    for(var i = 0; i<1500; i++){
      stars.push(new Star(i))
    }
  }

  function draw() {
    for (var i=0; i<stars.length; i++) {
      stars[i].drawStar();
    }
  }
