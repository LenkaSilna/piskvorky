'use strict';

let player = 'circle';
const gridSquare = document.querySelectorAll('.grid__pole');
const boardSize = 10;
const symbolsToWin = 5;

const NowPlay = ({ target }) => {
  if (
    !target.classList.contains('grid__pole-circle') &&
    !target.classList.contains('grid__pole-cross')
  ) {
    target.classList.add(`grid__pole-${player}`);
    target.disabled = true;
    const SymbolElm = document.querySelector('.symbol');
    if (player === 'circle') {
      player = 'cross';
      SymbolElm.src = 'img/cross.svg';
      SymbolElm.alt = 'křížek';
    } else {
      player = 'circle';
      SymbolElm.src = 'img/circle.svg';
      SymbolElm.alt = 'kolečko';
    }
    if (isWinningMove(target) && player === 'cross') {
      if (confirm(`Vyhrálo kolečko. Spustit další hru?`)) {
        location.reload();
      }
    } else if (isWinningMove(target) && player === 'circle') {
      if (confirm(`Vyhrál křížek. Spustit další hru?`)) {
        location.reload();
      }
    }
  }
};

const getSymbol = (field) => {
  if (field.classList.contains('grid__pole-cross')) {
    return 'cross';
  } else if (field.classList.contains('grid__pole-circle')) {
    return 'circle';
  }
};

const getField = (row, column) => {
  return gridSquare[row * boardSize + column];
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < gridSquare.length && field !== gridSquare[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  // Diagonály

  let y;

  let inDiagonalA = 1;
  // Koukni nahoru vpravo
  i = origin.row;
  y = origin.column;
  while (
    i > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i - 1, y + 1))
  ) {
    inDiagonalA++;
    i--;
    y++;
  }

  // Koukni dolu vlevo
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y > 0 &&
    symbol === getSymbol(getField(i + 1, y - 1))
  ) {
    inDiagonalA++;
    i++;
    y--;
  }

  if (inDiagonalA >= symbolsToWin) {
    return true;
  }

  let inDiagonalB = 1;
  // Koukni nahoru vlevo
  i = origin.row;
  y = origin.column;
  while (i > 0 && y > 0 && symbol === getSymbol(getField(i - 1, y - 1))) {
    inDiagonalB++;
    i--;
    y--;
  }

  // Koukni dolu vpravo
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, y + 1))
  ) {
    inDiagonalB++;
    i++;
    y++;
  }

  if (inDiagonalB >= symbolsToWin) {
    return true;
  }

  return false;
};

for (let i = 0; i < gridSquare.length; i++) {
  gridSquare[i].addEventListener('click', NowPlay);
}
