// boat data
const boats = [
  {
    size: 2,
    symbol: 'T',
  },
  {
    size: 3,
    symbol: 'D',
  },
  {
    size: 3,
    symbol: 'S',
  },
  {
    size: 4,
    symbol: 'B',
  },
  {
    size: 5,
    symbol: 'C',
  },
];

// initial 10x10 board data
let board = [
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
];

const placeHorizontal = ({ size, symbol }) => {
  // SELECT VALID ROW
  let row;
  let rowNum;
  let validRow = false;
  
  while(validRow === false) {
    rowNum = Math.floor(Math.random() * 10);    
    row = board[rowNum];
    if (rowPossible(row, size)) {
      validRow = true;
    }
  }

  // SELECT VALID CELL
  let cell;
  let validCell = false;

  while(validCell === false) {
    cell = Math.floor(Math.random() * (10-size));
    if (cellPossible(cell, row, size)) {
      validCell = true;
    }
  }

  // PLACE BOAT WITH COORDINATES
  board[rowNum].splice(cell, size);
  for (let i=0; i<size; i++) {
    board[rowNum].splice(cell, 0, symbol);
  }
}

const placeVertical = ({ size, symbol }) => {
  // SELECT VALID COLUMN
  let col = [];
  let colNum;
  let validCol = false;
  
  while(validCol === false) {
    colNum = Math.floor(Math.random() * 10);    
    // get column data
    for(let i=0; i<10; i++) {
      col.push(board[i][colNum]);
    }

    if (rowPossible(col, size)) {
      validCol = true;
    } else {
      // reset column data
      col = [];
    }
  }

  // SELECT VALID CELL
  let cell;
  let validCell = false;
  while(validCell === false) {
    cell = Math.floor(Math.random() * (10-size));

    if (cellPossible(cell, col, size)) {
      validCell = true;
    }
  }

  // PLACE BOAT WITH COORDINATES
  for(let i=cell; i<cell+size; i++) {
    board[i][colNum] = symbol;
  }
}

// Check row availability
const rowPossible = (row, size) => {
  let availableCellCount = 0;
  let rowIsPossible = false;

  for(let i=0; i<10; i++){
    if(i === 0 && row[i] === '.') {
      // logic for first loop
      availableCellCount+=1;
    } else if (row[i] === '.') {
      availableCellCount+=1;

      if (availableCellCount === size) {
        rowIsPossible = true;
        break;
      }
    } else {
      // Space unavailable, reset counter
      availableCellCount=0;
    }
  }

  return rowIsPossible;
}

// Check cell availability
const cellPossible = (cell, row, size) => {
  if (row[cell] !== '.') return false;

  let cellIsPossible = true;

  for (let i = cell; i<cell+size; i++) {
    // if any elements in 'chunk' arent free, return false
    if (row[i] !== '.') {
      cellIsPossible = false;
      break;
    }
  }
  return cellIsPossible;
}

const startBattleship = () => {
  // Place each boat on board
  for(let i=0; i<boats.length; i++) {
    // Randomize direction: horizontal (0) or vertical (1)
    const direction = Math.floor(Math.random() * 2);
    
    if (direction === 0) {
      placeHorizontal(boats[i]);
    } else {
      placeVertical(boats[i]);
    }
  }

  return board;
}

const startingBoard = startBattleship();
console.log('\n\nLETS PLAY BATTLESHIP\n\n', startingBoard);
