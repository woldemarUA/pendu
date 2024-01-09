'use strict';

import { wordsArray } from './motmot.js';
import { peindre } from './drawing.js';
import { lettersUtulise } from './lettresUtilise.js';

// random  pour select the mot
let gameMot;
const random = () => (gameMot = Math.floor(Math.random() * wordsArray.length));
random();
// Variables au niveau du jeu
const erreurs_autorisees = 10;
let erreurs_commises = 0;
let mot_a_trouver = wordsArray[gameMot].toUpperCase();
console.log(mot_a_trouver);

let currentScore = erreurs_autorisees - erreurs_commises;
let topScore = 0;

const longueur = mot_a_trouver.length;
const informationPanneau = new Map([
  ['perdu', ' <span class="text-danger">Vous aves Perdu 😪</span>'],
  [
    'gagne',
    // '<span class="text-success">WOW!!!! VOUS ETEZ CHAMPION(NE) ✌️🥳</span>',
    ` <img src="https://t3.ftcdn.net/jpg/01/48/37/68/360_F_148376874_MVigVIkpd00fKW3YTXizPvKI2I3je1yr.jpg" alt=""
    srcset="">`,
  ],
  [
    'aucun',
    '<span class="text-danger">Pas cette fois. Essayez encore une fois</span>',
  ],
  ['pasmal', '<span class="text-info">Pas mal, continuez </span>'],
  ['error', `<span class="text-danger">Vous n'avez tape le lettre</span>`],
  [
    'start',
    `<span class="text-success">Allez vous. Vous aves ${erreurs_autorisees} essayes</span>`,
  ],
  [
    'deja',
    `<span class="text-warning">Faites attention. Vous aves deja tapé cette lettre</span>`,
  ],
  [
    'top',
    `<span class="text-success">Felicitation!!! Nouveau top score</span>`,
  ],
]);

// interface utilisateur

const userInputEl = document.getElementById('lettre');
let lettre = '';

const infoEl = document.getElementById('info');

// div avec lettres utilisees

const lettresUtil = document.getElementById('alphabet');

// tableau avec resultatss

const scoreTable = document.getElementById('scoreTable');
const currentScoreCont = document.getElementById('curr');

const currentScoreEl = document.createElement('span');

setCurrentScore();
const topScoreCont = document.getElementById('top');
const topScoreEl = document.createElement('span');
topScoreCont.appendChild(topScoreEl);

topScoreEl.innerHTML = `Meilleur score: ${topScore} `;

currentScoreCont.appendChild(currentScoreEl);
scoreTable.appendChild(currentScoreCont);
scoreTable.appendChild(topScoreCont);

const btnSubmit = document.getElementById('btn-guess');
const btnStop = document.getElementById('btn-stop');
const btnRestart = document.getElementById('btn-restart');
btnRestart.className = `btn btn-success py-1 px-3 my-1 invisible`;
const tableauEl = document.getElementById('tableau');

lettresUtil.appendChild(lettersUtulise(100, lettresUtil).el);
// const alphaUt = lettersUtulise(100, lettresUtil);
// console.log(alphaUt);
// logique de la Jeu

let mot_trouve = new Map();

let tableau = [];
for (const l in mot_a_trouver) tableau.push('-');
showTableau(tableau);

function veriferLetter(lettre) {
  if (mot_a_trouver.indexOf(lettre) === -1) {
    infoPannel('aucun');
    erreurs_commises++;
    currentScore--;
    peindre(erreurs_commises);
    setCurrentScore();
    if (erreurs_commises >= erreurs_autorisees) {
      return ifLost();
    }
  } else {
    [...mot_a_trouver].forEach((l, i) => {
      if (l === lettre) {
        mot_trouve.set(i, l);
        tableau[i] = l;
      }
    });
    // premiere posistion
    mot_trouve = new Map([...mot_trouve.entries()].sort());
    if (sortStr([...mot_trouve.values()].toString()) === mot_a_trouver) {
      return ifVictory();
    }

    infoPannel('pasmal');
    showTableau(tableau);

    setCurrentScore();
  }
}

// verifier perdu
function ifLost() {
  infoPannel('perdu');
  btnSubmit.disabled = true;
  btnStop.disabled = true;
  btnRestart.className = `"btn btn-success py-1 px-3 my-1 visible"`;
  erreurs_commises = 0;
}

// verifier gagne
function ifVictory() {
  showTableau(tableau);
  setTopScore(currentScore);
  infoPannel('gagne');
  currentScore = erreurs_autorisees;

  btnRestart.className = `"btn btn-success py-1 px-3 my-1 visible"`;
  setTopScore();
  btnSubmit.disabled = true;
  btnStop.disabled = true;
}

// format le string

function sortStr(str) {
  return str.replace(/,/g, '');
}

// montrer le tableu avec des lettres

function showTableau(arr) {
  tableauEl.innerHTML = '';
  for (const sign of arr) {
    const el = document.createElement('span');
    // el.innerText = sign;
    el.innerHTML = `<span class='h3 bg-dark text-light m-1 p-1 rounded-3'>${sign}</span>`;

    tableauEl.appendChild(el);
  }
}

// ajouter info text a information panel
function infoPannel(mot) {
  infoEl.innerHTML = informationPanneau.get(mot);
}

// redemarrer le jeu
function relaunchGame() {
  random();
  btnSubmit.disabled = false;
  btnStop.disabled = false;
  mot_a_trouver = wordsArray[gameMot].toUpperCase();
  console.log(mot_a_trouver);
  infoPannel('start');
  tableau = [];
  for (const l in mot_a_trouver) tableau.push('-');
  currentScore = erreurs_autorisees;

  setCurrentScore();
  showTableau(tableau);
  mot_trouve.clear();
  erreurs_commises = 0;
  btnRestart.className = `btn btn-success py-1 px-3 my-1 invisible`;
  lettresUtil.appendChild(lettersUtulise(100, lettresUtil).el);
}

btnRestart.onclick = () => {
  relaunchGame();
  peindre(100);
  setCurrentScore();
  currentScoreEl.className = 'text-success';
};
btnStop.onclick = () => {
  relaunchGame();
  peindre(100);
  setCurrentScore();
};

btnSubmit.onclick = () => {
  infoEl.innerHTML = '';
  lettre = userInputEl.value;
  lettre = lettre.toUpperCase();

  if (!lettre || lettre.length > 1) {
    infoPannel('error');
    return;
  }
  lettresUtil.appendChild(lettersUtulise(lettre, lettresUtil).el);

  if (tableau.includes(lettre)) {
    infoPannel('deja');
    return;
  }
  veriferLetter(lettre);
  userInputEl.value = '';
};

//  changer de SCORE TABLEAU

function setCurrentScore() {
  currentScore > 3 && currentScoreEl.classList.add('text-success');
  currentScore <= 3 && currentScoreEl.classList.add('text-danger');
  currentScoreEl.innerHTML = `Score actuel (tentatives restantes): ${currentScore}`;
}

function setTopScore(currentScore) {
  if (currentScore > topScore) {
    topScore = currentScore;

    topScoreEl.innerHTML = `Meilleur score: ${topScore} `;
    infoPannel('top');
  }
}
