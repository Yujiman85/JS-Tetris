document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('button');
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.querySelector(".score-display");
  const linesDisplay = document.querySelector(".lines-display");
  const displaySquares = document.querySelectorAll('.previous-grid div');
  let squares = Array.from(grid.querySelectorAll('div'));
  const width = 10;
  const height = 20;
  let currentPosition = 4;
  let timerId;
  let score = 0;
  let lines = 0;

  //Assign functions to key presses
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 70) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  };

  document.addEventListener('keydown', control);

  //The Tetris Blocks
  const lBlock = [
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width,width*2,width*2+1,width*2+2]
  ];

  const zBlock = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ];

  const tBlock = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ];

  const oBlock = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ];

  const iBlock = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ];

  const theBlocks = [lBlock, zBlock, tBlock, oBlock, iBlock];

  //Randomly pick a piece
  let random = Math.floor(Math.random()*theBlocks.length);
  let currentRotation = 0;
  let current = theBlocks[random][currentRotation];

  //Draw the pieces
  function draw() {
      current.forEach(index => (
          squares[currentPosition + index].classList.add('block')
      ));
  };

  //Undraw the pieces
  function undraw() {
    current.forEach(index => (
      squares[currentPosition + index].classList.remove('block')
    ))
  };

  //Move the shape down
  function moveDown() {
    undraw();
    currentPosition = currentPosition += width;
    draw();
    freeze();
  }

  //Move right and prevent collisions
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) currentPosition += 1;
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition -= 1;
    }
    draw();
  }

  //Move left and prevent collisions
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition += 1;
    }
    draw();
  }

  //Rotate the piece
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theBlocks[random][currentRotation];
    draw();
  }

  //Show previous Block in displaySquares
  const displayWidth = 4;
  const displayIndex = 0;
  let nextRandom = 0;

  const smallBlocks = [
    [1,displayWidth+1,displayWidth*2+1,2], /* lBlock */
    [0,displayWidth,displayWidth+1,displayWidth*2+1],  /* zBlock */
    [1,displayWidth,displayWidth+1,displayWidth+2],    /* tBlock */
    [0,1,displayWidth,displayWidth+1],     /* oBlock */
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]  /* iBlock */
  ];

  //Display the next shape above the grid
  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('block');
    })
    smallBlocks[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('block');
    })
  }

  //Freezes the blocks once at the bottom
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') 
    || squares[currentPosition + index + width].classList.contains('block2'))) {
      current.forEach(index => squares[index + currentPosition].classList.add('block2'))

      random = Math.floor(Math.random() * theBlocks.length);
      current = theBlocks[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      gameOver();
    }
  }

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theBlocks.length);
      displayShape();
    }
  });

  //Game Over
  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      scoreDisplay.innerHTML = 'End';
      clearInterval(timerId);
    }
  }

  //Add score
  function addScore() {
    for (currentIndex = 0; currentIndex < 199; currentIndex += width) {
      const row = [currentIndex,currentIndex+1,currentIndex+2,currentIndex+3,currentIndex+4,currentIndex+5,currentIndex+6,currentIndex+7,currentIndex+8,currentIndex+9]
      if (row.every(index => squares[index].classList.contains('block2'))) {
        score += 10;
        lines += 1;
        scoreDisplay.innerHTML = score;
        linesDisplay.innerHTML = lines;
        row.forEach(index => {
          squares[index].classList.remove('block2') || squares[index].classList.remove('block')
        })
      }
    }
  }

});



  