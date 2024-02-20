var c = document.getElementById('myCanvas');
c.width = window.innerWidth;
c.height = window.innerHeight*2;

var ctx = c.getContext('2d');
var id;
var x_off;
var y_off;

var min_dist = 0;
var max_dist = 32;
var d = 250;
var n_stars = 30;

var Point = {
  x: 0,
  y: 0
};

var elements = [];

function project2d(point, dist) {
  var p = Object.create(Point);
  p.x = Math.round(d * point.x / (dist));
  p.y = Math.round(d * point.y / (dist));
  return p;
}

var StarElement = {
  p1: null,
  width: 0.3,
  dist: 0,

  draw: function() {

    var p2 = project2d(this.p1, this.dist);

    if (p2.x + x_off <= 0 || p2.x + x_off > c.width || p2.y + y_off <= 0 || p2.y + y_off > c.height) {
      this.dist = max_dist;
    } else {
      
      var percent = (1 - this.dist / max_dist);

      ctx.beginPath();
      ctx.strokeStyle = 'hsl(0, 0%, 100%)'; // White color for stars

      this.width = percent * 3;
      ctx.rect(p2.x + x_off, p2.y + y_off, this.width, this.width);

      ctx.stroke();
      ctx.closePath();
    }
  }
};

function createElements() {

  for (var i = 0; i < n_stars; i++) {

    var elem = Object.create(StarElement);
    elem.p1 = Object.create(Point);
    elem.p1.x = randomRange(-50, 50);
    elem.p1.y = randomRange(-50, 50);
    elem.dist = randomRange(0, max_dist);
    elements.push(elem);
  }
}

function update() {

  ctx.clearRect(0, 0, c.width, c.height);

  elements.forEach(function(elem, i, arr) {
    elem.dist = elem.dist - 0.2;
    elem.draw();
  });

}

function restart() {

  ctx.strokeStyle = 'hsl(180, 0%, 100%)';
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.lineWidth = 2;
  ctx.moveTo(0, 0);

  x_off = c.width / 2;
  y_off = c.height / 2;

  elements = [];
  createElements();
  id = setInterval(update, 15);
}

restart();

window.onresize = function() {

  c.width = this.innerWidth;
  c.height = this.innerHeight;

  clearInterval(id);
  restart();
};

function randomRange(minVal, maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
}

