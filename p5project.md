---
layout: default
title:  "Simple p5 sketch"
date:   2016-09-01
dependencies:
    - p5
---


<div id="simple-sketch-holder">
    <script type="text/javascript" src="simple_sketch.js"></script>
</div>

In order to include a P5.js sketch in your post:

Whaaaaaaaat is happening here.

- make sure that you are importing the p5.js library as a dependency. You can complete the
front-matter of the post like this:

<div id="simple-sketch-holder">
    <script type="text/javascript">

    var x = 100,
  y = 100,
  angle1 = 0.0,
  segLength = 50;


function setup() {
  canvas = createCanvas(710, 400);
  canvas.parent('simple-sketch-holder');
}

function draw() {
  strokeWeight(20.0);
  stroke(255, 100);
  background(50);

  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - (cos(angle1) * segLength);
  y = mouseY - (sin(angle1) * segLength);

  segment(x, y, angle1);
  ellipse(x, y, 20, 20);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}

</script></div>

- create in `div` in the markdown document of your post and include the javascript file
(relative path from the markdown document). Note that we gave the `div` a custom id.


**Note**: using the method, you can only include a single sketch per file. See [here](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) if you
want to have several sketches running simultaneously.

