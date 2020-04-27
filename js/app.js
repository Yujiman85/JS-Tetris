document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector(".grid");
  const displaySquares = document.querySelectorAll('.previous-grid div');
  let squares = Array.from(grid.querySelectorAll('div'));
  const width = 10;
  const height = 20;
  let currentPosition = 4;

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

  document.addEventListener('keyup', control);

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
    // freeze();
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
    }
  }

  startBtn.addEventListener('click', ( => {
    
  }))
});



  