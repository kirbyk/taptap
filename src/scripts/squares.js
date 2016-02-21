var s;
var sctx;
var nSquares = 200;
var squares = [];

var getRandomX = function() {
  return Math.random() * window.innerWidth*2;
}

var getRandomY = function() {
  return (Math.random() * window.innerHeight)*2;
}

var getRandomSize = function() {
  return (Math.random() * 5) + 2.5;
}

var getRandomOpacity = function() {
  return (Math.random() * 0.3) + 0.1;
}

var getRandomSpeed = function() {
  return (Math.random() * 0.5) + 0.5;
}

var updateSquares = function() {
  sctx.clearRect(0, 0, s.width, s.height);
  for (var i in squares) {

    var xDiff = xPos*2 - squares[i].x;
    var yDiff = yPos*2 - squares[i].y;

    var dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
    var tempSize = squares[i].size;
    if (dist < 400) {
      tempSize /= (-3/400)*dist + 4;
    }

    squares[i].y += squares[i].speed;
    if (squares[i].y > s.height) {
      squares[i].y = -40;
    }
    sctx.fillStyle = "rgba(255,255,255,"+squares[i].opacity+")";
    sctx.fillRect(squares[i].x + xOffset/(200*(1/squares[i].size))*2, squares[i].y, tempSize*2, tempSize*2);
  }
}

var drawSquares = function() {
  for (var i in squares) {
    sctx.fillStyle = "rgba(255,255,255,"+squares[i].opacity+")";
    sctx.fillRect(squares[i].x*2, squares[i].y*2, squares[i].size*2, squares[i].size*2);
  }

  var squaresInt = window.setInterval(function() {
    updateSquares();
  }, 1000/60);
}

var initSquares = function() {
  s = document.getElementById('squares');
  s.width = window.innerWidth*2;
  s.height = window.innerHeight*2;
  sctx = s.getContext('2d');


  for (var i = 0; i < nSquares; i++) {
    squares.push({
      size: getRandomSize(),
      x: getRandomX(),
      y: getRandomY(),
      speed: getRandomSpeed(),
      opacity: getRandomOpacity()
    });
  }
  drawSquares();
}
