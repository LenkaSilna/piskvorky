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
  } else {
    event.target.classList.add('grid__pole-cross');
    event.target.disabled = true;
    playElm.src = 'img/circle.svg';
    playElm.alt = 'kolečko';
    whoPlay = 'circle';
  }
};

const btnElm = document.querySelectorAll('.grid__pole');
for (let i = 0; i < btnElm.length; i += 1) {
  btnElm[i].addEventListener('click', nowPlays);
}
