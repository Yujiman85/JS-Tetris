document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const width = 10;
    const height = 20;
    let currentPosition = 4;
})

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