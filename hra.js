'use strict';
let whoPlay = 'circle';

const playElm = document.querySelector('#play');

const nowPlays = (event) => {
  if (whoPlay === 'circle') {
    event.target.classList.add('grid__pole-circle');
    event.target.disabled = true;
    playElm.src = 'img/cross.svg';
    playElm.alt = 'křížek';
    whoPlay = 'cross';
    if (isWinningMove(event.target)) {
      const confirmation = confirm('Výhrává kolečko. Spustit novou hru.');
      if (confirmation === true) {
        location.reload();
      }
    }
  } else {
    event.target.classList.add('grid__pole-cross');
    event.target.disabled = true;
    playElm.src = 'img/circle.svg';
    playElm.alt = 'kolečko';
    whoPlay = 'circle';
    if (isWinningMove(event.target)) {
      const confirmation = confirm('Výhrává křížek. Spustit novou hru.');
      if (confirmation === true) {
        location.reload();
      }
    }
  }
};

const btnElm = document.querySelectorAll('.grid__pole');
for (let i = 0; i < btnElm.length; i += 1) {
  btnElm[i].addEventListener('click', nowPlays);
}

const getSymbol = (field) => {
  // Název třídy přizpůsob tvému kódu.
  if (field.classList.contains('grid__pole-cross')) {
    return 'cross';
  } else if (field.classList.contains('grid__pole-circle')) {
    return 'circle';
  }
};

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.grid__pole'); // Selektor pozměň tak, aby odpovídal tvému kódu.

const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
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

  return false;
};
